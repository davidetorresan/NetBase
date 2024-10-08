import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: any) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  switch (evt.type) {
    case "user.created":
      const id = evt?.data?.id as string;
      const firstname = evt?.data?.first_name as string;
      const lastname = evt?.data?.last_name as string;
      const email = evt?.data?.email_addresses[0]?.email_address as string;
      const phone =
        (evt?.data?.phone_numbers[0]?.phone_number as string) || null;
      const role = "CUSTOMER";

      try {
        await prismadb.user.create({
          data: {
            clerkId: id,
            firstname,
            lastname,
            email,
            phone,
            role,
          },
        });
      } catch (e) {
        console.log(e);
      }
  }
  return new NextResponse(null, { status: 200 });
}
