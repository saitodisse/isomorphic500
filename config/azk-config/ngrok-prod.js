/**
 * ngrok - production version
 * - dependes on isomorphic500-prod
 * - use APP_URL exported env
 */
module.exports = {
  // Dependent systems
  depends: ["isomorphic500-prod"],
  image: {docker: "azukiapp/ngrok"},

  // Mounts folders to assigned paths
  mounts: {
    // equivalent persistent_folders
    "/ngrok/log": path("./log")
  },
  scalable: { default: 1, limit: 1 },

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
