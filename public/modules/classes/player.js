export class Player {

    /**
     * Declare properties used in this class
     */
    constructor() {
        this.scene = null;
        this.sprite = null;
        this.dest = {x: 325, y: 550};
        this.speed = 150;
        this.key = null;
    }

    /**
     * Initialize an instance in the current scene
     * @param {Phaser.Scene} scene Reference to current scene
     */
    initialize(scene) {
        this.scene = scene;
        if(this.scene) this.createSprite();
    }

    /**
     * Create a sprite for this object in the current scene
     */
    createSprite() {
        this.sprite = this.scene.physics.add.sprite(this.dest.x, this.dest.y, 'none 1');
        this.sprite.body.syncBounds = true;
        this.clickToMove();
    }

    /**
     * Move the player towards their set destination
     */
    moveToDest() {
        if(this.dest) {
            const xDist = this.sprite.x - this.dest.x;
            const yDist = this.sprite.y - this.dest.y;
            if(Math.abs(xDist) > 5 || Math.abs(yDist) > 5) {
                this.sprite.setVelocity(
                    (Math.abs(xDist) < 5) ? 0 : (xDist > 0) ? -this.speed : this.speed,
                    (Math.abs(yDist) < 5) ? 0 : (yDist > 0) ? -this.speed : this.speed
                );
            }
            else {
                this.dest = null;
                this.sprite.body.stop();
            }
        }
    }

    /**
     * Set the destination by mouse clicking onto the game
     */
    clickToMove() {
        this.scene.input.on('pointerdown', pointer=> {
            this.dest = {x: pointer.x, y: pointer.y};
        });
    }
};
