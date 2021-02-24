const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/game.js',
    output: {
        filename: 'game.js',
        path: path.join(__dirname, 'public', 'js')
    },
};