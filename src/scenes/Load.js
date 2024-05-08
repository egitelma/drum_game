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
