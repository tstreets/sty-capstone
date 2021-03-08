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
        this.setSlots();
    },
    setSlots() {
        this.slots = this.player.data.slots;
        console.log(this.slots);
        this.createSprites();
    },
    createSprites() {
        this.slots.forEach((slot, index)=> {
            slot.sprite = this.game.physics.add.sprite(index * 240 + 160,100, slot.texture);
            slot.nameSprite = this.game.add.dom(slot.sprite.x, slot.sprite.y - 40).createFromHTML(`
            <h1 style='font-size: 16px;'>${slot.name}</h1>
            `);
            slot.index = index;
            this.setCollision(slot);
        });
    },
    setCollision(slot) {
        this.game.physics.add.collider(
            this.player.sprite,
            slot.sprite,
            null,
            (p,a)=> {
                this.player.currentSlot = slot.index;
                this.loadNextScene(slot);
            },
            this.game
        );
    },
    loadNextScene(slot) {
        this.player.dest = {x: 300, y: 400};
        if(slot.name == "None") {
            this.game.scene.start('CreationBody');
        }
        else {
            this.game.scene.start('MainGame');
        }
    },
};

export const CharacterSelection = Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CharacterSelection() {
        Phaser.Scene.call(this, {key: 'CharacterSelection'});
    },

    preload: function() {
        this.load.image('bg char select','/assets/char-select.png');
        console.log(player.data);
    },
    create: function() {
        const background = new GameClass.Background({spriteKey: 'bg char select'});
    
        background.initialize(this);
        player.initialize(this);
        characters.initialize(this, player);
    },
    update: function() {
        player.moveToDest();
    },
});