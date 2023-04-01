import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  const res = await request.json();
  const messages = res.messages;
  const apiKey = res.key;

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  if (Array.isArray(messages) === false || messages.length === 0) {
    return NextResponse.json({ error: "no chat message" });
  }

  const completion = await openai.createChatCompletion({
    temperature: 0.9,
    model: "gpt-3.5-turbo",
    messages,
  });

  return NextResponse.json({ message: completion.data.choices[0].message });
}
