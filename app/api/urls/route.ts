import { NextResponse } from "next/server"

export async function GET() {
  let urls = [
	'https://blog.fntao5.cn#Cloudflare CDN',
	'https://fastly.flw8.top#Fastly CDN',
	'https://vercel.fntao5.cn#Vercel CDN',
	'https://www.fnyun.ip-ddns.com#备用地址'
  ]

  // If URL environment variable exists, process it
  if (process.env.URL) {
    urls = await processUrlString(process.env.URL)
  }

  return NextResponse.json({ urls })
}

// Helper function to process URL string into array
async function processUrlString(urlString: string) {
  // Replace tabs, quotes, and newlines with commas
  // Then replace multiple consecutive commas with a single comma
  let processedText = urlString.replace(/[	|"'\r\n]+/g, ",").replace(/,+/g, ",")

  // Remove leading and trailing commas
  if (processedText.charAt(0) === ",") processedText = processedText.slice(1)
  if (processedText.charAt(processedText.length - 1) === ",") {
    processedText = processedText.slice(0, processedText.length - 1)
  }

  // Split by comma to get array of URLs
  return processedText.split(",")
}
