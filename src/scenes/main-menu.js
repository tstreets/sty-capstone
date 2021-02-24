import * as Phaser from 'phaser';
import { io } from 'socket.io-client';

const mainMenu = {
    initialize(game) {
        this.game = game;
        this.createEl();
    },
    createEl() {
        this.game.add.dom(0,0).createFromCache('main-menu').setOrigin(0,0);
        this.el = document.querySelector('#main-menu');
        this.setInteractions();
    },
    setInteractions() {
        this.el.onsubmit = e=> {
            e.preventDefault();
            this.login();
        }
    },
    login() {
        if(this.validateInfo()) {
            socket.emit('login user', this.info);
        }
        else {
            console.log('Required Fields')
        }
    },
    signup() {},
    validateInfo() {
        this.info = Object.fromEntries(new FormData(this.el));
        const errors = [];
        if(!this.info.username.trim()) errors.push('username');
        if(!this.info.password.trim()) errors.push('password');
        return !errors.length;
    },
    nextScene() {
        this.game.scene.start('CharacterSelection');
    }
}

const socket = io();

socket.onAny((event, info)=> {
    if(event == 'login') {
        if(info.status) {
            mainMenu.nextScene();
        }
        console.log(info.status);
    }
});

export const MainMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainMenu() {
        Phaser.Scene.call(this, {key: 'MainMenu'});    
    },

    preload: function() {
        this.load.html('main-menu','/html/main-menu.html')
    },
    create: function() {
        mainMenu.initialize(this);
    },
    update: function() {},
});