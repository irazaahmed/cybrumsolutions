import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Eye,
  Gauge,
  GitBranch,
  ListChecks,
  Package,
  Rocket,
  Scale,
  Settings,
  ShieldCheck,
  Sliders,
  Target,
  Users,
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

const chapter = chapters.find((c) => c.slug === "ai-fluency")!;
const nextChapter = chapters[chapters.findIndex((c) => c.slug === "ai-fluency") + 1];

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "AI Fluency ke 4Ds — Delegation, Description, Discernment, Diligence — ka Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/ai-fluency" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/ai-fluency`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Colleague Ki Kahani, 4Ds", level: 2 },
  { id: "part1", text: "Part 1 · Bari Tasveer", level: 2 },
  { id: "delegation", text: "3 · Delegation", level: 2 },
  { id: "description", text: "4 · Description", level: 2 },
  { id: "discernment", text: "5 · Discernment", level: 2 },
  { id: "diligence", text: "6 · Diligence", level: 2 },
  { id: "part3", text: "Part 3 · Chaaron Ko Milana", level: 2 },
  { id: "mistakes", text: "Mistakes aur Checklist", level: 2 },
  { id: "practice", text: "Practice: 6 Prompts", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations, to stay on-brand.  */
/* ------------------------------------------------------------------ */

function FourQualitiesDiagram() {
  const items = [
    { icon: Target, t: "Effective", d: "Aap apne goal tak pahunch jate ho" },
    { icon: Gauge, t: "Efficient", d: "Time, effort ya tokens waste nahi hote" },
    { icon: Scale, t: "Ethical", d: "AI ka role honestly batate ho, chhupate nahi" },
    { icon: ShieldCheck, t: "Safe", d: "Privacy aur important info safe rehti hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4 text-center">
            <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={18} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Ye 4 qualities hain, aur 4Ds mein se har ek in mein se kam az kam ek
        quality serve karti hai. Ye ek durable skill hai, kuch clever
        prompts ka collection nahi
      </figcaption>
    </figure>
  );
}

function ThreeModesDiagram() {
  const modes = [
    { icon: Settings, t: "Automation", q: "Ye kaam kar do", role: "Aap script writer ho", d: "AI aapki specific instructions se ek specific task karta hai" },
    { icon: Users, t: "Augmentation", q: "Chalo mil kar sochte hain", role: "Aap co-creator ho", d: "Aap aur AI dono mil kar, ek doosre ki thinking pe build karte hain" },
    { icon: Compass, t: "Agency", q: "Ye goal mere liye achieve karo", role: "Aap director ho", d: "AI aapke diye hue boundary ke andar khud decide karta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {modes.map(({ icon: Icon, t, q, role, d }, i) => (
          <div key={t} className="relative rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-bold text-foreground">{t}</p>
            <p className="mt-0.5 text-xs font-medium italic text-accent-bright">
              &ldquo;{q}&rdquo;
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{d}</p>
            <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold text-accent-bright">
              {role}
            </p>
            {i < modes.length - 1 && (
              <ArrowRight
                size={14}
                className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-accent sm:block"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-border px-2 py-0.5">Kam AI autonomy</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border px-2 py-0.5">Zyada AI autonomy</span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Koi mode dusre se better nahi hai. Skill ye hai ke jo mode task ko
        chahiye wahi pick karo, aur zaroorat pe teenon ke beech switch kar
        sako
      </figcaption>
    </figure>
  );
}

function LlmRealityDiagram() {
  return (
    <figure className="my-7">
      <Flow steps={["Aapka prompt", "Training ke patterns", "Ek plausible continuation"]} />
      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { t: "Plausible ≠ Correct", d: "Confident aur wrong dono ek sath ho sakte hain" },
          { t: "Output change hota rehta hai", d: "Same sawal alag time pe alag answer de sakta hai" },
          { t: "Sirf jo available hai", d: "Training, chat, documents, tools; jo available nahi wahan guess hota hai" },
        ].map((n) => (
          <div key={n.t} className="rounded-xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">{n.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{n.d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Har output ko ek capable colleague ka draft samjho, kabhi bhi ground
        truth nahi
      </figcaption>
    </figure>
  );
}

function DelegationPartsDiagram() {
  return (
    <figure className="my-7">
      <Flow
        steps={[
          "Problem Awareness: apna goal aur success ka matlab pata ho",
          "Platform Awareness: pata ho ke is task ke liye kaunsa AI tool sahi hai",
          "Task Delegation: kaam ko jaan-boojh kar divide karo",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Pehle domain expert bano, phir AI delegator, kyunke AI expertise ko
        speed karta hai, replace kam hi karta hai
      </figcaption>
    </figure>
  );
}

function DescriptionPartsDiagram() {
  const parts = [
    { icon: Package, t: "Product", q: "Kya chahiye", d: "Output ka type, audience, format, length, tone" },
    { icon: GitBranch, t: "Process", q: "Kaise hona chahiye", d: "Steps, order, method, examples, beech ke checks" },
    { icon: Sliders, t: "Performance", q: "Kaise behave kare", d: "AI aapke sath aur khud apne taur pe kaise behave kare" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {parts.map(({ icon: Icon, t, q, d }) => (
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
        Yaad rakhne ka trick: What → How → Mujhse kaise deal karo. Complete
        hona clever hone se important hai
      </figcaption>
    </figure>
  );
}

function DiligenceTimelineDiagram() {
  const stops = [
    { icon: ShieldCheck, t: "Before · Creation", d: "Right tool, right data, right context pick karna" },
    { icon: Eye, t: "During · Transparency", d: "AI ke role ke baare mein honest rehna" },
    { icon: Rocket, t: "After · Deployment", d: "Ship karne se pehle verify karna" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {stops.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        &ldquo;Kya main confidently is par apna naam laga sakta hoon? Agar
        nahi, to ye ship nahi hoga.&rdquo;
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
  url: `${site.url}/anthropic-exam-prep/ai-fluency`,
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

export default function AiFluencyChapterPage() {
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
              Certified Associate: Foundations) ke judgment-layer objectives
              se match karta hai
            </p>
            <CoreIdea>
              AI fluency ka matlab clever prompts yaad karna nahi hai. Ye
              4Ds hain: <Strong>Delegation</Strong> (kaam divide karna),{" "}
              <Strong>Description</Strong> (AI ko wo info dena jo usay
              chahiye), <Strong>Discernment</Strong> (jo answer aaye usay
              check karna), aur <Strong>Diligence</Strong> (responsibility
              lena). Agar in 4 ke bina powerful AI use karo, to result
              wrong ya risky ho sakta hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Naye Colleague Ki Example</SubHeading>
            <P>
              Socho aapki team mein ek talented naya colleague join karta
              hai. Pehle hi din aap usay bolte ho, &ldquo;AI agents pe ek
              course outline bana do.&rdquo; Kuch ghanton baad wo PhD
              researchers ke liye ek polished outline deti hai, poore
              semester ka timeline, aur hands-on practice na ke barabar.
              Problem uski capability mein nahi thi, problem ye thi ke usay
              proper direction nahi mili.
            </P>
            <Callout label="Key Distinction">
              Human colleague se ye farq hai: AI conversations ke beech
              kuch bhi remember nahi karta. Har naya chat ek aisi entity se
              start hota hai jo aapse pehle kabhi mili hi nahi. Jo baat aap
              kisi insaan ko ek baar batate ho, wahi baat AI ko har baar
              dobara batani parti hai, ya phir kahin aisi jagah rakhni
              parti hai jahan se AI khud read kar le. Ye koi flaw nahi hai,
              ye ek working condition hai jiske around plan karna padta
              hai, aur yehi planning karna un 4 essential skills mein se ek
              hai.
            </Callout>
            <P>
              Ek powerful AI bhi, agar sath weak tareeke se kaam kiya jaye,
              to wrong result deta hai. Sirf clever prompts pata hona kaafi
              nahi. <Strong>AI Fluency ka matlab ye hai</Strong> ke AI ko
              kya dena hai, usay kaise guide karna hai, uske kaam ko kaise
              judge karna hai, aur kab use ya trust nahi karna, ye sab pata
              hona.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Is Framework Ka Naam: 4Ds</SubHeading>
            <P>
              Ye framework Professor Rick Dakan aur Professor Joseph Feller
              ne banaya, aur Anthropic ke sath milkar tayar kiye gaye
              courses ke through taught hota hai. Isme 4 human competencies
              hain, jinhe 4Ds kehte hain:
            </P>
            <RecapTable
              head={["Competency", "Ek Line Sawal"]}
              rows={[
                ["Delegation", "AI kya kare, aur mere paas kya rahe?"],
                ["Description", "AI ko kaam achi tarah karne ke liye kya chahiye?"],
                ["Discernment", "Result actually achha aur trustworthy hai?"],
                ["Diligence", "Kya ye AI ka responsible use hai, aur main result ka zimmedar banne ke liye ready hoon?"],
              ]}
            />
            <P>
              Simple words mein: pehle decide karo, phir explain karo, phir
              check karo, phir apna own bano. Ye parhne mein roughly 30
              minute lagte hain, plus practice prompts ke liye 15-20 minute
              alag se.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Course Foundations Mein Kahan Fit Hota Hai</SubHeading>
            <P>Book ka recommended sequence ye hai:</P>
            <Flow
              steps={[
                "\"What AI Actually Is\", jo machine ko explain karta hai",
                "\"AI Fluency\", ye course, jo machine ke sath kaam karna sikhata hai",
                "\"AI Prompting in 2026\", jo practical techniques sikhata hai",
              ]}
            />
            <RecapTable
              head={["Topic", "What AI Actually Is", "Ye Course", "AI Prompting 2026"]}
              rows={[
                ["AI kaise kaam karta hai", "In-depth", "Quick reminder", "Assume kiya gaya"],
                ["Communicate kaise karein", "Context kyun matter karta hai", "Description", "Practical techniques"],
                ["Answer kaise judge karein", "Plausible wrong kyun ho sakta hai", "Discernment", "Model-checking habits"],
                ["AI ko kya dein", "Jagged frontier", "Delegation", "Models/tools choose karna"],
                ["Responsible use", "Zyada tar is chapter se bahar hai", "Diligence", "Safe tool use, permissions"],
              ]}
            />
            <Callout label="Note">
              Techniques to models improve hone ke sath badalte rahenge,
              lekin ye 4 competencies isliye design hui hain ke ye last
              karein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3 Minute Mein Difference Dekho</SubHeading>
            <P>Pehla prompt, generic:</P>
            <PromptBox>Write a welcome email for new members.</PromptBox>
            <P>Result competent tha, grammar sahi thi, lekin bilkul generic.</P>
            <P>Doosra prompt, ek fresh chat mein, specific detail ke sath:</P>
            <PromptBox>{`Write a welcome email for new members of a small women's cycling club
in Karachi. Most are nervous beginners who have never ridden in traffic.
Warm and a bit funny, under 150 words, no exclamation marks. End by
telling them the Saturday 6am ride is slow on purpose and nobody gets
dropped.`}</PromptBox>
            <P>
              Same model, same 3 second ka kaam, lekin doosra email kaafi
              better tha. Isse do cheezein pata chalti hain. Pehli, dono
              results ka gap human ki taraf se aaya, model ki taraf se
              nahi. Doosri, aap doosre email ko better isliye judge kar
              paaye kyunke aap cycling clubs, nervous beginners, aur
              Karachi ko achi tarah samajhte ho. Pehli baat{" "}
              <Strong>Description</Strong> hai, doosri{" "}
              <Strong>Discernment</Strong>.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Course Ke End Tak Kya Samajh Aana Chahiye</SubHeading>
            <P>Course complete hone tak, aapko ye cheezein explain karne aani chahiyen:</P>
            <CheckList
              items={[
                "AI fluency ka matlab, sirf \"prompts mein achha hona\" se aage kya hai",
                "Automation, augmentation, aur agency mein difference",
                "Kaam ka kaunsa part khud rakhna hai aur kaunsa AI ko dena hai, ye kaise decide karein",
                "Description ke 3 types: product, process, aur performance",
                "AI ke output ko sirf confident answer dekh ke accept karne ki jagah, use kaise evaluate karein",
                "Diligence ke 3 types: creation, transparency, aur deployment",
                "Ek real project mein ye 4 competencies sath sath kaise kaam karti hain",
                "Ye personal skills Agent Factory ki engineering practices mein kaise scale hoti hain",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Bari Picture Se Start</PartBanner>
            <SubHeading>1. AI Access, AI Fluency Nahi Hai</SubHeading>
            <P>
              Ek powerful AI tak access hona, use achi tarah use karna
              aane ke barabar nahi hai. Almost sab ke paas same models
              available hain. Same plan pe same assistant use karne wale
              do log bilkul different results get karte hain. Farq tool
              mein nahi tha, <Strong>farq is baat mein tha ke unhone use
              kaise use kiya.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>AI Fluency Ka Matlab: AI Ke Sath Aise Kaam Karna Jo</SubHeading>
            <FourQualitiesDiagram />
            <P>
              <Strong>Jo cheez zaroori NAHI hai</Strong> wo ye hai: large
              language models kaise train hoti hain ye samajhna,
              transformer architecture ki deep knowledge, ya
              &ldquo;magic prompts&rdquo; ka koi collection. Foundation
              sirf itni hai: AI ke around good human decisions lena
              seekhna. Sequence yehi hai: Delegation, phir Description,
              phir Discernment, phir Diligence, ya simple words mein:
              decide karo, explain karo, check karo, apna own bano.
            </P>
            <Callout label="Agent Factory Readers Ke Liye Important">
              Ye sab se pehle aata hai. Mode 1 mein aap general agents use
              karte ho problems solve karne ke liye. Mode 2 mein aap
              dusron ke liye Digital FTEs banate ho. Dono ke liye AI
              fluency zaroori hai. <Strong>&ldquo;Agar aap ek AI assistant
              ke sath achi tarah kaam nahi kar sakte, to aap wo AI system
              design karne ke liye ready nahi ho jo hundreds ya thousands
              users ke liye act karega.&rdquo;</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pichle Chapter Se 3 Baatein Yaad Rakho</SubHeading>
            <CheckList
              items={[
                "Plausible, correct ke barabar nahi hai, AI aisa confident answer de sakta hai jo wrong ho (hallucination)",
                "Output change hota rehta hai, same request alag time pe alag answer de sakti hai",
                "AI sirf available information pe kaam karta hai, jo info missing hai wahan guess ho sakta hai",
              ]}
            />
            <LlmRealityDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>2. AI Ke Sath Kaam Karne Ke 3 Tareeke: Automation, Augmentation, Agency</SubHeading>
            <P>
              4Ds seekhne se pehle, ek aur foundational idea zaroori hai.
              Humans AI ke sath 3 broad modes mein kaam karte hain, aur
              inka farq mainly is baat se hota hai ke{" "}
              <Strong>AI ko agla step khud decide karne ki kitni freedom
              di gayi hai.</Strong>
            </P>
            <ThreeModesDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Automation: &ldquo;Ye Task Karo&rdquo;</SubHeading>
            <P>
              Automation mein aap AI ko exactly batate ho ke kaunsa task
              karna hai, jaise &ldquo;is report ko 5 bullets mein
              summarize karo&rdquo;, &ldquo;is email ka Urdu translation
              karo&rdquo;, ya &ldquo;invoice se number, date, total nikaal
              do.&rdquo; Yahan aap ek <Strong>script writer</Strong> ho.
              Ye best tab kaam karta hai jab task clear aur repeatable ho.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Augmentation: &ldquo;Mere Sath Socho&rdquo;</SubHeading>
            <P>
              Augmentation mein aap aur AI mil kar kaam karte ho, jaise
              business idea pe brainstorm karna, software architecture ka
              review karna, lesson plan ko better banana, do strategies ka
              comparison karna, ya koi aisa question explore karna jiska
              answer aapko khud abhi pata nahi. Yahan AI ek{" "}
              <Strong>thinking partner</Strong> ki tarah kaam karta hai,
              sirf instructions execute nahi karta. Isme aap aur AI ke
              beech kai turns back and forth hote hain, aap poochte ho, wo
              answer deta hai, aap challenge karte ho, wo revise karta
              hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Agency: &ldquo;Ye Goal Mere Liye Achieve Karo&rdquo;</SubHeading>
            <P>
              Agency mein aap AI ko ek goal aur boundaries de dete ho, phir
              usay kai steps khud decide karne dete ho. &ldquo;Ye 5 emails
              parh ke summary do&rdquo; kehne ki jagah, aap kuch aisa bolte
              ho:
            </P>
            <PromptBox>{`"Keep my inbox manageable. Reply to routine messages, flag important ones,
and ask me before doing anything you are unsure about."`}</PromptBox>
            <P>
              Ab AI ko khud decide karna padta hai ke kya routine hai, kya
              important hai, aur kab poochna hai. Yahan aap script writer
              se <Strong>director</Strong> ban jate ho. Do words yahan
              bohot weight rakhte hain. Pehla, <Strong>future</Strong>, yani
              aap us waqt present nahi ho, aap ne Monday ko sab set kar
              diya aur Thursday ka kaam khud handle ho raha hai jab aap so
              rahe ho. Doosra, <Strong>for others</Strong>, yani jis insaan
              ki AI service kar rahi hai, wo khud aap na bhi ho. Automation
              aur augmentation mein aap chair pe baithe rehte ho, lekin
              agency mein aap chair se uth jate ho, aur Mode 2 ki har
              difficulty isi ek fact se aati hai: aap har decision
              supervise nahi kar sakte, isliye judgment pehle se built-in
              honi chahiye.
            </P>
            <RecapTable
              head={["Aspect", "Automation", "Agency"]}
              rows={[
                ["Aap kya dete ho", "Task ya uske steps", "Goal aur boundaries"],
                ["AI kya decide karta hai", "Bohot kam", "Aage ke kai steps"],
                ["Aapka role", "Script writer", "Director"],
                ["Common failure", "Ek step wrong ho jata hai", "Goal ya boundary misunderstand ho jati hai"],
              ]}
            />
            <P>
              Koi mode automatically dusre se better nahi hota. Ek achha
              AI user wahi mode pick karta hai jo task ko chahiye, aur ek
              project mein teenon mode use ho sakte hain. Mode 1 zyada tar
              automation aur augmentation use karta hai, jabke Mode 2
              agency ko systematic bana deta hai. Ek Digital FTE sirf itna
              nahi ke &ldquo;AI kaam kar rahi hai&rdquo;, balke ye ek job
              definition, System of Record, permissions, rules, aur
              governance ke andar reh kar kaam karta hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DELEGATION ---------------------- */}
        <section id="delegation" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · 4 Competencies</PartBanner>
            <SubHeading>3. Delegation: Decide Karo Kaun Kya Karega</SubHeading>
            <P>
              Beginners ki sab se common mistake first prompt se bhi pehle
              ho jati hai. Log AI assistant khol ke seedha type karna
              start kar dete hain, jabke unhone abhi ye decide hi nahi
              kiya hota ke actually achieve kya karna hai, achha result
              kaisa dikhega, kaunsa part AI kare, kaunsa part khud karein,
              aur kaunse decisions kabhi AI ko na diye jayein. Yehi{" "}
              <Strong>Delegation</Strong> ka problem hai.
            </P>
            <Callout label="Definition">
              <Strong>Delegation</Strong> ka matlab hai decide karna ke
              kaam human aur AI ke beech kaise divide hoga. Ye sirf
              &ldquo;AI ko kaam de diya&rdquo; nahi hai, ye poori workflow
              design karna hai.
            </Callout>
            <DelegationPartsDiagram />
            <Callout label="Yaad Rakho">
              Pehle domain expert bano, phir AI delegator, kyunke AI
              expertise ko speed karta hai, replace kam hi karta hai.{" "}
              <Strong>Delegation workflow design hai, task offloading
              nahi.</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3.1 Problem Awareness</SubHeading>
            <P>AI se kuch bhi poochne se pehle, khud se ye poocho:</P>
            <CheckList
              items={[
                "Goal kya hai?",
                "Ye kiske liye hai?",
                "Success kaisa dikhega?",
                "Kya wrong ho sakta hai?",
                "Human judgment kahan zaroori hai?",
              ]}
            />
            <P>
              Ek example dekho: ek beginner AI se kehta hai,
              &ldquo;mujhe ek invoice-chasing agent bana do.&rdquo; AI
              kuch na kuch bana to dega, lekin kai hard questions abhi bhi
              unanswered rahenge, jaise kaunse customers ko contact karein,
              invoice kitne din late hone pe follow-up bheja jaye, kaunsa
              tone use ho, kitni amount pe human ki approval chahiye, agar
              customer invoice pe dispute kare to kya kiya jaye, agent
              kaunsa accounting system read kar sakta hai, aur ye ke agent
              sirf message ka draft banaye ya khud bhej bhi sake.{" "}
              <Strong>Ye business questions hain, prompting questions
              nahi.</Strong> AI aapki business policy khud se decide nahi
              kar sakta jab tak aap jaan-boojh kar usay ye authority na
              dein, aur zyada tar cases mein aapko dena bhi nahi chahiye.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.2 Platform Awareness</SubHeading>
            <P>
              Har AI system har task mein equally achha nahi hota. Mushkil,
              multi-step problems ke liye reasoning model pick kar sakte
              ho, current info ke liye search-enabled assistant, software
              banane ke liye coding agent, aur un tasks ke liye jinme
              tools aur multiple steps shamil hon, agent-capable system.
              Ek achi habit ye hai ke khud se poocho, &ldquo;kya ye tool is
              job ke liye sahi hai?&rdquo; Alag alag systems try karo,
              unke results compare karo, aur note karte raho ke kya kaam
              kar raha hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.3 Task Delegation</SubHeading>
            <P>
              Jab problem aur platform, dono samajh mein aa jayen, to kaam
              ko soch samajh kar parts mein divide karo. Ek example, ek
              course banate waqt:
            </P>
            <RecapTable
              head={["Task", "Best Owner", "Kyun"]}
              rows={[
                ["Audience aur learning goals decide karna", "Human", "Purpose aur judgment chahiye"],
                ["Possible course structures suggest karna", "AI + Human", "AI breadth deta hai, human choose karta hai"],
                ["Agreed outline se sections draft karna", "AI", "First drafts mein fast hai"],
                ["Factual claims verify karna", "Human", "Accountability author ke paas rehti hai"],
                ["Lived experience aur local examples add karna", "Human", "AI ke paas aapka experience nahi hai"],
                ["Grammar aur consistency improve karna", "AI", "Mechanical review ke liye achha fit"],
                ["Course ki final approval dena", "Human", "Aapka naam aur reputation attached hai"],
              ]}
            />
            <Callout label="Better Question">
              &ldquo;Kya AI ye kar sakta hai?&rdquo; poochne ki jagah, ye
              poocho: <Strong>&ldquo;Kaunsa part AI kare, kaunsa main
              karoon, aur kyun?&rdquo;</Strong>
            </Callout>
            <P>
              Agent Factory mein Delegation ek engineering step ban jati
              hai. Problem Awareness ek <Strong>specification</Strong> ban
              jati hai, yani goal, constraints, risks, aur &ldquo;definition
              of done&rdquo;. Task Delegation Digital FTE ki boundary ban
              jati hai, jo decide karti hai AI kya kar sakta hai, humans
              kya apne paas rakhte hain, aur kya escalate hona chahiye. Aur
              ek vertical System of Record in decisions ko durable aur
              inspectable banata hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DESCRIPTION ---------------------- */}
        <section id="description" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>4. Description: AI Ko Wo Do Jo Usay Chahiye</SubHeading>
            <P>
              Shuru wale colleague ko yaad karo, uski outline isliye wrong
              thi kyunke usay important information nahi di gayi thi. AI
              ko bhi yehi problem hoti hai, magar zyada severely. Wo aapka
              mind read nahi kar sakta. Agar aap koi important cheez chhor
              dein, to wo ek reasonable guess laga leta hai, aur ye
              reasonable guess bhi wrong ho sakti hai.
            </P>
            <Callout label="Definition">
              <Strong>Description</Strong> wo skill hai jisse aap AI ko wo
              information aur guidance dete ho jo usay kaam achi tarah
              karne ke liye chahiye. Ye sirf &ldquo;ek achha prompt
              likhna&rdquo; se bohot bigger cheez hai.
            </Callout>
            <DescriptionPartsDiagram />
            <Callout label="Key Principle">
              &ldquo;Complete hona clever hone se jeet jata hai, best
              prompt clever nahi hota, complete hota hai.&rdquo; Scale pe,
              description khud <Strong>context engineering</Strong> ban
              jati hai, yani wo har cheez design karna jo AI ko succeed
              karne ke liye chahiye, sirf ek message ki wording nahi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.1 Product Description: Result Define Karo</SubHeading>
            <P>Ye sawal poochti hai: &ldquo;mujhe wapis exactly kya chahiye?&rdquo;</P>
            <P>Vague:</P>
            <PromptBox>Summarize this report.</PromptBox>
            <P>Clear:</P>
            <PromptBox>{`Summarize this quarterly financial report for senior executives who have
ten minutes to read. Focus on revenue trends, major risks, and recommended
actions. Use short bullet points and keep it to one page. Highlight any
figure that changed significantly from last quarter. Avoid unnecessary
accounting jargon.`}</PromptBox>
            <P>
              Doosra request zyada intelligent nahi, <Strong>zyada
              complete</Strong> hai. Complete hona aksar clever wording se
              zyada matter karta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4.2 Process Description: Approach Define Karo</SubHeading>
            <P>Ye sawal poochti hai: &ldquo;AI ko kaam kaise karna chahiye?&rdquo; Example:</P>
            <PromptBox>{`Review this code for correctness first, security second, and style last.
Do not spend time on naming issues until you have checked whether the
code actually works.`}</PromptBox>
            <P>
              Process description sab se zyada tab matter karti hai jab
              kaam ke kai stages hon. Ek example, 3 vendors, A, B, aur C,
              ke proposals se ek recommendation banana:
            </P>
            <Ladder
              steps={[
                { title: "Extract", note: "Har proposal se same facts ek table mein nikalo: price, contract length, exit terms, support hours. Check: 3-4 cells ko source se confirm karo." },
                { title: "Compare", note: "Sirf table use kar ke vendors compare karo. Check: har difference actually table mein hai?" },
                { title: "Score", note: "Har vendor ko score do, jo cheez aapke liye zyada matter karti hai usay zyada weight do. Check: scores aapki criteria follow karte hain, ya AI ne khud koi criterion add kar diya?" },
                { title: "Draft", note: "Recommendation likho. Check: ye sirf wahi claim karta hai jo steps 1-3 support karte hain?" },
              ]}
            />
            <Callout label="General Rule" tone="warn">
              Jis step ki mistake sab se door tak spread hoti hai, wo pehle
              aana chahiye, aur aage barhne se pehle usay check karo.
              Extraction isliye pehle hai kyunke table mein wrong prices
              comparison, scoring, aur draft tak carry ho jati hain, aur
              reading time tak sahi lagti rehti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.3 Performance Description: Behavior Define Karo</SubHeading>
            <P>Ye sawal poochti hai: &ldquo;ye AI kaise behave kare, aur kis ke sath?&rdquo; Example:</P>
            <PromptBox>{`Challenge my assumptions when they are weak. Flag uncertainty. Do not
agree with me just to be polite. If my argument is stronger, explain why.
If yours is stronger, hold your position and explain it.`}</PromptBox>
            <P>
              Isse AI ek polite answer machine se better thinking partner
              ban jata hai. Iske do versions hain. Chhota version, chat
              window mein, sirf aapke liye, aur bara version, ek deployed
              agent mein, jaise ek tutoring agent ka rule &ldquo;student ke
              attempt karne se pehle answer mat do.&rdquo; Ye same sentence
              hai bas stakes change ho gaye, ek baar likha jata hai, aur
              hazar baar un logon pe apply hota hai jinse aap kabhi mile
              hi nahi. Chat mein ek weak performance description 10 minute
              annoy karti hai, lekin ek deployed agent mein wahi khud{" "}
              <Strong>product</Strong> ban jati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Description, Prompting Se Bigger Hai</SubHeading>
            <P>
              Book ka agla chapter, <Strong>&ldquo;AI Prompting in
              2026&rdquo;</Strong>, practical techniques sikhata hai, jaise
              examples dena, constraints specify karna, tasks ko chhote
              parts mein decompose karna, aur roles define karna. Ye
              chapter is se bhi bigger idea sikhata hai:{" "}
              <Strong>Description.</Strong>
            </P>
            <P>
              Kai teams ek prompt template use karti hain jisme role,
              context, task, constraints, aur output format ke liye jagah
              hoti hai. Task, constraints, aur output format, actually{" "}
              <Strong>product description</Strong> hi hain. Context wahi
              cheez hai jise agla section <Strong>context
              engineering</Strong> kehta hai. Agar kaam kaise proceed hoga
              iske liye ek line, aur AI aapke sath kaise behave karega
              iske liye ek line add kar do, to ye template teenon parts
              cover kar leta hai.
            </P>
            <Callout label="Note">
              Kisi cheez ko phrase karne ka tareeka pata nahi? Ruk mat
              jao. Apni situation normal words mein explain karo aur AI se
              poocho ke wo isay clear instruction mein badal de.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Prompt Engineering Se Context Engineering Tak</SubHeading>
            <P>
              <Strong>Prompt engineering ye sawal poochti hai:</Strong>{" "}
              &ldquo;ye message kaise likhun?&rdquo;{" "}
              <Strong>Context engineering ek bigger sawal poochti
              hai:</Strong> &ldquo;AI ke succeed karne ke liye kya
              available hona chahiye?&rdquo;
            </P>
            <CheckList
              items={[
                "Documents", "Examples", "Memory", "Conversation history",
                "Policies", "Tools", "Database records", "Definitions", "Instructions",
              ]}
            />
            <P>
              Ek agent ke liye ye bohot matter karta hai: ek beautiful
              prompt bhi agent ko nahi bacha sakta agar uske paas wrong
              data ho, rules missing hon, weak examples hon, ya zaroori
              tools tak access na ho. Agent Factory mein: system prompt ek
              performance description ko persistent banata hai, ek{" "}
              <Strong>SKILL.md</Strong> ek process description ko reusable
              banata hai, aur ek System of Record domain knowledge, rules,
              definitions, aur governance rakh sakta hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DISCERNMENT ---------------------- */}
        <section id="discernment" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>5. Discernment: Confidence Ko Correctness Mat Samjho</SubHeading>
            <P>
              AI aksar confident sound karta hai. Ye readability ke liye
              useful hai, lekin trust ke liye risky hai. Ek wrong AI
              answer usually kisi warning label ke sath nahi aata, wo
              polished, detailed, aur certain dikh sakta hai.
            </P>
            <Callout label="Definition">
              <Strong>Discernment</Strong> AI ka diya hua kaam judge karne
              ki ability hai. Description poochti hai &ldquo;kya maine
              kaam clearly explain kiya?&rdquo;, Discernment poochti hai
              &ldquo;kya AI ne actually kaam achi tarah kiya?&rdquo;
            </Callout>
            <Callout label="Important Term" tone="warn">
              <Strong>Automation Bias:</Strong> ek automated answer ko
              zaroorat se zyada easily trust kar lena, especially jab wo
              confident ya professional lage.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Fake Answer Bhi Success Jaisi Dikh Sakti Hai</SubHeading>
            <P>
              Ek hallucinated answer, correct answer se almost identical
              dikh sakta hai. Fluent writing koi proof nahi, citation jaisi
              link koi proof nahi, confident tone bhi koi proof nahi. 4
              signs jo aksar fake answer show karte hain:
            </P>
            <RecapTable
              head={["Sign", "Kya Karo"]}
              rows={[
                ["Bohot zyada exact specifics", "Number repeat karne se pehle asal source khol ke check karo"],
                ["Wahan confidence jahan expert bhi hesitate kare", "Poocho ke kya cheez answer change kar degi"],
                ["Long output mein contradiction", "Ending ko beginning ke against parho"],
                ["Ek claimed action jo hui hi nahi", "Jab tak tool khud proof na de (sent message, opened page, test log), claim ko ek sentence samjho, event nahi"],
              ]}
            />
            <Callout label="General Principle" tone="warn">
              Jahan accuracy matter karti hai, wahan verify zaroor karo.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discernment, Description Ko Mirror Karti Hai</SubHeading>
            <P>Isi ke bhi 3 parts hain, aur ye 3 parts unhi 3 cheezon ki taraf point karte hain:</P>
            <RecapTable
              head={["Type", "Sawal"]}
              rows={[
                ["Product Discernment", "Kya result achha hai?"],
                ["Process Discernment", "Kya AI ke sath is tarah kaam karna faida de raha hai?"],
                ["Performance Discernment", "Jab AI khud act karta hai, log achi tarah serve ho rahe hain?"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>5.1 Product Discernment</SubHeading>
            <CheckList
              items={[
                "Kya ye factually correct hai?",
                "Kya har important requirement follow hui?",
                "Kuch missing to nahi?",
                "Kya ye internally consistent hai?",
                "Kya ek expert isay credible samjhega?",
                "Kya main is par apna naam laga sakta hoon?",
              ]}
            />
            <P>
              <Strong>Ek important baat:</Strong> yahan aapki apni domain
              knowledge bohot valuable ban jati hai. Ek accountant weak
              assumptions notice kar leta hai, ek programmer subtle bugs
              pakar leta hai, aur ek teacher wo explanations pehchan leta
              hai jo beginners ke liye confusing hon. &ldquo;AI expert
              work ki speed barha sakta hai, lekin ye expertise ki
              zaroorat khatam nahi karta.&rdquo;
            </P>
            <P>
              Result ke peeche ki <Strong>reasoning ko bhi judge karo</Strong>,
              kyunke AI weak reasons ke sath bhi correct answer tak
              pahunch sakta hai, aur ek wrong assumption pe khara correct
              answer zyada der correct nahi rehta. Useful ye hai ke AI se
              ye dikhwao: assumptions, evidence, decision criteria,
              calculations, intermediate results, aur alternative
              interpretations. Inhe ek <Strong>review ke liye
              justification</Strong> samjho, hidden reasoning ka literal
              transcript nahi.
            </P>
            <PromptBox>{`Before recommending one option, list your assumptions, the evidence
supporting them, and the criteria you are using to decide. Then give
the recommendation.`}</PromptBox>
            <P>Document-based answers ke liye ye bhi add karo:</P>
            <PromptBox>{`Answer only from the three proposals I attached, not from anything
you know about these vendors. If a proposal does not state its exit
terms, say so instead of guessing. For every term you report, quote
the proposal's section heading and the sentence it came from.`}</PromptBox>
            <P>
              Ye 3 kaam karta hai. Pehla, sirf wahi cheez use karta hai jo
              attach ki gayi ho, taake training knowledge se gaps na
              bhare, jahan se imaginary features aati hain. Doosra, ye
              &ldquo;isme ye likha nahi&rdquo; kehne ki permission deta
              hai. Teesra, ye aapko ek minute mein checkable cheez deta
              hai, teenon proposals dobara parhne ki jagah. Koi bhi cheez
              answer khud parhne ki jagah nahi le sakti, ye sirf reading
              fast bana deti hai aur fake answer pakarna aasan kar deti
              hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.2 Process Discernment</SubHeading>
            <P>
              Kabhi kabhi answer theek hota hai lekin AI ke sath kaam karne
              ka tareeka theek nahi hota. Ye wo sawal hai jo log almost
              kabhi nahi poochte, kyunke output acceptable laga aur session
              successful feel hua. Khud se ye poocho:
            </P>
            <CheckList
              items={[
                "Kya AI mere feedback ke hisab se adapt kar raha hai, ya wapis purani cheez pe drift ho raha hai?",
                "Kya do baar correct karne ke baad bhi wahi mistake repeat kar raha hai?",
                "Kya wo itna agreeable ho gaya hai ke ab useless ban gaya hai?",
                "Kya main har turn wahi formatting problem khud fix kar raha hoon?",
                "Kya main iska draft khud likhne se zyada heavily edit kar raha hoon?",
              ]}
            />
            <Callout label="Honest Reflection">
              Last question pe khaas attention do: 20 minute ka steering
              jo ek hour bacha de, wo ek win hai. 20 minute ka steering jo
              sirf 15 minute bacha de, wo actually ek loss hai jise aap
              win samajh rahe ho kyunke wo productive feel hui.
            </Callout>
            <P>
              Jab ye process kaam nahi kar raha, teen escalating moves
              hain, aur teenon fluency hain: performance description change
              karo, tool change karo, ya task wapis khud apne paas le lo.
              Sirf teesra defeat jaisa feel hota hai, lekin usually aisa
              hota nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.3 Performance Discernment</SubHeading>
            <P>
              Ye tab exist karti hai jab aap agency use kar chuke ho, aur
              book ke end mein isi ki sab se zyada care ki jati hai. Ye ye
              sawal poochti hai ke kya AI ka{" "}
              <Strong>independent, user-facing behavior</Strong> logon ke
              liye good outcomes deta hai. Ye is baat se different hai ke
              koi ek output correct tha ya nahi. Example: ek AI tutor har
              sawal ka correct answer de sakta hai, aur phir bhi bad tutor
              ho sakta hai agar wo student ke hesitate karte hi solution
              de deta hai, jisse koi kuch nahi seekhta. Isi tarah ek
              support agent tickets ko fast resolve kar sakta hai, aur
              phir bhi bad ho sakta hai agar wo conversation us time band
              kar de jab customer ne usay abhi complete na samjha ho. Ye
              single chats mein nahi, aggregate mein show hota hai: users
              iske baad kya karte hain, wo kis baat pe complain karte hain,
              aur kaunse cases baar baar chupke se wahi wrong hote hain.
              Aap thousands conversations khud check nahi kar sakte,
              isliye kuch aisa banana padta hai jo aapki jagah in par
              nazar rakhe.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Description–Discernment Loop</SubHeading>
            <Flow
              loop
              steps={[
                "Aap describe karte ho kya chahiye",
                "AI kuch produce karta hai",
                "Aap inspect karte ho",
                "Aap batate ho kya change karna hai",
              ]}
            />
            <P>
              Jab Discernment koi problem flag kare, to usually iska fix
              better description hota hai. Kabhi kabhi ye wapis Delegation
              tak le jata hai, ya to wrong tool ki wajah se, wrong split ki
              wajah se, ya phir wrong approach ki wajah se.{" "}
              <Strong>&ldquo;Professional AI collaboration iteration se
              converge hoti hai, ye kabhi ek hi shot mein perfect nahi
              hoti.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Normal Hai</SubHeading>
            <P>
              AI ke sath achha kaam usually iterative hota hai. Pehla
              response aksar ek draft hota hai, finish line nahi. Feedback
              dete waqt is pattern ka use karo: problem batao, phir ye ke
              wo kyun matter karta hai, phir direction do.
            </P>
            <P>Weak feedback:</P>
            <PromptBox>Wrong. Try again.</PromptBox>
            <P>Better feedback:</P>
            <PromptBox>{`The second section assumes enterprise customers. Our audience is solo
founders, so the advice is too expensive. Rewrite that section for a
one-person business with a limited budget.`}</PromptBox>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Achhe Draft Ko Doosri Try Ki Zaroorat Kyun Parti Hai</SubHeading>
            <P>
              Kyunke wo wrong reader ke liye likha gaya tha. Ek example, ek
              quarterly report ki finding, board aur support team, dono ke
              liye alag alag likho:
            </P>
            <RecapTable
              head={["Board Ke Liye", "Support Team Ke Liye"]}
              rows={[
                [
                  "Number, cause, decision: \"Tickets double ho gaye, reply time 4 se 9 hour ho gaya, team ka size same raha. Do naye hires approve karo ya 9-hour replies accept karo.\"",
                  "Kya change hua, ye unki galti kyun nahi, aur Monday ko kya karna hai: \"Tickets is quarter double huye, team same size rahi, isliye 9-hour replies volume se aayi hain, aapse nahi. Do hires ki request ho chuki hai. Jab tak wo aayen, sab se purana ticket pehle karo.\"",
                ],
              ]}
            />
            <P>
              Facts same, model same, results dono different. In mein se
              koi bhi doosre reader ke liye kaam nahi karta.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Har Review Ka Ek Ending Hota Hai</SubHeading>
            <CheckList
              items={[
                "Kaam bhej diya jata hai, jaise cycling club wala email send ho gaya",
                "Ye feedback ke sath wapis chala jata hai",
                "Aap khud kaam apne haath mein le lete ho, kyunke fix ke liye sirf aap jaante ho",
              ]}
            />
            <Callout label="Important Practice">
              Agla message likhne se pehle decide kar lo ke ending kya
              hogi. Iterate karna hamesha ke liye nahi chalna chahiye,
              ending pehchan lena us &ldquo;bas ek aur chhoti change&rdquo;
              wale loop ko rok deta hai jo poora din kha jata hai.
            </Callout>
            <P>
              Kabhi kabhi better description bhi kaafi nahi hoti, aur
              Discernment show kar deti hai ke original Delegation decision
              hi wrong tha, shayad wrong tool choose hua, shayad AI ko wo
              part kabhi milna hi nahi chahiye tha, ya shayad ye kaam ek
              human expert hi maangta hai. Ye bhi fluency hai. Agent
              Factory mein Discernment <Strong>evaluation
              engineering</Strong> ban jati hai, yani aapka personal sawal
              &ldquo;kya ye kaafi achha hai?&rdquo; eval suites, production
              checks, monitoring, sampling, aur release gates ki shape le
              leta hai. <Strong>&ldquo;Aap wo judgment automate nahi kar
              sakte jo aapne khud kabhi seekha hi nahi.&rdquo;</Strong>
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DILIGENCE ---------------------- */}
        <section id="diligence" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>6. Diligence: AI Ko Responsibly Use Karna</SubHeading>
            <P>Pehli 3 Ds better results lane mein help karti hain. Diligence ek alag sawal poochti hai:</P>
            <PullQuote>Kya mujhe AI ko is tarah use karna bhi chahiye?</PullQuote>
            <Callout label="Example: Lecture Feedback Ka Case" tone="warn">
              Ek teacher AI se end-of-term student feedback draft karwata
              hai. Writing excellent hoti hai. Lekin usne student names,
              grades, aur disciplinary notes ek consumer AI service mein
              paste kar diye jise university ne approve nahi kiya tha.
              Students ko bataya hi nahi gaya ke unke academic record ka
              ye part AI ki help se bana. <Strong>Output achha ho sakta
              hai, lekin AI ka ye use phir bhi irresponsible hai.</Strong>
            </Callout>
            <Callout label="Definition">
              <Strong>Diligence</Strong> ka matlab hai AI kaise use hui,
              aur uske output ka kya hua, iski responsibility khud lena.
            </Callout>
            <DiligenceTimelineDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>6.1 Creation Diligence</SubHeading>
            <P>Koi bhi information share karne se pehle ye poocho:</P>
            <CheckList
              items={[
                "Kya isme personal data hai?",
                "Kya isme company ki confidential information hai?",
                "Kya mujhe ye info is tool mein daalne ki permission hai?",
                "Ye data kaun access ya retain kar sakta hai?",
                "Kya ye service meri organization se approved hai?",
                "Koi legal, contractual, ya professional restrictions hain?",
              ]}
            />
            <P>
              <Strong>Easy path hamesha responsible path nahi hota.</Strong>{" "}
              Iska fix aksar ye nahi hota ke task chhor diya jaye, balke ye
              hota hai ke data ko <Strong>strip</Strong> kar diya jaye.
              Teacher wale example mein, wo naam aur student ID hata sakta
              tha, sirf grade range aur ek behavior rakh sakta tha, aur
              usi se feedback draft kar sakta tha. Principle ye hai:
              &ldquo;AI ko pattern chahiye, person nahi.&rdquo; Isay{" "}
              <Strong>redaction</Strong> kehte hain.
            </P>
            <RecapTable
              head={["Redaction Kaise Fail Hoti Hai", "Kya Hota Hai"]}
              rows={[
                ["Bohot zyada hata dena", "Feedback bina grade aur bina incident ke, feedback nahi rehta"],
                ["Bohot kam hataana", "Details ka combination bhi ek person ki identity de deta hai, jaise \"wo student jisne week 3 ki lab miss ki\""],
              ]}
            />
            <Callout label="Ek Test">
              Kya koi sirf ye paste kiya hua parh ke samajh sakta hai ye
              kis ke baare mein hai? Agar haan, to aapne bohot kam hataya
              hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.2 Transparency Diligence</SubHeading>
            <P>
              Har AI-assisted task ko public announcement ki zaroorat nahi
              hoti. Lekin jab AI dusre logon ko significantly affect kare,
              to disclosure matter karti hai: academic work, hiring
              decisions, customer communications, medical ya financial
              advice, professional reports, ya aisa content jo original
              human work ki tarah present kiya jaye. Exact rules context,
              organization, law, aur professional standard pe depend karti
              hain.
            </P>
            <Callout label="Guiding Principle">
              &ldquo;AI-assisted result jitna zyada dusron ko affect karta
              hai, transparency ka case utna hi strong hai.&rdquo;
              Transparency ka matlab apni poori workflow bata dena nahi,
              balke matlab ye hai ke jab AI ka role matter kare to logon
              ko mislead na karna.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.3 Deployment Diligence</SubHeading>
            <P>
              AI-assisted kaam publish, send, execute, ya kisi decision
              mein use hone se pehle check karo. Kitni checking chahiye,
              ye transparency ka principle decide karta hai, jitne zyada
              log affect hote hain, utni zyada checking chahiye: khud ke
              liye likha note ek nazar leta hai, welcome email full read
              leta hai, aur regulator ko jane wali report ek second
              reviewer se guzarti hai.
            </P>
            <CheckList
              items={[
                "Facts verify karo",
                "Confirm karo ke sources actually exist karte hain",
                "Calculations check karo",
                "Bias ya unfair outcomes ka review karo",
                "Permissions aur rights confirm karo",
                "Organization ki policy follow karo",
                "High-impact actions ke liye human approval lo",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>The Numbers Rule</SubHeading>
            <Callout label="Critical Rule" tone="warn">
              <Strong>Jis number pe koi decision khara ho, wo hamesha
              compute hona chahiye, kabhi generate nahi.</Strong> Jab aap
              AI se quarterly report summarize karwate ho, wo column ko
              spreadsheet ki tarah add nahi karta, sirf predict karta hai
              ke likely-looking total kya hoga, isliye total wrong ho
              sakta hai chahe har line item correct ho. Number spreadsheet,
              calculator, ya AI ke chalaye hue us code se lo jo aapko
              dikhaya gaya ho, phir inputs check karo, sum nahi: sahi rows
              aur sahi rate use hui?
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Powerful Last Question</SubHeading>
            <PullQuote>Kya main confidently is par apna naam laga sakta hoon?</PullQuote>
            <P>Agar answer &ldquo;na&rdquo; hai, to kaam ready nahi hai.</P>
            <P>
              Kabhi kabhi case clear wrong nahi hota, sirf unclear hota
              hai. Example: ek AI-ranked job applicant shortlist reasonable
              lagti hai, lekin pata nahi chalta ke wo silently do
              universities ke graduates ko favor kar rahi hai ya nahi.
              Decide karne se pehle ye 4 sawal poocho:
            </P>
            <CheckList
              items={[
                "Is result se kaun affect hota hai, un logon samet jo ise kabhi dekhenge bhi nahi?",
                "Unke liye kya wrong ho sakta hai, aur kya wo bata bhi payenge?",
                "Yahan fair outcome kaisa dikhega?",
                "Kya kisi cheez ka disclose hona chahiye, aur kis ko?",
              ]}
            />
            <P>
              Agar aap chaaron ka answer de sakte ho, to decide karo aur
              likh lo. Agar nahi, to guess kar ke bhejne ki jagah, us
              decision ke owner tak baat pahunchao. <Strong>Guessing ek
              unclear case ko aapki apni mistake bana deta hai.</Strong>
            </P>
            <PullQuote>AI kaam khud kar sakta hai, lekin responsibility khud nahi le sakta.</PullQuote>
            <P>
              Agar ek AI-assisted system koi harmful decision le leta hai,
              to us system ko chalane wali organization phir bhi
              responsible rehti hai. Agar coding assistant koi vulnerability
              introduce kar de aur engineer usay ship kar de, to engineer
              aur organization, dono result ke owner rehte hain. Agent
              Factory isliye governance ko sab se pehle rakhta hai: Creation
              diligence data rules, access control, aur approved-tool
              policy ban jati hai. Transparency diligence disclosure aur
              user experience design ban jati hai. Deployment diligence
              evaluation gates, audit logs, monitoring, aur human review
              ban jati hai.
            </P>
            <Callout label="Policy Bhi Ek Responsibility Hai">
              Koi bhi policy tabhi kaam karti hai jab approved tool utna hi
              easy reach ho jitna wo tool jo log pehle se khula rakhte
              hain. Teacher ka use kiya hua consumer service ek click door
              tha. Agar university ka approved tool ek request form aur ek
              week ke wait ke baad milta, to ye bhi ek policy flaw thi,
              sirf teacher ki personal mistake nahi. Mode 2 mein aap sirf
              khud responsible AI practice nahi kar rahe, aap us
              responsibility ko ek aise product mein build kar rahe ho jise
              dusre log use karenge.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Chaaron Ko Ek Sath Milana</PartBanner>
            <SubHeading>7. 4Ds Ek Practical Operating Loop Ki Tarah</SubHeading>
            <Flow
              loop
              steps={["Delegate karo", "Describe karo", "Discern karo", "Diligent raho"]}
            />
            <P>
              <Strong>Delegation</Strong> decide karti hai AI kaam mein aaye
              ya nahi, aur kya own kare. <Strong>Description</Strong> AI ko
              goal, context, process, aur behavior deti hai.{" "}
              <Strong>Discernment</Strong> result check karti hai aur agla
              round better banati hai. <Strong>Diligence</Strong> poore
              process ko responsibility se cover karti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Example: Ek Bookkeeping Digital FTE</SubHeading>
            <P>
              Ayesha Lahore mein ek Forward Deployed Engineer hai, jo
              Karachi ki ek small accounting practice ke liye bookkeeping
              Digital FTE bana rahi hai. Pehla kaam jo automate karna hai,
              wo hai monthly bank reconciliation.
            </P>
            <Ladder
              steps={[
                { title: "Step 1 · Delegation", note: "Ayesha ye nahi poochti ke \"reconciliation agent bana do.\" Wo accounting partners ke sath baith kar poora kaam map karti hai: agent bank transactions ko ledger entries se match kar sakta hai, unmatched items flag kar sakta hai, aur report draft kar sakta hai; humans har journal adjustment approve karenge, har write-off ka decision apne paas rakhenge, tax se related koi bhi cheez accountant ke paas rahegi, aur high-value unmatched items ek named person tak escalate hongi." },
                { title: "Step 2 · Description", note: "System ko chart of accounts, matching rules, purani reconciliations ki examples, partners ka report format, escalation rules, aur duplicate/stale cheque ki definitions di jati hain. Rule ye hai: agent kabhi khud journal entry post nahi karega, aur kabhi client se directly contact nahi karega." },
                { title: "Step 3 · Discernment", note: "Ayesha ye assume nahi karti ke agent sirf isliye theek kaam kar raha hai kyunke demo achi lagi. Wo agent ko purani, trusted reconciliations ke against test karti hai: kitne matches correct hain, kitne wrong matches slip karte hain, sahi cases escalate hote hain ya nahi, kya agent zaroorat se zyada escalate kar raha hai, aur kya performance time ke sath change ho rahi hai. Ek accountant kuch \"successful\" matches ka bhi review karta hai, sirf failures ka nahi, kyunke koi system silently fail ho kar bhi safe dikh sakta hai." },
                { title: "Step 4 · Diligence", note: "Client ka financial data approved infrastructure ke andar rehta hai, agent ke actions log hote hain, jahan zaroori ho wahan clients ko bataya jata hai ke reconciliation AI-assisted hai, aur phir bhi ek human partner reconciliation sign karta hai aur final result ka zimmedar rehta hai." },
              ]}
            />
            <P>
              Yehi 4D loop practice mein hai. <Strong>Ek personal skill ek
              system property ban gayi.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Chart: Chat Skill Se Factory System Tak</SubHeading>
            <RecapTable
              head={["Competency", "Ek Chat Mein", "Agent Factory Mein"]}
              rows={[
                ["Delegation", "AI se kya poochna hai decide karna", "Digital FTE scope karna, human/AI boundary set karna"],
                ["Description", "Instructions aur context dena", "System prompts, skills, context engineering, Systems of Record"],
                ["Discernment", "Answer review karna", "Evals, monitoring, sampling, checker ko trust karna"],
                ["Diligence", "Data protect karna, result ka zimmedar hona", "Governance, permissions, audit, disclosure, human review"],
              ]}
            />
            <P>
              <Strong>&ldquo;Agent Factory AI fluency replace nahi karta.
              Wo use industrialize karta hai.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>10-80-10 Rule Se Connection</SubHeading>
            <RecapTable
              head={["Stage", "4Ds Kaise Kaam Karti Hain"]}
              rows={[
                ["Pehle 10%: direction set karo", "Delegation aur Description yahan sab se strong hain, decide karo kya karne layak hai, goal clear karo"],
                ["Beech ke 80%: AI ko orchestrate karo", "Description aur Discernment continuously repeat hoti hain, jaise jaise AI kaam banata hai aap use steer karte ho"],
                ["Last 10%: truth judge karo", "Kuch bhi ship hone se pehle Discernment critical ban jati hai"],
                ["Poore 100% mein: responsibly act karo", "Diligence koi final checkbox nahi hai, ye poori workflow ko cover karti hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- MISTAKES ---------------------- */}
        <section id="mistakes" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>8. Beginners Ki 4 Common Mistakes</SubHeading>
            <RecapTable
              head={["Mistake", "Missing Skill", "Fix"]}
              rows={[
                ["Problem define kiye bina prompt karna", "Delegation", "Pehle goal, audience, constraints, aur human/AI split define karo"],
                ["Pehle answer ko hi final samajh lena", "Description + Discernment loop", "Result inspect karo, specific feedback do, aur iterate karo"],
                ["Professional sounding answer pe blindly trust karna", "Discernment", "Important facts, assumptions, calculations, aur sources verify karo"],
                ["Privacy/accountability ke baare mein sirf kuch wrong hone ke baad sochna", "Diligence", "Deployment se pehle data, disclosure, approval, aur accountability rules decide karo"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Daily Checklist</SubHeading>
            <RecapTable
              head={["Stage", "Khud Se Poocho"]}
              rows={[
                ["Delegate", "Goal kya hai? AI kya kare? Mere paas kya rahe?"],
                ["Describe", "Output, context, method, aur behavior mein se AI ko kya chahiye?"],
                ["Discern", "Mujhe kaise pata chalega answer correct, complete, aur useful hai?"],
                ["Be diligent", "Data safe hai? AI ke role ko disclosure chahiye? Result ko kaun approve/own karta hai?"],
              ]}
            />
            <P>
              Har chhote task ke liye ise paperwork banane ki zaroorat
              nahi, maqsad bas itna hai ke ye 4 sawal automatic ban jayen.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Practice Se Pehle Ek Chhota Recap</SubHeading>
            <P>
              AI fluency prompts ratta lagane ki ability nahi hai. Ye AI ke
              sath <Strong>effectively, efficiently, ethically, aur
              safely</Strong> kaam karne ki ability hai. Iske 3 modes hain:
              Automation (AI defined task karta hai), Augmentation (aap aur
              AI sath sochte hain), aur Agency (AI aapke set kiye goal ki
              taraf khud kaam karta hai, aksar un logon ke liye jo aap khud
              nahi hain).
            </P>
            <PullQuote>
              Decide karo AI kya kare. Kaam ko clearly describe karo. Jo
              wapis aaye usay check karo. Aage jo bhi ho uska zimmedar bano.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Prompts</SubHeading>
            <P>
              Sirf parhna kaafi nahi, ek AI assistant khol ke ye exercises
              khud try karo. Sab ek hi sitting mein complete karna zaroori
              nahi.
            </P>
            <Ladder
              steps={[
                {
                  title: "1. Kisi Real Task Ke Liye 4D Plan Banao",
                  note: "Koi real task chuno aur AI se poocho ke wo ek ek kar ke Delegation, Description, Discernment, Diligence pe sawal poochhe, jo apply na ho wo skip kar de, aur end mein ek chhoti table de. What to notice: plan zyada tar aapke apne answers se banta hai, AI ke nahi, kyunke Delegation aur Diligence sirf aap khud decide kar sakte ho.",
                },
                {
                  title: "2. Ek Jani-Pehchani Topic Pe Discernment Try Karo",
                  note: "Ek aisi topic pe baat karo jismein aapko actually experience ho, aur AI se kaho ke wo ek knowledgeable colleague ki tarah baat kare, teacher ki tarah nahi. What to notice: jab domain aapki khud ki ho to Discernment kitni cheap feel hoti hai, aap bina effort ke wrong claim pakar lete ho.",
                },
                {
                  title: "3. Non-Expert Hone Ka Feel Karo",
                  note: "Ek aisi topic chuno jisme aapko kuch bhi pata na ho, aur AI se kaho ke wo ek beginner ke liye explain kare, aur end mein wo claims batae jo aapko verify karni chahiyen. What to notice: same quality output kitna different feel hota hai jab check karne ko kuch bhi na ho, yehi feeling har us user ki hai jo aapka banaya agent use karega.",
                },
                {
                  title: "4. Ek Performance Description Likho",
                  note: "Session ke shuru mein hi AI ko bata do ke wo weak assumptions ko challenge kare, uncertainty flag kare, aur sirf politeness ke liye agree na kare. What to notice: difference kitni jaldi visible hoti hai, aur agar naya chat khol ke ye dobara na batao, to ye kitni jaldi fade ho jati hai.",
                },
                {
                  title: "5. Recommendation Se Pehle Uski Justification Check Karo",
                  note: "Koi real decision AI ko do aur usay assumptions, evidence, criteria, aur uncertainties list karne ko kaho, phir recommendation mangwao. What to notice: koi bhi assumption jo aap bina likhe silently accept kar lete, wahi sab se zyada check karne layak hai.",
                },
                {
                  title: "6. Ek Chhota Project Poore 4D Loop Se Guzaro",
                  note: "Ek hour mein complete hone wala project chuno: Delegation se start karo, har AI-owned task se pehle description poocho, har important output ke baad ruk ke evaluate karo, aur end mein facts, sensitive data, disclosure, aur approvals ka Diligence check karo.",
                },
              ]}
            />
            <Callout label="Har Exercise Ke Baad">
              Khud se poocho: &ldquo;kaunsi D mujhse sab se zyada effort
              maangti hai?&rdquo; Yehi wo competency hai jiski aapko sab se
              zyada practice karni chahiye.
            </Callout>
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
                ["AI fluency", "AI ke sath effectively, efficiently, ethically, aur safely kaam karne ki ability"],
                ["The 4Ds", "Delegation, Description, Discernment, aur Diligence"],
                ["Automation", "AI specific instructions se ek defined task perform karta hai"],
                ["Augmentation", "Human aur AI thinking partners ki tarah sath kaam karte hain"],
                ["Agency", "AI kisi insaan ki taraf se ek goal ki taraf kaam karta hai aur khud kai steps choose karta hai"],
                ["Delegation", "Decide karna kya kaam hona chahiye, AI kya kare, humans kya rakhein"],
                ["Problem awareness", "AI involve karne se pehle goal, kaam, risks, aur success ko samajhna"],
                ["Platform awareness", "Ye samajhna ke kaunsa AI system ya tool is task ke liye fit hai"],
                ["Task delegation", "Kaam ke parts jaan-boojh kar humans ya AI ko assign karna"],
                ["Description", "AI ko wo information aur guidance dena jo achhe kaam ke liye chahiye"],
                ["Product description", "Chahiye wale output ko define karna"],
                ["Process description", "AI ko kaam kaise approach karna hai ye define karna"],
                ["Performance description", "AI khud kaise behave kare, un logon ke liye jo use karenge, ye define karna"],
                ["Discernment", "AI ke output, justification, aur behavior ko evaluate karna"],
                ["Product discernment", "Khud result ko evaluate karna"],
                ["Process discernment", "Evaluate karna ke AI ke sath kaam karne ka tareeka faida de raha hai ya nahi"],
                ["Performance discernment", "Evaluate karna ke AI ka independent, user-facing behavior logon ke liye good outcomes de raha hai ya nahi"],
                ["Diligence", "AI kaise use hui aur uske output ka kya hua, iski responsibility lena"],
                ["Creation diligence", "Creation se pehle aur us dauran tools, data, aur AI ka responsible use choose karna"],
                ["Transparency diligence", "Jab AI ka role affected logon ke liye matter kare to honest rehna"],
                ["Deployment diligence", "AI-assisted kaam ko use, publish, send, ya execute karne se pehle verify aur vouch karna"],
                ["Context engineering", "AI system ko chahiye wala poora information environment design karna: instructions, documents, tools, memory, policies, examples"],
                ["Automation bias", "Automated output ko zaroorat se zyada easily trust kar lene ki human tendency"],
                ["Hallucination", "Ek confident ya plausible AI output jisme fabricated ya wrong information ho"],
                ["Redaction", "AI ko data dene se pehle person ya organization ko identify karne wale details hataana, jabke task ke liye zaroori pattern rakhna"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source &amp; License Note">
              AI Fluency Framework <Strong>Rick Dakan</Strong> (Ringling
              College) aur <Strong>Joseph Feller</Strong> (University
              College Cork) ne banaya, Anthropic ke sath milkar produce
              hua. Framework ka course <Strong>CC BY-NC-SA 4.0</Strong> ke
              under release hua, aur unka practical overview reference
              document <Strong>CC BY-NC-ND 4.0</Strong> ke under hai. Ye
              Cybrum notes is framework ki apni ek Roman Urdu explanation
              hain, Agent Factory book (agentfactory.panaversity.org) ke
              crash course pe based, uski copy nahi. Original padhne ke
              liye:{" "}
              <a
                href="https://aifluencyframework.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                aifluencyframework.org
              </a>{" "}
              aur Claude Academy ka free course{" "}
              <a
                href="https://academy.claude.com/courses/ai-fluency-framework-foundations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                AI Fluency: Framework and Foundations
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
              karo. Agar 8+ correct hon, to aap agle chapter ke liye ready
              ho.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "AI fluency ki 4 qualities kya hain?",
                  a: "Effective, Efficient, Ethical, aur Safe. Ye ek durable skill hai, prompt tricks ka collection nahi.",
                },
                {
                  q: "Automation, augmentation, aur agency mein difference kya hai?",
                  a: "Automation ek defined task specific instructions se execute karta hai (aap script writer ho). Augmentation mein aap aur AI thinking partners ki tarah collaborate karte hain (aap co-creator ho). Agency mein AI ek goal ki taraf boundaries ke andar khud kai steps choose karta hai, aksar aapke bina aur kabhi kabhi dusron ke liye (aap director ho).",
                },
                {
                  q: "Delegation ke 3 parts kya hain?",
                  a: "Problem Awareness (goal aur success samajhna), Platform Awareness (right AI tool choose karna), aur Task Delegation (kaam jaan-boojh kar divide karna).",
                },
                {
                  q: "Description ke 3 parts kya hain?",
                  a: "Product description (kya chahiye), Process description (kaise ho), aur Performance description (AI kaise behave kare). Yaad rakhne ka trick: What → How → Mujhse kaise deal karo.",
                },
                {
                  q: "Ek confident AI answer ko bhi verification kyun chahiye?",
                  a: "Kyunke AI plausible output generate karta hai, aur plausible correct ke barabar nahi hota. Fluent wording facts, assumptions, ya reasoning verify nahi karti; automation bias humein confident-looking answers ko zaroorat se zyada easily trust karwa deta hai.",
                },
                {
                  q: "Discernment ke 3 parts kya hain?",
                  a: "Product discernment (result achha hai?), Process discernment (ye tareeka faida de raha hai?), aur Performance discernment (AI khud act karte waqt logon ko achi tarah serve kar raha hai?).",
                },
                {
                  q: "Diligence ke 3 parts kya hain?",
                  a: "Creation diligence (tools/data ka responsible choice), Transparency diligence (AI ke role ke baare mein honest rehna), aur Deployment diligence (ship karne se pehle verify aur vouch karna).",
                },
                {
                  q: "AI-assisted kaam ship karne se pehle kaunsa sawal poochna chahiye?",
                  a: "\"Kya main confidently is par apna naam laga sakta hoon?\" Agar answer na hai, to kaam ready nahi hai.",
                },
                {
                  q: "Ek line mein, 4D loop kya hai?",
                  a: "Decide karo AI kya kare, kaam describe karo, jo wapis aaye usay evaluate karo, aur poore process ka zimmedar bano, zaroorat pade to repeat karo.",
                },
                {
                  q: "Agent Factory mein Discernment ek engineering practice kaise banti hai?",
                  a: "Ye eval suites, monitoring, sampling, review gates, aur dusre tareeqon mein badal jati hai jo test karte hain ke ek AI system acceptably perform kar raha hai ya nahi. Personal sawal \"kya ye kaafi achha hai?\" system-scale infrastructure ban jata hai.",
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
          <Link
            href="/anthropic-exam-prep"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Sab Chapters
          </Link>
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
