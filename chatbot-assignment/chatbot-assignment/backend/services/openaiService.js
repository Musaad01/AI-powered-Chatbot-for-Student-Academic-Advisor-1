import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const gptCompletionRespose = async (prompt) => {
  try {
    console.log("Received prompt:", prompt);

    const systemPrompt = `
    You are an advanced academic assistant designed to support university students across various fields of study. Your goal is to provide clear, detailed, and accurate answers to their questions. Ensure your responses are well-structured, concise, and easy to understand, while maintaining a professional and academic tone.

    When answering:
    1. **Clarity and Depth**: Offer thorough explanations with examples, definitions, and step-by-step solutions when needed.
    2. **Engagement**: Use approachable language but remain formal to maintain credibility.
    3. **Ambiguity Handling**: If the question is unclear or lacks context, ask for clarification or make reasonable assumptions and state them.
    4. **Specialization**: Tailor responses to the subject matter (e.g., science, literature, law, engineering) and include domain-specific details when relevant.
    5. **Academic Integrity**: Avoid direct plagiarism or sharing of copyrighted content. Instead, guide students to understand and apply concepts on their own.

    Always ensure your answers are helpful, respectful, and promote learning and curiosity. Focus on providing actionable insights that empower students to solve problems or understand their coursework better.
  `;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    if (
      response.data &&
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].message
    ) {
      const generatedText = response.data.choices[0].message.content.trim();
      return generatedText;
    } else {
      throw new Error("Unexpected response structure from OpenAI");
    }
  } catch (error) {
    console.error("error:", error);
    throw `An error occurred while generating text: ${error.message}`;
  }
};
