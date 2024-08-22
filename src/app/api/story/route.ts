import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { stories } from "@/app/db/schema";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Call Groq API to generate story
  const storyResponse = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Generate a children's story based on: ${prompt}. Output in JSON format with title and content keys.`,
          },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
        response_format: {
          type: "json_object",
        },
      }),
    },
  );

  const storyData = await storyResponse.json();
  const { title, content } = JSON.parse(storyData.choices[0].message.content);
  console.log("title", title);
  console.log("content", content);

  // Save story to database
  const story = await db
    .insert(stories)
    .values({
      title,
      content,
      // userId,
    })
    .returning();

  console.log("story saved to db");

  // Generate image prompt
  const imagePromptResponse = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Generate a prompt for image generation based on this story: ${title}. ${content}`,
          },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        stream: false,
        stop: null,
      }),
    },
  );

  const imagePromptData = await imagePromptResponse.json();
  const imagePrompt = imagePromptData.choices[0].message.content;

  // Call Replicate API to generate image
  const imageResponse = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "a9f94946fa0377091ac0bcfe61b0d62ad9a85224e4b421b677d4747914b908c0",
        input: {
          model: "dev",
          prompt: `GHIBSKY style, ${imagePrompt}`,
          lora_scale: 1,
          num_outputs: 1,
          aspect_ratio: "9:16",
          output_format: "jpg",
          guidance_scale: 3.5,
          output_quality: 100,
          num_inference_steps: 28,
        },
        webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`,
        webhook_events_filter: ["completed"],
      }),
    },
  );

  const imageData = await imageResponse.json();
  console.log("image requested");

  return NextResponse.json({ story, imageId: imageData.id });
}
