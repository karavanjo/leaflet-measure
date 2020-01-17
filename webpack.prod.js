const resolve = require('path').resolve;

const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = resolve(__dirname, 'dist');

const copyAssets = new CopyPlugin([{ from: './assets', to: 'assets', ignore: '*.svg' }]);
const copySite = new CopyPlugin([{ from: './example', to: './' }]);

const extractSass = new ExtractTextPlugin({ filename: 'leaflet-measure.css' });

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader?optional=runtime',
    options: { presets: ['babel-preset-env'] }
  }
};

const htmlLoader = {
  test: /\.html$/,
  use: { loader: 'html-loader?interpolate' }
};

const scssLoader = {
  test: /\.scss$/,
  use: extractSass.extract({
    use: [{ loader: 'css-loader', options: { url: false } }, { loader: 'sass-loader' }],
    fallback: 'style-loader'
  })
};

module.exports = {
  entry: ['./src/leaflet-measure.js'],
  output: {
    filename: `leaflet-measure.js`,
    path: BUILD_DIR,
    publicPath: '/dist/'
  },
  module: {
    rules: [jsLoader, htmlLoader, scssLoader]
  },
  plugins: [copySite, copyAssets, extractSass]
};
