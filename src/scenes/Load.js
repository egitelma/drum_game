class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        //I got the loading bar from Nathan's Github - here's the source he had linked:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        let loadingText = this.add.text(width/2, height/3, "loading...", {
            fontFamily: "Courier New",
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
        //images first!
        this.load.path = "./assets/";
        this.load.image("fistLeft", "fist_left.png");
        this.load.image("fistRight", "fist_right.png");
        this.load.image("blood", "blood.png")
		this.load.image("inputDrum",   "inputDrum.png");
		this.load.image("inputPunchL", "inputPunchL.png");
		this.load.image("inputPunchR", "inputPunchR.png");
		this.load.image("inputDodgeL", "inputDodgeL.png");
		this.load.image("inputDodgeR", "inputDodgeR.png");
        this.load.image("gunRight", "gun_point_right.png");
        this.load.image("background", "background.png");
        this.load.image("explosive", "explosive.png");
        this.load.image("rocket", "rocket.png");
        this.load.spritesheet("Little Mac", "LittleMacSheet.png", {
            frameWidth: 170,
            frameHeight: 400,
            startFrame: 0,
            endFrame: 2
        });
		this.load.spritesheet("hitbox", "hitbox.png", {
            frameWidth: 60,
            frameHeight: 60,
            startFrame: 0,
            endFrame: 0
        });
        //then fonts
        this.load.path = "./assets/fonts/";
        this.load.bitmapFont("blockFont", "dogica_reg.png", "dogica_reg.xml");
        this.load.bitmapFont("titleFont", "crang.png", "crang.xml");
        //sfx, finally - all royalty free ofc
        this.load.path = "./assets/sound/";
        this.load.audio("drumMiddle", "drum_sfx.mp3");
        this.load.audio("wawawawa", "wawawawa.mp3");
        this.load.audio("tada", "tada.mp3");
        this.load.audio("drumSide", "drumtap_sfx.mp3");
        this.load.audio("punchLand", "punch.mp3");
        this.load.audio("ough", "ough.mp3");
        //and BGM - still royalty free
        this.load.audio("menuBGM", "menu_bgm.mp3");
        this.load.audio("mainBGM", "main_bgm.mp3");

        // let numOfEnemies = 4;
        // for(let i=0; i<numOfEnemies; i++){
        //     enemyList.push() //new Enemy prefab
        // }
    }

    create() {
        //  switch to menu scene
        this.scene.start("menuScene");
    }
}
