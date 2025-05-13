"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Home() {
  const [urls, setUrls] = useState([
	'https://blog.fntao5.cn#Cloudflare CDN',
	'https://fastly.flw8.top#Fastly CDN',
	'https://vercel.fntao5.cn#Vercel CDN',
	'https://www.fnyun.ip-ddns.com#备用地址'
  ])

  const [results, setResults] = useState<Array<{ url: string; name: string; latency: number | string }>>([])
  const [redirecting, setRedirecting] = useState(false)
  const [visitCount, setVisitCount] = useState<string>("加载中...")

  // Site configuration
  const img = process.env.NEXT_PUBLIC_IMG || "https://raw.cmliussss.com/keqing1080p.jpg"
  const 网站头像 = process.env.NEXT_PUBLIC_PNG || "https://yunpan.flw8.top/PicGo/fnyun"
  const 网页标题 = process.env.NEXT_PUBLIC_TITLE || "Fn Cloud蜂鸟云技术 智能访问"
  const 站点名称 = process.env.NEXT_PUBLIC_NAME || "Fn Cloud蜂鸟云技术平台 - 智能访问"

  useEffect(() => {
    // Fetch visitor count
    fetch("https://tongji.090227.xyz/?id=blog.cmliussss.com")
      .then((r) => r.json())
      .then((d) => setVisitCount(d.visitCount))
      .catch(() => setVisitCount("加载失败"))

    // Initialize latency tests
    const initialResults = urls.map((url) => {
      const [testUrl, name] = url.split("#")
      return { url: testUrl, name, latency: "测速中..." }
    })
    setResults(initialResults)

    runTests()
  }, [])

  const testLatency = (url: string): Promise<{ url: string; latency: number | string }> => {
    return new Promise((resolve) => {
      const start = Date.now()
      const xhr = new XMLHttpRequest()
      xhr.open("HEAD", url, true)
      xhr.timeout = 3000

      xhr.onload = () => {
        const latency = Date.now() - start
        if (xhr.status === 200) {
          resolve({ url, latency })
        } else {
          resolve({ url, latency: `状态码: ${xhr.status}` })
        }
      }

      xhr.ontimeout = () => {
        resolve({ url, latency: `响应超时 3000ms` })
      }

      xhr.onerror = () => {
        resolve({ url, latency: "请求失败" })
      }

      xhr.send()
    })
  }

  const getLatencyColor = (latency: number) => {
    if (latency <= 100) return "#22c55e"
    if (latency <= 200) return "#84cc16"
    if (latency <= 500) return "#eab308"
    if (latency <= 1000) return "#f97316"
    if (latency > 1000) return "#ef4444"
    return "#dc2626"
  }

  const runTests = async () => {
    const testResults = await Promise.all(
      urls.map((url) => {
        const [testUrl, name] = url.split("#")
        return testLatency(testUrl).then((result) => ({
          ...result,
          name,
        }))
      }),
    )

    setResults(testResults)

    const validResults = testResults.filter((result) => typeof result.latency === "number")
    if (validResults.length > 0) {
      const fastest = validResults.reduce(
        (prev, current) => ((prev.latency as number) < (current.latency as number) ? prev : current),
        validResults[0],
      )

      // Highlight the fastest result
      const updatedResults = testResults.map((result) => {
        if (result.name === fastest.name) {
          return { ...result, isFastest: true }
        }
        return result
      })
      setResults(updatedResults)

      // Redirect to the fastest URL
      setRedirecting(true)
      const currentPath = window.location.pathname
      const currentParams = window.location.search
      const redirectUrl = fastest.url + currentPath + currentParams

      // Add a small delay to show the results before redirecting
      setTimeout(() => {
        window.location.href = redirectUrl
      }, 1000)
    }
  }

  return (
    <main
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('${img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 w-full max-w-md min-h-[620px] shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
        <div className="relative w-[180px] h-[180px] mb-5">
          <Image
            src={网站头像 || "/placeholder.svg"}
            alt="Logo"
            width={180}
            height={180}
            className="w-full h-full rounded-full border-8 border-white shadow-md object-cover animate-pulse"
          />
        </div>

        <h1 className="text-[#1a1f36] text-2xl font-bold text-center mb-8 pb-4 relative">
          {网页标题}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6bdf8f] rounded-md"></span>
        </h1>

        <ul className="w-full px-4 mb-4">
          {results.map((result, index) => (
            <li
              key={index}
              className={`text-[#1a1f36] text-base leading-relaxed py-3 px-4 mb-2.5 rounded-xl flex justify-between items-center transition-all duration-300 hover:bg-white/80 hover:translate-x-1 ${result.isFastest ? "bg-[rgba(107,223,143,0.3)] border-2 border-[rgba(107,223,143,0.5)] translate-x-1" : "bg-white/50"}`}
            >
              {result.name}
              <span style={{ color: typeof result.latency === "number" ? getLatencyColor(result.latency) : "#dc2626" }}>
                {typeof result.latency === "number" ? `${result.latency}ms` : result.latency}
              </span>
            </li>
          ))}
        </ul>

        {redirecting && (
          <div className="text-sm font-semibold text-green-600 animate-pulse mb-4">正在跳转到最快的站点...</div>
        )}

        <div className="text-center text-sm">
          <b>📈今日访问人数:</b>
          <span id="visitCount" className="font-semibold text-[#2d3748] mx-1">
            {visitCount}
          </span>
          <b>📊当前在线人数:</b>
          <div id="liveuser" className="inline font-semibold text-[#2d3748] mx-1">
            加载中...
          </div>
        </div>
      </div>


      {/* Live user script */}
      <script src="https://liveuser.030101.xyz/main.js?sessionId=blog.cmliussss.com" async></script>
    </main>
  )
}
