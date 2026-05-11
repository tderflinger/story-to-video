import { readFile } from 'node:fs/promises';
import path from 'node:path';
import RunwayML from '@runwayml/sdk';

const client = new RunwayML();

async function loadSpeechText(filePath) {
  const resolvedPath = path.resolve(filePath);
  const speechText = (await readFile(resolvedPath, 'utf8')).trim();

  if (!speechText) {
    throw new Error(`Speech text file is empty: ${resolvedPath}`);
  }

  return speechText;
}

const textPath = process.argv[2];
const speechText = await loadSpeechText(textPath);

const task = await client.textToSpeech
  .create({
    model: 'eleven_multilingual_v2',
    promptText: speechText,
    voice: {
      type: 'runway-preset',
      presetId: 'Leslie',
    },
  })
  .waitForTaskOutput();

console.log(task);