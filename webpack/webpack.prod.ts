// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../typings/filemanager-webpack-plugin.d.ts"/>
import merge from 'webpack-merge';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import common from './webpack.common';

const config = merge(common, {
  mode: 'production',
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        archive: [{ source: 'dist', destination: 'dist.zip' }],
      },
    }),
  ],
});

export default config;
