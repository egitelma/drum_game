class Play extends Phaser.Scene {
	constructor() {
		super("playScene");
	}

	preload() {
		this.load.image("background", "./assets/boxing-ring.jpg");
		//this.load.image("playerFistL",   "assets/playerFistL.png");
		//this.load.image("playerFistR",   "assets/playerFistR.png");
		//this.load.image("enemy",         "assets/enemy.png");
		//this.load.image("drum",          "assets/drum.png);
		//this.load.image("inputL",        "assets/inputL.png");
		//this.load.image("inputR",        "assets/inputR.png");
		//this.load.image("inputDodgeL",   "assets/inputDodgeL.png");
		//this.load.image("inputDodgeR",   "assets/inputDodgeR.png");
        this.load.spritesheet("Little Mac", "./assets/Little_Mac.png", {
            frameWidth: 243,
            frameHeight: 410,
            startFrame: 0,
            endFrame: 0
        })
	}

	create() {
        this.add.image(0, 0, "background").setOrigin(0).setScale(2)
		//variables
		this.timeRemaining = 60;
		this.playerHealth = 100;
		this.enemyHealth = 100;
		this.gameOver = false;
		this.inputLockedOut = false;

		//Health UI - two rectangles, on top left and top right, both red
		this.add.rectangle(0, 0, 100, 20, 0xFF0000).setOrigin(0, 0);
		this.add.rectangle(700, 0, 100, 20, 0xFF0000).setOrigin(0, 0);

		//Time UI - top center, white
		this.timeRemainingText = this.add.text(400, 0, "Time: " + this.timeRemaining, { fontFamily: "Arial", fontSize: "20px", color: "#FFFFFF" }).setOrigin(0.5, 0);

        //enemy

        this.LittleMac = new Enemy(this, game.config.width/2 + 400, 400, "Little Mac", 0, 1).setScale(.8)

		//Player Left Fist
		//this.add.image(100, 300, "playerFistL").setOrigin(0, 0);

		//Player Right Fist
		//this.add.image(300, 300, "playerFistR").setOrigin(0, 0);

		//Enemy - middle slightly above center
		//this.add.image(400, 200, "enemy").setOrigin(0, 0);

		//Background
		//this.add.image(400, 200, "background").setOrigin(0, 0);

		//Input Display - Stretch Goal
		//use taiko no tatsujin drum icons? switch between white and red/blue for input off and on

		//Inputs
        this.keyLEFTPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRIGHTPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyLEFTDODGE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		this.keyRIGHTDODGE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	update() {
		if (!this.gameOver) {
			//Handling end conditions
			if (this.timeRemaining <= 0 || this.playerHealth <= 0 || this.enemyHealth <= 0) {
				this.gameOver = true;
			}

			//Update UI
			this.timeRemainingText.setText("Time: " + this.timeRemaining);
			//change health bar size based on health

			//Dodging
			if (Phaser.Input.Keyboard.JustDown(this.keyRIGHTDODGE) && !inputLockedOut) { //Player Right Dodge
				//handle right dodge movement
			}
			if (Phaser.Input.Keyboard.JustDown(this.keyLEFTDODGE) && !inputLockedOut) { //Player Left Dodge
				//handle left dodge movement
			}

			//Punching
			if (Phaser.Input.Keyboard.JustDown(this.keyRIGHTPUNCH) && !inputLockedOut) { //Player Right Punch
				//play right punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
			}
			if (Phaser.Input.Keyboard.JustDown(this.keyLEFTPUNCH) && !inputLockedOut) { //Player Left Punch
				//play left punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
			}
			
			//Enemy AI
			//Add here - done with a prefab and a set of states for the enemy to be in
            this.LittleMac.update()
			//Handle whether player or enemy takes damage
			//Add here - use a set of rectangle hitboxes to determine whether the player is in range of the attack or not

			//Decrement time - 1 per second, accounting for delta time w/ different refresh rates
			this.timeRemaining -= 1 / this.game.loop.actualFps;
		} else {
			this.gameEnd();
		}
	}

	gameEnd(){
		this.scene.start("End");
	}
}
