// netlify/functions/analyzeImage.ts
import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  console.log('📥 EVENT BODY:', event.body?.slice(0, 100));

  const { imageBase64 } = JSON.parse(event.body || '{}');

  if (!imageBase64) {
    return {
      statusCode: 400,
      body: 'Image is required for analysis.',
    };
  }

  console.log('🖼 IMAGE LENGTH:', imageBase64.length);
  console.log("✅ Is valid base64?", imageBase64.startsWith('/9j/') || imageBase64.startsWith('iVBOR'));

  try {
    const prompt = `
You are a multimodal SFL (Systemic Functional Linguistics) expert. Analyze this image using the full visual grammar framework of Kress & van Leeuwen, and deliver the findings as a detailed academic report.

The report must include the following structured sections. Each section should be no less than 200 words, and the writing must be analytical, detailed, and expressive:

1. **Ideational Meaning**
   - Representation type (narrative, conceptual)
   - Participants (actors, goals, carriers, etc.)
   - Vectors and processes

2. **Interpersonal Meaning**
   - Gaze (demand/offer)
   - Social distance (intimate, personal, social, impersonal)
   - Horizontal angle (involvement/detachment)
   - Vertical angle (power dynamics)

3. **Textual/Compositional Meaning**
   - Information value (left/right, top/bottom)
   - Salience (color, size, focus, etc.)
   - Framing (connection/disconnection between elements)
   - Layout and coherence

4. **Modality**
   - Realism indicators (color saturation, depth, representation style)
   - Degree of naturalism and abstraction

5. **Cultural and Symbolic Interpretation**
   - Cultural signs, connotations, intertextual references
   - Interpretative notes based on socio-cultural context

6. **Conclusion**
   - Provide extensive commentary on the overall meaning of the image
   - Reflect on semiotic significance of the observed visual features
   - Offer implications for intended audience, creator intent, or cultural framing
   - Ensure this conclusion is expressive, reflective, and not less than 200 words

Write in an academic tone using formal markdown structure with headings and subheadings.
`;

    console.log('🧠 Using model:', 'gpt-4o');
    console.log("📦 Sending to OpenAI:", {
      hasKey: !!process.env.OPENAI_API_KEY,
      model: 'gpt-4o',
      imageLength: imageBase64.length,
      isImagePayloadValid: imageBase64.startsWith('/9j/') || imageBase64.startsWith('iVBOR'),
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    console.log("📝 OpenAI raw response:", response.choices?.[0]?.message?.content || 'No content');

    const result = response.choices?.[0]?.message?.content || 'No result.';
    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: result }),
    };
  } catch (error: any) {
    console.error('❌ ERROR:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: error?.message || 'Unknown error',
        details: error?.response?.data || null,
      }),
    };
  }
};

export { handler };
