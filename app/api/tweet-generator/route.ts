import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
    console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
    try {
    const { topic, tone, contentType } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate a high-engagement ${contentType}
Twitter/X post about "${topic}".
Tone: ${tone}

Make it modern, engaging and viral.
If thread, format as:
1/
2/
3/
`;

    const result = await model.generateContent(prompt);

    return Response.json({
      success: true,
      output: result.response.text(),
    });

  } catch (error) {
    console.error("GEMINI ERROR:", error);
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}