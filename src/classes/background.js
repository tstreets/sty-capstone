export class Background {

    /**
     * Declare properties used in this class
     * @param {{boundsConfig: []any, spriteKey: string}} config Configuration for background
     */
    constructor(config = {spriteKey: ''}) {
        this.game = null;
        this.sprite = null;
        this.bounds = [];
        this.spriteKey = config.spriteKey || null;
    }

    /**
     * Initialize an instance of the bg in the game
     * @param {Phaser.Game} game Reference to current game
     */
    initialize(game) {
        this.game = game;
        if(this.game) this.createSprite();
    }

    /**
     * Create a sprite for this object
     */
    createSprite() {
        this.sprite = this.game.add.sprite(0, 600, this.spriteKey);
        this.sprite.setOrigin(0,1);
    }
};