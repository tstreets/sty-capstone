import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import * as GameClass from '../class.js';

const signup = {
    initialize(game) {
        this.game = game;
        this.createEl();
    },
    createEl() {
        this.game.add.dom(0,0).createFromCache('signup').setOrigin(0,0);
        this.el = document.querySelector('#signup');
        this.setInteractions();
    },
    setInteractions() {
        this.el.onsubmit = e=> {
            e.preventDefault();
            this.signup();
        }
        const loginEl = document.querySelector('#login');
        loginEl.onclick = ()=> { this.login() };
    },
    signup() {
        if(this.validateInfo()) {
            socket.emit('signup user', this.info);
        }
        else {
            console.log('Required Fields')
        }
    },
    login() {
        signup.nextScene('Login');
    },
    validateInfo() {
        this.info = Object.fromEntries(new FormData(this.el));
        const errors = [];
        if(!this.info.email.trim()) errors.push('email');
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
    if(event == 'signup') {
        if(info.status) {
            signup.nextScene('CreationBody');
        }
        else {
            if(info.fail == 'username') {
                console.warn('Username');
            }
            else {
                console.warn('Password');
            }
        }
    }
});

export const Signup = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Signup() {
        Phaser.Scene.call(this, {key: 'Signup'});    
    },

    preload: function() {
        this.load.html('signup','/html/signup.html');
    },
    create: function() {
        const bg = new GameClass.Background({spriteKey: 'bg login'});

        signup.initialize(this);
        bg.initialize(this);
    },
    update: function() {},
});