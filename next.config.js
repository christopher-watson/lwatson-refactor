// next.config.js
const withCSS = require('@zeit/next-css');
const withAssetsImport = require('next-assets-import');
const compose = require('next-compose')

module.exports = compose([[withCSS], [withAssetsImport]]);

// withCSS({
//   /* config options here */
// });
