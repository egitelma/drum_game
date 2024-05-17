class End extends Phaser.Scene {
    constructor(){
        super("endScene");
    }

    create(){
        let background = this.add.rectangle(0, 0, 2500, 640 * 8, 0x000000);
        let endText = this.add.text(width / 2 - 200, height / 2 - 30, "TEXT", {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#FFFFFF",
            align: "center"
        });

        if(gameWon){
            //If the game was won, do this
            this.sound.add("tada", {
                mute: false,
                volume: 1,
                loop: false
            }).play();
            endText.setText("YOU WIN!");
        }
        else {
            //If the game was lost, do this
            this.sound.add("wawawawa", {
                mute: false,
                volume: 1,
                loop: false
            }).play();
            endText.setText("YOU LOSE!");
        }

        let menuButton = this.add.rectangle(width/2, height/4*3, width/3, height/6, 0xFFFFFF);
        let menuText = this.add.text(width/2-184, height/4*3-30, "BACK TO MENU", {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#000000",
            align: "center"
        });

        menuButton.setInteractive({
            hitArea: menuButton,
            useHandCursor: true
        })

        menuButton.on("pointerdown", () => {
            this.scene.start("menuScene");
        })
    }
}
