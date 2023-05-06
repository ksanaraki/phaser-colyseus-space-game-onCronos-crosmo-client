import { Client, Room } from 'colyseus.js'

import { IRoomData, RoomType } from './../types/Rooms'
import  {Message} from './../types/Messages';
import { phaserEvents, Event } from '../events/EventCenter'
import store from '../stores'
import { setSessionId, setPlayerNameMap, removePlayerNameMap } from '../stores/UserStore'
import {
  setLobbyJoined,
  setJoinedRoomData,
  setAvailableRooms,
  addAvailableRooms,
  removeAvailableRooms,
} from '../stores/RoomStore'
import CONFIG from './../types/config/config';
import api from './../api';

export default class Network {

  private _client: Client
  private _room?: Room<any>
  private _lobby!: Room

  _mySessionId!: string
  _dtServer2Client:number
  constructor() {
    //const endpoint = `wss://crosmoshooter-backend-multi.onrender.com`
    //const protocol = window.location.protocol.replace('http', 'ws')
    //const endpoint =  `${protocol}//${window.location.hostname}:2083`
    // const endpoint='ws://3.224.34.61:2083'
    const endpoint = CONFIG.environment.END_POINT;
    
    console.log("connect to ", endpoint, " at : ", new Date().getTime());
    this._client = new Client(endpoint)
    
    this.joinLobbyRoom().then(() => {
      console.log("success connect  at : ", new Date().getTime());
      store.dispatch(setLobbyJoined(true))
    })

    phaserEvents.on(Event.MY_PLAYER_NAME_CHANGE, this.updatePlayerName, this)
    phaserEvents.on(Event.MY_PLAYER_TEXTURE_CHANGE, this.updatePlayer, this)
  }

  /**
   * method to join Colyseus' built-in LobbyRoom, which automatically notifies
   * connected _clients whenever rooms with "realtime listing" have updates
   */
  async joinLobbyRoom() {

    this._lobby = await this._client.joinOrCreate(RoomType.LOBBY)
    this._lobby.onMessage('rooms', (rooms) => {
      store.dispatch(setAvailableRooms(rooms))
    })

    this._lobby.onMessage('+', ([roomId, room]) => {
      store.dispatch(addAvailableRooms({ roomId, room }))
    })

    this._lobby.onMessage('-', (roomId) => {
      store.dispatch(removeAvailableRooms(roomId))
    })
  }

  // method to join the public _lobby
  async joinOrCreatePublic() {
    this._room = await this._client.joinOrCreate(RoomType.PUBLIC)
    this.initialize()
  }

  
  // set up all network listeners before the game starts
  initialize() {
    if (!this._room) return

    this._lobby.leave()
    this._mySessionId = this._room.sessionId
    store.dispatch(setSessionId(this._room.sessionId))
    
    // when the server sends room data
    this._room.onMessage(Message.SEND_ROOM_DATA, (content) => {
      store.dispatch(setJoinedRoomData(content))
      //getting dt from server
      // this.setDtServer2Client(content.serverTime)
    })
    // new instance added to the players MapSchema
    console.log("this._room.state.players",this._room.state.players)
    if (this._room.state.players)
    this._room.state.players.onAdd = (player: any, key: string) => {
      if (key === this._mySessionId) return
      // track changes on every child object inside the players MapSchema
      player.onChange = (changes) => {
        phaserEvents.emit(Event.PLAYER_UPDATED, changes, key)

        changes.forEach((change) => {
          const { field, value } = change
          // if (key === this._mySessionId) {
          //   phaserEvents.emit(Event.MY_PLAYER_UPDATED, field, value, key)
          // }
          // else{
            // phaserEvents.emit(Event.PLAYER_UPDATED, field, value, key)
            // when a new player finished setting up player name
            if (field === 'name' && value === '') {
              phaserEvents.emit(Event.PLAYER_JOINED, player, key)
              store.dispatch(setPlayerNameMap({ id: key, name: value }))
            }
          // }
        })
      }
    }

    // an instance removed from the players MapSchema
    this._room.state.players.onRemove = (player: any, key: string) => {
      phaserEvents.emit(Event.PLAYER_LEFT, key)
      store.dispatch(removePlayerNameMap(key))
    }

    // new instance added to the bullets MapSchema
    this._room.state.bullets.onAdd = (bullet: any, key: string) => {
      console.log("Get bullet create : ", new Date().getTime())
      phaserEvents.emit(Event.BULLET_CREATED, bullet, key);
      // track changes on every child object inside the bullets MapSchema
      /*bullet.onChange = (changes) => {
        //console.log("Bullets updated at : ", new Date().getTime(), " Bullets:", key)  
        phaserEvents.emit(Event.BULLET_UPDATED, changes, key)

        // changes.forEach((change) => {
        //   const { field, value } = change
        //   phaserEvents.emit(Event.BULLET_UPDATED, field, value, key)
        // })
      }*/
    }
    this._room.state.bullets.onRemove = (bullet: any, key: string) => {
      phaserEvents.emit(Event.BULLET_REMOVED, key)
    }
    //asteroid data
    this._room.state.asteroids.onAdd = (asteroid: any, key: string) => {
      phaserEvents.emit(Event.ASTEROID_CREATED, asteroid, key);
      // track changes on every child object inside the player MapSchema
      //console.log("asteroids created at : ", new Date().getTime())
      asteroid.onChange = (changes) => {
        //console.log("asteroids updated at : ", new Date().getTime(), " Asteroid :", key)
          phaserEvents.emit(Event.ASTEROID_CHANGES_UPDATED, changes, key)
        changes.forEach((change) => {
          const { field, value } = change
          // phaserEvents.emit(Event.ASTEROID_UPDATED, field, value, key)
          if (field === 'curServerTime') {
            this.setDtServer2Client(value)
            }
          
        })
      }
    }
    this._room.state.asteroids.onRemove = (asteroid: any, key: string) => {
      phaserEvents.emit(Event.ASTEROID_REMOVED, key)
    }   
    this._room.state.airdrops.onAdd = (airdrop: any, key: string) => {
      phaserEvents.emit(Event.AIRDROP_CREATED, airdrop, key);
      // track changes on every child object inside the player MapSchema
      airdrop.onChange = (changes) => {

        changes.forEach((change) => {
          const { field, value } = change
          phaserEvents.emit(Event.AIRDROP_UPDATED, field, value, key)
        })
      }
    }
    this._room.state.airdrops.onRemove = (airdrop: any, key: string) => {
      phaserEvents.emit(Event.AIRDROP_REMOVED, key)
    }   
   
    this._room.onMessage(Message.COLLIDE_PLAYER_ASTEROID, (content:any) => {
      phaserEvents.emit(Event.COLLISION_PLAYER_ASTEROID,content)
    })
    this._room.onMessage(Message.COLLIDE_PLAYER_BULLET, (content:any) => {
      phaserEvents.emit(Event.COLLISION_PLAYER_BULLET,content)
    })
    this._room.onMessage(Message.COLLIDE_BULLET_ASTEROID, (content:any) => {
      phaserEvents.emit(Event.COLLISION_BULLET_ASTEROID,content)
    })
    this._room.onMessage(Message.COLLIDE_PLAYER_AIRDROP, (content:any) => {
      phaserEvents.emit(Event.COLLISION_PLAYER_AIRDROP,content)
    })
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: any, key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_JOINED, callback, context)
  }
  // method to register event listener and call back function when a player left
  onPlayerLeft(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_LEFT, callback, context)
  }

  // method to register event listener and call back function when myPlayer is ready to connect
  onMyPlayerReady(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.MY_PLAYER_READY, callback, context)
  }

  // method to register event listener and call back function when a player updated
  onPlayerUpdated( callback: (changes:any, key: string) => void,context?: any) {
    phaserEvents.on(Event.PLAYER_UPDATED, callback, context)
  }
  // onMyPlayerUpdated( callback: (field: string, value: number | string) => void,context?: any) {
  //   phaserEvents.on(Event.MY_PLAYER_UPDATED, callback, context)
  // }
  //bullet part
  onBulletCreated(callback: (bullet: any, id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.BULLET_CREATED, callback, context)
  }
  onBulletUpdated(callback: (changes:any, key: string) => void, context?: any) {
    phaserEvents.on(Event.BULLET_UPDATED, callback, context)
  }
  onBulletRemoved(callback: (id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.BULLET_REMOVED, callback, context)
  }
   //asteroid part
  onAsteroidCreated(callback: (asteroid: any, id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.ASTEROID_CREATED, callback, context)
  }
  onAsteroidUpdated(callback: (field: string, value: number | string, key: string) => void, context?: any) {
    phaserEvents.on(Event.ASTEROID_UPDATED, callback, context) 
  }
  onAsteroidRemoved(callback: (id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.ASTEROID_REMOVED, callback, context)
  }
  onAsteroidChangesUpdated(callback: (changes:any, key: string,) => void, context?: any) {
    phaserEvents.on(Event.ASTEROID_CHANGES_UPDATED, callback, context) 
  }
  //airdrop part
  onAirdropCreated(callback: (airdrop: any, id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.AIRDROP_CREATED, callback, context)
  }
  onAirdropUpdated(callback: (field: string, value: number | string, key: string) => void, context?: any) {
    phaserEvents.on(Event.AIRDROP_UPDATED, callback, context) 
  }
  onAirdropRemoved(callback: (id: string, key: string) => void, context?: any) {
    phaserEvents.on(Event.AIRDROP_REMOVED, callback, context)
  }

  //collision part server to client
  onCollisionPlayerWithBullet(callback: (content: any) => void, context?: any) {
    phaserEvents.on(Event.COLLISION_PLAYER_BULLET, callback, context)
  }
  onCollisionPlayerWithAsteroid(callback: (content: any) => void, context?: any) {
    phaserEvents.on(Event.COLLISION_PLAYER_ASTEROID, callback, context)
  }
  onCollisionBulletAsteroid(callback: (content: any) => void, context?: any) {
    phaserEvents.on(Event.COLLISION_BULLET_ASTEROID, callback, context)
  }
  onCollisionPlayerAirdrop(callback: (content: any) => void, context?: any) {
    phaserEvents.on(Event.COLLISION_PLAYER_AIRDROP, callback, context)
  }

  // method to send player updates to Colyseus server
  updatePlayer(
    currentX: number,
    currentY: number,
    rotation: number,
    speed_x: number,
    speed_y: number,
    angularVel:number,
    isForwarding: boolean,
    // isRightRotation: boolean,
    // isLeftRotation: boolean,
    // isBraking:boolean,
    hasShield: boolean,
    isFire: boolean,
    score: number,
    isExplode: boolean,
    lives:  number,

    account: string,
    shipName: string,
    tokenId: number,
    tier: number
  ) {
    let clientTimeNow = this.clientTime();
    console.log(`this._room`, this._room);
    this._room?.send(Message.UPDATE_PLAYER,
      {
        x: currentX,
        y: currentY,
        rotation: rotation,
        speed_x: speed_x,
        speed_y: speed_y,
        angularVel:angularVel,
        isForwarding: isForwarding,
        // isRightRotation: isRightRotation,
        // isLeftRotation: isLeftRotation,
        // isBraking:isBraking,
        hasShield: hasShield,
        isFire: isFire,
        score: score,
        isExplode: isExplode,
        lives: lives,
        clientTime:clientTimeNow,

        account,
        shipName,
        tokenId,
        tier
      })
  }
  updateBulletToServer(
    x: number,
    y: number,
    rotation: number,
    speed_x:number,
    speed_y:number,
   bulletType:string
  ) {
    this._room?.send(Message.UPDATE_BULLET,
      {
        x: x,
        y: y,        
        rotation: rotation,
        speed_x:speed_x,
        speed_y: speed_y,
        bulletType:bulletType        
      })
  }

  createAirdropToServer(
    x: number,
    y: number,
    owner: any,
    kind: any
  ) {
    this._room?.send(Message.CS_ASTEROID_CREATE,
      {
        x: x,
        y: y,
        owner: owner,
        kind: kind
      })
  }
  removeAirdropToServer(
    index: any
  ) {
    this._room?.send(Message.CS_ASTEROID_REMOVE,
      {
        index: index
      })
  }

   clientTime() {
    return new Date().getTime();
  }
  setDtServer2Client(serverTime: number) {
    this._dtServer2Client = this.clientTime() - serverTime;
  }
  // method to send player name to Colyseus server
  updatePlayerName(currentName: string) {
    this._room?.send(Message.UPDATE_PLAYER_NAME, { name: currentName })
  }
  //method to send game start ready
  allPlayersReady(ready:boolean) {
    this._room?.send(Message.GAMEPLAY_READY,{ready:ready})
  }
  specialKeyIsDown(explode: boolean) {
    this._room?.send(Message.ATOMIC_EXPLODE, { explode: explode });
  }

  // method to send ready-to-connect signal to Colyseus server
  readyToConnect() {
    this._room?.send(Message.READY_TO_CONNECT, {clientTime:this.clientTime()})
    phaserEvents.emit(Event.MY_PLAYER_READY)
  }

  //method to record user score to the DB when score was changed
  async recordScore (account: string, tokenId: number, shipName: string, tier: number,  score: number) {
    try{
      const res = await api.score.saveScoreLog(account, tokenId.toString(), shipName, tier, score);
    }
    catch(e) {
      console.log(`record failed! `, e)
    }
  }

}
