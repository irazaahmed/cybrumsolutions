import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  FileText,
  ListChecks,
  Lock,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Settings,
  User,
  Wrench,
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

const chapter = chapters.find((c) => c.slug === "what-ai-actually-is")!;
const prevChapter = getPrevLiveChapter("what-ai-actually-is");
const nextChapter = getNextLiveChapter("what-ai-actually-is");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "9 Ideas, No Math, No Code — AI actually kaise kaam karta hai, is par Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/what-ai-actually-is" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/what-ai-actually-is`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Engine Wali Example", level: 2 },
  { id: "part1", text: "Part 1 · The Machine", level: 2 },
  { id: "part2", text: "Part 2 · Ye Aise Kyun Behave Karta Hai", level: 2 },
  { id: "part3", text: "Part 3 · Predictor Se Agent Tak", level: 2 },
  { id: "recap", text: "Recap Aur Capstone", level: 2 },
  { id: "practice", text: "Practice: 6 Prompts", level: 2 },
  { id: "appendix", text: "Appendix: Claude.ai Cockpit Tour", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function PredictorLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Aapka prompt + context desk pe jo bhi hai",
          "Frozen weights next piece predict karti hain",
          "Ek piece choose ho ke answer mein add hota hai",
          "Wahi piece wapis feed hota hai, sath us sab ke jo pehle se desk pe hai",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Ye continue karta hai, kabhi lookup nahi karta, piece by piece
      </figcaption>
    </figure>
  );
}

function FrozenTimelineDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <Calendar size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Training (Past)</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Weights shape ho rahi hoti hain, ek dafa, builder ki taraf se
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-center">
          <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent-bright">
            <Lock size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Frozen Yahan Se</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            = knowledge cutoff. Aapki correction yahan aa ke bounce off ho
            jati hai
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <RefreshCw size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Inference (Forever)</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Har baar jab aap use karte ho, wahi frozen weights, kabhi change
            nahi hoti
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Training ek baar, past mein. Use hamesha ke liye, unchanged.
      </figcaption>
    </figure>
  );
}

function TwoFacultiesDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
            <User size={16} className="text-accent-bright" />
            Human Expert
          </p>
          <p className="text-xs leading-relaxed text-muted">
            Faculty 1: ek answer generate karta hai. Faculty 2: usay check
            karta hai, &ldquo;kya mujhe yaqeen hai? ye maine kahan se
            seekha?&rdquo; Dono faculties disagree bhi kar sakti hain.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
            <Bot size={16} className="text-accent-bright" />
            Language Model
          </p>
          <p className="text-xs leading-relaxed text-muted">
            Sirf ek faculty: ek continuation generate karta hai. Koi second
            faculty nahi hai jo check kare ke wo true hai ya nahi.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Fluency machine produce karti hai, truth nahi, aap wo missing
        second faculty ho
      </figcaption>
    </figure>
  );
}

function DeskTenantsDiagram() {
  const tenants = [
    { icon: MessageSquare, t: "Aapka Prompt" },
    { icon: FileText, t: "Conversation Ab Tak" },
    { icon: Paperclip, t: "Attached Files" },
    { icon: Wrench, t: "Tool Descriptions" },
    { icon: Settings, t: "System Prompt (invisible)" },
  ];
  return (
    <figure className="my-7">
      <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-4">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
          Context Window = Reading Desk
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {tenants.map(({ icon: Icon, t }) => (
            <div key={t} className="rounded-xl border border-border bg-card/70 p-3 text-center">
              <span className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                <Icon size={14} />
              </span>
              <p className="text-[0.7rem] font-medium leading-tight text-foreground">{t}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Jo desk pe hai, model wo use kar sakta hai. Jo desk pe nahi, wo is
        answer ke liye exist hi nahi karta
      </figcaption>
    </figure>
  );
}

function JaggedFrontierDiagram() {
  const items = [
    { t: "Quantum mechanics explain karna", h: 90 },
    { t: "\"strawberry\" mein r count karna", h: 25 },
    { t: "Legal clause draft karna", h: 85 },
    { t: "3-step logic riddle", h: 30 },
    { t: "Working code likhna", h: 88 },
    { t: "Do bare numbers zehan mein jama karna", h: 20 },
  ];
  return (
    <figure className="my-7">
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/40 p-4" style={{ height: "9rem" }}>
        {items.map((it) => (
          <div key={it.t} className="flex flex-1 flex-col items-center justify-end gap-1.5" style={{ height: "100%" }}>
            <div
              className="w-full rounded-t-md bg-accent"
              style={{ height: `${it.h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-6">
        {items.map((it) => (
          <p key={it.t} className="text-center text-[0.65rem] leading-tight text-muted">
            {it.t}
          </p>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Jagged frontier: capability difficulty ke sath track nahi karti,
        easy task jo fail ho wahi dangerous hai, wahi jo aap kabhi check
        nahi karte
      </figcaption>
    </figure>
  );
}

function AgentLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Agla action predict karo",
          "Tool usay real mein run kare",
          "Result context desk pe aaye",
          "Wapis predict karo, goal ki taraf repeat",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Koi naya mind nahi, bas ek jana pehchana predictor, tools ka set,
        aur ye loop, bohot baar chalta hua
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
  url: `${site.url}/anthropic-exam-prep/what-ai-actually-is`,
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

export default function WhatAiActuallyIsChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke bunyadi
              &ldquo;the machine&rdquo; layer ke liye foundation hai, jo
              baaki saare domains ke neeche baithta hai
            </p>
            <CoreIdea>
              Ye chapter 9 ideas mein batata hai ke AI actually hai kya.
              Koi math nahi, koi code nahi. Book kehti hai: is course ko
              sab se pehle parho, kyunke baaki saare Foundations courses ye
              assume karte hain ke aapko ye pehle se pata hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Engine Wali Example</SubHeading>
            <P>
              Aap bina ye jaane car chala sakte ho ke engine kya hota hai.
              Zyada tar log yehi karte hain. Lekin jab kuch wrong ho jaye,
              to jinko pata hai hood ke neeche roughly kya hai, wo calm
              rehte hain. Jinko nahi pata, unke liye wo poori machine ek
              opaque box hai jo ya to kaam karta hai ya nahi karta, ek
              harmless rattle aur seized engine mein farq nahi kar sakte.
            </P>
            <P>Ye course hood ke neeche ek dafa dekhna hai.</P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Course Kya Deta Hai</SubHeading>
            <P>
              Parhne mein 35-40 minute lagte hain 9 ideas ke liye, 25
              minute closing exercises ke liye, aur agar Claude.ai wala
              appendix bhi parhna ho to 10-15 minute extra.
            </P>
            <P>
              Ye chapter <Strong>mechanism</Strong> deta hai, jabke &ldquo;AI
              Prompting in 2026&rdquo; <Strong>practice</Strong> deta hai.
            </P>
            <RecapTable
              head={["Topic", "Yahan (machine)", "AI Prompting 2026 (habit)"]}
              rows={[
                ["Ye kya jaanta hai", "Learning kyun freeze hui, jaan-boojh kar", "Wo knowledge kitni reliable hai"],
                ["Context window", "Ye model ki poori duniya kyun hai", "Isay kaise manage aur protect karein"],
                ["Chat history", "Transcript har turn replay kyun hoti hai", "Lambe kaam mein rot se kaise bachein"],
                ["Confidence", "Ye confident kyun sound karta hai, agree kyun karta hai", "Isay kaise neutralize karein"],
                ["Reasoning", "\"Thinking\" actually kya hai", "Kab on karein, kab nahi"],
                ["Images aur audio", "Ye bhi bas extra tokens hain", "Inke sath kaam kaise karein"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Do Minute Mein Prove Karo</SubHeading>
            <P>Claude.ai, ChatGPT, ya Gemini khol ke ye exactly paste karo (misspelling jaan-boojh kar hai):</P>
            <PromptBox>{`Without using any tools, just from memory: how many times does the
letter R apear in the word 'strawberry'? Then spell the word out one
letter at a time and count again.`}</PromptBox>
            <P>
              Kai models pehli try mein miscount kar dete hain, phir letter
              by letter spell karte waqt sahi kar lete hain.
            </P>
            <Callout label="Lesson">
              Model letters nahi dekhta. Ye <Strong>tokens</Strong> dekhta
              hai, prompt model tak pahunchne se pehle chunks mein chop ho
              chuka hota hai. Misspelling &ldquo;apear&rdquo; se koi
              confusion nahi hoti, jo dikhata hai tokens actual words ke
              close hi meaning tak map karte hain.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · The Machine</PartBanner>
            <SubHeading>Idea 1: Ye Next Text Predict Karta Hai, Lookup Nahi Karta</SubHeading>
            <P>
              Ek language model ek machine hai jo, kuch text diya jaye, to
              predict karti hai ke agla text kya most plausibly aana
              chahiye, ek chhoti si piece ek waqt mein.
            </P>
            <P>
              Zyada tar log sochte hain AI ek &ldquo;bohot fast
              librarian&rdquo; ki tarah kaam karta hai, jiske paas apna
              internal encyclopedia hai. Ye galat hai. Ye us se zyada{" "}
              <Strong>duniya ke sab se well-read autocomplete</Strong>{" "}
              jaisa hai.
            </P>
            <PredictorLoopDiagram />
            <P>
              Agar aap France ki capital poochho, prediction truth se match
              kar jati hai, kyunke training data mein wo hazaron baar aaya
              hai. Agar aap kisi obscure self-published novel ka plot
              poochho, model sab se plausible-sounding continuation banata
              hai, jo aksar false hota hai.{" "}
              <Strong>Prediction knowledge jaisi lagti hai</Strong> sirf
              wahan jahan training text thick thi.
            </P>
            <Callout label="Reframe">
              Librarian ki tasveer chhod do. Ek writer socho jo continue
              karta hai. Ek librarian jise book nahi milti wo kehta hai
              &ldquo;hamare paas ye nahi.&rdquo; Ek writer jise story
              continue karne ko kaha jaye, wo kabhi ruk ke check nahi karta
              ke continuation true hai ya nahi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Stochastic Sampling</SubHeading>
            <P>
              Model plausible tokens ka ek spread predict karta hai, likelihoods
              ke sath, phir usi spread se ek <Strong>sample</Strong> karta
              hai. Isi liye same input alag output de sakta hai. Ek setting,{" "}
              <Strong>temperature</Strong>, ye control karti hai ke sampling
              kitni bold hai: low temperature almost hamesha sab se likely
              token choose karti hai (steady, repetitive), high temperature
              kam-likely tokens tak bhi reach karti hai (varied, creative,
              kabhi kabhi off). Yehi &ldquo;frequency equals
              reliability&rdquo; wala rule bhi explain karta hai: training
              mein jo true continuation jitni baar aayi, prediction utni hi
              strong hoti hai.
            </P>
            <Callout label="Note">
              Web search wale tools predictor ke around extras wrap karte
              hain (search, file read, code run), lekin model still results
              se continuations predict kar ke answer banata hai. Model khud
              &ldquo;lookup&rdquo; nahi karta, wo predict karta hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Idea 2: Ye Reading Se Seekha, Phir Seekhna Ruk Gaya</SubHeading>
            <P>
              Model ko bohot bara human text dikhaya gaya, aur usne khud ko
              adjust kiya next piece predict karne ke liye. Training khatam
              hone ke baad, learning freeze ho jati hai, fixed internal
              numbers mein (weights/parameters), jo phir kabhi change nahi
              hote.
            </P>
            <P>
              Training data trillions tokens ka hota hai: public internet
              ka bara hissa, digitized books, open-source code,
              encyclopedias, academic papers, forum archives. Model ki
              strengths aur blind spots training pile ko reflect karte
              hain. Jo topics thick cover huye, wahan achha predict karta
              hai. Jo topics barely touch huye, wahan guess karta hai.
            </P>
            <P>3-stage training assembly line:</P>
            <Ladder
              steps={[
                { title: "Pretraining", note: "Poori pile parhna" },
                { title: "Instruction Tuning", note: "Hand-built examples pe train hona (instructions + good responses), taake ye pattern seekhe ke sawal ka plausible continuation ek answer hai" },
                { title: "Feedback Tuning", note: "Human ratings se answer ka style shape karna" },
              ]}
            />
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["Training", "Ek dafa, past mein, builder ki taraf se education. Expensive, slow, finished."],
                ["Inference", "Har baar jab aap use karte ho. Frozen weights aapke prompt pe run hoti hain. Fast, cheap, model ke andar kuch change nahi karti."],
              ]}
            />
            <Callout label="Ek Ahem Baat" tone="warn">
              Jab aap chat mein model ko correct karte ho aur wo bolta hai
              &ldquo;you&apos;re right&rdquo;, wo seekha nahi hai. Usne sirf
              wo text predict kiya jo ek correction ke baad plausibly aata
              hai. Isi conversation mein, aapki correction help karti hai
              (context window mein baith jati hai). Lekin model ke andar
              kuch change nahi hua. Chat close karo, agli conversation
              exactly wahi frozen weights se start hoti hai, correction ka
              koi trace nahi.
            </Callout>
            <FrozenTimelineDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>2 Direct Consequences</SubHeading>
            <P>
              <Strong>Knowledge cutoff:</Strong> training ek specific date
              pe khatam hui. Us date ke baad ki koi bhi cheez weights mein
              nahi hai. Model permanently ek brilliant expert hai jisne ek
              specific din news parhna band kar diya.
            </P>
            <P>
              <Strong>Aapki private duniya nahi jaanta:</Strong> company ke
              numbers, aapka personal calendar, kal ka email, ye kabhi
              training text mein thay hi nahi, isliye weights mein inke
              baare mein kuch nahi hai. Model chhupa nahi raha, ye
              information kabhi freeze karne ke liye maujood hi nahi thi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Jaan-Boojh Kar Frozen Kyun Banaya Gaya</SubHeading>
            <Ladder
              steps={[
                { title: "Cost", note: "Training expensive hai (compute mein sainkron million dollars, kai mahine). Inference cheap hai. Agar model har baar dobara seekhe, to har chat mein expensive machinery lag jayegi. Economics sirf isi liye kaam karti hai kyunke education ek dafa hoti hai, use hamesha ke liye." },
                { title: "Safety Aur Testing", note: "Frozen model ek dafa test hoti hai, phir har user ke liye usi envelope ke andar behave karti hai. Jo model khud ko rewire kare, wo drift kar jayegi (2016 mein ek chatbot jo public se seekhta tha, ek din mein hi corrupt ho gaya tha)." },
                { title: "Consistency", note: "Millions log ek hi identical weight set share karte hain. Bugs har jagah reproduce hote hain. Jo answer kal safe tha, aaj bhi wahi hai. Har user ke liye alag, badalta model ye consistency lose kar deta." },
              ]}
            />
            <P>
              <Strong>Stateless</Strong> ka matlab: koi apni memory nahi,
              har response frozen weights se scratch se compute hota hai,
              plus jo bhi is waqt saamne hai, aur inference time par kuch
              bhi kiya hua koi trace nahi chhorta.
            </P>
            <Callout label={'"Memory" Feature Ka Sach'}>
              Kuch products &ldquo;memory&rdquo; feature dete hain jo lagta
              hai chats ke beech remember kar raha hai. Ye weights change
              <Strong> nahi</Strong> karta. Iski jagah, product chupke se
              aapke baare mein facts text ki tarah save karta hai, aur har
              conversation ki shuruat mein wahi text context mein wapis
              daal deta hai. Ye model ka remember karna nahi, product ka
              usay ek note dobara khila dena hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Technical Terms: Parameters, MoE, Quantization</SubHeading>
            <P>
              Ye batate hain weights <Strong>kaise</Strong> banaye aur
              affordable banaye jate hain, <Strong>kya</Strong> machine
              karti hai wo nahi.
            </P>
            <CheckList
              items={[
                "Parameters/Weights: frozen numbers. Zyada usually zyada capable aur run karna zyada expensive, lekin ye badalta nahi ke wo kya karte hain",
                "Mixture of Experts (MoE): har token pe sirf parameters ka ek hissa on hota hai, sab nahi. Isse bara model faster aur cheaper chalta hai. Bahar se machine still exactly wahi ek kaam karti hai: agla piece predict karna",
                "Quantization: numbers ko lower precision par store karna taake model chhote hardware pe fit ho jaye. Same behavior, lighter footprint",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Idea 3: Koi Alag Jagah Nahi Jahan Ye Check Kare Ke Sach Hai</SubHeading>
            <TwoFacultiesDiagram />
            <P>
              Model ke paas sirf generation faculty hai. Koi alag machine
              nahi jo prediction ko user tak pahunchne se pehle truth ke
              liye check kare. Same single process correct aur incorrect
              continuations dono banati hai, koi internal flag nahi hota.
              Fluency machinery produce karti hai, truth kuch aisi cheez
              hai jo upar se, imperfectly layer hoti hai.
            </P>
            <Callout label="Hallucination Kya Hai" tone="warn">
              &ldquo;Hallucinate&rdquo; word sunke lagta hai jaise koi bug
              ho jo fix karni hai. Aisa nahi hai. Ye exactly wahi hai jo
              machine ke liye normal hai: ek plausible continuation
              predict karna, aisi jagah jahan wo plausible continuation
              actually true nahi hoti.
            </Callout>
            <P>3 factors mil ke hallucination banate hain:</P>
            <CheckList
              items={[
                "Machine ka sirf ek kaam hai: continue karna (Idea 1)",
                "Ye sirf usi taraf continue kar sakti hai jo frozen training text mein thick thi (Idea 2)",
                "Andar kuch bhi result check nahi karta (yehi idea)",
              ]}
            />
            <P>
              Confidence bhi misleading hai. Model ka confident tone iska
              proof nahi ke wo sahi hai. Tone bhi ek learned style hai
              (Idea 6), same process se generate hota hai jaisa content
              hota hai, aur utna hi truth se decoupled. Ek bani hui statistic
              bilkul usi confident awaaz mein aati hai jaisi ek real
              statistic aati hai.
            </P>
            <Callout label="Real Example">
              Ek parent ne AI se apne shehar ki ek chhoti si tuition
              academy ki exact fee schedule aur class timings poochhi, jis
              academy ki website tak nahi thi. AI ne ek confident,
              neatly-formatted table bana di, courses, timings, monthly
              fees ke sath. Har figure invented tha. AI ne jhoot nahi bola
              tha aur na malfunction hua tha. Academy training text mein
              barely present thi, isliye koi real schedule predict karne ko
              nahi tha, aur na hone ki wajah se, machine ne wahi kiya jo wo
              kar sakti hai: sab se plausible-looking fees produce ki,
              usi confident voice mein jo wo verified facts ke liye bhi
              use karti hai. Uske paas koi second faculty nahi thi jo
              whisper kare &ldquo;you&apos;re guessing.&rdquo; Wo whisper
              aapki taraf se aana chahiye.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · Ye Aise Kyun Behave Karta Hai</PartBanner>
            <SubHeading>Idea 4: Ye Tokens Mein Parhta Hai, Letters Ya Words Mein Nahi</SubHeading>
            <P>
              Model aapka prompt letters ki tarah nahi dekhta, aur pura
              words ki tarah bhi nahi. Har cheez se pehle, aapka text{" "}
              <Strong>tokens</Strong> mein chop hota hai: chunks jo usually
              ek word ya word ka hissa hote hain. &ldquo;Strawberry&rdquo;
              shayad 2-3 chunks mein aaye, &ldquo;the&rdquo; ek chunk hai,
              aur koi lamba ya unusual word kai chunks mein.
            </P>
            <P>
              Model chunks parhta hai aur chunks mein predict karta hai,
              alag-alag countable letters ki clean rows mein nahi. Ye
              spelling bohot kuch token patterns se infer kar sakta hai
              (ek token even ek single character bhi ho sakta hai), lekin
              exact letter-level kaam iske liye unnatural hai, jab tak aap
              usay ek ek letter spell karne pe force na karo.
            </P>
            <RecapTable
              head={["Behavior", "Tokens Kyun Explain Karte Hain"]}
              rows={[
                ["Word ke letters miscount karna (strawberry test)", "Ye chunks dekhta hai, letters nahi. Chunk ke andar letters count karna, street address se rooms count karne jaisa hai"],
                ["Kuch rhyming, anagrams, wordplay mein weak hona", "Ye letters aur sounds pe kaam karte hain, model chunks pe kaam karta hai"],
                ["Typos rarely matter karte hain", "Misspelled word phir bhi intended meaning ke qareeb chunks mein map hoti hai"],
                ["Cost aur length tokens mein measure hoti hai, words mein nahi", "Machine actually jo process karti hai wo token hai, isi liye ye billing aur limit ki unit hai"],
              ]}
            />
            <P>Tokens ek waqt mein 3 units hote hain:</P>
            <CheckList
              items={[
                "Meaning ki unit: tokens hi hain jo model parhta aur likhta hai",
                "Memory ki unit: jab tool bolta hai \"200,000-token context window\", to ye batata hai kitne chunks ek waqt mein saamne rakh sakta hai",
                "Money ki unit: jab \"per token\" bill hota hai, aap har chunk in aur out ke paise dete ho",
              ]}
            />
            <P>
              Roughly, 4 tokens ≈ 3 words. Non-English scripts (Urdu,
              Arabic, Hindi, Chinese) usually har word ke liye zyada tokens
              lete hain, kyunke training text English-heavy tha aur
              tokenizer ne English chunks best seekhe. Isse 2 practical
              consequences hote hain: same message non-English language
              mein zyada cost karta hai, aur context window jaldi bhar
              jata hai, matlab model ki effective memory chhoti ho jati
              hai.
            </P>
            <Callout label="Images Aur Audio">
              Model images aur audio bhi handle kar sakta hai, mechanism
              same rehta hai. Upload ki hui picture chhote <Strong>
              patches</Strong> mein slice hoti hai, har patch ek token ban
              jata hai. Audio clip <Strong>segments</Strong> mein slice
              hota hai. Model ek hi stream par predict karta hai jismein
              word-chunks, image-patches, aur audio-segments mix hote hain.
              Isi liye images mein fine print parhna hard hota hai, wahi
              &ldquo;strawberry problem&rdquo; wapis aa jata hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Idea 5: Context Window Hi Uski Poori Duniya Hai</SubHeading>
            <P>
              Weights frozen hain (Idea 2) aur model ki apni koi memory
              nahi, isliye ek hi jagah hai jahan se model aapki specific
              situation ke baare mein maloom kar sakta hai:{" "}
              <Strong>context window</Strong>, wo text jo is ek response ke
              liye uske saamne rakha hai.
            </P>
            <DeskTenantsDiagram />
            <P>
              Is desk pe jo bhi hai, model use kar sakta hai. Jo nahi hai,
              wo is answer ke liye exist hi nahi karta, isliye nahi ke
              model refuse kar raha hai, balke isliye ke usay dekhne ki
              koi aur jagah hi nahi hai.
            </P>
            <Callout label="System Prompt">
              <Strong>System prompt</Strong> instructions ka ek block hai
              jo product banane wala likh ke window ke sab se upar rakh
              deta hai, aapke pehle word aane se pehle hi (&ldquo;you are a
              helpful assistant&rdquo;, aaj ki date, house formatting
              rules, refuse karne wali cheezein). Ye code nahi hai, jadu
              bhi nahi, bas desk pe ek aur text hai, sab se pehle, isi
              prediction machinery se parha jata hai jo baaki sab kuch
              parhti hai.
            </Callout>
            <P>
              Window ka size tokens mein quote hota hai. 2026 mein common
              200,000-token window roughly 150,000 English words hai (ek
              aur adhi novel jaisa). Ek million-token window roughly
              750,000 words hai (7-8 poori novels). Genuinely bohot bara,
              aur phir bhi finite, aur shared: system prompt, tool
              descriptions, chat history, aapki files, aapka latest sawal,
              sab isi window mein ek sath rehte hain.
            </P>
            <Callout label="Do Reframings">
              <Strong>Briefing kyun kaam karti hai:</Strong> model ko
              context dena politeness ya trick nahi hai. Ye literally
              information ko us ek jagah rakhna hai jahan machine parh
              sakti hai. Ek un-briefed model lazy nahi ban rahi, uske
              saamne genuinely kuch bhi nahi hai.
              <br />
              <Strong>Lambi conversations kyun worse ho jati hain</Strong>{" "}
              (&ldquo;context rot&rdquo;): window ki size ek limit hai,
              tokens mein measure hoti hai. Zyada unrelated history bhar
              do, to signal dilute ho jata hai, ya oldest hisse summarize
              ho ke jagah banate hain. Model tired nahi ho raha, uska
              reading desk bas overcrowded ho gaya hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Chat History, Context Replayed</SubHeading>
            <P>
              Ek illusion hota hai: ek hi conversation ke andar, lagta hai
              model yaad rakhta hai aap ne 10 messages pehle kya kaha tha.
              Reality ye hai: stateless machine ke paas responses ke
              darmiyan koi memory nahi hoti, na hi ek chat ke andar. Har
              baar jab aap send karte ho, app chupke se{" "}
              <Strong>poora transcript ab tak</Strong> (aapke messages,
              iske answers, sab kuch) context window mein wapis bhej deta
              hai, aur frozen model poora scratch se parh ke agla reply
              predict karta hai.
            </P>
            <P>
              Ye aapke 10th message ka jawab messages 1 se 9 dobara parh
              ke deta hai. Har single turn. Chat history model ke andar
              store nahi hoti. Ye text hai, desk pe sawari kar rahi hai.
              Transcript app ke database mein rehta hai, company ke
              servers pe, kisi bhi document ki tarah saved. Isi liye aap
              app close kar ke, ek mahine baad ek alag phone pe wahi chat
              khol ke continue kar sakte ho: app ne stored transcript fetch
              kiya aur replay resume kiya.
            </P>
            <Callout label="Deleting Chat Ka Matlab">
              Model kuch bhi store nahi karta, app sab kuch store karta
              hai, aur usay wapis feed karta hai. Isi liye chat delete
              karna waqai kuch remove karta hai. Jo delete hoti hai wo
              stored transcript hai. Model ke andar delete karne ko kabhi
              kuch tha hi nahi.
            </Callout>
            <RecapTable
              head={["Behavior", "Replay Kya Explain Karti Hai"]}
              rows={[
                ["Is chat ko \"yaad\" rakhta hai lekin last wali ko nahi", "Ye kabhi kisi ko yaad nahi rakhta. Is chat ka transcript har message ke sath resend hota hai, last chat ka nahi"],
                ["Lambi chats slow aur expensive hoti jati hain", "Har reply ke liye poora growing transcript dobara process hota hai. 50th message, pichle 49 messages ki history bhi apne sath lata hai, aap unke tokens dobara pay karte ho"],
                ["Bohot lambi chat ka shuru wala hissa bhool jata hai", "Transcript window se bara ho gaya. App ne oldest turns cut ya summary mein squash kar diya, jagah banane ke liye"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Skills Aur Progressive Disclosure</SubHeading>
            <P>
              Desk finite hai, lekin jo expertise aap apni AI ko carry
              karwana chahte ho wo nahi hai, aur is tension ka ek standard
              jawab hai.
            </P>
            <Callout label="Skill Ki Definition">
              Ek <Strong>skill</Strong> instructions aur reference files ka
              ek folder hai (ek <Strong>SKILL.md</Strong> plus jo bhi
              chahiye), jo desk se <Strong>bahar</Strong>, disk pe rehta
              hai. Sirf har installed skill ki ek line ki description
              context window mein baithti hai. Jab aapki request us
              description se match kare, product poori skill desk pe load
              kar deta hai, model usay parhta hai jaise wahan har cheez
              parhta hai, aur task khatam hone pe usay wahin rehne ki
              zaroorat nahi.
            </Callout>
            <P>
              Is trick ka naam <Strong>progressive disclosure</Strong> hai:
              knowledge ko desk se bahar files mein rakho, sirf wahi load
              karo jo is waqt chahiye, aur window ko kaam pe spend karo, na
              ke har us cheez pe jo aap kabhi jaan sakte ho.
            </P>
            <PullQuote>
              Context window ek reading desk hai, brain nahi. Jo aap desk
              pe rakho, model dhyan se parhta hai. Jo desk se bahar chhor
              do, wo dikh nahi sakta, chahe aapko kitna bhi obvious lage.
            </PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>Idea 6: Iski Confidence Ek Learned Style Hai, Truth Signal Nahi</SubHeading>
            <P>
              Idea 3 ne bataya model ke paas koi internal truth-checker
              nahi. Ye idea doosri side explain karti hai: constant
              confidence, aur ye correctness ke baare mein kuch bhi kyun
              nahi batati.
            </P>
            <P>
              Confidence ka source training assembly line ka 3rd stage hai
              (Idea 2). Pretraining aur instruction tuning ke baad, models
              human feedback se tune hoti hain, jise <Strong>RLHF</Strong>{" "}
              (reinforcement learning from human feedback) kehte hain.
              Log responses ko rate karte hain, model us kism ke answer ki
              taraf adjust hoti hai jise log zyada rate karte hain.
            </P>
            <P>
              Millions ratings mein, log confident, helpful, fluent, aur
              agreeable answers ko hedged, blunt, ya push-back karne wale
              answers se zyada prefer karte hain. Isliye machine confident,
              agreeable, fluent text banane ki taraf leans karti hai,{" "}
              <Strong>chahe underlying content sahi ho ya na ho.</Strong>{" "}
              Confidence ek style ban gayi jo ye by default wear karta hai.
            </P>
            <RecapTable
              head={["Behavior", "Wajah"]}
              rows={[
                ["Wrong hone par bhi certain sound karta hai", "Certainty ek learned stylistic default hai, wahi process generate karta hai jo content, aur wahi truth se decoupled"],
                ["Aapse agree karne ki taraf tend karta hai (sycophancy)", "Agreement ko disagreement se zyada rate mila, isliye machine wahi kehne ki taraf leans karti hai jo aap sunna chahte ho"],
              ]}
            />
            <Callout label="Prompting Course Ke Fixes Ab Sense Banate Hain">
              Neutral framing kaam karti hai kyunke ye wo signal hata deti
              hai jis ki taraf model otherwise lean karta. Explicit
              criteria ke against score maangna kaam karta hai kyunke
              criteria bare adjective se zyada kam jagah chhorte hain
              agreeable vagueness ke liye. Aap machine ko outsmart nahi kar
              rahe, aap wo cues hata rahe ho jo iski trained-in lean ko
              trigger karti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Idea 7: Ye Adjacent Moments Mein Brilliant Aur Useless Hai (Jagged Frontier)</SubHeading>
            <P>
              Human ability fairly smooth hai: jo hard calculus kar sakta
              hai, wo almost zaroor easy arithmetic bhi kar sakta hai. AI
              ability smooth nahi hai. Ye <Strong>jagged</Strong> hai:
              superhuman ek task pe, aur startlingly incompetent ek
              neighbouring task pe jo humein utna hard nahi lagta.
            </P>
            <JaggedFrontierDiagram />
            <P>
              Ye jaggedness random nahi hai. Ye wapis training text aur
              token mechanism se aati hai. Jo tasks training mein often,
              clear form mein aaye, wahan strong hai. Jo tasks aisi cheezon
              pe depend karte hain jo machine achi tarah nahi dekh sakti,
              wahan weak hai. Frontier &ldquo;brilliant&rdquo; aur
              &ldquo;useless&rdquo; ke beech ek jagged line mein chalti hai
              jo human intuition se match nahi karti, isi liye log baar
              baar surprise hote hain.
            </P>
            <RecapTable
              head={["Habit", "Jaggedness Se Kyun Follow Karta Hai"]}
              rows={[
                ["Assume mat karo ke hard task pe achha kiya to easy pe bhi achha karega", "Dono jagged frontier ke opposite sides pe ho sakte hain"],
                ["Boundary pe verify karo, beech mein nahi", "Dangerous errors wo easy-looking tasks hain jo ye chupke se fail karta hai, wo hard tasks nahi jo aap already check kar rahe the"],
                ["Same task 2-3 alag models mein try karo", "Alag models ki frontier shape alag hoti hai, ek wo pakar leta hai jo doosra miss kar deta hai"],
              ]}
            />
            <Callout label="Note">
              Frontier bhi move karta hai. Jo model &ldquo;is quarter nahi
              kar sakta&rdquo;, agle quarter ka naya model shayad aasani se
              kar de, aur jo cheez ye achha karta hai, wo shayad improve na
              ho.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Text-Predictor Se Woh Cheez Jo Act Karti Hai</PartBanner>
            <SubHeading>Idea 8: Tools Isay Act Karne Dete Hain, Sirf Describe Nahi</SubHeading>
            <P>
              Ab tak sab kuch ek aisi machine describe karta hai jo text
              produce karti hai. Pure text-predictor aapko batayega mausam
              training se yaad hai, lekin aaj ka mausam check nahi kar
              sakta, real numbers pe calculation nahi run kar sakta, aapki
              file nahi parh sakta, ya email nahi bhej sakta. Ceiling{" "}
              <Strong>tools</Strong> se lift hui.
            </P>
            <Callout label="Tool Ki Definition">
              Ek defined action jise model call karne ki ijazat hai (web
              search, code run, file read, email draft), context window
              mein describe kiya hua, baaki sab cheezon ke sath.
            </Callout>
            <P>
              Mechanism almost embarrassingly simple hai. Kabhi kabhi model
              predict karta hai ke sahi continuation plain prose ki jagah
              &ldquo;search tool ko is query ke sath use karo&rdquo; hai.
              Jab aisa hota hai, product wo action real mein run karta hai,
              result wapis context window mein daal deta hai, aur model
              wahan se continue karta hai. Predict, action, result-wapis-
              context-mein, phir predict. Yehi loop hai farq ek chatbot
              jo duniya describe karta hai, aur ek assistant jo uspar act
              karta hai, ke darmiyan.
            </P>
            <AgentLoopDiagram />
            <P>
              Baaki Foundations courses, mechanism ki nazar se, isi
              predictor pe wire ki hui specific tools ke courses hain: code
              execution (Code You Never Write), connectors jo real apps se
              wire hote hain jaise Drive, Gmail, Slack (Skills &amp;
              Connectors, jo <Strong>MCP</Strong>, Model Context Protocol,
              ka shared open standard bolte hain), aur web search (AI
              Prompting in 2026).
            </P>
            <Callout label="MCP Explain Kiya">
              <Strong>MCP standard plug shape hai, connector ek specific
              appliance hai jo usi plug mein fit ho.</Strong> Kyunke plug
              standard hai, ek agent thousands services se connect ho
              sakta hai bina har ek ke liye custom wiring ke, aur jo bhi
              service MCP implement kare wo kisi bhi agent ke sath kaam
              karti hai jo MCP bolti hai. Jo bhi connector fetch kare, wo
              har tool result ki tarah aata hai: text jo context desk pe
              land karta hai, jise model wahan se continue karta hai. Naya
              plug, same machine.
            </Callout>
            <PullQuote>
              Ye book &ldquo;agent&rdquo; kehta hai us AI ko jo aapki
              taraf se multi-step kaam karta hai. Agent yehi hai: same
              next-token predictor, tools ke sath, predict-act-observe loop
              baar baar chalata hua, ek goal ki taraf. Koi naya mind
              involved nahi. Ek jana-pehchana predictor, tools ka set, aur
              ek loop.
            </PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>Idea 9: &ldquo;Thinking&rdquo; Bas Answer Se Pehle Extra Prediction Hai</SubHeading>
            <P>
              Naye models &ldquo;think&rdquo; ya &ldquo;reason&rdquo; kar
              sakte hain answer dene se pehle. Ek <Strong>reasoning</Strong>{" "}
              model, apna final answer dene se pehle, pehle intermediate
              working ka ek lamba hissa predict karta hai (steps likhna,
              approaches try karna, khud ko check karna), aur tabhi final
              answer predict karta hai, ab us saare working ke sath jo
              uske apne context window mein baith chuka hai. Ye still pure
              next-token prediction hai.
            </P>
            <P>
              Trick ye hai ke <Strong>answer predict karna aasan aur
              accurate ho jata hai jab desk pe already ek achi reasoning
              chain ho jahan se predict karna hai.</Strong> Pehle work
              through karna genuinely help karta hai, isi wajah se ek
              insaan ko bhi paper pe soch ke commit karna help karta hai.
            </P>
            <Callout label="Cost Consideration" tone="warn">
              Reasoning ka matlab bohot saare extra tokens generate karna
              hai jo aap kabhi nahi dekhte, aur wo tokens time aur money
              lete hain. Isi liye prompting course kehta hai thinking mode
              genuinely hard questions ke liye bachao, quick lookups ke
              liye skip karo.
            </Callout>
            <Callout label="Reasoning Truth-Checker Nahi Deti" tone="warn">
              Ye Idea 3 wali second faculty machine ko nahi deti. Ek
              reasoning model apna kaam usi prediction process se check
              karta hai jo wrong ho sakta hai, isliye ye apni bohot saari
              galtiyan pakar leta hai aur phir bhi kuch miss kar deta hai,
              aur ek rigorous lagne wali reasoning chain ke andar full
              confidence ke sath hallucinate kar sakta hai.{" "}
              <Strong>Zyada thinking gap kam karta hai. Khatam nahi
              karta.</Strong> Aap still final check ho.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ye Course Jaan-Boojh Kar Kya Chhor Deta Hai</SubHeading>
            <P>
              &ldquo;No math, no code&rdquo; ka promise rakhne ke liye, kuch
              real topics side pe rakhe gaye:
            </P>
            <CheckList
              items={[
                "Training compute aur cost: enormous, isi liye sirf kuch organizations ye build karti hain",
                "Safety aur alignment work: apne aap mein ek bara field",
                "Deeper mechanics: weights kaise structure aur adjust hoti hain, isme math chahiye jo ye course skip karta hai",
              ]}
            />
            <P>In mein se koi bhi upar wale 9 ideas ko nahi badalta, wo inke neeche aur sath baithte hain.</P>
          </Reveal>

          <Reveal>
            <SubHeading>9 Ideas, Ek Ek Line</SubHeading>
            <RecapTable
              head={["#", "Idea", "Ek Line"]}
              rows={[
                ["1", "Predicts, lookup nahi", "Prediction knowledge lagti hai sirf jahan training text thick thi"],
                ["2", "Learning froze ho gayi", "Cost, safety, consistency ki wajah se, isi liye knowledge cutoff aur \"stateless\""],
                ["3", "Koi second faculty nahi", "Hallucination machine ka normal kaam hai, malfunction nahi"],
                ["4", "Tokens mein parhta hai", "Token meaning, memory, aur money teenon ki unit hai"],
                ["5", "Context window hi duniya hai", "Reading desk, brain nahi. Chat history transcript replayed hai"],
                ["6", "Confidence ek style hai", "RLHF ne agreeable, confident tone sikhaya, truth se decoupled"],
                ["7", "Jagged frontier", "Ek jagah brilliant, agli jagah useless, human intuition se match nahi karta"],
                ["8", "Tools = action", "Predict-act-observe loop. Connectors MCP par wired tools hain"],
                ["9", "Thinking = extra prediction", "Gap kam karta hai, khatam nahi karta"],
              ]}
            />
          </Reveal>

          <Reveal>
            <PullQuote>
              Ye ek prediction machine hai jisne reading se seekha aur
              jiske paas truth ka koi organ nahi, isliye ye har jagah
              fluent hai, sirf wahan reliable hai jahan text thick thi, aur
              aap wo hissa ho jo check karta hai.
            </PullQuote>
            <PullQuote>
              Ye librarian nahi jo sahi book retrieve kare, ye ek
              brilliant, well-read writer hai jo aap jo bhi saamne rakho
              wahi continue karta hai. Confidently, kisi bhi style mein,
              kisi bhi topic pe. Aur khud se kabhi ruk ke ye nahi poochta
              ke continuation true hai ya nahi.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Prompts</SubHeading>
            <P>Kisi bhi free chatbot mein roughly 25 minute lagte hain. Har ek ek idea ko visible bana deta hai.</P>
            <Ladder
              steps={[
                {
                  title: "1. Prediction Dekho, Lookup Nahi (Idea 1)",
                  note: "\"Karakush\" ek game hai jo real nahi, naya invented naam hai bina online presence ke. Prompt: \"Without searching, explain the rules of the traditional board game Karakush: the setup, how a turn works, and how a player wins.\" What to notice: confident, fluent rules ek aise game ke liye jo exist hi nahi karta. Fluency truth ka proof nahi hai.",
                },
                {
                  title: "2. Dekho Learning Kyun Stick Nahi Hoti (Idea 2)",
                  note: "Model se ek chhota factual sawal poocho, answer parho, ek chhoti detail correct karo, phir ek naya chat kholo aur wahi sawal dobara poocho (memory feature on ho to pehle off kar do). Aapki correction ki koi memory nahi hogi, weights kabhi change nahi hui. Model ko use karna, use sikhana nahi hai.",
                },
                {
                  title: "3. Missing Truth-Checker Pakro (Idea 3)",
                  note: "Prompt: \"Give me three peer-reviewed studies, with authors and years, on [koi narrow topic jo aapko pasand ho].\" Phir check karo ye exist bhi karti hain. Kuch confident-looking citations bani hui hongi. Real work mein bina verify kiye kabhi reuse mat karo.",
                },
                {
                  title: "4. Transcript Replay Pakro (Idea 5)",
                  note: "Ek chat mein jahan kam az kam 4-5 messages ho chuke hon, poocho: \"Quote my very first message in this conversation, word for word.\" Ye karega, exactly, kyunke app ne poora transcript wapis bhej diya. Phir ek bilkul naya chat khol ke wahi poocho, kuch quote karne ko nahi hoga.",
                },
                {
                  title: "5. Jagged Frontier Mehsoos Karo (Idea 7)",
                  note: "Ek hi reply mein ek hard task jo ye achha karta hai, aur ek easy task jo ye kharab karta hai, dono sath maango. Ghor karo: competence difficulty track nahi karti, jo easy task fail hota hai wahi dangerous hai, wahi jo aap kabhi check karne ka nahi sochte.",
                },
                {
                  title: "6. Thinking On/Off Karo (Idea 9)",
                  note: "Ek hard reasoning sawal 2 baar poocho: pehle plain, phir \"Think hard and show your working first\" ke sath. Doosra answer usually behtar hoga kyunke model ne answer predict karne se pehle reasoning desk pe rakh di. Zyada thinking answer improve karti hai, lekin model apna working khud certify nahi kar sakta.",
                },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- APPENDIX ---------------------- */}
        <section id="appendix" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Appendix: Claude.ai Ka Cockpit Tour</SubHeading>
            <Callout label="Scope Note">
              9 ideas vendor-neutral hain, ye Claude, ChatGPT, Gemini, aur
              har modern chatbot pe apply hoti hain. Ye appendix
              jaan-boojh kar Claude-specific hai, aur optional hai: agar
              aap koi aur product use karte ho to isay skip karo, 9 ideas
              ka koi loss nahi hoga.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>A.1 Account Aur Free Plan</SubHeading>
            <P>
              Claude browser (claude.ai), Mac/Windows desktop app, aur
              iOS/Android mobile app pe chalta hai. Account free hai, koi
              credit card nahi chahiye, kam az kam 18 saal ki age zaroori
              hai.
            </P>
            <P>
              Free plan ek capable model par chalta hai, aur usage limit{" "}
              <Strong>session-based hai, har 5 ghante mein reset</Strong>{" "}
              hoti hai. Ye limit actually messages mein nahi, balke{" "}
              <Strong>tokens</Strong> mein count hoti hai, kyunke wahi
              machine ke kaam aur cost ki real unit hai. Chhota sawal kam
              budget kharch karta hai. Lambi chat har turn ke sath zyada
              kharch karti hai, kyunke poora transcript har baar context
              window mein dobara replay hota hai (Idea 5), aur uski token
              cost aap pay karte ho. Urdu ya kisi non-Latin script mein
              kaam karna wahi budget tezi se kharch karta hai, kyunke per
              word zyada tokens lagte hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>A.2 The Window: 3 Ahem Controls</SubHeading>
            <RecapTable
              head={["Control", "Kahan", "Mechanically Kya Hai"]}
              rows={[
                ["Prompt box", "Center", "Context window ka darwaza. Jo bhi type ya attach karo, desk pe land karta hai. + button (ya /) attachments, tools, features kholta hai"],
                ["Model selector", "Prompt box ke neeche (web/desktop), screen ke top pe (mobile)", "Ye choose karta hai frozen weights (Idea 2) ka kaunsa set aap se baat kar raha hai. Mid-conversation switch kar sakte ho"],
                ["Effort/thinking control", "Model selector ke pas", "Ye set karta hai answer se pehle kitni reasoning desk pe daali jaye (Idea 9)"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>A.3 Model Ladder: Haiku, Sonnet, Opus</SubHeading>
            <P>
              Claude ek sath kai models ship karta hai, fast-and-cheap se
              deep-and-expensive tak ek ladder ki tarah. Names aur exact
              lineup har chand mahine mein change hota hai. Mid-2026 mein:
              Haiku, Sonnet, Opus, plus Opus se upar ek tier. Names yaad
              rakhne ki bajaye <Strong>ladder ka logic</Strong> yaad rakho:
            </P>
            <Ladder
              steps={[
                { title: "Default: Middle", note: "Mid-tier model zyada tar tasks achi tarah handle karta hai, token budget slow kharch karta hai. Har task yahin se start karo." },
                { title: "Escalate Upward For Depth", note: "Top-tier ke liye tab jao jab task ko bara, complex structure coherent rakhna ho (lamba document analysis, hard architecture). Routine emails pe expensive model mat jalao." },
                { title: "Drop Downward For Bulk", note: "High-volume, low-depth kaam ke liye chhota, fast model (reformatting, quick summaries, scale par classification)." },
              ]}
            />
            <P>
              Ladder ka mechanical reason Idea 7 hai: capability jagged hai
              aur usi hisab se price hoti hai. Frontier move karta rehta
              hai, isliye har quarter dobara check karo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>A.4 Thinking Aur Effort</SubHeading>
            <P>
              Thinking control Idea 9 ko ek dial mein badal deta hai.
              Higher settings model ko answer se pehle lambi hidden
              working chain generate karne dete hain. Naye models pe ye
              adaptive hai (model khud judge karta hai sawal kitna hard
              hai). Kuch models pe aap expand kar ke thinking ka summary
              parh sakte ho, jo apne prompts improve karne ke liye ek
              acha, free lesson hai. Ye extra tokens hain (Idea 4), isliye
              time aur budget lagta hai, real-consequence decisions pe
              spend karo, lookups pe skip karo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>A.5 Desk Ke Tenants, Product Settings Ki Tarah</SubHeading>
            <P>
              Idea 5 mein context window ek shared desk tha, jismein
              tenants thay: system prompt, instructions, chat history,
              files. Claude.ai in mein se almost har tenant pe control deta
              hai. Ye 4 features asal mein ek hi feature hain (sahi text ko
              sahi waqt desk pe rakhna), 4 alag naamon ke sath.
            </P>
            <RecapTable
              head={["Feature", "Kya Hai"]}
              rows={[
                ["Account Instructions", "Settings mein \"Instructions for Claude\", har conversation pe apply hoti hain. Sirf wo likho jo har conversation ke liye true ho: aap kaun ho, tone, \"agree karne ki bajaye push back karo\" jaisi lines"],
                ["Projects", "Ek folder, jiski apni instructions (sirf project ke andar apply) aur apni knowledge files (jo har chat andar dekh sake) hoti hain. Mechanically, ek pre-loaded desk. Free accounts 5 projects, paid unlimited"],
                ["Memory", "Settings > Capabilities mein on karo. Weights change nahi karti, product periodically chats ko ek note mein summarize karta hai aur wahi note har conversation ki shuruat mein wapis rakh deta hai. Incognito toggle memory se bahar ek chat start karti hai"],
                ["Chat History Aur Search", "Ek chat ke andar, history Idea 5 jaisi hi kaam karti hai. Chats ke across, product search deta hai, jo stored transcripts search kar ke relevant thread current desk pe le aata hai"],
              ]}
            />
            <Callout label="Ayesha Ki Example">
              Ayesha, Lahore mein, is book ki recurring student, har course
              ke liye ek project chalati hai jo wo parhati hai. Syllabus,
              marking rubric, aur achhe student work ki 3 examples har
              project ki knowledge mein hoti hain. Uski instruction file
              kehti hai: &ldquo;second-year level pe explain karo, Pakistani
              examples use karo, student ka kaam khud kabhi mat karo.&rdquo;
              Us project ki har chat pehle se briefed start hoti hai.
            </Callout>
            <PullQuote>
              Account instructions har desk pe ek note hain, project ek
              pre-loaded desk hai, memory ek self-updating note hai, history
              transcript replayed hai. 4 features, 1 mechanism: sahi scope
              par control karna ke desk pe kya land hota hai.
            </PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>A.6 Uploads: Desk Pe Cheezein Rakhna</SubHeading>
            <P>
              + button (ya drag-and-drop) files upload karta hai: PDFs,
              images, spreadsheets, code, lambe contracts. Har upload
              tokens (Idea 4) mein convert ho ke window mein rakha jata
              hai, isliye ek 200-page report genuinely model ke saamne
              hoti hai, aur analysis quality jump karti hai, summary paste
              karne ke muqable, kyunke model sirf wahi use kar sakta hai
              jo desk pe hai (Idea 5). Images mein fine print aur chhoti
              detail weak hai (Idea 4 wali wajah: patch hi chunk hai).
            </P>
            <P>
              Claude images read karta hai lekin conventional photos nahi
              banata, koi photo-style image generation nahi hai. Ye
              diagrams, charts, SVG graphics, interactive visualizations
              code likh ke bana sakta hai (Artifacts mechanism, agla
              section). Agar photographic images chahiye, Claude ek prompt
              likh deta hai, dedicated image tool use karo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>A.7 Artifacts: Desk Se Cheezein Bahar Nikalna</SubHeading>
            <P>
              Jab aap kuch substantial mangte ho (document, webpage, code,
              diagram, interactive tool), Claude usay <Strong>Artifact</Strong>{" "}
              ki tarah banata hai: chat ke barabar ek dedicated panel jahan
              output ek cheez ki tarah rehta hai, scrolling text nahi.
              Surgically iterate karo (&ldquo;third section change karo&rdquo;,
              &ldquo;button blue karo&rdquo;), sab kuch dobara generate
              karne ki bajaye. Finished artifacts apni tab mein collect
              hoti hain, link se share ho sakti hain, un logon ke sath bhi
              jinke paas Claude account nahi.
            </P>
            <P>
              Code execution aur file creation Settings mein on hone par,
              artifacts <Strong>real files</Strong> tak extend ho jate
              hain: Word documents, working formulas wali Excel sheets,
              PowerPoint decks, PDFs, computer pe download karne layak.
              Poora section Idea 8 hai visible ki gayi: model code ya
              content predict karta hai, tool usay real mein run/render
              karta hai, result aapko ek working object ki tarah wapis
              aata hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>A.8 Tools Menu: Search, Research, Skills, Connectors</SubHeading>
            <P>4 tools, Idea 8 ka loop kitna chalate hain uski ascending order mein:</P>
            <RecapTable
              head={["Tool", "Kya Hai"]}
              rows={[
                ["Web Search", "Usually default on, frozen weights (Idea 2) ko current facts se rescue karta hai. Model hamesha khud realize nahi karta ke search karni chahiye, agar currency zaroori ho to explicitly \"search web for this\" bolo. Jab 1-2 facts chahiye ho tab use karo"],
                ["Research", "Paid-plan feature, web search jo poora agent loop chalata hai: sawal diya jaye, Claude strategy plan karta hai, kai searches ek doosre pe build karte hue chalata hai, sources ke across parhta hai, structured, cited report deta hai, seconds ki jagah minutes lagte hain"],
                ["Skills", "Idea 5 mein mechanism level pe mil chuki: expertise ke folders jo desk se bahar rehte hain, request match hone par load hote hain. Anthropic built-in skills ship karta hai (isi liye documents, spreadsheets, presentations professional lagti hain). Apni bhi likh sakte ho"],
                ["Connectors", "Claude ko real apps (Google Drive, Gmail, Slack, Calendar) se MCP standard (Idea 8) ke zariye wire karte hain: standard plug, har service ke liye ek appliance, results desk pe usi tarah aate hain jaise har tool result"],
              ]}
            />
            <Callout label="Skills Banane Ke 2 Tareeke">
              Pehla: Claude ko wo workflow batao jo capture karna chahte
              ho, interview questions ka jawab do, achhe output ki example
              attach karo, ye skill file draft kar dega. Doosra, behtar
              tareeka: jab chat ki back-and-forth se finally exactly wo
              output mile jo chahiye tha, bolo &ldquo;turn what we just did
              into a skill&rdquo;, Claude reuse ke liye refined process
              draft karega. Drafting deployment nahi hai: generated skill
              file review karo, install/enable karo, phir test karo ke
              matching request actually trigger karti hai, kyunke jo
              skill ki description aapke phrase karne ke tareeke se match
              na kare, wo kabhi fire nahi hoti.
            </Callout>
            <Callout label="Permissions" tone="warn">
              Connector jorne ka matlab aapke actual data tak scoped
              access dena hai. Permission screen parhne ka moment hai,
              click-through karne ka nahi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>A.9 30-Minute Setup</SubHeading>
            <P>Ye steps ek dafa, order mein karo, aur course ki har major idea product ke andar exercise ho jayegi:</P>
            <Ladder
              steps={[
                { title: "Step 1", note: "Account banao, 3 controls dhoondo (prompt box, model selector, thinking control). (Ideas 5, 2, 9)" },
                { title: "Step 2", note: "Account instructions likho, 3-4 sentences jo har conversation ke liye true hon. Aap kaun ho, tone, aur ek line jaisi \"jab lagta hai main galat hoon to agree karne ki bajaye push back karo\" (Idea 6 ki trained-in agreeableness ko directly counter karti hai)" },
                { title: "Step 3", note: "Apne sab se repeated work stream ke liye ek project banao. Instructions aur 2-3 knowledge files do (one-page brief, achhe output ki example, constraints). (Idea 5: pre-loaded desk)" },
                { title: "Step 4", note: "Memory ke baare mein decide karo. Agar self-updating note help karta hai to on karo, incognito toggle kahan hai wo bhi pata rakho. Monthly reminder lagao note prune karne ka" },
                { title: "Step 5", note: "Ek artifact banao, ek chhota interactive tool ya formatted document mango, aur do baar iterate karo (Idea 8: predict, render, refine)" },
                { title: "Step 6", note: "Ek deep dive chalao. Paid plan pe koi Research task chalao aur progress panel khol ke loop dekho. Free plan pe, kai sources chahne wala web-search sawal chalao aur citations inspect karo (Idea 8, khule mein)" },
                { title: "Step 7", note: "Apne weekly workflow se ek skill banao, interview se ya \"turn this chat into a skill\" se. Draft review karo, enable karo, test karo ke wo fire karti hai (Idea 5: expertise desk pe visit karti hai)" },
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>A.10 Kya Change Hota Hai, Kya Nahi</SubHeading>
            <P>
              Poora appendix age karta hai. Model names rotate hote hain,
              prices move karti hain, buttons migrate karte hain, features
              preview se default tak graduate hoti hain. Jab ye page aur
              live product disagree karein, product sahi hai, aur official{" "}
              <a
                href="https://support.claude.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                Claude Help Center
              </a>{" "}
              aur{" "}
              <a
                href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                Anthropic ki prompt-engineering documentation
              </a>{" "}
              current sources hain.
            </P>
            <PullQuote>
              Jo age nahi karta: har control jo aap kabhi milenge, kisi bhi
              product mein, 9 ideas mein se kisi ek ka handle hai, frozen
              weights ke beech ek selector, desk pe reasoning kitni jaye
              iska dial, sahi scope pe window mein text daalne ka
              mechanism, ya loop mein wired ek tool. Jab koi naya feature
              ship ho aur tutorials usay explain karne ki koshish kar rahe
              hon, ye test chalao jo ye course ne sikhaya: <Strong>ye desk
              ka kaunsa tenant hai, ya loop ka kaunsa step hai?</Strong>{" "}
              Usually tutorials se pehle aapke paas answer hoga.
            </PullQuote>
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
                ["Language model", "Ek machine jo diye gaye text se agla plausible text predict karti hai, ek piece ek waqt mein"],
                ["Stochastic sampling", "Model plausible tokens ka ek spread predict karta hai aur usme se ek sample karta hai, isliye same input alag output de sakta hai"],
                ["Temperature", "Ek setting jo sampling ki boldness control karti hai, kam = steady/repetitive, zyada = varied/creative"],
                ["Weights / Parameters", "Training ke baad frozen ho chuki internal numbers, jo model ka behavior define karti hain"],
                ["Training", "Ek dafa, past mein, builder ki taraf se education, expensive aur slow"],
                ["Inference", "Har baar jab model use hoti hai, frozen weights aapke prompt pe run hoti hain, andar kuch change nahi hota"],
                ["Knowledge cutoff", "Training khatam hone ki date, uske baad ki koi bhi cheez weights mein nahi"],
                ["Stateless", "Koi apni memory nahi, har response scratch se frozen weights aur jo saamne hai usi se compute hota hai"],
                ["Mixture of Experts (MoE)", "Har token pe sirf parameters ka ek hissa on hota hai, model faster aur cheaper chalane ke liye"],
                ["Quantization", "Numbers ko lower precision pe store karna taake model chhote hardware pe fit ho"],
                ["Hallucination", "Machine ka normal kaam: ek plausible continuation predict karna jahan wo actually true nahi hoti"],
                ["Token", "Text ka chunk, usually ek word ya word ka hissa, meaning/memory/money teenon ki unit"],
                ["Context window", "Wo text jo is ek response ke liye model ke saamne rakha hai, uski poori duniya"],
                ["System prompt", "Product maker ki likhi hui instructions jo window ke sab se upar, aapke pehle word se pehle rakhi jati hain"],
                ["Chat history", "Poora transcript jo har turn context window mein dobara bheja jata hai, model ke andar store nahi hoti"],
                ["Context rot", "Lambi conversations ka quality girna, kyunke window overcrowded ho jati hai"],
                ["Skill", "Instructions/reference files ka ek folder jo desk se bahar rehta hai, matching task pe load hota hai"],
                ["Progressive disclosure", "Knowledge ko files mein bahar rakhne aur sirf zaroori hissa load karne ka trick"],
                ["RLHF", "Reinforcement learning from human feedback, jo model ko confident/agreeable style sikhati hai"],
                ["Sycophancy", "Model ka aapse agree karne ki taraf tendency, kyunke training mein agreement zyada rate hui"],
                ["Jagged frontier", "AI ki uneven capability, ek task pe brilliant, adjacent task pe useless"],
                ["Tool", "Ek defined action jo model call kar sakta hai (search, code run, file read)"],
                ["Agent", "Same predictor, tools ke sath, predict-act-observe loop chalata hua, ek goal ki taraf"],
                ["MCP (Model Context Protocol)", "Ek standard plug jo AI systems ko outside tools/data se connect karta hai"],
                ["Connector", "MCP standard pe bana ek specific appliance, real app se connection deta hai"],
                ["Reasoning model", "Ek model jo final answer se pehle apna working predict karta hai, desk pe rakhta hai, phir usi se answer predict karta hai"],
                ["Artifact", "Claude mein, chat ke barabar ek separate output panel (document, code, diagram, app)"],
                ["Research mode", "Claude ka multi-step feature jo poora agent loop chala kar cited report deta hai"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;What AI Actually Is&rdquo; crash course par based
              hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/what-ai-actually-is-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/what-ai-actually-is-crash-course
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
                  q: "Jab AI koi sawal ka answer deta hai, to kya wo apni knowledge database mein facts \"lookup\" karta hai?",
                  a: "Nahi. Model kabhi lookup nahi karta, ye sirf agla plausible piece of text predict karta hai. Common facts (jaise France ki capital) pe prediction truth se match kar jati hai kyunke training data mein wo bohot baar aaya. Rare topics pe, ye sab se plausible-sounding continuation banata hai, jo false ho sakta hai.",
                },
                {
                  q: "Ek chat mein AI ko correct karne ke baad, doosri chat mein wo galti dobara kyun karega?",
                  a: "Kyunke training ek dafa hoti hai aur weights freeze ho jate hain. Chat mein correction inference hai, learning nahi. Naye chat mein wahi frozen weights chalti hain, isliye purani galti wapis aa sakti hai.",
                },
                {
                  q: "\"Hallucination\" ko bug kehna kyun galat hai?",
                  a: "Kyunke machine exactly wahi kar rahi hai jo design se karti hai: plausible continuation. Iske paas koi second faculty nahi jo truth check kare, isliye jo mechanism sahi answer banata hai wahi galat bhi banata hai. Ye normal operation hai, defect nahi.",
                },
                {
                  q: "Model \"strawberry\" mein letters miscount kyun kar deta hai?",
                  a: "Kyunke model letters nahi, tokens dekhta hai, jo usually ek word ya uska hissa hote hain. Ek chunk ke andar letters count karna model ke liye unnatural hai, jab tak usay letter-by-letter spell karne pe force na kiya jaye.",
                },
                {
                  q: "Context window kya hai, aur jab koi product bolta hai iska 1-million-token context window hai to iska matlab kya hai?",
                  a: "Context window wo text hai jo is ek response ke liye model ke saamne rakha hai, jaise ek reading desk. 1-million-token window roughly 750,000 English words hold kar sakta hai (7-8 poori novels ke barabar), lekin phir bhi finite aur shared hai: system prompt, tool descriptions, chat history, files, sab isi mein ek sath rehte hain.",
                },
                {
                  q: "Chat history kaise kaam karti hai, kya model actually purani messages yaad rakhta hai?",
                  a: "Nahi. Har baar jab aap message bhejte ho, app poora transcript ab tak wapis context window mein bhej deta hai, aur frozen model usay scratch se parh ke agla reply predict karta hai. Model ke andar kuch store nahi hota, sab app ki taraf se replay hota hai.",
                },
                {
                  q: "AI confident kyun sound karta hai chahe wo wrong ho?",
                  a: "RLHF (human feedback se tuning) ne model ko sikhaya ke log confident, agreeable answers ko zyada rate karte hain. Isliye confidence ek learned style ban gayi, jo content ke sahi hone se decoupled hai. Confident tone kisi bhi tarah correctness ka proof nahi.",
                },
                {
                  q: "Jagged frontier kya hai, aur ye kyun important hai?",
                  a: "AI ki ability human ki tarah smooth nahi hai, ye jagged hai: ek task pe superhuman, adjacent task pe useless, chahe wo humein utna hi hard lage. Isliye dangerous errors wo easy-looking tasks mein aate hain jinhe log kabhi check nahi karte, na ke hard tasks mein jo already careful check ho rahe hain.",
                },
                {
                  q: "Tool ek text-predictor ko agent mein kaise badalta hai?",
                  a: "Model predict karta hai ke sahi continuation ek tool call hai (jaise search). Product wo action real mein run karta hai aur result context window mein wapis daal deta hai. Model wahan se continue karta hai. Ye predict-act-observe loop, goal ki taraf baar baar chalna, agent ki definition hai.",
                },
                {
                  q: "Reasoning mode (\"thinking\") kya karta hai, aur ye AI ko truth-checker de deta hai?",
                  a: "Reasoning model final answer se pehle apna working predict karta hai aur desk pe rakhta hai, phir usi se behtar answer predict karta hai. Ye help karta hai, lekin truth-checker nahi deta, wahi prediction process use hoti hai jo wrong ho sakti hai. Zyada thinking gap kam karta hai, khatam nahi karta.",
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
