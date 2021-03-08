import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

const socket = io();

socket.onAny((event, info)=> {

});

export const CreationBody = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CreationBody() {
        Phaser.Scene.call(this, {key: 'CreationBody'});
    },

    preload: function() {
        this.load.image('bg create body','/assets/char-select.png');
    },
    create: function() {
        const bg = new GameClass.Background({ spriteKey: 'bg create body'});
        const charBodies = new GameClass.CharacterBodies();
        const arrows = new GameClass.SceneArrows([
            {x: 325, y: 50, scene: 'CreationStats', dest: {x: 525, y: 300}}, 
        ]);

        bg.initialize(this);
        player.initialize(this);
        charBodies.initialize(this, player);
        arrows.initialize(this, player)
    },
    update: function() {
        player.moveToDest();
    }
});