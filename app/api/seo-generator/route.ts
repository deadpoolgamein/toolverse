import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Create SEO content for:

${topic}

Return exactly:

Meta Title:
(under 60 characters)

Meta Description:
(under 160 characters)

Keywords:
(keyword list)

Keep it SEO optimized and high CTR.
`;

    const result = await model.generateContent(prompt);

    return Response.json({
      success: true,
      output: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: "Generation failed",
    });
  }
}