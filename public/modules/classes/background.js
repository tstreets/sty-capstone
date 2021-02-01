export class Background {

    /**
     * Declare properties used in this class
     * @param {{boundsConfig: []any, spriteKey: string}} config Configuration for background
     */
    constructor(config = {spriteKey: '', boundsConfig: []}) {
        this.scene = null;
        this.sprite = null;
        this.bounds = [];
        this.boundsConfig = config.boundsConfig || [];
        this.spriteKey = config.spriteKey || null;
    }

    /**
     * Initialize an instance of in the scene
     * @param {Phaser.Scene} scene Reference to current scene
     */
    initialize(scene) {
        this.scene = scene;
        if(this.scene) this.createSprite();
    }

    /**
     * Create a sprite for this object
     */
    createSprite() {
        this.sprite = this.scene.add.sprite(0, 600, this.spriteKey);
        this.sprite.setOrigin(0,1);
    }

    /**
     * Create scene bounds that limit player's movements
     * Not needed in battles
     * @param {Player} player 
     */
    setBounds(player) {
        for(let boundRef of this.boundsConfig) {
            this.bounds.push(
                this.scene.physics.add.staticSprite(boundRef.x, boundRef.y)
                .setSize(boundRef.w, boundRef.h)
            );
        }
        for(let bound of this.bounds) {
            this.scene.physics.add.collider(
                player.sprite,
                bound,
                null,
                (p,b)=> {
                    p.body.stop(); player.dest = null;
                },
                this.scene
            );
        }
    }
};