import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBIC_OPENAI_KEY });

export const askToOpenAI = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-4o-mini',
  });

  return completion;
};
