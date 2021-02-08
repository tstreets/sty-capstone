import * as GameClasses from '../modules/classes.js';

const player = new GameClasses.Player();

const CharacterCreationStats = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterCreationStats() {
        Phaser.Scene.call(this, {key: 'CharacterCreationStats'});
    },

    preload: function() {
        this.load.image('bg', '/assets/char-create-min.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create:function() {
        const bg = new GameClasses.Background({ spriteKey: 'bg'});

        bg.initialize(this);
        player.initialize(this);
        
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
            {x: 325, y: 50, scene: 'CharacterCreationStats', dest: {x: 325, y: 300}}, 
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
    scene: [CharacterCreation, CharacterCreationStats],
};

const gameRef = new Phaser.Game(gameConfig);