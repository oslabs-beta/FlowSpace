import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export default {
  entry: path.resolve(path.dirname(__filename), 'client', 'index.js'),
  output: {
    path: path.resolve(path.dirname(__filename), 'build'),
    filename: 'bundle.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude:/(node_modules|bower_components)/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: {
          loader: 'url-loader?limit=100000'
        }
    },
      // {
      //   test: /\.scss/,
      //   exclude: /node_modules/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'sass-loader' }
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html"
    }),
  ],
  devtool: 'eval-cheap-source-map',
  devServer: {
    proxy: {
      '/export': 'http://localhost:3333'
    }
  }
};