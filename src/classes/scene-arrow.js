export class SceneArrows {

    /**
     * 
     * @param {{x: number, y: number, scene: string, dest: {x: number, y: number}}[]} arrows 
     */
    constructor(arrows) {
        this.arrows = arrows;
        this.game = null;
        this.player = null;
    }
    
    /**
     * Set the game and player reference
     * @param {Phaser.Game} game 
     * @param {Player} player 
     */
    initialize(game, player) {
        this.game = game;
        this.player = player;
        if(this.game && this.player) {
            this.setSprite();
        }
        else {
            console.warn('game not set');
        }
    }

    /**
     * Create an sprite instance in current game
     */
    setSprite() {
        for(let arrow of this.arrows) {
            arrow.sprite = this.game.add.sprite(arrow.x, arrow.y,'arrow');
            arrow.bounds = this.game.physics.add.staticSprite(arrow.x, arrow.y);
            arrow.bounds.setSize(300, 50);
            this.setCollision(arrow);
        }
    }
    
    /**
     * Creates collision between player and arrow
     * @param {any} arrow 
     */
    setCollision(arrow) {
        this.game.physics.add.collider(
            this.player.sprite,
            arrow.bounds,
            null,
            (p,a)=> {
                this.loadNextScene(p, arrow);
            },
            this.game
        );
    }
    
    /**
     * Loads the next game if player is ready
     * @param {Player} p 
     * @param {any} arrow 
     */
    loadNextScene(p, arrow) {
        p.body.stop();
        this.player.dest = null;
        if(this.player.texture != 'none') {
            this.player.dest = arrow.dest;
            this.game.scene.start(arrow.scene);
        }
        else {
            alert('Go Back');
        }
    }
};