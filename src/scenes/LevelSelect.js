class LevelSelect extends Phaser.Scene{
    constructor() {
        super("levelSelectScene");
    }

    create(){
        //create things in the scene
        let graphics = this.add.graphics();

		//set background
        let background = this.add.image(width/2, 0, "background").setOrigin(0.5, 0);
        let tint = this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0, 0);

        //levelSelect text
        // let levelSelectText = this.add.text(width/2-320, height/4, "level select", {
        //     fontFamily: "Arial",
        //     fontSize: "64px",
        //     color: "#000000",
        //     align: "center"
		// })
		let levelSelectText = this.add.bitmapText(width/2, height/4, "titleFont", "level select", 64).setOrigin(0.5, 0.5);

		//level select options
		//level one
        let levelOneBox = this.add.rectangle(width/5 - 80, height/4*3, width/3, height/6, 0x307a44);
        let levelOneText = this.add.text(width/5-64 - 80, height/4*3-30, "LEVEL 1", {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#FFFFFF",
            align: "center"
		});
		//level two
		let levelTwoBox = this.add.rectangle(width / 5 + 370, height/4*3, width/3, height/6, 0x307a44);
		let levelTwoText = this.add.text(width / 5 - 64 + 370, height/4*3-30, "LEVEL 2", {
			fontFamily: "Arial",
			fontSize: "48px",
			color: "#FFFFFF",
			align: "center"
		});
		//level three
		let levelThreeBox = this.add.rectangle(width / 5 + 820, height / 4 * 3, width / 3, height / 6, 0x307a44);
		let levelThreeText = this.add.text(width / 5 - 64 + 820, height / 4 * 3 - 30, "LEVEL 3", {
			fontFamily: "Arial",
			fontSize: "48px",
			color: "#FFFFFF",
			align: "center"
		});	

        //interactivity
        levelOneBox.setInteractive({
            hitArea: levelOneBox,
            useHandCursor: true
        });
        levelOneBox.on("pointerdown", () => {
			enemyLevel = 1;
            this.changeScene();
		})
		levelTwoBox.setInteractive({
			hitArea: levelTwoBox,
			useHandCursor: true
		});
		levelTwoBox.on("pointerdown", () => {
			enemyLevel = 2;
			this.changeScene();
		});
		levelThreeBox.setInteractive({
			hitArea: levelThreeBox,
			useHandCursor: true
		});
		levelThreeBox.on("pointerdown", () => {
			enemyLevel = 3;
			this.changeScene();
		});
    }

	changeScene(){
		this.sound.stopAll();
		this.scene.start("playScene");
	}
}