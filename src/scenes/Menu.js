class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    create(){
        //create things in the scene
        // let graphics = this.add.graphics();

        //set background
        let background = this.add.image(width/2, 0, "background").setOrigin(0.5, 0);
        let tint = this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0, 0);

        //title text
        let titleText = this.add.bitmapText(width/2, height/4, "titleFont", "drum punch game", 64).setOrigin(0.5, 0.5);

        //text that changes with level select on/off
        //"play" button
        let playBox = this.add.rectangle(width/2, height/4*3, width/3, height/6, 0x307a44);
        let playText = this.add.text(width/2-64, height/4*3-30, "PLAY", {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#FFFFFF",
            align: "center"
        });

        //interactivity
        playBox.setInteractive({
            hitArea: playBox,
            useHandCursor: true
        });
        playBox.on("pointerdown", () => {
            //open level select
            this.scene.start("levelSelectScene");
        })

        //play dramatic tunes
        this.bgm = this.sound.add("menuBGM", {
            mute: false,
            volume: 1,
            loop: true
        }).play();
    }

    openLevelSelect(){
        playBox.visible = false;
        playText.visible = false;
    }
}