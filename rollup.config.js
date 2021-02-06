import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";

export default {
  input: "./src/index.ts",
  output: {
    dir: "./dist",
    format: "cjs",
  },
  plugins: [
    typescript({
      exclude: ["**/*.d.ts", "**/*.spec.ts"],
    }),
    terser(),
    cleaner({ targets: ["./dist/"] }),
  ],
};
