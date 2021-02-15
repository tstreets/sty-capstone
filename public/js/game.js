import * as GameClasses from '../modules/classes.js';

const gameData = {
    player: {
        slots: [],
    },
};

const player = new GameClasses.Player();

const MainGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainGame() {
        Phaser.Scene.call(this, {key: 'MainGame'});
    },

    preload: function() {
        this.load.image('bg', '/assets/char-create-min.png');
        for(let char of ['male-1','male-2','female-1','female-2', 'zombie']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create: function() {
        const bg = new GameClasses.Background({ spriteKey: 'bg'} );
        const zombie = new GameClasses.Zombie();

        bg.initialize(this);
        player.initialize(this);
        zombie.initialize(this);
    },
    update: function() {
        player.moveToDest();
    },
});

const CharacterCreationStats = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterCreationStats() {
        Phaser.Scene.call(this, {key: 'CharacterCreationStats'});
    },

    preload: function() {
        this.load.html('info', '/html/create-character.html');
        this.load.image('bg', '/assets/char-create-min.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create:function() {
        const bg = new GameClasses.Background({ spriteKey: 'bg'});
        const info = {
            initialize(game, player) {
                this.game = game;
                this.player = player;
                if(this.game) this.createSprite();
            },
            createSprite() {
                this.sprite = this.game.add.dom(0,0).createFromCache('info');
                this.sprite.setOrigin(0,0);
                this.setInteractions();
            },
            setInteractions() {
                this.form = document.querySelector('#form-game-create-char');
                this.form.onsubmit = e=> {
                    e.preventDefault();
                    this.saveCharacter();
                };
                this.form.name.oninput = ()=> this.updatePlayerName();
            },
            saveCharacter() {
                const playerInfo = {
                    name: this.player.name,
                    texture: this.player.texture,
                    stats: {
                        sta: this.form.stamina.value,
                        atk: this.form.attack.value,
                        def: this.form.defense.value,
                    },
                };
                if(playerInfo.name && Object.values(playerInfo.stats).every(v=> !!v)) {
                    gameData.player.slots[0] = playerInfo;
                    this.game.scene.start('MainGame');
                }
                else {
                    console.log('Player');
                }
            },
            updatePlayerName() {
                this.player.setName(this.form.name.value);
            }
        };

        bg.initialize(this);
        player.initialize(this);
        info.initialize(this, player);
        
        player.setScale(1.25);
    },
    update: function() {},
})

const CharacterCreation = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterCreation() {
        Phaser.Scene.call(this, {key: 'CharacterCreation'});
    },

    preload: function() {
        this.load.image('bg', '/assets/char-create-min.png');
        this.load.image('arrow', '/assets/direction-arrow.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create: function() {
        const bg = new GameClasses.Background({ spriteKey: 'bg'});
        const charBodies = new GameClasses.CharacterBodies();
        const arrows = new GameClasses.SceneArrows([
            {x: 325, y: 50, scene: 'CharacterCreationStats', dest: {x: 525, y: 300}}, 
        ]);

        bg.initialize(this);
        player.initialize(this);
        charBodies.initialize(this, player);
        arrows.initialize(this, player)
    },
    update: function() {
        player.moveToDest();
    },
});

const gameConfig = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {debug: true},
    },
    dom: { createContainer: true },
    parent: 'game',
    width: 900,
    height: 600,
    scene: [CharacterCreation, CharacterCreationStats, MainGame],
};

const gameRef = new Phaser.Game(gameConfig);