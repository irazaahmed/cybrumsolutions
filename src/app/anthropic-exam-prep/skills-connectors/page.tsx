import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  FileText,
  Layers,
  ListChecks,
  Lock,
  MessageSquare,
  Plug,
  Search,
  ShieldAlert,
  Sparkles,
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
import { chapters, getNextLiveChapter, getPrevLiveChapter } from "../_lib/chapters";

const chapter = chapters.find((c) => c.slug === "skills-connectors")!;
const prevChapter = getPrevLiveChapter("skills-connectors");
const nextChapter = getNextLiveChapter("skills-connectors");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "Skills aur Connectors kaise kaam karte hain, apna skill kaise banayein, aur inhe safely use kaise karein, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/skills-connectors" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/skills-connectors`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Kitchen Wali Example, 6 Terms", level: 2 },
  { id: "part1", text: "Part 1 · 2 Upgrades", level: 2 },
  { id: "part2", text: "Part 2 · Jo Pehle Se Hai Wo Use Karo", level: 2 },
  { id: "part3", text: "Part 3 · Apna Skill Banana", level: 2 },
  { id: "part4", text: "Part 4 · Same Skill, 5 Jagah", level: 2 },
  { id: "part5", text: "Part 5 · Safely Use Karo", level: 2 },
  { id: "recap", text: "Recap", level: 2 },
  { id: "practice", text: "Practice: 6 Exercises", level: 2 },
  { id: "projects", text: "5 Projects", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function KitchenDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <MessageSquare size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Chat</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Ek baari ka order, AI ko batata hai is baar kya karna hai
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <ChefHat size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Skill = Recipe Card</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Sikhati hai har baar wahi kaam apne tareeke se kaise karna hai
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <Plug size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Connector = Kitchen</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            AI ko haath deta hai aapke real apps aur data tak pahunchne ke liye
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Kitchen bina recipe ke improvised, recipe bina kitchen ke sirf padhi
        ja sakti hai. Teenon mil kar reliable output banate hain
      </figcaption>
    </figure>
  );
}

function SkillFireDiagram() {
  return (
    <figure className="my-7">
      <Flow
        steps={[
          "Aap plain language mein apna task describe karte ho",
          "AI enabled skills ki descriptions se match dhoondta hai",
          "Matching skill khud load ho ke fire hoti hai (~90% baar automatic)",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Override: skill ka naam le lo, ya doosri surfaces (Cowork, Claude
        Code) mein / type karo browse karne ke liye
      </figcaption>
    </figure>
  );
}

function PipelineDiagram() {
  return (
    <figure className="my-7">
      <Flow
        steps={[
          "Ek plain-English sentence",
          "Connector real data khinch ke laata hai",
          "Skill usay aapke tareeke se shape karta hai",
          "Aap sirf finished result review karte ho",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Live data se, bina copy-paste kiye
      </figcaption>
    </figure>
  );
}

function DiagnosticDiagram() {
  const rows = [
    { icon: FileText, q: "Kya main baar baar explain karta hoon ke kaise karna hai?", a: "Skill chahiye" },
    { icon: Plug, q: "Kya main baar baar kisi doosri app se data copy-paste karta hoon?", a: "Connector chahiye" },
    { icon: Sparkles, q: "Dono?", a: "Dono chahiye" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-2">
        {rows.map(({ icon: Icon, q, a }) => (
          <div
            key={q}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card/60 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={15} />
            </span>
            <span className="text-sm text-foreground/90 sm:flex-1">{q}</span>
            <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
              {a}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Har cheez skill nahi maangti, ek-baari sawal sirf ek achhe prompt ki
        zaroorat rakhte hain
      </figcaption>
    </figure>
  );
}

function ProgressiveDisclosureDiagram() {
  const levels = [
    { icon: Layers, t: "Level 1 · Frontmatter", d: "Sirf name + description, hamesha loaded, decide karti hai skill relevant hai ya nahi" },
    { icon: FileText, t: "Level 2 · Body", d: "Actual instructions, sirf tab load hoti hain jab description match kare" },
    { icon: Search, t: "Level 3 · references/, assets/, scripts/", d: "Detailed docs, templates, aur exact-step programs, sirf zaroorat par" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-2">
        {levels.map(({ icon: Icon, t, d }, i) => (
          <div
            key={t}
            className="rounded-xl border border-border bg-card/60 p-4"
            style={{ marginLeft: `${i * 12}px` }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                <Icon size={13} />
              </span>
              <p className="text-sm font-semibold text-foreground">{t}</p>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Isi trick ko progressive disclosure kehte hain, dus skills install
        karo koi performance issue nahi hoga
      </figcaption>
    </figure>
  );
}

function SafetyRisksDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-500">
            <ShieldAlert size={14} />
            Malicious Skills
          </p>
          <p className="text-sm text-muted">
            Ek text file (aur scripts) hidden instructions rakh sakti hai jo
            data leak kare ya suspicious servers se contact kare. Prompt
            injection aur data exfiltration dono possible hain
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-500">
            <Lock size={14} />
            Over-Broad Connector Access
          </p>
          <p className="text-sm text-muted">
            Connector sirf wahi reach kar sakta hai jo aap kar sakte ho, lekin
            careless write-access ek galat edit, galat jagah record, ya bina
            undo ke deleted file bana sakta hai
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Ek anjaan skill ko contract samjho jis pe sign karne wale ho, ek
        connector ko chaabi samjho jo aap kisi ko de rahe ho
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
  url: `${site.url}/anthropic-exam-prep/skills-connectors`,
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

export default function SkillsConnectorsChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke Configuration
              aur Knowledge Management domain ke liye foundation hai
            </p>
            <CoreIdea>
              Zyada tar log AI ko ek vending machine ki tarah treat karte
              hain: har baar fresh request type karte hain, kuch bhi retain
              nahi hota. Ye chapter ek different model sikhata hai:{" "}
              <Strong>Skills</Strong> se AI ko ek baar sikhao, <Strong>
              Connectors</Strong> se usay apne apps tak access do, aur AI ek
              chat interface se ek intelligent operating layer ban jata hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Kitchen Wali Example</SubHeading>
            <P>3 cheezein mil kar kaam karti hain:</P>
            <KitchenDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>6 Essential Terms</SubHeading>
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["Skill", "Saved instructions jo AI ko sikhati hain ek task aapke specific tareeke se kaise karna hai"],
                ["Connector", "Ek safe link jo AI ko ek app tak pahunchne deta hai (files, email, messages)"],
                ["Fire / Trigger", "Jab request kisi skill se match kare to AI khud usay activate karta hai"],
                ["Scope", "Aap kitni access grant karte ho, jitni chhoti utni safe"],
                ["Read-only", "AI dekh sakta hai lekin change nahi kar sakta"],
                ["Progressive disclosure", "AI sirf short summaries loaded rakhta hai, poori instructions sirf zaroorat par kholta hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · 2 Upgrades</PartBanner>
            <SubHeading>1. Chat Box Se Operating Layer Tak</SubHeading>
            <P>Har professional ke paas repeated friction hoti hai:</P>
            <CheckList
              items={[
                "Accountants har mahine formatting instructions dobara paste karte hain",
                "Doctors roz SOAP format requirements dobara explain karte hain",
                "Marketers har chat mein brand-voice rules dohrate hain",
                "Engineers har baar design-review structures restate karte hain",
              ]}
            />
            <P>
              Ye tasks repeatable hain, ek specific tareeke se hote hain, sirf
              input badalta hai, yehi exactly Skills solve karti hain. Doosri
              friction copy-paste hai (Excel, emails, Drive folders, project
              trackers se), yehi Connectors solve karte hain, AI ko seedha
              wahan tak access de kar jahan real kaam hota hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>2. Ek Skill Actually Kya Hai</SubHeading>
            <P>
              Fundamentally simple: ek folder jismein ek text file hai jiska
              naam exactly <Strong>SKILL.md</Strong> hai. Is file mein:
            </P>
            <CheckList
              items={[
                "Top pe ek required name aur description",
                "Neeche plain-English instructions",
              ]}
            />
            <P>
              Yehi minimum hai. Optional: example files, templates,
              reference documents, aur scripts (jo AI khud likhta hai, aap
              nahi). Key innovation <Strong>progressive disclosure</Strong>{" "}
              hai: AI sirf short description hamesha loaded rakhta hai, poori
              instructions sirf tab kholta hai jab request match kare. Isi
              wajah se dus skills install karne se bhi koi performance
              impact nahi hota.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3. Ek Connector Actually Kya Hai</SubHeading>
            <P>
              Safe, permission-scoped access external apps aur data tak, ek
              open standard <Strong>MCP</Strong> (Model Context Protocol) par
              chalta hai. 3 critical facts:
            </P>
            <CheckList
              items={[
                "AI aapki existing permissions inherit karta hai, aap khud jo files nahi reach kar sakte, wo AI bhi nahi kar sakta",
                "Aap choose karte ho read-only ya read-and-write access",
                "Aap control karte ho kaunsa connector har conversation mein active hai",
              ]}
            />
            <P>
              Ready-made connectors Google Drive, Gmail, Slack, Notion,
              Figma, Linear, Atlassian, aur bohot sab ke liye maujood hain.
              Kuch interactive hain, live dashboards ya design surfaces
              conversation ke andar render karte hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4. Skills Vs Connectors Vs Projects Vs Custom Instructions</SubHeading>
            <RecapTable
              head={["Feature", "Purpose", "Best For", "Key Test"]}
              rows={[
                ["Skill", "Reusable how-to instructions", "Repeatable tasks aapke tareeke se (formatting, voice, methodology)", "\"Main baar baar explain karta hoon kaise\""],
                ["Connector", "External apps tak safe access", "Files, email, messages, tickets mein padhna/act karna", "\"Main baar baar doosri app se copy-paste karta hoon\""],
                ["Project", "Hamesha-loaded files/instructions ka workspace", "Standing context (client, course, book)", "\"Ye rules yahan har cheez pe apply hote hain\""],
                ["Custom Instructions", "Har chat pe apply hone wali preferences", "Global style preferences", "\"Ye har jagah, hamesha chahiye\""],
              ]}
            />
            <Callout label="Key Distinction">
              Projects hamesha context automatically load karte hain (always
              on), jabke Skills trigger hone tak dormant rehti hain.
              Connectors access dete hain, Skills expertise deti hain,{" "}
              <Strong>ye partners hain, alternatives nahi.</Strong> Custom
              Instructions global hain, Skills specific task types target
              karti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>5. Slash Commands Type Karoon Ya AI Khud Jaan Le?</SubHeading>
            <P>
              Claude.ai (web aur mobile) mein, Skills khud fire hoti hain,
              aap plain language mein apna task describe karte ho, AI aapki
              request ko enabled skills ki short descriptions se match
              karta hai, aur matching skill khud load kar leta hai. Koi
              slash command ki zaroorat nahi.
            </P>
            <SkillFireDiagram />
            <Callout label="Ahem Number">
              Ye automatic behavior roughly <Strong>90% baar</Strong> hoti
              hai, isliye skill ki description likhna sab se important
              control mechanism ban jata hai.
            </Callout>
            <P>Override options:</P>
            <CheckList
              items={[
                "Skill ko explicitly plain English mein naam se bulao (\"use my brand-voice skill\")",
                "Doosri surfaces (Cowork, Microsoft 365 add-ins, Claude Code) mein / type karo browse aur manually pick karne ke liye",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · Jo Pehle Se Hai Wo Use Karo</PartBanner>
            <SubHeading>6. Built-In Skills</SubHeading>
            <P>
              Kai document-generation skills automatically kaam karti hain
              jab ek switch on ho: <Strong>Settings → Capabilities →
              &ldquo;Code execution and file creation&rdquo;</Strong>{" "}
              (&ldquo;Required for skills&rdquo; label ke sath). Ye engine
              chalati hai:
            </P>
            <CheckList
              items={[
                "Word: professional .docx documents",
                "PowerPoint: complete slide decks",
                "Excel: real spreadsheets with formulas",
                "PDF: PDFs banana aur fill karna",
              ]}
            />
            <P>
              Bas naturally poocho: &ldquo;[topic] introduce karne wala ek
              slide deck tayar karo, general audience ke liye&rdquo; aur ek
              finished deck download ke liye ready milegi.
            </P>
            <Callout label="Note">
              Jab aap <Strong>Customize → Skills</Strong> kholte ho, sirf ek
              skill dikhegi shuru mein: skill-creator (Anthropic ka skill
              banane ka tool). Document skills missing nahi hain, wo engine
              ke andar rehte hain. &ldquo;+&rdquo; menu ke &ldquo;Browse
              skills&rdquo; option se installable skills ki directory dekho,
              Notion/Figma/Atlassian ki partner skills samet.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>7. Apni Apps Connect Karna</SubHeading>
            <P>Roughly ek minute lagta hai:</P>
            <Ladder
              steps={[
                { title: "Chat Se", note: "\"+\" (neeche-left) click karo, Connectors pe hover karo, Manage connectors choose karo, phir Connectors ke sath \"+\" click karo directory kholne ke liye" },
                { title: "Ya Sidebar Se", note: "Customize → Connectors kholo" },
                { title: "Connect Karo", note: "Service select karo, Connect click karo, standard OAuth authorization complete karo" },
              ]}
            />
            <CheckList
              items={[
                "Connect karne ke baad, har conversation ke liye specific connectors usi \"+\" menu se enable karo",
                "Free plans mein 1 custom connector shamil hai, ready-made directory connectors broadly available hain",
                "Tool access setting sirf zaroorat par tools load kar sakti hai, jab kai connectors manage karne hon",
                "Interactive badge dekho, jo live interfaces indicate karta hai jo chat ke andar render hote hain",
              ]}
            />
            <Callout label="Worked Example">
              Ek practice patient intake form create kar ke Google Drive
              mein save karo, phir usay wapis parh kar SOAP-style notes mein
              summarize karo, dono directions dikhata hai: write aur read,
              bina manual file transfer ke.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>8. Skills + Connectors Sath Mein</SubHeading>
            <P>
              Pattern real data fetch karna (Connector) aur output ko aapke
              tareeke se shape karna (Skill) combine karta hai.
            </P>
            <PipelineDiagram />
            <Callout label="Monthly Client Close">
              Ek &ldquo;client-summary&rdquo; skill aur Google Drive
              connected ke sath, accountant ka monthly ritual 2 ghante ki
              paste-and-format se 2-minute review mein simat jata hai. Drive
              connector ledger fetch karta hai, skill amounts ko reporting
              currency mein format karti hai, expense head se group karti
              hai, withholding-threshold payments flag karti hai, aur
              4-section template automatically apply karti hai.
            </Callout>
            <Callout label="Weekly Content Batch">
              Ek &ldquo;brand-voice&rdquo; skill rules encode karti hai (no
              exclamation marks, question hooks, banned buzzwords, CTA
              format). Ek Notion connector content calendar tak pahunchta
              hai. Request &ldquo;is week ke 3 scheduled posts ke liye
              captions draft karo, hamari voice mein&rdquo; connector se
              calendar parhta hai, skill se on-brand captions likhta hai,
              kaam composition se editing tak shift ho jata hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>9. Kaunse Problems Ko Kya Chahiye?</SubHeading>
            <DiagnosticDiagram />
            <RecapTable
              head={["Category", "Examples"]}
              rows={[
                ["Sirf Skill", "Brand voice, report templates, SOAP notes, review checklists"],
                ["Sirf Connector", "Ledgers, emails, tickets apps se pull karna"],
                ["Dono", "Monthly closes, weekly batches, design reviews (real data fetch + specific shape apply)"],
              ]}
            />
            <Callout label="2 Ehtiyat" tone="warn">
              Har cheez skill deserve nahi karti, ek-baari sawal bas ek achhe
              prompt ki zaroorat rakhte hain. Aur ek unnecessary connector ek
              khula darwaza hai, sirf wo apps connect karo jo workflow
              actually maangta hai.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Apna Skill Banana</PartBanner>
            <SubHeading>10. Fastest Path: AI Se Likhwao</SubHeading>
            <P>skill-creator skill use karo apna chahiye jo describe karne ke liye:</P>
            <PromptBox>{`Use the skill-creator skill to help me build a skill. The skill
prepares a monthly client financial summary for my accounting firm.
Whenever I ask for a 'client summary' or 'monthly close,' it should:
Format all amounts in our reporting currency with thousands
separators; Group line items by expense head; Flag any payment above
the tax-withholding reporting threshold; Output using my standard
four-section report layout (Overview, Income, Expenses by Head,
Flags & Notes). Ask me anything you need, then build it.`}</PromptBox>
            <P>
              AI clarifying sawal poochta hai, phir ek complete, correctly
              formatted skill generate karta hai. Ye <Strong>&ldquo;code you
              never write&rdquo;</Strong> principle ki misaal hai: aap client
              ho jo requirements specify kar raha hai, AI commissioned
              artifact produce karta hai, ek skill jo ek baar commission
              karo aur hamesha reuse karo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>11. SKILL.md Ki Anatomy</SubHeading>
            <ProgressiveDisclosureDiagram />
            <P>Rules jo upload errors se bachate hain:</P>
            <CheckList
              items={[
                "File ka naam exactly SKILL.md hona chahiye",
                "Folder ka naam kebab-case mein ho (client-monthly-summary, na ke Client Monthly Summary)",
                "Name aur description mein XML-style tags na hon (angle brackets mein kuch bhi nahi)",
                "Descriptions short aur specific rehni chahiye",
                "Skills ko \"claude\" ya \"anthropic\" naam se mat banao (reserved hain)",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>12. Description Field Hi Poora Game Hai</SubHeading>
            <P>
              Description decide karti hai ke aapki skill kabhi fire hogi ya
              nahi. AI relevance decide karne ke liye aapki instructions
              nahi parhta, sirf description parhta hai. Ek vague description
              matlab skill jo kabhi trigger nahi hoti, ek sharp description
              matlab exact activation.
            </P>
            <Callout label="Formula">
              Kya karti hai + kab use karni hai + wo exact phrases jo aap
              actually bolte ho
            </Callout>
            <RecapTable
              head={["Bad", "Better"]}
              rows={[
                ["\"Helps with reports\" (too vague)", "\"Prepares a monthly client financial summary. Use when the user asks for a 'client summary', 'monthly close', or 'month-end report'.\""],
                ["\"Handles patient documentation\" (no trigger words)", "\"Converts consultation notes into SOAP-format clinical notes. Use when the user asks for a 'SOAP note', 'clinical note', or to 'write up' a consultation.\""],
              ]}
            />
            <Callout label="Debugging Trick">
              AI se poocho: &ldquo;Mera [skill-name] skill kab use karoge?&rdquo;
              Agar answer bohot narrow ya wide hai, aapko exactly wo mil gaya
              jo description mein fix karna hai. Negative triggers overeager
              skills ko narrow karte hain: &ldquo;Do NOT use for one-off
              calculations or quick questions, only for full month-end
              reports.&rdquo;
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>13. Test, Phir Iterate</SubHeading>
            <Ladder
              steps={[
                { title: "Describe Aur Generate Karwao", note: "Skill describe karo, AI se pehla version banwao" },
                { title: "Instructions Parho Aur Fix Karo", note: "Testing se pehle obviously galat cheezein pakro (poocho: kya 2 colleagues isay parh kar same kaam karte?)" },
                { title: "Triggering Test Karo", note: "Wo phrases try karo jo activate honi chahiye, confirm karo load hoti hai aur unrelated requests hijack nahi karti" },
                { title: "Output Test Karo", note: "Kya format sahi hai, grouping sahi hai, flags sahi hain, sab sections cover hote hain?" },
                { title: "Hard Cases Test Karo", note: "No income wale clients, threshold pe exactly payments, messy data" },
                { title: "Failures Wapis Le Jao", note: "skill-creator ke paas updates ke liye" },
              ]}
            />
            <RecapTable
              head={["Timing", "Problem Kahan Hai"]}
              rows={[
                ["Pehli reply se hi galat", "File mein hi problem hai (description bohot vague/broad, ya instruction bohot loose)"],
                ["Shuru mein sahi, chat barhne pe kharab", "Chat bohot lambi ho gayi, AI ne track lose kar diya, skill theek hai, naya chat start karo"],
                ["Har run mein wahi mistake", "Step galat jagah hai, exact steps sentences mein nahi, scripts mein honi chahiye"],
                ["Pehle kaam karta tha, ab nahi", "Skill wahi hai, isliye context badla hai (threshold, template, workflow, ya data shift hua)"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>14. Skill Save Aur Share Karna</SubHeading>
            <P>
              Jab skill-creator khatam kare, ek panel dikhta hai <Strong>
              Save skill</Strong> button ke sath. Click karo, skill{" "}
              <Strong>Personal skills</Strong> mein (Customize → Skills) gir
              jati hai, toggled on, ready, aur private. Koi zip ya upload
              hassle nahi.
            </P>
            <P>
              Team ya Enterprise plans pe, specific colleagues ke sath share
              kar sakte ho, ya apni organization ki directory mein publish
              kar sakte ho. Shared skills view-only hoti hain aur khud
              update ho jati hain jab aap original change karte ho, isse
              teams standardize hoti hain.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · Same Skill, 5 Jagah</PartBanner>
            <P>
              December 2025 mein, Anthropic ne <Strong>Agent Skills open
              standard</Strong> publish kiya (agentskills.io). Adoption
              fast thi, OpenAI ka Codex CLI aur Google ka Gemini CLI ab wahi{" "}
              <Strong>SKILL.md</Strong> files parhte hain. Ek basic skill
              tools ke across travel karti hai, chahe har tool apna install
              path, invocation syntax, permissions, aur features us portable
              core ke around add karta ho.
            </P>
            <P>
              <Strong>Linux Foundation</Strong> ne <Strong>Agentic AI
              Foundation</Strong> banayi, MCP (jis standard par connectors
              chalte hain) aur related infrastructure ko khule tareeke se
              govern karne ke liye, kisi ek vendor ke through nahi.
            </P>
            <RecapTable
              head={["Surface", "Kis Ke Liye", "Skill Install", "App Connect", "Apna Banana"]}
              rows={[
                ["Claude.ai (web/mobile)", "Sab ke liye, main tool", "Directory mein Install click karo ya zip upload karo", "\"+\" → Connectors → chuno → sign in", "skill-creator likhta hai, Save skill click karo"],
                ["Cowork/OpenWork (desktop)", "Knowledge workers, non-coders", "Wahi directory, skills automatically dikhti hain", "Wahi flow, plus computer ki files bhi reach karta hai", "Describe karo, agent folder mein save kar sakta hai"],
                ["Claude Code/OpenCode (terminal)", "Code ke sath kaam karne wale log", "Skill folder ko skills directory mein drop karo", "Config mein ek dafa setup karo, phir plain language mein poocho", "Agent se create karwao, wo files likhta hai"],
              ]}
            />
            <Callout label="Note">
              Har jode ka pehla tool commercial hai, doosra open-source hai.
              Dono wahi SKILL.md parhte hain. Non-programmers ke liye:
              Claude.ai mein start aur rehna karo (buttons, toggles, koi
              file management nahi). Cowork agla natural step hai jab aap
              chahte ho AI seedha desktop files pe kaam kare.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>ChatGPT Aur Gemini Ka Kya?</SubHeading>
            <P>
              Skills pe, picture cross-vendor hai, kyunke Agent Skills ek
              open standard hai, OpenAI (Codex CLI) aur Google (Gemini CLI),
              plus VS Code aur Cursor, wahi SKILL.md files parhte hain. Ek
              skill portable hai, ek baar likho, kai tools mein chalao.
            </P>
            <P>
              Lekin &ldquo;ek baar sikhao&rdquo; consumer chat apps ke andar,
              har vendor ka apna, non-portable version hai:
            </P>
            <RecapTable
              head={["Vendor", "Naam", "Kya Hai"]}
              rows={[
                ["ChatGPT", "Custom GPTs", "Ek saved version, instructions aur knowledge files ke sath, GPT Store se distribute hoti hai, sirf ChatGPT ke andar rehti hai"],
                ["Gemini", "Gems", "Saved Gemini personas, instructions aur files ke sath, sirf Google apps ke andar rehte hain"],
              ]}
            />
            <P>
              Connectors pe, teenon ke paas equivalents hain (ChatGPT
              connectors/apps se, Gemini Workspace aur extensions se). MCP
              technology increasingly shared hai, principles har jagah same
              hain.
            </P>
            <PullQuote>
              Skills portable hain (open standard, kai tools), GPTs aur Gems
              vendor-specific hain (aap unhe kahin aur le nahi ja sakte).
              Agar sirf ek tool use karte ho, GPTs ya Gems theek hain.
              Multi-model strategy ke liye, Skills future-proof hain.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PART 5 ---------------------- */}
        <section id="part5" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 5 · Safely Use Karo</PartBanner>
            <P>
              Wahi principle jo pichli Foundations courses mein tha: model
              ke andar kuch bhi check nahi karta ke koi action safe ya
              correct hai, aap wo check ho.
            </P>
            <Callout label="Core Principle">
              &ldquo;Ek skill un instructions ka set hai jo aap AI ko follow
              karne de rahe ho, aur ek connector aapki real data ka darwaza
              hai. Ek anjaan skill ko usi tarah treat karo jaise ek contract
              jis pe sign karne wale ho, aur ek connector ko usi tarah jaise
              ek chaabi jo aap kisi ko de rahe ho.&rdquo;
            </Callout>
            <SafetyRisksDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Safe-Use Checklist</SubHeading>
            <CheckList
              items={[
                "Trusted sources se skills install karo, built-in Anthropic skills aur official directory safe default hain",
                "Enable karne se pehle skill parho, SKILL.md aur koi bhi bundled files kholo, AI se poocho \"ye skill parh ke batao exactly kya instruct karti hai, external servers, credentials, ya data leak se juri koi cheez flag karo\"",
                "Connectors ko read-only se start karo, \"search and summarize\" ki permission pehle do, \"send/create/delete\" baad mein",
                "Sab se chhoti folder ya app tak scope karo jo task ko chahiye, sab kuch connect mat karo",
                "Scope ek connector ka idea hai, Skill ka nahi, connectors ke paas scope dials hote hain, skills ke paas nahi, skill parhna hi uska control hai",
                "Edits/moves/deletes allow karne se pehle confirm karo connector recovery, version history, aur undo kaise handle karta hai",
                "Team mein, shared skills ko organization ki directory se route karo, zips idhar udhar mat bhejo",
              ]}
            />
            <P>
              Isse dar mat jao, built-in tools safe hain aur roz ka workflow
              low-risk hai. Point ye hai ke jaise jaise aap built-in tools se
              community skills install karne aur write access dene ki taraf
              barhte ho, aapki ehtiyat bhi capability ke sath barhni chahiye.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Poora Course, Compressed</SubHeading>
            <CheckList
              items={[
                "Chat ek baar batata hai, Skill har baar sikhati hai, Connector haath deta hai apps tak (kitchen: connectors kitchen hain, skills recipes hain)",
                "Ek Skill ek folder hai SKILL.md text file ke sath: name, description, plain-English instructions, koi code shuru mein nahi chahiye",
                "Ek Connector ek app tak safe, permission-scoped access hai, MCP standard par chalta hai, AI aapki permissions inherit karta hai",
                "Claude.ai mein, skills automatic fire hoti hain jab prompt description match kare, description sab se important cheez hai jo aap likhte ho",
                "Friction se diagnose karo: kaise explain kar raha hoon → Skill, app se copy-paste kar raha hoon → Connector, dono → dono",
                "AI ko describe kar ke skills banao (skill-creator likhta hai), phir triggering aur output test karo, iterate karo",
                "Ek baar likhi hui skill Agent Skills open standard ki wajah se kai tools mein chalti hai, ChatGPT ke GPTs ya Gemini ke Gems (vendor-locked) ke ulat",
                "Care capability ke sath scale karti hai: enable se pehle skills parho, trusted sources se install karo, connectors read-only se start karo",
              ]}
            />
            <PullQuote>
              Underneath ek recurring shift hai: AI ek box jismein aap type
              karte ho, wo nahi rehta, ye ek layer ban jata hai jo aapke
              standards jaanta hai aur aapke tools tak pahunchta hai.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Exercises</SubHeading>
            <P>Har ek roughly 30 minute leta hai.</P>
            <Ladder
              steps={[
                { title: "1. Ek Built-In Skill Trigger Karo", note: "File creation on confirm karo, phir Claude se bolo \"isay ek slide PowerPoint mein badal do, title aur 3 bullets ke sath: [3 facts paste karo].\" Dekho PowerPoint skill khud fire hoti hai." },
                { title: "2. Ek App Connect Karo, Read-Only", note: "Google Drive ya Gmail connect karo, chat ke liye enable karo, Claude se ek specific document dhoondh ke summarize karwao plus 3 important numbers identify karwao, notice karo koi download ya copy-paste nahi chahiye." },
                { title: "3. Baat Kar Ke Apna Pehla Skill Banao", note: "Apna sab se repetitive re-explanation task chuno, phir: \"skill-creator use kar ke [task] ke liye ek skill banao. Ye rules follow karo: [list].\"" },
                { title: "4. Description Ko Pressure-Test Karo", note: "Banane ke baad: \"Ye skill kab use karoge? Aur kab NAHI use karoge?\" Agar answer bohot wide ya narrow hai, description update karwao." },
                { title: "5. Ek Skill Ka Safety Audit Karo", note: "Koi bhi skill jo aap ne nahi likhi, poocho: \"Ye skill parh ke plain language mein batao exactly kya instruct karti hai. External server, credentials, ya data leak se juri koi cheez flag karo.\"" },
                { title: "6. Apne 3 Tasks Diagnose Karo", note: "3 recurring annoyances likho. Har ek ke liye: friction kaise-explain-karna (Skill) hai, app-se-fetch (Connector) hai, ya dono?" },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>5 Hands-On Projects</SubHeading>
            <RecapTable
              head={["Project", "Waqt", "Kya Banega"]}
              rows={[
                ["1. Apna Pehla Real Skill", "30-45 min", "Apne sab se zyada re-explained task ko ek skill mein badlo jo aapka tareeqa jaanti ho"],
                ["2. Ek App Connect Karo, Read-Only", "20-30 min", "Google Drive ya Gmail connect karo, real sawal poocho jise andar ki cheez chahiye"],
                ["3. Skill Aur Connector Ko Sath Wire Karo", "45-60 min", "Project 1 aur 2 combine karo: connector real data fetch karta hai, skill usay aapke tareeke se shape karti hai"],
                ["4. Portable Banao Ya Hand-Off Karo", "30 min", "Apni skill kisi dost/colleague ke sath share karo, ya doosri surface (Cowork/Claude Code) pe load kar ke chalao"],
                ["5. Trust Karne Se Pehle Audit Karo", "15-20 min", "Official directory se ek skill install karo (jo aapne nahi likhi), rely karne se pehle usay parh ke audit karo"],
              ]}
            />
            <Callout label="Har Project Ka Success Statement">
              &ldquo;Maine AI ko sikha diya main apna weekly kaam kaise karta
              hoon, ek dafa, ab wo ek sentence mein har baar karta hai.&rdquo;
              — yehi feeling har project ka goal hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Agar Beech Mein Atak Jao</SubHeading>
            <RecapTable
              head={["Problem", "Fix"]}
              rows={[
                ["Skill kabhi trigger nahi hoti, ya galat cheezon pe fire hoti hai", "Dono description problems hain. Poocho: \"Mera [naam] skill kab use karoge, aur kab nahi?\" Description tighten karo"],
                ["Connector file \"nahi dhoond pata\"", "Usually permissions ya scope. Confirm karo connector is chat ke liye enabled hai aur aapka apna account file khol sakta hai"],
                ["AI ne connected data use karne ki bajaye glance se answer diya", "Explicitly naam lo: \"Mere [app] connector se actual file fetch karo answer dene se pehle\""],
                ["Write access ya sensitive data se nervous ho", "Read-only raho, jo zaroorat nahi wo strip karo pehle, write access sirf un tools ko do jo achha behave kar chuke hon"],
                ["Chat lambi ho ke confused ho gayi", "Naya chat start karo, task 2 lines mein restate karo, aage barho"],
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
                ["Skill", "Saved instructions jo AI ko ek task aapke specific tareeke se karna sikhati hain"],
                ["Connector", "Ek safe, permission-scoped link jo AI ko ek app tak pahunchne deta hai"],
                ["Fire / Trigger", "Jab AI khud request ko skill ki description se match kar ke usay activate kare"],
                ["Scope", "Kitni access grant ki gayi hai, jitni chhoti utni safe"],
                ["Read-only", "AI dekh sakta hai lekin change nahi kar sakta"],
                ["Progressive disclosure", "Sirf short description hamesha loaded rakhna, poori instructions sirf zaroorat par kholna"],
                ["SKILL.md", "Wo required text file jismein skill ka name, description, aur instructions hoti hain"],
                ["Frontmatter", "SKILL.md ke shuru mein --- lines ke darmiyan hissa, sirf name aur description"],
                ["MCP (Model Context Protocol)", "Wo open standard jis par Connectors chalte hain"],
                ["Agent Skills standard", "December 2025 mein Anthropic ki published open specification, jo SKILL.md ko portable banati hai"],
                ["Agentic AI Foundation", "Linux Foundation ki taraf se bani body jo MCP aur related infrastructure ko khule tareeke se govern karti hai"],
                ["skill-creator", "Anthropic ki apni skill jo naye skills banane mein madad karti hai"],
                ["Custom GPT", "ChatGPT ka vendor-specific, non-portable \"teach it once\" feature"],
                ["Gems", "Gemini ka vendor-specific, non-portable \"teach it once\" feature"],
                ["Prompt injection", "Ek malicious skill ka AI ko unintended actions ki taraf manipulate karna"],
                ["Data exfiltration", "Code ka chupke se information bahar bhej dena"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;Skills &amp; Connectors&rdquo; crash course par based
              hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/skills-connectors-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/skills-connectors-crash-course
              </a>
              .
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
            <P>Pehle khud answer do, phir sawal pe click kar ke answer check karo.</P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "Skill aur Connector mein bunyadi farq kya hai?",
                  a: "Skill batati hai kaam kaise karna hai (recipe card), Connector real apps aur data tak access deta hai (kitchen). Skill on-demand fire hoti hai, Connector per-conversation enable hota hai. Dono partners hain, alternatives nahi.",
                },
                {
                  q: "Progressive disclosure kya hai, aur ye kyun important hai?",
                  a: "AI sirf skill ki short description hamesha loaded rakhta hai, poori instructions sirf tab load karta hai jab request match kare. Isi wajah se dus skills install karne se bhi koi performance impact ya confusion nahi hoti.",
                },
                {
                  q: "SKILL.md ki minimum requirement kya hai?",
                  a: "Ek folder jismein ek text file ho, naam exactly SKILL.md, jisme frontmatter mein name aur description ho (hamesha loaded), aur body mein plain-English instructions (sirf match hone par loaded).",
                },
                {
                  q: "Skill ki description field itni important kyun hai?",
                  a: "AI relevance decide karne ke liye sirf description parhta hai, instructions nahi. Vague description matlab skill kabhi fire nahi hoti, sharp description (kya + kab + exact phrases) matlab exact activation.",
                },
                {
                  q: "Skills, ChatGPT ke Custom GPTs ya Gemini ke Gems se kaise different hain?",
                  a: "Skills Agent Skills open standard par based hain, isliye portable hain, ek baar likho kai tools (Claude.ai, Claude Code, Codex CLI, Gemini CLI) mein chalao. Custom GPTs aur Gems vendor-specific hain, sirf apne hi product ke andar rehte hain.",
                },
                {
                  q: "Skills aur Connectors ke liye safety control alag kyun hai?",
                  a: "Connectors ke paas scope dials hote hain jo aap grant aur narrow kar sakte ho, isliye read-only se start karna unka control hai. Skills ke paas koi scope dial nahi, wo chat ki jitni access hai usi mein chalti hain, isliye enable karne se pehle skill parhna hi unka control hai.",
                },
                {
                  q: "2 real risks kya hain jo is chapter mein named hain?",
                  a: "Malicious skills (hidden instructions jo data leak ya prompt injection kar sakti hain) aur over-broad connector access (careless write-access se galat edits, galat jagah records, ya bina undo ke deleted files).",
                },
                {
                  q: "Kaunse problem ko Skill chahiye, kaunse ko Connector, ye kaise diagnose karte hain?",
                  a: "Sawal poocho: kya main baar baar explain karta hoon kaise karna hai? (Skill chahiye). Kya main baar baar kisi doosri app se data copy-paste karta hoon? (Connector chahiye). Dono? (Dono chahiye).",
                },
                {
                  q: "Ek skill test karte waqt, agar wo pehli reply se hi galat ho, to problem kahan hai?",
                  a: "Problem file mein hi hai, description bohot vague ya broad hai, ya koi instruction bohot loose hai. (Agar chat barhne pe kharab ho, to problem chat ki length hai, skill ki nahi.)",
                },
                {
                  q: "Ye poora chapter ka underlying shift kya hai?",
                  a: "AI ek box jismein type karte ho, wo nahi rehta, ye ek operating layer ban jata hai jo aapke standards jaanta hai (Skills se) aur aapke real tools tak pahunchta hai (Connectors se).",
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
        </section>

        {/* Prev / Next chapter nav */}
        <nav className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prevChapter ? (
            <Link
              href={`/anthropic-exam-prep/${prevChapter.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={15} />
              Pichla: {prevChapter.title}
            </Link>
          ) : (
            <Link
              href="/anthropic-exam-prep"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={15} />
              Sab Chapters
            </Link>
          )}
          {nextChapter ? (
            <Link
              href={`/anthropic-exam-prep/${nextChapter.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Agla: {nextChapter.title}
              <ArrowRight size={15} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted/60">
              Agla chapter jald aa raha hai
              <ArrowRight size={15} />
            </span>
          )}
        </nav>
      </main>

      <ScrollToTop />
      <NotesFooter />
    </div>
  );
}
