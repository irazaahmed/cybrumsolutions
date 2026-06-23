# Cybrum Solutions

The official website for **Cybrum Solutions**, an AI-native company that builds intelligent automation, AI agents, custom chatbots, and modern web systems for real business workflows.

**Live site:** [https://www.cybrumsolutions.dev/](https://www.cybrumsolutions.dev/)

This is a premium, animation-rich, single-page company website. It presents the brand to both local Pakistani and international clients, explains what the company does, shows the founder and the work, and gives serious leads a clear path to get in touch. It also ships with a built-in AI assistant and a working contact pipeline.

---

## What a visitor sees on the page

The site is a single scrolling page made of these sections, in order:

1. **Hero** with an animated AI "core" that orbits the company's capabilities, a rotating headline, and two calls to action.
2. **Trust strip** showing the technology stack (Claude API, LangGraph, CrewAI, n8n, Next.js, Python).
3. **Services** the three offerings: Automation and AI Agents, Custom Chatbots and Assistants, and Web Development.
4. **Why Cybrum** the three differentiators that explain the value.
5. **How It Works** the delivery process: Understand, Architect, Build and Deploy, Refine.
6. **Work / Capabilities** a selection of the strongest projects.
7. **About** the founder, the company background, and the meaning behind the name.
8. **Content hub** links out to the company's professional presence.
9. **Contact** a gated lead form plus a direct WhatsApp option.
10. **Footer** with brand, navigation, and contact links.

## Interactive features (the functions behind the site)

- **AI assistant chatbot** (bottom right): a floating chat widget that answers questions as the Cybrum Solutions assistant. It is backed by a language model and knows the company's services, process, work, and contact details.
- **Contact form**: a qualifier form (name, email, business type, needs) so only serious leads come through. Submissions are emailed to the company; if email is not configured, visitors still have the always-present WhatsApp button as a fallback.
- **Theme switch** (in the navbar): three options, **Light**, **Dark**, and **System**. The choice is saved and applied before the page paints so there is no flash. The logo automatically swaps to the right color version for each theme (blue and white on dark, blue and black on light).
- **Scroll-to-top button** (bottom left) with a circular progress ring that tracks how far the page has been scrolled.
- **Motion and visuals**: an animated neural-network background, floating glow effects, scroll reveals, a tech marquee, and cursor-reactive cards. All motion respects the operating system's "reduced motion" setting for accessibility.
- **Fully responsive**: the layout adapts cleanly to phones, tablets, and desktops.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animation | Framer Motion + custom canvas |
| AI chat | Groq (OpenAI-compatible API) |
| Email | Resend |
| Hosting | Vercel |

## Project structure

```
public/                 Logos, founder photo, theme-aware logo variants
scripts/                Helper script that generates the theme logo variants
src/
  app/
    layout.tsx          Root layout, fonts, SEO metadata, no-flash theme script
    page.tsx            Assembles all sections in order
    globals.css         Design tokens, light/dark themes, animations
    api/
      chat/route.ts     Server endpoint that powers the AI assistant
      contact/route.ts  Server endpoint that handles contact form emails
  components/
    layout/             Navbar, Footer
    sections/           Hero, Services, WhyCybrum, HowItWorks, Work, About, Contact, ...
    ui/                 Reusable building blocks (buttons, cards, logo, theme toggle)
    visuals/            Animated background, chatbot, scroll helpers
  lib/
    site.ts             Single source of truth for links, contact, and brand constants
    content.ts          All on-page copy and project data
```

The copy and project data live in `src/lib/content.ts` and the links and brand
constants live in `src/lib/site.ts`, so most text changes are made in one place
without touching components.

---

## Run it locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run lint     # check code quality
```

### Environment variables

The chatbot and the contact form call external services. Create a `.env.local`
file in the project root (this file is never committed):

```
GROQ_API_KEY=your_groq_key          # powers the AI assistant
GROQ_MODEL=llama-3.3-70b-versatile  # optional, this is the default
RESEND_API_KEY=your_resend_key      # powers contact-form email
CONTACT_TO_EMAIL=where@to-receive.com
```

The site runs without these keys; the chatbot and email simply stay inactive and
the WhatsApp contact button keeps working. When deployed on Vercel, the same
variables are added in the Vercel project settings.

---

## Deployment

The site is deployed on Vercel and published at
[https://www.cybrumsolutions.dev/](https://www.cybrumsolutions.dev/). Every push
to the `main` branch triggers a new production deployment.

## Contact

- WhatsApp: 0337-0(292786) CYBRUM (+923370292786, https://wa.me/923370292786)
- Company LinkedIn: [linkedin.com/company/cybrumsolutions](https://www.linkedin.com/company/cybrumsolutions)
- Founder LinkedIn: [linkedin.com/in/irazaahmed](https://www.linkedin.com/in/irazaahmed)
- GitHub: [github.com/irazaahmed](https://github.com/irazaahmed)
- Portfolio: [irazaahmed.me](https://irazaahmed.me)

---

Built end to end by Ahmed Raza, Founder and CEO of Cybrum Solutions.
