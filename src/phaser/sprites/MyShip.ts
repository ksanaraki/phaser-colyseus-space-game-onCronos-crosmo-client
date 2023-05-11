import Phaser from 'phaser'

import Network from '../../services/Network'
import Ship from "./Ship"
import Config from "./../../types/config/config"

import { JoystickMovement } from 'components/Joystick'

class MyShip extends Ship {

  _shipBody: any
  _engineSound: any
  
  _account: string
  _tokenId: number
  _shipName: string
  _paid: boolean
  _team: number

  _score: number
  _vulnerable: boolean
  _angularVelocity: number
  _acceleration: number
  _maxVelocity: number
  _isExplode :  boolean
  _shieldTimer: any
  _hasAtomic: boolean
  _hasLazer: boolean

  _forwardKey: any
  _brakeKey: any
  _leftKey: any
  _rightKey: any
  _fireKey: any

  //for server update
  _curSpeedX:any
  _curSpeedY:any

  public joystickMovement?: JoystickMovement
  public fireButtonHandle?: boolean


  constructor({ sargs, id, shipPros, hasCombat, inputKeys: { forward, brake, left, right, fire } }) {
    super(sargs, id, shipPros, hasCombat)
    // ship play settings
    this._maxVelocity = Config.shipPros.maxVelocity
    this.Score = 0
    this._angularVelocity = Config.shipPros.angularVelocity
    this._acceleration = Config.shipPros.acceleration
    this._vulnerable = true
    this._hasAtomic = false
    this._hasLazer = false
    this._isExplode = false;
    // Physics settings
    this.setDrag(Config.shipPros.drag)
    this.setCircle(27)
    this.setOrigin(0.5)
    this._shipBody = this.body
    this._shipBody.setMaxVelocity(this._maxVelocity)

    // Bindings for input
    this._forwardKey = forward
    this._brakeKey = brake
    this._leftKey = left
    this._rightKey = right
    this._fireKey = fire

    // this._targetPosition = { x: sargs.x, y: sargs.y }

    this._account = shipPros?.account;
    this._tokenId = shipPros?.tokenId;
    this._shipName = shipPros?.name;
    this._paid = shipPros?.paid;
    this._team = shipPros?.team;
  }

  get Score() {
    return this._score
  }

  set Score(value) {
    this._score = value
    this.scene.registry.set('score', this._score)
  }

  /**
  * @returns true if the ship can be damaged.
  */
  get Vulnerable() { return this._vulnerable }

  set Vulnerable(value: boolean) { this._vulnerable = value }

  get BulletType() { return this._bulletType }

  setShiled(seconds: number) {
    this._vulnerable = false
    this._shield.setVisible(true)
    this._hasShield = true
    this.setCircle(33)

    this._shieldTimer?.remove()
    this._shieldTimer = this.scene.time.delayedCall(seconds * 1000, // delay is given in milliseconds
      () => {
        this._vulnerable = true
        this._shield.setVisible(false)
        this._hasShield = false
        this.setCircle(27)
      }, null, this)
  }

  handleJoystickMovement(movement: JoystickMovement) {
    this.joystickMovement = movement
  }

  handleFire(fired: boolean) {
    this.fireButtonHandle = fired;
  }

  update(time: number, delta: number) {
    this._gunModule.update(time, delta)
    this._lazerEffect.setAngle(this.angleBack)
    this._lazerEffect.setSpeed({ min: this.body.velocity.length() - 150, max: this.body.velocity.length() - 100 })
    this._lazerEffect.followOffset.setToPolar(this.rotBack, -22)
    if (this._hasLazer) this._lazerEffect.start()
    else this._lazerEffect.stop()

    let joystickLeft = false;
    let joystickRight = false;
    let joystickUp = false;
    let joystickDown = false;
    let fireDown = false;
    if (this.joystickMovement?.isMoving) {
      joystickLeft = this.joystickMovement.direction.left;
      joystickRight = this.joystickMovement.direction.right;
      joystickUp = this.joystickMovement.direction.up;
      joystickDown = this.joystickMovement.direction.down;
    }

    if (this._forwardKey.isDown || joystickUp) {
      this.setMaxVelocity(this._maxVelocity)

      // Ensure that the engine particle system is correctly set up
      this._engine.setAngle(this.angleBack)
      this._engine.setSpeed({ min: this.body.velocity.length() - 150, max: this.body.velocity.length() - 100 })
      this._engine.followOffset.setToPolar(this.rotBack, 25)
      this._engine.start()
      // this.anims.play(Config.graphicAssets.lazerEffect.name, this._shipBody)
      //this._shipBody.velocity.rotate(this.rotation);
      
      this.scene.physics.velocityFromRotation(this.rotation, this._shipBody.velocity.length(), this._shipBody.velocity)
      this.scene.physics.velocityFromRotation(this.rotation, this._acceleration, this._shipBody.acceleration)

    } else {
      this.scene.physics.velocityFromRotation(this.rotation, this._shipBody.velocity.length(), this._shipBody.velocity)
      this.scene.physics.velocityFromRotation(this.rotation, 0, this._shipBody.acceleration)
      this._engine.stop()
      // this.anims.stop()
    }
    
    if (this._brakeKey.isDown || joystickDown) {
      let maxVelocity = this._maxVelocity
      maxVelocity = maxVelocity / 3
      this.setMaxVelocity(maxVelocity)
    }

    let angularVel = 0
    // Set angular velocity
    if (this._leftKey.isDown || joystickLeft) {
      if(joystickLeft) {
        this.setMaxVelocity(this._maxVelocity)

        // Ensure that the engine particle system is correctly set up
        this._engine.setAngle(this.angleBack)
        this._engine.setSpeed({ min: this.body.velocity.length() - 150, max: this.body.velocity.length() - 100 })
        this._engine.followOffset.setToPolar(this.rotBack, 25)
        this._engine.start()
        // this.anims.play(Config.graphicAssets.lazerEffect.name, this._shipBody)
        //this._shipBody.velocity.rotate(this.rotation);
        
        this.scene.physics.velocityFromRotation(this.rotation, this._shipBody.velocity.length(), this._shipBody.velocity)
        this.scene.physics.velocityFromRotation(this.rotation, this._acceleration, this._shipBody.acceleration)
      }

      angularVel += -this._angularVelocity
    } else if (this._rightKey.isDown || joystickRight) {
      if(joystickRight) {
        this.setMaxVelocity(this._maxVelocity)

        // Ensure that the engine particle system is correctly set up
        this._engine.setAngle(this.angleBack)
        this._engine.setSpeed({ min: this.body.velocity.length() - 150, max: this.body.velocity.length() - 100 })
        this._engine.followOffset.setToPolar(this.rotBack, 25)
        this._engine.start()
        // this.anims.play(Config.graphicAssets.lazerEffect.name, this._shipBody)
        //this._shipBody.velocity.rotate(this.rotation);
        
        this.scene.physics.velocityFromRotation(this.rotation, this._shipBody.velocity.length(), this._shipBody.velocity)
        this.scene.physics.velocityFromRotation(this.rotation, this._acceleration, this._shipBody.acceleration)
      }
      angularVel += this._angularVelocity
    }
    this.setAngularVelocity(angularVel)

    if (this._fireKey.isDown || this.fireButtonHandle) {
      this._gunModule.setTriggerHeld(true)
    } else {
      this._gunModule.setTriggerHeld(false)
    }

    if (this._hasShield) this._shield.setPosition(this.x, this.y)
    this._curSpeedX = this._shipBody.velocity.x;
    this._curSpeedY = this._shipBody.velocity.y;
  }

  updateToServer(network: Network) {
    /**
     * send ship's info to server
    */
     if (this._shipBody.speed !== 0 || this._shipBody.rotation !== 0) {
      network.updatePlayer(
        this.x, this.y, this.rotation,
        this._shipBody.velocity.x,
        this._shipBody.velocity.y,
        this._shipBody.angularVelocity,
        this._forwardKey.isDown,
        this._hasShield,
        this._fireKey.isDown,
        this._score,
        this._isExplode,
        this._lives,

        this._account,
        this._shipName,
        this._tokenId,
        this._tier,
        this._paid,
        this._team
      )      
    }
  }
  // updateMyPlayer(field: string, value: number | string | boolean) {
  //   switch (field) {      
  //     case 'x':
  //       if (typeof value === 'number') {
  //         this._targetPosition.x = value
  //       }
  //       break

  //     case 'y':
  //       if (typeof value === 'number') {
  //         this._targetPosition.y = value
  //       }
  //       break

  //     case 'rotation':
  //       if (typeof value === 'number') {
  //         this._rotation = value
  //       }
  //       break
  //   }
  // }
  // preUpdate(t: number, dt: number) {
  //   super.preUpdate(t, dt)
    
  //   this.x += ((this._targetPosition.x || this.x) - this.x) * 0.5;
  //   this.y += ((this._targetPosition.y || this.x) - this.y) * 0.5;
  //   // Intepolate angle while avoiding the positive/negative issue 
  //   let angle = this._rotation || this.rotation;
  //   let dir = (angle - this.rotation) / (Math.PI * 2);
  //   dir -= Math.round(dir);
  //   dir = dir * Math.PI * 2;
  //   this.rotation += dir;
  // }
  /**
   * @returns {Phaser.Math.Vector2} Vector that points in the same direction as the ship.
   */
  facing() {
    return new Phaser.Math.Vector2(Math.sin(this.rotation), -Math.cos(this.rotation))
  }

  /**
     * Kills the ship.
     * This subtracts a life and makes the ship inactive and invisible.
     * Use respawn to restore ship.
     */
  kill() {
    this._isExplode = true;
    this._vulnerable = false
    this.Lives -= 1
    this._engine.stop()
    this.emit("ship_death")
    this.setActive(false).setVisible(false)
  }

  /**
     * Makes the ship invulnerable for the specified duration. 
     * Whilst invulnerable the ship blinks.
     */
  makeTempInvulnerable(seconds: number) {
    this._vulnerable = false
        this._isExplode = false;
    let blinkEvent = this.scene.time.addEvent({
      delay: 200,
      callback: () => { this.setVisible(!this.visible) },
      callbackScope: this,
      repeat: -1
    })
    this.scene.time.delayedCall(seconds * 1000, // delay is given in milliseconds
      () => {
        this._vulnerable = true
        blinkEvent.remove()
        this.setVisible(true)
      }, null, this)
  }

  /**
   * Respawns the ship and the coordinates provided and makes it invulnerable for 3 seconds.
   */
  respawn(x: number, y: number) {
    this.setActive(true).setVisible(true)
    this.setRotation(0)
    this.setRotation(this.rotLeft)
    this.setPosition(x, y)
    this._shipBody.setVelocity(0)
    this.makeTempInvulnerable(3)
  }
}

export default MyShip