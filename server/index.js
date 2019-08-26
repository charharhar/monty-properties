import url from 'url'
import path from 'path'
import express from 'express'
import chalk from 'chalk'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../tools/webpack/webpack.config';

const port = process.env.PORT || 3000;
const webpackConfig = config(null, {
  mode: process.env.NODE_ENV
})
const compiler = webpack(webpackConfig);
const isDev = process.env.NODE_ENV || 'development';

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', port)
app.use(express.static(__dirname))
app.use('/', express.static('public'))

/**
 * Webpack Development Server configuration.
 */
if (isDev) {
  app.use(webpackDevMiddleware(compiler, {
    stats: 'errors-only',
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }));
  app.use(webpackHotMiddleware(compiler));
}

/**
 * Primary app routes.
 */
app.get('*', (req, res, next) => {
  const pathname = url.parse(req.url).pathname === '/' ? '/home' : req.url
  const filename = path.join(compiler.outputPath, `${pathname}.html`);

  if (pathname !== '/favicon.ico') {
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  }

});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('==> %s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), chalk.blue(process.env.NODE_ENV)); 
  console.log(chalk.yellow('  Press CTRL-C to stop\n'));
})
