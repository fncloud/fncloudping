import { NextResponse } from "next/server"

export async function GET() {
  const ads = process.env.ADS || "google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0"

  return new NextResponse(ads, {
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  })
}
