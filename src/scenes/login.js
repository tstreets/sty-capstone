import * as Phaser from 'phaser';
import { io } from 'socket.io-client';

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
            login.nextScene('CharacterSelection');
        }
        console.log(info.status);
    }
});

export const Login = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Login() {
        Phaser.Scene.call(this, {key: 'Login'});    
    },

    preload: function() {
        this.load.html('login','/html/login.html')
    },
    create: function() {
        login.initialize(this);
    },
    update: function() {},
});