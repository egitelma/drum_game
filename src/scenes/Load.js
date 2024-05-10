class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        //I got the loading bar from Nathan's Github - here's the source he had linked:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        let loadingText = this.add.text(width/2, height/3, "loading...", {
            fontFamily: "Courier New", //i'm so tired of bitmap fonts
            fontSize: "48px",
            color: "#000000",
            align: "center"
        });
        //  increase size of bar as game loads
        this.load.on("progress", (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0x000000, 1);
            loadingBar.fillRect(0, height/2, width * value, 5);
        })
        //  destroy loading bar when done
        this.load.on("Complete", () => {
            loadingBar.destroy();
            loadingText.destroy();
            
        })
        //load assets
        this.load.path = "./assets/";
        this.load.image("fistLeft", "fist_left.png");
        this.load.image("fistRight", "fist_right.png");
        this.load.image("background", "boxing-ring.jpg");
		this.load.image("inputDrum",   "inputDrum.png");
		this.load.image("inputPunchL", "inputPunchL.png");
		this.load.image("inputPunchR", "inputPunchR.png");
		this.load.image("inputDodgeL", "inputDodgeL.png");
		this.load.image("inputDodgeR", "inputDodgeR.png");
        this.load.image("gunRight", "gun_point_right.png");
        this.load.spritesheet("Little Mac", "LittleMacSheet.png", {
            frameWidth: 170,
            frameHeight: 400,
            startFrame: 0,
            endFrame: 2
        })

		this.load.spritesheet("hitbox", "hitbox.png", {
            frameWidth: 60,
            frameHeight: 60,
            startFrame: 0,
            endFrame: 0
        })
        //populate the enemy list with enemies (4 enemies to start)
        let numOfEnemies = 4;
        for(let i=0; i<numOfEnemies; i++){
            enemyList.push() //new Enemy prefab
        }
    }

    create() {
        //  switch to menu scene
        this.scene.start("menuScene");
    }
}
