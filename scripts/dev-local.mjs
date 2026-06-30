import react from "@vitejs/plugin-react";
import { createServer } from "vite";

const server = await createServer({
  root: process.cwd(),
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      tsconfigRaw: {
        compilerOptions: {},
      },
    },
  },
});

await server.listen();
server.printUrls();

setInterval(() => {}, 1 << 30);
