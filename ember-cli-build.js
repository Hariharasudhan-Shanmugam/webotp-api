'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
   // (...)
  });

  app.import('vendor/netlify.toml', {
    destDir: '/',
  });
  
  return app.toTree();
};
