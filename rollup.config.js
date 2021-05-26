import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import OMT from "@surma/rollup-plugin-off-main-thread";
import clean from "rollup-plugin-clean";

const production = process.env.BUILD === "production";

export default {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "amd",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts", ".jsx", ".tsx"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    commonjs(),
    typescript(),
    babel({
      presets: ["@babel/preset-react"],
      extensions: [".js", ".ts", ".jsx", ".tsx"],
    }),
    OMT(),
    clean(),
    ...(production
      ? []
      : [
          serve({
            open: true,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: 3000,
          }),
        ]),
  ],
};
