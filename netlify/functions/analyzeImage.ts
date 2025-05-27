// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPTS = [
  {
    heading: '1. Ideational Meaning',
    items: [
      { title: '1.1 Representation type', prompt: '...representation type prompt...' },
      { title: '1.2 Participants', prompt: '...participants prompt...' },
      { title: '1.3 Vectors and processes', prompt: '...vectors prompt...' },
    ],
  },
  {
    heading: '2. Interpersonal Meaning',
    items: [
      { title: '2.1 Gaze', prompt: '...gaze prompt...' },
      { title: '2.2 Social distance', prompt: '...social distance prompt...' },
      { title: '2.3 Horizontal angle', prompt: '...horizontal angle prompt...' },
      { title: '2.4 Vertical angle', prompt: '...vertical angle prompt...' },
    ],
  },
  {
    heading: '3. Textual Meaning',
    items: [
      { title: '3.1 Information value', prompt: '...information value prompt...' },
      { title: '3.2 Salience', prompt: '...salience prompt...' },
      { title: '3.3 Framing', prompt: '...framing prompt...' },
      { title: '3.4 Layout and coherence', prompt: '...layout prompt...' },
    ],
  },
  {
    heading: '4. Modality',
    items: [
      { title: '4.1 Realism indicators', prompt: '...realism prompt...' },
      { title: '4.2 Naturalism and abstraction', prompt: '...abstraction prompt...' },
    ],
  },
  {
    heading: '5. Cultural and Symbolic Interpretation',
    items: [
      { title: '5.1 Cultural signs', prompt: '...cultural signs prompt...' },
      { title: '5.2 Socio-cultural context', prompt: '...context prompt...' },
    ],
  },
  {
    heading: '6. Conclusion',
    items: [
      { title: 'Conclusion', prompt: '...conclusion prompt...' },
    ],
  },
];

const handler: Handler = async (event) => {
  const { imageBase64 } = JSON.parse(event.body || '{}');
  if (!imageBase64) {
    return { statusCode: 400, body: 'Missing image data.' };
  }

  try {
    const sectionResults: string[] = [];

    for (const section of PROMPTS) {
      sectionResults.push(`## ${section.heading}\n`);
      for (const item of section.items) {
        const chatResponse = await openai.chat.completions.create({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: item.prompt },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
              ],
            },
          ],
          max_tokens: 2048,
        });

        const content = chatResponse.choices?.[0]?.message?.content || '(No response)';
        sectionResults.push(`### ${item.title}\n\n${content}\n`);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: sectionResults.join('\n\n') }),
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
