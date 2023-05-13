import Phaser from "phaser"

import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import MultiplayerScene from './scenes/MultiplayerScene'
import TextScene from './scenes/TextScene'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  backgroundColor: 'black',
  pixelArt: false, 
  
  // Prevent pixel art from becoming blurred when scaled.
  // scale: {
  //   mode: Phaser.Scale.ScaleModes.RESIZE,
  //   width: '100%',
  //   height: '100%',
  //   autoRound: true,
  //   autoCenter:Phaser.Scale.Center.CENTER_BOTH
  // },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio
},
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [BootScene, PlayScene, MultiplayerScene, TextScene, GameOver],
}

const phaserGame = new Phaser.Game(config)
  ; (window as any).game = phaserGame

export default phaserGame
