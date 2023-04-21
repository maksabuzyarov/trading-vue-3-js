const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

global.port = '8080';

module.exports = (env, options) => ({
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /script_ww\.js$/,
        loader: 'worker-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      MOB_DEBUG: JSON.stringify(process.env.MOB_DEBUG),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    onListening: function (devServer) {
      const port = devServer.server.address().port;
      global.port = port;
    },
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get('/debug', function (req, res) {
        try {
          let argv = JSON.parse(req.query.argv);
          console.log(...argv);
        } catch (error) {
          //
        }
        res.send('[OK]');
      });
    },
  },
  optimization: {
    minimize: options.mode === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            reserved: ['_id', '_tf'], // for scripts std
          },
        },
      }),
    ],
  },
  devtool: 'source-map',
});
