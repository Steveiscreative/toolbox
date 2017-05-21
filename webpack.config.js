const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MainStylesheet = new ExtractTextPlugin("./assets/css/style.css");

const config = {
  entry: "./src/assets/webpack.entry.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "./assets/js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /style\.scss$/,
        use: MainStylesheet.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          publicPath: '../',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: './assets/img/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?' + JSON.stringify({
          name: 'icon-[1]',
          prefixize: true,
          regExp: './src/assets/svg/(.*)\\.svg',
          esModule: true
        })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".scss", ".svg"]
  },
  plugins: [
    MainStylesheet,
    new HtmlWebpackPlugin({
      title: "Index",
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: false
    })
  ]
};

if (process.env.NODE_ENV !== 'production') {
  config.devServer = {
    port: 8081,
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    overlay: {
      warnings: true,
      errors: true
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
