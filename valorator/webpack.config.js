const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            view: path.resolve(__dirname, 'src/view/'),
        }
    }
}