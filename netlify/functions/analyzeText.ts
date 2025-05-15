// netlify/functions/analyzeText.ts

import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
You are an expert in Systemic Functional Linguistics (SFL). Analyze the following text using Halliday’s framework. Your output must be highly structured, academic, and thorough.

### 1. Ideational Metafunction
- Include Transitivity + Logical analysis
- Markdown headings
- Tables: Clause | Process Type | Participant | Circumstance
- Commentary: 300+ words

### 2. Interpersonal Metafunction
- Mood, Modality, Pronouns, Appraisal
- Tables + Frequency tables
- Commentary: 300+ words

### 3. Textual Metafunction
- Theme/Rheme, Progression, Nominalization, Lexical Density, Cohesion
- Tables
- Commentary: 300+ words

### 4. Register Analysis
- Field, Tenor, Mode per clause
- Register Summary Table
- Commentary: 300+ words

Use markdown headings ## for each section. Output must exceed 1000 words. Text:
"""${text}"""
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
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
