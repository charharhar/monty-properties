const path = require('path')
const { path: appRoot } = require('app-root-path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function removeEmpty (x) {
  return x.filter(y => y != null);
}

function ifElse (condition) {
  return function ifElseResolver (then, or) {
    const execIfFunc = x => (typeof x === 'function' ? x() : x);
    return condition ? execIfFunc(then) : (or);
  }
}

function configFactory(env, argv) {
  const isDev = argv.mode === 'development';
  const isProd = argv.mode === 'production';

  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);

  let webpackConfig = {
    entry: {
      home: removeEmpty([
        ifDev('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'),
        path.resolve(appRoot, './public/js/home'),
      ]),
      about: removeEmpty([
        ifDev('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'),
        path.resolve(appRoot, './public/js/about'),
      ]),
    },

    output: {
      path: path.join(appRoot, './dist'),
      filename: '[name].js',
      publicPath: ifDev('http://localhost:3000/build/', '/'),
    },

    target: 'web',

    devtool: isProd ? 'none' : 'cheap-eval-source-map',

    mode: argv.mode,

    optimization: {
      minimizer: removeEmpty([
        ifProd(() =>
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
          })
        ),
        ifProd(() => new OptimizeCSSAssetsPlugin({})),
      ])
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['cache-loader', 'babel-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: isProd },
            }
          ]
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          rules: removeEmpty([
            ifProd({
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: './webpack/postcss.config.js',
                    }
                  },
                },
                'sass-loader',
              ]
            }),
            ifDev({
              use: [
                'cache-loader',
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: './webpack/postcss.config.js',
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    includePaths: [path.join(appRoot, './public')],
                  },
                },
              ]
            })
          ])
        },
        {
         test: /\.(png|svg|jpg|jpeg|gif)$/,
         loader: 'file-loader',
        },
      ]
    },

    plugins: removeEmpty([
      new HtmlWebPackPlugin({
        template: path.resolve(appRoot, './views/home.html'),
        filename: './home.html',
        excludeChunks: ['server'],
        chunks: ['home'],
      }),

      new HtmlWebPackPlugin({
        template: path.resolve(appRoot, './views/about.html'),
        filename: './about.html',
        excludeChunks: ['server'],
        chunks: ['about'],
      }),

      ifDev(() => new webpack.NoEmitOnErrorsPlugin()),

      ifDev(() => new webpack.HotModuleReplacementPlugin()),

      ifDev(() => new webpack.NamedModulesPlugin()),

      ifProd(() =>
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        })
      )
    ])
  }

  return webpackConfig
}

module.exports = configFactory
