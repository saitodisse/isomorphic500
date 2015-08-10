/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({
  /////////////////////////////////
  /// isomorphic500 app
  /// -----------------------------
  /////////////////////////////////
  "isomorphic500": {
    depends: [],
    image: {docker: "azukiapp/node:0.12"},
    provision: [
      "npm install"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "npm run build && npm run prod",
    wait: {retry: 60, timeout: 1000},
    mounts: {
      "/azk/#{manifest.dir}": sync("."),
      "/azk/#{manifest.dir}/node_modules": persistent("#{manifest.dir}/node_modules")
    },
    scalable: {default: 1},
    http: {
      domains: [
      "#{system.name}.#{azk.default_domain}", // default azk
      "#{process.env.AZK_HOST_IP}"            // used if deployed
    ]
    },
    ports: {
      http: "8080/tcp"
    },
    envs: {
      HOST_NAME: "#{system.name}.#{azk.default_domain}",
      NODE_ENV: "production",
      PORT: "8080",
      HOST: "0.0.0.0"
    }
  },

  /////////////////////////////////
  /// deploy
  /// -----------------------------
  /// https://github.com/azukiapp/docker-deploy-digitalocean
  /////////////////////////////////
  deploy: {
    image: {"docker": "azukiapp/deploy-digitalocean"},
    mounts: {
      "/azk/deploy/src":  path("."),
      "/azk/deploy/.ssh": path("#{process.env.HOME}/.ssh")
    },
    scalable: {"default": 0, "limit": 0},
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile-deploy',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  },

  /////////////////////////////////
  /// deploy fast
  /// -----------------------------
  /// skip setup and configure
  /////////////////////////////////
  "fast-deploy": {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile-deploy',
      AZK_RESTART_COMMAND: 'azk restart -Rv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
