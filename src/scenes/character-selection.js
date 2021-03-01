import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

const socket = io();

socket.onAny((event, info)=> {

});

const characters = {
    slots: [
        {name: 'None', texture: 'none'},
        {name: 'None', texture: 'none'},
        {name: 'None', texture: 'none'},
    ],
    initialize(game, player) {
        this.game = game;
        this.player = player;
        this.createSprites();
    },
    createSprites() {
        this.slots.forEach((slot, index)=> {
            slot.sprite = this.game.physics.add.sprite(index * 240 + 160,100, slot.texture);
            slot.nameSprite = this.game.add.dom(slot.sprite.x, slot.sprite.y - 20).createFromHTML(`
            <h1>${slot.name}</h1>
            `);
            this.setCollision(slot);
        });
    },
    setCollision(slot) {
        this.game.physics.add.collider(
            this.player.sprite,
            slot.sprite,
            null,
            (p,a)=> {
                this.loadNextScene();
            },
            this.game
        );
    },
    loadNextScene() {
        this.player.dest = {x: 300, y: 400};
        this.game.scene.start('CreationBody');
    },
};

export const CharacterSelection = Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterSelection() {
        Phaser.Scene.call(this, {key: 'CharacterSelection'});
    },

    preload: function() {
        this.load.image('bg','/assets/char-select.png');
        this.load.image('none', '/assets/none.png');
        this.load.image('arrow', '/assets/direction-arrow.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create: function() {
        const background = new GameClass.Background({spriteKey: 'bg'});
    
        background.initialize(this);
        player.initialize(this);
        characters.initialize(this, player);
    },
    update: function() {
        player.moveToDest();
    },
});