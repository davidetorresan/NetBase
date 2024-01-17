import prismadb from "@/lib/prismadb";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const body: any | null = request.body;

  if (!body) return;
  console.log(body);

  return await prismadb.notes.create({
    data: {
      title: body?.title,
      content: body?.content,
      userId: body?.userId,
      customerId: body?.customerId,
      category: body?.category,
    },
  });
}
