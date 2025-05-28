// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handler: Handler = async (event) => {
  console.log('✅ OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

  const { imageBase64 } = JSON.parse(event.body || '{}');

  if (!imageBase64) {
    console.error('❌ No image provided in the request.');
    return {
      statusCode: 400,
      body: 'Missing image data.',
    };
  }

  try {
    const prompt = `
You are an expert in Systemic Functional Linguistics (SFL) and Visual Grammar. Please analyze the provided image thoroughly using the following academic framework:

1. Ideational Meaning
- What type of representation is shown (narrative, conceptual, symbolic)?
- Who are the participants and how are they visually represented?
- Identify vectors or processes in the image that suggest action, reaction, or relationships.

2. Interpersonal Meaning
- Analyze the gaze direction of the participants (demand/offer).
- Evaluate social distance (intimate, social, impersonal).
- Discuss horizontal and vertical angles and what they suggest about power and involvement.

3. Textual Meaning
- Describe the layout, visual framing, and information value distribution (left-right, top-bottom).
- Highlight the salience of elements and visual hierarchy.
- Analyze the visual cohesion and framing techniques.

4. Modality
- Discuss realism indicators: color, lighting, sharpness, background.
- Evaluate the degree of naturalism or abstraction.

5. Cultural and Symbolic Interpretation
- Identify symbols or culturally relevant signs.
- Infer any socio-cultural meanings or context.

6. Conclusion
- Summarize how the metafunctions collectively construct meaning in the image.
`;

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
      max_tokens: 3000,
    });

    const content = response.choices?.[0]?.message?.content;
    console.log('📦 GPT Response Preview:', content?.slice(0, 300) || 'No content from GPT');

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: content || 'No result from OpenAI.' }),
    };
  } catch (error: any) {
    console.error('❌ OpenAI error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: error.message || 'Server error.',
      }),
    };
  }
};

export { handler };
