// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPTS = [
  {
    heading: '1. Ideational Meaning',
    items: [
      { title: '1.1 Representation Type', prompt: 'Analyze the type of visual representation used in the image. Is it narrative, conceptual, or another type? Justify using SFL principles.' },
      { title: '1.2 Participants', prompt: 'Identify and describe the participants represented in the image. What roles do they play and how are they visually constructed?' },
      { title: '1.3 Vectors and Processes', prompt: 'Examine the vectors and processes shown in the image. Are there any lines or gaze directions that suggest action or relationships?' },
    ],
  },
  {
    heading: '2. Interpersonal Meaning',
    items: [
      { title: '2.1 Gaze', prompt: 'Analyze the gaze of participants. Are they looking at the viewer or at each other? What mood or relationship does this create?' },
      { title: '2.2 Social Distance', prompt: 'Evaluate the social distance depicted (close-up, medium shot, long shot). What relationship does this imply between viewer and subject?' },
      { title: '2.3 Horizontal Angle', prompt: 'Describe the horizontal angle (frontal, oblique) used and its effect on viewer involvement.' },
      { title: '2.4 Vertical Angle', prompt: 'Analyze the vertical angle (high, eye-level, low). What power relations are implied by this?' },
    ],
  },
  {
    heading: '3. Textual Meaning',
    items: [
      { title: '3.1 Information Value', prompt: 'Interpret how elements are arranged in the image (left-right, top-bottom) and what information value they carry.' },
      { title: '3.2 Salience', prompt: 'Identify the most salient elements in the image. How is salience created (color, focus, placement)?' },
      { title: '3.3 Framing', prompt: 'Examine the use of framing or boundaries. How are elements separated or connected?' },
      { title: '3.4 Layout and Coherence', prompt: 'Assess the overall layout and visual cohesion of the image. How does it contribute to meaning-making?' },
    ],
  },
  {
    heading: '4. Modality',
    items: [
      { title: '4.1 Realism Indicators', prompt: 'Evaluate indicators of realism: color saturation, detail, depth. How realistic is the representation?' },
      { title: '4.2 Naturalism and Abstraction', prompt: 'Discuss the degree of naturalism versus abstraction. What is stylized or symbolic in the image?' },
    ],
  },
  {
    heading: '5. Cultural and Symbolic Interpretation',
    items: [
      { title: '5.1 Cultural Signs', prompt: 'Identify cultural signs and symbols in the image. What meanings do they evoke?' },
      { title: '5.2 Socio-cultural Context', prompt: 'Interpret the socio-cultural context reflected in the image. How does the image engage with broader cultural themes?' },
    ],
  },
  {
    heading: '6. Conclusion',
    items: [
      { title: 'Conclusion', prompt: 'Synthesize the analysis across all metafunctions. What does the image communicate overall within an SFL framework?' },
    ],
  },
];

const handler: Handler = async (event) => {
  console.log('✅ OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
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
          model: 'gpt-4o',
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
