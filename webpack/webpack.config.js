const path = require('path')
const fs = require('fs');
const { path: appRoot } = require('app-root-path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier');
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

function getHtmlWebPackViews() {
  const htmlWebPackViews = [];
  const viewsDir = path.resolve(appRoot, './views')
  const files = fs.readdirSync(viewsDir);

  files.forEach(fileName => {
    const fileChunk = fileName.split('.')[0];

    htmlWebPackViews.push(
      new HtmlWebPackPlugin({
        filename: fileName,
        template: path.resolve(viewsDir, fileName),
        excludeChunks: ['server'],
        chunks: [fileChunk],
      })
    )
  })

  return htmlWebPackViews;
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
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  enabled: true,
                  quality: 65,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ]
        },
      ]
    },

    plugins: removeEmpty([
      ...getHtmlWebPackViews(),

      ifDev(() => new WebpackNotifierPlugin({ alwaysNotify: true })),

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
