import { Scenes } from './scene.js';
import * as GameClass from './class.js';
const Phaser = require('phaser');

globalThis.player = new GameClass.Player();

const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    dom: {createContainer: true},
    physics: {
        default: 'arcade',
        arcade: {debug: true},
    },
    backgroundColor: '#252525',
    height: 600,
    width: 800,
    scene: Scenes
};

const gameObj = new Phaser.Game(gameConfig);