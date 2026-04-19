import { useState } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');`;

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:       #f5f3ef;
    --surface:  #ffffff;
    --surface2: #eeebe6;
    --surface3: #e7e4de;
    --border:   #dedad3;
    --border2:  #ccc9c2;
    --text:     #1c1a17;
    --text2:    #4a4742;
    --muted:    #8c897f;
    --muted2:   #b5b2a8;

    --mint:     #1e7a63;
    --mint-bg:  rgba(30,122,99,0.07);
    --mint-bd:  rgba(30,122,99,0.2);

    --rose:     #9a4040;
    --rose-bg:  rgba(154,64,64,0.07);
    --rose-bd:  rgba(154,64,64,0.2);

    --amber:    #8a6018;
    --amber-bg: rgba(138,96,24,0.07);
    --amber-bd: rgba(138,96,24,0.2);

    --sage:     #3a6b4a;
    --sage-bg:  rgba(58,107,74,0.07);

    --slate:    #3a5e8a;
    --slate-bg: rgba(58,94,138,0.07);

    --lavender: #5a4a8a;
    --lav-bg:   rgba(90,74,138,0.07);

    --font-display: 'Syne', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  html, body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  /* ── HEADER ─────────────────────────────────────────── */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 26px 40px 20px;
    position: sticky; top: 0; z-index: 100;
    background: rgba(245,243,239,0.97);
    backdrop-filter: blur(12px);
    display: flex; align-items: flex-end; justify-content: space-between; gap: 20px;
  }
  .eyebrow {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--mint); margin-bottom: 7px;
  }
  .h-title {
    font-family: var(--font-display); font-size: 2.4rem;
    font-weight: 800; line-height: 1; color: var(--text);
    letter-spacing: -0.01em;
  }
  .h-title em { font-style: normal; color: var(--mint); }
  .h-sub {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--muted); margin-top: 6px; letter-spacing: 0.04em;
  }
  .header-stats { display: flex; gap: 24px; align-items: flex-end; }
  .stat { text-align: right; }
  .stat-n { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; line-height: 1; color: var(--mint); }
  .stat-l { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }

  /* ── NAV ─────────────────────────────────────────────── */
  .nav {
    display: flex; border-bottom: 1px solid var(--border);
    padding: 0 40px; overflow-x: auto; scrollbar-width: none;
    background: var(--bg);
  }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em;
    text-transform: uppercase; padding: 13px 18px; border: none; background: none;
    color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent;
    white-space: nowrap; transition: color 0.15s, border-color 0.15s;
    display: flex; align-items: center; gap: 7px;
  }
  .nav-btn:hover { color: var(--text2); }
  .nav-btn.active { color: var(--mint); border-bottom-color: var(--mint); }
  .nav-cnt {
    background: var(--surface3); border-radius: 10px; padding: 1px 6px;
    font-size: 9px; color: var(--muted);
  }
  .nav-btn.active .nav-cnt { background: var(--mint-bg); color: var(--mint); border: 1px solid var(--mint-bd); }

  /* ── CONTENT ─────────────────────────────────────────── */
  .content { padding: 36px 40px; max-width: 1400px; }

  .sec-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .sec-title { font-family: var(--font-display); font-size: 2.6rem; font-weight: 800; line-height: 1; color: var(--text); letter-spacing: -0.01em; }
  .sec-desc { font-size: 13px; color: var(--text2); margin-top: 8px; line-height: 1.65; max-width: 620px; }
  .sec-header { margin-bottom: 28px; }

  /* ── ROLE GRID ───────────────────────────────────────── */
  .role-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(390px, 1fr)); gap: 14px; }

  /* ── ROLE CARD ───────────────────────────────────────── */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .card:hover { border-color: var(--border2); box-shadow: 0 4px 24px rgba(0,0,0,0.3); }
  .card.open { border-color: var(--border2); }

  .card-hd {
    padding: 17px 20px 14px; cursor: pointer;
    display: flex; flex-direction: column; gap: 10px;
  }
  .card-hd:hover { background: rgba(255,255,255,0.015); }

  .card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .card-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); line-height: 1.3; flex: 1; }

  .fit-tag {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
    white-space: nowrap; flex-shrink: 0; border: 1px solid;
  }

  .card-titles-row {
    display: flex; gap: 8px; flex-wrap: wrap; margin-top: 2px;
  }
  .title-chip {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em;
    padding: 2px 8px; border-radius: 12px; border: 1px solid var(--border2);
    color: var(--muted); display: flex; align-items: center; gap: 4px;
  }
  .title-chip-label { color: var(--muted2); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; }

  .card-meta { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .meta-item { display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: var(--muted); }
  .meta-sal { color: var(--text2); font-size: 11px; font-weight: 500; }
  .meta-time { color: var(--text2); font-size: 10px; }

  .rga-dots { display: flex; gap: 3px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot.on { background: var(--mint); }
  .dot.off { background: var(--border2); }
  .fld-dots { display: flex; gap: 3px; }
  .fld-dot { width: 8px; height: 8px; border-radius: 2px; }
  .fld-dot.on { background: var(--lavender); }
  .fld-dot.off { background: var(--border2); }

  .expand-hint { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted2); margin-top: 2px; }

  /* ── CARD BODY ───────────────────────────────────────── */
  .card-body { border-top: 1px solid var(--border); padding: 20px; display: flex; flex-direction: column; gap: 18px; }
  .subsec-title { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }

  .blist { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .blist li { font-size: 12px; color: var(--text2); line-height: 1.55; padding-left: 14px; position: relative; }
  .blist li::before { content: '·'; position: absolute; left: 0; color: var(--mint); font-size: 14px; line-height: 1.3; }

  .rga-callout { background: var(--surface2); border-radius: 6px; padding: 12px 14px; border-left: 2px solid var(--mint); }
  .rga-callout p { font-size: 12px; color: var(--text2); line-height: 1.6; }

  .why-callout { border-radius: 6px; padding: 12px 14px; }
  .why-callout p { font-size: 12px; line-height: 1.6; }
  .why-yes { background: var(--mint-bg); border-left: 2px solid var(--mint); }
  .why-yes p { color: var(--mint); }
  .why-no { background: var(--rose-bg); border-left: 2px solid var(--rose); }
  .why-no p { color: var(--rose); }
  .why-neutral { background: var(--amber-bg); border-left: 2px solid var(--amber); }
  .why-neutral p { color: var(--amber); }

  .chip { font-family: var(--font-mono); font-size: 10px; color: var(--mint); background: var(--mint-bg); border: 1px solid var(--mint-bd); border-radius: 4px; padding: 4px 10px; display: inline-block; margin-top: 2px; }

  /* ── FULL MAP TABLE ──────────────────────────────────── */
  .tbl-wrap { overflow-x: auto; }
  .tbl { width: 100%; border-collapse: collapse; min-width: 780px; }
  .tbl th { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--border); white-space: nowrap; }
  .tbl td { padding: 11px 14px; border-bottom: 1px solid var(--border); font-size: 12px; vertical-align: middle; }
  .tbl tr:hover td { background: rgba(255,255,255,0.018); }
  .tbl-name { font-weight: 500; color: var(--text); }
  .tbl-cat { font-family: var(--font-mono); font-size: 10px; }
  .tbl-sal { color: var(--muted); font-family: var(--font-mono); font-size: 10px; }
  .tbl-take { color: var(--muted); font-size: 11px; }
  .tbl-rga { font-family: var(--font-mono); font-size: 11px; color: var(--mint); letter-spacing: 0.04em; }
  .tbl-titles { font-family: var(--font-mono); font-size: 9px; color: var(--muted); line-height: 1.7; }

  /* filter btns */
  .filter-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .fbtn {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 6px 14px; border: 1px solid var(--border2);
    border-radius: 4px; cursor: pointer; transition: all 0.15s;
    background: transparent; color: var(--muted);
  }
  .fbtn.on { background: var(--mint-bg); color: var(--mint); border-color: var(--mint-bd); }

  /* ── 2030 SKILLS ─────────────────────────────────────── */
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .col-title { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 12px; }
  .sk { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 13px 15px; margin-bottom: 9px; transition: border-color 0.15s; }
  .sk:hover { border-color: var(--border2); }
  .sk-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 5px; gap: 10px; }
  .sk-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .sk-lv { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; padding: 2px 7px; border-radius: 3px; white-space: nowrap; flex-shrink: 0; }
  .lv-strong  { background: rgba(58,107,74,0.1);   color: var(--sage); }
  .lv-build   { background: rgba(30,122,99,0.08);  color: var(--mint); }
  .lv-proven  { background: rgba(58,94,138,0.1);   color: var(--slate); }
  .lv-natural { background: rgba(90,74,138,0.09);  color: var(--lavender); }
  .lv-early   { background: rgba(138,96,24,0.09);  color: var(--amber); }
  .lv-weak    { background: rgba(154,64,64,0.09);  color: var(--rose); }
  .lv-course  { background: rgba(138,96,24,0.09);  color: var(--amber); }
  .sk-desc { font-size: 12px; color: var(--muted); line-height: 1.55; }

  .future-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 10px; margin-top: 14px; }
  .future-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 13px 15px; }
  .exists-tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px; display: inline-block; margin-bottom: 6px; }
  .ex-now      { background: rgba(58,107,74,0.1);   color: var(--sage); }
  .ex-emerging { background: rgba(30,122,99,0.08);  color: var(--mint); }
  .ex-future   { background: rgba(90,74,138,0.09);  color: var(--lavender); }
  .future-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .future-desc { font-size: 12px; color: var(--muted); line-height: 1.55; }

  /* ── DEVILS BOX ──────────────────────────────────────── */
  .devils {
    background: var(--rose-bg); border: 1px solid var(--rose-bd);
    border-radius: 8px; padding: 16px 18px; margin-top: 24px;
  }
  .devils-title { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rose); margin-bottom: 8px; }
  .devils p { font-size: 13px; color: var(--text2); line-height: 1.65; }

  /* ── WHISPER BAR ─────────────────────────────────────── */
  .whisper { background: var(--mint-bg); border: 1px solid var(--mint-bd); border-radius: 8px; padding: 13px 18px; margin-bottom: 26px; display: flex; align-items: flex-start; gap: 12px; }
  .whisper-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .whisper-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mint); margin-bottom: 3px; }
  .whisper-txt { font-size: 13px; color: var(--text2); font-style: italic; }

  @media (max-width: 780px) {
    .header { padding: 18px 20px; flex-direction: column; align-items: flex-start; }
    .h-title { font-size: 1.8rem; }
    .nav { padding: 0 20px; }
    .content { padding: 22px 18px; }
    .role-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const YES = [
  {
    id: "pmm",
    title: "Product Marketing Manager",
    earlyTitle: "Product Marketing Associate · Marketing Programs Coordinator",
    midTitle: "PMM · Senior Product Marketing Manager",
    fit: "BEST FIT", fc: "mint", rga: 4, fld: 4,
    salary: "$70–130k", timeline: "30–60 days",
    daily: [
      "Write positioning and messaging docs — who the product is for, why it matters, how it differs",
      "Build sales enablement: battle cards, one-pagers, objection handling guides, pitch decks",
      "Coordinate product launches across product, sales, design, and support",
      "Run 4–6 customer interviews per month, synthesize into insight docs",
      "Manage competitive intel — track what competitors say and do",
      "Brief sales team on new features before they reach customers",
      "Write website copy, case studies, and email campaign copy alongside demand gen"
    ],
    metrics: [
      "Win rate — % of deals closed after PMM-created sales materials were used",
      "Pipeline influence — $ value of deals where PMM content was a touchpoint",
      "Feature adoption rate — % of users activating new features after launch",
      "Launch performance — signups, trials, ARR in first 30/60/90 days",
      "Sales cycle length — does your enablement content shorten time to close"
    ],
    rgaText: "Direct. PMM content touches 30–60% of pipeline at most SaaS companies. A single well-positioned one-pager can improve close rates 5–10%. A strong product launch generates net new ARR. Clear line to revenue without carrying a quota.",
    whyText: "Prescene.ai PMM externship is direct proof. TikTok brand strategy externship built a real brand playbook. Accenture framed a $200M data platform into executive dashboards — that IS positioning work. UT Austin MSBA + Exec PM cert is analyst credibility no other PMM candidate carries. Wedify proposal = unsolicited PMM deliverable before you had the title. Motion Bootcamp is PMM creative training. Uses 16 of your 27 documented CraftSkills.",
    takeIf: "Always apply"
  },
  {
    id: "devrel",
    title: "Developer Advocate",
    earlyTitle: "Developer Relations Associate · Technical Community Manager",
    midTitle: "Developer Advocate · Senior Developer Advocate",
    fit: "BEST FIT", fc: "mint", rga: 4, fld: 5,
    salary: "$90–140k", timeline: "30–90 days",
    daily: [
      "Create tutorials, demo videos, and code samples showing how to use APIs or products",
      "Write educational blog posts and technical guides",
      "Speak at conferences, run webinars, host workshops",
      "Manage developer community (Discord, Slack, forums)",
      "Gather developer feedback and bring it to product team",
      "Build onboarding resources so developers get value in under 30 minutes",
      "Test beta features and give structured feedback before release"
    ],
    metrics: [
      "Developer community growth — active members per month",
      "API adoption rate — developers making first API call after your content",
      "Content reach — views, watch time, unique visitors",
      "Support ticket deflection — % of questions answered by your docs",
      "Developer NPS — how developers rate their platform experience"
    ],
    rgaText: "For API-first companies, every developer who adopts the platform is a potential paying customer. DevRel drives developer acquisition at the top of funnel. At usage-based pricing companies, more developers = more API calls = more revenue.",
    whyText: "Your YouTube channel proves you can teach on camera — most DevRels can write, few can film. You are a power user of n8n, Make, Lindy, Claude Code, and Relevance.ai — not just theoretically but in built workflows. 102 certifications across AI, UX, and content shows breadth most engineers don't have. The Accenture GenAI Community role was literally community DevRel. UT Austin MSBA gives you technical credibility no self-taught DevRel can fake. Highest salary ceiling of any role on this list.",
    takeIf: "Always apply"
  },
  {
    id: "cstrat",
    title: "Creative Strategist",
    earlyTitle: "Creative Strategy Associate · Brand Strategist",
    midTitle: "Creative Strategist · Senior Creative Strategist",
    fit: "BEST FIT", fc: "mint", rga: 4, fld: 5,
    salary: "$65–90k / $75–150/hr freelance", timeline: "60–90 days",
    daily: [
      "Write creative briefs — tells designers, copywriters, and video teams exactly what to make and why",
      "Develop brand voice guidelines — tone, language, style, what to say and never say",
      "Build content strategy — channels, formats, cadence, audience targeting",
      "Analyze creative performance — which ads and campaigns drove conversions and why",
      "Run A/B tests on headlines, visuals, CTAs, landing pages",
      "Present strategy and findings to leadership or clients",
      "Develop campaign concepts from insight to execution brief"
    ],
    metrics: [
      "Campaign conversion rates — % who see creative and take action",
      "CAC — does your creative lower customer acquisition cost",
      "CPM/CPC on paid campaigns — efficiency of creative spend",
      "Brand engagement rate — likes, comments, shares, saves",
      "Creative test win rate — % of A/B tests that beat the control"
    ],
    rgaText: "Direct on paid side. Better creative = lower CAC = same budget acquires more customers. A 20% improvement at a company spending $500k/month on paid = $100k/month in saved spend. Freelance: you bill for strategy as a deliverable.",
    whyText: "Wedify proposal is a real deliverable — positioning brief, competitor analysis, messaging framework — produced for a client before you had the title. TikTok brand strategy externship produced a brand playbook. VIA Strength #1 is Appreciation of Beauty & Excellence, which is literally the creative director's operating system. Motion Bootcamp trained you for this exact function. Syne/Inter aesthetic choices in this app = the instinct is live.",
    takeIf: "Always apply"
  },
  {
    id: "aicontent",
    title: "AI Content Strategist / AI Educator",
    earlyTitle: "AI Content Writer · Content Creator (AI) · AI Education Specialist",
    midTitle: "AI Content Strategist · Head of AI Education",
    fit: "BEST FIT", fc: "mint", rga: 5, fld: 5,
    salary: "$60–85k in-house / Unlimited creator", timeline: "30–60 days",
    daily: [
      "Write and record content explaining AI tools and workflows for non-technical audiences",
      "Test new AI tools and translate findings into practical guides",
      "Build email courses, mini-courses, and reference guides on AI topics",
      "Create explainer videos on how AI products work",
      "Stay current on AI news and synthesize what it means for regular users",
      "Run workshops for teams or companies on AI adoption",
      "Build curriculum for AI literacy programs"
    ],
    metrics: [
      "Audience growth — email subscribers, YouTube, LinkedIn followers",
      "Content engagement — open rates, click rates, watch time, completion rates",
      "Workshop attendance and satisfaction scores",
      "Revenue from courses, sponsorships, workshops (creator path)",
      "Product adoption metrics (in-house)"
    ],
    rgaText: "Creator path: directly owned. Course sales ($200–2,000/course), sponsorships ($500–5,000/newsletter issue), workshop fees ($500–5,000/session). Early AI educators with 20k+ audiences making $200–500k through multiple streams.",
    whyText: "Your Ikigai statement (March 2026): 'I learn hard things, make them simple and beautiful, then teach them to people who were where I was 6 months ago.' That IS the AI Educator job description. Ghostwriting email courses for media entrepreneurs = proven audience. Accenture GenAI community = you already ran this at scale. Newsletter growth with 30%+ opt-in rates = distribution you own. The creator path here is uncapped.",
    takeIf: "Always build"
  },
  {
    id: "contentmgr",
    title: "Content Marketing Manager",
    earlyTitle: "Content Marketing Coordinator · SEO Content Specialist · Content Writer",
    midTitle: "Content Marketing Manager · Senior Content Strategist",
    fit: "STRONG FIT", fc: "sage", rga: 3, fld: 3,
    salary: "$60–85k", timeline: "30–60 days",
    daily: [
      "Own the editorial calendar — plan what gets published, when, on which channel",
      "Write and edit long-form content (blog posts, guides, case studies, whitepapers)",
      "Do keyword research and manage SEO strategy",
      "Write and send the weekly/monthly email newsletter",
      "Brief and manage freelance writers",
      "Track content performance in analytics",
      "Coordinate with demand gen on campaign content"
    ],
    metrics: [
      "Organic traffic — monthly visitors from search",
      "Keyword rankings — are target keywords moving up in Google",
      "Email list growth and engagement (open rate 25%+, CTR 3%+)",
      "Content-attributed pipeline — deals influenced by a blog post or guide",
      "Backlinks earned from other sites"
    ],
    rgaText: "Indirect but real and trackable. A single high-ranking blog post can generate hundreds of inbound leads per month for years. SEO compounds — content published today drives traffic in 2027.",
    whyText: "HubSpot cert, Surfer SEO cert, PGA writing system, newsletter already running at 30%+ opt-in rates. Ghostwriting email courses for media entrepreneurs is direct proof of long-form editorial output. Use this as a bridge if PMM applications slow — it's the same storytelling muscle, narrower scope.",
    takeIf: "Apply"
  },
  {
    id: "prodedu",
    title: "Customer Education Manager",
    earlyTitle: "Customer Education Specialist · Technical Trainer · Learning Specialist",
    midTitle: "Customer Education Manager · Product Education Lead",
    fit: "GOOD FIT", fc: "sage", rga: 3, fld: 4,
    salary: "$65–90k", timeline: "30–60 days",
    daily: [
      "Build product onboarding flows — guided experience new users get in their first 7 days",
      "Create tutorial videos and help center articles",
      "Design in-app tooltips, walkthroughs, and empty state messaging",
      "Run user research on where people get confused or drop off",
      "Build certification programs for power users",
      "Collaborate with support to identify high-volume questions",
      "Measure feature adoption and optimize educational content to improve it"
    ],
    metrics: [
      "Time-to-first-value — how quickly new users complete first meaningful action",
      "Activation rate — % of new signups who reach the 'aha moment'",
      "Help center deflection rate — % who find answers without opening a support ticket",
      "Feature adoption rate after educational content",
      "Onboarding NPS"
    ],
    rgaText: "Retention. Every 1% improvement in monthly retention compounds. At 1,000 customers × $100/month, reducing churn from 5% to 4% saves $12,000 ARR/month. Better onboarding is the #1 driver of early retention. This role owns that.",
    whyText: "Teaching instinct is real. Ali Abdaal's entire brand is this job applied to content. ENFP + Enneagram 4 loves helping people get better at things.",
    takeIf: "Apply"
  },
  {
    id: "growth",
    title: "Growth Marketing Manager",
    earlyTitle: "Growth Marketing Analyst · Demand Gen Coordinator · Marketing Operations Specialist",
    midTitle: "Growth Marketing Manager · Senior Growth Marketer",
    fit: "STRONG FIT", fc: "sage", rga: 5, fld: 3,
    salary: "$75–110k + bonus", timeline: "60–90 days",
    daily: [
      "Design and run experiments — build hypothesis, set up test, analyze results, document learnings",
      "Manage performance marketing budgets across paid channels (Google, Meta, LinkedIn)",
      "Optimize conversion funnels — landing pages, trial sign-up flows, activation emails",
      "Pull cohort and funnel data from analytics tools (Mixpanel, Amplitude, GA)",
      "Run lifecycle email campaigns (trial → paid conversion sequences)",
      "Work with product team on virality and referral mechanics",
      "Report on experiment results and revenue impact weekly"
    ],
    metrics: [
      "CAC — total cost to acquire one paying customer",
      "LTV:CAC ratio — is each customer worth 3x+ what it cost to acquire them",
      "Activation rate — % of signups who complete key onboarding actions",
      "Trial-to-paid conversion rate",
      "Experiment velocity — tests running per month"
    ],
    rgaText: "Highest revenue link of any marketing role. 'Improved trial-to-paid conversion by 8%' has a calculable ARR impact. 'Reduced CAC by $40' on 500 new customers/month = $240k/year in saved acquisition spend.",
    whyText: "MSBA (data analysis) + creative skills (copy, content) is the rare combo Growth Marketing requires. Most growth marketers are either data-strong or creative-strong. You're both.",
    takeIf: "Apply"
  },
  {
    id: "csm",
    title: "AI Customer Success Manager",
    earlyTitle: "Customer Success Associate · Implementation Specialist · Onboarding Specialist",
    midTitle: "Customer Success Manager · Technical Customer Success Manager",
    fit: "STRONG FIT", fc: "sage", rga: 4, fld: 3,
    salary: "$70–100k + $10–20k variable", timeline: "60–120 days",
    daily: [
      "Onboarding calls with new clients — understand workflows, identify automation opportunities",
      "Build custom AI demos and proof-of-concepts using company tools",
      "Train client teams on how to use AI products effectively",
      "Review client usage data and proactively flag drop-off or underuse",
      "Handle escalations — complex use cases needing custom solutions",
      "Quarterly business reviews — show clients ROI of using the product",
      "Relay client feedback to product team"
    ],
    metrics: [
      "NRR (Net Revenue Retention) — accounts renewing AND growing above 100%",
      "Customer health score — usage, NPS, support tickets, engagement",
      "Time-to-value — how quickly new clients get first win with product",
      "Churn rate — % of accounts lost",
      "Expansion revenue — new ARR from upselling existing clients"
    ],
    rgaText: "Direct. CS owns renewal and expansion revenue. Keeping a $50k/year customer is worth the same as acquiring a new one — but 5–7x cheaper. NRR above 120% means existing customer base grows without any new sales.",
    whyText: "2 years at Accenture was client-facing consulting — onboarding clients, building dashboards, translating data into decisions. That IS the CSM motion. Wayfair AI automation externship means you can actually build n8n/Make workflows in the demo call, not just describe them. CliftonStrengths: Learner + Input means you absorb product knowledge fast. This is also the fastest path to build the Influencing muscle (0/5 Clifton Influencing) without the pressure of a quota.",
    takeIf: "Apply"
  },
  {
    id: "techwriter",
    title: "Technical Writer",
    earlyTitle: "Documentation Specialist · Junior Technical Writer · API Documentation Writer",
    midTitle: "Technical Writer · Senior Technical Writer · Documentation Engineer",
    fit: "DOOR OPENER", fc: "amber", rga: 2, fld: 3,
    salary: "$65–85k", timeline: "30–60 days (easiest entry)",
    daily: [
      "Write and maintain API documentation — every endpoint, parameter, example",
      "Create developer quickstart guides — zero to working demo in 15 minutes",
      "Write release notes and changelogs for every product update",
      "Work with engineers to understand new features before they ship",
      "Test the product yourself to write accurate and honest docs",
      "Maintain the help center and knowledge base"
    ],
    metrics: [
      "Documentation coverage — % of features with complete, accurate docs",
      "Docs search success rate — % of searches that end without a support ticket",
      "Support ticket deflection rate",
      "Documentation freshness — how quickly docs update after a feature ships"
    ],
    rgaText: "Lowest on this list, but real. Good docs accelerate developer adoption. They reduce support costs directly. This is the survival role — take it to get inside a great company, then lateral into PMM or DevRel in 12–18 months.",
    whyText: "Writing is Tier 1 CraftSkill — proposals, educational content, Wedify brief, Prescene.ai work all prove it. If you land this at Anthropic, OpenAI, or a top-tier AI company, you lateral into DevRel or PMM in 12 months from inside the building. The company matters more than the role here.",
    takeIf: "Inside a great company only"
  },
  {
    id: "fractional",
    title: "Fractional Creative Strategist",
    earlyTitle: "Freelance Content Strategist · Brand Consultant",
    midTitle: "Fractional CMO · Fractional Creative Director · Brand Strategy Consultant",
    fit: "START NOW", fc: "mint", rga: 5, fld: 5,
    salary: "$50–150/hr or $1,500–5,000/mo retainer", timeline: "This week",
    daily: [
      "Discovery calls with clients — understand positioning, audience, competitors",
      "Write brand voice and messaging guidelines",
      "Build content strategy documents and editorial systems",
      "Review and give feedback on content output",
      "Create content calendars, brief templates, and workflows",
      "Present strategy recommendations",
      "Build GTM narratives for launches"
    ],
    metrics: [
      "MRR (Monthly Recurring Revenue from retainers)",
      "Number of active clients (target: 2–4)",
      "Effective hourly rate (target: $100+/hr)",
      "Client retention — are they renewing month to month",
      "Referral rate — are clients sending you new clients"
    ],
    rgaText: "YOU ARE THE REVENUE. No employer takes a cut. No 18-month vesting cliff. Wedify is already client #1 — that proposal happened before you called yourself a strategist. Two clients = $3,000–10,000/month. Runs in parallel to your job search and feeds directly into Odyssey Pathway 3.",
    whyText: "Wedify is direct proof this is already happening — you wrote that brand strategy proposal without a title or a retainer. You have the Notion consulting skill (documented CraftSkill). You have the AI automation skill (n8n, Make, Lindy, Relevance.ai). You have the framework creation skill (Vetting Scorecard, Weekly OS, role targeting matrix). Start this week. The proposal skill alone is worth $1,500–$3,000/client.",
    takeIf: "Start this week"
  }
];

// ─── DAY IN THE LIFE SCENARIOS ────────────────────────────────────────────────
// Real company, real Tuesday. Concrete so you can feel the role, not just label it.

const SCENARIOS = {
  pmm: {
    company: "Notion",
    context: "You're PMM for Notion's AI features team. Q2 launch is 6 weeks out. The product team shipped two new AI features. Nobody outside engineering understands what they do yet. That's your job.",
    rows: [
      { do: "Interview 5 customers about how they use Notion AI today", create: "3-page customer insight doc — themes, verbatim quotes, what's confusing", track: "Feature adoption rate (% of users activating AI features)", skill: "Deep research & synthesis" },
      { do: "Write the positioning and messaging doc for the Q2 AI launch", create: "Messaging framework: who it's for, what it does, why it matters, what it's not", track: "Launch signups + trial-to-paid conversion in first 30 days", skill: "Translating complexity → clarity + Writing" },
      { do: "Build a competitive battlecard comparing Notion AI vs. Coda and Confluence", create: "1-page battlecard used by 40 salespeople in every competitive deal", track: "Win rate on competitive deals (target: up 5–10%)", skill: "Competitive analysis + Framework creation" },
      { do: "Write the feature announcement email to 5M users", create: "Feature email (400 words) — subject line, hook, benefit, CTA", track: "Email open rate, click rate, AI feature activation rate in 7 days", skill: "Writing + Curation & taste" },
      { do: "Brief the sales team on the new features before they ship", create: "Sales enablement one-pager: what changed, what to say, top 3 objections + answers", track: "Sales team confidence score (survey), deal cycle length", skill: "Translating complexity → clarity" },
    ]
  },
  devrel: {
    company: "Vercel",
    context: "You're Developer Advocate at Vercel. Your job is to make developers successful with AI-powered deployment. 500k developers on the platform. You own the top of the funnel through content, demos, and community.",
    rows: [
      { do: "Record a 12-min YouTube tutorial on deploying a Next.js AI app on Vercel", create: "YouTube tutorial video + companion blog post with code snippets", track: "Video views, developer signups attributed to the video (UTM tracked)", skill: "Video editing + Translating complexity → clarity" },
      { do: "Build a demo app: Vercel + Claude API integration with streaming responses", create: "Public GitHub repo with README + 3-min Loom walkthrough", track: "GitHub stars, clone count, API key signups from demo landing page", skill: "AI tooling + Systems architecture" },
      { do: "Run the weekly Discord AMA with 20k developers (60 min, live Q&A)", create: "Community thread log + FAQ doc updated with top 10 new questions", track: "Community health score, support ticket deflection rate (fewer help desk tickets)", skill: "Translating complexity → clarity + Deep research" },
      { do: "Write a technical blog post: 'AI-powered CI/CD — what changes with LLMs in your pipeline'", create: "1,800-word blog post, SEO-optimized, with 3 code examples", track: "Organic traffic, time on page, developer API trial starts from that post", skill: "Writing + Deep research & synthesis" },
      { do: "Present at the SF AI Developer Meetup (80 engineers, 25 min talk + demo)", create: "Conference slide deck + live code demo + GitHub link shared with audience", track: "Developer NPS from talk, new Discord members from event", skill: "Translating complexity → clarity + Framework creation" },
    ]
  },
  cstrat: {
    company: "Figma",
    context: "You're Creative Strategist at Figma. Your job is to make complex design concepts feel obvious to non-designers — and to turn Figma's product truth into campaigns that actually land. Config 2026 is coming up.",
    rows: [
      { do: "Write the creative brief for the Config 2026 conference campaign", create: "3-page creative brief: insight, strategy, message, tone, what success looks like", track: "Creative brief approval rate (round 1 vs. round 2 approvals)", skill: "Framework creation + Writing" },
      { do: "Audit Figma's messaging vs. Adobe XD and Framer (quarterly competitive review)", create: "Competitive messaging teardown: what each brand claims, where Figma is unclear or weak", track: "Brand differentiation score (tracked via brand tracker survey quarterly)", skill: "Competitive analysis + Curation & taste" },
      { do: "Build the brand voice guide for Figma's AI features (new tone needed)", create: "Brand voice doc: tone principles, word choices, 20 before/after examples, what NOT to say", track: "Brand consistency score across web copy, ads, and social (content audit monthly)", skill: "Writing + Translating complexity → clarity" },
      { do: "Write 3 landing page headline variations for FigJam AI launch + A/B test plan", create: "3 headline options with rationale + A/B test setup in Optimizely", track: "Landing page CVR (visit → free trial start), CTR on each headline variant", skill: "Writing + Curation & taste" },
      { do: "Present the Q2 brand campaign concept to the CMO and Head of Design", create: "10-slide campaign concept deck: insight, idea, executions, metrics, budget ask", track: "Executive approval and budget greenlit — 1 revision vs. 3", skill: "Translating complexity → clarity + Framework creation" },
    ]
  },
  aicontent: {
    company: "Jasper",
    context: "You're AI Content Strategist at Jasper. Your job: turn AI capability into content that non-technical marketers actually understand and use. You own the newsletter, YouTube, and the 'learn AI' content pillar.",
    rows: [
      { do: "Write and send the Tuesday newsletter to 80k subscribers on AI marketing trends", create: "Newsletter issue (750 words): 1 insight, 1 tool, 1 workflow, 1 prompt to steal", track: "Open rate (target 40%+), click rate (target 5%+), list growth week-over-week", skill: "Writing + Curation & taste + Deep research" },
      { do: "Record Episode 4 of the 'AI Workflow Series' — how to build a content repurposing system", create: "15-min YouTube video + script + short-form clip for LinkedIn and TikTok", track: "Video watch time (%), subscriber growth, click-through to Jasper signup", skill: "Video editing + AI tooling + Translating complexity → clarity" },
      { do: "Build an internal n8n workflow that turns one long-form blog post into 8 distribution formats", create: "Live n8n automation + SOP doc so the content team can run it themselves", track: "Content output velocity (posts per week before vs. after automation)", skill: "Systems architecture + AI tooling" },
      { do: "Write the SEO guide: 'Jasper vs. Claude vs. ChatGPT for marketing teams'", create: "2,500-word comparison guide, optimized for 'AI writing tools for marketing' keywords", track: "Organic traffic to the page (monthly), newsletter signups attributed to that guide", skill: "Deep research + Competitive analysis + Writing" },
      { do: "Run a 90-min 'AI for Marketers' workshop for a client's 25-person team", create: "Workshop slide deck + Notion resource pack + post-workshop follow-up email", track: "Workshop NPS, tool adoption 30 days post-workshop (% of attendees using Jasper)", skill: "Translating complexity → clarity + Systems architecture + Teaching" },
    ]
  },
  contentmgr: {
    company: "Superhuman",
    context: "You're Content Marketing Manager at Superhuman. 150k newsletter subscribers. The blog drives 30% of new signups. Your job: make email the most interesting category on the internet.",
    rows: [
      { do: "Write and send the Tuesday 'Productivity Research' newsletter to 150k subscribers", create: "Newsletter issue (700 words): research insight + practical takeaway + one unconventional tip", track: "Open rate (target 48%+), CTR, unsubscribe rate (flag anything above 0.3%)", skill: "Writing + Deep research & synthesis + Curation & taste" },
      { do: "Brief 3 freelance writers on Q2 customer case studies (Vercel, Linear, Figma use cases)", create: "3 content briefs: context, interview questions, structure, angle, word count, deadline", track: "Case study completion on time, case study attributed pipeline (tracked in HubSpot)", skill: "Framework creation + Writing" },
      { do: "Do keyword research for 'email productivity' topic cluster (targeting 3 new pages)", create: "Keyword opportunity spreadsheet: 15 terms, search volume, difficulty, content type needed", track: "Target keyword rankings 90 days post-publish (Google SERP position 1–10)", skill: "Deep research + Systems architecture" },
      { do: "Write the long-form guide: 'The Science of Inbox Zero' (flagship SEO piece)", create: "2,800-word guide with 3 original frameworks, 7 expert citations, 4 CTAs to Superhuman trial", track: "Organic traffic (monthly), backlinks earned, trial starts from guide", skill: "Writing + Deep research + Framework creation" },
      { do: "Review and edit all content before it publishes (5 pieces in queue this week)", create: "Annotated edits with written rationale — not just fixes, but the 'why' for each change", track: "Post-publish engagement rates vs. team average, revision round count (target: 1 round)", skill: "Curation & taste + Writing" },
    ]
  },
  prodedu: {
    company: "Intercom",
    context: "You're Customer Education Manager at Intercom. Fin AI just launched — 2,000 new customers in 30 days. Most of them don't understand what Fin can do. Your job: turn confusion into activation.",
    rows: [
      { do: "Record the 'Getting Started with Fin AI' video tutorial series (5 videos, 5–8 min each)", create: "5 tutorial videos in the help center + transcripts + chapter markers", track: "Support ticket deflection rate: % of customers who watch video instead of opening ticket", skill: "Video editing + Translating complexity → clarity" },
      { do: "Write the 7-email onboarding sequence (first 14 days after signup)", create: "7-email drip sequence in Intercom: one per 2 days, each teaching one Fin behavior", track: "Activation rate (% reaching 'first successful resolution' within 14 days)", skill: "Writing + Framework creation + Systems architecture" },
      { do: "Build the 'Fin AI Certification' course (4 modules, 45 min total)", create: "4-module course with video lessons, knowledge checks, and final assessment in Intercom Academy", track: "Course completion rate (target 60%+), feature adoption among certified users vs. non-certified", skill: "Translating complexity → clarity + Framework creation + Video editing" },
      { do: "Run user research: 5 interviews with customers who churned in month 1", create: "Research synthesis doc: 3 friction patterns, top quotes, 5 product recommendations", track: "Activation rate improvement QoQ — does removing friction move the number", skill: "Deep research & synthesis" },
      { do: "Write 15 help center articles for Q3 Fin AI features launch (1 week before ship)", create: "15 help articles: what it does, how to set it up, troubleshooting, FAQs", track: "Search success rate in help center (% who find answer without opening ticket)", skill: "Writing + Translating complexity → clarity" },
    ]
  },
  growth: {
    company: "Linear",
    context: "You're Growth Marketing Manager at Linear. The product is beloved by engineers. The problem: most engineering teams don't know it exists. Your job: fix that with experiments, not feelings.",
    rows: [
      { do: "Design and run an A/B test on the free trial signup flow (3 headline variations)", create: "A/B test setup in Optimizely + results report with statistical significance and recommendation", track: "Trial signup conversion rate (visit → trial start), statistical significance threshold (95%)", skill: "Deep research + Framework creation" },
      { do: "Write and launch a 5-email trial-to-paid conversion sequence in HubSpot", create: "5-email nurture sequence: onboarding tip → use case → social proof → urgency → offer", track: "Trial-to-paid conversion rate per email variant, email-attributed ARR", skill: "Writing + Systems architecture" },
      { do: "Pull the activation funnel with SQL — where do trial users drop off?", create: "Funnel analysis doc: step-by-step drop-off rates + 3 highest-leverage improvement bets", track: "Activation rate by step (target: move the lowest-converting step up 5%+)", skill: "SQL + Deep research & synthesis" },
      { do: "Design the referral program mechanics and write the invite copy", create: "Referral program brief (mechanics, incentive structure, landing page) + all copy written", track: "Referral rate (% of active users who invite someone), CAC from referral vs. paid channel", skill: "Framework creation + Writing" },
      { do: "Present weekly experiment results to growth team (Mon standup, 20 min)", create: "1-page experiment report: hypothesis → test → result → learning → next bet", track: "Experiment velocity (tests per month), % of tests with statistically significant results", skill: "Translating complexity → clarity + Deep research & synthesis" },
    ]
  },
  csm: {
    company: "Make.com",
    context: "You're AI Customer Success Manager at Make.com (automation platform). Your book is 20 mid-market accounts, $1.2M ARR. Your job: make sure every client builds something real in month 1 and renews.",
    rows: [
      { do: "Run a 60-min discovery onboarding call with a new enterprise client (Acme Corp, $60k ARR)", create: "Onboarding plan doc: their top 3 processes, automation use case map, 30-day success milestones", track: "Time-to-first-workflow (target: client runs first live automation within 14 days)", skill: "Translating complexity → clarity + Deep research" },
      { do: "Build a live n8n demo showing Acme Corp's manual lead enrichment process automated", create: "Live n8n workflow + 3-min Loom walkthrough showing exactly what it does", track: "Demo-to-activation rate (did they replicate it within 7 days?)", skill: "AI tooling + Systems architecture" },
      { do: "Review 5 clients' usage dashboards — flag anyone under 40% feature utilization", create: "Proactive health email per at-risk client: 'Here's what you're not using + here's why it matters'", track: "Feature adoption rate per account, expansion revenue from upsell", skill: "Deep research & synthesis + Translating complexity → clarity" },
      { do: "Train a 10-person marketing team at a client on Make's AI automation stack", create: "45-min live training + Notion SOP doc with screenshots + post-training Q&A recording", track: "Team activation rate: % of trainees with active workflows within 30 days", skill: "Translating complexity → clarity + Systems architecture" },
      { do: "Run the Q2 Quarterly Business Review for a $50k ARR client (renewal coming up)", create: "QBR deck (10 slides): workflows built, hours saved, ROI calculated, next 6 months plan", track: "NRR (did they renew + expand?), renewal lead time (how many days before expiry)", skill: "Data visualization + Translating complexity → clarity + Framework creation" },
    ]
  },
  techwriter: {
    company: "Anthropic",
    context: "You're Technical Writer at Anthropic. You own the Claude API docs. Every developer using Claude starts here. If your docs are bad, they give up. If they're good, they build something real.",
    rows: [
      { do: "Write the Claude API quickstart guide (target: zero to first API call in under 15 minutes)", create: "Quickstart guide: setup, first call, first real use case — with code in Python, Node, curl", track: "Time-to-first-API-call (median minutes for new developers), completion rate of quickstart", skill: "Writing + Translating complexity → clarity" },
      { do: "Document the new tool use feature with engineers before it ships publicly", create: "Tool use reference doc: what it is, how it works, every parameter, 5 worked examples", track: "Documentation coverage score (% of features with complete docs before launch)", skill: "Deep research & synthesis + Writing" },
      { do: "Test the API yourself to find gaps — run every code example in the docs", create: "Annotated testing log: what broke, what was confusing, 12 corrections needed", track: "Documentation accuracy rate (% of code examples that run on first try)", skill: "Deep research + Systems architecture" },
      { do: "Build the 'Common Use Cases' library — 12 patterns developers actually want to build", create: "12 use case guides: summarization, classification, RAG, tool use, vision, agents, etc.", track: "Developer activation rate (% completing first meaningful Claude integration)", skill: "Framework creation + Translating complexity → clarity" },
      { do: "Write the release notes for the latest Claude model update", create: "Release notes (400–600 words): what changed, what's new, what developers need to update", track: "Developer community reaction (Discord + Twitter), support volume change post-release", skill: "Writing + Curation & taste" },
    ]
  },
  aiengineer: {
    company: "Intercom",
    context: "You're an AI Engineer on the Fin AI product team at Intercom — the team that built their AI support agent handling millions of conversations. Your job is building prompts, evaluation systems, and AI feature integrations, not backend infrastructure.",
    rows: [
      { do: "Redesign the system prompt for Fin's escalation decision — when does the agent hand off to human support?", create: "New escalation prompt (versioned), evaluation rubric with 20 test cases, before/after comparison doc", track: "Escalation accuracy rate — % of handoffs that were actually needed vs. false triggers", skill: "Translating complexity → clarity + Framework creation" },
      { do: "Build an eval suite that tests Fin's tone against Intercom's brand voice across 50 conversation scenarios", create: "Eval dataset (50 prompts + expected outputs), Python eval script, scorecard for brand alignment", track: "Brand consistency score across conversation types (tone, language, accuracy)", skill: "Deep research & synthesis + Systems architecture" },
      { do: "Design the RAG retrieval strategy for the help center — how does Fin know which docs to pull?", create: "RAG architecture doc, retrieval tuning experiments, chunking strategy recommendation", track: "Retrieval precision: % of answers citing the correct help article", skill: "Systems architecture + Deep research" },
      { do: "Write the AI feature brief for 'Proactive Conversations' — AI messages users before they have a problem", create: "Feature brief: trigger logic, prompt design, fallback rules, success metrics, guardrails", track: "Proactive message open rate + CSAT for proactively-helped users vs. control", skill: "Framework creation + Translating complexity → clarity" },
      { do: "Run a prompt optimization sprint — A/B test 3 tone variants on Fin's opening message across 10,000 conversations", create: "Experiment design doc, 3 prompt variants, results analysis with statistical significance test", track: "CSAT improvement + resolution rate on variant vs. control", skill: "Deep research + Writing" },
    ]
  },
  agenticai: {
    company: "Zapier",
    context: "You're an Agentic AI Engineer at Zapier, working on their AI-native automation platform. You design and build multi-step AI agents that automate complex business workflows for 2M+ users — not the Zaps, the agents that orchestrate them.",
    rows: [
      { do: "Design the agent architecture for a 'Meeting Follow-Up Agent' — reads calendar, pulls notes, drafts follow-up emails", create: "Agent spec: trigger conditions, tool list (Calendar API, Docs, Gmail), decision logic, failure modes, evaluation criteria", track: "Task completion rate + user edits per output (lower = better)", skill: "Systems architecture + Framework creation" },
      { do: "Build and test the tool integration layer — the agent needs to call 6 external APIs reliably", create: "Tool definition schema for each API, error handling logic, retry strategy, integration tests", track: "Tool call success rate, error rate per integration, mean time to recover on failure", skill: "Systems architecture + Deep research" },
      { do: "Write the evaluation framework for agent reliability — how do you know the agent is doing the right thing?", create: "Eval rubric: correctness, completeness, format compliance, safety. 40 test cases with expected outputs.", track: "Agent reliability score (% runs passing all eval criteria)", skill: "Framework creation + Deep research + Translating complexity" },
      { do: "Run a red-teaming session — try to break the agent with edge cases, adversarial inputs, and ambiguous tasks", create: "Red team report: 15 edge cases found, severity ranking, recommended guardrails, 3 prompt patches", track: "Edge case coverage, guardrail trigger rate", skill: "Deep research & synthesis + Framework creation" },
      { do: "Write the internal playbook for building new Zapier agents — patterns, anti-patterns, and architectural decisions", create: "Agent playbook (Notion): architecture patterns, prompt templates, evaluation standards, launch checklist", track: "Agent team adoption — do other engineers use the playbook?", skill: "Writing + Translating complexity → clarity + Systems architecture" },
    ]
  },
  fractional: {
    company: "Your own client (Series A SaaS startup)",
    context: "You're Fractional Creative Strategist. Your client is a Series A B2B AI startup with $4M raised, 12 employees, and a messaging problem — nobody understands what they do. 3-month retainer, $3,500/mo.",
    rows: [
      { do: "Run a 90-min discovery session with the founder to understand the product, audience, and positioning hypothesis", create: "Discovery notes + ICP definition draft + 5 positioning hypotheses to test", track: "Client brief approved in round 1 (signal you understood the problem correctly)", skill: "Deep research & synthesis + Translating complexity → clarity" },
      { do: "Write the brand voice and messaging guide for their AI product", create: "Brand voice doc: tone principles, 3 voice attributes, 20 before/after copy examples, words to avoid", track: "Client adoption rate of voice doc — is it actually used in website copy and sales decks?", skill: "Writing + Framework creation + Curation & taste" },
      { do: "Audit their current website, LinkedIn, and pitch deck for positioning gaps", create: "Content audit: 3 main gaps identified, competitive positioning comparison, recommended priority order", track: "Conversion rate on updated homepage messaging vs. previous (A/B test if possible)", skill: "Competitive analysis + Deep research" },
      { do: "Build the 90-day content calendar with 3 pillar topics and brief templates", create: "Content calendar (Notion) + 3 editorial brief templates + content workflow SOP", track: "Content consistency: posts per week, % that match brand voice, engagement rate", skill: "Systems architecture + Framework creation" },
      { do: "Present the full strategy to the founding team (founder + CTO + Head of Sales)", create: "15-slide strategy deck: positioning, ICP, messaging, content plan, 90-day roadmap, success metrics", track: "Retainer renewal (did they sign month 2?) — that's the only metric that matters", skill: "Translating complexity → clarity + Writing + Framework creation" },
    ]
  },
  fde: {
    company: "Anthropic",
    context: "You're a Forward Deployed Engineer at Anthropic's enterprise team. A Fortune 500 insurance company is piloting Claude for document review and claims summarization. You own the technical implementation end-to-end.",
    rows: [
      { do: "Run 3-hour discovery session with the client's CTO, IT lead, and claims ops head — map their document workflow, data systems, and compliance constraints", create: "Discovery report: current-state workflow diagram, 5 integration requirements, 2 compliance blockers identified, recommended POC scope", track: "Discovery sign-off: did both sides agree on POC scope before any code is written?", skill: "Deep research + Translating complexity → clarity + Framework creation" },
      { do: "Build the proof-of-concept — Claude integration that ingests claim PDFs, extracts structured data, and outputs a claims summary in the client's required format", create: "Working POC: Python script + API integration + output template with 3 sample claims processed accurately", track: "POC accuracy rate — % of test claims where Claude's summary matched the adjuster's manual summary", skill: "AI automation + Systems architecture + AI tooling (n8n, Claude API)" },
      { do: "Present POC results to client stakeholder group — 8 people including VP of Operations and Head of Compliance", create: "30-min presentation deck + live demo of the working POC + risk/mitigation log for the compliance team", track: "Stakeholder approval to proceed to Phase 2 (live environment access granted)", skill: "Translating complexity → clarity + Writing + Deep research" },
      { do: "Write the technical integration spec for the production deployment — how Claude connects to their claims management system", create: "Integration architecture doc: API authentication, data flow diagram, error handling protocol, compliance data handling policy", track: "Internal review approval from Anthropic's legal + client's IT sign-off on architecture", skill: "Framework creation + Systems architecture + Deep research" },
      { do: "Run first live deployment — production claims flowing through Claude with monitoring, logging, and human-review checkpoints active", create: "Deployment runbook + monitoring dashboard + week-1 summary report: volume processed, accuracy rate, edge cases found", track: "Client NPS at Day 14 post-deployment — are adjusters saving time and trusting the output?", skill: "AI automation + Systems architecture + Translating complexity → clarity" },
    ]
  },
  soleng: {
    company: "Intercom",
    context: "You're a Solutions Engineer at Intercom supporting their AI customer support product. You cover mid-market and enterprise accounts. Your AE has three deals in late stage this week — your job is to close the technical gap that's holding each one.",
    rows: [
      { do: "Run technical discovery call with the VP of Customer Success and IT lead at a Series B fintech company — understand their current support stack and AI readiness", create: "Discovery notes: current tool stack, 4 integration requirements, top 3 objections heard, recommended demo flow", track: "Discovery → Demo conversion: did they agree to a tailored demo based on this call?", skill: "Deep research + Translating complexity → clarity + Competitive analysis" },
      { do: "Build a custom demo environment showing Fin AI handling fintech-specific support scenarios — account balance questions, transaction disputes, card blocks", create: "Custom demo: live environment with 10 fintech-specific training examples, brand-matched conversation style, escalation triggers configured", track: "Demo engagement score — did the VP ask to see it again? Did they bring in a 3rd stakeholder?", skill: "AI automation + Framework creation + Writing (demo scripts)" },
      { do: "Answer the security and compliance questions from their IT team — SSO, data residency, encryption, GDPR, audit logs", create: "Technical security FAQ (8 questions answered specifically for fintech compliance), shared with client and internal legal for review", track: "Time to answer: < 24 hours. Trust signal: did IT team go quiet after, or escalate more questions?", skill: "Deep research + Framework creation + Translating complexity → clarity" },
      { do: "Run POC with 200 real support tickets — Fin AI handles them in sandbox, human reviews output, flags issues, grades accuracy", create: "POC results report: resolution rate, CSAT prediction, time saved vs. human agents, 3 edge case examples with proposed fixes", track: "POC pass criteria: ≥ 80% accurate resolution rate and client stakeholder sign-off on results", skill: "AI tooling + Data storytelling + Deep research" },
      { do: "Prep and deliver the final executive presentation — business case, ROI model, implementation timeline, contract scope", create: "Exec deck (15 slides): ROI model with client's actual ticket volume, implementation roadmap, comparison vs. current tool, pricing tier recommendation", track: "Deal closed-won. That's the metric. The SE's job ends when legal sends the contract.", skill: "Translating complexity → clarity + Writing + Framework creation" },
    ]
  },
};

// type: "deep" = focused output | "meet" = call/sync | "review" = editing/reviewing | "admin" = Slack/planning
const SCHED_COLORS = {
  deep:   { bg: "var(--mint-bg)",   bd: "var(--mint-bd)",   label: "Deep Work",  dot: "var(--mint)" },
  meet:   { bg: "var(--amber-bg)",  bd: "var(--amber-bd)",  label: "Meeting",    dot: "var(--amber)" },
  review: { bg: "var(--slate-bg)",  bd: "rgba(58,94,138,0.2)", label: "Review",  dot: "var(--slate)" },
  admin:  { bg: "var(--surface2)",  bd: "var(--border)",    label: "Admin",      dot: "var(--muted)" },
};

const SCHED = {
  pmm: [
    { time: "9:00–9:30",   type: "admin",  activity: "Slack sweep + overnight product updates + check launch metrics dashboard" },
    { time: "9:30–11:00",  type: "meet",   activity: "Customer interview × 1 (video call, 45 min) + 15 min synthesis notes while it's fresh" },
    { time: "11:00–12:30", type: "deep",   activity: "Write / advance the positioning doc or messaging framework — biggest creative block, morning brain" },
    { time: "12:30–1:30",  type: "admin",  activity: "Lunch. Actually step away." },
    { time: "1:30–2:30",   type: "meet",   activity: "Cross-functional sync — product, design, PMM weekly alignment (what shipped, what's blocked, what's next)" },
    { time: "2:30–4:00",   type: "deep",   activity: "Competitive battlecard update or sales enablement one-pager — output that ships to sales this week" },
    { time: "4:00–4:30",   type: "review", activity: "Review content from copywriter or designer working on launch materials — give structured feedback" },
    { time: "4:30–5:00",   type: "admin",  activity: "Update project tracker, prep tomorrow's customer interview questions, clear Slack" },
  ],
  devrel: [
    { time: "9:00–9:30",   type: "admin",  activity: "Community check — Discord overnight threads, GitHub issues, Twitter mentions, open support tickets" },
    { time: "9:30–11:30",  type: "deep",   activity: "Tutorial recording session OR long-form blog post draft — uninterrupted, camera/mic on, do not disturb" },
    { time: "11:30–12:00", type: "meet",   activity: "Respond to 10 priority Discord questions — public, so answers serve 1,000 developers who have the same question" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:00",   type: "meet",   activity: "Weekly DevRel sync — what's shipping in 2 weeks, content calendar review, demo planning for upcoming conference" },
    { time: "2:00–4:30",   type: "deep",   activity: "Build demo app or write technical guide — this is the deliverable that drives developer signups" },
    { time: "4:30–5:00",   type: "admin",  activity: "Community metrics review, update content calendar, reply to DMs from developers building with the API" },
  ],
  cstrat: [
    { time: "9:00–9:30",   type: "admin",  activity: "Check campaign performance data + overnight A/B test results + Slack" },
    { time: "9:30–11:00",  type: "deep",   activity: "Write creative brief or brand voice doc — needs strategic clarity before any designer touches it" },
    { time: "11:00–12:00", type: "meet",   activity: "Campaign review with design team — does the work match the brief? Give specific direction, not vague feedback" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:30",   type: "deep",   activity: "Competitive messaging audit — pull latest from 3 competitors, update positioning map" },
    { time: "2:30–3:30",   type: "meet",   activity: "Strategy presentation to CMO or client — present, take notes, capture decisions" },
    { time: "3:30–5:00",   type: "deep",   activity: "Write copy variations for landing page or ad creative — 3 angles minimum, brief rationale on each" },
  ],
  aicontent: [
    { time: "9:00–9:30",   type: "admin",  activity: "Check yesterday's newsletter metrics — open rate, CTR, replies. Flag what worked and why." },
    { time: "9:30–11:30",  type: "deep",   activity: "Write this week's newsletter issue OR film/edit a video — single output, deep focus" },
    { time: "11:30–12:00", type: "admin",  activity: "Curate: scan AI news, find the 3 best things worth sharing this week, save with context notes" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:00",   type: "meet",   activity: "Content strategy review with the team — editorial calendar, upcoming campaigns, what needs changing" },
    { time: "2:00–4:00",   type: "deep",   activity: "Build the n8n automation workflow OR write the SEO comparison guide — one major deliverable per afternoon" },
    { time: "4:00–5:00",   type: "meet",   activity: "Workshop prep for next client session, or live audience Q&A on LinkedIn/Substack Notes" },
  ],
  contentmgr: [
    { time: "9:00–9:30",   type: "admin",  activity: "Email metrics + SEO rank tracker + keyword position changes since Monday" },
    { time: "9:30–11:30",  type: "deep",   activity: "Write the newsletter issue or advance the flagship SEO guide — 2 hours uninterrupted" },
    { time: "11:30–12:00", type: "review", activity: "Async brief check-in with 2 freelancers — review outlines, leave comments, unblock them" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:00",   type: "deep",   activity: "Keyword research session for next pillar or analytics deep-dive: which pieces are driving pipeline" },
    { time: "2:00–4:00",   type: "deep",   activity: "Edit freelancer submissions OR write secondary content (social, email campaign) for the week" },
    { time: "4:00–5:00",   type: "review", activity: "Final review pass before anything publishes — every piece needs one last read before going live" },
  ],
  prodedu: [
    { time: "9:00–9:30",   type: "admin",  activity: "Help center analytics — top 10 failed searches, support ticket themes from yesterday, activation rate delta" },
    { time: "9:30–11:30",  type: "deep",   activity: "Record tutorial video OR write onboarding email sequence — whichever unblocks the most users" },
    { time: "11:30–12:00", type: "meet",   activity: "Weekly sync with support team — what questions keep coming in? These become next week's help articles." },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:00",   type: "meet",   activity: "User research interview (60 min) — churned customer, or power user for certification course design" },
    { time: "2:00–4:00",   type: "deep",   activity: "Build course module OR write the batch of help articles queued for next feature launch" },
    { time: "4:00–5:00",   type: "admin",  activity: "Review activation metrics — which cohort's onboarding broke down this week? Flag to product." },
  ],
  growth: [
    { time: "9:00–9:30",   type: "admin",  activity: "Review A/B test dashboard — any tests hit significance overnight? Pull Mixpanel activation funnel." },
    { time: "9:30–10:00",  type: "meet",   activity: "Weekly growth standup — present last week's test results, state this week's active experiments" },
    { time: "10:00–12:00", type: "deep",   activity: "SQL funnel analysis OR design the next experiment — hypothesis, test setup, success criteria" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:30",   type: "deep",   activity: "Write trial-to-paid email sequence OR landing page copy variants — the test needs copy before it can run" },
    { time: "2:30–3:30",   type: "meet",   activity: "QA test implementation with engineering — make sure the variant is set up exactly as designed" },
    { time: "3:30–5:00",   type: "deep",   activity: "Experiment design doc for next sprint OR performance report (weekly numbers, insight, next bet)" },
  ],
  csm: [
    { time: "9:00–9:30",   type: "admin",  activity: "Client health dashboard — flag any account below 40% feature usage or with open support tickets" },
    { time: "9:30–11:00",  type: "meet",   activity: "Client onboarding call (60 min) — discovery, automation use case mapping, set 30-day success milestones" },
    { time: "11:00–12:00", type: "deep",   activity: "Build the n8n demo for Acme Corp — live workflow showing exactly what automation solves for their team" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:00",   type: "meet",   activity: "Training session — live workshop with client's 10-person marketing team on Make's AI stack" },
    { time: "2:00–3:30",   type: "deep",   activity: "QBR deck prep for renewal client OR proactive health emails to 3 at-risk accounts" },
    { time: "3:30–5:00",   type: "meet",   activity: "Internal sync with product team — relay 5 client feature requests, flag 2 critical gaps affecting renewals" },
  ],
  techwriter: [
    { time: "9:00–9:30",   type: "admin",  activity: "Developer Discord + GitHub issues — what doc questions came in overnight? Add to the fix queue." },
    { time: "9:30–11:30",  type: "deep",   activity: "Write documentation — quickstart guide, API reference, or use case library. First draft, don't edit yet." },
    { time: "11:30–12:00", type: "meet",   activity: "Sync with engineering on new feature shipping in 2 weeks — get the spec, ask the dumb questions now so developers don't have to" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–3:00",   type: "deep",   activity: "Test every code example in the docs against the live API — if it doesn't run, it doesn't ship" },
    { time: "3:00–4:00",   type: "review", activity: "Review and edit colleague's draft documentation — clarity pass, accuracy check, example verification" },
    { time: "4:00–5:00",   type: "admin",  activity: "Update changelog, fix doc tickets from the queue, update content calendar for next sprint" },
  ],
  fractional: [
    { time: "9:00–9:30",   type: "admin",  activity: "Review async feedback from 2 clients — Slack messages, Notion comments, email. Triage by urgency." },
    { time: "9:30–11:00",  type: "deep",   activity: "Write the brand voice doc or positioning framework for Client A — deep work, no calls during this block" },
    { time: "11:00–12:00", type: "meet",   activity: "Client B strategy call (60 min) — discovery or strategy presentation, depends on project phase" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch + walk. You're self-employed — protect this." },
    { time: "1:00–3:00",   type: "deep",   activity: "Content audit, competitive research, or deck building for Client A — the deliverable due this week" },
    { time: "3:00–4:00",   type: "meet",   activity: "Dream 100 networking: 2 warm-up comments on LinkedIn, 1 value-first outreach message to a new prospect" },
    { time: "4:00–5:00",   type: "admin",  activity: "Prep next client deliverable, update Notion project tracker, send weekly progress update to both clients" },
  ],
  aiengineer: [
    { time: "9:00–9:30",   type: "admin",  activity: "Review AI incident queue — did any prompts degrade overnight? Check eval dashboards and Slack threads." },
    { time: "9:30–11:30",  type: "deep",   activity: "Prompt engineering sprint — write, test, and iterate on the target prompt. Run against eval suite after each change." },
    { time: "11:30–12:00", type: "meet",   activity: "Product sync — AI engineer briefs PM and design on what the LLM can and can't do for the proposed feature" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–2:30",   type: "deep",   activity: "Build the evaluation dataset — write test cases, label expected outputs, run batch evals against the new prompt" },
    { time: "2:30–3:30",   type: "meet",   activity: "Cross-team AI review — safety, legal, and product review AI output samples before feature ships" },
    { time: "3:30–4:30",   type: "review", activity: "Review AI feature documentation draft — accuracy check, examples test, clarity edit" },
    { time: "4:30–5:00",   type: "admin",  activity: "Update prompt versioning log, write experiment summary, prep questions for tomorrow's model behavior deep-dive" },
  ],
  agenticai: [
    { time: "9:00–9:30",   type: "admin",  activity: "Check agent run logs — any failures, unexpected outputs, or cost spikes from overnight batch runs?" },
    { time: "9:30–11:30",  type: "deep",   activity: "Build the new tool integration — write the tool schema, implement the call, handle edge cases and errors" },
    { time: "11:30–12:00", type: "meet",   activity: "Agent design review — walk the team through the architecture for the new workflow agent before building" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch" },
    { time: "1:00–3:00",   type: "deep",   activity: "Red-team the agent — run adversarial prompts, edge cases, ambiguous tasks. Document what breaks and why." },
    { time: "3:00–4:00",   type: "meet",   activity: "Eval review with PM — walk through agent reliability scores, false positive/negative patterns, launch readiness" },
    { time: "4:00–4:30",   type: "review", activity: "Review agent playbook doc written by junior engineer — accuracy, completeness, pattern alignment check" },
    { time: "4:30–5:00",   type: "admin",  activity: "Update agent changelog, tag resolved issues in eval tracker, prep tomorrow's architecture decision record" },
  ],
  fde: [
    { time: "8:30–9:00",   type: "admin",  activity: "Check client Slack workspace for overnight questions, integration errors, or monitoring alerts from deployed systems" },
    { time: "9:00–11:00",  type: "meet",   activity: "Enterprise discovery session — map client workflows, data systems, integration points, and compliance constraints with CTO and ops lead" },
    { time: "11:00–12:30", type: "deep",   activity: "POC development sprint — build the integration connecting client data to the AI product. Write connectors, test against sample data." },
    { time: "12:30–1:30",  type: "admin",  activity: "Lunch. Update internal CRM notes from morning discovery. Flag any blockers to Solutions Architect." },
    { time: "1:30–2:30",   type: "meet",   activity: "Internal debrief with AE and PM — translate client requirements from discovery into product feedback and feature prioritization" },
    { time: "2:30–4:00",   type: "deep",   activity: "Write the integration architecture doc and POC summary report — client-ready technical writeup of what was built and what's next" },
    { time: "4:00–4:30",   type: "review", activity: "Review POC output accuracy — manually check 20 samples from today's test run. Document failure modes." },
    { time: "4:30–5:00",   type: "admin",  activity: "File product requirement based on client feedback. Update deployment tracker. Prep tomorrow's client presentation deck." },
  ],
  soleng: [
    { time: "8:30–9:00",   type: "admin",  activity: "Review today's three deals — check last email thread, note open technical questions, pull latest product release notes for demo accuracy" },
    { time: "9:00–10:00",  type: "meet",   activity: "Technical discovery call with Series B fintech prospect — map current support stack, integration requirements, volume metrics" },
    { time: "10:00–11:30", type: "deep",   activity: "Build custom demo environment for afternoon enterprise call — configure brand-specific examples and escalation triggers" },
    { time: "11:30–12:00", type: "meet",   activity: "Quick AE sync — align on deal strategy, which use case to lead with, which competitor to neutralize in today's demo" },
    { time: "12:00–1:00",  type: "admin",  activity: "Lunch. Draft technical FAQ response for yesterday's IT team security questions." },
    { time: "1:00–2:30",   type: "meet",   activity: "Live enterprise demo — present custom environment, handle live technical questions, run POC walkthrough with VP of CS and IT lead" },
    { time: "2:30–3:30",   type: "review", activity: "Write POC results summary — resolution rate, accuracy score, CSAT projection, edge cases. Client-ready in 24 hours." },
    { time: "3:30–5:00",   type: "deep",   activity: "Build the executive ROI deck for deal closing — model client's actual ticket volume, calculate time saved vs. current tool, finalize pricing recommendation" },
  ],
};

const NO = [
  {
    id: "ds",
    title: "Data Scientist",
    earlyTitle: "Data Science Associate · Junior Data Scientist",
    midTitle: "Data Scientist · Senior Data Scientist",
    fit: "HARD NO", fc: "rose", rga: 2, fld: 2,
    salary: "$100–140k entry", retrain: "18–24 months to be competitive",
    daily: [
      "Build and train ML models (classification, regression, clustering, forecasting)",
      "Clean and wrangle messy datasets — often 60–70% of the job",
      "Write Python or R code for statistical analysis and model development",
      "Run experiments and A/B tests at the statistical inference layer",
      "Present model performance to stakeholders (accuracy, precision, recall, F1)",
      "Maintain and monitor models in production",
      "Read research papers and implement academic techniques"
    ],
    metrics: [
      "Model accuracy, precision, recall, F1 score, AUC-ROC",
      "Business impact of deployed models (revenue lift, cost reduction)",
      "Model drift — how fast the model degrades in production",
      "Experiment velocity — statistically valid tests per quarter",
      "Code quality and reproducibility"
    ],
    rgaText: "High potential, slow to realize. A well-deployed model can generate millions in value. But the link is indirect — 6–18 months from model build to measurable impact. You rarely see the revenue. You see the accuracy score. Someone else sees the money.",
    whyText: "Your own Notion: 'trained and competent, not my passion lane.' Day-to-day is mostly coding and statistical work — 6 hours cleaning data before writing a single word. Enneagram 4 needs creative expression. Voluntary learning goes to content and AI tools, not Kaggle and research papers. Behavior doesn't lie."
  },
  {
    id: "mle",
    title: "Machine Learning Engineer",
    earlyTitle: "Junior ML Engineer · ML Platform Engineer (entry)",
    midTitle: "Machine Learning Engineer · Senior ML Engineer",
    fit: "HARD NO", fc: "rose", rga: 3, fld: 1,
    salary: "$120–160k", retrain: "24+ months",
    daily: [
      "Write production-grade Python code to train, evaluate, and deploy ML models",
      "Build data pipelines at scale (Spark, Airflow, Kafka)",
      "Containerize models with Docker and deploy on Kubernetes",
      "Monitor model performance in production and handle drift",
      "Write unit tests and integration tests for ML code",
      "Optimize model inference speed and cost",
      "Work with ML researchers to productionize experimental models"
    ],
    metrics: [
      "Model latency (milliseconds per inference)",
      "Model throughput (predictions per second)",
      "System uptime and reliability",
      "CI/CD pipeline velocity",
      "Compute cost optimization"
    ],
    rgaText: "Indirect but high-leverage. MLE work powers the product. Without the MLE, the product doesn't work. But MLE doesn't touch customers and doesn't measure revenue personally.",
    whyText: "Requires CS fundamentals at engineering depth — algorithms, data structures, system design, production-grade coding. Your Python is analytical-level (scripts, notebooks). MLE requires software engineering discipline — testing, CI/CD, containerization. 2+ years retraining to be competitive. Zero creative expression."
  },
  {
    id: "aiswe",
    title: "AI Software Engineer",
    earlyTitle: "Junior AI Engineer · Software Engineer I (AI/ML)",
    midTitle: "AI Engineer · Senior AI Engineer · Applied AI Engineer",
    fit: "HARD NO", fc: "rose", rga: 4, fld: 2,
    salary: "$120–160k", retrain: "18–24 months",
    daily: [
      "Build full-stack applications that integrate LLMs and AI APIs",
      "Write backend APIs in Python, Node, or Go",
      "Design system architecture for AI-native applications",
      "Implement RAG pipelines, vector databases, embedding models",
      "Write and review production code daily (6–8 hours of coding)",
      "Debug production incidents under pressure",
      "Build and maintain CI/CD pipelines"
    ],
    metrics: [
      "System uptime and reliability (99.9% availability)",
      "Code quality (PR review pass rate, bug escape rate)",
      "Feature delivery velocity",
      "API performance (latency, error rate, throughput)",
      "Code coverage percentage"
    ],
    rgaText: "Core to the product — no engineers, no product, no revenue. But individual engineers don't own revenue metrics. The link is real but completely invisible to the individual engineer.",
    whyText: "Your dad's pick from the outside. From the inside: 6–8 hours writing code daily. The Accenture interview page showed you straining to map experience to K8s, IaC, SDK abstraction layers. Those aren't gaps you patch with prep — they're the entire job. You have tools-level AI, not engineering-level."
  },
  {
    id: "bi",
    title: "BI Analyst / BI Developer",
    earlyTitle: "Business Intelligence Analyst · Data Analyst · Reporting Analyst",
    midTitle: "Senior BI Analyst · BI Developer · Analytics Engineer",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$65–95k", retrain: "0 months — hireable already, that's the problem",
    daily: [
      "Build and maintain dashboards in Power BI, Tableau, or Looker",
      "Write complex SQL queries to pull data from warehouses",
      "Create automated reports for leadership teams",
      "Work with stakeholders to understand what data they need",
      "Clean and transform data (dbt, SQL, Python)",
      "Document data definitions and data dictionaries",
      "Troubleshoot broken reports and data pipeline failures"
    ],
    metrics: [
      "Dashboard adoption rate",
      "Data accuracy (zero tolerance for wrong numbers)",
      "Report delivery speed",
      "Data pipeline uptime",
      "Query performance optimization"
    ],
    rgaText: "Indirect, supporting. BI work informs decisions that affect revenue, but the analyst rarely captures credit. You build the dashboard that shows the CMO conversion rates are down. The CMO makes the decision.",
    whyText: "You built Power BI executive dashboards at Accenture, ran SQL pipelines for a $200M data platform, and did data storytelling for C-suite stakeholders. You were good at it. You left it. That exit was data. Going back to BI is borrowing against future energy to solve a present timeline anxiety. The MSBA will get you interviews — that's exactly the trap. Your CraftSkills map shows Data Analytics in the outer ring, not the center. The center is strategic synthesis. BI work uses the ring, not the center."
  },
  {
    id: "da",
    title: "Data Analyst",
    earlyTitle: "Junior Data Analyst · Analytics Coordinator · Business Analyst (entry)",
    midTitle: "Data Analyst · Senior Data Analyst · Analytics Manager",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$55–80k", retrain: "0 months — hireable immediately",
    daily: [
      "Pull data from databases using SQL to answer business questions",
      "Build Excel models and pivot tables",
      "Create visualizations in Tableau, Power BI, or Excel",
      "Write reports summarizing what the data shows",
      "Run ad-hoc analyses for business stakeholders",
      "Track KPIs and flag anomalies",
      "Support decision-making with quantitative evidence"
    ],
    metrics: [
      "Accuracy of analysis (zero tolerance for errors)",
      "Turnaround time on ad-hoc requests",
      "Stakeholder satisfaction",
      "Number of analyses completed"
    ],
    rgaText: "Lowest of any analytical role. You produce analysis. Others make decisions. The revenue link exists but is 2–3 steps removed from your daily work.",
    whyText: "Same logic as BI — Accenture was the 3-year live test. You ran analyses, built intelligence dashboards for Wayfair, wrote SQL reports. Competent but not energized. Pure Data Analyst work is narrower than what you did at Accenture. Your CraftSkills stack has Data Analytics as a Domain Skill, not a Meta Skill. The Meta Skills are strategic synthesis, framework creation, and clarity translation. DA work uses 2 of your 27 skills. PMM uses 16."
  },
  {
    id: "ae",
    title: "Account Executive",
    earlyTitle: "Sales Development Representative (SDR) · Business Development Rep (BDR)",
    midTitle: "Account Executive · Mid-Market AE · Enterprise AE",
    fit: "WRONG TIMING", fc: "amber", rga: 5, fld: 3,
    salary: "$60–80k base + $60–80k OTE. Top performers: $200k+", retrain: "Build influencing muscle first",
    daily: [
      "Make cold calls and send cold emails to prospects (20–50 per day)",
      "Run discovery calls to understand prospect pain points",
      "Deliver product demos",
      "Write proposals and manage contract negotiations",
      "Follow up relentlessly (7–12 touchpoints per prospect)",
      "Update CRM (Salesforce) with every interaction",
      "Hit weekly, monthly, and quarterly quotas",
      "Handle rejection — most prospects say no"
    ],
    metrics: [
      "Quota attainment — % of revenue target hit ($500k–$1.5M ARR typical)",
      "Pipeline coverage — 3–4x quota in active pipeline at all times",
      "Win rate — % of opportunities closed",
      "Average deal size",
      "Activities per day (calls made, emails sent, demos booked)"
    ],
    rgaText: "The most direct revenue link of any role. AEs own the number. You either hit quota or you don't. Compensation is directly tied to how much revenue you generate — typically 50% base, 50% commission/bonus.",
    whyText: "CliftonStrengths: 0 out of 5 Influencing themes. 0 out of 5 Executing themes. AE work is 80% Influencing (initiating, persuading, activating) and 20% Executing (quota, pipeline management). You're being asked to run on your two weakest engines. Your Ikigai identifies self-promotion as a documented gap — AE is externalized self-promotion under quota pressure. Build the muscle through CSM or fractional first. Revisit in 3–5 years with proof you can close."
  },
  {
    id: "fin",
    title: "Financial Analyst",
    earlyTitle: "Financial Analyst I · FP&A Analyst · Finance Associate",
    midTitle: "Senior Financial Analyst · FP&A Manager",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$60–85k", retrain: "12+ months to be competitive",
    daily: [
      "Build financial models (DCF, LBO, three-statement models) in Excel",
      "Prepare budget reports and variance analysis",
      "Create presentations for finance leadership and board meetings",
      "Track actuals vs. budget and explain variances",
      "Process invoices and support month-end close",
      "Build forecasting models"
    ],
    metrics: [
      "Forecast accuracy (within X% of actuals)",
      "Report delivery timeliness",
      "Model accuracy",
      "Budget variance explanation quality",
      "Audit compliance"
    ],
    rgaText: "Supporting. Finance informs business decisions but doesn't generate revenue directly. FP&A helps allocate resources efficiently — but the analyst doesn't own the revenue number.",
    whyText: "Zero overlap with any of your 27 skills, personality, interests, or Ikigai. The work is Excel modeling and variance reports. No storytelling, no content, no AI, no creativity. Starting from scratch in a field with no interest in it."
  },
  {
    id: "consult",
    title: "Management Consultant",
    earlyTitle: "Business Analyst (Consulting) · Associate Consultant",
    midTitle: "Consultant · Senior Consultant · Engagement Manager",
    fit: "HARD NO", fc: "rose", rga: 3, fld: 3,
    salary: "$90–110k base (60–80hr weeks)", retrain: "N/A — you already did this",
    daily: [
      "Build PowerPoint decks (4–6 hours per day of slide building)",
      "Conduct stakeholder interviews at client sites",
      "Analyze data and synthesize findings into recommendations",
      "Travel Monday–Thursday every week to client locations",
      "Prepare for and run client workshops",
      "Write detailed reports and strategy documents",
      "Work 60–80 hours per week during intense project phases"
    ],
    metrics: [
      "Client satisfaction scores",
      "Utilization rate (% of time billed to clients)",
      "Project delivery quality",
      "Promotion velocity (up-or-out culture)",
      "Revenue contribution at senior levels"
    ],
    rgaText: "High at senior levels — partners own multi-million dollar client relationships. Junior level: you're a billable resource at $200–400/hr to clients, but your personal comp is $90–110k. The firm captures most of the value you create.",
    whyText: "You did Accenture. You know this world. The travel, the slide decks, the billable hours model. The creator path requires building an audience, shipping content consistently, showing up publicly. 60–80 hour consulting weeks destroy all of that."
  },
  {
    id: "ops",
    title: "Operations Manager",
    earlyTitle: "Operations Coordinator · Business Operations Associate",
    midTitle: "Operations Manager · Sr. Operations Manager",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$65–90k", retrain: "N/A",
    daily: [
      "Manage daily business operations — logistics, vendor relationships, process documentation",
      "Build and maintain SOPs (Standard Operating Procedures)",
      "Track operational KPIs and flag inefficiencies",
      "Hire and manage operations staff",
      "Coordinate between departments on process issues",
      "Handle vendor contracts and negotiations"
    ],
    metrics: [
      "Operational efficiency (cost per unit, throughput time)",
      "Error rate and defect rate in processes",
      "Team productivity metrics",
      "Budget adherence",
      "Process improvement outcomes"
    ],
    rgaText: "Indirect — operations reduces costs and improves efficiency, which protects margin. Not a revenue-generating function directly.",
    whyText: "You build Notion systems because they enable creative work — not because you love operations. 0/5 Executing themes means structure without creative output drains you fast."
  },
  {
    id: "it",
    title: "IT Systems Administrator",
    earlyTitle: "IT Support Specialist · Help Desk Technician · Systems Administrator I",
    midTitle: "IT Systems Administrator · Senior Sysadmin · IT Manager",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$55–80k", retrain: "N/A",
    daily: [
      "Maintain servers, networks, and cloud infrastructure",
      "Troubleshoot hardware and software issues for employees",
      "Manage user accounts, permissions, and security",
      "Install and configure software across the organization",
      "Monitor system uptime and performance",
      "Handle security patches and updates"
    ],
    metrics: [
      "System uptime (99.9%+ target)",
      "Ticket resolution time",
      "Security incident rate",
      "User satisfaction with IT support"
    ],
    rgaText: "Cost center, not revenue generator. IT keeps the lights on. Essential, but no direct link to revenue creation.",
    whyText: "Zero alignment. No storytelling, no creativity, no content, no human impact at scale. The furthest possible role from your Ikigai and Pathway 3."
  },
  {
    id: "dataviz",
    title: "Data Visualization Specialist",
    earlyTitle: "Data Visualization Analyst · Reporting Analyst · BI Analyst (Visual)",
    midTitle: "Data Visualization Specialist · Senior Data Viz Lead · Analytics Storyteller",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 2,
    salary: "$60–90k", retrain: "0 months — hireable now",
    daily: [
      "Build charts, dashboards, and infographics in Tableau, Power BI, or D3.js",
      "Write SQL to extract and shape data for visualizations",
      "Translate raw datasets into visual narratives for stakeholders",
      "Maintain and update dashboards as data changes",
      "Choose the right chart type for each data story",
      "Ensure visual accuracy and data integrity across reports",
      "Present data findings to non-technical business teams"
    ],
    metrics: [
      "Dashboard adoption rate",
      "Accuracy of visualizations (zero tolerance for wrong numbers)",
      "Stakeholder satisfaction with reports",
      "Time to deliver new dashboards"
    ],
    rgaText: "Indirect and supporting. Visualizations inform decisions but don't generate revenue directly. You show someone the data; they make the call.",
    whyText: "You built Power BI dashboards for C-suite stakeholders at Accenture and did visual data storytelling for a $200M data platform. You were good at it. You left. That is 3 years of live data. DataViz is the narrowest slice of what you did — it uses your design sensibility but ignores your strategic synthesis, writing, AI, and frameworks. Same trap as DA and BI: hireable immediately, energizing for 3 months, draining by month 9. The Enneagram 4 needs expression, not production."
  },
  {
    id: "dataeng",
    title: "Data Engineer",
    earlyTitle: "Junior Data Engineer · ETL Developer · Analytics Engineer (entry)",
    midTitle: "Data Engineer · Senior Data Engineer · Data Platform Engineer",
    fit: "HARD NO", fc: "rose", rga: 2, fld: 1,
    salary: "$90–130k", retrain: "12–18 months to be competitive",
    daily: [
      "Build and maintain ETL/ELT pipelines that move data between systems",
      "Write Python and SQL to clean, transform, and load data at scale",
      "Design and manage data warehouse architecture (Snowflake, BigQuery, Redshift)",
      "Build dbt models for data transformation",
      "Monitor pipeline reliability and debug broken data flows",
      "Set up orchestration tools (Airflow, Prefect, Dagster)",
      "Work with data consumers to understand and meet their data needs"
    ],
    metrics: [
      "Pipeline reliability (uptime %)",
      "Data freshness (time from source to available)",
      "Data quality score",
      "Query performance",
      "Incident response time for broken pipelines"
    ],
    rgaText: "Foundational but indirect. Without clean pipelines, the business can't make decisions. But Data Engineering is pure infrastructure — the revenue link is 2–3 steps removed from your daily work.",
    whyText: "Data Engineering is software engineering applied to data infrastructure. Your day is writing Python pipeline code, debugging Airflow DAGs, and managing Snowflake schemas. Zero creative expression, zero content, zero human impact at scale. Your Python is analytical-level — notebooks and scripts. Data Engineering requires production software engineering discipline: error handling, testing, CI/CD, distributed systems thinking. The MSBA gives you SQL and conceptual data architecture. It does not make you a Data Engineer."
  },
  {
    id: "biengineer",
    title: "Business Intelligence Engineer",
    earlyTitle: "BI Developer · Analytics Engineer · Data Warehouse Analyst",
    midTitle: "BI Engineer · Senior BI Engineer · Analytics Engineering Lead",
    fit: "HARD NO", fc: "rose", rga: 1, fld: 1,
    salary: "$85–120k", retrain: "6–12 months",
    daily: [
      "Design and build data warehouse models (star schema, dimensional modeling)",
      "Write advanced SQL and dbt models for data transformation",
      "Build semantic layers that BI tools sit on top of",
      "Manage Snowflake, BigQuery, or Redshift environments",
      "Create and maintain BI platform infrastructure (Looker, Tableau Server)",
      "Work with data engineers to ensure clean, reliable data flows",
      "Define data standards and data governance policies"
    ],
    metrics: [
      "Data model accuracy",
      "Query performance and optimization",
      "Pipeline uptime",
      "BI platform adoption rate",
      "Data governance compliance"
    ],
    rgaText: "Supporting infrastructure. BI Engineers build the plumbing that lets analysts pull insights. Indirect revenue link — the people who use your infrastructure make the business calls.",
    whyText: "BI Engineer is what happens when BI Analyst meets Data Engineering — more technical and more removed from creative work. The BI Analyst entry already explains why BI work is not right for you. BI Engineer amplifies the mismatch: more coding depth required, less stakeholder storytelling, more data infrastructure maintenance. Higher salary ceiling, but it charges creative energy you don't want to spend here. The existing 'BI Analyst / BI Developer' entry covers the same territory with less technical depth — and that was already a Hard No."
  }
];

const NEUTRAL = [
  {
    id: "pm",
    title: "Product Manager",
    earlyTitle: "Associate Product Manager (APM) · Product Analyst",
    midTitle: "Product Manager · Senior Product Manager",
    fit: "CONDITIONAL", fc: "amber", rga: 4, fld: 2,
    salary: "$90–130k", condition: "After 2–3 years as PMM",
    daily: [
      "Write PRDs defining what gets built and why",
      "Run sprint planning and backlog grooming with engineering teams",
      "Conduct user research and synthesize into feature priorities",
      "Define success metrics for every feature before it ships",
      "Review designs and provide product feedback",
      "Manage roadmap and communicate priorities to stakeholders",
      "Analyze usage data to inform next bets"
    ],
    metrics: [
      "Feature adoption rate",
      "Time-to-market",
      "NPS and CSAT",
      "Revenue impact of shipped features",
      "Roadmap delivery accuracy"
    ],
    rgaText: "High — PM is the closest non-engineering role to product revenue. Features you prioritize become revenue. Good PMs have compounding impact on ARR.",
    whyText: "PM is intellectually aligned — systems thinking, user empathy, research synthesis. But pure PM work removes creative expression. Most PM roles require 2–3 years of PM experience. PMM is more accessible NOW. PM is a potential lateral move 2–3 years into a PMM career."
  },
  {
    id: "uxr",
    title: "UX Researcher",
    earlyTitle: "User Research Associate · UX Research Coordinator · Research Ops Specialist",
    midTitle: "UX Researcher · Senior UX Researcher · User Insights Lead",
    fit: "CONDITIONAL", fc: "amber", rga: 2, fld: 3,
    salary: "$75–105k", condition: "Only at a company you love",
    daily: [
      "Plan and run user research studies (interviews, usability tests, surveys)",
      "Recruit research participants and manage research panels",
      "Synthesize qualitative and quantitative data into insights",
      "Write research reports and present findings to product and design teams",
      "Maintain a research repository",
      "Run competitive UX analysis"
    ],
    metrics: [
      "Research utilization rate (how many studies actually inform decisions)",
      "Participant satisfaction",
      "Time-to-insight",
      "Research coverage (% of product decisions backed by research)"
    ],
    rgaText: "Indirect — research informs decisions that affect product direction and user satisfaction. Better UX reduces churn. The revenue link is real but 3–4 steps removed.",
    whyText: "Your empathy, interviewing instinct, and synthesis skills are genuinely strong here. But it's narrow — mostly interviews and reports. Content creation, storytelling, and visual skills go unused. Take this only at a company you love if nothing else opens."
  },
  {
    id: "brand",
    title: "Brand Manager",
    earlyTitle: "Brand Coordinator · Brand Specialist · Marketing Coordinator",
    midTitle: "Brand Manager · Senior Brand Manager · Brand Strategist",
    fit: "CONDITIONAL", fc: "amber", rga: 2, fld: 3,
    salary: "$65–90k", condition: "Only if PMM isn't available",
    daily: [
      "Own brand guidelines and enforce consistency across all channels",
      "Manage brand campaigns from brief to launch",
      "Work with agencies on brand creative",
      "Track brand health metrics (awareness, sentiment, recall)",
      "Manage brand partnerships and sponsorships",
      "Review all external content for brand compliance"
    ],
    metrics: [
      "Brand awareness (% of target market who recognizes the brand)",
      "Brand sentiment (positive/negative/neutral)",
      "Share of voice vs. competitors",
      "Brand consistency score across channels"
    ],
    rgaText: "Long cycle, hard to attribute. Brand investment takes 12–24 months to show up in revenue metrics. Brand managers often struggle to prove direct revenue impact, which makes the role vulnerable during budget cuts.",
    whyText: "Strong creative and aesthetic alignment (VIA #1, visual storytelling skills). But Brand Manager at large companies is slow, bureaucratic, and agency-management heavy. At a startup it blurs into PMM anyway. Pursue PMM instead."
  },
  {
    id: "social",
    title: "Social Media Manager",
    earlyTitle: "Social Media Coordinator · Community Manager · Social Media Specialist",
    midTitle: "Social Media Manager · Senior Social Media Manager",
    fit: "LOW FIT", fc: "rose", rga: 2, fld: 2,
    salary: "$45–65k", condition: "Only with strategy scope negotiated",
    daily: [
      "Create and schedule content across LinkedIn, Instagram, TikTok, X",
      "Engage with comments and community in real-time",
      "Monitor brand mentions and respond",
      "Report on follower growth, reach, and engagement weekly",
      "Run social media ad campaigns",
      "Stay current on platform algorithm changes"
    ],
    metrics: [
      "Follower growth rate",
      "Engagement rate (likes/comments/shares per post)",
      "Reach and impressions",
      "Click-through rate to website"
    ],
    rgaText: "Low-to-medium. Social can drive brand awareness and inbound leads but it's rarely measured as a direct revenue driver at most companies.",
    whyText: "You have the skills. You don't have the interest in doing this for someone else's brand at this salary. Social Media Manager is the execution layer of content — create, schedule, respond, repeat. No strategy ownership. It's PMM's output without PMM's input."
  },
  {
    id: "ba",
    title: "Business Analyst",
    earlyTitle: "Business Analyst I · Junior Business Analyst · Systems Analyst (entry)",
    midTitle: "Business Analyst · Senior Business Analyst · Business Systems Analyst",
    fit: "DOOR OPENER", fc: "amber", rga: 2, fld: 2,
    salary: "$65–85k", condition: "Door-opener only, not a destination",
    daily: [
      "Gather requirements from business stakeholders",
      "Document current-state processes and identify gaps",
      "Write functional specifications for technology projects",
      "Facilitate workshops to align stakeholders",
      "Create process flow diagrams and use case documentation",
      "Bridge business teams and technical teams"
    ],
    metrics: [
      "Requirements accuracy",
      "Stakeholder satisfaction",
      "Project delivery timeline adherence",
      "Documentation completeness"
    ],
    rgaText: "Indirect — BA work enables projects that drive revenue. Supporting role in the value chain.",
    whyText: "Your systems thinking, synthesis skills, and workshop facilitation from Accenture are applicable. But BA work is process documentation and requirements gathering — functional but not energizing. Take only inside a company you love as a door-opener."
  },
  {
    id: "id",
    title: "Instructional Designer",
    earlyTitle: "Learning & Development Specialist · eLearning Developer · Training Coordinator",
    midTitle: "Instructional Designer · Senior Instructional Designer · L&D Manager",
    fit: "INCOME BRIDGE", fc: "amber", rga: 2, fld: 4,
    salary: "$55–75k", condition: "Only if PMM/DevRel stalls past 6 months",
    daily: [
      "Design e-learning courses using tools like Articulate 360",
      "Write learning objectives and assessment questions",
      "Create storyboards for video-based learning",
      "Collaborate with subject matter experts to extract knowledge",
      "Build SCORM-compliant modules for LMS platforms",
      "Measure learning outcomes and course effectiveness"
    ],
    metrics: [
      "Course completion rates",
      "Assessment pass rates",
      "Learner satisfaction scores",
      "Knowledge retention metrics"
    ],
    rgaText: "Indirect — training improves employee performance which improves business outcomes. In customer-facing training, better educated customers reduce churn and increase product adoption.",
    whyText: "Teaching instinct is real. But Instructional Designer is a specific, narrow execution of that instinct — you'd be building SCORM modules, not reaching thousands. Take only if PMM/DevRel/Creative Strategist stalls past 6 months. Use it to fund the creator track."
  },
  {
    id: "aiengineer",
    title: "AI Engineer",
    earlyTitle: "AI Product Engineer · LLM Engineer · Prompt Engineer",
    midTitle: "AI Engineer · Senior AI Engineer · AI Product Builder",
    fit: "CONDITIONAL", fc: "amber", rga: 4, fld: 4,
    salary: "$90–140k", condition: "Only if the role = AI product building, NOT traditional software engineering depth",
    daily: [
      "Design and implement LLM-powered features using APIs (Anthropic, OpenAI, Gemini)",
      "Build prompt systems, evaluation frameworks, and output pipelines",
      "Integrate AI into products — chatbots, copilots, generation tools",
      "Design RAG architectures (retrieval-augmented generation) and vector search",
      "Test and evaluate AI output quality, safety, and reliability",
      "Write documentation and internal playbooks for AI systems",
      "Collaborate with product and design to define AI use cases and guardrails"
    ],
    metrics: [
      "AI feature adoption rate",
      "Output quality metrics (accuracy, helpfulness, safety scores)",
      "Latency and cost per AI API call",
      "Evaluation benchmark scores",
      "Number of AI features shipped to production"
    ],
    rgaText: "High and growing fast. Companies are paying a premium right now for people who understand LLMs, can ship AI features, and can communicate what the AI should and shouldn't do. AI features drive retention, differentiation, and new revenue streams.",
    whyText: "This is the interesting one. The modern 'AI Engineer' at many startups means: design AI workflows, wire LLM APIs, build prompts, evaluate outputs, ship AI-native features. Your daily work with n8n, Make, Claude, and AI automation workflows is adjacent. The gap: production Python code, testing discipline, system architecture at engineering depth. If the role is 70% AI product design and 30% light coding — it fits. If it's the reverse — it doesn't. Read the job description carefully. 'AI Engineer' at a 10-person startup is different from 'AI Engineer' at Google."
  },
  {
    id: "agenticai",
    title: "Agentic AI Engineer",
    earlyTitle: "AI Automation Engineer · AI Agent Developer · AI Workflows Engineer",
    midTitle: "Agentic AI Engineer · AI Systems Architect · Agent Platform Lead",
    fit: "CONDITIONAL", fc: "amber", rga: 4, fld: 5,
    salary: "$100–150k", condition: "Emerging role — requires 3–6 months of deliberate skill stacking in Python + agent frameworks",
    daily: [
      "Design and build multi-agent AI systems (orchestration, tool use, memory, handoffs)",
      "Use frameworks like LangGraph, CrewAI, AutoGen, or custom agent loops",
      "Define agent personas, goals, tools, and evaluation criteria",
      "Build and maintain tool integrations for agents (APIs, databases, web scraping)",
      "Evaluate agent behavior — does it complete the task reliably at scale?",
      "Write documentation and playbooks for deployed agent systems",
      "Work with product teams to scope agent capabilities and edge cases"
    ],
    metrics: [
      "Agent task completion rate",
      "Output reliability and accuracy per run",
      "Cost per agent run",
      "Time saved vs. manual baseline",
      "Number of production agents deployed and maintained"
    ],
    rgaText: "High potential, early stage. Companies building AI agents are paying well for people who can think systemically about what agents should do and actually build them. The market is underserved and getting more so.",
    whyText: "Your n8n and Make workflows are proto-agentic AI engineering — you're already thinking in nodes, triggers, conditional logic, and tool chains. The conceptual foundation is there. The gap: Python depth for production agents (LangGraph, LangChain, memory systems). 3–6 months of deliberate practice bridges this. The role matches 5 of your top CraftSkills: systems architecture, framework creation, deep research, AI tooling, and clarity translation. The condition: you'd need to code more than you do today. Not at MLE level — but enough to ship agents that run in production reliably."
  },
  {
    id: "fde",
    title: "Forward Deployed Engineer",
    earlyTitle: "Implementation Engineer · AI Deployment Specialist · FDE",
    midTitle: "Senior FDE · Principal FDE · Customer Engineering Lead",
    fit: "CONDITIONAL", fc: "amber", rga: 4, fld: 5,
    salary: "$120–180k", condition: "Only at an AI-first company (OpenAI, Anthropic, Palantir, Salesforce AI) — the client-facing + implementation mix is what makes this fit",
    daily: [
      "Run enterprise discovery sessions — map client workflows, data systems, and integration points",
      "Build proof-of-concept implementations using client data to validate AI use cases live",
      "Write integration code connecting company AI products to client APIs and data pipelines",
      "Run inference tests and monitor AI model behavior in client environments",
      "Translate field feedback from clients into internal product requirements",
      "Present solution architecture and results to client stakeholders (C-suite to engineering)",
      "Train client teams on how to use and extend the deployed AI system"
    ],
    metrics: [
      "Client time-to-value (how fast client sees ROI from deployment)",
      "Implementation success rate — did deployment go live as scoped?",
      "Client adoption rate post-deployment",
      "Net revenue retained from accounts post-deployment",
      "Number of product requirements filed from field feedback"
    ],
    rgaText: "High and structural. FDEs are directly attached to enterprise contracts worth $500k–$5M+. Your successful deployment IS the revenue. Companies like Palantir, OpenAI, and Anthropic pay FDEs well because they unlock deals that self-serve tools cannot close. This role sits at the intersection of revenue and product.",
    whyText: "FDE is the rare role that rewards your exact combination: technical enough to build integrations, compelling enough to run enterprise discovery, systems thinker who sees how workflows connect, and a communicator who translates AI into business outcomes. Your Wayfair AI automation work, n8n/Make experience, and consulting background map directly. The gap: production Python fluency for integration code. With 3–4 months of deliberate practice building client-facing integrations, you'd be competitive for junior FDE roles. Palantir built the playbook — but OpenAI, Anthropic, Salesforce, and Scale AI now all run forward-deployed teams.",
    takeIf: "The company is AI-first, the role is implementation-focused (not pure sales-eng), and you get exposure to both the client side and engineering in the same role"
  },
  {
    id: "soleng",
    title: "Solutions Engineer",
    earlyTitle: "Sales Engineer · Technical Sales Engineer · Pre-Sales Engineer",
    midTitle: "Solutions Engineer · Senior Solutions Engineer · Principal SE",
    fit: "CONDITIONAL", fc: "amber", rga: 5, fld: 4,
    salary: "$100–160k + OTE", condition: "Must be at an AI-first company where the demo IS the product — not selling software features but selling AI transformation",
    daily: [
      "Run technical discovery calls — understand client's stack, pain points, and integration requirements",
      "Build and deliver live product demos tailored to each prospect's specific use case",
      "Answer technical questions during the sales cycle — APIs, security, deployment architecture",
      "Write technical proposals, integration docs, and scope-of-work outlines for enterprise deals",
      "Collaborate with Account Executives on deal strategy and which use case to lead with",
      "Create reusable demo environments and technical battlecards for the sales team",
      "Feed prospect objections and gaps back to product and engineering teams"
    ],
    metrics: [
      "Technical win rate — % of deals where SE involvement led to closed-won",
      "Demo-to-close conversion rate",
      "POC (proof-of-concept) success rate",
      "Sales cycle length — SE impact on shortening it",
      "Deals supported per quarter vs. revenue closed"
    ],
    rgaText: "Maximum revenue attachment. Solutions Engineers sit directly on the sales line — every deal you help close is attributable revenue. AI SaaS companies pay SEs $100k+ base with OTE hitting $160–200k because they multiply the value of every AE on the team. Strong SEs become a force multiplier for entire sales organizations.",
    whyText: "Your communication skills, ability to translate complexity, and aesthetic sense for what a compelling demo looks like all point here. The gap: SEs are expected to be deeply technical — live coding, API integrations, architecture discussions under pressure. BUT at AI-first companies in 2025, many SE roles prioritize demo fluency, workflow design, and business translation over raw code output. Your AI automation background (n8n, Make, Claude) makes you more credible in this space than a pure SWE who can't tell a story. Condition: the role must be at an AI company where the story matters as much as the stack.",
    takeIf: "The role is at an AI company, you demo product you actually believe in, and the AE team is strong enough that you're amplifying great salespeople — not compensating for weak ones"
  }
];

const ALL_TABLE = [
  { t: "PMM at AI/SaaS Company",       early: "Product Marketing Associate",           cat: "✅ YES",    rga: "●●●●○", sal: "$70–130k",   take: "Always apply" },
  { t: "Developer Advocate",            early: "Developer Relations Associate",         cat: "✅ YES",    rga: "●●●●○", sal: "$90–140k",   take: "Always apply" },
  { t: "Creative Strategist",           early: "Creative Strategy Associate",           cat: "✅ YES",    rga: "●●●●○", sal: "$65–90k",    take: "Always apply" },
  { t: "AI Content Strategist",         early: "AI Content Writer · AI Edu Specialist", cat: "✅ YES",    rga: "●●●●●", sal: "Unlimited",  take: "Always build" },
  { t: "Fractional Creative Strategist",early: "Freelance Brand Consultant",            cat: "✅ YES",    rga: "●●●●●", sal: "$50–150/hr", take: "Start this week" },
  { t: "Growth Marketing Manager",      early: "Growth Marketing Analyst",             cat: "✅ YES",    rga: "●●●●●", sal: "$75–110k",   take: "Apply" },
  { t: "AI Customer Success Manager",   early: "Customer Success Associate",           cat: "✅ YES",    rga: "●●●●○", sal: "$70–100k",   take: "Apply" },
  { t: "Content Marketing Manager",     early: "Content Marketing Coordinator",        cat: "✅ YES",    rga: "●●●○○", sal: "$60–85k",    take: "Apply" },
  { t: "Customer Education Manager",    early: "Customer Education Specialist",        cat: "✅ YES",    rga: "●●●○○", sal: "$65–90k",    take: "Apply" },
  { t: "Technical Writer (AI Co.)",     early: "Documentation Specialist",             cat: "✅ YES",    rga: "●●○○○", sal: "$65–85k",    take: "Great company only" },
  { t: "Product Manager",               early: "Associate Product Manager (APM)",      cat: "⚠️ COND",  rga: "●●●●○", sal: "$90–130k",   take: "After PMM experience" },
  { t: "Brand Manager",                 early: "Brand Coordinator",                    cat: "⚠️ COND",  rga: "●●○○○", sal: "$65–90k",    take: "If PMM unavailable" },
  { t: "UX Researcher",                 early: "User Research Associate",              cat: "⚠️ COND",  rga: "●●○○○", sal: "$75–105k",   take: "Love the company" },
  { t: "Business Analyst",              early: "Business Analyst I",                   cat: "⚠️ COND",  rga: "●●○○○", sal: "$65–85k",    take: "Door-opener only" },
  { t: "Instructional Designer",        early: "L&D Specialist",                       cat: "⚠️ COND",  rga: "●●○○○", sal: "$55–75k",    take: "Income bridge only" },
  { t: "AI Engineer",                   early: "AI Product Engineer · LLM Engineer",   cat: "⚠️ COND",  rga: "●●●●○", sal: "$90–140k",   take: "If role = AI product, not SWE" },
  { t: "Agentic AI Engineer",           early: "AI Automation Engineer · Agent Dev",   cat: "⚠️ COND",  rga: "●●●●○", sal: "$100–150k",  take: "After 3–6 mo skill stack" },
  { t: "Forward Deployed Engineer",    early: "Implementation Engineer · AI Deployment Specialist", cat: "⚠️ COND",  rga: "●●●●○", sal: "$120–180k",     take: "AI-first company, impl focus" },
  { t: "Solutions Engineer",           early: "Sales Engineer · Technical Sales Engineer",           cat: "⚠️ COND",  rga: "●●●●●", sal: "$100–160k OTE", take: "AI company, story matters" },
  { t: "Social Media Manager",          early: "Social Media Coordinator",             cat: "⚠️ LOW",   rga: "●●○○○", sal: "$45–65k",    take: "Only with strategy scope" },
  { t: "Data Analyst",                  early: "Junior Data Analyst",                  cat: "❌ NO",     rga: "●○○○○", sal: "$55–80k",    take: "Never" },
  { t: "BI Analyst / BI Developer",     early: "Business Intelligence Analyst",        cat: "❌ NO",     rga: "●○○○○", sal: "$65–95k",    take: "Never" },
  { t: "Data Scientist",                early: "Data Science Associate",               cat: "❌ NO",     rga: "●●○○○", sal: "$100–140k",  take: "Never" },
  { t: "Machine Learning Engineer",     early: "Junior ML Engineer",                   cat: "❌ NO",     rga: "●●●○○", sal: "$120–160k",  take: "Never" },
  { t: "AI Software Engineer",          early: "Software Engineer I (AI/ML)",          cat: "❌ NO",     rga: "●●●●○", sal: "$120–160k",  take: "Never" },
  { t: "Data Visualization Specialist", early: "Data Viz Analyst · Reporting Analyst", cat: "❌ NO",     rga: "●○○○○", sal: "$60–90k",    take: "Never" },
  { t: "Data Engineer",                 early: "Junior Data Engineer · ETL Developer", cat: "❌ NO",     rga: "●●○○○", sal: "$90–130k",   take: "Never" },
  { t: "BI Engineer",                   early: "BI Developer · Analytics Engineer",    cat: "❌ NO",     rga: "●○○○○", sal: "$85–120k",   take: "Never" },
  { t: "Account Executive",             early: "SDR · BDR",                            cat: "❌ TIMING", rga: "●●●●●", sal: "$60–80k+OTE",take: "Maybe in 3–5 years" },
  { t: "Financial Analyst",             early: "Financial Analyst I",                  cat: "❌ NO",     rga: "●○○○○", sal: "$60–85k",    take: "Never" },
  { t: "Management Consultant",         early: "Business Analyst (Consulting)",        cat: "❌ NO",     rga: "●●●○○", sal: "$90–110k",   take: "Already did it" },
  { t: "Operations Manager",            early: "Operations Coordinator",               cat: "❌ NO",     rga: "●○○○○", sal: "$65–90k",    take: "Never" },
  { t: "IT Systems Administrator",      early: "IT Support Specialist",                cat: "❌ NO",     rga: "●○○○○", sal: "$55–80k",    take: "Never" },
];

const SKILLS_2030 = {
  obvious: [
    { n: "AI Prompt Engineering & Orchestration", d: "Directing AI systems to produce useful output — not tool-using, system-directing.", lv: "Building", lk: "build" },
    { n: "Data Literacy",            d: "Reading dashboards, interpreting metrics, asking the right questions of data.", lv: "Strong", lk: "strong" },
    { n: "Cybersecurity Fundamentals", d: "Every company needs this. Most employees don't have it. Will become baseline requirement.", lv: "Weak", lk: "weak" },
    { n: "Video Creation",           d: "Short-form content is now a professional skill, not just a hobby skill.", lv: "Strong", lk: "strong" },
    { n: "Personal Brand Building",  d: "LinkedIn/YouTube/Substack IS your resume by 2028.", lv: "Building", lk: "build" },
  ],
  nonObvious: [
    { n: "AI Taste",                    d: "Knowing when AI output is wrong, mediocre, or off-brand — and fixing it with judgment, not re-prompting. The quality gate for every AI-assisted workflow.", lv: "Building", lk: "build" },
    { n: "Human-AI Workflow Design",    d: "Knowing where to put a human in a loop and where to remove them. You already did this at Wayfair with n8n — 40% time savings.", lv: "Proven", lk: "proven" },
    { n: "Synthetic Media Literacy",    d: "Detecting and verifying what is real vs. AI-generated. Legal, journalism, PR all need this. By 2027 it's a hiring requirement for anyone touching public-facing content.", lv: "Early", lk: "early" },
    { n: "Audience Architecture",       d: "Strategically building a specific audience that compounds over time. Worth more than most mid-size company marketing budgets.", lv: "Course-complete (PTYA)", lk: "course" },
    { n: "Emotional Precision",         d: "Writing or speaking so a specific person feels specifically understood. Not warm. Precise. More valuable as AI handles generic communication.", lv: "Natural Strength", lk: "natural" },
    { n: "Multi-Modal Storytelling",    d: "Fluency across text, video, audio, and interactive formats — knowing which story requires which medium. Rare now. Superpower by 2027.", lv: "Active (Bino + video + writing)", lk: "proven" },
    { n: "Trust Brokering",             d: "Being the person whose recommendation actually converts because your judgment has a proven track record. Built over years, not a course.", lv: "Early Building", lk: "early" },
  ],
  future: [
    { e: "NOW", ek: "now", n: "Developer Advocate / AI Evangelist", d: "Explaining AI products to technical and non-technical audiences. Companies hiring faster than supply exists." },
    { e: "NOW", ek: "now", n: "Prompt Architect", d: "Designing reusable prompt systems and AI workflows at enterprise scale. Not a ChatGPT user. A systems designer." },
    { e: "NOW", ek: "now", n: "AI Ethics & Trust Officer", d: "Regulatory pressure is forcing this role into every company over $100M revenue. Combines legal, comms, and AI fluency." },
    { e: "EMERGING", ek: "emerging", n: "AI Translator", d: "Sits between engineering teams building AI and business stakeholders using it. Speaks both languages fluently. By 2027: $150k+ floor." },
    { e: "EMERGING", ek: "emerging", n: "Synthetic Media Auditor", d: "Verifies AI-generated content for legal, compliance, journalism, and brand contexts. No degree path exists yet. First movers own the space." },
    { e: "EMERGING", ek: "emerging", n: "Human Performance Designer", d: "Uses AI tools to design better workflows, decision systems, and learning paths for teams. Combines instructional design, AI ops, and behavioral science." },
    { e: "2027+", ek: "future", n: "Personal AI Manager", d: "Manages another person's AI stack the way a chief of staff manages their calendar. High-net-worth individuals will pay $80–150k/yr." },
    { e: "2027+", ek: "future", n: "Audience Architect", d: "Hired specifically to build a company's owned audience (newsletter, YouTube, community) as a standalone revenue-generating asset." },
    { e: "2028+", ek: "future", n: "AI Brand Strategist", d: "As every company deploys AI-generated content at scale, brand differentiation collapses. This person protects the soul of the brand against AI homogenization." },
    { e: "2028+", ek: "future", n: "Reality Calibration Specialist", d: "Works inside media, legal, and education to certify what is real. Part forensics, part communication, part policy." },
  ]
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const FC_STYLES = {
  mint:   { bg: "rgba(30,122,99,0.08)",   border: "rgba(30,122,99,0.25)",   color: "#1e7a63" },
  sage:   { bg: "rgba(58,107,74,0.08)",   border: "rgba(58,107,74,0.25)",   color: "#3a6b4a" },
  amber:  { bg: "rgba(138,96,24,0.08)",   border: "rgba(138,96,24,0.25)",   color: "#8a6018" },
  rose:   { bg: "rgba(154,64,64,0.08)",   border: "rgba(154,64,64,0.25)",   color: "#9a4040" },
};

function Dots({ n, max = 5 }) {
  return (
    <div className="rga-dots">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`dot ${i < n ? "on" : "off"}`} />
      ))}
    </div>
  );
}

function FreeDots({ n, max = 5 }) {
  return (
    <div className="fld-dots">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`fld-dot ${i < n ? "on" : "off"}`} />
      ))}
    </div>
  );
}

function FitTag({ fit, fc }) {
  const s = FC_STYLES[fc] || FC_STYLES.amber;
  return (
    <span className="fit-tag" style={{ background: s.bg, borderColor: s.border, color: s.color }}>
      {fit}
    </span>
  );
}

function DeckView({ roles, type, label, desc }) {
  const [idx, setIdx] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const role = roles[idx];
  const hasNext = idx < roles.length - 1;
  const hasPrev = idx > 0;
  const goNext = () => { setIdx(i => i + 1); setShowFull(false); };
  const goPrev = () => { setIdx(i => i - 1); setShowFull(false); };
  const fitStyle = FC_STYLES[role.fc] || FC_STYLES.amber;

  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">{label}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
          <div className="sec-title">{role.title}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>{idx + 1} / {roles.length}</div>
        </div>
        <div className="sec-desc">{desc}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px" }}>

        {/* Progress pill strip */}
        <div style={{ display: "flex", gap: "5px", marginBottom: "28px" }}>
          {roles.map((_, i) => (
            <div key={i} onClick={() => { setIdx(i); setShowFull(false); }}
              style={{ width: i === idx ? "28px" : "7px", height: "7px", borderRadius: "4px",
                       background: i === idx ? "var(--mint)" : i < idx ? "var(--mint-bd)" : "var(--border2)",
                       cursor: "pointer", transition: "all 0.25s" }} />
          ))}
        </div>

        {/* Card stack */}
        <div style={{ position: "relative", width: "100%", maxWidth: "580px" }}>
          {roles[idx + 2] && !showFull && (
            <div style={{ position: "absolute", top: "14px", left: "14px", right: "-14px", bottom: "-14px",
                          background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "20px", zIndex: 0 }} />
          )}
          {roles[idx + 1] && !showFull && (
            <div style={{ position: "absolute", top: "7px", left: "7px", right: "-7px", bottom: "-7px",
                          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", zIndex: 1 }} />
          )}

          {/* Main card */}
          <div style={{ position: "relative", zIndex: 2, background: "var(--surface)",
                        border: "1px solid var(--border2)", borderRadius: "20px", overflow: "hidden",
                        boxShadow: "0 6px 32px rgba(0,0,0,0.07)" }}>

            {/* Fit banner */}
            <div style={{ background: fitStyle.bg, borderBottom: `1px solid ${fitStyle.border}`,
                          padding: "10px 26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em",
                             textTransform: "uppercase", color: fitStyle.color, fontWeight: 600 }}>{role.fit}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.04em" }}>{role.salary}</span>
            </div>

            {/* Body */}
            <div style={{ padding: "28px 28px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.65rem", fontWeight: 800,
                            lineHeight: 1.1, marginBottom: "5px", color: "var(--text)" }}>{role.title}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted)",
                            marginBottom: "20px", letterSpacing: "0.04em" }}>{role.earlyTitle}</div>

              {/* Scores */}
              <div style={{ display: "flex", gap: "22px", marginBottom: "22px", flexWrap: "wrap" }}>
                <div className="meta-item">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Revenue</span>
                  <Dots n={role.rga} />
                </div>
                {role.fld != null && (
                  <div className="meta-item">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--lavender)" }}>Own It</span>
                    <FreeDots n={role.fld} />
                  </div>
                )}
              </div>

              {/* 3 daily bullets */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase",
                              letterSpacing: "0.14em", color: "var(--muted)", marginBottom: "10px" }}>Day to day</div>
                {role.daily.slice(0, 3).map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--mint)", fontSize: "12px", marginTop: "1px", flexShrink: 0, fontWeight: 700 }}>→</span>
                    <span style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.5" }}>{d}</span>
                  </div>
                ))}
              </div>

              {/* Why snippet */}
              <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px",
                            borderLeft: `3px solid ${fitStyle.border}` }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase",
                              letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "6px" }}>
                  {type === "yes" ? "Why it fits" : type === "no" ? "Why it doesn't" : "The condition"}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.6", margin: 0 }}>
                  {(role.whyText || role.condition || "").slice(0, 220)}{(role.whyText || role.condition || "").length > 220 ? "…" : ""}
                </p>
              </div>
            </div>

            {/* Action bar */}
            <div style={{ borderTop: "1px solid var(--border)", padding: "14px 20px",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          background: "var(--bg)" }}>
              <button onClick={goPrev} disabled={!hasPrev}
                style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                         background: hasPrev ? "var(--surface2)" : "transparent",
                         border: `1px solid ${hasPrev ? "var(--border2)" : "var(--border)"}`,
                         color: hasPrev ? "var(--text2)" : "var(--muted2)",
                         padding: "8px 16px", borderRadius: "20px", cursor: hasPrev ? "pointer" : "default" }}>
                ← Back
              </button>
              <button onClick={() => setShowFull(v => !v)}
                style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                         background: showFull ? "var(--mint)" : "var(--mint-bg)",
                         border: "1px solid var(--mint-bd)",
                         color: showFull ? "#fff" : "var(--mint)",
                         padding: "8px 22px", borderRadius: "20px", cursor: "pointer" }}>
                {showFull ? "▲ Close" : "▼ Full Breakdown"}
              </button>
              <button onClick={goNext} disabled={!hasNext}
                style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                         background: hasNext ? "var(--surface2)" : "transparent",
                         border: `1px solid ${hasNext ? "var(--border2)" : "var(--border)"}`,
                         color: hasNext ? "var(--text2)" : "var(--muted2)",
                         padding: "8px 16px", borderRadius: "20px", cursor: hasNext ? "pointer" : "default" }}>
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Full breakdown panel */}
        {showFull && (
          <div style={{ width: "100%", maxWidth: "760px", marginTop: "16px" }}>
            <RoleCard role={role} type={type} forceOpen />
          </div>
        )}
      </div>
    </div>
  );
}

function RoleCard({ role, type, forceOpen = false }) {
  const [open, setOpen] = useState(forceOpen);
  const [showDayInLife, setShowDayInLife] = useState(false);
  const wc = type === "yes" ? "why-yes" : type === "no" ? "why-no" : "why-neutral";
  const scenario = SCENARIOS[role.id];
  const COL_HEADS = ["What you're doing", "What you create", "What you track", "Your skill link"];

  return (
    <div className={`card ${open ? "open" : ""}`}>
      <div className="card-hd" onClick={() => setOpen(o => !o)}>
        <div className="card-top">
          <div className="card-name">{role.title}</div>
          <FitTag fit={role.fit} fc={role.fc} />
        </div>
        <div className="card-titles-row">
          <span className="title-chip">
            <span className="title-chip-label">Entry</span>
            {role.earlyTitle}
          </span>
          <span className="title-chip">
            <span className="title-chip-label">Mid</span>
            {role.midTitle}
          </span>
        </div>
        <div className="card-meta">
          <div className="meta-item">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>RGA</span>
            <Dots n={role.rga} />
          </div>
          {role.fld != null && (
            <div className="meta-item" title="Own It Score — how well this role trains skills you can take to freelance, products, or a creator business">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--lavender)" }}>Own It</span>
              <FreeDots n={role.fld} />
            </div>
          )}
          <div className="meta-item">
            <span className="meta-sal">{role.salary}</span>
          </div>
          {(role.timeline || role.retrain || role.condition) && (
            <div className="meta-item">
              <span className="meta-time">{role.timeline || role.retrain || role.condition}</span>
            </div>
          )}
        </div>
        <div className="expand-hint">{open ? "▲ collapse" : "▼ full breakdown"}</div>
      </div>

      {open && (
        <div className="card-body">
          {/* Day in the Life — YES roles only */}
          {scenario && (
            <div style={{ marginBottom: "4px" }}>
              <div
                onClick={e => { e.stopPropagation(); setShowDayInLife(v => !v); }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", borderRadius: "7px", padding: "10px 14px", marginBottom: showDayInLife ? "12px" : "0" }}
              >
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mint)", marginRight: "8px" }}>Day in the Life</span>
                  <span style={{ fontSize: "12px", color: "var(--text2)" }}>If you worked at {scenario.company} as {role.title}</span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--mint)" }}>{showDayInLife ? "▲" : "▼"}</span>
              </div>

              {showDayInLife && (
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.6", padding: "10px 14px", background: "var(--surface2)", borderRadius: "6px", marginBottom: "12px", borderLeft: "3px solid var(--mint)" }}>
                    {scenario.context}
                  </div>
                  {/* Schedule */}
                  {SCHED[role.id] && (
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                        <span>Typical Tuesday — Hour by Hour</span>
                        <span style={{ display: "flex", gap: "10px" }}>
                          {Object.entries(SCHED_COLORS).map(([key, sc]) => (
                            <span key={key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sc.dot, flexShrink: 0, display: "inline-block" }} />
                              <span style={{ color: "var(--muted2)", letterSpacing: "0.1em" }}>{sc.label}</span>
                            </span>
                          ))}
                        </span>
                      </div>
                      {SCHED[role.id].map((block, i) => {
                        const sc = SCHED_COLORS[block.type];
                        return (
                          <div key={i} style={{ display: "flex", gap: "12px", padding: "7px 10px", background: sc.bg, border: `1px solid ${sc.bd}`, borderRadius: "5px", marginBottom: "4px", alignItems: "flex-start" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: sc.dot, minWidth: "90px", flexShrink: 0, paddingTop: "2px" }}>{block.time}</span>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sc.dot, flexShrink: 0, marginTop: "5px" }} />
                            <span style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.5" }}>{block.activity}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Table */}
                  <div style={{ overflowX: "auto", borderRadius: "7px", border: "1px solid var(--border)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                      <thead>
                        <tr style={{ background: "var(--surface2)" }}>
                          {COL_HEADS.map(h => (
                            <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scenario.rows.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? "var(--surface)" : "var(--surface2)", borderBottom: i < scenario.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <td style={{ padding: "10px 12px", color: "var(--text)", lineHeight: "1.5", verticalAlign: "top", maxWidth: "220px" }}>{row.do}</td>
                            <td style={{ padding: "10px 12px", color: "var(--text2)", lineHeight: "1.5", verticalAlign: "top", maxWidth: "220px" }}>{row.create}</td>
                            <td style={{ padding: "10px 12px", color: "var(--text2)", lineHeight: "1.5", verticalAlign: "top", maxWidth: "200px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>{row.track}</td>
                            <td style={{ padding: "10px 12px", verticalAlign: "top", maxWidth: "160px" }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--mint)", background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", padding: "2px 7px", borderRadius: "3px", lineHeight: 1.6, display: "inline-block" }}>{row.skill}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="subsec-title">What you actually do daily</div>
            <ul className="blist">{role.daily.map((d, i) => <li key={i}>{d}</li>)}</ul>
          </div>
          <div>
            <div className="subsec-title">Metrics you're measured on</div>
            <ul className="blist">{role.metrics.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>
          <div>
            <div className="subsec-title">Revenue link (RGA)</div>
            <div className="rga-callout"><p>{role.rgaText}</p></div>
          </div>
          {role.fld != null && (() => {
            const fldLabels = {
              1: "Locked in. Skills stay inside the company. Hard to freelance or productize.",
              2: "Low. Niche freelance market exists but limited. Hard to build audience or products.",
              3: "Moderate. Skills are portable. Freelance or consulting possible with effort.",
              4: "Strong. Skills transfer well to clients, consulting, or creator business.",
              5: "Maximum. This role trains skills you fully own — audience, products, independence.",
            };
            const fldDotColor = role.fld >= 4 ? "var(--lavender)" : role.fld === 3 ? "var(--amber)" : "var(--muted)";
            return (
              <div>
                <div className="subsec-title" style={{ color: "var(--lavender)" }}>Own It Score — Independence Leverage</div>
                <div style={{ background: "var(--lav-bg)", border: "1px solid rgba(90,74,138,0.2)", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ flexShrink: 0 }}>
                    <FreeDots n={role.fld} />
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--lavender)", marginTop: "5px", letterSpacing: "0.1em" }}>{role.fld}/5</div>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.6", margin: 0 }}>{fldLabels[role.fld]}</p>
                </div>
              </div>
            );
          })()}
          <div>
            <div className="subsec-title">
              {type === "yes" ? "Why this fits Sidd" : type === "no" ? "Why this is wrong for Sidd" : "The condition"}
            </div>
            <div className={`why-callout ${wc}`}><p>{role.whyText || role.condition}</p></div>
          </div>
          {(role.takeIf || role.retrain) && (
            <div>
              <div className="subsec-title">{role.takeIf ? "Take if" : "Retrain cost"}</div>
              <span className="chip">{role.takeIf || role.retrain}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

function YesTab() {
  return (
    <div>
      <div className="whisper">
        <div className="whisper-icon">💬</div>
        <div>
          <div className="whisper-lbl">Whisper Test — from your Notion</div>
          <div className="whisper-txt">"I want to stop preparing and just go."</div>
        </div>
      </div>
      <DeckView roles={YES} type="yes" label="001 · Say Yes" desc="Every role uses 12–16 of your 27 skills. The top 4 are best fit. The Fractional role starts this week — Wedify is already client #1." />
      <div className="devils">
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>Every role on this list is a job that someone else controls. They can fire you, change the scope, or get acquired. The only roles where you own the asset are Fractional Creative Strategist and AI Content Strategist (creator path). The smart play: one job from the list for income and stability, while building the freelance/creator work on the side. That's your Two-Track System from the Ikigai doc. Both tracks have different RGA timelines and different ownership structures. Run them simultaneously.</p>
      </div>
    </div>
  );
}

function NoTab() {
  return (
    <div>
      <DeckView roles={NO} type="no" label="002 · Say No" desc="High demand does not equal right fit. These roles attract the most competition. You'd need 18–24 months to be competitive in most of them. You can get a Yes-role in 60 days." />
      <div className="devils">
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>The anti-role path isn't completely wrong. If you spent 18 months going deep on AI Engineering — specifically LLM fine-tuning — and paired it with your existing content and communication skills, you could become a rare hybrid that makes $250k+. BUT: that only works if you commit 100% for 18 months straight, stop creative projects, stop content, stop photography. You won't. That's not an insult — it's data from your own history. The hybrid path requires mono-focus you haven't demonstrated yet. Know yourself first.</p>
      </div>
    </div>
  );
}

function NeutralTab() {
  return (
    <div>
      <DeckView roles={NEUTRAL} type="neutral" label="003 · Conditional" desc="Not hard nos. Conditional — worth doing in specific circumstances only. Read the condition on each one carefully before applying." />
      <div className="devils">
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>Product Manager is the most underrated YES role on this list — it's marked Conditional because the path there requires going through PMM first. In 3 years, if you become a strong PMM at an AI company, the lateral to PM is natural, the salary jumps $30–40k, and you gain direct power over what gets built. This is Pathway 3 in corporate form. Don't ignore it entirely — just don't pursue it prematurely.</p>
      </div>
    </div>
  );
}

function VisionTab() {
  const lkMap = { strong: "lv-strong", build: "lv-build", proven: "lv-proven", natural: "lv-natural", early: "lv-early", weak: "lv-weak", course: "lv-course" };
  const ekMap = { now: "ex-now", emerging: "ex-emerging", future: "ex-future" };
  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">004 · 2030 Vision</div>
        <div className="sec-title">SKILLS THAT MATTER</div>
        <div className="sec-desc">AI is eating the bottom of the technical skill stack. The moat is growing for people who can direct AI, contextualize its output, communicate what it built, and convince humans to trust it. That's you.</div>
      </div>
      <div className="skills-grid">
        <div>
          <div className="col-title">The Obvious 5</div>
          {SKILLS_2030.obvious.map((s, i) => (
            <div key={i} className="sk">
              <div className="sk-top">
                <div className="sk-name">{s.n}</div>
                <span className={`sk-lv ${lkMap[s.lk]}`}>{s.lv}</span>
              </div>
              <div className="sk-desc">{s.d}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="col-title">The Non-Obvious 7</div>
          {SKILLS_2030.nonObvious.map((s, i) => (
            <div key={i} className="sk">
              <div className="sk-top">
                <div className="sk-name">{s.n}</div>
                <span className={`sk-lv ${lkMap[s.lk]}`}>{s.lv}</span>
              </div>
              <div className="sk-desc">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "36px" }}>
        <div className="sec-label" style={{ marginBottom: "8px" }}>Roles that will stand out by 2030</div>
        <div className="future-grid">
          {SKILLS_2030.future.map((r, i) => (
            <div key={i} className="future-card">
              <div className={`exists-tag ${ekMap[r.ek]}`}>{r.e}</div>
              <div className="future-name">{r.n}</div>
              <div className="future-desc">{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="devils" style={{ marginTop: "30px" }}>
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>"Soft skills" is a bad frame. It implies secondary. The better frame is JUDGMENT SKILLS — the ability to make good decisions with incomplete information in front of other humans. Those are going up in value, not down. AI has no skin in the game. You do. That asymmetry is durable. You were accidentally building the right skills for the AI era while everyone else was trying to learn Python.</p>
      </div>
    </div>
  );
}

function TableTab() {
  const [f, setF] = useState("all");
  const rows = f === "all" ? ALL_TABLE
    : f === "yes"     ? ALL_TABLE.filter(r => r.cat.startsWith("✅"))
    : f === "no"      ? ALL_TABLE.filter(r => r.cat.startsWith("❌"))
    : ALL_TABLE.filter(r => r.cat.startsWith("⚠️"));

  const catColor = c => c.startsWith("✅") ? "var(--mint)" : c.startsWith("❌") ? "var(--rose)" : "var(--amber)";

  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">005 · Full Map</div>
        <div className="sec-title">ALL 26 ROLES</div>
        <div className="sec-desc">Every role ranked. No ambiguity. Print this, show your dad the table, and stop entertaining the anti-roles.</div>
      </div>
      <div className="filter-row">
        {[["all","All 26"],["yes","Yes (10)"],["neutral","Neutral (6)"],["no","No (10)"]].map(([id, lbl]) => (
          <button key={id} className={`fbtn ${f === id ? "on" : ""}`} onClick={() => setF(id)}>{lbl}</button>
        ))}
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Role</th>
              <th>Entry Title (Market)</th>
              <th>Category</th>
              <th>RGA</th>
              <th>Salary</th>
              <th>Take if</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="tbl-name">{r.t}</td>
                <td className="tbl-titles">{r.early}</td>
                <td className="tbl-cat" style={{ color: catColor(r.cat) }}>{r.cat}</td>
                <td className="tbl-rga">{r.rga}</td>
                <td className="tbl-sal">{r.sal}</td>
                <td className="tbl-take">{r.take}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── AI TOOLKIT DATA ──────────────────────────────────────────────────────────

const CRAFT_SKILLS = [
  {
    cat: "Tier 1 — Core Craft",
    color: "mint",
    icon: "★",
    desc: "The skills that show up most naturally. What friends notice. What gets complimented unprompted.",
    skills: [
      { name: "clarity",    label: "Translating Complexity → Clarity",  proof: "CliftonStrengths: 4/5 Strategic Thinking themes. What friends literally say: 'I don't know how you think about things but how you explain it is so different.'", tools: [] },
      { name: "writing",    label: "Writing & Long-Form Thinking",       proof: "Proposals, educational email courses, strategy docs, persuasive business communication. Entropy Studios ghostwriting. The Wedify proposal closed attention.", tools: [] },
      { name: "systems",    label: "Systems Architecture",               proof: "Notion operating systems, n8n/Make automation workflows, SOPs, production pipelines. Built AI automation stack at Wayfair externship.", tools: ["Notion", "n8n", "Make"] },
      { name: "frameworks", label: "Framework Creation",                 proof: "Vetting Scorecard, Weekly OS, role targeting matrix, content repurposing system — I turn learning into reusable tools others can run.", tools: [] },
      { name: "research",   label: "Deep Research & Synthesis",          proof: "MSBA-trained. Pull signal from noise across any domain fast. Built competitive intelligence dashboards at Wayfair. 'Go deep' is the default mode.", tools: ["Power BI", "SQL"] },
      { name: "taste",      label: "Curation & Taste",                   proof: "VIA Character Strength #1: Appreciation of Beauty & Excellence. Strong aesthetic eye across visual design, writing, and information architecture.", tools: [] },
    ]
  },
  {
    cat: "Tier 2 — Growing Edge",
    color: "amber",
    icon: "↗",
    desc: "Real skills with real proof. Public track record still building — that's the only gap.",
    skills: [
      { name: "video",       label: "Video Editing & Production",         proof: "DaVinci Resolve, filming, shooting. Genuine flow state — time disappears. Motion design bootcamp completed. Public proof still catching up to private skill.", tools: ["DaVinci Resolve", "Final Cut Pro"] },
      { name: "automation",  label: "AI Automation & Tooling",            proof: "Power user: built n8n and Make automation workflows at Wayfair that replaced manual research processes. Active on Claude Code, Relevance.ai, Lindy.", tools: ["n8n", "Make", "Lindy", "Claude Code", "Relevance.ai"] },
      { name: "competitive", label: "Competitive Analysis & Market Intel", proof: "Accenture consulting background (client-facing delivery) + Wedify market landscape analysis + Wayfair intelligence dashboards for category teams.", tools: ["Power BI", "Figma"] },
      { name: "data",        label: "Data Analysis & Visualization",       proof: "UT Austin MSBA + Accenture executive Power BI dashboards for a $200M data platform. Trained, capable, not a passion lane — honest about that.", tools: ["Power BI", "SQL", "Python"] },
      { name: "photo",       label: "Photography",                         proof: "Strong compositional eye. Trending toward professional quality. Eye for light, subject, and story in a single frame.", tools: [] },
      { name: "dots",        label: "Connecting Dots Across Domains",      proof: "CliftonStrengths #1: Connectedness. I see patterns others miss because I read across fields — AI, education, design, strategy, philosophy — simultaneously.", tools: [] },
    ]
  },
  {
    cat: "Tool Stack",
    color: "slate",
    icon: "⚙",
    desc: "Tools I actively use — not tools I've heard of. Each one has real reps behind it.",
    skills: [
      { name: "automation-tools", label: "Automation & Workflow Builders", proof: "Production-level experience: built live workflows at Wayfair that shipped to real use cases. Daily use for content and research pipelines.", tools: ["n8n", "Make", "Lindy"] },
      { name: "ai-tools",        label: "AI Agents & LLM Platforms",       proof: "Claude Code daily. Relevance.ai for agent chains. Cowork for agentic file/task work. Not a tourist — these are working tools.", tools: ["Claude Code", "Relevance.ai", "Cowork"] },
      { name: "video-tools",     label: "Video Production Suite",           proof: "DaVinci Resolve for editing (color grading, cut, audio). Final Cut Pro. Motion bootcamp trained. Real hours in the chair.", tools: ["DaVinci Resolve", "Final Cut Pro"] },
      { name: "data-tools",      label: "Data & Analytics Stack",           proof: "UT Austin MSBA coursework + Accenture client-facing delivery. Comfortable and capable, not passionate.", tools: ["Power BI", "SQL", "Python"] },
      { name: "ops-tools",       label: "Knowledge & Design Ops",           proof: "Notion OS architecture — my own system manages life, content, and job search. Figma for visual communication and systems mapping.", tools: ["Notion", "Figma"] },
    ]
  },
  {
    cat: "Honest Gaps",
    color: "rose",
    icon: "△",
    desc: "0 out of 5 CliftonStrengths in Executing. 0 out of 5 in Influencing. These are real constraints, not excuses.",
    skills: [
      { name: "execution",   label: "Consistent Execution & Shipping",     proof: "0/5 Clifton Executing themes. Planning, ideating, strategizing — strong. Sustained shipping without external structure — the real gap. Fix: weekly deliverable system, not motivation.", tools: [] },
      { name: "influence",   label: "Initiating Toward People",            proof: "0/5 Clifton Influencing themes. Initiating toward people is the weakest muscle — not introversion, just low instinct. Fix: deliberate cold outreach practice, fractional client work, CSM context.", tools: [] },
      { name: "self-promo",  label: "Self-Promotion & Visibility",          proof: "Can promote others naturally and enthusiastically. Promoting myself feels performative. Fix: reframe promotion as service — the right people need to find you or they go without.", tools: [] },
    ]
  },
];

// ─── DREAM 100 TAB ────────────────────────────────────────────────────────────

const D100_STEPS = [
  {
    n: "01", label: "Build the List",
    color: "mint",
    what: "25 target companies × 4 contacts each = 100 people. At each company: 1 hiring manager, 2 team members (future peers), 1 connector (senior adjacent). Skip recruiters — that's what everyone else does.",
    action: "Open your Yes Roles tab. Pick your top 10 companies. Find 4 people at each using LinkedIn. Log them.",
    time: "2–3 hrs once",
  },
  {
    n: "02", label: "Warm Up (No Ask Yet)",
    color: "sage",
    what: "2–3 weeks of genuine engagement before any cold message. Follow on LinkedIn. Like and comment on their posts with real insight — not 'Great post!' Become a familiar name before you're a stranger asking for something.",
    action: "For each contact: follow → engage with 3–5 posts over 2 weeks → note what they care about. This is research, not performance.",
    time: "15–20 min/day for 2–3 weeks",
  },
  {
    n: "03", label: "Value-First Opening",
    color: "amber",
    what: "First message asks for nothing. Reference something specific — a post, a project, a quote from their interview. Give before you take. The bar is low because everyone else leads with 'Can you refer me?'",
    action: "Write one message per contact. Cite something specific. End with an open question about their work, not a job ask.",
    time: "15 min per message",
  },
  {
    n: "04", label: "Proof of Work Drop",
    color: "slate",
    what: "This is Belcak's real differentiator. Create something for the company — a content gap audit, competitor teardown, positioning analysis, product critique. Send it as a gift. It proves your skills AND gives them value. Nobody else does this.",
    action: "Use your Tier 1 skill (Translating complexity → clarity) to build one Proof of Work per target company. A 1-pager. A loom video. A framework doc. Doesn't need to be long — needs to be specific and sharp.",
    time: "2–3 hrs per Proof of Work",
  },
  {
    n: "05", label: "The Referral Ask",
    color: "lavender",
    what: "Only after 2–3 real exchanges. Ask to learn about their experience on the team — not for a referral directly. If the conversation is warm, the referral offer will come naturally. Team referrals turn you from an application into a pre-vetted candidate.",
    action: "'I'm actively exploring roles at [Company] and our conversations have made me more excited about the team. Would you be open to a 20-min chat about what it's like there?' Send this only once the relationship is real.",
    time: "Send when warm",
  },
  {
    n: "06", label: "Track & Follow Up",
    color: "rose",
    what: "70% will ghost. That's the process, not a failure. Track every contact: Cold → Warming → Replied → In Convo → Referred → Applied. Follow up once after no response (7 days). Then move on and use your buffer contacts.",
    action: "Build a simple tracker: Company / Contact / Title / Status / Last Touch / Next Step. Update it weekly. The system beats motivation every time.",
    time: "30 min/week to maintain",
  },
];

const D100_POW = [
  {
    role: "PMM / Content Marketing Manager",
    idea: "Content Gap Audit",
    what: "Pull their last 20 blog posts. Identify 5 topics competitors cover that they don't. Show the traffic opportunity for each. Deliver as a 1-page doc with a clear header: 'Content Gaps I Found at [Company].' Takes 2 hours. Nobody does this.",
    skill: "Deep research + Translating complexity → clarity",
    format: "1-page PDF or Notion doc",
  },
  {
    role: "AI Content Strategist",
    idea: "AI Content Workflow Teardown",
    what: "Map their current public content cadence. Identify where AI could cut production time (repurposing, research, first drafts). Deliver a 5-step workflow showing exactly how. Your n8n and Make experience makes this credible, not theoretical.",
    skill: "Systems architecture + AI automation",
    format: "Visual workflow + short write-up",
  },
  {
    role: "Creative Strategist / Brand",
    idea: "Positioning + Messaging Critique",
    what: "Audit their homepage, About page, and 3 recent LinkedIn posts. Identify 3 places where the message is unclear or inconsistent. Rewrite each one. Show before/after. This is the single highest-value deliverable for any marketing role.",
    skill: "Writing + Translating complexity → clarity + Curation & taste",
    format: "Side-by-side doc, 1–2 pages",
  },
  {
    role: "Developer Advocate / Customer Education",
    idea: "Competitor Docs Comparison",
    what: "Pick their 2 main competitors. Compare their developer docs or knowledge base against the company's. Where is the competitor clearer? Where is there a feature explanation gap? Deliver as a table with specific improvement suggestions.",
    skill: "Deep research + Framework creation",
    format: "Comparison table + written summary",
  },
  {
    role: "Fractional Strategist / AI Solutions Consultant",
    idea: "The Quick Win Audit",
    what: "Research their tech stack (job postings, LinkedIn, G2 reviews). Identify one process that's almost certainly manual that AI automation could fix. Write a 1-page brief: 'Here's a problem I spotted, here's the solution, here's what it would take.' Shows you think like a consultant from day one.",
    skill: "AI automation + Competitive analysis + Systems architecture",
    format: "1-page brief / Notion page",
  },
];

const D100_MATH = [
  { label: "Contacts Targeted", n: "100", sub: "25 companies × 4 people" },
  { label: "Expected Replies", n: "~30", sub: "70% ghost rate is normal" },
  { label: "Real Conversations", n: "~15", sub: "half of replies go somewhere" },
  { label: "Referrals Generated", n: "5–8", sub: "from warm conversations" },
  { label: "First-Round Interviews", n: "2–3", sub: "referrals bypass the ATS" },
  { label: "Target: One Offer", n: "1", sub: "that's all you need" },
];

function Dream100Tab() {
  const [step, setStep] = useState(null);
  const [pow, setPow] = useState(null);
  const C = TK_COLORS;

  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">007 · Dream 100 · Austin Belcak Method</div>
        <div className="sec-title">NETWORK INTO THE <em style={{ fontStyle: "normal", color: "var(--mint)" }}>JOB</em></div>
        <div className="sec-desc">40–80% of roles are filled through referrals, never posted publicly. The Dream 100 forces you to build real relationships at 25 target companies before a role opens. Six steps. One system. Built specifically around your Tier 1 skills as the Proof of Work.</div>
      </div>

      {/* Math Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px 20px" }}>
        {D100_MATH.map((m, i) => (
          <div key={m.label} style={{ textAlign: "center", borderRight: i < 5 ? "1px solid var(--border)" : "none", paddingRight: i < 5 ? "10px" : 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, color: "var(--mint)", lineHeight: 1 }}>{m.n}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginTop: "4px" }}>{m.label}</div>
            <div style={{ fontSize: "10px", color: "var(--muted2)", marginTop: "2px" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* 6-Step System */}
      <div style={{ marginBottom: "8px" }}>
        <div className="sec-label" style={{ marginBottom: "14px" }}>The 6-Step System</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {D100_STEPS.map((s) => {
            const c = C[s.color] || C.mint;
            const isOpen = step === s.n;
            return (
              <div key={s.n} style={{ background: "var(--surface)", border: `1px solid var(--border)`, borderRadius: "10px", overflow: "hidden" }}>
                <div onClick={() => setStep(isOpen ? null : s.n)} style={{ padding: "15px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: c.accent, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: "4px", padding: "3px 9px", flexShrink: 0 }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>{s.label}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted2)", background: "var(--surface2)", padding: "2px 7px", borderRadius: "3px", flexShrink: 0 }}>{s.time}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted2)" }}>{isOpen ? "▲" : "▼"}</div>
                </div>
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>What & Why</div>
                      <div style={{ fontSize: "12.5px", color: "var(--text2)", lineHeight: "1.65" }}>{s.what}</div>
                    </div>
                    <div style={{ background: c.bg, border: `1px solid ${c.bd}`, borderRadius: "7px", padding: "14px" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent, marginBottom: "6px" }}>Your Action</div>
                      <div style={{ fontSize: "12.5px", color: "var(--text)", lineHeight: "1.65" }}>{s.action}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Proof of Work ideas */}
      <div style={{ marginTop: "32px" }}>
        <div className="sec-label" style={{ marginBottom: "6px" }}>Proof of Work — By Your Yes Roles</div>
        <div style={{ fontSize: "12.5px", color: "var(--text2)", lineHeight: "1.6", marginBottom: "16px", maxWidth: "640px" }}>These are the deliverables to build for Step 4. Each one is designed around your Tier 1 skills — you already have the ability, you just need to aim it at a specific company.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "12px" }}>
          {D100_POW.map((p) => (
            <div key={p.role} onClick={() => setPow(pow === p.role ? null : p.role)} style={{ background: "var(--surface)", border: `1px solid ${pow === p.role ? "var(--mint-bd)" : "var(--border)"}`, borderRadius: "10px", padding: "16px 18px", cursor: "pointer", transition: "border-color 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mint)" }}>{p.role}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted2)", background: "var(--surface2)", padding: "2px 6px", borderRadius: "3px" }}>{p.format}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "6px" }}>{p.idea}</div>
              <div style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>Skill: {p.skill}</div>
              {pow === p.role && (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "12.5px", color: "var(--text2)", lineHeight: "1.65" }}>{p.what}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tracker template */}
      <div style={{ marginTop: "32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px 24px" }}>
        <div className="sec-label" style={{ marginBottom: "10px" }}>Tracker — Copy This Into Notion</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", background: "var(--border)", borderRadius: "6px", overflow: "hidden", fontSize: "10px", fontFamily: "var(--font-mono)" }}>
          {["Company", "Contact", "Title", "Status", "Last Touch", "Next Step", "Proof of Work"].map(h => (
            <div key={h} style={{ background: "var(--surface2)", padding: "8px 10px", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "9px" }}>{h}</div>
          ))}
          {["Acme AI", "Jane Lee", "Sr. PMM", "Warming", "Apr 7", "Comment on post", "Content Gap Audit"].map((v, i) => (
            <div key={i} style={{ background: "var(--surface)", padding: "8px 10px", color: "var(--text2)" }}>{v}</div>
          ))}
          {["...", "...", "...", "Cold", "—", "Build list", "—"].map((v, i) => (
            <div key={i} style={{ background: "var(--surface)", padding: "8px 10px", color: "var(--muted2)" }}>{v}</div>
          ))}
        </div>
        <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          Status stages: Cold → Warming → Replied → In Convo → Referred → Applied → Offer
        </div>
      </div>

      <div className="devils" style={{ marginTop: "28px" }}>
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>The Dream 100 fails for one reason: people do Steps 1–3 and skip Step 4. They warm up contacts, send a polite message, then ask for a referral too early — and wonder why it doesn't work. <strong style={{ color: "var(--text)" }}>The Proof of Work is non-negotiable.</strong> It's the only step nobody else does. Your Tier 1 skill is Translating Complexity into Clarity — that IS the Proof of Work. A positioning teardown, a content audit, a competitive brief. You already have the skill. The only question is whether you'll spend 3 hours building the artifact before you ask for anything.</p>
      </div>
    </div>
  );
}

// ─── CRAFT SKILLS TAB ─────────────────────────────────────────────────────────

const TK_COLORS = {
  mint:     { accent: "var(--mint)",     bg: "var(--mint-bg)",  bd: "var(--mint-bd)" },
  sage:     { accent: "var(--sage)",     bg: "var(--sage-bg)",  bd: "rgba(58,107,74,0.2)" },
  amber:    { accent: "var(--amber)",    bg: "var(--amber-bg)", bd: "var(--amber-bd)" },
  slate:    { accent: "var(--slate)",    bg: "var(--slate-bg)", bd: "rgba(58,94,138,0.2)" },
  lavender: { accent: "var(--lavender)", bg: "var(--lav-bg)",   bd: "rgba(90,74,138,0.2)" },
  rose:     { accent: "var(--rose)",     bg: "var(--rose-bg)",  bd: "var(--rose-bd)" },
};

function ToolkitTab() {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = search.trim()
    ? CRAFT_SKILLS.map(c => ({ ...c, skills: c.skills.filter(s => s.label.toLowerCase().includes(search.toLowerCase()) || s.proof.toLowerCase().includes(search.toLowerCase())) })).filter(c => c.skills.length)
    : CRAFT_SKILLS;
  const tier1 = CRAFT_SKILLS[0].skills.length;
  const tier2 = CRAFT_SKILLS[1].skills.length;

  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">006 · Craft Skills</div>
        <div className="sec-title">YOUR SKILL STACK</div>
        <div className="sec-desc">{tier1} Tier 1 core skills. {tier2} Tier 2 growing-edge skills. Each one sourced from Notion — real proof, not inventory. The gaps are listed too, because that's how you fix them.</div>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: "420px",
            background: "var(--surface)", border: "1px solid var(--border2)",
            borderRadius: "6px", padding: "9px 14px",
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "var(--text)", outline: "none",
            transition: "border-color 0.15s",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((cat) => {
          const c = TK_COLORS[cat.color] || TK_COLORS.mint;
          const isOpen = active === cat.cat;
          return (
            <div key={cat.cat} style={{ background: "var(--surface)", border: `1px solid var(--border)`, borderRadius: "10px", overflow: "hidden" }}>
              <div
                onClick={() => setActive(isOpen ? null : cat.cat)}
                style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                  <div style={{ width: "3px", height: "36px", background: c.accent, borderRadius: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>{cat.cat}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: c.accent }}>{cat.icon}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>{cat.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: c.bg, color: c.accent, border: `1px solid ${c.bd}`, borderRadius: "3px", padding: "2px 8px" }}>
                    {cat.skills.length} skills
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted2)" }}>{isOpen ? "▲" : "▼"}</div>
                </div>
              </div>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "10px" }}>
                    {cat.skills.map(s => (
                      <div key={s.name} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "7px" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.accent, flexShrink: 0, marginTop: "5px" }} />
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{s.label}</div>
                        </div>
                        <div style={{ fontSize: "11.5px", color: "var(--text2)", lineHeight: "1.6", paddingLeft: "14px" }}>{s.proof}</div>
                        {s.tools.length > 0 && (
                          <div style={{ marginTop: "9px", paddingLeft: "14px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {s.tools.map(t => (
                              <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: c.accent, background: c.bg, border: `1px solid ${c.bd}`, padding: "2px 7px", borderRadius: "3px" }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="devils" style={{ marginTop: "28px" }}>
        <div className="devils-title">😈 Devil's Advocate</div>
        <p>You have {tier1} Tier 1 skills and 0 Executing themes. That means you plan and synthesize better than almost anyone — and ship less consistently than you should. The highest-leverage move right now isn't adding skills, it's <strong style={{ color: "var(--text)" }}>turning Translating Complexity into one public artifact per week</strong>. A LinkedIn post. A newsletter issue. A video. One thing that didn't exist before. The skill is already there. The output isn't. That's the gap to close.</p>
      </div>
    </div>
  );
}

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────

const PROFILE = {
  identity: "AI Storyteller / The Translator",
  ikigai: "I learn hard things, make them simple and beautiful, then teach them to people who were where I was 6 months ago — through video, writing, and systems I build. I get paid to do this for companies as a product marketer, and I do it for myself as a creator.",
  whisper: "I want to be the person someone watches on YouTube and thinks 'he changed how I see this.' I want to make beautiful things that make people feel something. I want to stop preparing and just go.",
  why: "Everyone has something important inside them that the world needs to hear — but most people can't get it out because it's too messy, too complex, or too buried. I exist to be the person who pulls it out, gives it shape, and makes it land.",
  pitches: [
    { label: "Job Applications", text: "Product professional with ~3 years across data & AI consulting, product strategy, and creative content. My core skill is translating complex things into stories, systems, and content that make people act. Looking for a role where that translation skill is the job — not a side effect." },
    { label: "Networking", text: "I'm an AI storyteller — I take complex tech and business ideas and turn them into content, systems, and strategies that actually make sense to people. I'm looking for my next role in product marketing or creative strategy at an AI or SaaS company." },
    { label: "Freelance/Creator", text: "I help startups and founders turn their messy product knowledge into clear content, positioning, and growth systems. Think: the person who makes your complicated thing make sense to the market." },
  ],
  strengths: {
    tier1: [
      { name: "Translating complexity into clarity", note: "CliftonStrengths: 4/5 Strategic Thinking. What friends literally say: 'I don't know how you think and how you explain it is so different.'" },
      { name: "Writing", note: "Proposals, educational content, strategy docs, persuasive business communication. The Wedify proposal alone is proof." },
      { name: "Systems architecture", note: "Notion operating systems, workflows, frameworks, SOPs, production pipelines." },
      { name: "Framework creation", note: "Vetting Scorecard, Weekly OS, role targeting matrix — I turn learning into reusable tools." },
      { name: "Deep research & synthesis", note: "I go deep on anything and pull out what matters." },
      { name: "Curation & taste", note: "VIA Strength #1: Appreciation of Beauty & Excellence — strong aesthetic eye across visual and informational design." },
    ],
    tier2: [
      { name: "Video editing & production", note: "DaVinci Resolve, filming, shooting. Real flow state skill. Public proof still catching up." },
      { name: "AI tooling & automation", note: "Power user: n8n, Make, Lindy, Claude Code, Relevance.ai." },
      { name: "Competitive analysis & market research", note: "Accenture consulting + Wedify landscape + Wayfair intelligence dashboards." },
      { name: "Data analysis & visualization", note: "MSBA + Accenture + Power BI + SQL + Python. Trained. Not passion lane." },
      { name: "Learning speed", note: "MSBA, PM cert, 8 AI certs, Motion Bootcamp, 100+ courses." },
      { name: "Connecting dots across domains", note: "CliftonStrengths #1: Connectedness. I see patterns others miss." },
      { name: "Photography", note: "Strong, trending toward professional." },
    ],
    gaps: [
      { name: "Executing consistently", note: "0 out of 5 Clifton Executing themes. Planning, ideating, strategizing — strong. Shipping — the gap. Fix: weekly deliverable system, not motivation." },
      { name: "Influencing & networking", note: "0 out of 5 Clifton Influencing themes. Initiating toward people is the weakest muscle. Fix: CSM, fractional work, or deliberate cold outreach practice." },
      { name: "Self-promotion", note: "Can promote others naturally. Promoting myself feels uncomfortable. Fix: reframe promotion as service — the right people need to find you." },
    ]
  },
  strengths_themes: ["Learner", "Input", "Connectedness", "Futuristic", "Context"],
  experience: [
    { company: "Accenture", role: "Data & AI Consultant", note: "Built executive Power BI dashboards for a $200M data platform. Client-facing delivery. GenAI Community Facilitator." },
    { company: "Avolv", role: "Product Architecture Externship", note: "Product strategy and roadmapping work." },
    { company: "TikTok", role: "Brand Strategy Externship", note: "Built brand playbook — positioning, messaging, content strategy." },
    { company: "Wayfair", role: "AI Automation Externship", note: "Built AI-powered automation workflows. Intelligence dashboards. n8n/Make stack." },
    { company: "Prescene.ai", role: "Product Marketing Externship", note: "PMM work — positioning, go-to-market, customer discovery." },
    { company: "Entropy Studios", role: "Owner", note: "Ghostwriting educational email courses for media entrepreneurs. Newsletter. Content creation." },
  ],
  education: [
    { school: "University of Texas at Austin", degree: "MS Business Analytics (MSBA)", note: "Data science, machine learning, analytics strategy" },
    { school: "UT Austin / Exec Program", degree: "Executive Product Management Certificate", note: "Product strategy, roadmapping, user research" },
    { school: "SAP", degree: "Certified in Business AI + Data Cloud", note: "Enterprise AI application" },
    { school: "LinkedIn Learning", degree: "102 Certifications", note: "AI, UX, Product, Marketing, Content — full stack" },
  ],
  pathways: [
    { n: "Pathway 1", label: "Corporate Stability + Creative Side", desc: "Traditional role (SAP Consulting, UX, Data) with creative outlets nights/weekends. Safe. Constrained." },
    { n: "Pathway 2", label: "Hybrid Professional", desc: "Mix of consulting/freelance + personal brand building. Balanced bridge to Pathway 3. Current operating plan." },
    { n: "Pathway 3 ★", label: "Creator & Digital Business (Aspired)", desc: "Full creator: YouTube, newsletter, digital products, AI consulting, nomadic lifestyle. Max freedom. Max alignment. Needs 12–24 months of bridge work first." },
  ]
};

function ProfileTab() {
  const [section, setSection] = useState("identity");
  const sections = [
    ["identity", "Identity"],
    ["skills", "Skills Map"],
    ["experience", "Experience"],
    ["strengths", "CliftonStrengths"],
    ["pathways", "Odyssey Plans"],
  ];

  return (
    <div>
      <div className="sec-header">
        <div className="sec-label">000 · My Profile</div>
        <div className="sec-title">WHO YOU ARE</div>
        <div className="sec-desc">Pulled live from Notion (March–April 2026). This is the source data behind every role decision in this system.</div>
      </div>

      {/* Section Nav */}
      <div className="filter-row" style={{ marginBottom: "24px" }}>
        {sections.map(([id, lbl]) => (
          <button key={id} className={`fbtn ${section === id ? "on" : ""}`} onClick={() => setSection(id)}>{lbl}</button>
        ))}
      </div>

      {section === "identity" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Identity Box */}
          <div style={{ background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", borderRadius: "10px", padding: "22px 24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mint)", marginBottom: "8px" }}>Core Identity</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.1, marginBottom: "14px" }}>{PROFILE.identity}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text2)", lineHeight: 1.7, fontStyle: "italic", borderLeft: "3px solid var(--mint)", paddingLeft: "16px" }}>"{PROFILE.ikigai}"</div>
          </div>

          {/* WHY */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px 22px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "8px" }}>Golden Circle WHY (Simon Sinek)</div>
            <div style={{ fontSize: "14px", color: "var(--text2)", lineHeight: 1.65, fontStyle: "italic" }}>"{PROFILE.why}"</div>
          </div>

          {/* Whisper Test */}
          <div style={{ background: "var(--rose-bg)", border: "1px solid var(--rose-bd)", borderRadius: "10px", padding: "18px 22px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "8px" }}>2am Whisper Test — Raw Truth</div>
            <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.65, fontStyle: "italic" }}>"{PROFILE.whisper}"</div>
          </div>

          {/* Pitches */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px 22px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "14px" }}>How to Talk About Yourself</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {PROFILE.pitches.map((p, i) => (
                <div key={i} style={{ borderLeft: "3px solid var(--border2)", paddingLeft: "16px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mint)", marginBottom: "5px" }}>{p.label}</div>
                  <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.65 }}>"{p.text}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {section === "skills" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", borderRadius: "10px", padding: "16px 20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mint)", marginBottom: "10px" }}>Meta CraftSkills — Center of the Map (Powers Everything Else)</div>
            {["Strategic synthesis & sensemaking", "Decision framing & prioritization", "Future-oriented analysis"].map(s => (
              <div key={s} style={{ fontSize: "13px", color: "var(--text)", padding: "5px 0", borderBottom: "1px solid var(--mint-bd)" }}>• {s}</div>
            ))}
          </div>
          {[
            { label: "Data, Analytics & AI", color: "slate-bg", accent: "var(--slate)", items: ["Product analytics & metrics design", "Data storytelling & executive insights", "Experimentation & behavioral analysis", "Forecasting & predictive modeling", "AI-enabled product & workflow design", "AI automation & systems thinking (n8n, Make, Lindy, Claude Code, Relevance.ai)"] },
            { label: "Product, UX & Experience", color: "mint-bg", accent: "var(--mint)", items: ["Product strategy & roadmapping", "Customer discovery", "Competitive analysis", "UX research & experience optimization", "Service & learning experience design"] },
            { label: "Content Creation & Distribution", color: "amber-bg", accent: "var(--amber)", items: ["Content strategy & consistency systems", "Educational writing & clarity-first explanation", "Narrative framing for complex ideas", "Newsletter, email, long-form writing", "Knowledge → content translation", "Ghostwriting (thought leadership, email courses)"] },
            { label: "Visual Storytelling", color: "sage-bg", accent: "var(--sage)", items: ["Photography (strong, trending professional)", "Videography & video editing (DaVinci Resolve, Final Cut Pro)"] },
            { label: "Systems & Tools", color: "lav-bg", accent: "var(--lavender)", items: ["Notion operating system design", "Frameworks, SOPs, production pipelines", "AI workflow automation"] },
            { label: "Facilitation & Enablement", color: "rose-bg", accent: "var(--rose)", items: ["Cross-functional alignment", "Advisory facilitation (diagnosis → synthesis → recommendation)"] },
          ].map(cat => (
            <div key={cat.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px 20px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: cat.accent, marginBottom: "10px" }}>{cat.label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "6px" }}>
                {cat.items.map(item => (
                  <div key={item} style={{ fontSize: "12px", color: "var(--text2)", padding: "5px 8px", background: "var(--surface2)", borderRadius: "5px", borderLeft: `2px solid ${cat.accent}` }}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {section === "experience" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {PROFILE.experience.map((e, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px 22px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--border2)", lineHeight: 1, minWidth: "36px" }}>0{i+1}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "3px" }}>{e.company}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mint)", marginBottom: "8px" }}>{e.role}</div>
                <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.6 }}>{e.note}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>Education & Credentials</div>
            {PROFILE.education.map((e, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 18px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>{e.degree}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--mint)", marginBottom: "5px" }}>{e.school}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>{e.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "strengths" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", borderRadius: "10px", padding: "16px 20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mint)", marginBottom: "10px" }}>CliftonStrengths Top 5 (All Strategic Thinking Domain)</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {PROFILE.strengths_themes.map(t => (
                <div key={t} style={{ background: "var(--mint-bg)", border: "1px solid var(--mint-bd)", borderRadius: "6px", padding: "6px 14px", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--mint)" }}>{t}</div>
              ))}
            </div>
            <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--muted)" }}>0 out of 5 Executing themes · 0 out of 5 Influencing themes — the known gaps, not weaknesses</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>Tier 1 — Defining Skills (What Makes You You)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {PROFILE.strengths.tier1.map((s, i) => (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 18px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{s.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.55 }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>Tier 2 — Solid & Proven</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "8px" }}>
              {PROFILE.strengths.tier2.map((s, i) => (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 16px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "3px" }}>{s.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.55 }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--amber-bg)", border: "1px solid var(--amber-bd)", borderRadius: "10px", padding: "16px 20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "10px" }}>Honest Gaps — These Are Not Weaknesses, They Are Training Targets</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PROFILE.strengths.gaps.map((g, i) => (
                <div key={i} style={{ borderLeft: "3px solid var(--amber-bd)", paddingLeft: "14px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "3px" }}>{g.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--text2)", lineHeight: 1.55 }}>{g.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {section === "pathways" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="whisper">
            <div className="whisper-icon">🧭</div>
            <div>
              <div className="whisper-lbl">Odyssey Plans — Stanford Life Design Methodology</div>
              <div className="whisper-txt">Three 5-year futures. All roads share: freedom, creativity, community, financial independence. The question is sequencing, not destination.</div>
            </div>
          </div>
          {PROFILE.pathways.map((p, i) => (
            <div key={i} style={{ background: i === 2 ? "var(--mint-bg)" : "var(--surface)", border: `1px solid ${i === 2 ? "var(--mint-bd)" : "var(--border)"}`, borderRadius: "10px", padding: "20px 24px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: i === 2 ? "var(--mint)" : "var(--muted)", marginBottom: "6px" }}>{p.n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>{p.label}</div>
              <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.65 }}>{p.desc}</div>
            </div>
          ))}
          <div className="devils">
            <div className="devils-title">😈 Devil's Advocate</div>
            <p>Pathway 3 is the answer you already know. The question is whether you're willing to treat Pathway 2 as a real bridge with a 12-month exit plan, or whether it becomes the permanent lifestyle. Most people who say "I'm building toward Path 3" are actually on Path 1 with better storytelling. The Monday Morning Test in your Ikigai doc is the truth detector: Did you create, apply, learn, and ship? Or did you plan to?</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("yes");
  const TABS = [
    { id: "profile", lbl: "My Profile",  cnt: null },
    { id: "yes",     lbl: "Yes Roles",   cnt: 10 },
    { id: "no",      lbl: "Anti-Roles",  cnt: 13 },
    { id: "neutral", lbl: "Conditional", cnt: 10 },
    { id: "vision",  lbl: "2030 Vision", cnt: null },
    { id: "table",   lbl: "Full Map",    cnt: 28 },
    { id: "toolkit", lbl: "Craft Skills", cnt: CRAFT_SKILLS.reduce((a, c) => a + c.skills.length, 0) },
    { id: "d100",    lbl: "Dream 100",   cnt: 6 },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT_IMPORT + css }} />
      <div>
        <header className="header">
          <div>
            <div className="eyebrow">Sidd Chauhan · AI Storyteller / The Translator · April 2026</div>
            <h1 className="h-title">ROLE <em>CLARITY</em> MAP</h1>
            <div className="h-sub">Accenture → TikTok → Wayfair → Prescene.ai · UT Austin MSBA + Exec PM · 102 certs · Ikigai: "I turn hard things into clear things — on camera, on a page, in a system."</div>
          </div>
          <div className="header-stats">
            <div className="stat"><div className="stat-n">10</div><div className="stat-l">Yes Roles</div></div>
            <div className="stat"><div className="stat-n">13</div><div className="stat-l">Hard Nos</div></div>
            <div className="stat"><div className="stat-n">10</div><div className="stat-l">Conditionals</div></div>
          </div>
        </header>
        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.lbl}
              {t.cnt && <span className="nav-cnt">{t.cnt}</span>}
            </button>
          ))}
        </nav>
        <main className="content">
          {tab === "profile" && <ProfileTab />}
          {tab === "yes"     && <YesTab />}
          {tab === "no"      && <NoTab />}
          {tab === "neutral" && <NeutralTab />}
          {tab === "vision"  && <VisionTab />}
          {tab === "table"   && <TableTab />}
          {tab === "toolkit" && <ToolkitTab />}
          {tab === "d100"    && <Dream100Tab />}
        </main>
      </div>
    </>
  );
}
