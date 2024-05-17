class Play extends Phaser.Scene {
	constructor() {
		super("playScene");
	}

	init() {
		this.hitBoxGroup = this.add.group({
			runChildUpdate: true
		})
	}

	preload() {
		
	}

	create() {
		//Background
		this.background = this.add.image(width/2, 0, "background").setOrigin(0.5, 0);

		//blood
		this.blood = this.add.image(0, 0, "blood").setOrigin(0).setAlpha(0)

		this.bloodAlpha = 0

		//Animations
		this.anims.create({
			key: "idle",
			repeat: -1,
			frameRate: 1,
			frames: this.anims.generateFrameNumbers("Little Mac", {
				start: 0,
				end: 0
			})
		})

		this.anims.create({
			key: "windup",
			repeat: -1,
			frameRate: 1,
			frames: this.anims.generateFrameNumbers("Little Mac", {
				start: 1,
				end: 1
			})
		})

		this.anims.create({
			key: "punch",
			repeat: -1,
			frameRate: 1,
			frames: this.anims.generateFrameNumbers("Little Mac", {
				start: 2,
				end: 2
			})
		})

		//variables
		this.timeRemaining = 60;
		this.playerHealth = 100;
		this.enemyHealth = 100;
		this.gameOver = false;
		this.inputLockedOut = false;
		this.comboLockedOut = false;

		this.punchFatigue = false

		//Health UI - two rectangles, on top left and top right, both red
		this.playerHealthBar = this.add.rectangle(0, 10, 400, 20, 0xFF0000).setOrigin(0, 0);
		this.enemyHealthBar = this.add.rectangle(width - 390, 10, 400, 20, 0xFF0000).setOrigin(0, 0);
		this.playerHealthText = this.add.bitmapText(10, 14, "blockFont", "PLAYER", 12).setOrigin(0, 0);
		this.enemyHealthText = this.add.bitmapText(width-10, 14, "blockFont", "BOXER", 12).setOrigin(1, 0);

    	//enemy
   		this.LittleMac = new Enemy(this, width/2 + 400, 400, "Little Mac", 0, 3).setScale(.8);

		//Time UI - top center, white
        this.timeRemainingText = this.add.bitmapText(width/2-20, 32, "blockFont", "TIME: " + this.timeRemaining, 20, 1).setOrigin(0.5, 0);

		//Player Left Fist
		this.leftFist = this.add.image(0, 340, "fistLeft").setOrigin(0, 0);
        this.leftFist.setScale(0.25);
		//Player Right Fist (img dimensions: 1632x1224)
		this.rightFist = this.add.image(width - 30, 340, "fistRight").setOrigin(1, 0);
        this.rightFist.setScale(0.25);
        //Gun, Left (off screen)
        this.leftGun = this.add.image(0, height, "gunRight").setOrigin(0, 0);
        this.leftGun.flipX = true;
        this.leftGun.setScale(0.3);
        //Gun, Right (off screen)
        this.rightGun = this.add.image(width, height, "gunRight").setOrigin(1, 0);
		this.rightGun.setScale(0.3);
		//Explosive
		this.explosive = this.add.image(width / 2, height, "explosive").setOrigin(1, 0);
		this.explosive.setScale(0.09).setRotation(Phaser.Math.DegToRad(-45));
		this.explosive.setX(this.explosive.x - 400);
		//Rocket
		this.rocket = this.add.image(width / 2, height, "rocket").setOrigin(0.5, 0);
		this.rocket.setScale(0.18).setRotation(Phaser.Math.DegToRad(-45));
		this.rocket.setX(this.rocket.x + 400);

		//add sfx
		this.drumMid = this.sound.add("drumMiddle", {
            mute: false,
            volume: 1,
            loop: false
        });
		this.drumSide = this.sound.add("drumSide", {
			mute: false,
			volume: 1,
			loop: false
		});
		this.ough = this.sound.add("ough", {
			mute: false,
			volume: 1,
			loop: false
		});
		this.punch = this.sound.add("punchLand", {
			mute: false,
			volume: 1,
			loop: false
		});
		//add background track
		this.bgm = this.sound.add("mainBGM", {
			mute: false,
			volume: 1,
			loop: true
		}).play();

		//combo flag

		this.comboFlag = false

		this.playerHitbox = this.add.group({
			runChildUpdate: true
		})

		//punch hitboxes
		this.hitBoxLeft = this.physics.add.image(game.config.width/2 - 45, game.config.height/2, "hitbox").setActive(false)
		this.hitBoxRight = this.physics.add.image(game.config.width/2 + 45, game.config.height/2, "hitbox").setActive(false)

		this.hitBoxLeft.setImmovable(true)
		this.hitBoxRight.setImmovable(true)

		this.playerHitbox.add(this.hitBoxLeft)
		this.playerHitbox.add(this.hitBoxRight)

		//colliders
		this.physics.add.overlap(this.playerHitbox, this.LittleMac, () => {
			console.log("PUNCH LANDED")
			//play sfx
			this.punch.play();
			this.enemyHealth -= 10
			if(this.comboFlag){
				this.enemyHealth -= 20
				this.comboFlag = false
			}
			this.LittleMac.tint = '0xFF0000'
            setTimeout(() => {
                this.LittleMac.tint = '0xFFFFFF'
            }, 200)
		}, (player, enemy) => {
			if(player.active == true && !this.punchFatigue) {
				this.punchFatigue = true
				return true
			} else {
				return false
			}
		} )
		
		this.physics.add.overlap(this.hitBoxGroup, this.playerHitbox, () => {
			console.log("YEEEOUCH")
			//play sfx
			this.ough.play();
			this.playerHealth -= 10
			this.bloodAlpha += 0.08
		}, (enemy, player) => {
			if(enemy.active == true && !this.LittleMac.hurtFatigue) {
				this.LittleMac.hurtFatigue = true
				return true
			} else {
				return false
			}
		})

		//Input Display
		//use taiko no tatsujin drum icons? switch between white and red/blue for input off and on
		this.drum = this.add.image(550, 455, "inputDrum").setOrigin(0, 0);
		this.inputPunchL = this.add.image(563, 463, "inputPunchL").setOrigin(0, 0).setVisible(false);
		this.inputPunchR = this.add.image(618, 464, "inputPunchR").setOrigin(0, 0).setVisible(false);
		this.inputDodgeL = this.add.image(548, 449, "inputDodgeL").setOrigin(0, 0).setVisible(false);
		this.inputDodgeR = this.add.image(619, 449, "inputDodgeR").setOrigin(0, 0).setVisible(false);

		//Inputs
        this.keyLEFTPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRIGHTPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyLEFTDODGE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		this.keyRIGHTDODGE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //Combos
        //  Key combos
        //      Left punch, right punch, left punch: Toss improvised explosive (left hand)
        let explosiveCombo = [this.keyLEFTPUNCH, this.keyRIGHTPUNCH, this.keyLEFTPUNCH];
        //      Right punch, left punch, right punch: Rocket punch (right hand)
        let rocketCombo = [this.keyRIGHTPUNCH, this.keyLEFTPUNCH, this.keyRIGHTPUNCH];
        //      Dodge left, dodge right, left punch: Gun
		let gunComboLeft = [this.keyLEFTDODGE, this.keyRIGHTDODGE, this.keyLEFTPUNCH];
		//      Dodge right, dodge left, right punch: Gun
        let gunComboRight = [this.keyRIGHTDODGE, this.keyLEFTDODGE, this.keyRIGHTPUNCH];
        //  Explosive combo
        //      Combo objects
        this.explosiveCombo = this.input.keyboard.createCombo(explosiveCombo, {
            resetOnWrongKey: true,
            resetOnMatch: true,
            maxKeyDelay: 200,
            deleteOnMatch: false
        });
        this.rocketCombo = this.input.keyboard.createCombo(rocketCombo, {
            resetOnWrongKey: true,
            resetOnMatch: true,
            maxKeyDelay: 200,
            deleteOnMatch: false
        });
        this.gunComboLeft = this.input.keyboard.createCombo(gunComboLeft, {
            resetOnWrongKey: true,
            resetOnMatch: true,
            maxKeyDelay: 200,
            deleteOnMatch: false
        });
        this.gunComboRight = this.input.keyboard.createCombo(gunComboRight, {
            resetOnWrongKey: true,
            resetOnMatch: true,
            maxKeyDelay: 200,
            deleteOnMatch: false
        });
        //      Combo event
        this.input.keyboard.on('keycombomatch', (event) => {
            //Stuff to run for every combo
			//make everything invisible
			if (!this.comboLockedOut) {
				this.drum.setVisible(false);
				this.leftFist.setVisible(false);
				this.rightFist.setVisible(false);
				this.explosive.setVisible(true);
				this.rocket.setVisible(true);
				this.inputLockedOut = true;
				this.comboLockedOut = true;
				//make everything visible again after 2s
				this.time.addEvent({
					delay: 2000,
					callback: () => {
						this.drum.setVisible(true);
						this.leftFist.setVisible(true);
						this.rightFist.setVisible(true);
						this.inputLockedOut = false;
						this.comboLockedOut = false;
					}
				});
				this.time.addEvent({
					delay: 1041,
					callback: () => {
						this.explosive.setVisible(false);
						this.rocket.setVisible(false);
					}
				});

				if (this.explosiveCombo.matched) {
					//Launch improvised explosive
					this.tweens.add({
						targets: this.explosive,
						ease: "Quadratic.easeIn",
						paused: true,
						yoyo: true,
						x: {
							from: this.explosive.x,
							to: this.explosive.x + 320,
							duration: 1000
						},
						y: {
							from: height,
							to: height - 320,
							duration: 1000
						}
					}).play();
					setTimeout(() => {
						this.playerHealth -= 10
						this.enemyHealth -= 30
						this.bloodAlpha += .08
						this.LittleMac.tint = '0xFF0000'
						setTimeout(() => {
							this.LittleMac.tint = '0xFFFFFF'
						}, 200)
						
					}, 950)
				}
				else if (this.rocketCombo.matched) {
					//Launch rocket punch
					this.tweens.add({
						targets: this.rocket,
						ease: "Quadratic.In",
						paused: true,
						yoyo: true,
						x: {
							from: this.rocket.x,
							to: this.rocket.x - 360,
							duration: 1000
						},
						y: {
							from: height,
							to: height - 360,
							duration: 1000
						}
					}).play();
					setTimeout(() => {
						this.playerHealth -= 5
						this.enemyHealth -= 40
						this.LittleMac.tint = '0xFF0000'
						this.bloodAlpha += .04
						setTimeout(() => {
							this.LittleMac.tint = '0xFFFFFF'
						}, 200)
					}, 1000)
				}
				else if (this.gunComboLeft.matched) {
					//Shoot a gun (left hand)
					this.tweens.add({
						targets: this.leftGun,
						ease: "Quadratic.easeIn",
						paused: true,
						yoyo: true,
						x: {
							from: this.leftGun.x,
							to: this.leftGun.x + 320,
							duration: 1000
						},
						y: {
							from: height,
							to: height - 320,
							duration: 1000
						}
					}).play();
					setTimeout(() => {
						this.hitBoxRight.setActive(true)
						this.comboFlag = true
						setTimeout(() => {
							this.hitBoxRight.setActive(false)
							this.punchFatigue = false
						}, 200)
					}, 950)
				}
				else if (this.gunComboRight.matched) {
					//Shoot a gun (right hand)
					this.tweens.add({
						targets: this.rightGun,
						ease: "Quadratic.In",
						paused: true,
						yoyo: true,
						x: {
							from: this.rightGun.x,
							to: this.rightGun.x - 320,
							duration: 1000
						},
						y: {
							from: height,
							to: height - 320,
							duration: 1000
						}
					}).play();
					setTimeout(() => {
						this.hitBoxLeft.setActive(true)
						this.comboFlag = true
						setTimeout(() => {
							this.hitBoxLeft.setActive(false)
							this.punchFatigue = false
						}, 200)
					}, 950)
				}
			}
        })
	} //end create function

	update() {
		if (!this.gameOver) {
			//Handling end conditions
			//update blood alpha
			this.blood.setAlpha(this.bloodAlpha)
			if (this.timeRemaining <= 0 || this.playerHealth <= 0 || this.enemyHealth <= 0) {
				this.gameOver = true;
				if(this.playerHealth <= 0){
					gameWon = false;
				}
				else {
					if(this.playerHealth > this.enemyHealth){
						gameWon = true;
					}
					else {
						gameWon = false;
					}
				}
			}

			//Update UI
			this.timeRemainingText.setText("Time: " + Math.round(this.timeRemaining));
			//change health bar size based on health, shrink from the left side going towards the edge of the screen
			this.playerHealthBar.setSize(this.playerHealth * 4, 20);
			this.enemyHealthBar.setSize(this.enemyHealth * 4, 20);
			//move enemy health bar to accomodate for the new size
			this.enemyHealthBar.x = width - this.enemyHealthBar.width;

			//Dodging
			if (this.keyRIGHTDODGE.isDown && !this.inputLockedOut && !this.comboLockedOut) { //Player Right Dodge
				//handle right dodge visual movement
				//tween little mac & background
				//barriers: 380 to prevent right-scootng, 900 to prevent left-scooting?
				if(this.background.x > 380){
					this.tweens.add({
						targets: [this.LittleMac, this.background, this.timeRemainingText],
						paused: true,
						yoyo: false,
						x: '-=130',
						duration: 550
					}).play();
				}

				//play sfx
				this.drumSide.play();

				//cooldown
				this.inputLockedOut = true;
                this.time.addEvent({
                    delay: 1000, //a little extra time to be safe
                    callback: () => {
                        this.inputLockedOut = false;
                    },
                    loop: false
                })
				this.inputDodgeR.setVisible(true);
			} else {
				this.inputDodgeR.setVisible(false);
      }
			if (this.keyLEFTDODGE.isDown && !this.inputLockedOut && !this.comboLockedOut) { //Player Left Dodge
				//handle left dodge visual movement
				//tween little mac & background
				//left barrier is 900
				if(this.background.x < 900){
					this.tweens.add({
						targets: [this.LittleMac, this.background, this.timeRemainingText],
						paused: true,
						yoyo: false,
						x: '+=130',
						duration: 550
					}).play();
				}

				//play sfx
				this.drumSide.play();

				//cooldown
				this.inputLockedOut = true;
                this.time.addEvent({
                    delay: 1000, //a little extra time to be safe
                    callback: () => {
                        this.inputLockedOut = false;
                    },
                    loop: false
                })
				this.inputDodgeL.setVisible(true);
			} else {
				this.inputDodgeL.setVisible(false);
			}
			//Punching 
			if (this.keyRIGHTPUNCH.isDown && !this.inputLockedOut && !this.comboLockedOut) { //Player Right Punch
				//play sfx
				this.drumMid.play();
				//play right punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
                this.tweens.add({
                    targets: this.rightFist,
                    ease: "Bounce.easeIn",
                    paused: true,
                    yoyo: true,
                    angle: {
                        from: 0,
                        to: 45,
                        duration: 500
                    },
                    x: {
                        from: this.rightFist.x,
                        to: this.rightFist.x-320,
                        duration: 500
                    }
                }).play();
				setTimeout(() => {
					this.hitBoxRight.setActive(true)
					setTimeout(() => {
						this.hitBoxRight.setActive(false)
						this.punchFatigue = false
					}, 200)
				}, 500)

                //cooldown
                this.inputLockedOut = true;
                this.time.addEvent({
                    delay: 1000, //a little extra time to be safe
                    callback: () => {
                        this.inputLockedOut = false;
                    },
                    loop: false
                })
				this.inputPunchR.setVisible(true);
			}
             else {
				this.inputPunchR.setVisible(false);
			}
            
			if (this.keyLEFTPUNCH.isDown && !this.inputLockedOut && !this.comboLockedOut) { //Player Left Punch
				//play sfx
				this.drumMid.play();
				//play left punch animation - maybe just like move fist sprite towards enemy sprite and make it a bit smaller
				this.tweens.add({
                    targets: this.leftFist,
                    ease: "Bounce.easeIn",
                    paused: true,
                    yoyo: true,
                    angle: {
                        from: 0,
                        to: -45,
                        duration: 500
                    },
                    x: {
                        from: this.leftFist.x,
                        to: this.leftFist.x+320,
                        duration: 500
                    }
                }).play();
                //cooldown
				setTimeout(() => {
					this.hitBoxLeft.setActive(true)
					setTimeout(() => {
						this.hitBoxLeft.setActive(false)
						this.punchFatigue = false
					}, 200)
				}, 300)
                this.inputLockedOut = true;
                this.time.addEvent({
                    delay: 1000, //a little extra time to be safe
                    callback: () => {
                        this.inputLockedOut = false;
                        console.log("unfix input");
                    },
                    loop: false
                })
				this.inputPunchL.setVisible(true);
			}
            else {
				this.inputPunchL.setVisible(false);
			}
			
			//Enemy AI
			//Add here - done with a prefab and a set of states for the enemy to be in
            this.LittleMac.update()
			//Handle whether player or enemy takes damage
			//Add here - use a set of rectangle hitboxes to determine whether the player is in range of the attack or not

			//Decrement time - 1 per second, accounting for delta time w/ different refresh rates, round to whole number
			this.timeRemaining -= 1 / this.game.loop.actualFps;
		} else {
			this.gameEnd();
		}
	} //end update

	gameEnd(){
		this.sound.stopAll();
		this.scene.start("endScene");
	}
}
