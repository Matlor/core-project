import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

import path from "path";
// import dfxJson from "./dfx.json";
import fs from "fs";


const isDev = process.env["DFX_NETWORK"] !== "ic";

let canisterIds;
try {
  canisterIds = JSON.parse(
    fs
      .readFileSync(
        isDev ? ".dfx/local/canister_ids.json" : "./canister_ids.json",
      )
      .toString(),
  );
} catch (e) {}


const canisterDefinitions = Object.entries(canisterIds).reduce(
  (acc, [key, val]) => {
      return(
        {
          ...acc,
          [`process.env.${key.toUpperCase()}_CANISTER_ID`]: isDev
            ? JSON.stringify(val.local)
            : JSON.stringify(val.ic),
        } 
      )
    },
    {},
);

const DFX_PORT = 8000;

export default defineConfig({

  define: {
    ...canisterDefinitions,
    "process.env.NODE_ENV": JSON.stringify(
      isDev ? "development" : "production",
    ),
  },

  deinfe:{
    "process.env.NODE_ENV":"VITE_REACT_APP_FIREBASE_API_KEY=AIzaSyAX_wdLtQ57qJ1FBegDyBKmIVGHOP6SwQs"
  },


  optimizeDeps: {
    exclude: [],
  },
  plugins: [react()],


  resolve: {
    alias: {
      
    },
  },

  server: {
    fs: {
      // allow: ["."],
    },
    proxy: {
      "/api": {
        target: `http://localhost:${DFX_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    target: ["es2020"],
  },
});

