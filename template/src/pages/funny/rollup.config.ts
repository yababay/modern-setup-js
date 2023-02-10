import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/pages/funny/main.js',
  output: {
    file: 'src/pages/funny/bundle.js',
    format: 'iife'
  },
  plugins: [
    svelte({

      include: 'src/pages/funny/*.svelte',
      emitCss: true,

      onwarn: (warning, handler) => {
        if (warning.code === 'a11y-distracting-elements') return;
        handler(warning);
      },

      compilerOptions: {
        generate: 'ssr',
        hydratable: true,
        customElement: false
      }
    }),

    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte']
    }),
  ]
}
