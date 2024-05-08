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
        this.level = level
        this.punchCooldown = false  //can it punch?
        this.windup = false         //is it punching?

        this.playerHitbox = game.config.width / 2   //the point that the AI drifts towards
        this.playerHitboxWidth = 30                 //the margin within which the AI will punch 

    }

    //enemy AI - runs every frame
    update() {
        //level one
        if(this.level = 1) {
            if(this.x > this.playerHitbox + this.playerHitboxWidth && !this.windup) {
                this.move(-25)
            }
            else if(this.x < this.playerHitbox - this.playerHitboxWidth && !this.windup) {
                this.move(25)
            } 
            else if(!this.windup && !this.punchCooldown) {
                this.stop()
                this.windup = true
                setTimeout(() => {
                    this.punch()
                    this.windup = false
                }, 1000)
            } else {
                this.stop()
            }

        }
        //level two
        else if(this.level = 2) {

        }
        //level three
        else {

        }
    }

    //shift left and right
    move(speed) { //speed - from 1 to 100 - moves the body either left or right based on positive/negative
        this.body.setVelocity(speed)
    }

    //stop moving
    stop() {
        this.body.setVelocity(0)
    }

    //punch the player
    punch() {
        this.punchCooldown = true
        //punching code 
            //I think this will spawn a different enemy type at the enemies location
            //and the collision checker in the main menu will handle the "punched" effects
        console.log("punched")
        setTimeout(() => {
            this.punchCooldown = false
        }, 2000)
    }

}