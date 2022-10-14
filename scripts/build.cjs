const path = require('path')

// This file is required due to esbuild importing modules as relative path
// https://github.com/evanw/esbuild/issues/1958#issuecomment-1025010927
const dependenciesToBundle = []

let makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    build.onResolve({filter: /.*/}, ({path}) => {
      let files = /^\/|(\.\/)|(\.\.\/)|\./ // Must not start with "/" or "./" or "../" or "."

      if (files.test(path)) {
        return undefined
      }

      for (let pattern of dependenciesToBundle) {
        // bundle it if the path matches the pattern
        if (
          typeof pattern === 'string' ? path === pattern : pattern.test(path)
        ) {
          return undefined
        }
      }

      // Externalize everything else if we've gotten here.
      return {path, external: true}
    })
  },
}

require('esbuild')
  .build({
    entryPoints: [
      path.join(__dirname, '../src/cli.ts'),
      path.join(__dirname, '../src/index.ts'),
    ],
    bundle: true,
    platform: 'node',
    format: 'esm',
    sourcemap: true,
    watch: true,
    plugins: [makeAllPackagesExternalPlugin],
    // outfile: 'dist/jf.cjs',
    outdir: 'dist',
  })
  .catch(() => process.exit(1))
