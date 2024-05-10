class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, level) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //physics parameters
        this.body.setCollideWorldBounds(true)
        this.onWorldBounds = true
        this.setOrigin(.5)

        //set custom parameters
        this.level = enemyLevel
        this.punchCooldown = false  //can it punch?
        this.windup = false         //is it punching?
        this.hitBox = scene.physics.add.image(game.config.width/2, game.config.height/2, "hitbox").setActive(false)
        this.hitBox.setImmovable(true)
        //this.hitBox.setScale(2)
        scene.hitBoxGroup.add(this.hitBox)
        this.scene = scene

        this.playerHitbox = game.config.width / 2   //the point that the AI drifts towards
        this.playerHitboxWidth = 30                 //the margin within which the AI will punch 

    }

    //enemy AI - runs every frame
    update() {
        //level one
        console.log("enemy x: ", this.x)
        console.log("enemy level: ", this.level)
        if(this.level == 1) {
            if(this.x > this.playerHitbox + this.playerHitboxWidth && !this.windup) {
                this.move(-100)
                console.log("Moving Right")
                this.anims.play("idle", false)
            }
            else if(this.x < this.playerHitbox - this.playerHitboxWidth && !this.windup) {
                this.move(100)
                console.log("Moving Left")
                this.anims.play("idle", false)
            } 
            else if(!this.windup && !this.punchCooldown) {
                this.stop()
                this.windup = true
                this.anims.play("windup", true)
                setTimeout(() => {
                    this.punch(2000)
                    this.windup = false
                }, 1000)
                console.log("Winding up")
            } else {
                this.stop()
            }

        }
        //level two
        else if(this.level == 2) {
            if(this.x > this.playerHitbox + this.playerHitboxWidth && !this.windup) {
                this.move(-175)
                console.log("Moving Right")
                this.anims.play("idle", false)
            }
            else if(this.x < this.playerHitbox - this.playerHitboxWidth && !this.windup) {
                this.move(175)
                console.log("Moving Left")
                this.anims.play("idle", false)
            } 
            else if(!this.windup && !this.punchCooldown) {
                this.stop()
                this.windup = true
                this.anims.play("windup", true)
                setTimeout(() => {
                    this.punch(1200)
                    this.windup = false
                }, 600)
                console.log("Winding up")
            } else {
                this.stop()
            }
        }
        //level three
        else {
            if(this.x > this.playerHitbox + this.playerHitboxWidth && !this.windup) {
                this.move(-300)
                console.log("Moving Right")
                this.anims.play("idle", false)
            }
            else if(this.x < this.playerHitbox - this.playerHitboxWidth && !this.windup) {
                this.move(300)
                console.log("Moving Left")
                this.anims.play("idle", false)
            } 
            else if(!this.windup && !this.punchCooldown) {
                this.stop()
                this.windup = true
                this.anims.play("windup", true)
                setTimeout(() => {
                    this.punch(700)
                    this.windup = false
                }, 500)
                console.log("Winding up")
            } else {
                this.stop()
            }
        }
    }

    //shift left and right
    move(speed) { //speed - from 1 to 100 - moves the body either left or right based on positive/negative
        this.body.setVelocityX(speed)
    }

    //stop moving
    stop() {
        this.body.setVelocityX(0)
    }

    //punch the player
    punch(cooldown) {
        this.punchCooldown = true
        //punching code 
            //I think this will spawn a different enemy type at the enemies location
            //and the collision checker in the main menu will handle the "punched" effects
        console.log("punched")
        this.anims.play("punch", true)
        this.hitBox.setActive(true)
        setTimeout(() => {
            this.hitBox.setActive(false)
        }, 200)
        setTimeout(() => {
            this.punchCooldown = false
        }, cooldown)
    }

}