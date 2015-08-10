/**
 * ngrok - development version
 * - dependes on isomorphic500
 * - use APP_URL exported env
 */
module.exports = {
  // Dependent systems
  depends: ["isomorphic500"],
  image: {docker: "azukiapp/ngrok"},

  // Mounts folders to assigned paths
  mounts: {
    // equivalent persistent_folders
    "/ngrok/log": path("./log")
  },
  scalable: { default: 0, limit: 1 },

  // do not expect application response
  wait: false,
  http: {
    domains: ["#{system.name}.#{azk.default_domain}"]
  },
  ports: {
    http: "4040"
  },
  envs: {
    NGROK_CONFIG: "/ngrok/ngrok.yml",
    NGROK_LOG: "/ngrok/log/ngrok.log"
  }
};
