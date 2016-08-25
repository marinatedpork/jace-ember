/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});
  app.import('vendor/css/framework7.ios.colors.min.css');
  app.import('vendor/css/framework7.ios.min.css');
  app.import('vendor/js/framework7.min.js');
  return app.toTree();
};
