const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
  entry: './src/frontend/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/static/js'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'node_modules/@haiilo/catalyst/dist/catalyst/assets/fonts'),
      serveIndex: false, // Disable directory listing
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Updated to include .ts and .tsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Added .tsx and .ts to the list of resolved extensions
    fallback: {
      "process": false,
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({ // Add this line to copy the font files
      patterns: [
        {
          from: 'node_modules/@haiilo/catalyst/dist/catalyst/assets/fonts',
          to: 'assets/fonts', // Make sure this path matches $cat-font-path
        },
        {
          from: path.resolve(__dirname, 'src/backend/images'),// Source path for images
          to: 'images' // Destination path in your distribution
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(''),
    }),
  ]
};
