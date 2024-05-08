class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    create(){
        //create things in the scene
        let graphics = this.add.graphics();

        //title text
        let titleText = this.add.text(width/2-320, height/4, "drum punch game", {
            fontFamily: "Arial",
            fontSize: "64px",
            color: "#000000",
            align: "center"
        })

        //text that changes with level select on/off
        //"play" button
        let playBox = this.add.rectangle(width/2, height/4*3, width/3, height/6, 0x307a44);
        let playText = this.add.text(width/2-64, height/4*3-30, "PLAY", {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#FFFFFF",
            align: "center"
        });
        //level select things
        let lsText = this.add.text(width/2-240, height/2, "level select", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#000000",
            align: "center"
        })
        let lvlOneBox = this.add.rectangle(width/2, height/8*5, width/8, height/10, 0x307a44);
        lsText.visible = false;

        //interactivity
        playBox.setInteractive({
            hitArea: playBox,
            useHandCursor: true
        });
        playBox.on("pointerdown", () => {
            //open level select
            this.scene.start("playScene");
        })
    }

    openLevelSelect(){
        playBox.visible = false;
        playText.visible = false;
        

    }
}