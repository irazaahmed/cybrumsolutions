@AGENTS.md

# Cybrum Solutions — Company Website

This repository is the **official company website for Cybrum Solutions**, an AI-native company founded and led by **Ahmed Raza** (Founder & CEO, company started December 2025). The goal is a professional, animated, single-page company website that brings in clients and builds brand authority.

> Communicate with the user (Ahmed Raza) in **Roman Urdu**. He is the founder, not a developer asking for tutorials — keep things decision-oriented.

---

## ⚠️ Critical build rule (read first)

This project runs **Next.js 16.2.7** + **React 19.2.4** + **Tailwind CSS v4** + **TypeScript 5**, App Router under `src/app/`. As `AGENTS.md` warns, this Next.js may differ from training data. **Before writing any Next.js / Tailwind v4 code, read the relevant guide in `node_modules/next/dist/docs/`.** Tailwind v4 is CSS-first config (no `tailwind.config.js` by default — config lives in `globals.css` via `@theme`). Do not assume Next 14/15 or Tailwind v3 conventions.

- Dev server: `npm run dev` · Build: `npm run build` · Lint: `npm run lint`
- Entry: `src/app/layout.tsx`, `src/app/page.tsx`, styles in `src/app/globals.css`

---

## Company facts

- **Name:** Cybrum Solutions
- **Founder/CEO:** Ahmed Raza (solo founder operating as an **orchestrator of an agentic AI workforce**)
- **Founded:** December 2025
- **What it does:** AI solutions — automation & AI agents, custom chatbots/assistants, web development
- **Model:** Services only (no products yet — keep a hidden/"Coming Soon" placeholder in structure)
- **Brand name story (elemental, the chosen one):** **Cybrum = "Cyber" + the suffix "-um"** (as in quantum, spectrum, forum). The suffix names a single foundational element, so Cybrum = the core building block of the intelligent digital world; for a client, the element that turns scattered tools and tasks into one intelligent system. **Company tagline (locked):** "One element. Every solution." (the element story pays off in this line; it is the single source-of-truth slogan in `site.ts`). Brand story closing line in the About section: "Cybrum Solutions: one element, every solution." NOTE: the old "Cyber + Brain / digital brain" story was rejected by Ahmed (he created Cybrum from "Cyber"); do not reintroduce it.

### Positioning (non-negotiable framing)
Ahmed is a **solo founder, but NEVER framed as "just one guy."** Frame him as an orchestrator directing an **agentic AI workforce** → delivers **team-level output** with one accountable builder. Message: *"One founder, an agentic team. End-to-end, directly accountable."* This avoids the "what if he's busy/sick" risk perception and matches AI-native philosophy.

### Differentiators ("Why Cybrum")
1. **AI-Native, not AI-Added** — AI is the foundation, not a bolted-on feature.
2. **End to End, One Partner** — architecture → deployment, one accountable builder, no juggling vendors.
3. **Systems That Actually Run** — real production automation, not demos that break. ("do the work, not just the demo.")

---

## Founder bio (for About section — sourced from irazaahmed.me)

- Founder & CEO of Cybrum Solutions; **AI Solutions Expert**.
- Islamic scholar — 8+ years as Assistant Shariah Advisor; **Team Lead Translation at Dawat-e-Islami** (managing 33-language Quran translation).
- Bridges Islamic scholarship with modern AI engineering. Motto: **"Execution Over Words."**
- Founder photo available at `public/ahmed.webp`.
- Languages: Urdu (native), Arabic (fluent), English (proficient).

---

## Brand & design system (company theme)

> ⚠️ **Two separate identities — never mix.** The **company** (this site) uses the **blue+black logo theme** below. Ahmed's **personal** portfolio (irazaahmed.me) uses a copper-orange theme — that is NOT for this site.

**Theme:** dark, premium, neutral (must look serious/premium to international clients AND approachable to local Pakistani businesses). Single-page scroll with smooth section animations.

**Colors (derived from the logo):**
| Token | Value (approx) | Use |
|-------|----------------|-----|
| Accent / primary | Royal-electric blue `#1B7FE0` | CTAs, links, highlights, glows |
| Background | Deep charcoal-black `#0B0E14` | Main dark canvas |
| Surface | Dark slate (logo's dark half) | Cards, sections |
| Text | Off-white / light gray | Body copy, headings |

*(Treat the hexes as a starting point; sample exact values from the logo PNGs during build and lock them as Tailwind `@theme` tokens.)*

**Logo assets:** source masters live in `assets/brand/` (`CS Logo With BG.png`, `CS Logo Without BG.png`, original `ahmed.png`); they are multi-MB and intentionally kept OUT of `public/`. The site serves the optimized variants: `public/logo-dark-theme.png`, `public/logo-light-theme.png`, `public/ahmed.webp`. The mark is an intricate geometric "C + S" — it can blur at small sizes, so pair logo + "Cybrum" wordmark in the navbar and plan a simplified favicon.

---

## Services (exactly 3 — do not add a 4th)

1. **Automation & AI Agents** — *primary / hero focus.* Multi-agent systems & automated pipelines that handle real tasks end to end.
2. **Custom Chatbots & Assistants** — domain-specific assistants with memory, tools, real knowledge (not generic wrappers).
3. **Web Development** — fast, modern, conversion-focused sites/apps on Next.js.

"AI Integration & Consulting" is **NOT a separate service** — it is folded in as the discovery/audit step in "How It Works".

**Tech trust strip:** Claude API · LangGraph · CrewAI · n8n · Next.js · Python.

---

## Site architecture (multi-page, since July 2026)

The site converted from a single-page scroll to a **multi-page structure** (Ahmed's decision, July 2026): the homepage is a condensed overview where every section teases and links to its dedicated route. Navbar and footer navigation are fully route-based (no anchor scrollspy). All pages share the same `Navbar` (BlogNav is a thin alias of it).

**Homepage sections (condensed):**
1. **Hero** — automation-focused headline + CTA to /contact; tech marquee
2. **Showcase** — company intro video
3. **Services** — 3 cards linking to /services/[slug]
4. **Why Cybrum** — 3 differentiators (core values stay on home)
5. **How It Works** — 4-step strip
6. **Work** — top 3 projects + "View all" → /work
7. **Testimonials** — client reviews
8. **About teaser** — founder photo + short story + "Read our story" → /about
9. **Products** — hidden / "Coming Soon" placeholder (structure only)
10. **CTA band** (`id="contact"` for legacy /#contact anchors) → /contact

**Dedicated routes:** `/services` + `/services/[slug]` (3 pages), `/work`, `/blog` (+ posts, langs), `/skills` (+ slugs), `/about` (full founder profile, stats, name story, values), `/contact` (gated AI Audit form + channels + Proof strip + FAQ with FAQPage schema), `/ai-automation-karachi`, `/ai-agency-pakistan`. All in sitemap with per-page metadata + breadcrumb JSON-LD.

### Approved hero copy (starting point)
- Headline: *"AI agents and automation that do the work, not just the demo."*
- Sub: *"Cybrum builds intelligent automation, AI agents, chatbots, and web systems that run real business workflows. Built end to end by an AI-native company."*
- CTA 1: **Book a Free AI Audit** · CTA 2: **See What We Build**

---

## Lead-gen & proof rules

- **CTA = "Book a Free AI Audit", GATED.** Use a qualifier form (e.g. name, email, business type, what they need / rough budget) so only **serious leads** come through. Do not leave it fully open.
- **Proof / Work section (updated June 2026, per Ahmed):**
  - Homepage shows the **top 3** projects only; the full list lives on the dedicated **/work** page ("View all projects" link).
  - Every project card has **two buttons: Live Site + GitHub** (live URLs in `src/lib/content.ts`).
  - Current 6 projects in order: Quran Translation Management System, Personal Professional Portfolio (irazaahmed.me), Physical AI & Humanoid Robotics, Nike E-Commerce, Saylani Impact Portal, InfoNest Blogs (last). **SMIT Virtual Assistant removed** at Ahmed's request.
  - Frame as **"What I've Built / Capabilities"**, NOT "client case studies" (honest — most aren't real client deployments yet).
  - Upgrade later with real client work / flagship agent demos.
  - The same pattern is mirrored on Ahmed's personal portfolio (`D:\Code\Portfolio-Project\portfolio-website`): top 3 on homepage + /projects page, copper theme.

---

## Audience & contact

- **Both** Pakistani local + international clients, weighted equally. Design stays neutral-premium so global clients take it seriously. English-only copy for now.
- **Contact channels:** WhatsApp **+923370292786** (display format **0337-0(292786) CYBRUM** — the last 6 digits spell CYBRUM; wa.me/923370292786, tel:+923370292786), LinkedIn **linkedin.com/in/irazaahmed**, GitHub **github.com/irazaahmed**, portfolio **irazaahmed.me**.
- Provide both a booking path (international) and WhatsApp (local) at the contact section.

---

## Working agreement

- Discuss/confirm before large structural changes; keep decisions consistent with the locked strategy above.
- Persistent project decisions are mirrored in the memory store (`cybrum-website-strategy`, `cybrum-brand-theme`, `founder-ahmed-raza`). Keep CLAUDE.md and memory in sync when decisions change.
