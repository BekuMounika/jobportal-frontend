import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyC7k-A6jS8at0TnLIruD2A2GyBgdiItMn0"
);

export async function askGemini(question) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are an AI Career Assistant.

Answer in a professional and easy-to-read format.

Rules:
- Use short paragraphs.
- Use bullet points where helpful.
- Use headings when appropriate.
- Explain clearly for students and beginners.
- Avoid very long blocks of text.

Question:
${question}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}