import { Configuration } from 'webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const srcDir = '../src/';

const config: Configuration = {
  entry: {
    // popup: path.join(__dirname, srcDir + 'popup.tsx'),
    // options: path.join(__dirname, srcDir + 'options.ts'),
    background: path.join(__dirname, srcDir + 'background.ts'),
    content: path.join(__dirname, srcDir + 'content.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [new CopyPlugin([{ from: '.', to: '../' }], { context: 'public' })],
};

export default config;
