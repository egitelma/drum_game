class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.bitmapFont('dogica_font', 'assets/fonts/dogica.png', 'assets/fonts/dogica.xml')
        this.load.bitmapFont('dogica_reg_font', 'assets/fonts/dogica_reg.png', 'assets/fonts/dogica_reg.xml')
    }

    create() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            SPACE: KeyCodes.SPACE
        })

        // add title text
        let t1 = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 32, 'dogica_font', 'BOXING GAME', 20).setOrigin(0.5).setAlpha(0)
        let t2 = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5).setAlpha(0)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.SPACE)){
            // if(loaded == false) {
            //     this.scene.start('loadScene')
            //     loaded = true
            // } else {
            //     this.scene.start('playScene')
            // }
            this.scene.start('playScene')
        }
    }
}