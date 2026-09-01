import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Database,
  FileSearch,
  FileText,
  Gem,
  ListChecks,
  MessagesSquare,
  Search,
  Settings2,
  Zap,
} from "lucide-react";
import { site, contact } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { BlogToc } from "@/components/blog/BlogToc";
import type { TocItem } from "@/lib/blog";
import {
  NotesHeader,
  NotesFooter,
  ChapterHeader,
  CoreIdea,
  Callout,
  SubHeading,
  P,
  Strong,
  RecapTable,
  Flow,
  Ladder,
  CheckList,
  PartBanner,
  PromptBox,
  PullQuote,
} from "../_components/notes-ui";
import { chapters } from "../_lib/chapters";

const chapter = chapters.find((c) => c.slug === "claude-chatgpt-101")!;
const prevChapter = chapters.find((c) => c.slug === "ai-fluency")!;

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "Claude aur ChatGPT ke workspace ko practically chalane ka, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/claude-chatgpt-101" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/claude-chatgpt-101`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "2 Minute Mein Dekho", level: 2 },
  { id: "part1", text: "Part 1 · Cockpit", level: 2 },
  { id: "projects", text: "4 · Projects", level: 2 },
  { id: "memory", text: "5 · Memory Aur Instructions", level: 2 },
  { id: "artifacts", text: "6 · Artifacts", level: 2 },
  { id: "skills", text: "7 · Skills Aur Plugins", level: 2 },
  { id: "part3", text: "Part 3 · Reach Extend Karna", level: 2 },
  { id: "practice", text: "Practice: 6 Prompts", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function ModelTierDiagram() {
  const tiers = [
    { icon: Zap, t: "Fast Default", q: "Everyday questions, drafting, aur zyada tar kaam ke liye", d: "Fast aur cheap" },
    { icon: Brain, t: "Thinking Mode", q: "Multi-step reasoning, analysis, aur mushkil code ke liye", d: "Answer dene se pehle plan karta hai" },
    { icon: Gem, t: "Heavy Flagship", q: "Genuinely hard kaam ke liye", d: "Sab se deep, sab se slow, sab se expensive" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {tiers.map(({ icon: Icon, t, q, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{q}</p>
            <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold text-accent-bright">
              {d}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-border px-2 py-0.5">Fast aur cheap</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border px-2 py-0.5">Deep aur expensive</span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Names change hote rehte hain, lekin ye 3 tiers same rehte hain,
        model ko task ke hisab se pick karo, habit ke hisab se nahi
      </figcaption>
    </figure>
  );
}

function ProjectAnatomyDiagram() {
  const parts = [
    { icon: MessagesSquare, t: "Chats", d: "Ek jagah organized, scattered nahi" },
    { icon: Database, t: "Knowledge", d: "Ek baar upload ki hui files, har chat mein usable" },
    { icon: FileText, t: "Instructions", d: "Automatically apply hone wali guidance" },
  ];
  return (
    <figure className="my-7">
      <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-4">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
          Project
        </p>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {parts.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-card/70 p-3.5 text-center">
              <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                <Icon size={16} />
              </span>
              <p className="text-sm font-semibold text-foreground">{t}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-3.5">
          <p className="text-xs font-bold text-accent-bright">Claude</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Knowledge bari hone pe retrieval se search karta hai, capacity
            roughly 10x barh jati hai
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-3.5">
          <p className="text-xs font-bold text-accent-bright">ChatGPT</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Project ke andar apni memory accumulate karta hai, main-chat
            memory se separate rakhi jati hai
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Sab se chhota System of Context jo aap kabhi banaoge
      </figcaption>
    </figure>
  );
}

function PersistenceTriadDiagram() {
  const items = [
    { icon: Settings2, t: "Standing Instructions", q: "Stable rules ke liye", d: "Aap hamesha kaun ho, output hamesha kaisa chahiye" },
    { icon: Brain, t: "Memory", q: "Evolving context ke liye", d: "Abhi kya true hai" },
    { icon: FileText, t: "Projects", q: "Scoped kaam ke liye", d: "Ek client ya ek topic apne hi room mein" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {items.map(({ icon: Icon, t, q, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="text-xs font-medium text-accent-bright">{q}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Sab se common mistake ek ko dusre ki jagah rakh dena hai, teenon ko
        review karo, fix karo, aur jo rehna nahi chahiye wo delete karo
      </figcaption>
    </figure>
  );
}

function RoutingDiagram() {
  const routes = [
    { icon: Search, t: "Ek current fact, fast", use: "Web search", d: "Seconds mein, 1-2 sources ke sath" },
    { icon: Brain, t: "Koi new info nahi, sirf deep reasoning", use: "Thinking mode", d: "Model answer dene se pehle plan karta hai" },
    { icon: FileSearch, t: "Credible, cited, multi-source report", use: "Research mode", d: "Independent investigation mein minutes lagte hain" },
    { icon: Database, t: "Organization ki apni information", use: "Workplace search / connected apps", d: "Connected internal tools se answer" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-2">
        {routes.map(({ icon: Icon, t, use, d }) => (
          <div
            key={t}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card/60 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={15} />
            </span>
            <span className="text-sm text-foreground/90 sm:w-56 sm:shrink-0">{t}</span>
            <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
              {use}
            </span>
            <span className="text-xs text-muted">{d}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Routing ek daily delegation decision hai, aur wrong route pick
        karna dono cockpits mein sab se common daily waste hai
      </figcaption>
    </figure>
  );
}

function ProveItLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Ek repeating task pick karo",
          "Ek old case dhoondo jiska correct answer pata ho",
          "Assistant se wo dobara banwao",
          "Apni known truth se compare karo",
          "Improve karo aur dobara run karo",
        ]}
      />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm font-semibold text-foreground">Agar Match Ho Jaye</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Similar kaam ke liye tested confidence, plus ek reusable
            approach jo likh li gayi
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <p className="text-sm font-semibold text-foreground">Agar Fail Ho Jaye</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Ye bhi ek result hai, ye task human ke paas rahega, aur ab
            aapko reason pata hai
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Pass hona confidence earn karta hai, responsibility kabhi transfer
        nahi karta, aap phir bhi new results ko verify karte ho
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: pageTitle,
  description: pageDescription,
  url: `${site.url}/anthropic-exam-prep/claude-chatgpt-101`,
  inLanguage: "ur-Latn",
  learningResourceType: "Study notes",
  isPartOf: { "@type": "ItemList", url: `${site.url}/anthropic-exam-prep` },
  author: {
    "@type": "Person",
    name: site.founder,
    url: contact.portfolio,
  },
  publisher: { "@id": `${site.url}/#organization` },
};

export default function ClaudeChatgpt101ChapterPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />
      <NotesHeader backHref="/anthropic-exam-prep" backLabel="Notes Index" />

      <section className="relative overflow-hidden pt-28 pb-6 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[20rem] bg-grid opacity-30"
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/anthropic-exam-prep"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={13} />
              Sab Chapters
            </Link>
          </Reveal>
        </div>
      </section>

      <BlogToc items={toc} lang="ro" />

      <main className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <section id="intro" className="scroll-mt-24 pt-4">
          <Reveal>
            <ChapterHeader num={chapter.num} title={chapter.title} sub={chapter.sub} />
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted">
              Ye chapter <Strong>{chapter.examCode}</Strong> (Claude
              Certified Associate: Foundations) ke product-usage objectives
              se match karta hai
            </p>
            <CoreIdea>
              Ye course 9 concepts sikhata hai jo Claude aur ChatGPT, dono
              workspaces mein kaam karte hain. Maqsad simple hai: interface
              ke neeche wala <Strong>pattern</Strong> seekh lena. Buttons ki
              jagah change hoti rehti hai, model names change hote rehte
              hain, lekin approach dono jagah same rehta hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Interface Confusing, Concepts Easy</SubHeading>
            <P>
              Ye assume kiya jata hai ke aapko AI ke basic concepts pata
              hain, lekin interface mein navigate karna mushkil lagta hai.
              Model picker, plus menu, Projects, Memory, Skills, Plugins,
              Connectors ya apps, Search, Research, aur Thinking modes, ye
              sab pehli nazar mein bikhri hui cheezein lagti hain.
            </P>
            <P>
              Actual goal ye hai ke <Strong>interface ke neeche wala
              pattern</Strong> seekha jaye. Projects kaam ko organize karte
              hain, Memory context retain karti hai, Skills methods pack
              kar deti hain, Connectors external info tak access dete
              hain, aur Research modes information gather karte hain. Ye
              course <Strong>2 cockpits sikhata hai, 1 nahi.</Strong>
            </P>
            <Callout label="Time">
              Ye chapter parhne mein roughly 30-35 minute lagte hain, aur
              practice prompts aur self-check ke liye roughly 25 minute
              alag se chahiye.
            </Callout>
            <Callout label="Product Verification" tone="warn">
              Product claims 25 August 2026 ko Anthropic aur OpenAI ki
              official documentation se verify ki gayi. Buttons apni jagah
              change hote rehte hain aur features change hote rehte hain,
              latest info ke liye support.claude.com aur help.openai.com
              check karo.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Is Se Pehle Kya Parh Chuke Ho</SubHeading>
            <P>3 chapters is course se pehle chahiye:</P>
            <CheckList
              items={[
                "What AI Actually Is",
                "AI Fluency (The 4Ds)",
                "AI Prompting in 2026",
              ]}
            />
            <RecapTable
              head={["Topic", "Kahan Cover Hua", "Ye Course Kya Karta Hai"]}
              rows={[
                ["Models aur context window kaise kaam karte hain", "What AI Actually Is", "Wahi ideas use karta hai"],
                ["4D framework", "AI Fluency", "Isay product features pe apply karta hai"],
                ["Prompting technique", "AI Prompting in 2026", "Isay real workflows mein use karta hai"],
                ["Skills aur MCP ka concept", "Skills & Connectors", "Inke controls se introduce karwata hai"],
                ["Desktop apps, coding tools, agentic hand-off", "Cowork & OpenWork aur General Agents", "Sirf short orientation deta hai"],
                ["Claude aur ChatGPT ke chat workspaces", "Yehi Chapter", "Ye directly sikhata hai"],
              ]}
            />
            <P>
              Ye course chat workspace ke andar hi rehta hai. Desktop
              agents, coding environments, aur bigger agentic systems baad
              mein aate hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>2 Minute Mein Dekho</SubHeading>
            <P>Claude khol ke ye paste karo:</P>
            <PromptBox>{`List every control I can see in this workspace right now, and tell me
in one line what each one is for. Just the controls, no advice.`}</PromptBox>
            <P>Phir wahi cheez ek alag tab mein ChatGPT mein repeat karo.</P>
            <P>
              Aapke paas 2 lists aayengi, vocabulary different hoga lekin
              underlying kaam same hoga, jaise artifact aur writing block,
              ya connector aur app, ya project knowledge aur project
              files. <Strong>Controls ke names different hain. Inse hone
              wala kaam same hai.</Strong>
            </P>
            <Callout label="Ek Warning" tone="warn">
              Assistant apne hi interface ke baare mein hamesha reliable
              nahi hota, isliye list mein koi cheez shamil ho sakti hai jo
              actually maujood na ho, ya koi cheez miss ho sakti hai. Ye
              notice karo. Ek confident answer ko usi cheez se compare kar
              ke check karna Concept 9 hai, aur aap ise 2 minute mein hi
              mil chuke ho.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Cockpit</PartBanner>
            <SubHeading>1. 2 Cockpits, 1 Discipline</SubHeading>
            <P>
              Claude aur ChatGPT ko sath sath khola jaye to dono dekhne
              mein kaafi similar lagte hain. Dono mein previous chats ki
              list, message box, model ya reasoning control, files aur
              tools ka menu, projects ya workspaces, memory aur
              instructions, aur search-research features shamil hain.
            </P>
            <Callout label="Basic Principle">
              <Strong>Aapko 2 completely different tareeke seekhne ki
              zaroorat nahi.</Strong> Aapko ek discipline seekhni hai, aur
              phir dekhna hai ke har product ne apne controls kahan rakhe
              hain.
            </Callout>
            <P>Jo skills dono jagah kaam aati hain, wo ye hain:</P>
            <CheckList
              items={[
                "Task ko clearly describe karna",
                "Useful context provide karna",
                "Kya delegate karna hai, ye decide karna",
                "Answers ko check karna",
                "Kab stronger model ki taraf jana hai, ye pata hona",
                "Sensitive information protect karna",
              ]}
            />
            <P>
              Jo cheez different hai wo hai product ke names, layout, aur
              strengths, aur ye time ke sath change hote rehte hain.
            </P>
            <Callout label="Example">
              Pilots ek baar fly karna seekhte hain, phir sirf ye seekhte
              hain ke plane ke switches kahan hote hain. Flying transferable
              skill hai, switches ki location har baar look up ki jati
              hai.
            </Callout>
            <P>
              Dono ko jaanna isliye zaroori hai kyunke{" "}
              <Strong>Claude aur ChatGPT har task pe same performance nahi
              dete.</Strong> Jo model ek type ke kaam mein excellent hai,
              wo doosre type ke kaam mein weak ho sakta hai. Isay{" "}
              <Strong>platform awareness</Strong> kehte hain, yani ye pata
              hona ke har tool kis cheez mein achha hai, ek hi interface se
              loyal ban jane ki jagah.
            </P>
            <P>
              Dono companies chat se aage bhi desktop apps, coding tools,
              aur browser agents dete hain, lekin ye course sirf chat
              window tak limited rehta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Sab Se Important Beginner Habit</SubHeading>
            <PullQuote>
              Assistant se aise baat karo jaise ek capable colleague se
              karte ho.
            </PullQuote>
            <P>Koi bhi serious request bhejne se pehle 3 cheezein cover karo:</P>
            <Ladder
              steps={[
                { title: "Stage Set Karo", note: "Aap kaun ho aur actually kya achieve karna chahte ho?" },
                { title: "Task Define Karo", note: "Assistant ko exactly kya karna chahiye?" },
                { title: "Rules Set Karo", note: "Kaunsa tone, format, constraints, ya examples follow karne chahiyen?" },
              ]}
            />
            <PullQuote>Pattern seekho, button ki location nahi.</PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>2. Models Aur Thinking Modes</SubHeading>
            <P>
              Claude aur ChatGPT, dono aapko ye choose karne dete hain ke
              kisi task pe kitni capability spend karni hai. Wrong starting
              point model names hain, kyunke wo fast change hote hain.
              Right starting point 3 tiers wala pattern hai.
            </P>
            <ModelTierDiagram />
            <RecapTable
              head={["Level", "Best For", "Trade-off"]}
              rows={[
                ["Fast Default", "Everyday questions, drafting, summaries, routine kaam", "Fast aur cheap, hard problems pe kam depth"],
                ["Thinking / Reasoning", "Multi-step reasoning, analysis, math, mushkil code", "Slower, zyada careful"],
                ["Heavy Flagship", "Sab se hard analysis aur lambe, demanding tasks", "Sab se slow aur expensive, sab se capable"],
              ]}
            />
            <P>
              <Strong>Claude ke model names:</Strong> Haiku (sab se fast
              aur cheap), Sonnet (everyday choice), aur Opus (heavy
              flagship). Haiku aur Sonnet fast tier mein aate hain, Opus
              flagship tier mein. Thinking ek separate switch hai, model ka
              naam nahi.
            </P>
            <P>
              <Strong>ChatGPT ke model names:</Strong> Instant (everyday)
              se lekar Pro (hardest kaam) tak, aur beech mein thinking ke
              levels.
            </P>
            <Callout label="Important Note">
              Anthropic ke apne certification exams bhi Claude ke names se
              hi sawal poochte hain.
            </Callout>
            <SubHeading>2 Simple Rules</SubHeading>
            <Ladder
              steps={[
                { title: "Rule 1 · Fast Se Start Karo", note: "Zyada tar everyday kaam ke liye normal fast mode use karo. Chhote rewrites, summaries, ya simple explanations ke liye heavy reasoning ka wait mat karo." },
                { title: "Rule 2 · Hard Task Pe Escalate Karo", note: "Multi-step logic, careful comparison, mathematics, mushkil debugging, ya code jo correct hona zaroori ho, in ke liye thinking mode ya stronger model use karo." },
              ]}
            />
            <Callout label="Ek Important Baat">
              &ldquo;AI fail ho gaya&rdquo; ka actual matlab kabhi kabhi ye
              hota hai ke &ldquo;maine wrong level ki capability use
              ki.&rdquo;
            </Callout>
            <P>
              Wo rule jo har new model release ke baad bhi qaim rehta hai:{" "}
              <Strong>model ko task ke hisab se pick karo, habit ke hisab
              se nahi.</Strong> Everyday ke liye fast, hard reasoning ke
              liye thinking, aur genuinely hard kaam ke liye flagship.
              Pehle reasoning ka level choose karo, phir current model
              names seekho.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3. Wo Context Jo Aap Attach Karte Ho</SubHeading>
            <P>
              Ek language model sirf usi information pe kaam kar sakta hai
              jo uske saamne ho. Isi liye attachments matter karte hain.
              Supported file types mein PDFs, Word documents, spreadsheets,
              CSV files, images, screenshots, aur code files shamil hain.
            </P>
            <P>
              Jab aap koi file attach karte ho, to aap usi conversation ke
              liye assistant ko zyada context de rahe hote ho. Ye
              comparison dekho:
            </P>
            <RecapTable
              head={["File Ke Bina", "File Attach Ki Hui"]}
              rows={[["\"Summarize this contract.\"", "\"Summarize this contract.\" (contract file attach ki hui)"]]}
            />
            <P>
              Words almost same hain. Doosra request isliye useful hai
              kyunke assistant actually contract dekh sakta hai. Agar
              aapko kisi dashboard, error message, chart, ya interface mein
              help chahiye, to usay show karna, usay memory se describe
              karne se better hai. Dono products live web search bhi kar
              sakte hain, jab model ki apni knowledge kaafi na ho to search
              current information le aati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Lambi Conversations Ko Handle Karna</SubHeading>
            <P>
              Dono products current conversation ka record rakhte hain, jo
              baad ke answers ko shape karta hai. Is record ki bhi ek
              limit hoti hai, aur kisi lambe kaam mein aap us limit tak
              pahunch jaoge.
            </P>
            <P>
              Ek example: aap ne poora din ek hi chat mein quarterly board
              report likhne mein spend kiya. 3 signs batate hain ke chat
              stale ho chuki hai:
            </P>
            <CheckList
              items={[
                "Subah di gayi koi rule (jaise \"bullet points na likho\") bhool jati hai aur bullets wapis aa jate hain",
                "Pehle diye gaye kisi figure se contradict hota hai",
                "Answers generic advice ki taraf drift ho jate hain, jo kisi bhi report pe apply ho sakti hai",
              ]}
            />
            <P>
              Aisa hone pe na to force karte raho, aur na hi chat abandon
              karo. Pehle ek <Strong>state summary</Strong> mangwao, yani
              ek short record ke ab tak kya decide hua, kya still open hai,
              aur di gayi har rule:
            </P>
            <PromptBox>{`Summarize what we have decided so far, what is still open, and every
rule I gave you. Keep it short enough to paste into a new chat.`}</PromptBox>
            <P>
              Summary parho, mistakes fix karo, phir usay files ke sath ek
              new chat mein paste kar ke aage barho. Agar aap khud ko har
              hafte wahi summary paste karte huye paate ho, to yehi signal
              hai ke ab ek project ki zaroorat hai, jo Concept 4 hai.
            </P>
            <Callout label="Ek Habit Banao">
              Koi important sawal poochne se pehle khud se poocho:{" "}
              <Strong>ek capable human colleague ko is ka theek answer
              dene se pehle kya dekhna hoga?</Strong> Phir assistant ko
              wahi material do.
            </Callout>
            <P>
              Better context usually ek clever prompt se zyada answer
              better banati hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · Workspace Ko Apna Banana</PartBanner>
            <SubHeading>4. Projects, Ek Kaam Ke Liye Ek Room</SubHeading>
            <P>
              AI ko kuch weeks use karne ke baad, sidebar messy ho jata
              hai. Ek hi client ya topic ke baare mein kai chats sidebar
              mein alag alag pari hoti hain, kaam ki files sirf ek chat
              mein hoti hain, aur background baar baar dobara explain karna
              padta hai.
            </P>
            <Callout label="Definition">
              Ek <Strong>project</Strong> ek stream of work ke liye
              workspace hai. Isay ek room ki tarah samjho jahan ek topic se
              related har cheez ek sath rehti hai.
            </Callout>
            <ProjectAnatomyDiagram />
            <P>Ek project 3 cheezein hold karta hai:</P>
            <CheckList
              items={[
                "Chats: usi kaam se related saari conversations",
                "Knowledge: usi project ke liye upload ki gayi files",
                "Instructions: project ke andar assistant kaise kaam kare, iski standing guidance",
              ]}
            />
            <P>
              Ek example, Quarterly Board Reporting Project mein ye shamil
              ho sakta hai: pichle quarter ka board deck, current financial
              model, reporting ka style guide, tone aur audience ke baare
              mein instructions, aur board report se related har
              conversation. Ab aapko wahi files dobara upload karne ya wahi
              instructions dobara dene ki zaroorat nahi. <Strong>Yehi poori
              baat hai: ek project ek stream of work ke liye context ko
              persistent bana deta hai.</Strong> Book ki language mein, ek
              project ek chhota System of Context hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Claude Aur ChatGPT Ka Difference</SubHeading>
            <P>
              <Strong>Claude ka approach (retrieval):</Strong> jab project
              knowledge context window se bari ho jati hai, to Claude
              automatically project knowledge ko search karna start kar
              deta hai, isse capacity roughly 10x barh jati hai. Ye switch
              automatically hota hai, aur ye ek paid-plan feature hai.
            </P>
            <P>
              <Strong>ChatGPT ka approach (memory):</Strong> project memory
              add karta hai, jo 2 tarah se kaam kar sakti hai:{" "}
              <Strong>default memory</Strong> mein wider memory bhi
              participate kar sakti hai, jabke <Strong>project-only
              memory</Strong> mein project ek real boundary ban jata hai,
              aur outside memory andar nahi aati. Project-only memory hi
              actually isolation banati hai.
            </P>
            <P>
              Yani ek project hamesha kaam ko organize karne mein help
              karta hai. <Strong>Project-only memory</Strong> hi wo cheez
              hai jo usay isolation mein badalti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Project Kab Banao</SubHeading>
            <Callout label="Test">
              Agar aap ne 3 baar wahi background explain kiya hai ya wahi
              file upload ki hai, to us kaam ko ek project chahiye. One-off
              questions ko project ki zaroorat nahi hoti.
            </Callout>
            <PullQuote>Projects us kaam ke liye hain jo continue rehta hai.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- MEMORY ---------------------- */}
        <section id="memory" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>5. Memory Aur Standing Instructions</SubHeading>
            <P>Beginners in teenon cheezon ko constantly mix up kar dete hain.</P>
            <PersistenceTriadDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Standing Instructions: Stable Rules</SubHeading>
            <P>
              Standing instructions wo rules hain jo ek baar likhi jati
              hain aur broadly apply honi chahiyen, jaise &ldquo;explanation
              se pehle answer do&rdquo;, &ldquo;jab tak main technical
              detail na maangoon, simple language use karo&rdquo;, ya
              &ldquo;main business leaders ke liye likhta hoon, software
              engineers ke liye nahi.&rdquo; Claude mein ye settings aur
              styles mein rakhi jati hain, ChatGPT mein Custom Instructions
              mein (Settings aur Personalization ke andar). Ye un cheezon
              ke liye hain jo <Strong>stable</Strong> hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Memory: Aapke Baare Mein Evolving Context</SubHeading>
            <P>
              Memory wo cheez hai jo assistant aapki conversations se
              pickup karta hai aur baad mein use kar sakta hai, jaise
              expressed preferences, recurring goals, aapke kaam karne ke
              tareeke se related facts, ya koi bhi cheez jo aap ne remember
              karne ko bola ho. Dono products aapko memory review, edit,
              aur delete karne dete hain.
            </P>
            <Callout label="Important Note" tone="warn">
              Work account pe pehle ye check karo ke memory on bhi hai ya
              nahi. Claude individual plans pe memory automatically on kar
              deta hai, lekin Team aur Enterprise pe usay off rakhta hai,
              jab tak koi owner khud usay enable na kare.
            </Callout>
            <P>
              Dono products ek aisa mode bhi dete hain jo conversation ko
              history aur memory se bahar rakhta hai, Claude mein incognito
              chat, ChatGPT mein temporary chat. Lekin dono companies
              safety aur abuse review ke liye roughly 30 din ke liye ek
              copy phir bhi retain karti hain. Isliye inhe{" "}
              <Strong>memory-free samjho, trace-free nahi.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Projects: Ek Stream Of Work Ki Context</SubHeading>
            <P>
              Ye dono se different hai. Projects kisi specific client,
              course, research topic, product, ya ongoing kaam ke gird
              context rakhte hain.
            </P>
            <Callout label="Rule Of Thumb">
              <Strong>Stable rules ke liye instructions, evolving context
              ke liye memory, aur scoped kaam ke liye projects.</Strong>{" "}
              Yehi ek rule zyada tar configuration mistakes ko rok deta
              hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Stored Context Ek Responsibility Hai</SubHeading>
            <P>
              2 concerns hain, convenience aur sensitivity. Stored context
              mein sensitive ya private information bhi ho sakti hai. Ye
              stale bhi hoti rehti hai, aur stale context silently fail
              hoti hai, koi error message nahi aata, sirf ek aisa answer
              aata hai jo confident lagta hai aur wrong hota hai.
            </P>
            <P>
              Example ke taur pe, agar pichle quarter ka financial model
              abhi bhi Quarterly Board Reporting project mein para hai, to
              is quarter ka board deck pichle quarter ke numbers ko neatly
              format kar ke quote kar dega. Assistant ye nahi bata sakta ke
              aap ne jo diya hai wo outdated ho chuka hai.
            </P>
            <Callout label="Zaroori Action">
              Jo kuch stored hai usay ek schedule pe review karo, monthly,
              ya jab bhi aapka role ya koi project change ho. Har item ke
              liye decide karo: keep karo, correct karo, ya delete karo. Ye
              memory, standing instructions, aur har project ki files, sab
              ke liye karo. Jab topic ki zaroorat ho to incognito ya
              temporary chat use karo. Work account pe apni organization ki
              policy follow karo.
            </Callout>
            <P>
              Stored context isliye useful hai kyunke wo time ke sath
              compound hoti hai. Ye ek aisi jagah bhi hai jahan care matter
              karti hai. Ek achi tarah configured assistant weeks ke use ke
              baad zyada useful ho jati hai. Model nahi badla, uske gird ki
              context better ho gayi.
            </P>
            <PullQuote>Persistence tabhi help karti hai jab right information right jagah ho.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- ARTIFACTS ---------------------- */}
        <section id="artifacts" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>6. Artifacts Aur Writing Blocks: Wo Kaam Jo Aap Le Ja Sakte Ho</SubHeading>
            <P>
              Chat conversation ke liye achi hai, lekin finished work rakhne
              ke liye ek weak container hai. Agar aap 2,000 words ki
              report, ek working calculator, ek diagram, ya ek chhoti
              application maangte ho, to result ek separate object ki
              tarah chahiye hota hai, scroll mein bikhri ek message ki
              tarah nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Claude Mein: Artifacts</SubHeading>
            <Callout label="Definition">
              Ek <Strong>artifact</Strong> ek separate output hai jo
              conversation ke barabar khulta hai.
            </Callout>
            <P>
              Artifact types: document, code, web page, diagram, vector
              image, calculator, dashboard, aur ek chhoti interactive
              application. Aap Claude se baat karte raho jabke artifact
              wahin maujood rehta hai, jise build aur revise kiya ja raha
              ho. Claude ke paas Word, Excel, PowerPoint, aur PDF files
              banane ki separate abilities bhi hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>ChatGPT Mein: Writing Blocks Aur Code Blocks</SubHeading>
            <P>
              Purani tutorials &ldquo;canvas&rdquo; aur ek side-by-side
              editing panel ka zikr karti hain. 2026 mein OpenAI ne apne
              current models se canvas retire kar diya aur wahi kaam khud
              conversation ke andar le aaya, <Strong>writing blocks</Strong>{" "}
              aur <Strong>code blocks</Strong> ki shape mein, yani thread
              ke andar hi maujood, editable regions. Agar koi tutorial
              aapko canvas open karne ko kahe aur wo na mile, to yehi
              reason hai.
            </P>
            <P>
              Design different hai. Idea same hai:{" "}
              <Strong>work product ko discussion se separate rakhna.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Better Results Kaise Lo</SubHeading>
            <P>
              &ldquo;ek dashboard&rdquo; ya &ldquo;ek report&rdquo; mat
              maango. Batao ke finished cheez ko actually kya karna
              chahiye.
            </P>
            <P>Good:</P>
            <PromptBox>{`Build a monthly budget tracker. I should be able to enter expenses
by category, see a pie chart, and get a warning when I go over budget.`}</PromptBox>
            <P>Weak:</P>
            <PromptBox>Build a budget tracker.</PromptBox>
            <P>
              Ye bhi batao ke ye kis ke liye hai, kyunke new employees ke
              liye ek flowchart, experienced engineers ke liye flowchart
              jaisi cheez nahi hoti. Format bhi batao: agar answer data
              hai, to table ya spreadsheet file mango, paragraph nahi. Data
              se matlab hai jaise 12 vendors with prices and lead times, ek
              delivery schedule, ya koi bhi aisi cheez jise colleague Excel
              mein load karega. 12 vendors ka ek paragraph sort, filter, ya
              sheet mein paste nahi ho sakta. Ek table ho sakta hai. Agar
              aap maango, dono assistants spreadsheet file bana denge,
              jise download kiya ja sakta hai. Phir ek waqt mein ek change
              kar ke revise karo.
            </P>
            <Callout label="Beginner Ke Liye Surprise">
              Yehi wo jagah hai jahan beginners ko pehli genuine surprise
              milti hai: <Strong>aap ek useful software describe karte ho,
              aur working software appear ho jata hai.</Strong>
            </Callout>
            <PullQuote>
              Chat conversation hai, artifacts, writing blocks, aur code
              blocks hi actual kaam hold karte hain.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- SKILLS ---------------------- */}
        <section id="skills" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>7. Skills Aur Plugins: Kaam Karne Ke Packaged Tareeke</SubHeading>
            <P>
              Projects is sawal ka answer dete hain ke knowledge ko sath
              kaise rakha jaye, lekin repetition ek aur sawal khara karti
              hai: <Strong>assistant se har baar wahi method kaise
              dohrwaya jaye?</Strong> Answer hai: Skills.
            </P>
            <Callout label="Definition">
              Ek <Strong>skill</Strong> kisi task ko karne ka ek packaged
              method hai.
            </Callout>
            <P>
              Isme instructions, examples, supporting resources, aur kabhi
              kabhi code shamil hota hai. Jab koi matching task aata hai,
              assistant khud us skill ko load kar leta hai.
            </P>
            <P>Aap ek skill in cheezon ke liye bana sakte ho:</P>
            <CheckList
              items={[
                "Quarterly business reviews likhna",
                "Ek contract ko checklist ke against check karna",
                "Customer meeting ka brief prepare karna",
                "Raw notes ko preferred report format mein badalna",
              ]}
            />
            <P>
              Har chat mein method dobara sikhane ki jagah, aap method ko
              ek hi baar pack kar dete ho. Claude ke paas skills hain,
              ChatGPT ke paas bhi skills hain. Products isme differ karte
              hain ke skills kahan available hain aur kaise manage hoti
              hain, lekin underlying idea ab dono mein shared hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Agent Skills Standard</SubHeading>
            <P>
              Dono vendors ek open standard, Agent Skills (agentskills.io),
              pe kaam karte hain. Ek skill Markdown files ka ek folder
              hoti hai, jiske peeche na koi server hota hai na koi
              runtime, aur isi wajah se ye ek jagah se doosri jagah travel
              kar sakti hai. Kai companies ke dus-hazaar tools ab isi
              format ko read kar sakte hain, isliye ek product ke liye
              likhi hui skill doosre product mein bhi install ho sakti
              hai. Ye ek workflow ko ek prompt se zyada durable cheez bana
              deta hai, jo kisi ek vendor mein trapped na ho. Yehi is
              course ka opening lesson bhi hai: <Strong>discipline hamesha
              constant hai, tool variable hai.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Plugin Kya Hai?</SubHeading>
            <Callout label="Definition">
              Ek <Strong>plugin</Strong> ek broader type ke kaam ke liye
              capabilities ko package karta hai.
            </Callout>
            <P>
              Isme kai skills, external apps se connections, aur kabhi
              kabhi commands ya sub-agents shamil hote hain. Ye ek
              installable package hota hai jo kisi job function ke liye
              banaya jata hai.
            </P>
            <RecapTable
              head={["Cheez", "Ek Line Mein"]}
              rows={[
                ["Skill", "Ek method sikhati hai"],
                ["App ya Connector", "External system tak access deta hai"],
                ["Plugin", "In sab ko sath wrap karta hai"],
              ]}
            />
            <Callout label="Directory">
              Claude ab skills, connectors, aur plugins ek hi directory,
              claude.ai/directory, mein list karta hai, jo khud kuch build
              karne se pehle dekhne ka sab se fast tareeka hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Custom GPTs Ke Baare Mein</SubHeading>
            <P>
              ChatGPT ke paas <Strong>custom GPTs</Strong> bhi hain. Ek
              custom GPT ek separately configured assistant hai jise aap
              purpose se open karte ho, aur iski apni instructions,
              persona, knowledge, aur tools hote hain. Ye ek skill se
              different cheez hai.
            </P>
            <RecapTable
              head={["Feature", "Purpose"]}
              rows={[
                ["Project", "Stream of work ke liye context store karta hai"],
                ["Skill", "Task karne ka method store karta hai"],
                ["Custom GPT", "Ek separately configured assistant"],
                ["Plugin", "Capabilities ko sath package karta hai"],
              ]}
            />
            <Callout label="Important Difference">
              <Strong>Projects knowledge store karte hain. Skills tasks
              perform karti hain.</Strong> Ek customer-preparation skill un
              customer files ko use kar sakti hai jo ek project mein
              stored hain. Project <Strong>&ldquo;kya&rdquo;</Strong>{" "}
              provide karta hai, skill <Strong>&ldquo;kaise&rdquo;</Strong>{" "}
              provide karti hai.
            </Callout>
            <PullQuote>Jab koi method repeat ho, to us method ko package kar do.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Reach Extend Karna</PartBanner>
            <SubHeading>8. Connectors, Apps, Aur Sawal Ko Route Karna</SubHeading>
            <P>
              Ab tak assistant zyada tar usi information pe kaam kar rahi
              thi jo aap ne uske saamne rakhi. Lekin aapki real information
              zyada tar kahin aur hoti hai: email, calendar, cloud storage,
              project-management tools, chat systems, aur company ke
              knowledge bases. Iska solution connectors aur apps hain.
            </P>
            <P>
              Claude is ke liye <Strong>connector</Strong> word use karta
              hai, ChatGPT <Strong>app</Strong> (pehle connector bhi kehta
              tha). Dono names ek hi type ki cheez ke liye hain, sirf
              product ka naam different hai. Ek connector ya app assistant
              ko doosre system mein search, read, aur kabhi kabhi act karne
              deta hai, jitni permission aap dein.
            </P>
            <CheckList
              items={[
                "\"Wo email dhoondo jahan hum ne vendor contract discuss kiya tha.\"",
                "\"Kal mere kaunse meetings hain?\"",
                "\"Pichle week ke project notes ka summary do.\"",
                "\"Mere sab se high-priority tasks kaunse hain?\"",
              ]}
            />
            <P>
              Ab assistant aapke real systems se answer de sakta hai, har
              cheez chat mein copy karne ki jagah.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>MCP: Shared Integration Standard</SubHeading>
            <P>
              Dono ecosystems ek standard, Model Context Protocol (MCP), ko
              support karte hain. Isay usually &ldquo;AI tools ke liye
              USB-C&rdquo; kaha jata hai, yani ek hi standard plug, jisse
              ek baar banaya gaya tool kai different assistants use kar
              sakte hain. Claude ke custom connectors MCP pe chalte hain,
              ChatGPT ke apps bhi Apps SDK ke through MCP pe bante hain.
            </P>
            <Callout label="Ek Important Warning" tone="warn">
              Ye genuinely useful hai, lekin is analogy ke peeche ek baat
              hide nahi honi chahiye: ek USB-C cable lagana trust ka
              decision nahi hota. Ek MCP tool connect karna hota hai.{" "}
              <Strong>Plug standard hai, access nahi.</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Connections Permission Ke Decisions Hain</SubHeading>
            <P>
              Kisi tool ko connect karna sirf productivity ka decision nahi,
              ye security aur governance ka decision hai, yani ye decision
              ke kis ko kya dekhne aur karne ki permission hai. Connect
              karne se pehle ye poocho:
            </P>
            <CheckList
              items={[
                "Ye kya read kar sakta hai?",
                "Kya ye outside world mein write kar sakta hai, send kar sakta hai, delete kar sakta hai, buy kar sakta hai, ya koi aur action le sakta hai?",
                "Kya mujhe is source pe trust hai?",
                "Kya mujhe is account ya system ko connect karne ki permission hai?",
              ]}
            />
            <Callout label="Example" tone="warn">
              Work email connect karna bohot zyada information expose kar
              sakta hai, chahe assistant sirf wahi dekhe jo aapka apna
              account pehle se dekh sakta hai.
            </Callout>
            <P>
              Connectors aur apps ko waise hi treat karo jaise software
              install karne ko treat karte ho: useful, aur permission-gated
              on purpose.
            </P>
            <P>
              Ek connector ya app sirf wahi kar sakta hai jiske liye wo
              bana ho. Agar aapke kaam ko assistant se koi cheez send karwani
              hai, to pehle confirm karo ke sending us tool ke actions mein
              shamil hai. Permissions un actions mein se choose karti hain
              jo tool ke paas pehle se hain, wo new actions add nahi
              karti.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Search, Thinking, Ya Research?</SubHeading>
            <P>
              Beginners aksar task ke liye wrong mode pick kar lete hain.
            </P>
            <RoutingDiagram />
            <RecapTable
              head={["Kya Chahiye", "Kya Use Karo", "Example"]}
              rows={[
                ["Ek current fact", "Web search", "\"Aaj ki exchange rate kya hai?\""],
                ["Hard reasoning, no new information", "Thinking mode", "\"In 3 pricing strategies ko compare karo.\""],
                ["Credible, deep investigation", "Research mode", "\"Warehouse robotics ki current market research karo.\""],
                ["Organization ki information", "Workplace search ya connected apps", "\"Latest approved pricing policy dhoondo.\""],
              ]}
            />
            <P>
              Pehla sawal ye poochna chahiye: <Strong>main assistant se
              kis type ka kaam maang raha hoon?</Strong> Ek fact pe jo
              search seconds mein de sakta hai, deep research waste mat
              karo. Jab actual problem reasoning ho to search ki taraf mat
              jao. Jab kaam ko multi-source investigation chahiye ho to
              sirf normal chat use mat karo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Research Mode Ek Alag Cheez Hai</SubHeading>
            <P>
              Research mode &ldquo;better search&rdquo; nahi hai. Assistant
              ek investigation plan karta hai, kai searches run karta hai,
              leads follow karta hai, sources parhta hai, aur citations ke
              sath ek structured report deta hai. Isme seconds nahi,
              minutes lagte hain. Aap ek <Strong>investigation</Strong> ka
              kaam de rahe hote ho, sirf ek quick question nahi.
            </P>
            <Callout label="Ek Important Reminder" tone="warn">
              Report aane ke baad bhi judgment khatam nahi hoti. Important
              claims check karo. Citations open karo. Research aapki reach
              extend karti hai, ye aapki accountability khatam nahi karti.
            </Callout>
            <PullQuote>Sawal bhejne se pehle usay route karo.</PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>9. Us Kaam Pe Prove Karo Jo Aap Pehle Se Jaante Ho</SubHeading>
            <P>
              Aapko kaise pata chalega ke assistant actually aapke kaam
              mein achhi hai? Right benchmark koi benchmark ya demo nahi,
              balke <Strong>aapka apna task, aapka apna data, aapka apna
              standard hai.</Strong>
            </P>
            <Callout label="Best Beginner Method">
              Assistant ko aise kaam pe test karo jo aap pehle finish kar
              chuke ho aur jis pe aapko pehle se trust hai.
            </Callout>
            <ProveItLoopDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Example: Program Director</SubHeading>
            <P>
              Ek program director har quarter attendance aur employment
              outcomes ka analysis karta hai. Wo agle report ke liye AI se
              help chahta hai. Usay new data pe pehle se trust nahi karna
              chahiye. Iski jagah, wo assistant ko pichle quarter ka raw
              data deta hai, kyunke usay pehle se pata hai ke correct
              analysis kaisa dikhta hai. Phir wo assistant se wo kaam
              dobara karwata hai. Ab uske paas compare karne ke liye ek
              real cheez hai. Agar assistant koi important pattern miss
              kare, to wo instructions better bana sakta hai. Agar data
              mein hi koi problem nikle jo analysis ke liye zaroori hai, to
              usay ek data problem mil gayi. Agar assistant kaam ka koi
              part reliably nahi kar pata, to wo part human ke paas rehta
              hai. Teenon outcomes useful hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5-Step Proving Loop</SubHeading>
            <Ladder
              steps={[
                { title: "Ek Repeating Task Pick Karo", note: "Exactly clear raho." },
                { title: "Ek Old Example Dhoondo", note: "Aisa jiska correct result aapko pehle se pata ho." },
                { title: "Assistant Se Dobara Banwao", note: "Usay wahi context do jo aapke paas normally hoti." },
                { title: "Compare Karo", note: "Kya match hua? Kya fail hua? Kaunsi instruction missing thi?" },
                { title: "Improve Karo Aur Dobara Run Karo", note: "Jab tak kaafi achha na ho, ya ye decide ho jaye ke ye task delegate nahi hona chahiye." },
              ]}
            />
            <Callout label="Ek Important Baat">
              Ye last outcome bhi koi failure nahi hai. Ye seekhna ke{" "}
              <Strong>kya delegate nahi karna</Strong>, ek hour ke time ke
              qabil hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pass Hona Actually Kya Prove Karta Hai?</SubHeading>
            <P>
              Ye aapko <Strong>similar future kaam ke liye tested
              confidence</Strong> deta hai. Ye prove nahi karta ke assistant
              har agle case mein bhi correct hoga. Aur ye responsibility
              transfer nahi karta.
            </P>
            <P>Ab bhi in cheezon ki zaroorat rehti hai:</P>
            <CheckList
              items={[
                "New results check karo ke wo make sense karte hain",
                "Final kaam ke zimmedar khud raho",
                "Jahan appropriate ho, AI ki help disclose karo",
                "High-risk decisions ko proper human oversight mein rakho",
              ]}
            />
            <Callout label="Ek Tip">
              Agar possible ho, wahi test Claude aur ChatGPT, dono mein
              chalao. Ek pehle se samjhe hue task pe 2 assistants ko
              compare karna, platform awareness banane ka sab se fast
              tareeka hai.
            </Callout>
            <P>
              Ye chhoti si exercise aapki pehli evaluation suite hai.
            </P>
            <PullQuote>
              Trust known work ke against earn karna chahiye, kisi
              good-looking answer se assume nahi kar lena chahiye.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Chhota Recap, Prompts Se Pehle</SubHeading>
            <P>
              Ab aapke paas dono products ka map hai. Claude aur ChatGPT
              different tools hain, lekin kaafi hisson mein same soch pe
              bane hain.
            </P>
            <CheckList
              items={[
                "Models aur thinking modes, kitni capability spend karni hai, ye control karte hain",
                "Attachments, is waqt zaroori context provide karte hain",
                "Projects, ek stream of work ke liye context sath rakhte hain",
                "Standing instructions, stable rules rakhti hain",
                "Memory, aapke baare mein evolving context rakhti hai",
                "Artifacts, writing blocks, aur code blocks, finished work ko chat scroll se bahar rakhte hain",
                "Skills, repeating methods pack karti hain",
                "Plugins, poore type ke kaam ke liye capabilities bundle karte hain",
                "Claude mein connectors aur ChatGPT mein apps, external systems tak reach dete hain",
                "MCP, dono ke neeche shared integration standard hai",
                "Search, thinking, aur research, 3 different questions ke 3 different routes hain",
                "Jani-pehchani kaam pe test karna, trust earn karne ka tareeka hai",
              ]}
            />
            <P>Products change hote rahenge. Ye mental model current interface se kahin zyada der tak last karega.</P>
          </Reveal>

          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Prompts</SubHeading>
            <P>
              Cockpit ke baare mein parhna, usme baith ke fly karne jaisa
              nahi hai. In 6 exercises mein roughly 25 minute lagte hain.
            </P>
            <Ladder
              steps={[
                {
                  title: "1. Ek Guided Tour Maango",
                  note: "Run karne se pehle, 2 features ka guess laga lo jo assistant ke mention karne ki expectation hai. Phir Claude ya ChatGPT se poocho ke wo aaj ke workspace ka tour de, models change karne, file upload, projects, memory, aur research ke baare mein. What to notice: apni pehle wali guess se compare karo, phir jo screen pe dikh raha hai usse. Jahan assistant apne hi interface ke baare mein wrong ho, wahi sab se interesting part hai.",
                },
                {
                  title: "2. Ek Task Dono Assistants Mein Run Karo",
                  note: "Apne week ka koi chhota, real task pick karo. Run karne se pehle guess lagao ke kaunsa assistant better karega, aur kyun. Phir dono se wahi task karwao aur poocho ke unhe better karne ke liye kaunsi context chahiye thi. What to notice: outputs compare karo, phir dono ke answer compare karo ke unhe kya chahiye tha.",
                },
                {
                  title: "3. Apna Pehla Project Setup Karo",
                  note: "Kaam ka koi stream pick karo jahan aap pehle se wahi background ya files repeat kar chuke ho. Assistant se poocho ke wo aapse short interview kare, phir 2 cheezein de: project instructions, aur upload karne layak documents ki priority-ordered list. What to notice: jo sawal wo poochta hai, wahi context hai jo aap har week hath se type kar rahe the.",
                },
                {
                  title: "4. Jo Remember Kiya Gaya Hai Uska Audit Karo",
                  note: "Assistant se poocho ke wo aapke baare mein jo bhi remember karta hai, ek plain list ki tarah dikhaye. Har item ke liye khud decide karo: keep karo, correct karo, ya delete karo. Phir poocho ke settings mein memory kahan manage ki ja sakti hai. What to notice: kya kisi cheez se aapko embarrass hota, aur kya kuch outdated ho chuka hai.",
                },
                {
                  title: "5. 3 Real Sawal Route Karo",
                  note: "Apne kaam se 3 sawal pick karo: ek jise current fact chahiye, ek jise hard reasoning chahiye, aur ek jo proper report deserve kare. Har sawal poochne se pehle route choose karo, search, thinking, ya research. What to notice: wrong routing, jaise research mode jise search hona chahiye tha, dono products mein sab se common daily waste hai.",
                },
                {
                  title: "6. Assistant Ko Apni Old History Pe Test Karo",
                  note: "Assistant ko batao ke aap ek repeating task ko test karna chahte ho, jiska correct result aapko pehle se pata hai. Old input material do, aur assistant se wahi kaam dobara karwao jaise aap khud karte. Apna original answer tab tak hold karo jab tak kaam finish na ho. Baad mein 3 cheezein likh lo: kya match hua, kaunsi extra detail chahiye thi, aur kya human ke paas rehna chahiye.",
                },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- GLOSSARY ---------------------- */}
        <section id="glossary" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Is Chapter Ke Naye Terms</SubHeading>
            <P>Exam ke liye ye poori glossary yaad rakho, koi bhi term skip mat karo:</P>
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["Model picker", "Model, ya reasoning ka level, choose karne ka control"],
                ["Thinking mode / Extended thinking", "Answer dene se pehle model ko zyada reasoning ka time dene wala mode, slower lekin hard task pe worth it"],
                ["State summary", "Ek lambi chat ne ab tak kya decide kiya, kya still open hai, aur di gayi har rule ka ek short record, jise new chat mein paste kiya ja sake"],
                ["Project", "Ek ongoing stream of work ke liye workspace, jisme chats, knowledge, aur instructions shamil hon"],
                ["Project knowledge", "Project level pe stored files, jinhe us project ki har conversation use kar sake"],
                ["Standing instructions", "Sab conversations mein broadly apply hone wale stable rules: tone, role, output ki preference"],
                ["Memory", "Wo context jo assistant conversations ke darmiyan aapke baare mein rakhta hai aur baad mein use kar sakta hai"],
                ["Incognito chat / Temporary chat", "Ek conversation jo history aur memory se bahar rakhi jati hai, vendors phir bhi safety ke liye limited period tak ek copy rakhte hain, isliye memory-free hai, trace-free nahi"],
                ["Artifact", "Claude mein, ek separate output jaise document, code file, diagram, page, ya interactive app, jo chat ke barabar banta hai"],
                ["Writing block / Code block", "Current ChatGPT mein, conversation ke andar ek editable region jo written ya coded work ko ek separate object ki tarah rakhta hai, ye canvas ki jagah aaye"],
                ["Skill", "Instructions, examples, resources, aur kabhi kabhi code se bana ek packaged method, jo matching task pe load hota hai"],
                ["Agent Skills standard", "agentskills.io pe open standard jo skill ko package karne ka ek portable tareeka define karti hai, ab kai vendors ke tools ise read karte hain"],
                ["Plugin", "Ek bundle jo skills, connectors, aur commands jaisi capabilities ko poore type ke kaam ke liye package karta hai"],
                ["Custom GPT", "ChatGPT mein, ek separately configured assistant, jiski apni instructions, persona, knowledge, aur optional tools hote hain"],
                ["Connector", "Claude ka word, external system, jaise email, calendar, storage, ya kisi aur tool se, ek permissioned connection ke liye"],
                ["App", "ChatGPT ka word, isi type ke external tool integration ke liye, pehle inhe connectors kaha jata tha"],
                ["Model Context Protocol (MCP)", "Ek open standard jo AI systems ko ek shared interface se external tools aur data se connect karti hai"],
                ["Research mode", "Ek multi-step mode jo ek investigation plan karta hai, kai sources mein search karta hai, aur ek cited report deta hai"],
                ["Enterprise Search", "Claude ki organization-wide search, jo connected company tools ko ek searchable knowledge base ki tarah treat karti hai"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source &amp; License Note">
              Ye crash course is book ka apna original kaam hai. Product
              claims <Strong>25 August 2026</Strong> ko Anthropic aur
              OpenAI ki public documentation se verify ki gayi. Anthropic
              ke free <Strong>Claude 101</Strong> course aur OpenAI ke help
              resources ne ye decide karne mein help ki ke kaunse product
              topics cover kiye jayen, lekin ye chapter unki text,
              structure, ya exercises reuse nahi karta. Features, names,
              plan limits, aur pricing aksar change hoti hain, jahan ye
              page aur live product mein disagree ho, wahan vendor ki
              current documentation hi authority hai. Latest info ke liye{" "}
              <a
                href="https://support.claude.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                support.claude.com
              </a>{" "}
              aur{" "}
              <a
                href="https://help.openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                help.openai.com
              </a>{" "}
              dekho.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- SELF TEST ---------------------- */}
        <section id="self-test" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <ListChecks size={14} />
              Self-Test
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Khud Se Poocho
            </h2>
            <P>
              Pehle khud answer do, phir sawal pe click kar ke answer check
              karo. Peeche dekhe bina answer dene ki koshish karo.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "Current model names se pehle, model tier ka pattern kyun seekhna chahiye?",
                  a: "Model names aur versions fast change hote hain. Pattern (fast, thinking, flagship) zyada der tak last karta hai aur aapko task ke hisab se choose karne deta hai. Phir current names aur har naam kaunse tier mein aata hai, ye seekho, kyunke picker aur aapke colleagues wahi names use karte hain.",
                },
                {
                  q: "Thinking mode kab use karna chahiye?",
                  a: "Multi-step reasoning, careful analysis, math, mushkil code, aur har us kaam ke liye jahan extra reasoning ka wait worth it ho.",
                },
                {
                  q: "Instructions, memory, aur projects ko separate rakhne wala rule kya hai?",
                  a: "Stable rules ke liye instructions, evolving context ke liye memory, aur scoped kaam ke liye projects.",
                },
                {
                  q: "Normal chat aur artifact ya writing block mein kya difference hai, aur jab kaam data ho to kya change hota hai?",
                  a: "Normal chat conversation hai. Artifacts, writing blocks, aur code blocks ek separate work product rakhte hain jise alag se edit aur use kiya ja sakta hai. Agar wo work product data ho, to usay table ya spreadsheet file ki tarah mango taake sort aur load ho sake, paragraph ki tarah nahi.",
                },
                {
                  q: "Ye sentence complete karo: projects ___ store karte hain; skills ___ perform karti hain.",
                  a: "Projects knowledge store karte hain; skills tasks perform karti hain.",
                },
                {
                  q: "MCP kya hai, aur jab aap ek se zyada assistant use karo to ye kyun matter karta hai?",
                  a: "MCP, yani Model Context Protocol, AI systems ko external tools aur data se connect karne ki ek open standard hai. Ye isliye matter karta hai kyunke integration ke concepts, aur aksar khud tools bhi, multiple products mein carry hote hain.",
                },
                {
                  q: "Aapka pehla AI test ek aisa old case kyun use kare jiska correct result aapko pehle se pata ho?",
                  a: "Kyunke compare karne ke liye aapko ek trusted answer chahiye. Known truth ke bina, aap ye nahi bata sakte ke assistant ne kaam dobara kiya ya sirf aisa lagne wala answer diya.",
                },
                {
                  q: "Wo test pass hona aapko kya deta hai, aur ye kabhi kya transfer nahi karta?",
                  a: "Ye aapko similar future kaam ke liye tested confidence deta hai. Ye kabhi responsibility transfer nahi karta, aap ab bhi important outputs verify karte ho aur final result ke owner rehte ho.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-card/60 transition-colors open:border-accent/40"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-heading text-xs font-bold text-accent-bright">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{item.q}</span>
                  </summary>
                  <div className="border-t border-border/60 px-4 py-3.5 pl-[3.25rem] text-sm leading-relaxed text-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <Callout label="Note">
              Agar sawal 8 mushkil laga, to Concept 9 ko{" "}
              <Link
                href="/anthropic-exam-prep/ai-fluency"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                AI Fluency
              </Link>{" "}
              wale chapter ki Diligence competency ke sath dobara parho.
              Dono mil ke is course ka professional core hain.
            </Callout>
          </Reveal>
        </section>

        {/* Prev / Next chapter nav */}
        <nav className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/anthropic-exam-prep/${prevChapter.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Pichla: {prevChapter.title}
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted/60">
            Agla chapter jald aa raha hai
            <ArrowRight size={15} />
          </span>
        </nav>
      </main>

      <ScrollToTop />
      <NotesFooter />
    </div>
  );
}
