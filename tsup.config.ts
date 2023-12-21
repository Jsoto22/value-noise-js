import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/value-noise.ts'],
    format: ['cjs','esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true
})