export const config = {
  runtime: "edge",
}

let urls = [
  "https://www.fnshop.fntaowu.com#FnCloud CDN",
  "https://xn--9kqw98kgro.fntao5.cn#Cloudflare CDN",
  "https://fastlys.fntaowu.com#Fastly CDN",
  "https://fnshop.ip-ddns.com#备用地址",
]

export default async function handler(request) {
  const url = new URL(request.url)
  const path = url.pathname
  const params = url.search

  // 如果 env.URLS 存在，则添加到数组
  if (process.env.URL) urls = await ADD(process.env.URL)

  const ads = process.env.ADS || "google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0"
  const 网站图标 = process.env.ICO || "https://yunpan.flw8.top/PicGo/fnyun"
  const 网站头像 = process.env.PNG || "https://yunpan.flw8.top/PicGo/fnyun"
  const 网页标题 = process.env.TITLE || "Fn Cloud蜂鸟云账号商场"
  const 站点名称 = process.env.NAME || "Fn Cloud蜂鸟云商场 - 智能访问"
  if (url.pathname.toLowerCase() == "/ads.txt") {
    return new Response(ads, {
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    })
  } else if (url.pathname.toLowerCase() == "/favicon.ico") {
    return fetch(网站图标)
  } else if (url.pathname.toLowerCase() == "/bgimg") {
    // 代理图片请求，解决跨域/防盗链问题
    let bgImgs = [
      "https://raw.cmliussss.com/keqing1080p.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c2315.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c22bc.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c2337.jpg",
    ]
    if (process.env.IMG) {
      bgImgs = await ADD(process.env.IMG)
    }
    const i = Number.parseInt(url.searchParams.get("i") || "0", 10)
    const imgUrl = bgImgs[i % bgImgs.length]
    return fetch(imgUrl, {
      headers: {
        // 可根据需要伪造 Referer 或 User-Agent
      },
    })
  } else {
    // ✅ 本地随机背景图数组
    let bgImgs = [
      "https://raw.cmliussss.com/keqing1080p.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c2315.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c22bc.jpg",
      "https://pic.imgdb.cn/item/66f6c978f21886ccc06c2337.jpg",
    ]
    if (process.env.IMG) {
      bgImgs = await ADD(process.env.IMG)
    }
    const imgIndex = Math.floor(Math.random() * bgImgs.length)
    const img = bgImgs[imgIndex]

    // 生成将 urls 数组传递给前端 JavaScript 的 HTML
    const html = `
		<!DOCTYPE html>
		<html lang="zh-CN">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${站点名称} - ${网页标题}</title>
			<style>
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}
				
				body {
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
					margin: 0;
					padding: 0;
					background-image: url('/bgimg?i=${imgIndex}');
					background-size: cover;
					background-position: center;
					background-attachment: fixed;
					min-height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
				}
		
				.container {
					background: rgba(255, 255, 255, 0.6);
					backdrop-filter: blur(10px);
					border-radius: 24px;
					padding: 30px;
					width: 480px;
					min-height: 620px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					transition: all 0.3s ease;
				}
		
				.container:hover {
					transform: translateY(-5px);
					box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
				}
		
				.logo-container {
					position: relative;
					width: 180px;
					height: 180px;
					margin-bottom: 20px;
				}
		
				.logo {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: 8px solid white;
					box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
					animation: pulse 2s infinite;
					object-fit: cover;
				}
		
				@keyframes pulse {
					0% {
						box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4);
					}
					70% {
						box-shadow: 0 0 0 20px rgba(107, 223, 143, 0);
					}
					100% {
						box-shadow: 0 0 0 0 rgba(107, 223, 143, 0);
					}
				}

				@keyframes blink {
					0% { opacity: 1; }
					50% { opacity: 0.6; }
					100% { opacity: 1; }
				}
		
				h1 {
					color: #1a1f36;
					font-size: 28px;
					font-weight: 700;
					text-align: center;
					margin: 0 0 30px 0;
					padding-bottom: 15px;
					position: relative;
				}
		
				h1::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 60px;
					height: 4px;
					background: #6bdf8f;
					border-radius: 2px;
				}
		
				.description {
					width: 100%;
					padding: 0 15px;
					margin-bottom: 15px;
					font-weight: 600;  // 添加这一行来加粗文字
				}
		
				ul {
					list-style: none;
					width: 100%;
				}
		
				ul li {
					color: #1a1f36;
					font-size: 16px;
					line-height: 1.6;
					padding: 12px 15px;
					margin-bottom: 10px;
					background: rgba(255, 255, 255, 0.5);
					border-radius: 12px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					transition: all 0.3s ease;
				}
		
				ul li:hover {
					background: rgba(255, 255, 255, 0.8);
					transform: translateX(5px);
				}

				.beian-info a {
					color: var(--primary-color);
					text-decoration: none;
					border-bottom: 1px dashed var(--primary-color);
					padding-bottom: 2px;
				}

				.beian-info a:hover {
					border-bottom-style: solid;
				}
		
				#visitCount, #liveuser {
					font-weight: 600;
					color: #2d3748;
					margin: 0 4px;
				}

				.github-corner {
					position: fixed;
					top: 0;
					right: 0;
					z-index: 1000;
				}

				.github-corner svg {
					position: absolute;
					top: 0;
					right: 0;
					border: 0;
					fill: #6bdf8f;
					color: #ffffff;
					width: 80px;
					height: 80px;
					transition: fill 0.3s ease;
				}
				
				.github-corner:hover svg {
					fill: #5bc77d;
				}
				
				.github-corner .octo-arm {
					transform-origin: 130px 106px;
				}
				
				@keyframes octocat-wave {
					0%, 100% { transform: rotate(0) }
					20%, 60% { transform: rotate(-25deg) }
					40%, 80% { transform: rotate(10deg) }
				}
				
				.github-corner:hover .octo-arm {
					animation: octocat-wave 560ms ease-in-out;
				}
				
				@media (max-width: 500px) {
					.github-corner {
						width: 60px;
						height: 60px;
					}
					.github-corner:hover .octo-arm {
						animation: none;
					}
					.github-corner .octo-arm {
						animation: octocat-wave 560ms ease-in-out;
					}
				}
			</style>
		</head>
		<body>
			<div class="container">
				<div class="logo-container">
					<img class="logo" src="${网站头像}" alt="Logo">
				</div>
				<h1>${网页标题}</h1>
				<ul class="description" id="urls"></ul>
				<div style="text-align: center; font-size: 13px;">
					<b>📈今日访问人数:</b><span id="visitCount">加载中...</span>
					<b>📊当前在线人数:</b><div id="liveuser" style="display: inline;">加载中...</div>
					<script src="https://liveuser.030101.xyz/main.js?sessionId=blog.cmliussss.com"></script>
					<script>
					fetch('https://tongji.090227.xyz/?id=blog.cmliussss.com')
					.then(r => r.json())
					.then(d => document.getElementById('visitCount').innerText = d.visitCount)
					.catch(e => document.getElementById('visitCount').innerText = '加载失败');
					</script>
				</div>
			</div>
			<script>
				const urls = ${JSON.stringify(urls)};
				
				// 动态生成URL列表
				const ul = document.getElementById("urls");
				urls.forEach((url, index) => {
					const [testUrl, name] = url.split('#');
					const li = document.createElement("li");
					li.id = \`result\${index}\`;
					li.innerHTML = \`\${name} <span id="latency\${index}">测速中...</span>\`;
					ul.appendChild(li);
				});
		
				const timeout = 3000;
		
				function testLatency(url) {
					return new Promise((resolve) => {
						const start = Date.now();
						const xhr = new XMLHttpRequest();
						xhr.open('HEAD', url, true);
						xhr.timeout = timeout;
		
						xhr.onload = function () {
							const latency = Date.now() - start;
							if (xhr.status === 200) {
								resolve({ url, latency });
							} else {
								resolve({ url, latency: \`状态码: \${xhr.status}\` });
							}
						};
		
						xhr.ontimeout = function () {
							resolve({ url, latency: \`响应超时 \${timeout}ms\` });
						};
		
						xhr.onerror = function () {
							resolve({ url, latency: '请求失败' });
						};
		
						xhr.send();
					});
				}
		
				function getLatencyColor(latency) {
					if (latency <= 100) return '#22c55e';
					if (latency <= 200) return '#84cc16';
					if (latency <= 500) return '#eab308';
					if (latency <= 1000) return '#f97316';
					if (latency > 1000) return '#ef4444';
					return '#dc2626';
				}
		
				// 只需要修改 runTests 函数中处理最快结果的部分:

				async function runTests() {
					const results = await Promise.all(urls.map(url => {
						const [testUrl, name] = url.split('#');
						return testLatency(testUrl).then(result => ({
							...result,
							name
						}));
					}));

					results.forEach((result, index) => {
						const li = document.getElementById(\`result\${index}\`);
						const latencySpan = document.getElementById(\`latency\${index}\`);
						if (typeof result.latency === 'number') {
							latencySpan.textContent = \`\${result.latency}ms\`;
							latencySpan.style.color = getLatencyColor(result.latency);
						} else {
							latencySpan.textContent = result.latency;
							latencySpan.style.color = '#dc2626';
						}
					});

					const validResults = results.filter(result => typeof result.latency === 'number');
					if (validResults.length > 0) {
						const fastest = validResults.reduce((prev, current) => 
							(prev.latency < current.latency ? prev : current), validResults[0]);

						results.forEach((result, index) => {
							if (result.name === fastest.name) {
								const li = document.getElementById(\`result\${index}\`);
								li.style.background = 'rgba(107, 223, 143, 0.3)';
								li.style.border = '2px solid rgba(107, 223, 143, 0.5)';
								li.style.transform = 'translateX(5px)';
							}
						});

						const currentPath = '${path}';
						const currentParams = '${params}';
						const redirectUrl = fastest.url + currentPath + currentParams;
						window.location.href = redirectUrl;
					}
				}
		
				window.onload = runTests;
			</script>
		</body>
		</html>
		`

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    })
  }
}

// 辅助函数：将env.URLS字符串处理成数组
async function ADD(envadd) {
  // 将制表符、双引号、单引号和换行符都替换为逗号
  // 然后将连续的多个逗号替换为单个逗号
  var addtext = envadd.replace(/[	|"'\r\n]+/g, ",").replace(/,+/g, ",")

  // 删除开头和结尾的逗号（如果有的话）
  if (addtext.charAt(0) == ",") addtext = addtext.slice(1)
  if (addtext.charAt(addtext.length - 1) == ",") addtext = addtext.slice(0, addtext.length - 1)

  // 使用逗号分割字符串，得到地址数组
  const add = addtext.split(",")

  return add
}
