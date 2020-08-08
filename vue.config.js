const fs = require("fs");
const path = require("path");
const version = JSON.parse(fs.readFileSync("./version.txt", "utf8"));
const webpack = require("webpack");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
let devServer = {
  disableHostCheck: true
};
process.env.version = "100";
console.log("dest ===>>> ", process.argv);
let dest = false;
if (process.argv && typeof process.argv === "object") {
  const destFlag = process.argv.find(item => item === "--dest") || false;
  console.log("destFlag ===>>>  ", destFlag);
  if (destFlag) {
    dest = process.argv.find(item => /^dist\/.+/.test(item));
    console.log("dest ===>>>  ", dest);
  }
}
if (process.env.NODE_ENV === "production") {
  console.log("Vue config has been registered for production.");
} else {
  console.log("Vue config has been registered for development.");
  devServer.proxy = {
    "/api": {
      // target: "https://casafi6.firmview.co.uk"
      target: process.env.VUE_APP_BASE_SERVER_URL
    }
  };
}

// TODO: see here https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      VERSION: '"' + version + '"'
    }
  })
];
let configExports = {
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    //serviceWorker: false,
    //workboxPluginMode: "InjectManifest",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
      // swSrc: "./empty-service-worker.js" // Empty file
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: plugins
  },
  devServer: devServer,
  productionSourceMap: true // TODO turn this off before launch
};
if (dest && process.env.VUE_APP_ENABLE_PRE_RENDER === "true") {
  configExports.pluginOptions = {
    prerenderSpa: {
      renderRoutes: [
        "/",
        "/about",
        "/glossary",
        "/login",
        "/signup",
        "/terms-and-conditions",
        "/privacy-policy"
      ],
      onlyProduction: true,
      headless: false // <- this could also be inside the customRendererConfig
    }
  };
}
module.exports = configExports;
