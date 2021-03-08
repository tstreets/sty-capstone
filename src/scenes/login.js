import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

const login = {
    initialize(game) {
        this.game = game;
        this.createEl();
    },
    createEl() {
        this.game.add.dom(0,0).createFromCache('login').setOrigin(0,0);
        this.el = document.querySelector('#login');
        this.setInteractions();
    },
    setInteractions() {
        this.el.onsubmit = e=> {
            e.preventDefault();
            this.login();
        }
        const signupEl = document.querySelector('#signup');
        signupEl.onclick = ()=> { this.signup() };
    },
    login() {
        if(this.validateInfo()) {
            socket.emit('login user', this.info);
        }
        else {
            console.log('Required Fields')
        }
    },
    signup() {
        this.nextScene('Signup');
    },
    validateInfo() {
        this.info = Object.fromEntries(new FormData(this.el));
        const errors = [];
        if(!this.info.username.trim()) errors.push('username');
        if(!this.info.password.trim()) errors.push('password');
        return !errors.length;
    },
    nextScene(sceneKey) {
        this.game.scene.start(sceneKey);
    }
}

const socket = io();

socket.onAny((event, info)=> {
    if(event == 'login') {
        if(info.status) {
            player.data = {
                username: info.user.username,
                slots: info.slots,
            };
            login.nextScene('CharacterSelection');
        }
    }
});

export const Login = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Login() {
        Phaser.Scene.call(this, {key: 'Login'});    
    },

    preload: function() {
        this.load.image('bg login', '/assets/char-select.png');
        this.load.image('none', '/assets/none.png');
        this.load.image('arrow', '/assets/direction-arrow.png');
        for(let char of ['male-1','male-2','female-1','female-2']) {
            this.load.spritesheet(char, `/assets/${char}.png`, {frameWidth: 96, frameHeight: 128});
        }

        this.load.html('login','/html/login.html');
        this.load.html('menu', '/html/menu.html');
    },
    create: function() {
        const background = new GameClass.Background({spriteKey: 'bg login'});

        login.initialize(this);
        background.initialize(this);
    },
    update: function() {},
});