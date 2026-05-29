import { Router } from '@oak/oak/router'
import { Common } from './common.ts'

import { service60s } from './modules/60s.module.ts'
import { service60sRss } from './modules/60s-rss.module.ts'
import { serviceAINews } from './modules/ai-news.module.ts'
import { serviceAnswer } from './modules/answer/answer.module.ts'
import { serviceAwesomeJs } from './modules/awesome-js/awesome-js.module.ts'
import { serviceBaike } from './modules/baike.module.ts'
import { serviceBili } from './modules/bili.module.ts'
import { serviceBing } from './modules/bing.module.ts'
import { serviceChangYa } from './modules/changya.module.ts'
import { serviceChemical } from './modules/chemical.module.ts'
import { serviceDouyin } from './modules/douyin.module.ts'
import { serviceDuanzi } from './modules/duanzi/duanzi.module.ts'
import { serviceEpic } from './modules/epic.module.ts'
import { serviceExRate } from './modules/exchange-rate.module.ts'
import { serviceFabing } from './modules/fabing/fabing.module.ts'
import { serviceFanyi } from './modules/fanyi/fanyi.module.ts'
import { serviceHash } from './modules/hash.module.ts'
import { serviceHitokoto } from './modules/hitokoto/hitokoto.module.ts'
import { serviceIP } from './modules/ip.module.ts'
import { serviceKfc } from './modules/kfc.module.ts'
import { serviceLuck } from './modules/luck/luck.module.ts'
import { serviceLunar } from './modules/lunar/lunar.module.ts'
import { serviceMaoyan } from './modules/maoyan/maoyan.module.ts'
import { serviceNcm } from './modules/ncm.module.ts'
import { serviceOG } from './modules/og.module.ts'
import { serviceQQ } from './modules/qq.module.ts'
import { serviceQRCode } from './modules/qrcode/qrcode.module.ts'
import { serviceTodayInHistory } from './modules/today-in-history.module.ts'
import { serviceToutiao } from './modules/toutiao.module.ts'
import { serviceWeather } from './modules/weather.module.ts'
import { serviceWeibo } from './modules/weibo.module.ts'
import { serviceZhihu } from './modules/zhihu.module.ts'
import { serviceDadJoke } from './modules/dad-joke/dad-joke.module.ts'
import { serviceHackerNews } from './modules/hacker-news.module.ts'
import { serviceRednote } from './modules/rednote.module.ts'
import { serviceBaidu } from './modules/baidu.module.ts'
import { serviceDongchedi } from './modules/dongchedi.module.ts'
import { serviceHealth } from './modules/health.module.ts'
import { servicePassword } from './modules/password/password.module.ts'
import { serviceColor } from './modules/color.module.ts'
import { serviceKuan } from './modules/kuan.module.ts'
import { serviceLyric } from './modules/lyric.module.ts'
import { serviceMoyu } from './modules/moyu.module.ts'
import { serviceFuelPrice } from './modules/fuel-price/fuel-price.module.ts'
import { GoldPriceService } from './modules/gold-price.module.ts'
import { serviceQuark } from './modules/quark.module.ts'
import { serviceWhois } from './modules/whois.module.ts'
import { olympicsService } from './modules/olympics/olympics.module.ts'
import { serviceDoubanWeekly } from './modules/douban-weekly.module.ts'
import { serviceITNews } from './modules/it-news.module.ts'

// import { serviceSlackingCalendar } from './modules/slacking-calendar/slacking-calendar.module.ts'

const serviceGoldPrice = new GoldPriceService()

// ============================================================
// API Explorer HTML (inline)
// ============================================================
const EXPLORER_HTML = `<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>60s API Explorer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@300..700&display=swap" rel="stylesheet">
  <style>
    :root,[data-theme="light"]{--color-bg:#f4f5f7;--color-surface:#ffffff;--color-surface-2:#f9fafb;--color-surface-offset:#eef0f3;--color-divider:#e1e4e8;--color-border:#d0d5dd;--color-text:#111827;--color-text-muted:#6b7280;--color-text-faint:#9ca3af;--color-primary:#0d9488;--color-primary-hover:#0f766e;--color-primary-highlight:#ccfbf1;--color-success:#059669;--color-success-highlight:#d1fae5;--color-warning:#d97706;--color-warning-highlight:#fef3c7;--color-error:#dc2626;--color-error-highlight:#fee2e2;--color-blue:#2563eb;--color-blue-highlight:#dbeafe;--color-purple:#7c3aed;--color-purple-highlight:#ede9fe;--radius-sm:.375rem;--radius-md:.5rem;--radius-lg:.75rem;--radius-xl:1rem;--radius-full:9999px;--shadow-sm:0 1px 2px rgba(0,0,0,.06);--shadow-md:0 4px 12px rgba(0,0,0,.08);--shadow-lg:0 12px 32px rgba(0,0,0,.12);--font-body:'Inter',system-ui,sans-serif;--font-mono:'JetBrains Mono','Fira Code',monospace;--transition:180ms cubic-bezier(.16,1,.3,1)}
    [data-theme="dark"]{--color-bg:#0d1117;--color-surface:#161b22;--color-surface-2:#1c2128;--color-surface-offset:#21262d;--color-divider:#30363d;--color-border:#3d444d;--color-text:#e6edf3;--color-text-muted:#8d96a0;--color-text-faint:#4d5566;--color-primary:#2dd4bf;--color-primary-hover:#5eead4;--color-primary-highlight:#1a3a38;--color-success:#3fb950;--color-success-highlight:#1a3a22;--color-warning:#d29922;--color-warning-highlight:#3a2e10;--color-error:#f85149;--color-error-highlight:#3a1a1a;--color-blue:#58a6ff;--color-blue-highlight:#1a2a3a;--color-purple:#bc8cff;--color-purple-highlight:#2a1a3a;--shadow-sm:0 1px 2px rgba(0,0,0,.3);--shadow-md:0 4px 12px rgba(0,0,0,.4);--shadow-lg:0 12px 32px rgba(0,0,0,.5)}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
    body{font-family:var(--font-body);font-size:.9rem;color:var(--color-text);background:var(--color-bg);min-height:100dvh}
    button{cursor:pointer;background:none;border:none;font:inherit;color:inherit}
    :focus-visible{outline:2px solid var(--color-primary);outline-offset:3px;border-radius:var(--radius-sm)}
    .app{display:grid;grid-template-columns:280px 1fr;grid-template-rows:48px 1fr;min-height:100dvh}
    .topbar{grid-column:1/-1;display:flex;align-items:center;gap:1rem;padding:0 1rem;background:var(--color-surface);border-bottom:1px solid var(--color-divider);position:sticky;top:0;z-index:100}
    .sidebar{grid-row:2;background:var(--color-surface);border-right:1px solid var(--color-divider);display:flex;flex-direction:column;height:calc(100dvh - 48px);position:sticky;top:48px;overflow:hidden}
    .main{grid-row:2;overflow-y:auto;padding:1.5rem;display:flex;flex-direction:column;gap:1.5rem;max-height:calc(100dvh - 48px)}
    .logo{display:flex;align-items:center;gap:.5rem;font-weight:600;font-size:.9rem;white-space:nowrap}
    .logo svg{color:var(--color-primary);flex-shrink:0}
    .logo-badge{background:var(--color-primary-highlight);color:var(--color-primary);font-size:.75rem;padding:2px 8px;border-radius:var(--radius-full);font-family:var(--font-mono);font-weight:600}
    .topbar-right{margin-left:auto;display:flex;align-items:center;gap:.75rem}
    .topbar-search{display:flex;align-items:center;gap:.5rem;background:var(--color-surface-offset);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.25rem .75rem}
    .topbar-search input{background:none;border:none;outline:none;font:inherit;font-size:.8rem;color:var(--color-text);width:180px}
    .topbar-search input::placeholder{color:var(--color-text-faint)}
    .topbar-search svg{color:var(--color-text-faint);flex-shrink:0}
    .theme-btn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-md);color:var(--color-text-muted)}
    .theme-btn:hover{background:var(--color-surface-offset);color:var(--color-text)}
    .sidebar-header{padding:.75rem 1rem;border-bottom:1px solid var(--color-divider)}
    .sidebar-header h2{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-muted)}
    .sidebar-count{font-size:.75rem;color:var(--color-text-faint)}
    .sidebar-filter{display:flex;gap:.25rem;padding:.5rem .75rem;border-bottom:1px solid var(--color-divider);flex-wrap:wrap}
    .filter-btn{font-size:.72rem;padding:3px 8px;border-radius:var(--radius-full);border:1px solid var(--color-border);color:var(--color-text-muted);background:none;cursor:pointer;transition:all var(--transition);white-space:nowrap}
    .filter-btn:hover{border-color:var(--color-primary);color:var(--color-primary)}
    .filter-btn.active{background:var(--color-primary-highlight);color:var(--color-primary);border-color:var(--color-primary);font-weight:600}
    .endpoint-list{overflow-y:auto;flex:1;padding:.5rem 0}
    .endpoint-list::-webkit-scrollbar{width:4px}
    .endpoint-list::-webkit-scrollbar-thumb{background:var(--color-border);border-radius:2px}
    .endpoint-item{display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;cursor:pointer;border-left:2px solid transparent;transition:all var(--transition)}
    .endpoint-item:hover{background:var(--color-surface-offset)}
    .endpoint-item.active{background:var(--color-primary-highlight);border-left-color:var(--color-primary)}
    .endpoint-item.active .ep-path{color:var(--color-primary)}
    .ep-path{font-family:var(--font-mono);font-size:.72rem;color:var(--color-text);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .ep-tag{font-size:.65rem;font-weight:700;padding:1px 5px;border-radius:3px;text-transform:uppercase;letter-spacing:.04em;flex-shrink:0}
    .tag-get{background:var(--color-success-highlight);color:var(--color-success)}
    .tag-beta{background:var(--color-warning-highlight);color:var(--color-warning)}
    .api-info{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}
    .info-card{background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:1rem}
    .info-card-label{font-size:.75rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.07em;font-weight:600;margin-bottom:.25rem}
    .info-card-value{font-family:var(--font-mono);font-size:.875rem;font-weight:600;color:var(--color-text);word-break:break-all}
    .info-card-value a{color:var(--color-primary);text-decoration:none;font-weight:500}
    .info-card-value a:hover{text-decoration:underline}
    .status-dot{display:inline-block;width:8px;height:8px;background:var(--color-success);border-radius:50%;margin-right:.25rem;box-shadow:0 0 0 2px var(--color-success-highlight);animation:pulse 2s ease-in-out infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
    .endpoint-detail{background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-lg);overflow:hidden}
    .detail-header{padding:1rem 1.25rem;border-bottom:1px solid var(--color-divider);display:flex;align-items:center;gap:.75rem;flex-wrap:wrap}
    .detail-method{font-family:var(--font-mono);font-size:.75rem;font-weight:700;padding:4px 10px;border-radius:var(--radius-sm);background:var(--color-success-highlight);color:var(--color-success)}
    .detail-path{font-family:var(--font-mono);font-size:1rem;font-weight:600;color:var(--color-text);flex:1;word-break:break-all}
    .detail-body{padding:1.25rem;display:flex;flex-direction:column;gap:1.25rem}
    .detail-section h4{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--color-text-muted);margin-bottom:.75rem}
    .try-it-bar{display:flex;gap:.5rem;align-items:stretch}
    .try-it-url{flex:1;display:flex;align-items:center;background:var(--color-surface-offset);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.5rem .75rem;font-family:var(--font-mono);font-size:.75rem;color:var(--color-text);overflow:hidden;white-space:nowrap}
    .try-it-url span{color:var(--color-text-muted);flex-shrink:0}
    .try-it-url input{flex:1;background:none;border:none;outline:none;font:inherit;color:var(--color-primary);min-width:0}
    .btn-send{background:var(--color-primary);color:#0d1117;font-weight:700;font-size:.75rem;padding:.5rem 1rem;border-radius:var(--radius-md);display:flex;align-items:center;gap:.25rem;white-space:nowrap}
    .btn-send:hover{background:var(--color-primary-hover)}
    .btn-send:disabled{opacity:.5;cursor:not-allowed}
    .params-grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
    .param-field{display:flex;flex-direction:column;gap:4px}
    .param-field label{font-size:.75rem;color:var(--color-text-muted);font-weight:500}
    .param-field input{background:var(--color-surface-offset);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:.5rem .75rem;font-family:var(--font-mono);font-size:.75rem;color:var(--color-text);outline:none}
    .param-field input:focus{border-color:var(--color-primary);box-shadow:0 0 0 2px color-mix(in oklch,var(--color-primary) 15%,transparent)}
    .response-panel{background:var(--color-surface-2);border:1px solid var(--color-divider);border-radius:var(--radius-md);overflow:hidden}
    .response-header{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-bottom:1px solid var(--color-divider);background:var(--color-surface)}
    .response-status{font-family:var(--font-mono);font-size:.75rem;font-weight:700;padding:2px 8px;border-radius:var(--radius-sm)}
    .status-200{background:var(--color-success-highlight);color:var(--color-success)}
    .status-err{background:var(--color-error-highlight);color:var(--color-error)}
    .status-pending{background:var(--color-surface-offset);color:var(--color-text-muted)}
    .response-time{font-size:.75rem;color:var(--color-text-faint);font-family:var(--font-mono);margin-left:auto}
    .response-body{padding:1rem;font-family:var(--font-mono);font-size:.72rem;line-height:1.6;max-height:350px;overflow-y:auto;white-space:pre;color:var(--color-text-muted);overflow-x:auto}
    .response-body.empty-resp{display:flex;align-items:center;justify-content:center;min-height:120px}
    .empty-resp-msg{text-align:center;color:var(--color-text-faint)}
    .json-key{color:#7dd3fc}.json-str{color:#86efac}.json-num{color:#fca5a5}.json-bool{color:#c084fc}.json-null{color:#fbbf24}
    .copy-btn{display:flex;align-items:center;gap:4px;font-size:.75rem;color:var(--color-text-muted);padding:2px 8px;border-radius:var(--radius-sm);margin-left:auto}
    .copy-btn:hover{background:var(--color-surface-offset);color:var(--color-text)}
    .welcome-panel{background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:3rem;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem}
    .welcome-icon{width:56px;height:56px;background:var(--color-primary-highlight);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;color:var(--color-primary)}
    .welcome-title{font-size:1.25rem;font-weight:700}
    .welcome-desc{font-size:.9rem;color:var(--color-text-muted);max-width:40ch;line-height:1.7}
    @media(max-width:768px){.app{grid-template-columns:1fr}.sidebar{display:none}.main{padding:1rem}.params-grid{grid-template-columns:1fr}.try-it-bar{flex-direction:column}.api-info{grid-template-columns:1fr 1fr}}
  </style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="logo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      60s API <span class="logo-badge">v2.52.4</span>
    </div>
    <div class="topbar-right">
      <div class="topbar-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="globalSearch" placeholder="搜索端点..." autocomplete="off" />
      </div>
      <button class="theme-btn" data-theme-toggle aria-label="切换主题">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  </header>
  <aside class="sidebar">
    <div class="sidebar-header"><div style="display:flex;align-items:center;justify-content:space-between"><h2>端点列表</h2><span class="sidebar-count" id="epCount"></span></div></div>
    <div class="sidebar-filter" id="filterBar"></div>
    <div class="endpoint-list" id="endpointList"></div>
  </aside>
  <main class="main">
    <div class="api-info" id="apiInfoCards"></div>
    <div id="endpointDetail" style="display:none;"></div>
    <div class="welcome-panel" id="welcomePanel">
      <div class="welcome-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/><path d="M14 4L10 20"/></svg></div>
      <div class="welcome-title">选择一个端点开始测试</div>
      <div class="welcome-desc">从左侧列表点击任意端点，可以查看说明、发送请求、查看实时响应结果。</div>
    </div>
  </main>
</div>
<script>
(function(){
  const ENDPOINTS=["/v2/60s","/v2/60s/rss","/v2/answer","/v2/baike","/v2/bili","/v2/bing","/v2/changya","/v2/chemical","/v2/douyin","/v2/duanzi","/v2/epic","/v2/exchange-rate","/v2/fabing","/v2/hitokoto","/v2/ip","/v2/kfc","/v2/luck","/v2/today-in-history","/v2/toutiao","/v2/weibo","/v2/zhihu","/v2/lunar","/v2/ai-news","/v2/it-news","/v2/it-news/rank","/v2/awesome-js","/v2/qrcode","/v2/dad-joke","/v2/rednote","/v2/dongchedi","/v2/moyu","/v2/quark","/v2/whois","/v2/health","/v2/password","/v2/password/check","/v2/maoyan/all/movie","/v2/maoyan/realtime/movie","/v2/maoyan/realtime/tv","/v2/maoyan/realtime/web","/v2/hacker-news/new","/v2/hacker-news/top","/v2/hacker-news/best","/v2/baidu/hot","/v2/baidu/teleplay","/v2/baidu/tieba","/v2/weather/realtime","/v2/weather/forecast","/v2/ncm-rank/list","/v2/ncm-rank/:id","/v2/color/random","/v2/color/palette","/v2/lyric","/v2/fuel-price","/v2/gold-price","/v2/olympics","/v2/olympics/events","/v2/douban/weekly/movie","/v2/douban/weekly/tv_chinese","/v2/douban/weekly/tv_global","/v2/douban/weekly/show_chinese","/v2/douban/weekly/show_global","/v2/og","/v2/hash","/v2/fanyi","/v2/fanyi/langs","/v2/beta/kuan","/v2/beta/qq/profile"];
  const BETA=new Set(["/v2/beta/kuan","/v2/beta/qq/profile"]);
  const META={"/v2/60s":{desc:"每天60秒读懂世界",cat:"新闻"},"/v2/60s/rss":{desc:"60秒新闻RSS格式",cat:"新闻"},"/v2/answer":{desc:"随机答案",cat:"娱乐"},"/v2/baike":{desc:"百科搜索",cat:"搜索",p:[{n:"q",d:"关键词",r:1}]},"/v2/bili":{desc:"B站热门",cat:"媒体"},"/v2/bing":{desc:"必应每日壁纸",cat:"图片"},"/v2/changya":{desc:"唱吧热歌",cat:"音乐"},"/v2/chemical":{desc:"化学元素信息",cat:"工具",p:[{n:"symbol",d:"元素符号如Fe"}]},"/v2/douyin":{desc:"抖音热门",cat:"媒体"},"/v2/duanzi":{desc:"随机段子",cat:"娱乐"},"/v2/epic":{desc:"Epic免费游戏",cat:"游戏"},"/v2/exchange-rate":{desc:"实时汇率",cat:"金融",p:[{n:"from",d:"源货币 USD"},{n:"to",d:"目标货币 CNY"}]},"/v2/fabing":{desc:"法庭辩论台词",cat:"娱乐"},"/v2/hitokoto":{desc:"一言随机名句",cat:"娱乐"},"/v2/ip":{desc:"IP信息查询",cat:"工具",p:[{n:"ip",d:"IP地址，留空查自身"}]},"/v2/kfc":{desc:"肯德基疯狂星期四",cat:"娱乐"},"/v2/luck":{desc:"每日运势",cat:"娱乐"},"/v2/today-in-history":{desc:"历史上的今天",cat:"历史"},"/v2/toutiao":{desc:"今日头条热点",cat:"新闻"},"/v2/weibo":{desc:"微博热搜",cat:"新闻"},"/v2/zhihu":{desc:"知乎热榜",cat:"新闻"},"/v2/lunar":{desc:"农历信息",cat:"工具"},"/v2/ai-news":{desc:"AI领域资讯",cat:"新闻"},"/v2/it-news":{desc:"IT科技新闻",cat:"新闻"},"/v2/it-news/rank":{desc:"IT新闻热度排行",cat:"新闻"},"/v2/awesome-js":{desc:"热门JS项目",cat:"开发"},"/v2/qrcode":{desc:"生成二维码",cat:"工具",p:[{n:"text",d:"要编码的内容",r:1}]},"/v2/dad-joke":{desc:"英文冷笑话",cat:"娱乐"},"/v2/rednote":{desc:"小红书热门",cat:"媒体"},"/v2/dongchedi":{desc:"懂车帝热门车型",cat:"汽车"},"/v2/moyu":{desc:"摸鱼人日历",cat:"娱乐"},"/v2/quark":{desc:"夸克热搜",cat:"新闻"},"/v2/whois":{desc:"域名WHOIS查询",cat:"工具",p:[{n:"domain",d:"域名如example.com",r:1}]},"/v2/health":{desc:"API健康检查",cat:"系统"},"/v2/password":{desc:"生成随机密码",cat:"工具",p:[{n:"length",d:"密码长度"}]},"/v2/password/check":{desc:"检测密码强度",cat:"工具",p:[{n:"password",d:"要检测的密码",r:1}]},"/v2/maoyan/all/movie":{desc:"猫眼全部电影",cat:"娱乐"},"/v2/maoyan/realtime/movie":{desc:"猫眼实时票房",cat:"娱乐"},"/v2/maoyan/realtime/tv":{desc:"猫眼实时电视剧",cat:"娱乐"},"/v2/maoyan/realtime/web":{desc:"猫眼实时网络剧",cat:"娱乐"},"/v2/hacker-news/new":{desc:"HN最新文章",cat:"开发"},"/v2/hacker-news/top":{desc:"HN热门文章",cat:"开发"},"/v2/hacker-news/best":{desc:"HN最佳文章",cat:"开发"},"/v2/baidu/hot":{desc:"百度实时热搜",cat:"新闻"},"/v2/baidu/teleplay":{desc:"百度电视剧热搜",cat:"娱乐"},"/v2/baidu/tieba":{desc:"百度贴吧热帖",cat:"新闻"},"/v2/weather/realtime":{desc:"实时天气",cat:"天气",p:[{n:"city",d:"城市名称",r:1}]},"/v2/weather/forecast":{desc:"天气预报",cat:"天气",p:[{n:"city",d:"城市名称",r:1}]},"/v2/ncm-rank/list":{desc:"网易云音乐榜单列表",cat:"音乐"},"/v2/ncm-rank/:id":{desc:"指定榜单详情",cat:"音乐",p:[{n:"id",d:"榜单ID",r:1,path:1}]},"/v2/color/random":{desc:"随机颜色",cat:"设计"},"/v2/color/palette":{desc:"生成配色方案",cat:"设计",p:[{n:"color",d:"基础颜色十六进制"}]},"/v2/lyric":{desc:"随机歌词",cat:"音乐"},"/v2/fuel-price":{desc:"全国油价",cat:"金融"},"/v2/gold-price":{desc:"黄金实时价格",cat:"金融"},"/v2/olympics":{desc:"奥运奖牌榜",cat:"体育"},"/v2/olympics/events":{desc:"奥运赛程",cat:"体育"},"/v2/douban/weekly/movie":{desc:"豆瓣本周口碑电影",cat:"娱乐"},"/v2/douban/weekly/tv_chinese":{desc:"豆瓣国产剧口碑榜",cat:"娱乐"},"/v2/douban/weekly/tv_global":{desc:"豆瓣国际剧口碑榜",cat:"娱乐"},"/v2/douban/weekly/show_chinese":{desc:"豆瓣国产综艺榜",cat:"娱乐"},"/v2/douban/weekly/show_global":{desc:"豆瓣国际综艺榜",cat:"娱乐"},"/v2/og":{desc:"获取URL OG信息",cat:"工具",p:[{n:"url",d:"目标网址",r:1}]},"/v2/hash":{desc:"文本哈希处理",cat:"工具",p:[{n:"text",d:"要哈希的文本",r:1},{n:"algorithm",d:"md5/sha1/sha256"}]},"/v2/fanyi":{desc:"文本翻译",cat:"工具",p:[{n:"text",d:"要翻译的文本",r:1},{n:"to",d:"目标语言如en"}]},"/v2/fanyi/langs":{desc:"翻译支持的语言",cat:"工具"},"/v2/beta/kuan":{desc:"酷安热门应用[Beta]",cat:"应用"},"/v2/beta/qq/profile":{desc:"QQ用户信息[Beta]",cat:"应用",p:[{n:"qq",d:"QQ号",r:1}]}};
  const CATS=["全部",...new Set(ENDPOINTS.map(e=>META[e]?.cat||"其他"))];
  let filter="全部",current=null;
  const html=document.documentElement;
  let theme="dark";
  document.querySelector("[data-theme-toggle]").addEventListener("click",()=>{
    theme=theme==="dark"?"light":"dark";
    html.setAttribute("data-theme",theme);
  });
  document.getElementById("apiInfoCards").innerHTML=[
    {l:"状态",v:'<span class="status-dot"></span>在线运行'},
    {l:"版本",v:"v2.52.4"},
    {l:"更新时间",v:"2026/03/06"},
    {l:"作者",v:"Viki"},
    {l:"文档",v:'<a href="https://docs.60s-api.viki.moe" target="_blank">查看文档 ↗</a>'},
    {l:"GitHub",v:'<a href="https://github.com/vikiboss/60s" target="_blank">vikiboss/60s ↗</a>'}
  ].map(c=>'<div class="info-card"><div class="info-card-label">'+c.l+'</div><div class="info-card-value">'+c.v+'</div></div>').join("");
  const filterBar=document.getElementById("filterBar");
  filterBar.innerHTML=CATS.map(c=>'<button class="filter-btn'+(c==="全部"?" active":"")+'" data-cat="'+c+'">'+c+'</button>').join("");
  filterBar.addEventListener("click",e=>{
    const b=e.target.closest(".filter-btn");if(!b)return;
    filter=b.dataset.cat;
    filterBar.querySelectorAll(".filter-btn").forEach(x=>x.classList.toggle("active",x.dataset.cat===filter));
    renderList();
  });
  document.getElementById("globalSearch").addEventListener("input",renderList);
  function getEps(){
    const q=document.getElementById("globalSearch").value.toLowerCase();
    return ENDPOINTS.filter(e=>{
      if(filter!=="全部"&&(META[e]?.cat||"其他")!==filter)return false;
      if(q&&!e.toLowerCase().includes(q)&&!(META[e]?.desc||"").toLowerCase().includes(q))return false;
      return true;
    });
  }
  function renderList(){
    const eps=getEps();
    document.getElementById("epCount").textContent=eps.length+" 个";
    document.getElementById("endpointList").innerHTML=eps.map(e=>'<div class="endpoint-item'+(e===current?" active":"")+'" data-ep="'+e+'" tabindex="0"><span class="ep-tag '+(BETA.has(e)?"tag-beta":"tag-get")+'">'+(BETA.has(e)?"BETA":"GET")+'</span><span class="ep-path" title="'+e+'">'+e+'</span></div>').join("");
    document.querySelectorAll(".endpoint-item").forEach(i=>{
      i.addEventListener("click",()=>selectEp(i.dataset.ep));
      i.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")selectEp(i.dataset.ep)});
    });
  }
  function selectEp(ep){
    current=ep;
    document.getElementById("welcomePanel").style.display="none";
    renderList();
    renderDetail(ep);
  }
  function renderDetail(ep){
    const m=META[ep]||{};
    const ps=m.p||[];
    const d=document.getElementById("endpointDetail");
    d.style.display="block";
    d.innerHTML='<div class="endpoint-detail"><div class="detail-header"><span class="detail-method">'+(BETA.has(ep)?"BETA":"GET")+'</span><span class="detail-path">'+ep+'</span>'+(m.desc?'<span style="font-size:.8rem;color:var(--color-text-muted)">'+m.desc+'</span>':'')+
    '</div><div class="detail-body">'+
    (ps.length?'<div class="detail-section"><h4>参数</h4><div class="params-grid">'+ps.map(p=>'<div class="param-field"><label>'+p.n+(p.r?' <span style="color:var(--color-error)">*</span>':'')+' <span style="color:var(--color-text-faint);font-weight:400">'+p.d+'</span></label><input type="text" placeholder="'+(p.r?"必填":"可选")+'" data-param="'+p.n+'" data-path="'+(p.path?1:0)+'" /></div>').join("")+'</div></div>':'')+
    '<div class="detail-section"><h4>发送请求</h4><div class="try-it-bar"><div class="try-it-url"><span id="urlBase">'+location.origin+'</span><input id="urlPath" readonly /></div><button class="btn-send" id="sendBtn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> 发送</button></div></div>'+
    '<div class="detail-section"><h4>响应结果</h4><div class="response-panel"><div class="response-header"><span class="response-status status-pending" id="respStatus">等待请求</span><span class="response-time" id="respTime"></span><button class="copy-btn" id="copyBtn" style="display:none"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> 复制</button></div><div class="response-body empty-resp" id="respBody"><div class="empty-resp-msg"><div style="font-size:2rem;margin-bottom:8px">↑</div><div>点击"发送"查看响应</div></div></div></div></div>'+
    '</div></div>';
    d.querySelectorAll("input[data-param]").forEach(i=>i.addEventListener("input",updateUrl));
    document.getElementById("sendBtn").addEventListener("click",sendReq);
    document.getElementById("copyBtn").addEventListener("click",copyResp);
    updateUrl();
  }
  function buildUrl(){
    let ep=current;
    document.querySelectorAll("input[data-path='1']").forEach(i=>{if(i.value)ep=ep.replace(":"+i.dataset.param,encodeURIComponent(i.value))});
    const qs=[];
    document.querySelectorAll("input[data-path='0']").forEach(i=>{if(i.value)qs.push(encodeURIComponent(i.dataset.param)+"="+encodeURIComponent(i.value))});
    return ep+(qs.length?"?"+qs.join("&"):"");
  }
  function updateUrl(){const e=document.getElementById("urlPath");if(e)e.value=buildUrl()}
  let lastRaw="";
  async function sendReq(){
    const btn=document.getElementById("sendBtn"),st=document.getElementById("respStatus"),rb=document.getElementById("respBody"),rt=document.getElementById("respTime"),cb=document.getElementById("copyBtn");
    btn.disabled=true;btn.textContent="请求中...";
    st.className="response-status status-pending";st.textContent="请求中...";
    rb.className="response-body empty-resp";rb.innerHTML='<div class="empty-resp-msg"><div style="font-size:1.5rem">⟳</div><div>正在请求...</div></div>';
    cb.style.display="none";rt.textContent="";
    const url=buildUrl(),t=Date.now();
    try{
      const res=await fetch(url);const ms=Date.now()-t;const text=await res.text();lastRaw=text;
      st.className="response-status "+(res.ok?"status-200":"status-err");st.textContent=res.status+" "+res.statusText;rt.textContent=ms+"ms";
      try{rb.className="response-body";rb.innerHTML=syntaxHL(JSON.stringify(JSON.parse(text),null,2));}catch{rb.className="response-body";rb.textContent=text;}
      cb.style.display="flex";
    }catch(err){
      st.className="response-status status-err";st.textContent="请求失败";rt.textContent=(Date.now()-t)+"ms";
      rb.className="response-body";rb.textContent="错误: "+err.message;
    }
    btn.disabled=false;btn.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> 发送';
  }
  function copyResp(){navigator.clipboard.writeText(lastRaw).then(()=>{const b=document.getElementById("copyBtn");b.textContent="已复制 ✓";setTimeout(()=>{b.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> 复制'},1500)})}
  function syntaxHL(j){return j.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,m=>{let c="json-num";if(/^"/.test(m)){c=/:$/.test(m)?"json-key":"json-str"}else if(/true|false/.test(m)){c="json-bool"}else if(/null/.test(m)){c="json-null"}return '<span class="'+c+'">'+m+'</span>'})}
  renderList();
})();
</script>
</body>
</html>`

export const rootRouter = new Router()

rootRouter.get('/', (ctx) => {
  ctx.response.headers.set('Content-Type', 'application/json; charset=utf-8')
  const endpoints = Array.from(appRouter.entries(), ([_, v]) => v.path)
  ctx.response.body = JSON.stringify({ ...Common.getApiInfo(), endpoints }, null, 2)
})

rootRouter.get('/health', (ctx) => {
  ctx.response.body = 'ok'
})

rootRouter.get('/endpoints', (ctx) => {
  ctx.response.headers.set('Content-Type', 'application/json; charset=utf-8')
  ctx.response.body = Array.from(appRouter.entries(), ([_, v]) => v.path)
})

rootRouter.get('/explorer', (ctx) => {
  ctx.response.headers.set('Content-Type', 'text/html; charset=utf-8')
  ctx.response.body = EXPLORER_HTML
})

export const appRouter = new Router({
  prefix: '/v2',
})

// === 以下为已发布的正式接口 ===
appRouter.get('/60s', service60s.handle())
appRouter.get('/60s/rss', service60sRss.handle())
appRouter.get('/answer', serviceAnswer.handle())
appRouter.get('/baike', serviceBaike.handle())
appRouter.get('/bili', serviceBili.handle())
appRouter.get('/bing', serviceBing.handle())
appRouter.get('/changya', serviceChangYa.handle())
appRouter.get('/chemical', serviceChemical.handle())
appRouter.get('/douyin', serviceDouyin.handle())
appRouter.get('/duanzi', serviceDuanzi.handle())
appRouter.get('/epic', serviceEpic.handle())
appRouter.get('/exchange-rate', serviceExRate.handle())
appRouter.get('/fabing', serviceFabing.handle())
appRouter.get('/hitokoto', serviceHitokoto.handle())
appRouter.get('/ip', serviceIP.handle())
appRouter.get('/kfc', serviceKfc.handle())
appRouter.get('/luck', serviceLuck.handle())
appRouter.get('/today-in-history', serviceTodayInHistory.handle())
appRouter.get('/toutiao', serviceToutiao.handle())
appRouter.get('/weibo', serviceWeibo.handle())
appRouter.get('/zhihu', serviceZhihu.handle())
appRouter.get('/lunar', serviceLunar.handle())
appRouter.get('/ai-news', serviceAINews.handle())
appRouter.get('/it-news', serviceITNews.handle())
appRouter.get('/it-news/rank', serviceITNews.handleRank())
appRouter.get('/awesome-js', serviceAwesomeJs.handle())
appRouter.get('/qrcode', serviceQRCode.handle())
appRouter.get('/dad-joke', serviceDadJoke.handle())
appRouter.get('/rednote', serviceRednote.handle())
appRouter.get('/dongchedi', serviceDongchedi.handle())
appRouter.get('/moyu', serviceMoyu.handle())
appRouter.get('/quark', serviceQuark.handle())
appRouter.get('/whois', serviceWhois.handle())

appRouter.get('/health', serviceHealth.handle())
appRouter.get('/password', servicePassword.handle())
appRouter.get('/password/check', servicePassword.handleCheck())

appRouter.get('/maoyan/all/movie', serviceMaoyan.handleAllMovie())
appRouter.get('/maoyan/realtime/movie', serviceMaoyan.handleRealtime('movie'))
appRouter.get('/maoyan/realtime/tv', serviceMaoyan.handleRealtime('tv'))
appRouter.get('/maoyan/realtime/web', serviceMaoyan.handleRealtime('web'))

appRouter.get('/hacker-news/new', serviceHackerNews.handle('top'))
appRouter.get('/hacker-news/top', serviceHackerNews.handle('top'))
appRouter.get('/hacker-news/best', serviceHackerNews.handle('best'))

appRouter.get('/baidu/hot', serviceBaidu.handleHotSearch())
appRouter.get('/baidu/teleplay', serviceBaidu.handleTeleplay())
appRouter.get('/baidu/tieba', serviceBaidu.handleTieba())

appRouter.get('/weather/realtime', serviceWeather.handle())
appRouter.get('/weather/forecast', serviceWeather.handleForecast())

appRouter.get('/ncm-rank/list', serviceNcm.handleRank())
appRouter.get('/ncm-rank/:id', serviceNcm.handleRankDetail())

appRouter.get('/color/random', serviceColor.handle())
appRouter.get('/color/palette', serviceColor.handlePalette())

appRouter.all('/lyric', serviceLyric.handle())
appRouter.all('/fuel-price', serviceFuelPrice.handle())
appRouter.get('/gold-price', serviceGoldPrice.handle())
appRouter.get('/olympics', olympicsService.handle())
appRouter.get('/olympics/events', olympicsService.handleEventList())

appRouter.get('/douban/weekly/movie', serviceDoubanWeekly.handle('movie'))
appRouter.get('/douban/weekly/tv_chinese', serviceDoubanWeekly.handle('tv_chinese'))
appRouter.get('/douban/weekly/tv_global', serviceDoubanWeekly.handle('tv_global'))
appRouter.get('/douban/weekly/show_chinese', serviceDoubanWeekly.handle('show_chinese'))
appRouter.get('/douban/weekly/show_global', serviceDoubanWeekly.handle('show_global'))

// === 以下为支持 body 解析参数的接口 ===
appRouter.all('/og', serviceOG.handle())
appRouter.all('/hash', serviceHash.handle())

appRouter.all('/fanyi', serviceFanyi.handle())
appRouter.all('/fanyi/langs', serviceFanyi.handleLangs())

// === 以下为测试接口，beta 前缀，接口可能不稳定 ===
appRouter.get('/beta/kuan', serviceKuan.handle())
appRouter.get('/beta/qq/profile', serviceQQ.handle())

// === 以下为待定接口，还在计划、开发中 ===
// appRouter.get('/slacking-calendar', serviceSlackingCalendar.handle())

// === 以下接口为兼容保留，未来大版本移除 ===
appRouter.get('/exchange_rate', serviceExRate.handle())
appRouter.get('/today_in_history', serviceTodayInHistory.handle())
appRouter.get('/maoyan', serviceMaoyan.handleAllMovie())
appRouter.get('/baidu/realtime', serviceBaidu.handleHotSearch())
appRouter.get('/weather', serviceWeather.handle())
appRouter.get('/ncm-rank', serviceNcm.handleRank())
appRouter.get('/color', serviceColor.handle())
