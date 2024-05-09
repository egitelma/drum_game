class Play extends Phaser.Scene {
	constructor() {
		super("playScene");
	}

	preload() {
		
	}

	create() {
		//variables
		this.timeRemaining = 60;
		this.playerHealth = 100;
		this.enemyHealth = 100;
		this.gameOver = false;
		this.inputLockedOut = false;

		//Health UI - two rectangles, on top left and top right, both red
		this.add.rectangle(0, 0, 400, 20, 0xFF0000).setOrigin(0, 0);
		this.add.rectangle(width-400, 0, 400, 20, 0xFF0000).setOrigin(0, 0);

		//Time UI - top center, white
		this.timeRemainingText = this.add.text(width/2-64, 0, "Time: " + this.timeRemaining, { fontFamily: "Arial", fontSize: "20px", color: "#000000" }).setOrigin(0.5, 0);

		//Player Left Fist
		this.leftFist = this.add.image(0, 300, "fistLeft").setOrigin(0, 0);
        this.leftFist.setScale(0.25);
		//Player Right Fist (img dimensions: 1632x1224 so 0.25x the width is 408)
		this.rightFist = this.add.image(width-408, 300, "fistRight").setOrigin(0, 0);
        this.rightFist.setScale(0.25);

		//Enemy - middle slightly above center
		//this.add.image(400, 200, "enemy").setOrigin(0, 0);

		//Background
		//this.add.image(400, 200, "background").setOrigin(0, 0);

		//Input Display - Stretch Goal
		//use taiko no tatsujin drum icons? switch between white and red/blue for input off and on
		this.drum = this.add.image(550, 425, "inputDrum").setOrigin(0, 0);
		this.inputPunchL = this.add.image(563, 433, "inputPunchL").setOrigin(0, 0).setVisible(false);
		this.inputPunchR = this.add.image(618, 434, "inputPunchR").setOrigin(0, 0).setVisible(false);
		this.inputDodgeL = this.add.image(548, 419, "inputDodgeL").setOrigin(0, 0).setVisible(false);
		this.inputDodgeR = this.add.image(619, 419, "inputDodgeR").setOrigin(0, 0).setVisible(false);

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
			this.timeRemainingText.setText("Time: " + Math.round(this.timeRemaining));
			//change health bar size based on health

			//Dodging
			if (this.keyRIGHTDODGE.isDown && !this.inputLockedOut) { //Player Right Dodge
				//handle right dodge movement
				this.inputDodgeR.setVisible(true);
			} else {
				this.inputDodgeR.setVisible(false);
			}
			if (this.keyLEFTDODGE.isDown && !this.inputLockedOut) { //Player Left Dodge
				//handle left dodge movement
				this.inputDodgeL.setVisible(true);
			} else {
				this.inputDodgeL.setVisible(false);
			}

			//Punching 
			if (this.keyRIGHTPUNCH.isDown && !this.inputLockedOut) { //Player Right Punch
				//play right punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
                console.log("right punch");
                this.tweens.add({
                    targets: this.fistLeft,
                    ease: "Bounce.easeIn",
                    paused: true,
                    yoyo: false,
                    angle: {
                        from: 0,
                        to: -45,
                        duration: 500
                    }
                }).play();
				this.inputPunchR.setVisible(true);
			} else {
				this.inputPunchR.setVisible(false);
			}
            
			if (this.keyLEFTPUNCH.isDown && !this.inputLockedOut) { //Player Left Punch
				//play left punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
                console.log("left punch");
                this.tweens.add({
                    targets: this.fistRight,
                    ease: "Bounce.easeIn",
                    paused: true,
                    yoyo: false,
                    angle: {
                        from: 0,
                        to: 45,
                        duration: 500
                    }
                }).play();
				this.inputPunchL.setVisible(true);
			} else {
				this.inputPunchL.setVisible(false);
			}
			
			//Enemy AI
			//Add here - done with a prefab and a set of states for the enemy to be in

			//Handle whether player or enemy takes damage
			//Add here - use a set of rectangle hitboxes to ddetermine whether the player is in range of the attack or not

			//Decrement time - 1 per second, accounting for delta time w/ different refresh rates, round to whole number
			this.timeRemaining -= 1 / this.game.loop.actualFps;
		} else {
			this.gameEnd();
		}
	}

	gameEnd(){
		this.scene.start("End");
	}
}
