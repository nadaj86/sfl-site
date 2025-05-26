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

  const prompts = [
    "1. **Ideational Meaning: Representation Type (Narrative, Conceptual)**\n\nYou are a multimodal SFL expert. Analyze this image focusing on its representational type using Kress & van Leeuwen’s framework. Write no less than 200 words in an academic tone.",
    "1.2 **Participants (Actors, Goals, Carriers, etc.)**\n\nYou are a multimodal SFL expert. Analyze the participants present in this image using Kress & van Leeuwen’s visual grammar. Discuss their roles and interactions. Write no less than 200 words.",
    "1.3 **Vectors and Processes**\n\nYou are a multimodal SFL expert. Analyze vectors and visual processes in this image using Kress & van Leeuwen’s grammar. Write at least 200 words.",
    "2.1 **Gaze (Demand/Offer)**\n\nDiscuss how gaze is constructed in the image. Use SFL and visual grammar concepts. Minimum 200 words.",
    "2.2 **Social Distance**\n\nAnalyze social distance cues (close-up, medium, long shot). Minimum 200 words.",
    "2.3 **Horizontal Angle (Involvement/Detachment)**\n\nHow does the horizontal angle involve or detach the viewer? Analyze in 200+ words.",
    "2.4 **Vertical Angle (Power Dynamics)**\n\nExamine visual power relationships through vertical angles. Write in detail (min 200 words).",
    "3.1 **Information Value (Placement in Frame)**\n\nAssess the left/right, top/bottom placement for meaning-making. Minimum 200 words.",
    "3.2 **Salience (Color, Size, Focus)**\n\nAnalyze what draws viewer attention and why. Use Kress & van Leeuwen's grammar. 200+ words.",
    "3.3 **Framing (Connection/Disconnection)**\n\nExplore how elements are framed or grouped to suggest meaning. 200+ words.",
    "3.4 **Layout and Coherence**\n\nComment on the layout logic and how it guides the reading path. Min 200 words.",
    "4.1 **Modality: Realism Indicators**\n\nAssess realism using visual cues like saturation, texture, light. 200+ words.",
    "4.2 **Modality: Naturalism and Abstraction**\n\nDiscuss the spectrum of realism to abstraction in the image. 200 words minimum.",
    "5.1 **Cultural Signs, Connotations, Intertextuality**\n\nInterpret symbolic and cultural meanings. Use examples. 200+ words.",
    "5.2 **Socio-Cultural Context**\n\nReflect on cultural framing and viewer interpretation. 200+ words.",
    "6. **Conclusion**\n\nProvide a deep, reflective synthesis. Cover meaning, semiotic significance, and audience impact. Not less than 200 words."
  ];

  try {
    const messageContent = prompts.map(text => ({ type: 'text', text }));
    messageContent.push({
      type: 'image_url',
      image_url: {
        url: `data:image/jpeg;base64,${imageBase64}`,
      },
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: messageContent }],
      max_tokens: 3000,
    });

    const result = response.choices?.[0]?.message?.content || 'No result.';
    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: result }),
    };
  } catch (error: any) {
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
