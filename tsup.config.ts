import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  entry: ['src/index.ts'],
  platform: 'node',
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: !options.watch,
  treeshake: !options.watch,
}))
