import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

const socket = io();

socket.onAny((event, info)=> {

});

export const MainGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainGame() {
        Phaser.Scene.call(this, {key: 'MainGame'});
    },

    preload: function() {
        this.load.image('bg main game', '/assets/char-select.png');
    },
    create:function() {
        const bg = new GameClass.Background({ spriteKey: 'bg main game'});
        const menu = new GameClass.Menu();
        
        bg.initialize(this);
        player.initialize(this);
        player.updateSprite();
        menu.initialize(this);
    },
    update: function() {
        player.moveToDest();
    },
});