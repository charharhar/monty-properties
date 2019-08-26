const fs = require('fs')
const path = require('path');
const chalk = require('chalk');
const { path: appRoot } = require('app-root-path')

const args = process.argv.slice(2)
const publicPath = path.resolve(appRoot, 'public')
const fileName = args.join('')

const jsTemplate = require('../templates/javascript.js')(fileName)
const cssTemplate = require('../templates/css.js')
const htmlTemplate = require('../templates/html.js')

const jsFileName = `${publicPath}/js/${fileName}.js`;
const cssFileName = `${publicPath}/css/${fileName}.css`;
const htmlFileName = `${appRoot}/views/${fileName}.html`;

// Build JS File
fs.writeFile(jsFileName, jsTemplate, err => {
  if (err) throw err;
  console.log(chalk.green('JS file created successfully --'), chalk.blue(`${jsFileName}`))
})

// Build CSS File
fs.writeFile(cssFileName, cssTemplate, err => {
  if (err) throw err;
  console.log(chalk.green('CSS file created successfully --'), chalk.blue(`${cssFileName}`))
})

// Build HTML File
fs.writeFile(htmlFileName, htmlTemplate, err => {
  if (err) throw err;
  console.log(chalk.green('HTML file created successfully --'), chalk.blue(`${htmlFileName}`))
})
