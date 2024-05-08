class End extends Phaser.Scene {
    constructor(){
        super("endScene");
    }

    create(){
        let background = this.add.rectangle(0, 0, width, height, 0x000000);
        if(gameWon){
            //If the game was won, do this
        }
        else {
            //If the game was lost, do this
        }

        let menuButton = this.add.rectangle(width/2, height/4*3, width/3, height/6, 0xFFFFFF);
        let menuText = this.add.text(width/2-64, height/4*3-30, "MENU", {
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