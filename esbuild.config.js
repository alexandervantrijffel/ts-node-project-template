const build = require('esbuild').build

// todo: the pnpPlugin breaks the watchMode!
// replace esbuild watchMode with watchexec?
// watchexec -nc --signal SIGCHLD -w src/ -- build.js --rebuild-on SIGCHLD
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp')

// todo: remove this when this PR is merged into logform
// https://github.com/winstonjs/logform/pull/117
const path = require('path')
const rootPath = require('pkg-dir').sync()
const customLogform = {
  name: 'logform replacement for winston and esbuild issue',
  setup(build) {
    build.onResolve({ filter: /logform$/ }, (args) => {
      return { path: path.join(rootPath, 'src/logform-custom.js') }
    })
  }
}

const devMode = process.argv.includes('--watch')

// const { nodeExternalsPlugin } = require('esbuild-node-externals')
// const plugins = [...(devMode ? [nodeExternalsPlugin()] : []), customLogform, pnpPlugin()]

const outfile = '.build/index.js'
build({
  entryPoints: ['./src/index.ts'],
  outfile,
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  watch: devMode,
  incremental: devMode,
  plugins: [customLogform, pnpPlugin()]
})
  .then(() => console.log('Bundle built successfully at ' + outfile))
  .catch(() => process.exit(1))
