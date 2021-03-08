export class Player {

    /**
     * Declare properties used in this class
     */
    constructor() {
        this.game = null;
        this.sprite = null;
        this.dest = {x: 325, y: 550};
        this.speed = 150;
        this.texture = null;
        this.name = '';
        this.currentSlot = 0;
    }

    /**
     * Initialize an instance in the current game
     * @param {Phaser.Game} game Reference to current game
     */
    initialize(game) {
        this.game = game;
        if(this.game) this.createSprite();
    }

    /**
     * Create a sprite for this object in the current game
     */
    createSprite() {
        if(this.dest == null) {
            this.dest = {x: 325, y: 550};
        }
        let randTexture = 'none';
        this.sprite = this.game.physics.add.sprite(this.dest.x, this.dest.y, this.texture || randTexture);
        this.texture = this.texture || randTexture;
        this.setScale(1);
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
        this.game.input.on('pointerdown', pointer=> {
            this.dest = {x: pointer.x, y: pointer.y};
        });
    }

    /**
     * Set the scale for the player
     * @param {number} scale Number for player to be scaled by
     */
    setScale(scale) {
        this.sprite.setScale(scale);
    }

    /**
     * Set the name for the player
     * @param {string} name Name for the player 
     */
    setName(name) {
        this.name = name || this.name;
    }

    updateSprite() {
        const texture = this.data.slots[this.currentSlot].texture;
        const name = this.data.slots[this.currentSlot].name;
        this.sprite.destroy();
        this.sprite = this.game.physics.add.sprite(this.dest.x, this.dest.y, texture);
    }
};
