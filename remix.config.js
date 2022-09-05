/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  serverBuildTarget: "cloudflare-pages",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/"
};
