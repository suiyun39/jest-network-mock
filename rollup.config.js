import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import path from "path";

export default {
  input: "./src/index.ts",
  output: { file: pkg.main, format: "cjs" },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.dirname(pkg.types),
        },
        exclude: ["**/*.spec.ts"],
      },
    }),
  ],
};
