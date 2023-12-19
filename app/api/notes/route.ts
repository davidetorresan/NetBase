const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_SECRET;
const client = require("twilio")(accountSid, authToken);

export async function GET(request: Request) {
  const res = await client.messages.create({
    from: "whatsapp:+14155238886",
    body: "Hello, there!",
    to: "whatsapp:+15005550006",
  });
}

export async function POST(request: Request) {
    
    

}
  