let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 640,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            //gravity: { y: 1000 }
        }
    },
    scene: [Load, Menu, Play, End, LevelSelect],
    backgroundColor: "#FFFFFF",
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

let game = new Phaser.Game(config);

let { width, height } = game.config;

let gameWon = false;

let enemyList = [];

let enemyLevel = 1;