import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'podBoxSDK',
      file: pkg.browser,
      format: 'amd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({ module: 'CommonJS' }),
      commonjs({
        include: 'node_modules/**',
      }),
      minify({ comments: false }),
      json(),
    ],
  },
];
