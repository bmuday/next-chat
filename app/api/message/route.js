import { NextResponse } from "next/server";
import Pusher from "pusher";

export async function GET() {
  const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.NEXT_PUBLIC_KEY,
    secret: process.env.SECRET,
    cluster: process.env.NEXT_PUBLIC_CLUSTER,
    useTLS: true,
  });

  pusher.trigger("chat", "message", {
    message: "hello world",
  });

  return NextResponse.json({ message: "Sent!" });
}
