const path = require('path');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  mode: 'development',
  target: 'node',
  externals: ['aws-sdk', nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: true,
                },
              },
            ],
            '@babel/typescript',
          ],
        },
        include: [__dirname],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
