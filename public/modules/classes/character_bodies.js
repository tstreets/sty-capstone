export class CharacterBodies {

    constructor() {
        this.scene = null;
        this.sprites = [
            {
                sprite: null,
                dest: {x: 125, y: 225},
                key: 'male-1'
            },
            {
                sprite: null,
                dest: {x: 525, y: 225},
                key: 'male-2'
            },
            {
                sprite: null,
                dest: {x: 125, y: 400},
                key: 'female-1'
            },
            {
                sprite: null,
                dest: {x: 525, y: 400},
                key: 'female-2'
            },
        ];
        this.playerRef = null;
    }

    initialize(scene, player) {
        this.scene = scene;
        this.playerRef = player;
        if(this.scene) this.setSprites();
    }

    setSprites() {
        this.sprites.forEach(s=> {
            s.sprite = this.scene.physics.add.sprite(s.dest.x, s.dest.y, s.key);
            s.sprite.setScale(.75);
            s.sprite.body.syncBounds = true;
            this.collisionCheck(s);
        });
    }

    collisionCheck(body) {
        this.scene.physics.add.overlap(
            this.playerRef.sprite,
            body.sprite,
            (p,b)=> {this.changeTexture(p,b)},
            null,
            this.scene
        );
    }

    changeTexture(p, b) {
        if(p.texture.key != b.texture.key) {
            p.setTexture(b.texture.key);
            p.setScale(.75);
            this.playerRef.texture = b.texture.key;
            this.playerRef.dest = null;
            p.body.stop();
            p.x = 325;
            p.y = 320;
        }
    }
}