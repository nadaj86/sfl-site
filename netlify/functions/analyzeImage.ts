// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  const { imageBase64 } = JSON.parse(event.body || '{}');

  if (!imageBase64) {
    return {
      statusCode: 400,
      body: 'Image is required for analysis.',
    };
  }

  try {
    const prompt = `
You are a multimodal SFL expert. Analyze this image using Kress & van Leeuwen's visual grammar framework.

Describe:
1. Ideational meanings (representation type, participants, vectors)
2. Interpersonal meanings (gaze, angle, social distance)
3. Compositional meanings (framing, salience, layout)
4. Modality and possible cultural symbols

Be detailed and structured. Respond in markdown.

[IMAGE DATA: base64, JPG/PNG, assume visual content]
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: prompt },
        { role: 'user', content: { image_url: { url: `data:image/jpeg;base64,${imageBase64}` }, type: 'image_url' } },
      ],
      max_tokens: 2000,
    });

    const result = response.choices?.[0]?.message?.content || 'No result.';
    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: result }),
    };
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return {
      statusCode: 500,
      body: 'Failed to analyze image.',
    };
  }
};

export { handler };
