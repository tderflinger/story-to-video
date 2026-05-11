import RunwayML from '@runwayml/sdk';

const client = new RunwayML();

const task = await client.textToImage
  .create({
    model: 'gen4_image',
    promptText: 'Create a cinema poster ad for a short movie of Aesop\'s fable The Fox and the Goat. The title "The Fox and the Goat" should appear in the poster.',
    ratio: '1360:768',
  })
  .waitForTaskOutput();

console.log(task);
