class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.spritesheet("Little Mac", "./assets/Litte_Mac.png", {
            frameWidth: 243,
            frameHeight: 410,
            startFrame: 0,
            endFrame: 0
        })
    }

    init() {
       
    }

    create() {
        this.LittleMac = new Enemy(this, 100, 800, "Little Mac", 0, 1)
    }

    update() {
        
    }
} 