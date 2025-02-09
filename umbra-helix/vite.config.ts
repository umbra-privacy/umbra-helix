import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react-swc";
import { PolyfillOptions, nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

const nodeModulesPath = `${searchForWorkspaceRoot(process.cwd())}/node_modules`;

// Unfortunate, but needed due to https://github.com/davidmyersdev/vite-plugin-node-polyfills/issues/81
// Suspected to be because of the yarn workspace setup, but not sure
const nodePolyfillsFix = (options?: PolyfillOptions | undefined): Plugin => {
  return {
    ...nodePolyfills(options),
    /* @ts-ignore */
    resolveId(source: string) {
      const m =
        /^vite-plugin-node-polyfills\/shims\/(buffer|global|process)$/.exec(
          source
        );
      if (m) {
        return `${nodeModulesPath}/vite-plugin-node-polyfills/shims/${m[1]}/dist/index.cjs`;
      }
    },
  };
};

const serverInfoPlugin = () => ({
  name: "server-info",
  configureServer(server) {
    server.httpServer?.once("listening", () => {
      const address = server.httpServer?.address();
      if (address && typeof address === "object") {
        const protocol = server.config.server?.https ? "https" : "http";
        const host =
          address.address === "0.0.0.0" ? "localhost" : address.address;
        console.log("\n🚀 Server Information:");
        console.log(`  ➜ Local:   ${protocol}://${host}:${address.port}`);
        console.log(
          `  ➜ Network: ${protocol}://${server.config.server?.host}:${address.port}\n`
        );
      }
    });
  },
});

export default defineConfig({
  logLevel: "error",
  server: {
    // Headers needed for bb WASM to work in multithreaded mode
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    react(),
    nodePolyfillsFix({ include: ["buffer", "process", "path"] }),
    viteStaticCopy({
      targets: [
        {
          src: `${nodeModulesPath}/@aztec/aztec.js/dest/*.wasm.gz`,
          dest: "./",
        },
      ],
    }),
    serverInfoPlugin(),
  ],
});
