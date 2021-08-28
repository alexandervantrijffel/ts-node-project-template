#! /bin/sh -

if ! type hyperfine 1>/dev/null; then
  echo "missing hyperfine"
  echo "install via: https://github.com/sharkdp/hyperfine"
  exit 127
fi

hyperfine --warmup 3 'tsc --build tsconfig.tscbuild.json' 'node esbuild.config.js'
