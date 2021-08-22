const esbuild = require('esbuild')
const devMode = process.argv.includes('--watch')

// Automatically exclude all node_modules from the bundled version
// in devMode
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const plugins = devMode ? [nodeExternalsPlugin()] : []

esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: '.build/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
    plugins,
    watch: devMode
  })
  .catch(() => process.exit(1))
