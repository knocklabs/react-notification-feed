import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

// delete old typings to avoid issues
require("fs").unlink("dist/index.d.ts", (err) => {});

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      typescript: require("typescript"),
      sourceMap: !production,
      inlineSources: !production,
    }),
    production && terser(),
  ],
};
