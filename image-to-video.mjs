import { readFile } from 'node:fs/promises';
import path from 'node:path';
import RunwayML from '@runwayml/sdk';

const client = new RunwayML();

const allowedRatios = new Set([
  '1280:720',
  '720:1280',
  '1104:832',
  '832:1104',
  '960:960',
  '1584:672',
]);

async function pngFileToDataUri(filePath) {
  const resolvedPath = path.resolve(filePath);

  if (path.extname(resolvedPath).toLowerCase() !== '.png') {
    throw new Error(`Expected a PNG file, got: ${resolvedPath}`);
  }

  const imageBuffer = await readFile(resolvedPath);
  return `data:image/png;base64,${imageBuffer.toString('base64')}`;
}

const imagePath = process.argv[2] ?? './image1.png';
const ratio = process.argv[3] ?? '1280:720';

if (!allowedRatios.has(ratio)) {
  throw new Error(
    `Invalid ratio: ${ratio}. Use one of: ${Array.from(allowedRatios).join(', ')}`,
  );
}

const promptImage = await pngFileToDataUri(imagePath);

const task = await client.imageToVideo
  .create({
    model: 'gen4_turbo',
    promptImage,
    promptText: 'The camera moves around the animal.',
    duration: 5,
    ratio,
  })
  .waitForTaskOutput();

console.log(task);