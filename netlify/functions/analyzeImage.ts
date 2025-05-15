// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const { imageBase64 } = JSON.parse(event.body || '{}');

  if (!imageBase64) {
    return { statusCode: 400, body: 'Image missing' };
  }

  // TODO: send imageBase64 to OpenAI or another vision model
  const fakeResponse = {
    analysis: "This is a placeholder SFL analysis for the uploaded image."
  };

  return {
    statusCode: 200,
    body: JSON.stringify(fakeResponse)
  };
};

export { handler };
