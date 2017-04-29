const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'build/src/app'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './**/*',
                to: '../../',
                ignore: [
                    '**/build/**/*',
                    '**/node_modules/**/*',
                    // app is bundled separately
                    '**/src/app/**/*.js'
                ]
            }
        ])
    ]
};
