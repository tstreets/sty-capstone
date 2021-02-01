import * as GameClasses from '../modules/classes.js';


const player = new GameClasses.Player();

const CharacterCreationName = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterCreationName() {
        Phaser.Scene.call(this, {key: 'CharacterCreationName'});
    },

    preload: function() {
        this.load.image('background', '/assets/char-select.png');
    },
    create: function() {
        const background = new GameClasses.Background({
            spriteKey: 'background'
        });
        

        background.initialize(this);
    },
    update: function() {},
})

const CharacterCreationBody = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterCreationBody() {
        Phaser.Scene.call(this, {key: 'CharacterCreationBody'});
    },

    preload: function() {
        this.load.image('arrow', '/assets/direction-arrow.png');
        this.load.image('screen char create', '/assets/char-create-min.png');
        const kenneysSpritesheets = ['male 1', 'male 2', 'female 1', 'female 2'];
        for(let name of kenneysSpritesheets) {
            this.load.spritesheet(name, `/assets/${name.split(' ').join('-')}.png`, {
                frameHeight: 128, frameWidth: 96
            });
        }
    },
    create: function() {
        const background = new GameClasses.Background({
            boundsConfig: [
                {x: 95, y: 80, w: 190, h: 160},
                {x: 545, y: 80, w: 190, h: 160},
                {x: 35, y: 315, w: 70, h: 300},
                {x: 605, y: 315, w: 70, h: 300},
                {x: 95, y: 535, w: 190, h: 130},
                {x: 545, y: 535, w: 190, h: 130},
            ],
            spriteKey: 'screen char create'
        });
        const bodies = new GameClasses.CharacterBodies(player);
        const arrows = new GameClasses.SceneArrows([
            {
                x: 325, y: 40, 
                scene: 'CharacterCreationName', 
                dest: {x: 325, y: 550}
            }
        ]);
        background.initialize(this);
        player.initialize(this);
        bodies.initialize(this, player);

        background.setBounds(player);
        arrows.initialize(this, player);
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
    parent: 'game',
    width: 900,
    height: 600,
    backgroundColor: '#454545',
    scene: [CharacterCreationName, CharacterCreationBody],
};

const game = new Phaser.Game(gameConfig);