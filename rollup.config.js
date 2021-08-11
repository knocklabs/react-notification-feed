import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./bundle.js",
      format: "cjs",
      globals: { react: "React" },
    },
  ],
  plugins: [
    peerDepsExternal(),
    typescript(),
    postcss({ extract: "dist/index.css" }),
    babel({ exclude: "node_modules/**" }),
    resolve(),
    commonjs({ include: "node_modules/**" }),
    json(),
  ],
  external: ["react", "react-dom"],
};
