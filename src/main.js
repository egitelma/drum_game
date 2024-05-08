let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 1280,
    render: {
        pixelArt: true
    },
    scene: [Menu, Play], //add load and end
    backgroundColor: "#FFFFFF",
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

let game = new Phaser.Game(config);

let { width, height } = game.config;