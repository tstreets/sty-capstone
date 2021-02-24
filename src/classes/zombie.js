export class Zombie {
    constructor(config = {}) {
        this.x = config.x || config.y || 450;
        this.y = config.y || config.x || 300;
    }

    initialize(game) {
        this.game = game;
        this.setSprite();
    }

    setSprite() {
        this.sprite = this.game.physics.add.sprite(this.x, this.y, 'zombie');
        this.sprite.setScale(.75);
    }
}