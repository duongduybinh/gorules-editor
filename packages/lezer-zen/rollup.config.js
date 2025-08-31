import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';

export default {
  input: './src/parser.js',
  output: [
    { format: 'cjs', file: './dist/index.cjs' },
    { format: 'es', file: './dist/index.js' },
  ],
  external(id) {
    // return !/^[\.\/]/.test(id);
    // Đường dẫn tuyệt đối (Windows: C:\..., Linux/macOS: /...)
    const isAbsolute = path.isAbsolute(id);
    // Đường dẫn tương đối (./ or ../)
    const isRelative = id.startsWith('.');

    // Nếu là local file (relative hoặc absolute) thì không external
    if (isAbsolute || isRelative) return false;

    // Ngược lại (package trong node_modules) thì external
    return true;
  },
  plugins: [nodeResolve()],
};
