import esbuild from 'esbuild'
const res = esbuild.buildSync({
  entryPoints: ['src/'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  outfile: '.build/output.js',
  platform: 'node',
  external: ['node'],
  // external: ['react', 'react-dom'],
})
