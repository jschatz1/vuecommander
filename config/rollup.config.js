import commonConfig from './rollup.config.common';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

const configs = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vueglue.js',
      format: 'umd',
      name: 'VueGlue'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vueglue.min.js',
      format: 'umd',
      compact: true,
      name: 'VueGlue'
    },
    plugins: [
      uglify(),
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vueglue.esm.js',
      format: 'es',
      name: 'VueGlue'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
];

configs.push(commonConfig);

export default configs;