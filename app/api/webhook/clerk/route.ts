import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";

import prismadb from "@/lib/prismadb";

export async function POST(req: any) {
  const evt = req?.body?.evt as WebhookEvent;

  switch (evt.type) {
    case "user.created":
      // UserJSON.first_name is a string
      const id = evt?.data?.id as string;
      const firstname = evt?.data?.first_name as string;
      // UserJSON.last_name is a string
      const lastname = evt?.data?.last_name as string;
      // UserJSON.email_addresses is an array of EmailAddressJSON
      const email = evt?.data?.email_addresses[0].email_address as string;
      const phone = evt?.data?.phone_numbers[0].phone_number as string;
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
