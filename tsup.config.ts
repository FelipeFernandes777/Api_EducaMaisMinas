import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ["./src"],
  outDir: 'dist',        
  format: ['cjs', 'esm'],    
  sourcemap: true,
  clean: true, 
})