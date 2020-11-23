import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'podBoxSDK',
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({ module: 'CommonJS' }),
      commonjs({
        include: 'node_modules/**',
      }),
      terser({
        ecma: '5',
        compress: true,
        mangle: true,
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets:
                '> 0.25%, last 2 versions, Firefox ESR, not dead',
            },
          ],
        ],
      }),
      json(),
    ],
  },
];
