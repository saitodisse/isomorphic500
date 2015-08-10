/**
 * development version
 * - listens to port 3000
 * - expose port 3001 (fixed) for webpack hot-loader
 * - defines NODE_ENV = dev
 */
module.exports = {
  // Dependent systems
  depends: [],

  // More images:  http://images.azk.io
  image: {docker: "azukiapp/node:0.12"},

  // Steps to execute before running instances
  // use reprovision to run again: `azk restart -R`
  provision: [
    "npm install"
  ],
  workdir: "/azk/#{manifest.dir}",
  shell: "/bin/bash",
  command: "npm run dev",

  // wait for port inside container
  wait: {retry: 40, timeout: 1000},
  mounts: {
    "/azk/#{manifest.dir}": sync("."),
    "/azk/#{manifest.dir}/node_modules": persistent("#{manifest.dir}/node_modules")
  },
  scalable: { default: 0, limit: 1 },
  http: {
    domains: ["#{system.name}.#{azk.default_domain}"]
  },
  ports: {
    http: "3000/tcp",
    hot: "3001:3001/tcp"
  },
  envs: {
    HOST_NAME: "#{system.name}.#{azk.default_domain}",
    NODE_ENV: "dev",
    PORT: "3000",
    HOST: "0.0.0.0"
  },
  export_envs: {
    APP_URL: "#{azk.default_domain}:#{net.port.http}"
  }
};
