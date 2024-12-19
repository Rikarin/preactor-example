import { importTransformPlugin, watchOutputPlugin } from '@rikarin/preactor/scripts/esbuild/index.mjs';
import chokidar from 'chokidar';
import * as esbuild from 'esbuild';
import glob from 'tiny-glob';

const SOURCE_PATH = './dist/tsc/Views/**/index.js';
const DEBOUNCE_INTERVAL = 100; // ms

async function prepare() {
  try {
    let entryPoints = await glob(SOURCE_PATH);
    return await esbuild.context({
      entryPoints: entryPoints,
      bundle: true,
      plugins: [importTransformPlugin, watchOutputPlugin],
      inject: ['@rikarin/preactor/dist/index.js', './dist/tsc/globals.js'],
      alias: {
        preactor: '@rikarin/preactor',
        preact: '@rikarin/preactor/preact'
      },
      outdir: '../Assets/Views'
    });
  } catch {}
}

let main = await prepare();
await main?.watch();
console.log('Watching for changes...');

// Scripting
async function prepareScripting() {
  try {
    let entryPoints = await glob('./dist/tsc/Scripting/**/index.js');
    return await esbuild.context({
      entryPoints: entryPoints,
      inject: ['./dist/tsc/globals.js'],
      bundle: true,
      plugins: [importTransformPlugin, watchOutputPlugin],
      outdir: '../Assets/Scripting'
    });
  } catch {}
}

let scripting = await prepareScripting();
await scripting?.watch();
console.log('Watching for changes...');

// Watch for new files added
const watcher = chokidar.watch('./dist', {
  persistent: true,
  ignoreInitial: true
});

let debounceTimeout;
watcher.on('add', async () => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    console.log('Detected new files, rebuilding...');
    await main?.dispose();
    main = await prepare();
    await main?.watch();
  }, DEBOUNCE_INTERVAL);
});
