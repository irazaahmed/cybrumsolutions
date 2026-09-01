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
  "Claude aur ChatGPT ke workspace ko amli tareeke se chalane ka, Agent Factory book se liya gaya, sahih Roman Urdu revision guide, self-test quiz ke saath.";

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
  { id: "intro", text: "Do Minute Mein Dekhein", level: 2 },
  { id: "part1", text: "Part 1 · Cockpit", level: 2 },
  { id: "projects", text: "4 · Projects", level: 2 },
  { id: "memory", text: "5 · Memory Aur Instructions", level: 2 },
  { id: "artifacts", text: "6 · Artifacts", level: 2 },
  { id: "skills", text: "7 · Skills Aur Plugins", level: 2 },
  { id: "part3", text: "Part 3 · Pahunch Barhana", level: 2 },
  { id: "practice", text: "Practice: 6 Prompts", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations. Content and       */
/*  captions are drawn directly from the source figures.               */
/* ------------------------------------------------------------------ */

function ModelTierDiagram() {
  const tiers = [
    { icon: Zap, t: "Fast Default", q: "Roz-marra ke sawal, drafting, zyada tar kaam ke liye", d: "Tez aur sasta" },
    { icon: Brain, t: "Thinking Mode", q: "Kai marahil wali reasoning, tajziya, aur mushkil code ke liye", d: "Jawab dene se pehle mansooba banata hai" },
    { icon: Gem, t: "Heavy Flagship", q: "Waqai mushkil kaam ke liye", d: "Sab se gehra, sab se sust, sab se mehnga" },
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
        <span className="rounded-full border border-border px-2 py-0.5">Tez aur sasta</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border px-2 py-0.5">Gehra aur mehnga</span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Naam badalte rehte hain, lekin ye teen darje qaim rehte hain, model
        ko kaam ke mutabiq chunein, aadat ke mutabiq nahi
      </figcaption>
    </figure>
  );
}

function ProjectAnatomyDiagram() {
  const parts = [
    { icon: MessagesSquare, t: "Chats", d: "Ek jagah jama, bikhre huye nahi" },
    { icon: Database, t: "Knowledge", d: "Ek dafa upload ki hui files, har chat mein istemal ke qabil" },
    { icon: FileText, t: "Instructions", d: "Khud-kaar tarteeb se lagoo hone wali rehnumai" },
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
            Knowledge barhne par retrieval se search karta hai, taqreeban
            das guna zyada gunjaish ban jati hai
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-3.5">
          <p className="text-xs font-bold text-accent-bright">ChatGPT</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Project ke andar apni memory jama karta hai, main-chat memory se
            alag rakhi jati hai
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Sab se chhota System of Context jo aap kabhi banayenge
      </figcaption>
    </figure>
  );
}

function PersistenceTriadDiagram() {
  const items = [
    { icon: Settings2, t: "Standing Instructions", q: "Pukhta qawaid ke liye", d: "Aap hamesha kaun hain, output hamesha kaisa chahiye" },
    { icon: Brain, t: "Memory", q: "Badalti hui context ke liye", d: "Abhi kya sach hai" },
    { icon: FileText, t: "Projects", q: "Mehdood (scoped) kaam ke liye", d: "Ek client ya ek mauzu apne hi kamre mein" },
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
        Sab se aam ghalti ek ko doosre ki jagah rakh dena hai, teenon ko
        review karein, theek karein, aur jo baaqi na rehna chahiye usay
        mita dein
      </figcaption>
    </figure>
  );
}

function RoutingDiagram() {
  const routes = [
    { icon: Search, t: "Ek taaza fact, tezi se", use: "Web search", d: "Chand second mein, ek ya do sources ke sath" },
    { icon: Brain, t: "Bina nayi maloomat, sirf gehri reasoning", use: "Thinking mode", d: "Model jawab dene se pehle mansooba banata hai" },
    { icon: FileSearch, t: "Mustanad, hawale wali, kai-source report", use: "Research mode", d: "Khud-mukhtar tehqeeq mein minute lagte hain" },
    { icon: Database, t: "Organization ki apni maloomat", use: "Workplace search / connected apps", d: "Jure hue internal tools se jawab" },
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
        Routing roz ka delegation faisla hai, aur ghalat route chunna dono
        cockpits mein sab se aam roz ki barbadi hai
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
          "Ek dohraya jane wala kaam chunein",
          "Ek purana case dhoondein jiska sahi jawab pata ho",
          "Assistant se wo dobara banwayein",
          "Apni maloom sach ke sath muwazna karein",
          "Behtar banayein aur dobara chalayein",
        ]}
      />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm font-semibold text-foreground">Agar Match Ho Jaye</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Milte-julte kaam ke liye taeed-shuda bharosa, aur ek likha hua,
            dobara istemal ke qabil tareeqa
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <p className="text-sm font-semibold text-foreground">Agar Nakaam Ho Jaye</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Ye bhi ek natija hai, ye kaam insaan ke paas rahega, aur ab
            aapko wajah maloom hai
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Pass hona bharosa kamata hai, zimmedari kabhi transfer nahi karta,
        aap phir bhi naye natijon ki taeed karte hain
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
              Ye course nau (9) concepts sikhata hai jo Claude aur ChatGPT,
              donon workspaces mein kaam karte hain. Maqsad sirf itna hai:
              interface ke neeche wala <Strong>pattern</Strong> seekh lena.
              Buttons ki jagah badalti rehti hai, models ke naam badalte
              rehte hain, lekin jo tareeqa hai wo dono jaga wahi rehta hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Interface Mushkil, Concepts Aasan</SubHeading>
            <P>
              Ye maan kar chala jata hai ke aapko AI ke bunyadi tasawwurat
              maloom hain, lekin interface mein rasta dhoondna mushkil lagta
              hai. Model picker, plus menu, Projects, Memory, Skills,
              Plugins, Connectors ya apps, Search, Research, aur Thinking
              modes, ye sab kuch pehli nazar mein bikhri hui cheezein
              lagti hain.
            </P>
            <P>
              Asal maqsad ye hai ke <Strong>interface ke neeche wala
              pattern</Strong> seekha jaye. Projects kaam ko tarteeb dete
              hain, Memory context yaad rakhti hai, Skills tareeqe pack kar
              deti hain, Connectors bahar ki maloomat tak rasai dete hain,
              aur Research modes maloomat jama karte hain. Ye course{" "}
              <Strong>do cockpits sikhata hai, ek nahi.</Strong>
            </P>
            <Callout label="Waqt">
              Is chapter ko parhne mein taqreeban 30 se 35 minute lagte
              hain, aur practice prompts aur self-check ke liye taqreeban
              25 minute alag se darkaar hain.
            </Callout>
            <Callout label="Product Verification" tone="warn">
              Product ke daawe 25 August 2026 ko Anthropic aur OpenAI ki
              official documentation se taeed kiye gaye. Buttons apni jagah
              badalte rehte hain aur features change hote rehte hain, taaza
              maloomat ke liye support.claude.com aur help.openai.com
              dekhein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Is Se Pehle Kya Parh Chuke Hon</SubHeading>
            <P>Teen chapters is course se pehle darkar hain:</P>
            <CheckList
              items={[
                "What AI Actually Is",
                "AI Fluency (The 4Ds)",
                "AI Prompting in 2026",
              ]}
            />
            <RecapTable
              head={["Mauzu", "Kahan Parhaya Gaya", "Ye Course Kya Karta Hai"]}
              rows={[
                ["Models aur context window kaise kaam karte hain", "What AI Actually Is", "Unhi khayalaat ko istemal karta hai"],
                ["4D framework", "AI Fluency", "Isay product features par lagata hai"],
                ["Prompting ka tareeqa", "AI Prompting in 2026", "Isay asal workflows mein istemal karta hai"],
                ["Skills aur MCP ka tasawwur", "Skills & Connectors", "Inke controls se mutaruf karwata hai"],
                ["Desktop apps, coding tools, agentic hand-off", "Cowork & OpenWork aur General Agents", "Sirf mukhtasar taaruf deta hai"],
                ["Claude aur ChatGPT ke chat workspaces", "Yehi Chapter", "Inhein seedha sikhata hai"],
              ]}
            />
            <P>
              Ye course chat workspace ke andar hi mehdood rehta hai.
              Desktop agents, coding environments, aur bare agentic
              nizaam baad mein aate hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Do Minute Mein Dekhein</SubHeading>
            <P>Claude khol kar ye paste karein:</P>
            <PromptBox>{`List every control I can see in this workspace right now, and tell me
in one line what each one is for. Just the controls, no advice.`}</PromptBox>
            <P>Phir wahi cheez ek alag tab mein ChatGPT mein dohrayein.</P>
            <P>
              Aap ke paas do fehristein aayengi, alfaaz mukhtalif honge
              lekin bunyadi kaam wahi hoga, jaise artifact aur writing
              block, ya connector aur app, ya project knowledge aur project
              files. <Strong>Controls ke naam mukhtalif hain. In se hone
              wala kaam wahi hai.</Strong>
            </P>
            <Callout label="Ek Ehtiyat" tone="warn">
              Assistant apne hi interface ke baare mein hamesha qabil-e-
              bharosa nahi hota, isliye fehrist mein koi aisi cheez shamil
              ho sakti hai jo waqai maujood na ho, ya koi cheez chhoot bhi
              sakti hai. Isay ghor se dekhein. Ek bharosemand jawab ko usi
              cheez se muqable mein check karna Concept 9 hai, aur aap isay
              do minute mein hi mil chuke hain.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Cockpit</PartBanner>
            <SubHeading>1. Do Cockpits, Ek Nazm-o-Zabt (Discipline)</SubHeading>
            <P>
              Claude aur ChatGPT ko sath sath khola jaye to donon dekhne
              mein kaafi milte julte lagte hain. Donon mein pichli chats
              ki fehrist, message box, model ya reasoning control, files
              aur tools ka menu, projects ya workspaces, memory aur
              instructions, aur search-research features shamil hain.
            </P>
            <Callout label="Bunyadi Usool">
              <Strong>Aapko do bilkul mukhtalif tareeqe seekhne ki zaroorat
              nahi.</Strong> Aapko ek hi nazm-o-zabt seekhna hai, aur phir
              ye dhoondna hai ke har product ne apne controls kahan rakhe
              hain.
            </Callout>
            <P>Jo salahiyatein dono jaga kaam aati hain, wo ye hain:</P>
            <CheckList
              items={[
                "Kaam ko wazeh tareeqe se bayan karna",
                "Faidamand context faraham karna",
                "Kya delegate karna hai, ye faisla karna",
                "Jawabon ko check karna",
                "Kab zyada qawi model ki taraf jana hai, ye jaanna",
                "Hassas maloomat ki hifazat karna",
              ]}
            />
            <P>
              Jo cheez farq karti hai wo hai product ke naam, layout, aur
              taqat, aur ye waqt ke sath badalti rehti hain.
            </P>
            <Callout label="Misaal">
              Pilots ek hi dafa udna seekhte hain, phir sirf ye seekhte hain
              ke jahaz ke switches kahan rakhe hain. Udna transferable
              hunar hai, switches ki jagah har dafa dekh li jati hai.
            </Callout>
            <P>
              Donon ko jaanna is liye zaroori hai kyunke{" "}
              <Strong>Claude aur ChatGPT har kaam par ek jaisa kaarkardagi
              nahi dikhate.</Strong> Jo model ek qisam ke kaam mein
              bemisaal hai, wo doosri qisam ke kaam mein kamzor ho sakta
              hai. Isay <Strong>platform awareness</Strong> kehte hain, yani
              ye jaanna ke har tool kis cheez mein achha hai, ek hi
              interface se wafadar ban jane ki bajaye.
            </P>
            <P>
              Dono companies chat se aage bhi desktop apps, coding tools,
              aur browser agents pesh karti hain, lekin ye course sirf chat
              window tak mehdood rehta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Sab Se Ahem Beginner Aadat</SubHeading>
            <PullQuote>
              Assistant se aise baat karein jaise ek qabil colleague se
              karte hain.
            </PullQuote>
            <P>Koi bhi ahem darkhwast bhejne se pehle teen cheezein poori karein:</P>
            <Ladder
              steps={[
                { title: "Manzar Set Karein", note: "Aap kaun hain aur asal mein kya hasil karna chahte hain?" },
                { title: "Kaam Define Karein", note: "Assistant ko theek theek kya karna chahiye?" },
                { title: "Qawaid Set Karein", note: "Kaunsa lehja, format, hadood, ya misaalein follow karni chahiyen?" },
              ]}
            />
            <PullQuote>Pattern seekhein, button ki jagah nahi.</PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>2. Models Aur Thinking Modes</SubHeading>
            <P>
              Claude aur ChatGPT, donon aapko ye chunne dete hain ke kisi
              kaam par kitni salahiyat kharch karni hai. Ghalat shuruaati
              nuqta model ke naam hain, kyunke wo tezi se badalte hain.
              Sahi shuruaati nuqta teen darjon wala pattern hai.
            </P>
            <ModelTierDiagram />
            <RecapTable
              head={["Darja", "Behtareen Kis Ke Liye", "Trade-off"]}
              rows={[
                ["Fast Default", "Roz-marra ke sawal, drafting, khulasay, routine kaam", "Tez aur sasta, mushkil masail par kam gehrai"],
                ["Thinking / Reasoning", "Kai marahil wali reasoning, tajziya, math, mushkil code", "Sust, zyada ehtiyat ke sath"],
                ["Heavy Flagship", "Sab se mushkil tajziya aur lambe, mutalba karne wale kaam", "Sab se sust aur mehnga, sab se zyada qabil"],
              ]}
            />
            <P>
              <Strong>Claude ke model naam:</Strong> Haiku (sab se tez aur
              sasta), Sonnet (roz-marra ka intekhab), aur Opus (heavy
              flagship). Haiku aur Sonnet fast darje mein aate hain, Opus
              flagship darje mein. Thinking ek alag switch hai, model ka
              naam nahi.
            </P>
            <P>
              <Strong>ChatGPT ke model naam:</Strong> Instant (roz-marra)
              se lekar Pro (sab se mushkil kaam) tak, aur beech mein
              thinking ke darje.
            </P>
            <Callout label="Ahem Note">
              Anthropic ke apne certification exams bhi Claude ke naam se
              hi sawal poochte hain.
            </Callout>
            <SubHeading>Do Aasan Usool</SubHeading>
            <Ladder
              steps={[
                { title: "Usool 1 · Tez Se Shuru Karein", note: "Zyada tar roz-marra ke kaam ke liye normal fast mode istemal karein. Chhote rewrites, khulasay, ya aasan wazahaton ke liye heavy reasoning ka intezar na karein." },
                { title: "Usool 2 · Mushkil Kaam Par Barhein", note: "Kai marahil wali logic, ghor se muwazna, riyazi (mathematics), mushkil debugging, ya sahi hona zaroori ho aisi code ke liye thinking mode ya zyada qawi model istemal karein." },
              ]}
            />
            <Callout label="Ek Ahem Baat">
              &ldquo;AI fail ho gaya&rdquo; ka asal matlab kabhi kabhi ye
              hota hai ke &ldquo;maine ghalat darje ki salahiyat istemal
              ki.&rdquo;
            </Callout>
            <P>
              Wo usool jo har naye model release ke baad bhi qaim rehta
              hai: <Strong>model ko kaam ke mutabiq chunein, aadat ke
              mutabiq nahi.</Strong> Roz-marra ke liye fast, mushkil
              reasoning ke liye thinking, aur waqai mushkil kaam ke liye
              flagship. Pehle reasoning ka darja chunein, phir current
              model naam seekhein.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3. Wo Context Jo Aap Attach Karte Hain</SubHeading>
            <P>
              Ek language model sirf usi maloomat par kaam kar sakta hai
              jo uske saamne ho. Isi liye attachments matter karti hain.
              Support ki jane wali files mein PDFs, Word documents,
              spreadsheets, CSV files, images, screenshots, aur code
              files shamil hain.
            </P>
            <P>
              Jab aap koi file attach karte hain, to aap usi guftagu ke
              liye assistant ko zyada context de rahe hote hain. Iska
              muwazna dekhein:
            </P>
            <RecapTable
              head={["Bina File", "File Attach Ki Hui"]}
              rows={[["\"Summarize this contract.\"", "\"Summarize this contract.\" (contract file attach ki hui)"]]}
            />
            <P>
              Alfaaz taqreeban ek jaise hain. Doosra darkhwast is liye
              faidamand hai kyunke assistant waqai contract dekh sakta
              hai. Agar aapko kisi dashboard, error message, chart, ya
              interface mein madad chahiye, to usay dikhana usay yaddasht
              se bayan karne se behtar rehta hai. Donon products live web
              search bhi kar sakte hain, jab model ki apni maloomat kaafi
              na ho to search taaza maloomat le aati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Lambi Guftagu Ko Sambhalna</SubHeading>
            <P>
              Donon products current guftagu ka record rakhte hain, jo
              baad ke jawabon ko shakl deta hai. Is record ki bhi ek hadd
              hoti hai, aur kisi lambe kaam mein aap us hadd tak pahunch
              jayenge.
            </P>
            <P>
              Iski ek misaal: aap ne poora din ek hi chat mein quarterly
              board report likhne mein guzara. Teen alamaat batati hain ke
              chat purani (stale) ho chuki hai:
            </P>
            <CheckList
              items={[
                "Subah di gayi koi hidayat (jaise \"bullet points na likho\") bhool jati hai aur bullets wapis aa jate hain",
                "Pehle diye gaye kisi figure se tazaad hota hai",
                "Jawab aam mashware ki taraf drift ho jate hain, jo kisi bhi report par lagoo ho sakte hain",
              ]}
            />
            <P>
              Aisa hone par na to zabardasti chalte rahein, aur na hi chat
              chhor dein. Pehle ek <Strong>state summary</Strong> mangwayein,
              yani ek mukhtasar record ke ab tak kya kaam ho chuka hai, kya
              abhi baaqi hai, aur di gayi har hidayat:
            </P>
            <PromptBox>{`Summarize what we have decided so far, what is still open, and every
rule I gave you. Keep it short enough to paste into a new chat.`}</PromptBox>
            <P>
              Summary parhein, ghaltiyan theek karein, phir usay files ke
              sath ek naye chat mein paste kar ke aage barhein. Agar aap
              khud ko har hafte wahi summary paste karte hue payein, to
              yehi ishara hai ke ab ek project ki zaroorat hai, jo Concept
              4 hai.
            </P>
            <Callout label="Ek Aadat Banayein">
              Koi ahem sawal poochne se pehle khud se poochein:{" "}
              <Strong>ek qabil insaan colleague ko is ka theek jawab dene
              se pehle kya dekhna chahiye hoga?</Strong> Phir assistant ko
              wahi maal (material) faraham karein.
            </Callout>
            <P>
              Behtar context aksar ek chaalaak prompt se zyada jawab
              behtar banati hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · Workspace Ko Apna Banana</PartBanner>
            <SubHeading>4. Projects, Ek Kaam Ke Liye Ek Kamra</SubHeading>
            <P>
              AI ko kuch hafte istemal karne ke baad, sidebar bikhar jata
              hai. Ek hi client ya mauzu ke baare mein kai chats sidebar
              mein alag alag pari hoti hain, kaam ki files sirf ek chat
              mein hoti hain, aur background baar baar dobara samjhana
              parta hai.
            </P>
            <Callout label="Definition">
              Ek <Strong>project</Strong> ek hi silsile wale kaam ke liye
              ek workspace hai. Isay ek aise kamre ki tarah samjhein jahan
              ek mauzu se juri har cheez ek sath rehti hai.
            </Callout>
            <ProjectAnatomyDiagram />
            <P>Ek project teen cheezein rakhta hai:</P>
            <CheckList
              items={[
                "Chats: usi kaam se juri saari guftagu",
                "Knowledge: usi project ke liye upload ki gayi files",
                "Instructions: project ke andar assistant kis tarah kaam kare, is ki pukhta rehnumai",
              ]}
            />
            <P>
              Iski ek misaal, Quarterly Board Reporting Project mein ye
              shamil ho sakta hai: pichle quarter ka board deck, current
              financial model, reporting ka style guide, tone aur audience
              ke baare mein hidayaat, aur board report se juri har guftagu.
              Ab aapko wahi files dobara upload karne ya wahi hidayaat
              dohrane ki zaroorat nahi. <Strong>Yehi poori baat hai: ek
              project ek silsile wale kaam ke liye context ko pukhta
              (persistent) bana deta hai.</Strong> Is kitab ki zabaan mein,
              ek project ek chhota System of Context hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Claude Aur ChatGPT Ka Farq</SubHeading>
            <P>
              <Strong>Claude ka tareeqa (retrieval):</Strong> jab project
              knowledge context window se bari ho jati hai, to Claude khud
              ba khud project knowledge ko search karna shuru kar deta
              hai, is se gunjaish taqreeban das guna barh jati hai. Ye
              switch khud ba khud hota hai, aur ye ek paid-plan feature
              hai.
            </P>
            <P>
              <Strong>ChatGPT ka tareeqa (memory):</Strong> project memory
              shamil karta hai, jo do tarah se kaam kar sakti hai:{" "}
              <Strong>default memory</Strong> mein wasee (wider) memory bhi
              shamil ho sakti hai, jabke <Strong>project-only
              memory</Strong> mein project ek asal hadd (boundary) ban jata
              hai, aur bahar ki memory andar nahi aati. Project-only memory
              hi asal mein isolation banati hai.
            </P>
            <P>
              Yani ek project hamesha kaam ko tarteeb dene mein madad
              karta hai. <Strong>Project-only memory</Strong> hi wo cheez
              hai jo usay isolation mein badalti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Project Kab Banayein</SubHeading>
            <Callout label="Test">
              Agar aap ne teen dafa wahi background samjhaya hai ya wahi
              file upload ki hai, to us kaam ko ek project ki zaroorat
              hai. Ek dafa ke sawalat ko project ki zaroorat nahi hoti.
            </Callout>
            <PullQuote>Projects usi kaam ke liye hain jo jari rehta hai.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- MEMORY ---------------------- */}
        <section id="memory" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>5. Memory Aur Pukhta Instructions</SubHeading>
            <P>Naye log in teenon cheezon ko aksar aapas mein khalt-malt kar dete hain.</P>
            <PersistenceTriadDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Standing Instructions: Pukhta Qawaid</SubHeading>
            <P>
              Standing instructions wo qawaid hain jo ek dafa likhe jate
              hain aur wasee paimane par lagoo hone chahiyen, jaise
              &ldquo;wazahat se pehle jawab do&rdquo;, &ldquo;jab tak main
              technical tafseel na maangoon, aasan zabaan istemal karo&rdquo;,
              ya &ldquo;main business leaders ke liye likhta hoon, software
              engineers ke liye nahi.&rdquo; Claude mein ye settings aur
              styles mein rakhi jati hain, ChatGPT mein Custom Instructions
              mein (Settings aur Personalization ke andar). Ye un cheezon
              ke liye hain jo <Strong>pukhta (stable)</Strong> hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Memory: Aapke Baare Mein Badalti Hui Context</SubHeading>
            <P>
              Memory wo cheez hai jo assistant aapki guftaguon se uthata
              hai aur baad mein istemal kar sakta hai, jaise zahir ki hui
              pasandeed cheezein, baar baar aane wale maqasid, aapke kaam
              karne ke tareeqe se juri facts, ya koi bhi cheez jo aap ne
              yaad rakhne ko kaha ho. Donon products aapko memory review,
              tarmeem, aur delete karne dete hain.
            </P>
            <Callout label="Ahem Note" tone="warn">
              Kaam wale account par pehle ye check karein ke memory chalu
              bhi hai ya nahi. Claude individual plans par memory khud ba
              khud chalu kar deta hai, lekin Team aur Enterprise par usay
              band rakhta hai, jab tak koi owner khud usay chalu na kare.
            </Callout>
            <P>
              Donon products ek aisa mode bhi dete hain jo guftagu ko
              history aur memory se bahar rakhta hai, Claude mein
              incognito chat, ChatGPT mein temporary chat. Lekin dono
              companies safety aur ghalat-istemal ke jaiza ke liye
              taqreeban tees din ke liye ek copy phir bhi mehfooz rakhti
              hain. Isliye inhein <Strong>memory-free samjhein, trace-free
              nahi.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Projects: Ek Silsile Wale Kaam Ki Context</SubHeading>
            <P>
              Ye donon se mukhtalif hai. Projects kisi khaas client, course,
              tehqeeqi mauzu, product, ya jari kaam ke silsile ke gird
              context rakhte hain.
            </P>
            <Callout label="Yaad Rakhne Ka Usool">
              <Strong>Pukhta qawaid ke liye instructions, badalti hui
              context ke liye memory, aur mehdood kaam ke liye
              projects.</Strong> Yehi ek usool zyada tar configuration ki
              ghaltiyon ko rok deta hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Mehfooz Context Ek Zimmedari Hai</SubHeading>
            <P>
              Do fikarein hain, aasani aur hassasiyat. Mehfooz context mein
              hassas ya niji maloomat bhi ho sakti hai. Ye purani bhi hoti
              rehti hai, aur purani context khamoshi se nakaam hoti hai,
              koi error message nahi aata, sirf ek aisa jawab aata hai jo
              bharosemand lagta hai aur ghalat hota hai.
            </P>
            <P>
              Misaal ke taur par, agar pichle quarter ka financial model
              abhi bhi Quarterly Board Reporting project mein pada hai, to
              is quarter ka board deck pichle quarter ke numbers ko sunwar
              kar quote kar dega. Assistant ye nahi bata sakta ke aap ne
              jo di hai wo purani ho chuki hai.
            </P>
            <Callout label="Zaroori Amal">
              Jo kuch mehfooz hai usay ek tarteeb par review karein, mahana,
              ya jab bhi aapka role ya koi project badle. Har cheez ke liye
              faisla karein: rakhein, theek karein, ya mita dein. Ye memory,
              standing instructions, aur har project ki files, sab ke liye
              karein. Jab mauzu ki zaroorat ho to incognito ya temporary
              chat istemal karein. Kaam wale account par apni organization
              ki policy follow karein.
            </Callout>
            <P>
              Mehfooz context is liye faidamand hai kyunke wo waqt ke sath
              barhta hai. Ye ek aisi jagah bhi hai jahan ehtiyat matter
              karti hai. Ek achi tarah configure ki hui assistant hafton
              ke istemal ke baad zyada kaam ki ho jati hai. Model nahi
              badla, uske gird ki context behtar ho gayi.
            </P>
            <PullQuote>Pukhta context tabhi madad karti hai jab sahi maloomat sahi jagah ho.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- ARTIFACTS ---------------------- */}
        <section id="artifacts" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>6. Artifacts Aur Writing Blocks: Wo Kaam Jo Aap Sath Le Ja Sakte Hain</SubHeading>
            <P>
              Chat guftagu ke liye achi hai, lekin mukammal kaam rakhne ke
              liye ek kamzor jagah hai. Agar aap 2,000 lafzon ki report,
              ek chalta hua calculator, ek diagram, ya ek chhoti application
              mangte hain, to natija ek alag cheez ki tarah chahiye hota
              hai, scroll mein bikhri ek message ki tarah nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Claude Mein: Artifacts</SubHeading>
            <Callout label="Definition">
              Ek <Strong>artifact</Strong> ek alag output hai jo guftagu ke
              barabar khulta hai.
            </Callout>
            <P>
              Artifact ki qismein: document, code, web page, diagram,
              vector image, calculator, dashboard, aur ek chhoti
              interactive application. Aap Claude se baat karte rehte hain
              jabke artifact wahin maujood rehta hai, jise banaya aur
              tarmeem kiya ja raha ho. Claude ke paas Word, Excel,
              PowerPoint, aur PDF files banane ki alag salahiyatein bhi
              hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>ChatGPT Mein: Writing Blocks Aur Code Blocks</SubHeading>
            <P>
              Purani tutorials &ldquo;canvas&rdquo; aur ek sath-sath edit
              karne wale panel ka zikr karti hain. 2026 mein OpenAI ne
              apne current models se canvas hata diya aur wahi kaam khud
              guftagu ke andar le aaya, <Strong>writing blocks</Strong> aur{" "}
              <Strong>code blocks</Strong> ki soorat mein, yani thread ke
              andar hi maujood, tarmeem ke qabil hisse. Agar koi tutorial
              aapko canvas kholne ko kahe aur wo na mile, to yehi wajah
              hai.
            </P>
            <P>
              Design mukhtalif hai. Khayal wahi hai:{" "}
              <Strong>kaam ke natije ko kaam ke baare mein guftagu se alag
              rakhna.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Behtar Natije Kaise Hasil Karein</SubHeading>
            <P>
              &ldquo;ek dashboard&rdquo; ya &ldquo;ek report&rdquo; mat
              maangein. Bataein ke mukammal cheez ko asal mein kya karna
              chahiye.
            </P>
            <P>Behtareen:</P>
            <PromptBox>{`Build a monthly budget tracker. I should be able to enter expenses
by category, see a pie chart, and get a warning when I go over budget.`}</PromptBox>
            <P>Kamzor:</P>
            <PromptBox>Build a budget tracker.</PromptBox>
            <P>
              Ye bhi batayein ke ye kis ke liye hai, kyunke naye
              employees ke liye ek flowchart, tajurbekaar engineers ke
              liye flowchart jaisi cheez nahi hoti. Format bhi bata dein:
              agar jawab data hai, to table ya spreadsheet file mangein,
              paragraph nahi. Data se murad barah vendors, unki qeematein
              aur lead times, ya koi bhi aisi cheez jise colleague Excel
              mein daalega. Barah vendors ka ek paragraph sort, filter, ya
              sheet mein paste nahi ho sakta. Ek table ho sakta hai. Agar
              aap maangein, donon assistants spreadsheet file bana denge,
              jise download kiya ja sakta hai. Phir ek waqt mein ek
              tabdeeli kar ke tarmeem karein.
            </P>
            <Callout label="Beginner Ke Liye Hairat">
              Yehi wo jagah hai jahan naye log pehli haqeeqi hairat
              mehsoos karte hain: <Strong>aap ek faidamand software ka
              bayan karte hain, aur kaam karta hua software saamne aa jata
              hai.</Strong>
            </Callout>
            <PullQuote>
              Chat guftagu hai, artifacts, writing blocks, aur code blocks
              hi asal kaam rakhte hain.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- SKILLS ---------------------- */}
        <section id="skills" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>7. Skills Aur Plugins: Kaam Karne Ke Bandhe Hue Tareeqe</SubHeading>
            <P>
              Projects is sawal ka jawab dete hain ke maloomat ko ek sath
              kaise rakha jaye, lekin dohrahat (repetition) ek aur sawal
              khari karti hai: <Strong>assistant se har baar wahi tareeqa
              kaise dohrwaya jaye?</Strong> Jawab hai: Skills.
            </P>
            <Callout label="Definition">
              Ek <Strong>skill</Strong> kisi kaam ko karne ka ek bandha
              hua tareeqa hai.
            </Callout>
            <P>
              Is mein hidayaat, misaalein, madadgar wasail, aur kabhi kabhi
              code shamil hota hai. Jab koi milta julta kaam saamne aata
              hai, assistant khud us skill ko load kar leta hai.
            </P>
            <P>Aap ek skill in cheezon ke liye bana sakte hain:</P>
            <CheckList
              items={[
                "Quarterly business reviews likhna",
                "Ek contract ko checklist ke against check karna",
                "Customer meeting ka brief tayar karna",
                "Kachay notes ko pasandeeda report format mein badalna",
              ]}
            />
            <P>
              Har chat mein tareeqa dobara sikhane ki bajaye, aap tareeqe
              ko ek hi dafa pack kar dete hain. Claude ke paas skills hain,
              ChatGPT ke paas bhi skills hain. Products is mein farq
              rakhte hain ke skills kahan available hain aur kaise manage
              hoti hain, lekin bunyadi khayal ab dono mein sanjha hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Agent Skills Standard</SubHeading>
            <P>
              Donon vendors ek khuli standard, Agent Skills (agentskills.io),
              par kaam karte hain. Ek skill Markdown files ka ek folder
              hoti hai, jiske peeche na koi server hota hai na koi
              runtime, aur isi liye ye ek jaga se doosri jaga safar kar
              sakti hai. Kai companies ke dus-hazaar tools ab isi format ko
              parh sakte hain, isliye ek product ke liye likhi hui skill
              doosre product mein bhi install ho sakti hai. Ye ek
              workflow ko ek prompt se zyada pukhta cheez bana deta hai,
              jo kisi ek vendor mein qaid na ho. Yehi is course ka shuruati
              sabaq bhi hai: <Strong>nazm-o-zabt hamesha rehta hai, tool
              badalta rehta hai.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Plugin Kya Hai?</SubHeading>
            <Callout label="Definition">
              Ek <Strong>plugin</Strong> ek wasee tarah ke kaam ke liye
              salahiyaton ko pack karta hai.
            </Callout>
            <P>
              Is mein kai skills, bahar ki apps se connections, aur kabhi
              kabhi commands ya sub-agents shamil hote hain. Ye ek install
              hone wala package hota hai jo kisi job function ke liye
              banaya jata hai.
            </P>
            <RecapTable
              head={["Cheez", "Ek Line Mein"]}
              rows={[
                ["Skill", "Ek tareeqa sikhati hai"],
                ["App ya Connector", "Bahar ke nizaam tak rasai deta hai"],
                ["Plugin", "In sab ko sath lapet deta hai"],
              ]}
            />
            <Callout label="Directory">
              Claude ab skills, connectors, aur plugins ek hi directory,{" "}
              claude.ai/directory, mein fehrist karta hai, jo khud kuch
              banane se pehle dekhne ka sab se tez tareeqa hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Custom GPTs Ke Baare Mein</SubHeading>
            <P>
              ChatGPT ke paas <Strong>custom GPTs</Strong> bhi hain. Ek
              custom GPT ek alag se configure ki hui assistant hai jise
              aap jaan-boojh kar khulte hain, aur iski apni hidayaat,
              persona, knowledge, aur tools hote hain. Ye ek skill se
              mukhtalif cheez hai.
            </P>
            <RecapTable
              head={["Feature", "Maqsad"]}
              rows={[
                ["Project", "Kaam ke silsile ke liye context mehfooz karta hai"],
                ["Skill", "Kaam karne ka tareeqa mehfooz karta hai"],
                ["Custom GPT", "Ek alag se configure ki hui assistant"],
                ["Plugin", "Salahiyaton ko sath pack karta hai"],
              ]}
            />
            <Callout label="Ahem Farq">
              <Strong>Projects knowledge mehfooz karte hain. Skills kaam
              anjaam deti hain.</Strong> Ek customer-preparation skill un
              customer files ko istemal kar sakti hai jo ek project mein
              mehfooz hain. Project <Strong>&ldquo;kya&rdquo;</Strong>{" "}
              faraham karta hai, skill <Strong>&ldquo;kaise&rdquo;</Strong>{" "}
              faraham karti hai.
            </Callout>
            <PullQuote>Jab koi tareeqa baar baar dohraya jaye, to us tareeqe ko pack kar dein.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Pahunch Barhana</PartBanner>
            <SubHeading>8. Connectors, Apps, Aur Sawal Ko Route Karna</SubHeading>
            <P>
              Ab tak assistant zyada tar usi maloomat par kaam karti rahi
              hai jo aap ne uske saamne rakhi. Lekin aapki asal maloomat
              zyada tar kahin aur rehti hai: email, calendar, cloud
              storage, project-management tools, chat systems, aur company
              ke knowledge bases. Iska hal connectors aur apps hain.
            </P>
            <P>
              Claude is ke liye <Strong>connector</Strong> lafz istemal
              karta hai, ChatGPT <Strong>app</Strong> (pehle connector bhi
              kehta tha). Dono naam ek hi qisam ki cheez ke liye hain,
              sirf product ke naam farq hai. Ek connector ya app assistant
              ko doosre nizaam mein dhoondhne, parhne, aur kabhi kabhi amal
              karne dete hain, jitni ijazat aap dein.
            </P>
            <CheckList
              items={[
                "\"Wo email dhoondo jahan hum ne vendor contract par baat ki thi.\"",
                "\"Kal mere kaunse meetings hain?\"",
                "\"Pichle hafte ke project notes ka khulasa do.\"",
                "\"Mere sab se ahem priority tasks kaunse hain?\"",
              ]}
            />
            <P>
              Ab assistant aapke asal systems se jawab de sakta hai, har
              cheez chat mein copy karne ki bajaye.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>MCP: Sanjha Integration Standard</SubHeading>
            <P>
              Dono ecosystems ek standard, Model Context Protocol (MCP), ko
              support karte hain. Isay aam taur par &ldquo;AI tools ke
              liye USB-C&rdquo; kaha jata hai, yani ek hi standard plug,
              jisse ek dafa banaya gaya tool kai mukhtalif assistants
              istemal kar sakte hain. Claude ke custom connectors MCP par
              chalte hain, ChatGPT ke apps bhi Apps SDK ke zariye MCP par
              bante hain.
            </P>
            <Callout label="Ek Ahem Ehtiyat" tone="warn">
              Ye waqai faidamand hai, lekin is mukhtasar mumasilat (analogy)
              ke peeche ek baat chhup nahi jani chahiye: ek USB-C cable
              lagana bharose ka faisla nahi hota. Ek MCP tool jorna hota
              hai. <Strong>Plug standard hai, rasai nahi.</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Connections Permission Ke Faisle Hain</SubHeading>
            <P>
              Kisi tool ko jorna sirf productivity ka faisla nahi, ye
              security aur governance ka faisla hai, yani ye faisla ke kis
              ko kya dekhne aur karne ki ijazat hai. Jorne se pehle ye
              poochein:
            </P>
            <CheckList
              items={[
                "Ye kya parh sakta hai?",
                "Kya ye bahar ki duniya mein likh sakta hai, bhej sakta hai, mita sakta hai, khareed sakta hai, ya koi aur amal kar sakta hai?",
                "Kya mujhe is source par bharosa hai?",
                "Kya mujhe is account ya nizaam ko jorne ki ijazat hai?",
              ]}
            />
            <Callout label="Misaal" tone="warn">
              Kaam wala email jorna bohot zyada maloomat zahir kar sakta
              hai, chahe assistant sirf wahi dekhe jo aapka apna account
              pehle se dekh sakta hai.
            </Callout>
            <P>
              Connectors aur apps ko waise hi samjhein jaise software
              install karne ko samajhte hain: faidamand, aur jaan-boojh
              kar permission-gated.
            </P>
            <P>
              Ek connector ya app sirf wahi kar sakta hai jiske liye wo
              bana ho. Agar aapke kaam ko assistant se koi cheez bhejwani
              hai, to pehle taeed karein ke bhejna us tool ke actions mein
              shamil hai. Permissions un actions mein se chuntein jo tool
              ke paas pehle se hain, wo nayi actions add nahi karte.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Search, Thinking, Ya Research?</SubHeading>
            <P>
              Naye log aksar kaam ke liye ghalat mode chun lete hain.
            </P>
            <RoutingDiagram />
            <RecapTable
              head={["Kya Chahiye", "Kya Istemal Karein", "Misaal"]}
              rows={[
                ["Ek taaza fact", "Web search", "\"Aaj ki exchange rate kya hai?\""],
                ["Sakht reasoning, koi nayi maloomat nahi", "Thinking mode", "\"In teen pricing strategies ka muwazna karo.\""],
                ["Mustanad, gehri tehqeeq", "Research mode", "\"Warehouse robotics ki current market research karo.\""],
                ["Organization ki maloomat", "Workplace search ya connected apps", "\"Latest approved pricing policy dhoondo.\""],
              ]}
            />
            <P>
              Pehla sawal ye poochna chahiye: <Strong>main assistant se
              kis qisam ka kaam maang raha hoon?</Strong> Ek fact par jo
              search second mein de sakta hai, deep research zaya na
              karein. Jab asal masla reasoning ho to search ki taraf na
              jayein. Jab kaam ko kai-source tehqeeq chahiye ho to sirf
              aam chat istemal na karein.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Research Mode Ek Alag Cheez Hai</SubHeading>
            <P>
              Research mode &ldquo;behtar search&rdquo; nahi hai. Assistant
              ek tehqeeq ka mansooba banata hai, kai searches chalata hai,
              raabton (leads) ko follow karta hai, sources parhta hai, aur
              hawalon (citations) ke sath ek tarteeb-yaafta report deta
              hai. Is mein second nahi, minute lagte hain. Aap ek{" "}
              <Strong>tehqeeq</Strong> ka kaam de rahe hote hain, sirf ek
              chhota sawal nahi.
            </P>
            <Callout label="Ek Ahem Yaad-Dahani" tone="warn">
              Report aane ke baad bhi samajh-boojh (judgment) khatam nahi
              hoti. Ahem daawon ko check karein. Hawale khol kar dekhein.
              Research aapki pahunch barhati hai, ye aapki zimmedari khatam
              nahi karti.
            </Callout>
            <PullQuote>Sawal bhejne se pehle usay route karein.</PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>9. Us Kaam Par Sabit Karein Jo Aap Pehle Se Jaante Hain</SubHeading>
            <P>
              Aapko kaise pata chalega ke assistant waqai aapke kaam mein
              achhi hai? Sahi paimana koi benchmark ya demo nahi, balke{" "}
              <Strong>aapka apna kaam, aapka apna data, aapka apna
              maiyaar (standard) hai.</Strong>
            </P>
            <Callout label="Behtareen Beginner Tareeqa">
              Assistant ko aisay kaam par aazmayein jo aap pehle mukammal
              kar chuke hain aur jis par aapko pehle se bharosa hai.
            </Callout>
            <ProveItLoopDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Misaal: Program Director</SubHeading>
            <P>
              Ek program director har quarter attendance aur employment
              outcomes ka tajziya karta hai. Wo agle report ke liye AI se
              madad chahta hai. Usay naye data par pehle se bharosa nahi
              karna chahiye. Iski jagah, wo assistant ko pichle quarter ka
              raw data deta hai, kyunke usay pehle se maloom hai ke sahi
              tajziya kaisa dikhta hai. Phir wo assistant se wo kaam dobara
              karwata hai. Ab uske paas muwazna karne ke liye ek asal cheez
              hai. Agar assistant koi ahem pattern miss kar de, to wo
              hidayaat behtar bana sakta hai. Agar data mein hi koi masla
              nikle jo tajziya ke liye zaroori hai, to usay ek data ka
              masla mil gaya. Agar assistant kaam ka koi hissa bharosemand
              tareeqe se nahi kar pata, to wo hissa insaan ke paas rehta
              hai. Teenon natije faidamand hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Paanch Marahil Ka Sabit Karne Wala Chakkar</SubHeading>
            <Ladder
              steps={[
                { title: "Ek Dohraya Jane Wala Kaam Chunein", note: "Theek theek wazeh rahein." },
                { title: "Ek Purana Case Dhoondein", note: "Aisa jiska sahi natija aapko pehle se maloom ho." },
                { title: "Assistant Se Dobara Banwayein", note: "Usay wahi context dein jo aapke paas aam taur par hoti." },
                { title: "Muwazna Karein", note: "Kya match hua? Kya nakaam hua? Kaunsi hidayat missing thi?" },
                { title: "Behtar Banayein Aur Dobara Chalayein", note: "Jab tak kaafi achha na ho, ya ye faisla ho jaye ke ye kaam delegate nahi hona chahiye." },
              ]}
            />
            <Callout label="Ek Ahem Baat">
              Ye aakhri natija bhi koi nakaami nahi. Ye seekhna ke{" "}
              <Strong>kya delegate nahi karna</Strong>, ek ghante ke waqt
              ke qabil hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pass Hona Asal Mein Kya Sabit Karta Hai?</SubHeading>
            <P>
              Ye aapko <Strong>milte julte mustaqbil ke kaam ke liye
              taeed-shuda bharosa</Strong> deta hai. Ye sabit nahi karta ke
              assistant har agle case mein bhi sahi hoga. Aur ye zimmedari
              transfer nahi karta.
            </P>
            <P>Ab bhi in cheezon ki zaroorat rehti hai:</P>
            <CheckList
              items={[
                "Naye natijon ka jaiza lein ke kya wo mantiqi (make sense) hain",
                "Aakhri kaam ke zimmedar khud bane rahein",
                "Jahan munasib ho, AI ki madad zahir karein",
                "Bare-khatray (high-risk) faislon ko theek insaani nigrani mein rakhein",
              ]}
            />
            <Callout label="Ek Tip">
              Agar mumkin ho, wahi test Claude aur ChatGPT, donon mein
              chalayein. Ek pehle se samjhe hue kaam par do assistants ka
              muwazna karna, platform awareness banane ka sab se tez
              tareeqa hai.
            </Callout>
            <P>
              Ye chhoti si mashq aapki pehli evaluation suite hai.
            </P>
            <PullQuote>
              Bharosa maloom kaam ke against kamana chahiye, kisi achhe
              lagne wale jawab se farz nahi kar lena chahiye.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Chhota Khulasa, Prompts Se Pehle</SubHeading>
            <P>
              Ab aapke paas donon products ka naqsha (map) hai. Claude aur
              ChatGPT alag alag tools hain, lekin kaafi hisson mein ek jaisi
              soch par bane hain.
            </P>
            <CheckList
              items={[
                "Models aur thinking modes, kitni salahiyat kharch honi hai, ye control karte hain",
                "Attachments, is waqt zaroori context faraham karte hain",
                "Projects, ek kaam ke silsile ke liye context ek sath rakhte hain",
                "Standing instructions, pukhta qawaid rakhti hain",
                "Memory, aapke baare mein badalti hui context rakhti hai",
                "Artifacts, writing blocks, aur code blocks, mukammal kaam ko chat scroll se bahar rakhte hain",
                "Skills, dohraye jane wale tareeqe pack karti hain",
                "Plugins, poore kaam ki qisam ke liye salahiyatein bandhte hain",
                "Claude mein connectors aur ChatGPT mein apps, bahar ke systems tak pahunchate hain",
                "MCP, donon ke neeche sanjha integration standard hai",
                "Search, thinking, aur research, teen mukhtalif sawalon ke teen mukhtalif rastay hain",
                "Jaani-pehchani kaam par test karna, bharosa kamane ka tareeqa hai",
              ]}
            />
            <P>Products badalte rahenge. Ye zehni naqsha current interface se kahin zyada der tak qaim rahega.</P>
          </Reveal>

          <Reveal>
            <SubHeading>Ab Khud Aazmayein: Chhe Prompts</SubHeading>
            <P>
              Cockpit ke baare mein parhna, usme baith kar udane jaisa
              nahi. In chhe mashqon mein taqreeban pachees minute lagte
              hain.
            </P>
            <Ladder
              steps={[
                {
                  title: "1. Ek Rehnuma Daura (Guided Tour) Maangein",
                  note: "Chalane se pehle, do features ka andaza laga lein jo assistant ke bataye jane ki tawaqqo hai. Phir Claude ya ChatGPT se poochein ke wo aaj ke workspace ka daura kar wa de, models badalne, file upload, projects, memory, aur research ke baare mein. Ghor karne wali baat: apni pehle se lagayi qayas se muwazna karein, phir jo screen par nazar aata hai usse. Jahan assistant apne hi interface ke baare mein ghalat ho, wahi sab se dilchasp hissa hai.",
                },
                {
                  title: "2. Ek Kaam Donon Assistants Mein Chalayein",
                  note: "Apne hafte ka koi chhota, asal kaam chunein. Chalane se pehle andaza lagayein ke kaunsa assistant behtar karega, aur kyun. Phir dono se wahi kaam karwayein aur poochein ke unhein behtar karne ke liye kaunsi context chahiye thi. Ghor karne wali baat: outputs ka muwazna karein, phir dono ke jawab ka muwazna karein ke unhein kya chahiye tha.",
                },
                {
                  title: "3. Apna Pehla Project Banayein",
                  note: "Kaam ka koi silsila chunein jahan aap ne pehle se wahi background ya files dohrayi hon. Assistant se poochein ke wo aapse mukhtasar interview kare, phir do cheezein de: project instructions, aur upload karne layak documents ki tarteeb-shuda fehrist. Ghor karne wali baat: jo sawalat wo poochta hai, wahi context hai jo aap har hafte hath se type kar rahe the.",
                },
                {
                  title: "4. Jo Yaad Rakha Gaya Hai Uska Jaiza Lein",
                  note: "Assistant se poochein ke wo aapke baare mein jo bhi yaad rakhta hai, ek fehrist ki soorat mein dikhaye. Har item ke liye khud faisla karein: rakhein, theek karein, ya mita dein. Phir poochein ke settings mein memory kahan manage ki ja sakti hai. Ghor karne wali baat: kya kisi cheez se aapko sharmindagi hoti, aur kya kuch purana ho chuka hai.",
                },
                {
                  title: "5. Teen Asal Sawal Route Karein",
                  note: "Apne kaam se teen sawal chunein: ek jise taaza fact chahiye, ek jise sakht reasoning chahiye, aur ek jo poori report ka mustahiq ho. Har sawal poochne se pehle route chunein, search, thinking, ya research. Ghor karne wali baat: ghalat routing, jaise research mode jise search hona chahiye tha, dono products mein sab se aam roz ki barbadi hai.",
                },
                {
                  title: "6. Assistant Ko Apni Purani Tareekh Par Aazmayein",
                  note: "Assistant ko batayein ke aap ek dohraye jane wale kaam ko test karna chahte hain, jiska sahi natija aapko pehle se maloom hai. Purana input material dein, aur assistant se wahi kaam dobara karwayein jaise aap khud karte. Apna asal jawab tab tak roke rakhein jab tak kaam mukammal na ho. Baad mein teen cheezein likh lein: kya match hua, kaunsi extra tafseel chahiye thi, aur kya insaan ke paas rehna chahiye.",
                },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- GLOSSARY ---------------------- */}
        <section id="glossary" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Is Chapter Ki Nayi Istilaahaat (Terms)</SubHeading>
            <P>
              Imtihaan ke liye ye poori fehrist yaad rakhein, koi bhi
              istilaah chhorein nahi:
            </P>
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["Model picker", "Model, ya reasoning ka darja, chunne ka control"],
                ["Thinking mode / Extended thinking", "Jawab dene se pehle model ko zyada reasoning ka mauqa dene wala mode, sust lekin mushkil kaam par kaam ka"],
                ["State summary", "Ek lambi chat ne ab tak kya tay kiya, kya baaqi hai, aur di gayi har hidayat ka ek mukhtasar record, jise naye chat mein paste kiya ja sake"],
                ["Project", "Ek jari kaam ke silsile ke liye workspace, jismein chats, knowledge, aur instructions shamil hon"],
                ["Project knowledge", "Project ke darje par mehfooz files, jinhein us project ki har guftagu istemal kar sake"],
                ["Standing instructions", "Sab guftaguon mein wasee paimane par lagoo hone wale pukhta qawaid: lehja, kirdar, output ki pasand"],
                ["Memory", "Wo context jo assistant guftaguon ke darmiyan aapke baare mein rakhta hai aur baad mein istemal kar sakta hai"],
                ["Incognito chat / Temporary chat", "Ek guftagu jo history aur memory se bahar rakhi jati hai, vendors phir bhi safety ke liye mehdood muddat tak ek copy rakhte hain, isliye memory-free hai, trace-free nahi"],
                ["Artifact", "Claude mein, ek alag output jaise document, code file, diagram, page, ya interactive app, jo chat ke barabar banta hai"],
                ["Writing block / Code block", "Current ChatGPT mein, guftagu ke andar ek tarmeem ke qabil hissa jo likhi hui ya code ki hui cheez ko ek alag object ki tarah rakhta hai, ye canvas ki jagah aaye"],
                ["Skill", "Hidayaat, misaalein, wasail, aur kabhi kabhi code se bana ek bandha hua tareeqa, jo milte julte kaam par load hota hai"],
                ["Agent Skills standard", "agentskills.io par khuli standard jo skill ko pack karne ka ek portable tareeqa muta'yyin karti hai, ab kai vendors ke tools ise parhte hain"],
                ["Plugin", "Ek bundle jo skills, connectors, aur commands jaisi salahiyaton ko poore kaam ki qisam ke liye pack karta hai"],
                ["Custom GPT", "ChatGPT mein, ek alag se configure ki hui assistant, jiski apni hidayaat, persona, knowledge, aur ikhtiyari tools hote hain"],
                ["Connector", "Claude ka lafz, bahar ke nizaam, jaise email, calendar, storage, ya kisi aur tool se, ek permission-yafta connection ke liye"],
                ["App", "ChatGPT ka lafz, isi qisam ke bahar ke tool integration ke liye, pehle inhein connectors kaha jata tha"],
                ["Model Context Protocol (MCP)", "Ek khuli standard jo AI systems ko ek sanjhi interface se bahar ke tools aur data se jorti hai"],
                ["Research mode", "Ek kai-marhala mode jo ek tehqeeq ka mansooba banata hai, kai sources mein dhoondta hai, aur ek hawalon wali report deta hai"],
                ["Enterprise Search", "Claude ki organization-wide search, jo jure hue company tools ko ek search ke qabil knowledge base ki tarah samajhti hai"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source &amp; License Note">
              Ye crash course is kitab ka apna asal (original) kaam hai.
              Product ke daawe <Strong>25 August 2026</Strong> ko
              Anthropic aur OpenAI ki public documentation se taeed kiye
              gaye. Anthropic ke muft <Strong>Claude 101</Strong> course
              aur OpenAI ke help resources ne ye tay karne mein madad ki ke
              kaunse product topics shamil kiye jayen, lekin ye chapter
              unki tehreer, structure, ya mashqein dobara istemal nahi
              karta. Features, naam, plan ki hadood, aur qeematein aksar
              badalti hain, jahan ye safha aur live product mein ikhtilaf
              ho, wahan vendor ki current documentation hi mustanad hai.
              Taaza maloomat ke liye{" "}
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
              dekhein.
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
              Khud Se Poochein
            </h2>
            <P>
              Pehle khud jawab dein, phir sawal par click kar ke jawab
              check karein. Peechhe dekhe baghair jawab dene ki koshish
              karein.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "Current model naamon se pehle, model tier ka pattern kyun seekhna chahiye?",
                  a: "Model ke naam aur versions tezi se badalte hain. Pattern (fast, thinking, flagship) zyada der tak qaim rehta hai aur aapko kaam ke mutabiq chunne deta hai. Phir current naam aur har naam kaunse darje mein aata hai, ye seekhein, kyunke picker aur aapke colleagues wahi naam istemal karte hain.",
                },
                {
                  q: "Thinking mode kab istemal karna chahiye?",
                  a: "Kai marahil wali reasoning, ghor se tajziya, riyazi, mushkil code, aur har us kaam ke liye jahan extra reasoning ka intezar munasib ho.",
                },
                {
                  q: "Instructions, memory, aur projects ko alag rakhne wala usool kya hai?",
                  a: "Pukhta qawaid ke liye instructions, badalti hui context ke liye memory, aur mehdood kaam ke liye projects.",
                },
                {
                  q: "Aam chat aur artifact ya writing block mein kya farq hai, aur jab kaam data ho to kya badalta hai?",
                  a: "Aam chat guftagu hai. Artifacts, writing blocks, aur code blocks ek alag kaam ka natija rakhte hain jise alag se tarmeem aur istemal kiya ja sakta hai. Agar wo natija data ho, to usay table ya spreadsheet file ki soorat mein mangein taake sort aur load ho sake, paragraph ki soorat mein nahi.",
                },
                {
                  q: "Ye jumla mukammal karein: projects ___ mehfooz karte hain; skills ___ anjaam deti hain.",
                  a: "Projects knowledge mehfooz karte hain; skills kaam anjaam deti hain.",
                },
                {
                  q: "MCP kya hai, aur jab aap ek se zyada assistant istemal karein to ye kyun matter karta hai?",
                  a: "MCP, yani Model Context Protocol, AI systems ko bahar ke tools aur data se jorne ki ek khuli standard hai. Ye is liye matter karta hai kyunke integration ke khayalaat, aur aksar khud tools bhi, mukhtalif products mein sath chalte hain.",
                },
                {
                  q: "Aapka pehla AI test ek aisa purana case kyun istemal kare jiska sahi natija aapko pehle se maloom ho?",
                  a: "Kyunke muwazna karne ke liye aapko ek bharosemand jawab chahiye. Maloom sach ke baghair, aap ye nahi bata sakte ke assistant ne kaam dobara kiya ya sirf aisa lagne wala jawab diya.",
                },
                {
                  q: "Wo test pass hona aapko kya deta hai, aur ye kabhi kya transfer nahi karta?",
                  a: "Ye aapko milte julte mustaqbil ke kaam ke liye taeed-shuda bharosa deta hai. Ye kabhi zimmedari transfer nahi karta, aap ab bhi ahem outputs ki taeed karte hain aur aakhri natije ke zimmedar rehte hain.",
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
              wale chapter ki Diligence competency ke sath dobara parhein.
              Dono mil kar is course ka pesha-warana core hain.
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
