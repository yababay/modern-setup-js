import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/pages/funny/funny.ts',
  output: {
    dir: './public/assets',
    name: 'funny.js',
    format: 'es'
  },
  plugins: [typescript({tsconfig: false})]
};
