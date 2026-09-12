import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Hand,
  HelpCircle,
  ListChecks,
  Search,
  Send,
  Target,
  ThumbsUp,
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
  Ladder,
  CheckList,
  PartBanner,
  PromptBox,
  PullQuote,
} from "../_components/notes-ui";
import { chapters, getNextLiveChapter, getPrevLiveChapter } from "../_lib/chapters";

const chapter = chapters.find((c) => c.slug === "just-delegate-it")!;
const prevChapter = getPrevLiveChapter("just-delegate-it");
const nextChapter = getNextLiveChapter("just-delegate-it");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "Delegation Loop, Delegation Brief, aur verify karne ka 4-step tareeqa — AI ko sawal poochna chhod kar seedha job dene ka poora habit, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/just-delegate-it" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/just-delegate-it`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Ek Chhota Test, Poora Sabaq", level: 2 },
  { id: "part1", text: "Part 1 · Poochna Band, Delegate Karna Shuru", level: 2 },
  { id: "part2", text: "Part 2 · AI Ko Real Kaam Do", level: 2 },
  { id: "part3", text: "Part 3 · AI Ko Zyada Responsibility Do", level: 2 },
  { id: "part4", text: "Part 4 · Supervisor Bano", level: 2 },
  { id: "recap", text: "Recap", level: 2 },
  { id: "practice", text: "Practice: 6 Jobs Is Hafte", level: 2 },
  { id: "projects", text: "Delegation Record Template", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function AskVsJobDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <HelpCircle size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Sawal Poochna</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Jawab milta hai, aur kaam wahi rehta hai jahan tha, aapke
            paas. Compare karna, check karna, decide karna, sab abhi
            baaki hai.
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <Target size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Job Dena</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Result milta hai, aur aapke paas sirf checking reh jati
            hai. AI ne pehla pass kar diya, method usne chuna, aap
            sirf judge karte ho.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Farq sentence ki length ka nahi hai, farq ye hai ke job ek
        cheez ke exist hone ki request karti hai
      </figcaption>
    </figure>
  );
}

function DelegationLoopDiagram() {
  const yours = [
    { icon: Target, t: "Define" },
    { icon: Send, t: "Delegate" },
  ];
  const ai = [
    { icon: Eye, t: "Observe" },
    { icon: Hand, t: "Intervene" },
  ];
  const yours2 = [
    { icon: CheckCircle2, t: "Verify" },
    { icon: ThumbsUp, t: "Accept" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card/40 p-3">
          <p className="mb-2 text-center text-[0.65rem] font-bold uppercase tracking-wider text-muted">Yours</p>
          <div className="space-y-2">
            {yours.map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-background/40 px-2.5 py-2">
                <Icon size={14} className="text-accent-bright" />
                <span className="text-xs font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-3">
          <p className="mb-2 text-center text-[0.65rem] font-bold uppercase tracking-wider text-accent-bright">AI Works, You Watch</p>
          <div className="space-y-2">
            {ai.map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-background/40 px-2.5 py-2">
                <Icon size={14} className="text-accent-bright" />
                <span className="text-xs font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/40 p-3">
          <p className="mb-2 text-center text-[0.65rem] font-bold uppercase tracking-wider text-muted">Yours</p>
          <div className="space-y-2">
            {yours2.map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-background/40 px-2.5 py-2">
                <Icon size={14} className="text-accent-bright" />
                <span className="text-xs font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        AI beech ka hissa apne paas rakhta hai. Aap dono sirey apne paas
        rakhte ho
      </figcaption>
    </figure>
  );
}

function VerifyStepsDiagram() {
  const items = [
    { icon: ListChecks, t: "Identify", d: "Kaunsi baatein check karne layak hain: prices, dates, figures, quotations" },
    { icon: Search, t: "Trace", d: "Source kholo, wo sentence dhoondo jo claim support karta hai, date check karo" },
    { icon: AlertTriangle, t: "Challenge", d: "Poocho: ye badal sakta tha? Ye secondary source hai? Kya assumption ko fact bola ja raha hai?" },
    { icon: CheckCircle2, t: "Decide", d: "Accept, Correct, Investigate, ya Reject, chaar mein se ek" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={16} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Citation verification nahi hai. Citation ko check karna
        verification hai
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
  url: `${site.url}/anthropic-exam-prep/just-delegate-it`,
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

export default function JustDelegateItChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke Prompting
              and Task Execution aur Product and Model Selection domains
              ke liye foundation hai
            </p>
            <CoreIdea>
              Ek free AI chat kholo aur poocho: &ldquo;AI agents seekhne
              ke liye kuch achhe courses batao.&rdquo; Ek list mil
              jayegi, aur agla kaam sab aapka hai: har course kholna,
              compare karna, check karna, decide karna. Ab wahi sawal
              ek job ki tarah likho: &ldquo;3 free online courses
              dhoondo AI agents seekhne ke liye, current information
              use kar ke, aur unhe ek table mein daalo provider,
              language, waqt, aur link ke sath.&rdquo; Is baar ek
              table mil jati hai, ready. Ek link kholo aur page pe 2
              cheezein check karo: kya course actually free hai, aur
              kya wo usi language mein hai jo table ne bataya.
              Zyadatar in teen mein se ek hota hai: page table se agree
              karta hai, page kisi detail pe disagree karta hai (aksar
              price ya language), ya link course tak pahunchta hi
              nahi. Teenon normal hain, aur table mein kuch nahi tha
              jo aapko pehle se batata ke kaunsa milega.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Poora Course, Ek Minute Mein</SubHeading>
            <P>
              Ye poora chhota moment hi poora course hai. AI ne ek
              ghante ka kaam ek minute mein kar diya, aur wo ek cheez
              nahi kar saka: aapko batana ke result pe trust karna hai
              ya nahi. Baaki poora chapter isi moment ko ek rhythm aur
              ek written form deta hai, phir aapko us mein achha
              banata hai.
            </P>
            <AskVsJobDiagram />
            <SubHeading>Ek Rhythm: Delegation Loop</SubHeading>
            <P>
              6 steps ka ek rhythm, <Strong>Delegation Loop</Strong>:
              define, delegate, observe, intervene, verify, accept. AI
              beech ka hissa apne paas rakhta hai. Aap dono sirey apne
              paas rakhte ho.
            </P>
            <DelegationLoopDiagram />
            <Callout label="Kab Ye Chalana Hai">
              Ek rhythm: Delegation Loop. Ek written form: <Strong>Delegation
              Brief</Strong>, 6 sawal jo AI shuru karne se pehle answer
              karte ho: outcome, context, constraints, authority,
              deliverable, verification. Aur ek rule har button ke
              liye: <Strong>need first, then tool</Strong>, matlab ek
              control tab seekho jab job usay maange, pehle se nahi.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Poochna Band, Delegate Karna Shuru</PartBanner>
            <SubHeading>1. Sawal Poochne Se Job Dene Tak</SubHeading>
            <P>
              Zyada tar log AI se sawal poochna shuru karte hain:
              &ldquo;AI agents seekhne ke liye kuch achhe courses kya
              hain?&rdquo; Opener mein aap ne iske bajaye job diya tha.
              Farq length ka nahi hai, farq ye hai ke job ek cheez ke
              exist hone ki request karti hai: 3 courses, ek table
              mein, links ke sath. Isay <Strong>delegate karna</Strong>{" "}
              kehte hain, matlab result banane ki responsibility AI ko
              dena. Ye kisi paid plan ya khaas model pe depend nahi
              karta, ye depend karta hai aap kaisa sentence type karte
              ho.
            </P>
            <Callout label="Apna Running Job Chuno">
              Koi bhi subject chuno jo aap seekhna chahte ho aur ek
              fresh chat mein wahi job daal do: &ldquo;3 free online
              courses dhoondo [subject] seekhne ke liye, table mein,
              provider/language/time/link ke sath.&rdquo; Ye aapka{" "}
              <Strong>running job</Strong> banega, is chapter mein aap
              isay har concept pe wapis layenge aur ek line aur add
              karenge.
            </Callout>

            <SubHeading>2. AI Ko Outcome Do, Clicks Nahi</SubHeading>
            <P>
              Ek hi job dene ke 2 tareeke hain. Ek recipe: har step
              batana, &ldquo;pehle is site pe dekho, phir usay copy
              karo, phir compare karo&rdquo;. Doosra <Strong>outcome</Strong>:
              sirf batana kya hona chahiye jab kaam khatam ho. Recipe
              wala tareeqa AI ko aapke plan tak limit kar deta hai,
              chahe wo plan weak ho, aur AI kabhi nahi batata ke plan
              narrow tha. Outcome wala tareeqa AI ko method chunne
              deta hai, aap result ko us outcome ke against judge
              karte ho jo aap ne maanga tha, us plan ke against nahi
              jo aap ne turant bana liya.
            </P>
            <PullQuote>
              Kya hona chahiye jab kaam khatam ho, ye batao. Clicks
              machine ko do, judgment apne paas rakho.
            </PullQuote>
            <P>
              Steps ki bhi jagah hai, jab ek source ya order zaroori
              ho, wo job pe ek limit hai aur Concept 3 usay apni line
              deta hai. Jo nahi karna wo ye hai ke nervous ho kar steps
              likhna. Wo feeling end mein aati hai, jab check karte ho,
              shuru mein nahi.
            </P>

            <SubHeading>3. Delegation Brief Likho</SubHeading>
            <P>
              Aap pehle se ek brief likh rahe the, bina jaane. Ye raha
              opener ka one-sentence job, 6 labeled lines mein grown
              hua:
            </P>
            <PromptBox>{`Outcome: teen free online courses AI agents seekhne ke liye,
compared, aur ek beginner ke liye recommend karo.

Context: maine kabhi AI agent nahi banaya ya use nahi kiya, aur
mujhe programming nahi aati. Main hafte mein 5 ghante de sakta hoon.

Constraints: sirf wo courses jo free start ho sakein, aur jo
programming knowledge expect na karein. Current information ke
liye search karo, apni knowledge se jawab mat do.

Authority: sources khud chuno. Agar do courses equal hain, chhota
wala chuno bina mujhse poochay. Clearly batao agar koi course
paid hai, ya programming expect karta hai.

Deliverable: ek chhoti table: provider, language, time needed,
certificate paid hai ya nahi, aur link. Phir 2-sentence
recommendation.

Verification: jo confirm na ho sake usay "unverified" likho,
guess mat karo.`}</PromptBox>
            <P>
              Aap ne teen lines bina label ke pehle se answer ki thi.
              Outcome wo sentence hai jo aap ne Concept 2 mein likha.
              &ldquo;Free&rdquo; ek <Strong>constraint</Strong> tha,
              matlab wo requirement/limit jo job pe apply hoti hai.
              Table with links <Strong>deliverable</Strong> tha, matlab
              result ki wo form jo koi use kar sake.
            </P>
            <P>
              3 lines nayi hain, aur 2 wo hain jo log skip karte hain.{" "}
              <Strong>Context</Strong> aasan hai: jo AI khud nahi jaan
              sakta aap ke ya job ke baare mein, jab tak aap na batao.{" "}
              <Strong>Authority</Strong> wo decisions hain jo aap AI ko
              khud lene dete ho, ek chat mein bhi ye maujood hai. Bina
              is line ke AI khud decide kar leta hai, khamoshi se, aur
              aapko pata hi nahi chalta ke koi decision hui.{" "}
              <Strong>Verification</Strong> wo hai jo aap accept karne
              se pehle check karenge, kaam shuru hone se pehle likha
              gaya. Pehle se likhna result parhne ko usay check karne
              mein badal deta hai.
            </P>
            <Callout label="Yaad Rakho">
              Ye ek thinking tool hai, form nahi. Koi bhi 2-line job ke
              liye 6 boxes nahi bharta. Lekin jab bhi koi result
              disappoint kare, in 6 sawalon mein se ek unanswered thi,
              ab aap bata sakte ho kaunsa.
            </Callout>
            <RecapTable
              head={["Brief Line", "Kis Competency Se Judi Hai"]}
              rows={[
                ["Outcome", "Delegation aur Description"],
                ["Context", "Description"],
                ["Constraints", "Description aur Diligence"],
                ["Authority", "Delegation aur Diligence"],
                ["Deliverable", "Description"],
                ["Verification", "Discernment aur Diligence"],
              ]}
            />
            <P>
              Ye 4 competencies ({"Delegation, Description, Discernment, Diligence"}
              ) aglay chapter mein detail mein aati hain. Ye brief unki
              5th competency nahi hai, ye unka work order hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · AI Ko Real Kaam Do</PartBanner>
            <P>
              Har job kuch chahti hai jo apni jagah AI ko ek control
              sikhati hai. Rule sab controls ke liye same hai:{" "}
              <Strong>need first, then tool</Strong>, ek control tab
              hi seekho jab job usay maange.
            </P>
            <RecapTable
              head={["Job Ko Chahiye", "To Aap"]}
              rows={[
                ["Current information", "Poocho, aur web search on karo agar switch dikhe"],
                ["Ek source jo sirf aap ke paas hai", "Paste karo, ya file attach karo"],
                ["Job mein kuch private", "Private hissa hatao, baaki ke liye temporary/incognito chat use karo"],
                ["Ek finished cheez, jawab nahi", "Document, table, ya file khud maango"],
                ["Apna method chunne ki jagah", "Batao AI kya khud decide kare, kya poochay"],
                ["Har baar wahi context", "Sources ko Project mein knowledge banao, rules ko standing instructions"],
              ]}
            />

            <SubHeading>4. AI Ko Research Karne Do</SubHeading>
            <P>
              AI assistant ke 2 tareeke hain jaanne ke: wo yaad rakhta
              hai jo build hone ke waqt parha, jo bohot purana ho
              chuka, ya wo abhi dekhta hai, jise search kehte hain.
              Price, start date, link, ya course abhi exist karta hai
              ya nahi, is ke liye sirf dekhna kaam karta hai.
            </P>
            <P>
              Aap usually bata sakte ho kaunsa use hua. Ek fact jo
              search se aayi wo ek source ke sath aati hai jo aap khol
              sakte ho. Ek fact jo yaad se aayi akeli aati hai, aur
              utni hi sure lagti hai. 2 ehtiyat: agar ek current claim
              bina source ke aaye, mat sochlo ke AI ne dekha, chahe
              jawab khud kya kahe. Aur source date nahi hota, pages
              purani ho jati hain, jab date matter kare, khud page pe
              date dhoondo.
            </P>
            <Callout label="Ehtiyat" tone="warn">
              Citation verification nahi hai. Citation ko check karna
              verification hai.
            </Callout>

            <SubHeading>5. AI Ko Source Do</SubHeading>
            <P>
              Kuch jobs ko wo cheez chahiye jo AI search nahi kar
              sakta: aap ke chune course ka syllabus, office se ek
              notice, ek message thread. Aap ke paas hai, AI ke paas
              nahi. Aap dete ho.
            </P>
            <Callout label="Ehtiyat" tone="warn">
              Kuch bhi real paste karne se pehle, naam, phone numbers,
              account numbers, aur wo kuch bhi hatao jo aap public
              notice board pe nahi lagana chahenge. Ek free assistant
              aapki filing cabinet nahi hai. Temporary ya incognito
              chat bhi ek paste ko gayab nahi karti, provider kuch waqt
              ke liye copy rakhta hai. Ye bada sawal (kaunsa data AI
              mein ja sakta hai) chapter 09 mein poori tarah cover hota
              hai.
            </Callout>
            <P>
              &ldquo;Sirf neeche wale text ka istemal karo&rdquo; aur
              &ldquo;wo sentence quote karo jo istemal ki&rdquo;, ye 2
              instructions pasted text ko ek source banati hain. Bina
              inke, AI aapki di hui cheez ko apni yaad ke sath mix kar
              deta hai, aur aap bata nahi sakte kaunsi kahan se aayi.
              Inke sath, har jawab ek sentence tak trace hota hai jo
              aap dhoond sakte ho, aur &ldquo;not in the source&rdquo;
              ek achha jawab ban jata hai, guess nahi.
            </P>

            <SubHeading>6. Deliverable Maango, Jawab Nahi</SubHeading>
            <P>
              Har job ab tak ek chat message pe khatam hui. Ek real job
              ek cheez pe khatam hoti hai jo koi use kar sake. Jawab
              aapko reply deta hai. <Strong>Deliverable</Strong> aisi
              shape mein hota hai ke koi use kar sake, save kar sake,
              aage bhej sake: ek table jo aap ne naam ki, ek document,
              ek file. Ek baar form ka naam le lo, AI wahi form deta
              hai, aur aap result ko column-by-column check karte ho.
            </P>
            <Callout label="Ehtiyat" tone="warn">
              Deliverables caveats kho dete hain. Ek &ldquo;unverified&rdquo;
              mark jo 3 chat replies mein bacha rahi, wo tab gayab ho
              sakti hai jab wahi content ek neat document mein daali
              jaye, kyunke neat hona hi document ka purpose hai. Chat
              answer mein caveats count karo, phir document mein count
              karo. Agar doosra number chhota hai, jo drop hua wapis
              daalo.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · AI Ko Zyada Responsibility Do</PartBanner>
            <SubHeading>7. Decide Karo Job Kitna AI Ka Hai</SubHeading>
            <P>
              Authority ke 2 pehlu hain. Pehla: method kitna AI decide
              karta hai. <Strong>Plan-first</Strong> matlab AI se
              poochna ke steps list kare aur aapke go-ahead ka wait
              kare, kaam shuru karne se pehle. Ek plan padhne mein ek
              minute lagta hai aur fix karne mein ek sentence. Wahi
              galti, run hone ke baad pakdi jaye, to poore run ki cost
              lagti hai.
            </P>
            <P>
              Doosra pehla: AI bina poochay kya kar sakta hai. Chat
              window mein ye decisions ke baare mein hai, baad mein
              permissions ke baare mein hoga:
            </P>
            <RecapTable
              head={["Boundary", "Kyun Zaroori Hai"]}
              rows={[
                ["Research karo, lekin purchase mat karo", "Paisa jo move hota hai, wapis move karna mushkil hai"],
                ["Draft karo, lekin send mat karo", "Send karna ek promise banata hai jo koi aur dekh sakta hai"],
                ["Inspect karo, lekin delete mat karo", "Delete karna wo evidence khatam kar deta hai jo aapko check karne ke liye chahiye"],
                ["Chuno, lekin batao kya chuna", "Ek khamosh decision wo hai jo aap review nahi kar sakte"],
              ]}
            />
            <Callout label="Yaad Rakho">
              Approved plan ek cage nahi hai. AI behtar route dhoond
              sakta hai. Jo nahi kar sakta wo hai aap ki line cross
              karna, ya khamoshi se kuch important badal dena. Failure
              change hona nahi hai, khamoshi se change hona hai.
            </Callout>

            <SubHeading>8. Job Wapis Aaye To</SubHeading>
            <P>
              Aapka running job har concept pe wapis aaya. Real jobs
              bhi wapis aati hain: wahi report har hafte, wahi
              comparison har mahine. Repetition 2 cheezein maangti
              hai.
            </P>
            <P>
              Pehli: wo context jo aap dobara type kar rahe ho. Teesri
              baar jab aap wahi background paste karo, use kahin rakh
              do jahan AI khud parh le. Ek <Strong>Project</Strong> wo
              space hai jo aapki files aur standing instructions
              rakhta hai, isliye us Project ke andar har chat pehle se
              informed shuru hoti hai. <Strong>Knowledge</Strong>{" "}
              matlab wo files jo Project rakhta hai. Ek{" "}
              <Strong>standing instruction</Strong> ek rule hai jo ek
              baar likha jata hai aur Project ke har chat mein follow
              hota hai, jaise &ldquo;jo confirm na ho sake usay
              unverified likho&rdquo;.
            </P>
            <P>
              Doosri: ek clock. Kahan button hai wo Claude aur ChatGPT
              mein badalta rehta hai, isliye us ki jagah check karo,
              is course pe nahi. Rule wahi rehta hai: jo brief aap ne
              aaj save ki, wahi cheez schedule hogi.
            </P>
            <Callout label="Ehtiyat">
              Stored context ek responsibility hai. Jo aap Project mein
              daalte ho wo har answer ko shape karta hai jo us Project
              ke andar aata hai. Mahine mein ek baar dekho: kya aap ne
              store kiya, aur AI ne kya yaad rakha. Jo ab sach nahi wo
              hatao.
            </Callout>

            <SubHeading>9. Jab AI Bhatak Jaye</SubHeading>
            <P>
              Har job ab tak zyada tar sahi chali. Ye ek jaan bujh kar
              todo, taake fix karne wala move pehle se aap ka ho.
              Symptom batata hai kaunsa move chalana hai:
            </P>
            <RecapTable
              head={["Jo Dikhta Hai", "Move"]}
              rows={[
                ["Alag hi sawal ka jawab diya", "Stop karo, outcome ek line mein dobara batao"],
                ["Ek fact ya ek line galat hai", "Correct karo: galti ka naam lo, aur us ki jagah kya hona chahiye"],
                ["Galat direction mein ja raha hai, abhi galat nahi hua", "Redirect karo: direction batao, poora job dobara mat batao"],
                ["Job khud galat thi", "Requirement change karo, aur batao ke change kiya"],
                ["Step us level pe nahi kar sakta jo job maangti hai", "Escalate karo: thinking on karo, ya stronger model, phir dobara chalao"],
                ["Uske baad bhi fail hota rahe", "Job wapis le lo, kuch jobs aapki hi hain"],
              ]}
            />
            <Callout label="Sabse Zyada Miss Hone Wala Move">
              Escalate karna. Assistants ek fast setting aur slower,
              stronger settings dete hain. Fast se shuru karo. Jab job
              mein kai steps hon, careful comparison ya calculation
              maange, ya sahi hona zaroori ho, upar move karo aur wahi
              brief dobara chalao. Kabhi &ldquo;AI fail hua&rdquo; ka
              matlab &ldquo;maine galat level use kiya&rdquo; hota hai.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · Supervisor Bano</PartBanner>
            <SubHeading>10. Accept Karne Se Pehle Verify Karo</SubHeading>
            <P>
              &ldquo;AI ka kaam check karo&rdquo; advice hai, method
              nahi. Ye method hai:
            </P>
            <VerifyStepsDiagram />
            <P>
              <Strong>Identify</Strong>: sab kuch nahi, jahan galti ki
              cost zyada ho wahan checking kharch karo, prices, dates,
              figures, quotations, recommendations jin pe act karoge.{" "}
              <Strong>Trace</Strong>: ek claim ke liye source kholo,
              wo sentence dhoondo jo usay support karta hai, date
              check karo. <Strong>Challenge</Strong>: poocho ye kaise
              galat ho sakta hai, ye badal sakta tha, ye secondary
              source hai, kya assumption ko fact bola ja raha hai.{" "}
              <Strong>Decide</Strong>: 4 endings mein se ek,{" "}
              <Strong>Accept</Strong> (evidence kaafi hai),{" "}
              <Strong>Correct</Strong> (ek specific error fix ho sakta
              hai), <Strong>Investigate</Strong> (evidence incomplete
              ya contradictory hai, dobara trace karo),{" "}
              <Strong>Reject</Strong> (result kaafi reliable nahi,
              job wapis le lo).
            </P>
            <PullQuote>
              AI ka kaam karna accountability AI ko transfer nahi
              karta. Result pe naam aapka hai.
            </PullQuote>

            <SubHeading>11. Wahi Job, Alag AI</SubHeading>
            <P>
              Ek brief ka test ye hai ke wo kahin aur bhi chale. Apni
              poori brief ek doosre assistant mein bina badle paste
              karo. Brief travel karti hai kyunke wo job describe
              karti hai, tool nahi. Aap ke 6 lines mein kisi button ka
              naam nahi hai. Buttons har assistant mein alag hain, aur
              unke naam har kuch mahine badalte hain, discipline nahi
              badalti.
            </P>
            <Callout label="Ye Ek Ranking Nahi Hai">
              Jo aap likhte ho wo ek din ke 2 runs ka record hai, ye 2
              assistants ki ranking nahi hai. Models itni tezi se
              badalte hain ke aaj ki ranking agle mahine sach nahi
              rahegi.
            </Callout>
            <PullQuote>Job aapki hai. Model replaceable hai.</PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Poora Course, Compressed</SubHeading>
            <PullQuote>
              AI ko job do. Kaam karte dekho. Jo matter karta hai wo
              check karo. Phir decide karo.
            </PullQuote>
            <CheckList
              items={[
                "Sawal poochna jawab deta hai aur kaam aapke paas rehta hai, job dena result deta hai aur checking aapke paas rehti hai",
                "Delegation Loop ke 6 steps: define, delegate, observe, intervene, verify, accept, dono sirey aapke, beech AI ke",
                "Outcome batao, clicks nahi, AI method chune to result ko outcome ke against judge karna aasan hota hai",
                "Delegation Brief ke 6 sawal: outcome, context, constraints, authority, deliverable, verification, sabse zyada skip: authority aur verification",
                "Current fact chahiye to AI ko search karwao, aur check karo ke usne actually kiya, citation check karna hi verification hai",
                "Source dena hai to \"sirf isi text ka istemal karo\" aur \"quote karo\" likho, phir \"not in source\" ek achha jawab bante hai",
                "Deliverable maango, jawab nahi, aur count karo ke caveats chat se document tak survive huay ya nahi",
                "Authority ke 2 pehlu: plan-first se method verify karo, aur boundaries likho jo AI bina poochay kar sakta hai",
                "Job wapis aaye to context Project mein daalo, method wapis aaye to Skill mein (agla chapter)",
                "Intervene ke 6 moves mein se escalate sabse zyada miss hota hai, chhota sa fix hi kaafi hota hai",
                "Verify ke 4 steps: identify, trace, challenge, decide, aur decide 4 mein khatam hota hai: accept, correct, investigate, reject",
                "Job aapki hai, model replaceable hai, isliye brief ko job describe karni chahiye, tool nahi",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Jobs Is Hafte</SubHeading>
            <P>
              Ye 6 jobs wahi kism ki hain jo ek real hafta bharti hain.
              Har ek ke 6 lines shuru karo, fresh chat mein chalao,
              aur Concept 10 wala check karo. Sab free plan pe chal
              jate hain.
            </P>
            <Ladder
              steps={[
                { title: "1. Ek Purchase Jo Aap Actually Karenge", note: "Phone/laptop/course jo aap le rahe ho, budget ke andar compare karo, prices dated hon. Sabse zyada stale claim price hoti hai, ek trace karo." },
                { title: "2. Ek Weekly Summary", note: "Jo topic aap follow karte ho, sirf last 7 din ke sources se. Doosri baar chalne ke baad, brief ko Project mein daal do." },
                { title: "3. Ek Document Jis Ka Reply Dena Hai", note: "Sirf pasted text use karo, quote maango, Authority line \"none\" rakho, taake AI samajhne pe ruk jaye, reply draft na kare." },
                { title: "4. Ek Letter Ya Message", note: "Draft karo, lekin send mat karo, aur assumptions ki list maango. Ye habit hai, jis din AI send kar sake, ye permission ban jayegi." },
                { title: "5. Ek Hafte Ka Plan", note: "Order AI chune, lekin paid resource se pehle poochay. Har link ko day 1 se pehle check karo, day 1 pe nahi." },
                { title: "6. Aapka Apna Subject", note: "Concept 1 ka subject wapis lo, ya jo pehle skip kiya. Poori 6-line brief zero se likho, phir apne running job ke sath compare karo." },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Delegation Record: Copy Karo</SubHeading>
            <P>
              Ek page jo aap ship karte ho, apni running job ke liye,
              us kaam se bhara jo aap already kar chuke ho.
            </P>
            <PromptBox>{`DELEGATION RECORD

Job: ______________________________________  Date: __________

THE BRIEF
Outcome:
Context:
Constraints:
Authority:
Deliverable:
Verification:

THE RUN
Assistant used:                       Messages needed:
Plan asked for first?  yes / no       Plan changed by me?  yes / no
Where it drifted, and the move that fixed it:

THE CHECK
Claim 1 that mattered:            Source opened:         Finding:
Claim 2 that mattered:            Source opened:         Finding:
Anything AI marked "unverified":

THE DECISION
Accept / Correct / Investigate / Reject, and the one sentence behind it:

THE SECOND RUN
Assistant:            Finished?    Brief changed?    Where the results differed:

WHAT I WILL SAVE FOR NEXT TIME
Lines that did not change:`}</PromptBox>
            <Callout label="Ek Blank Line Bhi Ek Finding Hai">
              Agar koi line khali hai, matlab loop ka wo step abhi is
              job ke liye hua hi nahi. Isay khali chhod do, guess mat
              karo, aur wahi missing step aap ka agla kaam hai.
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
                ["Delegation Loop", "AI ko job dene ka 6-step rhythm: define, delegate, observe, intervene, verify, accept"],
                ["Delegation Brief", "AI shuru karne se pehle answer kiye 6 sawal: outcome, context, constraints, authority, deliverable, verification"],
                ["Outcome", "Jo kaam khatam hone pe exist hona chahiye"],
                ["Context", "Jo AI khud nahi jaan sakta, aap ke ya job ke baare mein, kisi bhi source samet jo aap dete ho"],
                ["Constraints", "Wo requirements aur limits jo job pe apply hoti hain"],
                ["Authority", "AI bina poochay kya decide kar sakta hai, chat mein decisions, baad mein permissions"],
                ["Deliverable", "Result ki wo form jo koi use kar sake: table, document, file"],
                ["Verification", "Jo aap accept karne se pehle check karenge, kaam shuru hone se pehle likha gaya"],
                ["Running job", "Wo ek job jo aap poore chapter mein saath le kar chale, har concept pe ek line ke sath dobara delegate hui"],
                ["Need first, then tool", "Rule har control ke liye: seekho jab job maange, pehle se nahi"],
                ["Plan-first", "AI se poochna ke steps list kare aur go-ahead ka wait kare, shuru karne se pehle"],
                ["Project", "Ek space jo aapki files aur standing instructions rakhta hai, taake us ke andar har chat pehle se informed shuru ho"],
                ["Knowledge", "Wo files jo Project rakhta hai, jo AI Project ke har chat mein parh sakta hai"],
                ["Standing instruction", "Ek rule jo ek baar Project mein likha jata hai, jise AI us Project ke har chat mein follow karta hai"],
                ["Temporary chat", "Ek chat jo history mein save nahi hoti aur memory mein add nahi hoti, ChatGPT isay ye naam deta hai, Claude isay incognito chat kehta hai"],
                ["Identify, Trace, Challenge, Decide", "Verify step ke andar ke 4 steps"],
                ["Accept, Correct, Investigate, Reject", "Verification jin 4 decisions pe khatam hoti hai"],
                ["Delegation Record", "Ek job ka one-page record: brief, run, check, decision"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;Just Delegate It&rdquo; crash course par based
              hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/just-delegate-it-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/just-delegate-it-crash-course
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
                  q: "Sana poochti hai \"CV banane ke best free tools kya hain\" aur achhi list milti hai, phir wo har tool khol kar khud compare karti hai. Kaunsa step wo delegate kar sakti thi?",
                  a: "Comparison khud, kyunke sawal ne advice di, kaam wahi reh gaya. Ek job, \"3 free CV tools ek table mein links ke sath compare karo\", ye kaam bhi move kar deti.",
                },
                {
                  q: "Bilal ek recipe deta hai: \"2 job sites pe jao, 10 newest listings kholo, salary copy karo, average batao.\" Table neat aati hai. Sabse likely problem kya hai?",
                  a: "Usne recipe di, isliye result sirf unki chuni 2 sites ki quality tak limited hai, aur kuch bhi result mein ye nahi batata. Outcome dena (typical salary, sources ke sath) AI ko jagah dhoondne deta.",
                },
                {
                  q: "Ek brief mein outcome, context, constraints, aur deliverable hai, aur result ek paid course recommend karta hai bina bataye ke wo paid hai. Kaunsi missing line ye cause hui?",
                  a: "Authority. \"Clearly batao agar course paid hai\" authority pe ek limit hai. Bina us line ke AI ne khamoshi se decide kar liya, aur kabhi pata nahi chala ke decision hui.",
                },
                {
                  q: "Aisha ke result mein 3 courses confidently describe huay hain, koi link ya date nahi. Ye kya batata hai?",
                  a: "AI ne shayad apni yaad se jawab diya, search se nahi, isliye mat maano ke usne dekha. Agla step: usay search karwao, phir ek claim trace karo aur date dhoondo.",
                },
                {
                  q: "Usman ek notice paste karta hai aur 3 sawal poochta hai. Sab jawab fluent hain, aur ek jawab ek deadline batata hai jo notice mein nahi thi. Brief mein kya missing tha?",
                  a: "\"Sirf neeche wale text ka istemal karo\" aur \"jo quote ki wo sentence do\". Bina inke AI source ko apni yaad se mix kar deta hai, in ke sath \"not in the source\" sahi jawab ban jata.",
                },
                {
                  q: "Chat answer mein 2 \"unverified\" marks thi. One-page document mein koi nahi. Kya hua, aur reader kya kare?",
                  a: "Deliverables caveats kho dete hain, kyunke neat hona hi document ka purpose hai. Dono marks dhoondo aur document mein wapis daalo, bhejne se pehle.",
                },
                {
                  q: "Hira plan pehle maangti hai, approve karti hai, phir dekhti hai ke result mein ek naya source use hua jo plan mein nahi tha. Sahi response kya hai?",
                  a: "Har farq jo approved plan aur jo hua uske darmiyan hai, wo ek sawal hai poochne ke liye. Plan-first ek job ko observe karne ka tareeqa hai jo aap dekh nahi sakte, khamoshi se change hona hi wo failure hai jise ye pakadti hai.",
                },
                {
                  q: "Teesre hafte Omar wahi 2 paragraphs background paste kar raha hai apni weekly summary job se pehle. Course ye kis baat ka signal kehta hai?",
                  a: "Context ek Project ya saved note mein jana chahiye, taake job ko ek message chahiye, teen nahi. Teesri baar jab wahi background paste ho, wo kahin aur rakhne ka waqt hai.",
                },
                {
                  q: "Ek result ka ek figure galat hai. Reader reply karta hai \"poora dobara karo\". Course kaunsa move prefer karega, aur kyun?",
                  a: "Correct: galti ka naam lo aur uski jagah kya hona chahiye. Ek galat figure ek correction maangta hai, poora rewrite nahi, rewrite wo sab bhi phenk deta hai jo sahi tha.",
                },
                {
                  q: "Maryam ek hi brief 2 assistants mein same din chalati hai. Ek 2 messages mein khatam hui, doosri 4 mein. Wo likhti hai \"Assistant A behtar hai.\" Course kya kehta hai?",
                  a: "Uske paas ek din ke 2 runs ka observation hai, ranking nahi. Models itni tezi se badalte hain ke ek din ki runs unhe rank nahi kar sakti. Job uski hai, model replaceable hai.",
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
