<h1 align="center">Express Webpack Boilerplate</h1>
<p align="center">Bare minimum, production ready express web application.</p>

## About
A very productive, hot reloading development environment that is production ready. Does not utilize any frameworks, just barebones HTML + SCSS + ES6. The goal is to get up and running as quickly as possible without worrying about the fundamental application configurations.

## Features
<dl>
  <dt>Webpack 4</dt>
  <dd>Utilizes webpack as the primary bundler for optimizing the front end assets.</dd>

  <dt>SCSS/SASS preprocessor</dt>
  <dd>Allows SCSS syntax goodies and autoprefixing with postcss configurations.</dd>

  <dt>Hot reloading development environment</dt>
  <dd>Implements webpack hot middleware in the development node server to take advantage of hot reloading of assets in the client.</dd>
  
  <dt>Simple express server</dt>
  <dd>Sets up a simple express server to serve all the corresponding assets with their respective views.</dd>

  <dt>SEO support</dt>
  <dd>Basic SEO meta tag management to be indexed by google's search engine.</dd>

  <dt>Custom Demo environment</dt>
  <dd>Utilizes ngrok to set up a secure public URL for convenient demoing purposes.</dd>
</dl>

## Notes
  - jQuery library is currently included using a CDN. It is included in the event that other libraries/packages are dependent; some cross-browser methods/functions are also useful (ex: anchor smooth scrolling to ID).

## Additional
  - Get proper favicon support using http://www.favicon-generator.org/
