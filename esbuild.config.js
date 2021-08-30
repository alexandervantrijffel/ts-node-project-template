const build = require('esbuild').build

const devMode = process.argv.includes('--watch')

// Exclude all node_modules from the bundled output in devMode to improve build performance
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const plugins = devMode ? [nodeExternalsPlugin()] : []

build({
  entryPoints: ['./src/index.ts'],
  outfile: '.build/index.js',
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins,
  // this also enables watch mode
  incremental: devMode,
  watch: devMode
    ? {
        onRebuild(error, result) {
          if (error) console.error('[esbuild] rebuild failed:', error)
          else console.log('[esbuild] rebuild succeeded')
        },
      }
    : undefined,
}).catch(() => process.exit(1))
