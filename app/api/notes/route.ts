import prismadb from "@/lib/prismadb";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const body: any | null = request.body;

  if (!body) return;
  console.log(body);
}
