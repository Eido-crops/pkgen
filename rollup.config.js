import { babel as pluginBabel } from '@rollup/plugin-babel'
import pluginTypescript from '@rollup/plugin-typescript'
import * as path from "path"
import pkg from './package.json'

export default {
  input: 'src/main.ts',
  output: {
    file: "dist/main.js",
    format: 'cjs',
    sourcemap: "inline",
    exports: "default"
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript(),
    pluginBabel({
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
      exclude: 'node_modules/**'
    }),
    // pluginNodeResolve({ jsnext: true }), // node_modulesにあるのもくっつけてくれる
    // rootImport({
    //   root: `${__dirname}/src`,
    //   useInput: 'prepend',
    //   extensions: '.js',
    // })
  ],
}