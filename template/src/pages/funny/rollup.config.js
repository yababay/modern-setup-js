"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
exports.default = {
    input: './src/pages/funny/funny.ts',
    output: {
        dir: './public/assets',
        name: 'funny.js',
        format: 'es'
    },
    plugins: [(0, plugin_typescript_1.default)({ tsconfig: false })]
};
