import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd()); // corrected 'rootPatch' to 'rootPath'
  const srcPath = path.resolve(rootPath, "src"); // using rootPath here

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
    },
  };
});
