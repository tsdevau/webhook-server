import * as esbuild from "esbuild"

await esbuild.build({
  entryPoints: ["src/whServer.ts"],
  bundle: true,
  minify: true,
  format: "cjs",
  legalComments: "none",
  platform: "node",
  target: "node20",
  external: [],
  outdir: "build",
})
