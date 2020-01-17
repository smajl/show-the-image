import merge from 'webpack-merge';
import ZipPlugin from 'zip-webpack-plugin';
import common from './webpack.common';

const config = merge(common, {
  mode: 'production',
  plugins: [
    new ZipPlugin({
      filename: 'dist.zip',
    }),
  ],
});

export default config;
