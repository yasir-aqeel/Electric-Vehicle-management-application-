import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import path from "node:path";

const serveRootIndex = () => ({
  name: "serve-root-index",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/") {
        req.url = "/index.html";
      }
      next();
    });
  }
});

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  appType: "spa",
  resolve: {
    alias: {
      "hoist-non-react-statics": path.resolve(
        process.cwd(),
        "src/vendor/hoistNonReactStatics.js"
      )
    }
  },
  plugins: [serveRootIndex(), react(), svgr()],
  optimizeDeps: {
    disabled: true,
    exclude: ["js-big-decimal"]
  },
  assetsInclude: ["**/*.svg"],
  server: {
    host: "0.0.0.0"
  }
});

await server.listen();
server.printUrls();

setInterval(() => {}, 2147483647);
