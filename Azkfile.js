/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({
  "isomorphic500":      require('./config/azk-config/dev.js'),
  "isomorphic500-prod": require('./config/azk-config/prod.js'),
  "ngrok-dev":          require('./config/azk-config/ngrok-dev.js'),
  "ngrok-prod":         require('./config/azk-config/ngrok-prod.js'),
  "deploy":             require('./config/azk-config/deploy.js'),
  "fast-deploy":        require('./config/azk-config/fast-deploy.js')
});
