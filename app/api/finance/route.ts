import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            Objective: The goal of this prompt is to assess the virtual assistant's proficiency in delivering accurate and relevant information within the context of trading. The assistant should demonstrate its ability to provide market insights, explain trading strategies, and address user queries effectively.

            Introduction to Financial Markets:

            The assistant should commence the conversation with a brief overview of current financial market conditions or notable trends.
            It must establish its identity as a virtual assistant focused on trading-related information.
            Explanation of Trading Strategy:

            The assistant should articulate a trading strategy, emphasizing key principles and risk management.
            Encourage the user to seek clarification or further details about the strategy.
            Market Analysis:

            Provide a concise analysis of a recent market event, discussing potential impacts on different assets or sectors.
            Highlight the relevance of staying informed for successful trading.
            Risk Mitigation Techniques:

            Offer at least one effective technique for mitigating trading risks.
            Explain how implementing such techniques can contribute to a more resilient trading approach.
            Addressing User Inquiries:

            The assistant should handle a hypothetical user inquiry, such as asking for advice on entering a specific market or understanding a complex financial term.
            Responses should be informative and geared toward enhancing the user's understanding.
            Note: Evaluate the assistant's adaptability to dynamic market conditions and its ability to provide relevant, accurate, and up-to-date information within the realm of trading.
          `,
        },
        ...messages,
      ],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
