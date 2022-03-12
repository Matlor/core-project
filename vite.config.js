import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const isDev = process.env["DFX_NETWORK"] !== "ic";

let canisterIds;
try {
	canisterIds = JSON.parse(
		fs
			.readFileSync(
				isDev ? ".dfx/local/canister_ids.json" : "./canister_ids.json"
			)
			.toString()
	);
} catch (e) {}

const canisterDefinitions = Object.entries(canisterIds).reduce(
	(acc, [key, val]) => {
		return {
			...acc,
			[`process.env.${key.toUpperCase()}_CANISTER_ID`]: isDev
				? JSON.stringify(val.local)
				: JSON.stringify(val.ic),
		};
	},
	{}
);

const DFX_PORT = 8000;

export default defineConfig({
	define: {
		...canisterDefinitions,
		"process.env.NODE_ENV": JSON.stringify(
			isDev ? "development" : "production"
		),
	},

	optimizeDeps: {
		exclude: [],
	},
	plugins: [react()],

	resolve: {
		alias: {},
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
