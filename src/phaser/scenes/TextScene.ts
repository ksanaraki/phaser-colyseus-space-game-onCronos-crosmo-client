/*jshint esversion: 6 */
import Phaser from "phaser"
import Config from './../../types/config/config'

class TextScene extends Phaser.Scene {

    _scoreLabel: any
    _scoreText: any
    _levelLabel: any
    _levelText: any
    _shotLabel: any
    _shotText: any
    _endLevel: any
    _newEnemy: any

    _lives: any
    _startingLives: number
    _bonusLives: number
    _width: number
    _height: number

    constructor() {
        super("text")
    }

    init() {
        this._width = Config.gamePros.screenWidth
        this._height = Config.gamePros.screenHeight
        this._startingLives = Config.shipPros.startingLives + this.registry.values.bonusLives
        this._bonusLives = 0
        this._lives = []
    }

    create(data: { level: string }) {
        this._endLevel = this.add.text(this._width / 2, this._height / 2 - 50, "", Config.fontAssets.endLevel)
        this._endLevel.setOrigin(0.5)
        this._newEnemy = this.add.text(this._width / 2, this._height / 2 - 50, "", Config.fontAssets.endLevel)
        this._newEnemy.setOrigin(0.5)
        this._scoreLabel = this.add.text(16, 16, "Score:", Config.fontAssets.scoreLabel)
        this._scoreText = this.add.text(135, 16, "0", Config.fontAssets.scoreText)
        this._levelLabel = this.add.text(16, 50, "Level:", Config.fontAssets.levelLabel)
        this._levelText = this.add.text(85, 50, data.level, Config.fontAssets.levelText)
        this._shotLabel = this.add.text(this._width - 155, this._height - 45, "Shots:", Config.fontAssets.scoreLabel)
        this._shotText = this.add.text(this._width - 16, this._height - 16, this.registry.values.shots, Config.fontAssets.scoreText)
        this._shotText.setOrigin(1, 1)

        this.setLives()

        // Clear listener or an exception is throw on game restart
        this.events.on("shutdown", () => this.registry.events.removeListener("changedata", this.updateData, this), this)
        this.registry.events.on("changedata", this.updateData, this)
    }

    updateData(parent, key, data) {
        if (key === "score") {
            this._scoreText.setText(data)
        } else if (key === "level") {
            this._levelText.setText(data)
            this.setLives()
        } else if (key === "playerLives") {
            this.setLives()
        } else if (key === "shots") {
            if (data > 90) this._shotText.setText('∞')
            else this._shotText.setText(data)
        } else if (key === "endLevel") {
            if (data === -1) this._endLevel.setText("")
            else if (data === 0) this._endLevel.setText(`Enjoy The Game!`)
            else this._endLevel.setText(`Level ${data} completed`)
        } else if (key === "newEnemy") {
            if (data === -1) this._newEnemy.setText("")
            else this._newEnemy.setText('A new kind of enemy appears')
        }
    }

    setLives() {
        this._lives = []
        let baseX = this._width
        for (let i = 0; i < this._startingLives; i++) {
            let img = this.add.image(baseX - 32 - i * (32 + 8), 35, Config.graphicAssets.lifeEmpty.name)
            this._lives.push(img)
        }

        // Add in reverse order to make it look better when popping off lives.
        for (let i = 0; i < this.registry.values.playerLives; i++) {
            let img = this.add.image(baseX - 32 - i * (32 + 8), 35, Config.graphicAssets.lifeFull.name)
            this._lives[i] = img
        }
    }
}

export default TextScene