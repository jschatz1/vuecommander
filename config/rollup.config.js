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
      file: 'dist/vuec.js',
      format: 'umd',
      name: 'Vuec'
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
      file: 'dist/vuec.min.js',
      format: 'umd',
      compact: true,
      name: 'Vuec'
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
      file: 'dist/vuec.esm.js',
      format: 'es',
      name: 'Vuec'
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