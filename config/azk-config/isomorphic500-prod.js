/**
 * production version
 * - listens to port 8080
 * - defines NODE_ENV = production
 */
module.exports = {
  depends: [],
  image: { docker: "azukiapp/node:0.12" },
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
  scalable: { default: 1, limit: 1 },
  http: {
    domains: [
    "#{system.name}.#{azk.default_domain}", // default azk
    "#{process.env.AZK_HOST_IP}"            // used when deployed
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
};
