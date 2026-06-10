import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyC7k-A6jS8at0TnLIruD2A2GyBgdiItMn0"
);

export async function askGemini(question) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(question);

  return result.response.text();
}