// netlify/functions-background/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handler: Handler = async (event) => {
  const { imageBase64 } = JSON.parse(event.body || '{}');

  if (!imageBase64) {
    return {
      statusCode: 400,
      body: 'Missing image data.',
    };
  }

  const prompt = `
You are an expert in Systemic Functional Linguistics (SFL) and Visual Grammar. Analyze this image using Halliday’s framework and Kress & van Leeuwen’s theory.

Please provide a full academic breakdown across:

1. Ideational Metafunction
- Representation type (narrative, conceptual)
- Participants, vectors, processes

2. Interpersonal Metafunction
- Gaze, social distance
- Horizontal/vertical angles
- Power and modality

3. Textual Metafunction
- Layout, salience, framing

4. Modality
- Realism, abstraction, lighting, detail

5. Cultural & Symbolic Interpretation
- Symbols, cultural codes, social meaning

6. Conclusion
- Summary of how meaning is constructed visually
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
          ],
        },
      ],
      max_tokens: 4000,
    });

    const content = response.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: content || 'No analysis generated.' }),
    };
  } catch (error: any) {
    console.error('❌ Error from GPT:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: true, message: error.message }),
    };
  }
};

export { handler };
