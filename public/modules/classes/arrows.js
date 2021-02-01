export class SceneArrows {

    /**
     * 
     * @param {[{x: number, y: number, scene: string}]} arrows 
     */
    constructor(arrows) {
        this.arrows = arrows;
        this.scene = null;
        this.player = null;
    }
    
    /**
     * Set the scene and player reference
     * @param {Phaser.Scene} scene 
     * @param {Player} player 
     */
    initialize(scene, player) {
        this.scene = scene;
        this.player = player;
        if(this.scene && this.player) {
            this.setSprite();
        }
        else {
            console.warn('Scene not set');
        }
    }

    /**
     * Create an sprite instance in current scene
     */
    setSprite() {
        for(let arrow of this.arrows) {
            arrow.sprite = this.scene.physics.add.staticSprite(arrow.x, arrow.y,'arrow');
            this.setCollision(arrow);
        }
    }
    
    /**
     * Creates collision between player and arrow
     * @param {any} arrow 
     */
    setCollision(arrow) {
        this.scene.physics.add.collider(
            this.player.sprite,
            arrow.sprite,
            null,
            (p,a)=> {
                this.loadNextScene(p, arrow);
            },
            this.scene
        );
    }
    
    /**
     * Loads the next scene if player is ready
     * @param {Player} p 
     * @param {any} arrow 
     */
    loadNextScene(p, arrow) {
        p.body.stop();
        this.player.dest = null;
        if(this.player.texture) {
            this.player.dest = arrow.dest;
            this.scene.scene.start(arrow.scene);
        }
        else {
            alert('Go Back');
        }
    }
};