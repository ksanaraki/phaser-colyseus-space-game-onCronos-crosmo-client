import Phaser from 'phaser'

import Config from './../../types/config/config'
import store from '../../stores'
import { setGameOver, setCanPlayAgain } from '../../stores/UserStore'

import { phaserEvents, Event } from '../../events/EventCenter'

class GameOver extends Phaser.Scene {

  _contentText: any
  _mainMenuButton: any
  _playAgainButton: any
  _tokenRewarded: boolean
  _canPlay: boolean
  _shipDamaged: boolean

  constructor() {
    super('gameOver');
    this._tokenRewarded = false
    this._canPlay = false
    this._shipDamaged = false
  }

  create(data: { score: number }) {

    store.dispatch(setGameOver(true))
    Config.fontAssets.gameoverFontStyle.fontSize = '50px'
    let title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'GAME OVER', Config.fontAssets.gameoverFontStyle)
    title.setOrigin(0.5)

    Config.fontAssets.gameoverFontStyle.fontSize = '30px'

    this._contentText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You did not get any score.', Config.fontAssets.gameoverFontStyle)
    this._contentText.setOrigin(0.5)
    if (data.score !== 0) this._contentText.setText(`You have reached a score of ${data.score}. \n Sending ${data.score} $CROSMO to rewards balance...`)

    this._mainMenuButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 70, '', Config.fontAssets.gameoverFontStyle)
    this._mainMenuButton.setOrigin(0.5)
    this._mainMenuButton.setInteractive();
    this._mainMenuButton.on("pointerdown", () => { this._mainMenuButton.setColor("#4c1a03"); });
    this._mainMenuButton.on("pointerup", () => { this._mainMenuButton.setColor("#ff601a"); this.gotoMenu(); });

    this._playAgainButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 120, '', Config.fontAssets.gameoverFontStyle)
    this._playAgainButton.setOrigin(0.5)
    this._playAgainButton.setInteractive();
    this._playAgainButton.on("pointerdown", () => { this._playAgainButton.setColor("#4c1a03"); });
    this._playAgainButton.on("pointerup", () => { this._playAgainButton.setColor("#ff601a"); this.playAgain(); });

    phaserEvents.on(Event.TOKEN_REWARDED, () => {
      this._tokenRewarded = true
    }, this)

    phaserEvents.on(Event.CAN_PLAY, () => {
      this._contentText.setText('')
      this._mainMenuButton.setText('Main Menu')
      this._playAgainButton.setText('Play Again')
      this._canPlay = true
    }, this)

    phaserEvents.on(Event.SHIP_DAMAGED, () => {
      this._contentText.setText('Your ship is damaged.')
      this._mainMenuButton.setText('Main Menu')
      this._shipDamaged = true
    }, this)

    phaserEvents.on(Event.PLAY_AGAIN, () => {
      this.startGame()
    })
  }

  gotoMenu() {
    // this.scene.stop('gameOver')
    // phaserEvents.emit(Event.GOTO_MAINMENU)
    // darkhorse
    window.location.href = "/"
  }

  playAgain() {
    store.dispatch(setCanPlayAgain(true))
  }

  startGame() {
    this._canPlay = false
    this.scene.start('play')
  }

}

export default GameOver
