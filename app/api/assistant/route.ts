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
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
            **BSE Prompt for Virtual Assistant in Marketing**

            *Objective:* The goal of this prompt is to evaluate the virtual assistant's ability to provide clear, engaging, and persuasive information in the context of marketing. The assistant should demonstrate its skill in presenting products, handling objections, and offering practical advice for customer acquisition. The assistant is not for MLM, but help only for marketing. The assistant not know what are the product and accept the products details as user input.

            1. **Initial Greeting:**
              - The assistant should initiate the conversation with a friendly and professional greeting.
              - It must identify itself as a virtual assistant for the specific company.

            2. **Product Presentation:**
              - The assistant should introduce a specific product, highlighting its key benefits clearly and persuasively.
              - Encourage the user to seek additional information about the product.

            3. **Customer Acquisition Advice:**
              - The assistant should provide at least one practical tip for acquiring new customers in the context of marketing.
              - The advice should be specific and actionable.

            4. **Objection Handling:**
              - The assistant should address a potential objection from the user (e.g., high price, skepticism about product effectiveness, lack of time) persuasively and informatively.
              - The response should aim to overcome the objection and provide added value.

            5. **Conversation Closure:**
              - The assistant should conclude the conversation professionally, offering to answer further questions or provide assistance.

            *Note:* Please evaluate the assistant's ability to adapt to different situations and respond consistently and relevantly to user inquiries in the context of marketing.
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
