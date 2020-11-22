import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  {
    input: 'dist/index.js',
    output: {
      name: 'podBoxSDK',
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      minify({ comments: false }),
      json(),
    ],
  },
];
