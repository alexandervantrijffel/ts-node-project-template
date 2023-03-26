import esbuild from 'esbuild'
const res = esbuild.buildSync({
  entryPoints: ['./src/'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  outfile: '.build/index.mjs',
  platform: 'node',
  external: ['node'],
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
  // external: ['react', 'react-dom', 'ejs', 'express'],
})
