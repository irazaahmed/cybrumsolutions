import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  FileSearch,
  FileText,
  ListChecks,
  MessageSquare,
  Mic,
  Paperclip,
  Search,
  Settings,
  Video,
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

const chapter = chapters.find((c) => c.slug === "ai-prompting-2026")!;
const prevChapter = getPrevLiveChapter("ai-prompting-2026");
const nextChapter = getNextLiveChapter("ai-prompting-2026");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "13 concepts jo AI ke sath achi tarah kaam karna sikhate hain, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/ai-prompting-2026" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/ai-prompting-2026`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Ye Course Kya Sikhata Hai", level: 2 },
  { id: "part1", text: "Part 1 · AI Kaise Jaanta Hai", level: 2 },
  { id: "part2", text: "Part 2 · AI Se Achi Baat Karna", level: 2 },
  { id: "part3", text: "Part 3 · Text Se Aage", level: 2 },
  { id: "part4", text: "Part 4 · Safe Kaam, Sahi Tool", level: 2 },
  { id: "recap", text: "Recap: 13 Concepts", level: 2 },
  { id: "practice", text: "Practice: 12 Prompts", level: 2 },
  { id: "projects", text: "4 Projects", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function RetrievalModesDiagram() {
  const modes = [
    { icon: Brain, t: "Pretrained", d: "Sirf training data se, sabse fast, stable facts/definitions ke liye achha, current events pe kamzor" },
    { icon: Search, t: "Web Search", d: "Recent pages scan karta hai, medium speed, current info ke liye achha, kabhi outdated source cite kar deta hai" },
    { icon: FileSearch, t: "Deep Research", d: "Minutes lagate hain, kai sources ke across, structured report deta hai, simple sawal ke liye overkill" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {modes.map(({ icon: Icon, t, d }) => (
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
        Aapki prompt ki wording decide karti hai kaunsa mode fire hota hai
      </figcaption>
    </figure>
  );
}

function ContextStackDiagram() {
  const layers = [
    { icon: Paperclip, t: "Uploaded Files" },
    { icon: MessageSquare, t: "Aapka Current Prompt" },
    { icon: FileText, t: "Chat History (is conversation ki)" },
    { icon: Wrench, t: "Tool Descriptions" },
    { icon: Brain, t: "Memory Note (aapka profile)" },
    { icon: Settings, t: "System Prompt (invisible)" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-1.5 rounded-2xl border-2 border-accent/30 bg-accent/5 p-3">
        {layers.map(({ icon: Icon, t }, i) => (
          <div
            key={t}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-card/70 px-3 py-2"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/15 text-accent-bright">
              <Icon size={12} />
            </span>
            <span className="text-xs font-medium text-foreground">{t}</span>
            {i === layers.length - 1 && (
              <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[0.6rem] font-bold text-accent-bright">
                foundation
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        6 layers, ek doosre ke upar. Model sirf yehi dekh sakta hai,
        roughly 750,000 words tak (4-5 Harry Potter books)
      </figcaption>
    </figure>
  );
}

function SycophancyDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-amber-500">
            Bait (Conclusion Preset)
          </p>
          <p className="text-sm text-muted">
            &ldquo;Don&apos;t you think X?&rdquo; / &ldquo;Find evidence that
            X works&rdquo; / &ldquo;Confirm this is correct&rdquo;
          </p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
            Neutral (Inquiry Open)
          </p>
          <p className="text-sm text-muted">
            &ldquo;To what extent is X true?&rdquo; / &ldquo;Evaluate X, list
            arguments for aur against&rdquo; / &ldquo;Find any bug&rdquo;
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        find, defend, confirm, prove → evaluate, compare, critique, find any
      </figcaption>
    </figure>
  );
}

function BrainstormLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Sab context upfront do",
          "3-5 options mango, expand mat karwao",
          "Explicit feedback do: kya reject kiya, kyun",
          "Feedback se naye 3-5 options mango",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        1-2 options genuinely pasand aane tak iterate karo, phir hi full
        detail mango
      </figcaption>
    </figure>
  );
}

function CostLadderDiagram() {
  const items = [
    { icon: MessageSquare, t: "Text", d: "Seconds, fraction of a cent" },
    { icon: Mic, t: "Speech", d: "Seconds, kuch cents per minute" },
    { icon: Wrench, t: "Images", d: "Tens of seconds, kuch cents, no early-stop" },
    { icon: Video, t: "Video", d: "Minutes, cents to dollars, iterate karna painful" },
    { icon: FileSearch, t: "Deep Research", d: "Minutes, kuch cents, dozens sources synthesize karta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2 sm:grid-cols-5">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-3 text-center">
            <span className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={14} />
            </span>
            <p className="text-xs font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-[0.65rem] leading-tight text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Text pe ek din mein 50 baar iterate kar sakte ho, video pe nahi.
        Isliye video/image se pehle prompt mein zyada invest karo
      </figcaption>
    </figure>
  );
}

function MultiModelLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Best model se full context ke sath first draft banwao",
          "Usi se khud ko 1-10 grade karwao, named criteria pe",
          "Apne suggestions implement karwao, jab tak grade plateau na ho",
          "Ek doosri family ke model ko wahi rubric do",
          "Dono critiques wapis pehle model ko do, wo adjudicate kare",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Alag family ke models ke alag blind spots hain, unki disagreement
        hi wo signal hai jo ek model akela nahi de sakta
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
  url: `${site.url}/anthropic-exam-prep/ai-prompting-2026`,
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

export default function AiPrompting2026ChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke Prompting aur
              Output Evaluation domains ke liye foundation hai
            </p>
            <CoreIdea>
              Zyada tar log AI ko Google search ki tarah use karte hain:
              ek chhota sawal type karte hain, answer skim karte hain,
              aage badh jate hain. Power users alag karte hain: files,
              context, constraints ke sath brief karte hain, jaise ek
              smart lekin naye colleague ko. Farq cleverness ka nahi, kuch
              habits ka hai jo koi bhi ek dopeher mein seekh sakta hai. Ye
              chapter wahi dopeher hai: 13 concepts, 4 parts mein.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Fact Jo Sab Kuch Ke Neeche Hai</SubHeading>
            <P>
              Model <Strong>stateless</Strong> hai — iski apni koi memory
              nahi turns ke beech, aur har baar sirf usi se answer deta
              hai jo is waqt uske context window mein hai. Isi liye ye
              course ek insight pe based hai: is page ki almost har
              &ldquo;advanced technique&rdquo; do moves mein se ek hai —{" "}
              <Strong>sahi context andar dalna</Strong>, ya{" "}
              <Strong>ghalat context bahar rakhna</Strong>. Model sirf
              wahi dekhta hai jo iske context window mein hai. Aapka
              kaam hai control karna ke ismein kya jata hai.
            </P>
            <Callout label="Note">
              Examples ChatGPT, Claude, aur Gemini ka reference lete hain
              kyunki zyada tar readers ke paas inmein se koi ek hai.
              Skills kisi bhi modern chat AI par transfer hoti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pichle 2 Saal Mein Kya Badla</SubHeading>
            <P>
              Agar aapne 2022-23 mein ChatGPT try kiya tha aur usay ek
              clever toy samjha tha, to wo tool aur ye tool alag hain:
            </P>
            <CheckList
              items={[
                "Context windows roughly 1000x bar gaye, ek 2022 model kuch hazar words hold karta tha, 2026 model hundreds of thousands, kabhi million tak",
                "Reasoning real ban gayi, \"think step by step\" ki jagah ab explicit thinking modes hain jo seconds se minutes tak chalti hain",
                "Web search ab built-in tool hai, model khud decide karta hai kab search karna hai",
                "Code execution bhi built-in tool ban gaya, model chhota program likhta hai, run karta hai, result use karta hai",
                "Multimodal ab sidebar nahi rahi, photo, PDF, spreadsheet, voice memo, sab ek stream mein handle hote hain",
                "Tools ab aapko yaad rakhte hain, teenon apna short profile likhte hain aur har naye chat mein load karte hain",
                "Desktop apps aayi hain (Cowork, OpenWork), jo files find kar sakti hain, emails draft kar sakti hain, permission ke sath",
                "Developers ke liye command-line agents aayi hain (Claude Code, OpenCode), jo poore codebase ke across kaam karte hain",
              ]}
            />
            <PullQuote>
              Agar aapka mental model in tools ka 18 mahine bhi purana
              hai, to aap inhe shayad 20% capability pe use kar rahe ho
              jo ye aaj de sakte hain.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · AI Kaise Jaanta Hai</PartBanner>
            <SubHeading>1. Novice Vs Power User</SubHeading>
            <P>Sawal same rehta hai, briefing nahi. Kuch real contrasts:</P>
            <RecapTable
              head={["Scenario", "Novice", "Power User"]}
              rows={[
                ["Car khareedna", "\"kaunsi car best hai?\"", "Spec sheets, dealer quotes, insurance plans upload kar ke poochta hai \"trade-offs kya hain? Sab parho aur think hard\""],
                ["Self-review likhna", "\"mere boss ke liye self-review likh do\"", "Project tracker ka screenshot, recent docs, ek voice memo upload kar ke draft mangta hai"],
                ["Business idea critique", "\"mera business idea great hai, critique karo\" (sycophancy bait)", "\"Objectively analyze karo. Rubric: kya koi real problem hai, koi market hai, koi competitive advantage hai?\" (AI ne 8/100 score diya)"],
                ["Blog post likhna", "\"BlackBerry pe blog post likho\" → AI slop", "Pehle outline, phir outline critique, phir bullets, phir prose"],
              ]}
            />
            <Callout label="AI Slop">
              &ldquo;Slop&rdquo; wo term hai jo AI output ke liye use
              hota hai jo surface pe fluent lekin andar se khali ho —
              grammatically clean, halka Wikipedia jaisa, phrases se
              bhara jaise &ldquo;in today&apos;s fast-paced world&rdquo;,
              aur ek ghante baad koi reader ko yaad nahi rehta. Yehi
              default hota hai jab aap koi context ya constraints nahi
              dete.
            </Callout>
            <PullQuote>
              AI ek bohot smart fresh college grad jaisa hai. Highly
              motivated. Aapke baare mein abhi zyada nahi jaanta. Usay
              waise hi brief karo. Kya ek naya colleague ye kaam achi
              tarah karne ke liye kaafi information rakhta? Agar nahi,
              to zyada do.
            </PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>2. Pretrained Knowledge</SubHeading>
            <P>
              AI ne duniya experience kar ke nahi seekha. Iska koi body,
              senses, ya time nahi tha duniya mein ghoomne ka. Ye
              massive internet text parh kar seekha: Reddit, Quora,
              Wikipedia, books, news, research papers, blogs, forums.
            </P>
            <P>
              Training data mein frequency roughly answer ki reliability
              ke barabar hai:
            </P>
            <CheckList
              items={[
                "Strong: cooking, celebrity gossip, common medical advice, top movies, popular programming languages",
                "Sparse: quasars, Cantonese, regional history, niche professional knowledge",
                "Absent: aapki company ki secret data, aapka private calendar, knowledge cutoff ke baad ki koi bhi cheez",
              ]}
            />
            <P>2 practical nateeje:</P>
            <CheckList
              items={[
                "Typos fix karne mein waqt zaya mat karo, AI messy text handle kar leta hai",
                "Absorbed errors se hoshiyar raho, internet ke misconceptions bhi model mein aa gaye, kisi confidently wrong forum post ki tarah, isliye zaroori claims primary source se check karo",
              ]}
            />
            <RecapTable
              head={["Question Type", "Training Mein Kitna", "Trust Level"]}
              rows={[
                ["\"Roux kaise banate hain?\"", "Cooking internet ka sabse discussed topic hai", "High"],
                ["\"Top-1000 movie ka plot\"", "Hazaron baar review hui", "High"],
                ["\"Obscure village ki history\"", "Shayad ek hi Wikipedia paragraph, ya kuch nahi", "Low, primary source se verify karo"],
                ["\"Recent regulatory change\"", "Almost certainly knowledge cutoff ke baad", "Web search ke bina kuch trust mat karo"],
                ["\"Hamari company ne pichle quarter kya decide kiya?\"", "Training data mein bilkul nahi hai", "Kuch trust mat karo, model guess kar raha hai"],
              ]}
            />
            <Callout label="Real Example" tone="warn">
              Ek reader ne AI se apni grandmother ke gaon ki ek regional
              folk game ke rules poochhe. AI ne confidently 3 paragraphs
              de diye. Grandmother ne bataya rules almost poore galat
              thay — AI ne doosri regions ki similar games ki
              descriptions blend kar di thi, kyunki ye specific game
              internet pe barely thi. AI ne jhoot nahi bola, sparse data
              se generalize kar diya. Reader ki ghalti poochhna nahi,
              confidence ko accuracy samajh lena thi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3. 3 Retrieval Modes: Pretrained, Web Search, Deep Research</SubHeading>
            <P>
              Jab aap koi sawal poochte ho, modern AI chupke se decide
              karta hai kaise answer dena hai: sirf pretrained knowledge
              se, ya web search fire kar ke chand pages parh kar, ya
              deep research chala kar (kai minute, dozens sources,
              structured report).
            </P>
            <RetrievalModesDiagram />
            <RecapTable
              head={["Phrasing Pattern", "Kya Trigger Hota Hai"]}
              rows={[
                ["\"What is X\" / \"Summarize Y\"", "Sirf Pretrained"],
                ["\"What's the latest on X\" / \"Today\" / \"This week\"", "Web Search"],
                ["\"Research X thoroughly\", \"citations ke sath report do\"", "Deep Research (jahan available ho)"],
                ["File attach karna", "Files ke liye pretrained rehta hai, current info ke liye web bhi search ho sakta hai"],
              ]}
            />
            <Callout label="Web Search Kaise Kaam Karti Hai (Aur Kabhi Kyun Galat Padh Leti Hai)" tone="warn">
              Ek search-and-retrieval layer searches chalati hai, results
              scan karti hai, relevant pages nikalti hai, aur har ek ko
              ek short passage mein compress karti hai, aksar ek alag,
              chhote model se. Aapse baat karne wala model asal page
              nahi, uska sikuda hua version parhta hai — isi liye kabhi
              kabhi misrepresent kar deta hai, information ek
              translation layer se guzar kar aati hai.
            </Callout>
            <P>
              <Strong>Fix:</Strong> AI ko batao kaunse sources use karne
              hain (&ldquo;WHO, FDA, peer-reviewed studies use karo,
              forums nahi&rdquo;), aur quote maango (&ldquo;har claim ke
              liye, exact sentence quote karo jo usay support karta
              hai&rdquo;).
            </P>
            <RecapTable
              head={["Task", "Google Behtar", "AI Behtar"]}
              rows={[
                ["IRS ka official form 1040 page dhoondna", "Haan, specific known site chahiye", "Nahi"],
                ["3 diabetes medications compare karna, recent evidence ke sath", "Slow, 8 tabs parhne padenge", "Fast, AI ek jagah synthesize karta hai"],
                ["2018 ThinkPad ka replacement charger khareedna", "Haan, product link chahiye", "Nahi"],
                ["4-din Lisbon trip plan karna, 6-saal ke bache ke sath", "Slow, blogs juggle karne padenge", "Fast, AI constraints integrate karta hai"],
              ]}
            />
            <PullQuote>
              Agar sawal &ldquo;X kahan hai&rdquo; hai, Google use karo.
              Agar sawal &ldquo;ye sab dekh kar mujhe kya sochna
              chahiye&rdquo; hai, AI use karo.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · AI Se Achi Baat Karna</PartBanner>
            <SubHeading>4. Context Hi Poora Game Hai</SubHeading>
            <P>
              Insaan active working memory mein sirf 4-7 cheezein hold
              kar sakta hai. Modern AI models ek waqt mein hundreds of
              thousands words hold kar sakti hain, kabhi million tak —
              roughly 750,000 words matlab 4-5 Harry Potter books ya kai
              din ki continuous speech. Model ye sab parh sakta hai
              answer dene se pehle, <Strong>lekin sirf wahi jo aap usay
              do.</Strong>
            </P>
            <ContextStackDiagram />
            <P>
              Jab aap fresh chat khol kar pehla message type karte ho,
              model zero se shuru nahi hota. Company ne pehle hi ek
              system prompt desk pe rakhi hoti hai, jaise ek restaurant
              owner ek naye waiter ko customer aane se pehle brief karta
              hai: &ldquo;friendly raho, daily special recommend karo,
              allergen sawal pe hamesha kitchen se check karo, guess mat
              karo.&rdquo; Waiter har table pe wahi instructions follow
              karta hai, aap wo briefing kabhi nahi sunte. Isi liye
              Claude, ChatGPT, aur Gemini same sawal pe alag tone dete
              hain — personality model mein nahi, company ki briefing
              mein baked hai.
            </P>
            <RecapTable
              head={["Tool", "Setting Ka Naam", "Kahan"]}
              rows={[
                ["Claude", "Personal preferences", "Settings &gt; General &gt; \"Instructions for Claude\""],
                ["ChatGPT", "Custom instructions", "Settings &gt; Personalization"],
                ["Gemini", "Personalization settings", "Personalization settings, toggle on karo phir Add"],
              ]}
            />
            <Callout label="Apni Layer Chhoti Rakho, Aur Prune Karo" tone="warn">
              Ye layer har chat se pehle load hoti hai, isliye lines add
              karte rehna tempting hota hai. Ek saal baad 20 lines ho
              jati hain, jinme se kuch chupke se ek doosre se contradict
              karti hain. Anthropic ne khud apne products mein 2026 mein
              zyada tar standing instructions delete kar dein, quality
              mein koi loss nahi hua. Har kuch mahine poocho: agar ye
              line delete karoon, kya AI waqai kuch galat karega? Agar
              nahi, delete karo.
            </Callout>
            <P>Checklist kisi bhi non-trivial prompt se pehle:</P>
            <RecapTable
              head={["Sawal", "Agar Haan"]}
              rows={[
                ["Koi document hai jis se answer consistent hona chahiye?", "Attach karo"],
                ["Koi constraint hai jo AI infer nahi kar sakta (budget, time, team)?", "State karo"],
                ["Koi prior context hai (pehla decision, existing process)?", "Ek paragraph mein summarize karo"],
                ["Koi output format chahiye (table, email, bullets)?", "Naam do"],
                ["Koi audience hai (boss, bacha, ajnabi)?", "Naam do"],
              ]}
            />
            <P>
              5 lines ki sahi context, 5 paragraphs ki cleverness se
              behtar hai.
            </P>
            <SubHeading>6th Layer: AI Ab Aapke Baare Mein Notes Likhta Hai</SubHeading>
            <P>
              Teenon tools ab quietly aapka short profile likhte hain aur
              har naye chat mein load karte hain. Ye contradiction nahi
              hai: model still stateless hai, memory ek note hai jo tool
              aapke baare mein rakhta hai aur desk pe rakh deta hai — ye
              stack ka 6th layer hai, exception nahi.
            </P>
            <RecapTable
              head={["Tool", "Naam", "Control Kahan", "Clean-Slate Mode"]}
              rows={[
                ["Claude", "Memory", "Settings &gt; Memory", "Incognito chat"],
                ["ChatGPT", "Memory: saved + past-chat reference", "Settings &gt; Personalization &gt; Memory", "Temporary Chat"],
                ["Gemini", "Personal context", "Settings &gt; Personal context", "Temporary Chat"],
              ]}
            />
            <Callout label="Ek Warning" tone="warn">
              Agar aap doctor, lawyer, accountant, ya teacher ho, memory
              note ek jagah hai jahan client/student details chupke se
              jama ho sakti hain aur mahinon baad kisi unrelated chat
              mein resurface ho sakti hain. Identifiable details memory
              se bahar rakho.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Context Rot</SubHeading>
            <P>
              Modern context windows bade hain, infinite nahi, aur
              recall inke andar degrade hota hai. Sabse badi ghalti: ek
              hi lambi conversation kai unrelated topics ke across
              chalate rehna.
            </P>
            <CheckList
              items={[
                "AI pichle unrelated hisson ko reference karne lagta hai",
                "Answers lambe aur vague ho jate hain, zyada hedging ke sath",
                "5 turns pehle bataya constraint contradict ho jata hai",
                "Baar baar apologize karta hai bina progress ke",
              ]}
            />
            <P>
              Jab ye hota hai, tool chupke se purani turns ko compact kar
              deta hai, summary mein badal deta hai jagah banane ke
              liye. Narrative bach jata hai, specifics nahi.{" "}
              <Strong>Rule of thumb: jab topic badle, naya conversation
              shuru karo.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Projects: Context Ek Baar Front-Load Karo</SubHeading>
            <P>
              Jab aap khud ko wahi files ya wahi audience description do
              ya zyada chats mein paste karte huye paayein, ye signal
              hai: context ko ek <Strong>project</Strong> mein daalo,
              prompt mein nahi.
            </P>
            <RecapTable
              head={["Tool", "Naam", "Emphasis"]}
              rows={[
                ["Claude", "Projects", "Instructions aur behavior pe, voice aur role consistent rehta hai"],
                ["ChatGPT", "Projects", "Instructions aur behavior pe, similar Claude ke"],
                ["Gemini", "Notebooks (NotebookLM ke sath sync)", "Sources par, PDFs/URLs/videos citations ke sath, workspace dono taraf grow karti hai"],
              ]}
            />
            <P>
              Claude free plan 5 projects deta hai (unlimited files har
              ek mein), ChatGPT free plan 5 files per project deta hai,
              Google Notebooks/NotebookLM dono free hain. Apna project
              structure usi cap ke around plan karo jo pehle bite karega.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5. Reasoning, Ya &ldquo;Think Hard&rdquo;</SubHeading>
            <P>
              2023 tak advice thi &ldquo;think step by step&rdquo;
              likhna. Ab wo mostly purani ho chuki hai. Modern models
              mein built-in reasoning modes hain jo aap directly invoke
              kar sakte ho: plain language mein &ldquo;think hard&rdquo;
              bol kar, interface ke thinking toggle se, ya kuch products
              khud decide kar lete hain.
            </P>
            <Callout label="Number Jo Yaad Rakhne Layak Hai">
              2025 METR study ne track kiya ke leading model kitna lamba
              task reliably complete kar sakta hai. Mid-2024 mein
              taqreeban 7 minute (human ke liye), early-2025 mein
              roughly 1 hour, aur ye length roughly har 7 mahine mein
              double ho rahi hai.
            </Callout>
            <PromptBox>{`I'm choosing between two cars. Attached: spec sheets for both,
my insurance quote for each, and a spreadsheet of my driving
patterns over the last six months.

Read everything. Think hard. Then tell me:
1. The three trade-offs that actually matter for my driving pattern.
2. Which car you'd choose and why.
3. Under what conditions your recommendation flips.`}</PromptBox>
            <P>
              Ye prompt 3 kaam karta hai: relevant context load karta
              hai, explicitly thinking invoke karta hai, aur structured
              output mangta hai, prose ki deewar nahi.
            </P>
            <Callout label="Kab Thinking Mode Use Nahi Karni" tone="warn">
              Quick lookups, ek paragraph ki summaries, casual
              brainstorm. Thinking mode slower hai aur zyada usage
              budget leti hai. Save karo un sawalon ke liye jinhe aap ek
              thoughtful colleague ko de kar 2 din wait karte.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6. Sycophancy Aur Isay Neutralize Karna</SubHeading>
            <P>
              AI models human feedback pe train hoti hain, khaas kar
              kaunse responses ko thumbs up mila. Millions users ke
              across, agree karna disagree karne se zyada thumbs up leta
              hai. Result: models aapko wo batane ki taraf biased hain
              jo aap sunna chahte ho.
            </P>
            <Callout label="Real Data" tone="warn">
              November 2025 ki Washington Post analysis (47,000 ChatGPT
              conversations) ne paya ke model &ldquo;yes/correct&rdquo;
              se start karta hai &ldquo;no/wrong&rdquo; se roughly 10
              guna zyada baar.
            </Callout>
            <SycophancyDiagram />
            <RecapTable
              head={["Aap Jo Likhte Ho", "Kya Signal Deta Hai", "Neutral Rewrite"]}
              rows={[
                ["\"Find evidence that this strategy will work.\"", "Conclusion fixed hai, AI support fill karega", "\"Evaluate this strategy. List strongest arguments for and against.\""],
                ["\"Why is approach A better than approach B?\"", "A jeet gaya, AI reasons list karega", "\"Compare A and B. Score each on cost, risk, and time.\""],
                ["\"Confirm that this code is correct.\"", "AI confirm kar dega", "\"Find any bug, edge case, or unstated assumption.\""],
              ]}
            />
            <Callout label="Objective-Rubric Pattern">
              Vague evaluation (&ldquo;story ko 100 mein se score
              karo&rdquo;) ki jagah, specific criteria do, har ek ko
              alag fixed scale pe score karwao (1-10 clarity, 1-10
              engagement, waghera, ek sentence justification ke sath).
              Number vague praise se zyada honest hota hai, kyunki commit
              karna pichli baat se zyada mushkil hai.
            </Callout>
            <PromptBox>{`Grade each criterion out of 10, with a one-sentence justification.
Then tell me how to take each one to the next level, including the
ones that already scored high. If something is at 9, tell me how
to get to 9.5. There is always a next level.`}</PromptBox>
          </Reveal>

          <Reveal>
            <SubHeading>7. Brainstorm-Iterate Loop</SubHeading>
            <P>
              Ye poore page ka sabse high-leverage habit hai. Baaki sab
              skip kar dein, ye mat karein. AI training mein zyada tar
              internet <Strong>common</Strong> ideas thi, creative
              nahi. Isi liye average creative sawal pe AI ka answer bhi
              average hota hai.
            </P>
            <BrainstormLoopDiagram />
            <P>Debt payoff ki worked example:</P>
            <PromptBox>{`I have $8,000 in credit card debt at 19% APR, $4,000 in student
loans at 5%, and $1,200 in a retail card at 24%. I have $700/month
free after expenses. Risk tolerance: low. I sleep badly when I
see big balances.

Give me 5 different repayment strategies, each with a one-line
rationale. Don't expand any of them yet.`}</PromptBox>
            <P>Feedback round:</P>
            <PromptBox>{`Reject option 2 (avalanche by interest rate alone): I want
psychological wins early. Reject option 4: I won't open new
accounts. I like option 1 but I'd want to fold the $450 lump
sum in. Give me 5 new options.`}</PromptBox>
            <Callout label="2 Tareeqe Iterate Karne Ke">
              <Strong>Grading:</Strong> ek score maango, apne suggestions
              implement karwao. <Strong>Diagnosis:</Strong> ek weak first
              result ke liye, output parh kar batao kaunsa hissa request
              se fail hua (audience ignore hui, length constraint toota,
              tone drift hui), sirf wahi hissa change karo. Score batata
              hai kitna door ho, diagnosis batata hai model ko exactly
              kya move karna hai.
            </Callout>
            <P>Writing ke liye isi loop ka apna naam hai: outline before drafting.</P>
            <Ladder
              steps={[
                { title: "Iteration 1", note: "3 outline options mango" },
                { title: "Iteration 2", note: "Ek chuno, critique aur grade karwao out of 10" },
                { title: "Iteration 3", note: "Critique se outline revise karo, phir har heading ko bullets mein expand karwao" },
                { title: "Iteration 4-5", note: "Bullets critique/grade karo, phir hi full prose draft mango" },
              ]}
            />
            <RecapTable
              head={["Ask Type", "Aap Chahte Ho", "Tighten Karo", "Loosen Karo"]}
              rows={[
                ["Brainstorming", "Different directions", "Problem, audience, kya avoid karna hai", "Structure, tone, format"],
                ["Research", "Landscape mapped", "Scope, sources, evidence types", "Answer (kabhi expected finding mat batao)"],
                ["Drafting", "Ek cheez execute", "Sab kuch: voice, length, structure, facts", "Almost kuch nahi"],
                ["Analysis", "Data kya kehta hai", "Data, definitions, exact sawal", "Conclusion (kabhi specify mat karo)"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Text Se Aage</PartBanner>
            <SubHeading>8. Multimodal: Images, Audio, Aur Aage Kya Hai</SubHeading>
            <P>
              Modern AI images aur audio dono directions mein handle
              karta hai: aapki uploaded images parh sakta hai, recordings
              sun sakta hai, text se naye images bana sakta hai, aur
              spoken audio produce kar sakta hai.
            </P>
            <RecapTable
              head={["Image Input Strong", "Image Input Weak"]}
              rows={[
                ["Overall scene aur composition, whiteboard diagrams, handwritten text", "Fine details, chhote objects count karna, edge ki chhoti print"],
              ]}
            />
            <Callout label="Real Test">
              Ek teacher ne whiteboard ki photo li jahan uska sar
              &ldquo;convolutional&rdquo; word ko block kar raha tha. AI
              ne baaki diagram se missing word sahi infer kar liya. AI
              gist se infer karne mein achha hai, zoom karne mein nahi.
            </Callout>
            <P>Image generation ek diffusion model use karti hai (noise ko step-by-step remove karna, ek grid se), isi liye ise beech mein interrupt nahi kiya ja sakta jaise text ko.</P>
            <RecapTable
              head={["Failure Mode", "Kya Dikhta Hai", "Fix"]}
              rows={[
                ["Garbled text on signs", "\"HAPRY BIRTDAY\" jaisa kuch", "Text ko quotes mein specify karo, 3 variants banwao"],
                ["Inconsistent characters", "Comic ke panels mein hair color badal jata hai", "Character-consistency support wale models use karo"],
                ["Hand/finger errors", "6 fingers, fused hands", "Hands out-of-frame ya pockets mein describe karo"],
                ["Wrong aspect ratio", "Model square default karta hai", "Hamesha specify karo: \"1024x768 landscape\""],
              ]}
            />
            <Callout label="Power-User Recipe: Designer-Quality Diagrams">
              4 steps: (1) Claude se concept ko SVG diagram banwao, sab
              labels/arrows preserve karne ko kaho. (2) SVG ko 2x
              resolution PNG mein convert karo. (3) PNG ko
              ChatGPT/Gemini mein paste kar ke bolo &ldquo;professional
              design quality mein redraw karo, har label/box/arrow
              preserve karo, sirf visual finish behtar karo.&rdquo; (4)
              3-4 rounds iterate karo. Total time: 10-15 minute, Figma
              mein 1 ghante ke muqable.
            </Callout>
            <P>
              Audio bhi: long-form dictation (typing se zyada nuance
              capture karta hai), meeting transcripts context ki tarah
              (&ldquo;decisions, open questions, action items by
              owner&rdquo; maango), aur voice in/out accessibility ke
              liye (commute, walk).
            </P>
            <RecapTable
              head={["Audio Task", "Kitna Achha Chalta Hai", "Dhyan Rakho"]}
              rows={[
                ["Clear speech transcription", "Excellent", "Heavy accents, overlapping speakers"],
                ["Speaker identification", "2 speakers pe decent, 4+ pe kamzor", "Quote karne se pehle check karo"],
                ["Tone/sarcasm/emotion", "Improving lekin unreliable", "AI se uncertainty flag karwao"],
                ["Music/non-speech analysis", "Limited", "Specialized tool use karo"],
                ["Real-time voice conversation", "Casual ke liye achha, technical ke liye kamzor", "Precision chahiye to text pe switch karo"],
              ]}
            />
            <Callout label="Real Example">
              Ek doctor ne 45-minute patient consultation record ki,
              upload ki, SOAP format mein clinical note mangi, uncertainty
              flag karne ko kaha. 8 minute mein draft mila, 5 minute mein
              verify hua, typed version ke 25 minute ke muqable.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>9. Ek Prompt Se Chhote Apps Banana</SubHeading>
            <P>
              Modern AI chhote games, websites, tools ek hi prompt se
              bana sakta hai. Ye chat side panel mein render hota hai,
              jisay <Strong>Artifacts</Strong> (Claude) ya{" "}
              <Strong>Canvas</Strong> (ChatGPT, Gemini) kehte hain, ek
              persistent object jise aap edit, iterate, publish
              (shareable link pe), embed, ya code ki tarah download kar
              sakte ho.
            </P>
            <P>3-slot recipe:</P>
            <CheckList
              items={[
                "Goal: ye cheez kya karni chahiye?",
                "Input: user kya provide karta hai?",
                "Output: user kya dekhta hai?",
              ]}
            />
            <PromptBox>{`Build a Pomodoro timer with a yellow theme. 25-minute work
sessions, 5-minute breaks, a satisfying click when each cycle ends.`}</PromptBox>
            <P>
              Aur bhi kaam karti hain: bill splitter (total bill, tax,
              names ke sath), outfit picker (weather ke hisab se),
              fireworks simulator, obstacle-placing game.
            </P>
            <Callout label="Ab Bhi Mushkil Kya Hai" tone="warn">
              Internet pe multiplayer (networking, accounts,
              matchmaking), aur alag language mein live AI feedback.
              Chhoti, ek-screen cheezein jinme accounts ya external
              services na hon, wo kaam karti hain. Isse aage real
              engineering chahiye.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>10. Data Analysis (Model Code Likhta Aur Chalata Hai)</SubHeading>
            <P>
              Jab aapko calculation ya graph chahiye, model code likhta
              hai, usay run karta hai, aur result use karta hai. Code
              execution bas ek aur tool hai, jaise web search. Ye zehan
              mein math karne se zyada reliable hai.
            </P>
            <Callout label="Critical Habit: Ensure Karo Ke Code Actually Chala" tone="warn">
              Silent failure mode: chhote sawalon pe AI kabhi kabhi code
              skip kar deta hai, guess kar leta hai, ek confident
              paragraph deta hai jiske peeche koi computation nahi
              hoti. Bachao:
            </Callout>
            <CheckList
              items={[
                "Explicitly poocho: \"Write and run code to answer this. Show me the code you ran.\"",
                "Check karo code visibly present hai, agar code block nahi hai to model ne run nahi kiya",
                "Verifiable specifics pehle mango: \"Exact row count, column names, date range batao is analysis se pehle\"",
                "Strongest version: \"Are you running code, or estimating? If estimating, stop and run code instead.\"",
              ]}
            />
            <Callout label="Bubble Tea Shop Example">
              Ek chhoti shop ka ek saal ka sales data (drinks, dates,
              quantities). Owner poochta hai: &ldquo;Which drinks had
              the biggest changes? Graph them. Write and run code, show
              me the code.&rdquo; AI month-over-month change compute
              karta hai, 4 outlier drinks find karta hai, colored line
              graph banata hai, aur note karta hai: &ldquo;Strawberry
              matcha spring mein sharply rose, agli baar wo promotion
              dobara chalao.&rdquo;
            </Callout>
            <RecapTable
              head={["Use Case", "Example"]}
              rows={[
                ["Household spending", "Bank/credit card transactions upload karo, kaunse categories bade, kaunse mahine unusual thay"],
                ["Personal tracking", "Running, sleep, weight, screen time, koi bhi CSV export"],
                ["Small business", "Sales, inventory, customer, expense files"],
                ["Koi bhi spreadsheet", "Grade reports, utility usage, survey results"],
              ]}
            />
            <Callout label="Kya Double-Check Karein" tone="warn">
              Final totals (galat column sum ho sakta hai), graph ke
              labels (numbers usually sahi hote hain, captions kabhi
              confidently galat hote hain), aur wo columns jinhe AI
              misinterpret kar sakta hai (jaise &ldquo;TXN_AMT&rdquo; ko
              transaction amount samajhna jabke wo account number ho).
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · Safe Kaam, Sahi Tool Choose Karna</PartBanner>
            <SubHeading>11. AI Desktop Apps Aur Permissions</SubHeading>
            <P>
              Ab ek poori category hai jise <Strong>AI desktop
              apps</Strong> kehte hain, jo aapke computer par chalti
              hain aur, permission ke sath, aapki files dhoond, parh,
              aur unpe act kar sakti hain. Cowork (Claude ki taraf se)
              aur OpenWork examples hain.
            </P>
            <Callout label="File Access Dene Se Pehle Ye Padho" tone="warn">
              Deleted files aksar recycle bin mein NAHI jati jab AI app
              unhe delete karti hai, gayab ho jati hain. Edited files
              edit history nahi rakhti jab tak version control na ho.
            </Callout>
            <P>Safe workflow:</P>
            <Ladder
              steps={[
                { title: "Task Batao", note: "\"Is folder ko client ke hisab se reorganize karo.\"" },
                { title: "Plan Mango, Action Nahi", note: "App file operations ki ek list propose karti hai" },
                { title: "Plan Review Karo", note: "Wo rename jo nahi chahiye, hone se pehle pakro" },
                { title: "Phir Approve Karo", note: "Sirf tab execution shuru ho" },
              ]}
            />
            <RecapTable
              head={["Comfort Level", "Kya Allow Karo", "Kya Deny Karte Raho"]}
              rows={[
                ["Pehli sessions", "Ek chhoti folder tak read-only access", "Jo bhi write/delete/rename kare"],
                ["2-3 successful runs ke baad", "Ek specific folder ke andar read/write", "Desktop ya documents root jaisi broad directories"],
                ["Ek clean week ke baad", "Project tree ke across read, scoped subfolder mein write", "Us project se bahar kuch bhi"],
                ["Trusted", "Tool-specific permissions", "Open-ended \"jo bhi chahiye karo\""],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>12. Cost, Speed, Aur Kaunsa Model Kab</SubHeading>
            <CostLadderDiagram />
            <P>
              Free tier entry level par cost barely ek constraint hai.
              Bare chatbots (ChatGPT, Claude, Gemini, Meta AI, DeepSeek)
              sab free access dete hain jo is page ke prompts
              comfortably handle karta hai.
            </P>
            <RecapTable
              head={["Tool", "Strong Kis Mein", "Weak Kis Mein"]}
              rows={[
                ["Claude", "Hard prompts pe reasoning, long-document understanding, SVG/diagrams, code, careful writing voice", "In-product photo-realistic image generation kam central hai"],
                ["ChatGPT", "Top image generation, voice mode, broad task coverage", "Kabhi verbose, lists/headings se over-format karta hai"],
                ["Gemini", "Fast web search/synthesis, rich deep research, Google Workspace integration", "Tone kabhi clipped feel hoti hai"],
                ["Meta AI", "WhatsApp/Instagram/Messenger mein embedded, free, Muse Spark reasoning laata hai", "Coding aur long-horizon agents kamzor lagti hain, koi public API nahi"],
                ["DeepSeek", "Open-source, self-host kar sakte ho, 1M-token context default", "Interface polish kam, ecosystem chhota"],
              ]}
            />
            <Callout label="Model Ladder">
              Ek family ke andar bhi, 3 rungs hote hain: fast/cheap
              default roz-marra ke liye, ek reasoning level upar, aur ek
              heavy flagship sabse hard tasks ke liye. Middle rung kabhi
              apna alag entry hoti hai, kabhi Concept 5 wali thinking
              switch. Naam rotate hote hain, isliye memory ki bajaye
              picker parho.
            </Callout>
            <P>
              <Strong>Arena</Strong> leaderboard bookmark karne layak
              hai: users blind head-to-head mein vote karte hain, isliye
              rankings real preferences reflect karti hain, vendor
              marketing nahi. Mahine mein ek baar check karo, leaders
              tezi se rotate karte hain.
            </P>
            <CheckList
              items={[
                "Kam se kam 2 tabs khuli rakho, ek primary tool, ek backup",
                "Ek prompt scratchpad rakho, jo prompts unusually achhe results dein",
                "Jab model wrong ho, note karo, ye ek free signal hai us tool ke edges ke baare mein",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>13. Models Checking Models</SubHeading>
            <P>
              Jab koi ground truth na ho (koi answer key, koi expert
              paas baitha, koi test jo red fail ho), aap phir bhi ek
              objective quality signal hasil kar sakte ho: models ko ek
              doosre ko grade karwa kar.
            </P>
            <Callout label="Sirf Alag Families Ke Sath Kaam Karta Hai">
              Alag models ke alag blind spots hote hain, overlapping
              lekin alag data pe train huye. Ye sirf tab kaam karta hai
              jab models genuinely alag families se hon: Anthropic
              (Claude), OpenAI (ChatGPT), Google (Gemini), xAI (Grok),
              Meta, DeepSeek. Do Claude models ek doosre ko check karein
              wo cross-model checking nahi hai, priors bohot similar
              hain.
            </Callout>
            <MultiModelLoopDiagram />
            <P>
              Light version: single-model self-critique, sirf steps 3-4
              (score 1-10 named criteria pe, phir apne suggestions
              implement karwao) bhi zyada tar tasks ko visibly better
              bana deti hai.
            </P>
            <PromptBox>{`Iterate against your own rubric until you reach 9.5 across all
criteria, then show me the final version.`}</PromptBox>
            <Callout label="Ek Honest Caveat" tone="warn">
              3 models sath mein bhi ek hi cheez pe galat ho sakte hain,
              wo training data share karte hain jitna aap sochenge us se
              zyada. Score progress ka signal hai, truth ka nahi.
              High-stakes content (legal, medical, financial) ke liye,
              koi bhi cross-model pass ek human expert ko replace nahi
              karta.
            </Callout>
            <Callout label="Privacy Note" tone="warn">
              Cross-model checking ka matlab hai apna draft kai tools
              mein paste karna. Sensitive material se pehle har tool ki
              data policy check karo. Kuch tools (Claude consumer,
              ChatGPT training opt-out ke sath, paid Gemini) aapke input
              pe train nahi karte. Kuch (Meta AI default) kar sakte
              hain.
            </Callout>
            <P>
              <Strong>Kab loop skip karo:</Strong> ek short email, quick
              lookup, casual brainstorm, single-model kaafi hai.
              Multi-model cross-check un kaamon ke liye rakho jahan
              galat hona mehnga ho.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>13 Concepts, Ek Ek Line</SubHeading>
            <RecapTable
              head={["#", "Ek Line"]}
              rows={[
                ["1", "Novice aur power-user prompt ka farq habits hai, cleverness nahi, colleague ki tarah brief karo"],
                ["2", "AI ne internet ke snapshot se seekha, common topics pe strong, obscure/recent pe kamzor"],
                ["3", "3 retrieval modes: pretrained, web search, deep research, wording steer karti hai"],
                ["4", "Model ki apni memory nahi, context window is response ka working memory hai, projects context ek baar front-load karte hain"],
                ["5", "Modern models seconds/minutes tak think hard kar sakti hain jab poocho"],
                ["6", "Models agreement ki taraf biased hain, neutral framing aur rubrics isay neutralize karte hain"],
                ["7", "Explicit-feedback wala iterate loop is page ka sabse high-leverage habit hai"],
                ["8-9", "AI images dekh sakta hai, audio dono directions mein kaam karta hai, chhote apps bana sakta hai"],
                ["10", "AI code likh aur chala sakta hai, lekin automatically nahi, explicitly poocho aur verify karo"],
                ["11", "File-aware desktop apps ki nayi category hai, permissions tightly scope karo"],
                ["12", "Sahi tool har kuch mahine mein badalta hai, distinct families jaano, Arena check karo"],
                ["13", "Jab koi human expert room mein na ho, models ko ek doosre se grade karwana sabse close objective signal hai"],
              ]}
            />
            <PullQuote>
              In sab ke neeche ek hi move hai, dus disguises mein dohraya
              hua: sahi context andar dalo, ghalat context bahar rakho.
              Agar is page se sirf ye ek sentence yaad rahe, aap phir bhi
              top quartile users mein honge.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 12 Prompts</SubHeading>
            <P>
              Claude, ChatGPT, ya Gemini khol kar ye 12 prompts order
              mein chalao. Taqreeban 28 minute lagte hain, aur is page ka
              har wo concept exercise hota hai jo ek chat tab se ho
              sakta hai.
            </P>
            <Ladder
              steps={[
                { title: "1. Web-Search Trigger", note: "\"Aaj [aapke mulk] mein kya major news hui? Har claim ko source link ke sath cite karo.\" — Model ko training data se bahar, current info dhoondne pe force karta hai." },
                { title: "2. Pretrained-Only Sawal", note: "\"Cats walls ko kyun ghoorti hain? 2-paragraph answer.\" — Common-knowledge, lookup ki zaroorat nahi, fast aur confident hona chahiye." },
                { title: "3. Context-Rich Personal Prompt", note: "15-minute home workout plan mango, apne constraints upfront do (stairs, bad knee, 3-din se zyada plan pe nahi tik sakte). 3 options mango, koi commentary nahi." },
                { title: "4. Neutral-Framing Rewrite", note: "Koi biased sawal (\"don't you think X is obviously better?\") neutral version mein rewrite karwao, phir wahi rewritten version answer karwao." },
                { title: "5. 3-Options Brainstorm With Iteration", note: "Ek side-project idea ke 5 options mango (ek line har ek), phir feedback do (kaunsa reject, kyun), 5 naye options mango jo feedback incorporate karein." },
                { title: "6. Outline-First Writing", note: "Ek 600-word post ke 3 alag outline options mango (4-6 headings har ek), prose se pehle." },
                { title: "7. Think-Hard Reasoning Prompt", note: "Koi real personal decision do, context ke sath, \"think hard\" bolo, 3 trade-offs, recommendation, aur recommendation kab flip hogi poocho." },
                { title: "8. Grade-And-Improve Critique", note: "Apni likhi cheez paste karo (100-300 words), 4 named criteria pe 1-10 score karwao, har criterion ke liye batao score kaise barhega." },
                { title: "9. Image-Input Task", note: "Koi handwritten note, receipt, ya whiteboard photo upload karo, transcribe karwao, 3 bullets mein summarize karwao, jo confidently na parh saka wo flag karwao." },
                { title: "10. Small-App Prompt", note: "Goal/Input/Output shape use kar ke ek Pomodoro timer mango (25-min work, 5-min break, yellow theme). Working version dekho artifact mein." },
                { title: "11. Data Analysis: Silent Failure Mode", note: "2 rounds. Pehle round mein 18 numbers de kar median/average/outliers poocho, code ka zikr mat karo, dekho AI ne code chalaya ya guess kiya. Doosre round mein wahi calculation explicitly \"write and run code\" ke sath dobara mango, compare karo." },
                { title: "12. Cross-Model Review", note: "Koi 200-300 word draft 2 alag-family tools mein paste karo (jaise Claude aur ChatGPT), dono se same rubric pe score aur critique mango, compare karo kis point ko sirf ek tool ne pakra." },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>4 Hands-On Projects</SubHeading>
            <P>
              12 prompts ne har concept alag alag exercise kiya. Pehle 3
              projects unhe zanjeer mein jorte hain, aur wahan le jate
              hain jahan chat window nahi le ja sakti: ek real, public
              URL tak, jise aap dost ko text kar sakte ho.
            </P>
            <RecapTable
              head={["Project", "Waqt", "Kya Banega"]}
              rows={[
                ["1. Snake Battle", "30-60 min", "Ek game khelte hue banao, phir real URL pe ship karo"],
                ["2. Whack-a-Mole", "45-60 min", "Ek game banao, phir usay \"achha hai\" se \"genuinely fun\" tak grade karo"],
                ["3. Ek Page Jo Aap Ho", "30-60 min", "Ek one-page personal site jo ajnabi 5 second mein samajh le"],
                ["4. AI Mini Textbook (Capstone)", "2-4 hrs", "AI se ek chhota learning chapter banwao, phir prove karo aap usay direct aur check kar sakte ho"],
              ]}
            />
            <Callout label="Pehle 3 Ka Shape">
              Chat mein artifact banta hai → aap usay download karte ho
              ek file ki tarah (index.html) → internet usay serve karta
              hai ek real public URL par (jaise your-app.netlify.app).
              Har address exist karta hai kyunki aap ne plain sentences
              mein describe kiya wo kya chahte hain.
            </Callout>
            <P>
              Capstone (Project 4) exception hai jo rule prove karta
              hai: ye koi URL ship nahi karta, kyunki iska product ek
              cheez hai jo aap samajhte ho, aur proof ye hai ke aap,
              model nahi, in-charge thay.
            </P>
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
                ["Slop", "AI output jo surface pe fluent hai lekin andar se khali, koi context/constraints na dene par default"],
                ["Retrieval mode", "AI kaise answer deta hai: pretrained, web search, ya deep research"],
                ["System prompt", "Company ki likhi invisible instructions jo har chat se pehle load hoti hain"],
                ["Context window", "Wo poora text jo is response ke liye model ke saamne hai, saari 6 layers samet"],
                ["Memory note", "Tool ka aapke baare mein khud likha short profile, jo har naye chat mein load hota hai"],
                ["Context rot", "Lambi, unrelated-topics wali conversations mein recall ka girna"],
                ["Project", "Ek workspace jo ek baar setup hoti hai, files/instructions/audience ke sath, jo har naya chat inherit karta hai"],
                ["Thinking mode / Reasoning mode", "Model ka answer se pehle seconds-se-minutes tak internally explore karna"],
                ["Sycophancy", "Model ka aapse agree karne ki taraf trained bias"],
                ["Objective-rubric pattern", "Named criteria pe fixed-scale score maangna, taake vague praise ki jagah specific feedback mile"],
                ["Brainstorm-iterate loop", "3-5 options mangna, explicit feedback dena, dobara mangna, jab tak achha na lage"],
                ["Diffusion model", "Image generation ka tareeqa: random pixels se step-by-step noise hatana"],
                ["Artifact / Canvas", "Chat ke barabar ek persistent, editable, shareable output panel (Claude: Artifacts, ChatGPT/Gemini: Canvas)"],
                ["AI desktop app", "Ek app jo computer par chalti hai aur, permission ke sath, files find/read/act kar sakti hai (jaise Cowork, OpenWork)"],
                ["Model ladder", "Ek family ke andar fast/thinking/flagship rungs"],
                ["Arena", "Blind head-to-head model comparisons ka leaderboard"],
                ["Model family", "Ek company ke models ka group (Claude = Anthropic, ChatGPT = OpenAI, Gemini = Google, waghera)"],
                ["Cross-model checking", "Alag-family models se ek doosre ka kaam grade karwana, taake blind spots pakre jayen"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;AI Prompting in 2026&rdquo; crash course par based
              hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/ai-prompting-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/ai-prompting-2026
              </a>
              . Agla connected course, &ldquo;Thinking in AI Era Crash
              Course&rdquo;, in habits ko 6 deeper thinking disciplines
              mein le jata hai (Prediction Lock, Reasoning Receipt, Error
              Taxonomy, Thinking in Systems, First Principles, Working
              WITH AI).
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
                  q: "Novice aur power-user prompt mein asal farq kya hai?",
                  a: "Cleverness nahi, briefing quality hai. Power user AI ko ek smart-but-new colleague ki tarah brief karta hai: files, context, constraints, aur ek clear ask ke sath. Novice sirf ek short sawal poochta hai aur pehla answer accept kar leta hai.",
                },
                {
                  q: "AI kisi topic pe reliable hai ya nahi, ye kaise judge karo?",
                  a: "Training data mein us topic ki frequency roughly reliability ke barabar hai. Common topics (cooking, popular movies) strong hain. Obscure ya recent topics (regional history, knowledge cutoff ke baad ki cheezein) kamzor hain, primary source se verify karo.",
                },
                {
                  q: "3 retrieval modes kya hain, aur inme se kaunsa poochne ka tareeqa trigger karta hai?",
                  a: "Pretrained (\"what is X\"), Web Search (\"what's the latest\", \"today\"), aur Deep Research (\"research thoroughly\", citations ke sath report). Aapki wording steer karti hai kaunsa fire hota hai.",
                },
                {
                  q: "Context window mein kya-kya land hota hai?",
                  a: "6 layers: system prompt, memory note, tool descriptions, chat history, aapka current prompt, aur uploaded files. Model sirf yehi dekh sakta hai, kuch bhi bahar exist nahi karta is answer ke liye.",
                },
                {
                  q: "Sycophancy kya hai, aur isay kaise neutralize karte hain?",
                  a: "Models human feedback pe train hoti hain jahan agreement zyada thumbs up leta hai, isliye wo aapko wo batane ki taraf lean karti hain jo aap sunna chahte ho. Neutral framing (find/defend/confirm ki jagah evaluate/compare/critique) aur named criteria pe 1-10 score maangna isay neutralize karta hai.",
                },
                {
                  q: "Brainstorm-iterate loop ke steps kya hain?",
                  a: "Sab context upfront do, 3-5 options mango (expand mat karwao), explicit feedback do (kya reject kiya, kyun), naye options mango. 1-2 achhe options milne tak repeat karo, tabhi full detail mango.",
                },
                {
                  q: "Data analysis mein \"silent failure mode\" kya hai, aur ise kaise pakarte hain?",
                  a: "AI kabhi kabhi code run karne ki jagah guess kar leta hai aur ek confident paragraph de deta hai bina real computation ke. Bachao: explicitly \"write and run code\" poocho, check karo code block visible hai, aur analysis se pehle verifiable specifics (row count, columns) mango.",
                },
                {
                  q: "Cross-model checking sirf tab kyun kaam karta hai jab models alag families se hon?",
                  a: "Alag families (Anthropic, OpenAI, Google, waghera) genuinely alag training data aur reward signals se banti hain, isliye unke blind spots alag hote hain. Ek hi family ke 2 models ke priors bohot similar hote hain, isliye unhe ek doosre se check karwana real cross-checking nahi hai.",
                },
                {
                  q: "Model ladder kya hai?",
                  a: "Ek family ke andar 3 rungs: fast/cheap default roz-marra ke liye, ek reasoning level upar, aur ek heavy flagship sabse hard tasks ke liye. Rung names rotate hoti rehti hain, isliye current picker check karo, memory pe bharosa mat karo.",
                },
                {
                  q: "Is poore chapter ka underlying ek move kya hai?",
                  a: "Sahi context andar dalna, ya ghalat context bahar rakhna. Almost har technique in do moves mein se ek hai, kyunki model stateless hai aur sirf usi context window se answer deta hai jo is waqt uske saamne hai.",
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
