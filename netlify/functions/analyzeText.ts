import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config'; // <-- enables .env support for local dev

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // correct way for Netlify functions
});

const handler: Handler = async (event) => {
  const { text } = JSON.parse(event.body || '{}');

  if (!text) {
    return {
      statusCode: 400,
      body: 'Text is required for analysis.',
    };
  }

  try {
    const prompt = `
You are an expert in Systemic Functional Linguistics (SFL). Analyze the following text using Halliday’s framework...

"""${text}"""
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const aiText = response.choices[0]?.message?.content || 'No analysis generated.';

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: aiText }),
    };
  } catch (err: any) {
    console.error('❌ OpenAI Error:', err.message);
    return {
      statusCode: 500,
      body: 'AI request failed. Please try again later.',
    };
  }
};

export { handler };
