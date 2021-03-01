import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

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
        const backBtn = document.querySelector('#back');
        backBtn.onclick = ()=> { this.goBack(); };
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
    },
    goBack() {
        this.player.dest = {x: 325, y: 320};
        this.game.scene.start('CreationBody');
    }
};

const socket = io();

const gameData = {
    player: {
        slots: []
    }
}

socket.onAny((event, info)=> {

});

export const CreationStats = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CreationStats() {
        Phaser.Scene.call(this, {key: 'CreationStats'});
    },

    preload: function() {
        this.load.html('info', '/html/create-character.html');
        this.load.image('none', '/assets/none.png');
        this.load.image('bg', '/assets/char-create-min.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }
    },
    create:function() {
        const bg = new GameClass.Background({ spriteKey: 'bg'});
        
        bg.initialize(this);
        player.initialize(this);
        info.initialize(this, player);
        
        player.setScale(1.25);
    },
    update: function() {},
});