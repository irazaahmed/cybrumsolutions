import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  DoorOpen,
  FileText,
  Gauge,
  Layers,
  ListChecks,
  MessageSquare,
  TrendingDown,
  Undo2,
  UserCheck,
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

const chapter = chapters.find((c) => c.slug === "workflow-design-diagnosis")!;
const prevChapter = getPrevLiveChapter("workflow-design-diagnosis");
const nextChapter = getNextLiveChapter("workflow-design-diagnosis");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "Delegation map kaise banayein, kaunsa step AI ko dena hai kaunsa human ko, bad output ko diagnose kaise karein, aur fix ko permanent kaise banayein, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/workflow-design-diagnosis" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/workflow-design-diagnosis`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Do Teams, Ek Assistant", level: 2 },
  { id: "part1", text: "Part 1 · Design The Work", level: 2 },
  { id: "part2", text: "Part 2 · The Delegation Map", level: 2 },
  { id: "part3", text: "Part 3 · Build It, Aur Dekho", level: 2 },
  { id: "part4", text: "Part 4 · Jab Ye Bigadta Hai", level: 2 },
  { id: "part5", text: "Part 5 · Fix Ko Permanent Banao", level: 2 },
  { id: "part6", text: "Part 6 · Operate Karo, Explain Karo", level: 2 },
  { id: "recap", text: "Recap", level: 2 },
  { id: "practice", text: "Practice: 5 Prompts", level: 2 },
  { id: "projects", text: "Project + One-Page Map", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function HabitVsWorkflowDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <MessageSquare size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">&ldquo;Main AI Use Karta Hoon&rdquo;</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Personal habit hai. Aapke mood aur waqt se badalti hai, jab aap
            leave pe ho, ghayab ho jati hai.
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <Layers size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">&ldquo;Hamara Workflow AI Use Karta Hai&rdquo;</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Repeatable process hai jo team chalati hai, AI named steps
            karta hai har baar, wahi tareeke se, keyboard pe koi bhi ho.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Sirf doosra wala compound hota hai. Sirf doosra wala aisi tarah
        galat ho sakta hai jo galat rehti chali jaye
      </figcaption>
    </figure>
  );
}

function ThreeCriteriaDiagram() {
  const items = [
    { icon: Undo2, t: "Reversibility", d: "Kya AI galat kare to undo ho sakta hai? Draft dobara likh sakte ho, bheja hua email nahi" },
    { icon: Gauge, t: "Stakes", d: "Bad case mein galti ki cost kya hai? Average case nahi, worst case" },
    { icon: UserCheck, t: "Accountability", d: "Kya ye step khud wo decision hai jiska jawab dena hai, ya sirf ek input hai jo koi aur judge karega?" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
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
        Score add nahi karte, 3 mein se usually ek decide karta hai, baaki
        do agree karte hain, jahan ye disagree karein wahan sabse strict
        jeetta hai
      </figcaption>
    </figure>
  );
}

function MappingErrorsDiagram() {
  const items = [
    { icon: ArrowUpRight, t: "Halo Delegation", d: "Step AI ko diya kyunke pichla step acha gaya, competence real thi, lekin doosre step ki thi" },
    { icon: DoorOpen, t: "Unstaffed Gate", d: "\"AI draft, human review\" tab tak collaborative hai jab tak koi actually review kare, warna ye ek automated step hai" },
    { icon: Wrench, t: "Mapping The Tool", d: "Team us feature ke around workflow banati hai jo unhe pasand hai, kaam ke around nahi" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
              <Icon size={16} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Galat maps false statements se nahi bantay, sahi statements ke
        galat step pe apply hone se bantay hain
      </figcaption>
    </figure>
  );
}

function FourCausesDiagram() {
  const items = [
    { icon: FileText, t: "Under-specification", d: "Pehli response se hi galat, prompt ne kabhi zaroori cheez di hi nahi" },
    { icon: TrendingDown, t: "Context Overload", d: "Session shuru mein sahi thi, phir badhte badhte degrade ho gayi" },
    { icon: AlertTriangle, t: "Wrong Feature Ya Model", d: "Ek specific, repeatable error type, poori tarah ganda nahi" },
    { icon: Calendar, t: "Stale Configuration", d: "\"Pehle kaam karta tha\", kuch setup ke andar drift ho gaya hai" },
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
        Timing free information hai, aap ke paas already hai, ye batati
        hai kahan pehle dekhna hai
      </figcaption>
    </figure>
  );
}

function ThreeHomesDiagram() {
  const items = [
    { icon: MessageSquare, t: "Rule → Standing Instruction", d: "Kuch jo hamesha apply hona chahiye, behaviour badalta hai" },
    { icon: BookOpen, t: "Reference → Knowledge Base", d: "Material jo har run ko dekhna chahiye, kya pata hai wo badalta hai" },
    { icon: Wrench, t: "Procedure → Skill", d: "Ek repeatable sequence with steps, kaam kaise hota hai wo badalta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
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
        Test: kya ye correction dobara chahiye hogi, mujhe ya kisi aur ko?
        Agar haan, configuration mein jani chahiye
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
  url: `${site.url}/anthropic-exam-prep/workflow-design-diagnosis`,
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

export default function WorkflowDesignDiagnosisChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke Workflow
              Integration and Solution Design aur Troubleshooting and
              Optimization domains ke liye foundation hai
            </p>
            <CoreIdea>
              2 teams ne same AI assistant same kaam ke liye use kiya:
              contract review. Pehli team ne kaam step-by-step map kiya, AI
              clauses nikalta, playbook se departures flag karta, redline
              draft karta, aur ek lawyer har change approve karta, review
              time aadha ho gaya, quality wahi rahi. Doosri team ne AI ko
              poore process pe laga diya, drafting acha tha isliye low-risk
              clauses unsupervised approve karne diye, ek mahine mein ek
              approved clause ne aisi obligation bana di jo kisi ne nahi
              pakdi, aur team ne tool hi hata diya. Same product, same
              process, same model. Farq sirf ye tha ke kaunse steps kisne
              handover kiye.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <PullQuote>Output verdict nahi hai.</PullQuote>
            <P>
              Ek achha result ye nahi batata ke step handover karna safe
              tha. Ek bura result ye nahi batata ke kaam ho hi nahi sakta.
              Jo batata hai wo neeche ki structure hai: ye kaunsa step tha,
              galat hone pe kya cost hai, iska jawab kaun deta hai, aur
              symptom kab shuru hua.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Poora Course, Ek Minute Mein</SubHeading>
            <RecapTable
              head={["Stage", "Wo Sawal Jo Decide Karta Hai"]}
              rows={[
                ["Design", "Asal requirements kya hain, aur kaunse numbers compute hone chahiye?"],
                ["Map", "Is step ke liye: undo ho sakta hai? Error ki cost kya hai? Jawab kaun deta hai?"],
                ["Build", "Ye abhi bhi prompt-and-iterate loop mein fit hota hai, ya ye usse bada ho gaya?"],
                ["Diagnose", "Symptom sabse pehle kab dikha?"],
                ["Persist", "Ye fix ek rule hai, ek reference hai, ya ek procedure hai?"],
                ["Communicate", "Ye kya karta hai, aur human gate exactly kahan hai?"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Design The Work Before You Place The Tool</PartBanner>
            <SubHeading>1. Unit Of Value Hai Step, Session Nahi</SubHeading>
            <P>
              &ldquo;Main AI use karta hoon&rdquo; aur &ldquo;hamara
              workflow AI use karta hai&rdquo; mein farq hai:
            </P>
            <HabitVsWorkflowDiagram />
            <P>
              Isi liye is course ka unit <Strong>step</Strong> hai, session
              nahi. Session wo cheez hai jise aap baad mein judge karte ho,
              result achha laga ya nahi. Step wo cheez hai jiska decision
              aap pehle se lete ho, un grounds pe jo output achha lagne se
              nahi badalte. Opening ki 2 teams ke paas same product tha,
              farq ye tha ke ek ne step-level decisions liye, doosri ne
              session-level judgement.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>2. Requirements Nikaalo, Phir Attack Karo</SubHeading>
            <P>
              Real kaam kabhi clean brief se shuru nahi hota, 40-page
              document, adhoore emails, aur meeting mein kisi ki kahi hui
              baat se hota hai. Kuch banane se pehle, ye <Strong>
              requirements</Strong> banni chahiye: specific, traceable,
              testable. Ye 5 cheezein settle honi chahiye:
            </P>
            <CheckList
              items={[
                "Kya produce ho raha hai",
                "Kiske liye",
                "Kitni baar chalta hai",
                "Kaunse data se",
                "Kaunse format mein",
              ]}
            />
            <Callout label="Ehtiyat" tone="warn">
              &ldquo;Report month-end ke baad promptly deliver honi
              chahiye&rdquo; ek requirement lagti hai, hai nahi. 2 din aur 2
              hafte dono kisi ke liye &ldquo;prompt&rdquo; hain, isliye 2
              teams 2 alag processes banate hain aur dono believe karte hain
              ke unhe wahi bataya gaya tha. Test: agar aap ye nahi keh
              saktay ke kaunsa evidence prove karega ke requirement poori
              hui, wo abhi decidable nahi hai, chahe wo kitni bhi specific
              lage.
            </Callout>
            <P>
              Summary mat maango, structure maango, aur ek{" "}
              <Strong>source column</Strong> maango, isse koi bhi jo room
              mein nahi tha list check kar sakta hai. Extraction sirf
              pehla pass hai, trustworthy wala nahi, jo requirements
              teams ko bid haraati hain wo shayad hi seedhe likhi hoti
              hain, wo ek subordinate clause mein baithi hoti hain,
              extraction ye dhoondti hai jo likha gaya tha, wo nahi jo
              matlab tha, isliye extract karne ke baad, apni hi list
              review karwao.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3. Plan Utni Hi Achi Hai Jitne Uske Neeche Ke Numbers</SubHeading>
            <P>
              Planning kaam mein 2 cheezein milti hain jinhe AI bilkul
              alag tarike se handle karta hai. <Strong>Synthesis</Strong>{" "}
              (considerations gather karna, options structure karna) AI
              achi karta hai. <Strong>Calculation</Strong> alag hai, is
              wajah se nahi ke model add nahi kar sakta, wo kar sakta hai,
              problem ye hai ke page pe aap bata nahi sakte ke usne kiya
              ya nahi. Ek likha hua figure aur ek calculate kiya hua figure
              identical dikhte hain.
            </P>
            <PullQuote>
              Agar ek result matter karta hai, usay compute karo. Kabhi
              likho mat.
            </PullQuote>
            <P>
              Data upload karo aur numbers <Strong>code execution</Strong>{" "}
              se produce karwao, sentence mein likhwane ki bajaye. Guessed
              utilisation rate pe bani staffing plan sirf table mein ek
              guess hai. Wahi plan actual timesheet data ke computed
              analysis pe bani ho to har line se defend ho sakti hai,
              kyunke har line ek calculation tak trace hoti hai jise koi
              bhi dobara chala sakta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4. AI Ka Insight Kahan Actually Plan Badalta Hai</SubHeading>
            <P>
              Ek operations lead ne poori capacity plan ek hi request mein
              maangi: ticket data analyse karo, growth trend nikalo, agle
              quarter ka headcount recommend karo. Jawab well-structured
              tha aur 3 analysts hire karne ki recommend kar raha tha. Team
              2 hafte pehle announce hui hiring freeze mein thi. Trend
              analysis theek tha, recommendation usi se follow hui, plan
              useless is liye tha kyunke ek step ko aisi input chahiye thi
              jo dataset mein kahin nahi thi: ek meeting ka decision.
            </P>
            <RecapTable
              head={["Step Type", "Chalta Kaise Hai"]}
              rows={[
                ["Synthesis steps", "Us information pe chalte hain jo aap supply kar sakte ho, achi tarah delegate hote hain"],
                ["Judgement steps", "Us information pe chalte hain jo supply nahi ho sakti (risk appetite, hiring freeze, CFO kis department ko bacha raha hai), human hi rehte hain"],
              ]}
            />
            <Callout label="Window Test">
              &ldquo;Kya main is step ki har zaroorat window mein daal
              sakta hoon? Agar nahi, ye step mera hai.&rdquo; Ye test pass
              karna step ko AI ke liye <Strong>eligible</Strong> banata
              hai, kabhi <Strong>owned</Strong> nahi, eligible step ko bhi
              Part 2 ke 3 criteria se guzarna parta hai.
            </Callout>
            <P>
              Research bhi ek synthesis step hai, isi liye window test
              usay bhi lagta hai, lekin ek alag tarah fail hoti hai: model
              ka knowledge ek date pe rukta hai, us ke baad ki har cheez
              window ke bahar hai:
            </P>
            <RecapTable
              head={["Sawal Kis Baare Mein Hai", "Jawab Kahan Se Aana Chahiye"]}
              rows={[
                ["Ek stable concept ya method", "Model ka apna knowledge theek hai"],
                ["Kuch bhi current, priced, ya dated", "Ek external source jise aap khol saktay ho, sirf answer nahi, link bhi maango"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · The Delegation Map</PartBanner>
            <P>Ye course ka core hai. Har step 3 decisions leta hai:</P>
            <Flow
              steps={[
                "Eligibility: kya AI ye touch kar sakta hai? (data allowed hai, aur har zaroorat supply ho sakti hai)",
                "Ownership: iska owner kaun hai? (reversibility, stakes, accountability)",
                "Implementation: ise kaun carry karta hai? (sirf un steps ke liye jo pehle 2 pass karein)",
              ]}
            />
            <Callout label="Ehtiyat" tone="warn">
              Teesra decision doosre mein mat mix karo. &ldquo;Ye compute
              hona chahiye&rdquo; sach hai, aur implementation column mein
              jata hai. Ye AI ko step handover karne ki wajah nahi hai, aur
              isay wajah banana hi wo tareeqa hai jis se ek high-stakes
              calculation unreviewed reh jati hai.
            </Callout>
            <RecapTable
              head={["Step Kya Hai", "Kaun Carry Karta Hai"]}
              rows={[
                ["Fixed steps wali repeatable procedure", "Skill"],
                ["Rules aur reference jo step ko hamesha chahiye", "Project knowledge"],
                ["Ek calculation jis pe output depend karta hai", "Code execution"],
                ["Har output pe ek standing constraint", "Standing instruction"],
                ["Ek step jiska owner insaan hai", "Ek named review gate"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>5. 3 Criteria Har Step Decide Karte Hain</SubHeading>
            <P>
              AI ke sath redesign karne se pehle, steps order mein likho
              aur har ek ko classify karo: <Strong>AI-appropriate</Strong>,{" "}
              <Strong>human-retained</Strong>, ya <Strong>collaborative</Strong>.
            </P>
            <ThreeCriteriaDiagram />
            <Callout label="Note">
              Ye deliberately absent hai: <Strong>test run mein AI ne
              kitna achha kiya</Strong>, ye criterion nahi hai. Sabse
              relevant fact lagta hai aur sabse zyada misguide karta hai
              (Concept 7 mein wajah).
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6. Do Workflows, Same Criteria, Alag Answers</SubHeading>
            <P>Contract review, poori tarah mapped:</P>
            <RecapTable
              head={["Step", "Owner", "Criterion", "Carried By"]}
              rows={[
                ["Clauses extract karo", "AI", "Reversible, low stakes", "Skill"],
                ["Playbook departures flag karo", "AI", "Reversible, error redline pe surface hota hai", "Skill"],
                ["Redline aur rationale draft karo", "Collaborative", "High stakes, human har edit judge karta hai", "Skill + gate"],
                ["Penalty clause ka financial exposure compute karo", "AI", "Reversible, aur approval gate pe check hota hai", "Code execution"],
                ["Har change approve/reject karo", "Human", "Ye step khud wo decision hai jiska jawab dena hai", "Named reviewer"],
                ["Sign aur send karo", "Human", "Irreversible aur externally binding", "Named signer"],
              ]}
            />
            <P>
              Penalty-exposure row pe gauro se dekho, arithmetic hona step
              ko low-stakes nahi banata, wo delegable is liye hai kyunke
              result reversible hai aur agli row mein hi ek human ke
              saamne aata hai. Approval gate hata do, ye step AI-appropriate
              nahi rehta, chahe arithmetic wahi rahe.
            </P>
            <P>
              Playbook row bhi same logic pe chalti hai, wo yahan
              AI-appropriate is liye hai kyunke koi agli row mein flags
              parhta hai. Wahi step ek workflow mein daalo jahan koi flags
              nahi parhta, wo collaborative ho jati hai. Step nahi badla,
              ye badla ke koi uske baad khada hai ya nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>7. Map Galat Hone Ke 3 Tareeke</SubHeading>
            <P>
              Opening ki doosri team careless nahi thi, unhone hafton AI
              ko achi redlines draft karte dekha, phir easy clauses
              approve karne diye. Ye evidence ka reasonable response hai.
              Ye ek workflow ke liye risk kamane ka sabse common tareeqa
              bhi hai.
            </P>
            <MappingErrorsDiagram />
            <PullQuote>
              Drafting quality draft ke baare mein evidence hai. Decision
              ke baare mein evidence nahi hai.
            </PullQuote>
            <Callout label="Yaad Rakho">
              Agar is course se ek habit lo, to ye lo: gates jo maine
              design kiye, kya wo actually abhi bhi staffed hain?
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>8. Map Ka Owner Kaun Hai</SubHeading>
            <P>
              Ek delegation map ek dafa likhi jati hai, phir chupke se
              galat ho jati hai, kyunke workflow uske neeche move ho gaya.
              Ek step add hua, ek reviewer ka role badla, quarterly volume
              double ho gaya. 3 controls isi tarah decay karte hain, koi
              signal diye bina:
            </P>
            <RecapTable
              head={["Kya Decay Karta Hai", "Failure Ke Waqt Signal"]}
              rows={[
                ["Ek review gate", "Koi nahi"],
                ["Ek standing instruction", "Koi nahi"],
                ["Khud map", "Koi nahi"],
              ]}
            />
            <P>
              Iska sirf ek countermeasure hai: <Strong>ek scheduled
              read</Strong>. Map pe 2 cheezein likhi honi chahiye: ek{" "}
              <Strong>owner</Strong> (ek named person, team nahi), aur ek{" "}
              <Strong>review date</Strong> (quarterly default hai). Review
              4 sawalon mein 20 minute leta hai:
            </P>
            <CheckList
              items={[
                "Koi step add ya remove hua hai jo map pe nahi hai?",
                "Har collaborative step ke liye: pichle hafte kisne review kiya, kitna waqt diya? Agar koi jawab nahi de sakta, step automated ho chuka hai",
                "Kya volume ya stakes badle hain?",
                "Kya har configuration jis pe map depend karta hai abhi bhi current hai?",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Build It, Aur Dekho</PartBanner>
            <SubHeading>9. Loop: Ideate, Prototype, Feedback, Refine</SubHeading>
            <P>
              AI ek design collaborator hai, vending machine nahi. Solution
              ek dafa maang ke nahi milta, loop chala ke milta hai, aur ise
              ek Project ke andar chalao takay context stable rahe.
            </P>
            <Flow
              loop
              steps={["Ideate: options banao", "Prototype: ek option concrete banao", "Feedback: jo galat hai wo saamne aaye", "Refine: usay fix karo"]}
            />
            <P>
              Ek team ne 3 cycles mein bina code likhe ek dashboard artifact
              banaya. Cycle 1 mein sab kaam kar gaya. Cycle 2 mein date
              filter aur totals row maangi, filter theek tha, totals
              galat, subtle tarike se, kyunke totals <Strong>likhe</Strong>{" "}
              gaye the, <Strong>compute</Strong> nahi hue the. Cycle 3
              (colour, print layout) pehli baar mein kaam kar gaya.
            </P>
            <Callout label="Farq Samjho">
              Cycle 3 ek description problem thi, behtar describe karne se
              solve ho gayi. Cycle 2 ek feature problem thi, kitna bhi
              describe karo wo solve nahi hoti, kyunke jo maanga gaya tha
              wo prose ki cheez nahi thi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>10. Jab Ye Prompt-and-Iterate Se Bahar Nikal Jaye</SubHeading>
            <P>
              Wahi dashboard 6 mahine baad 3 departments har Monday khol
              rahe hain, aur ek board pack mein numbers ja rahe hain. Ye ab
              ek alag cheez hai, aur kisi ne decide nahi kiya ke ye ho.
            </P>
            <RecapTable
              head={["Signal", "Matlab", "Kahan Jao"]}
              rows={[
                ["Doosre log ab is pe depend karte hain", "Ye infrastructure hai, engineering chahiye", "Developer ya architect expertise"],
                ["Maine ye same tareeke se 3 dafa solve kiya", "Shape stable hai, manufacture ho sakta hai", "From One-Off to Worker chapter"],
              ]}
            />
            <P>
              <Strong>Dependency escalation signal hai.</Strong> Jis waqt
              doosre log kisi cheez ko infrastructure ki tarah rely karte
              hain, usay uptime, access control, aur ek fixed guarantee
              chahiye hoti hai, ye prompt-and-iterate ka kaam nahi rehta.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · Jab Ye Bigadta Hai</PartBanner>
            <SubHeading>11. 4 Causes, Timing Se Pehchano</SubHeading>
            <P>
              Jab output disappoint kare, log 2 unproductive kaam karte
              hain: tool ko impossible declare karte hain, ya random words
              badalte rehte hain. Dono ek hi sawal skip karte hain:{" "}
              <Strong>symptom sabse pehle kab dikha?</Strong>
            </P>
            <FourCausesDiagram />
            <RecapTable
              head={["Symptom Kab Dikha", "Pehla Hypothesis", "Cheap Confirmation", "Fix"]}
              rows={[
                ["Pehli reply se hi galat", "Under-specification", "Prompt dobara parho, kya missing cheez usme hai?", "Jo chhoot gaya wo add karo"],
                ["Shuru sahi tha, phir kharab hua", "Context overload", "Fresh session mein instruction dobara likho, hold karti hai?", "Restart ya summarize karo"],
                ["Ek repeatable error type", "Wrong feature/model", "Sahi feature ya stronger tier se ek dafa chalao", "Feature ya tier badlo"],
                ["Pehle kaam karta tha, ab nahi", "Stale configuration", "Instruction ya knowledge source ki date check karo", "Configuration maintain karo"],
              ]}
            />
            <Callout label="Ehtiyat" tone="warn">
              Stale configuration khamosh se fail hoti hai, koi error
              nahi, koi warning nahi. Isi liye ye unstaffed gate ka twin
              hai, dono controls jo sahi set up huay the, sabke assume
              karte hue ke wo abhi bhi hold kar rahe hain, decay karte
              hain. Scheduled review se milte hain, notice karne se nahi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>12. Sequence Sabse Sasta Pehle Chalta Hai</SubHeading>
            <Ladder
              steps={[
                { title: "Prompt Dobara Parho", note: "5 components ke against check karo: role, context, task, constraints, output format" },
                { title: "Conversation Length Check Karo", note: "Context overload ho sakta hai, restart ya summary chahiye" },
                { title: "Feature Aur Model Check Karo", note: "Kya ye ek calculation hai jise code execution chahiye, ya complex task jo speed tier pe hai?" },
                { title: "Configuration Check Karo", note: "Kya instructions, knowledge, aur Skills current hain?" },
                { title: "Sirf Ab, Task Fit Pe Sawal Uthao", note: "Sabse expensive conclusion, sirf tab jab upar wale 4 rule out ho chuke hon" },
              ]}
            />
            <Callout label="Reversal">
              Zyada log ulta karte hain, sabse capable model pe switch
              karte hain ya task ko impossible declare karte hain, ladder
              ke neeche se, upar kuch check kiye bina. Dono aksar zaroori
              nahi hotay.
            </Callout>
            <RecapTable
              head={["Complaint", "Diagnosis", "Fix"]}
              rows={[
                ["Summary key points miss karti rehti hai", "Under-specification", "\"Key\" ke criteria naam do"],
                ["Format aadhe mein follow karna chhod diya", "Context overload", "Summary se restart karo, ya format persist karo"],
                ["Numbers subtly galat hain", "Wrong feature", "Calculation ko code execution mein le jao"],
                ["Pehle mahine sahi thi, ab off hai", "Stale configuration", "Instructions aur knowledge sources audit karo"],
                ["Agle quarter ka exact figure predict nahi kar sakti", "Expectation mismatch", "Task ko reshape karo (range + assumptions maango)"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 5 ---------------------- */}
        <section id="part5" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 5 · Fix Ko Permanent Banao</PartBanner>
            <SubHeading>13. Reaction Ko Instruction Mein Badlo</SubHeading>
            <P>
              Ek <Strong>reaction</Strong> batati hai output kaisa laga
              (&ldquo;too generic&rdquo;). Ek <Strong>instruction</Strong>{" "}
              batati hai kya badle takay agla output different ho. Ek
              sawal se jump lagti hai: <Strong>exactly kya present hona
              chahiye takay ye sahi ho, aur setup ka kaunsa hissa usay
              control karta hai?</Strong>
            </P>
            <RecapTable
              head={["Reaction", "Instruction", "Kaunsa Lever"]}
              rows={[
                ["\"Too generic\"", "Audience naam do aur wo ek action jo unse chahiye", "Prompt"],
                ["\"Wrong tone\"", "Ek tone constraint add karo jo har draft pe apply ho", "Standing instruction"],
                ["\"Point miss kar diya\"", "Wo ek sawal batao jo output ko answer karna chahiye, shuru mein", "Prompt"],
                ["\"Purana data use ho raha hai\"", "Knowledge base mein source document replace karo", "Knowledge"],
              ]}
            />
            <Callout label="Ehtiyat">
              Agar lever naam nahi le sakte, critique abhi bhi ek reaction
              hai, aur agli koshish ek revision jaisi dikhne wali guess
              hogi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>14. Rule, Reference, Ya Procedure</SubHeading>
            <P>
              Fix dhoondna aasan hissa hai. Mehnga failure use dhoond ke
              wapis kho dena hai. Test chhota hai: <Strong>kya ye
              correction dobara chahiye hogi, mujhe ya kisi aur ko?</Strong>{" "}
              Agar haan, configuration mein jani chahiye.
            </P>
            <ThreeHomesDiagram />
            <Callout label="2 Log, Ek Habit Ka Farq">
              Ek marketer notice karti hai ke har brief target segment miss
              karti hai, aur wo 2 standing instructions likh deti hai, ab
              sab ke liye theek. Ek analyst har mahine chat mein reminder
              type karta hai (cancelled orders exclude karo), 2 hafte leave
              pe jata hai, colleague report chalata hai, cancelled orders
              wapis andar hain. Fix hamesha se maujood tha, failure ye thi
              ke wo sirf ek jagah rakha tha jo sirf ek insaan dhoond sakta
              tha.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>15. Optimize Karne Se Pehle Friction Dhoondo</SubHeading>
            <RecapTable
              head={["Signal", "Kaisa Dikhta Hai", "Fix"]}
              rows={[
                ["Repetition", "Har run mein wahi cheez paste/type karte ho", "Saved context ya standing instruction"],
                ["Correction", "Har output mein wahi flaw fix karte ho", "Configuration change"],
                ["Variance", "Alag log same task chala kar alag results paate hain", "Shared Skill ya knowledge base"],
              ]}
            />
            <P>
              Variance wo hai jo teams miss karti hain, kyunke koi
              individually experience nahi karta, sab ka apna output
              consistent hai, inconsistency sirf logon ke darmiyan hai,
              isliye ye reviewer pe dikhti hai, source pe nahi.
            </P>
            <CheckList
              items={[
                "Consolidate: jo steps saath chal saktay hain unhe saath chalao, 3 separate prompts jo same background maangte hain, ek prompt hain",
                "Promote: repeated pattern ko configuration mein le jao (Concept 14)",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>16. Wo Cheez Measure Karo Jo Actually Matter Karti Hai</SubHeading>
            <P>
              <Strong>Pehle baseline measure karo.</Strong> Ek workflow ko
              badalne se pehle ek dafa chalao aur 3 numbers record karo:
              kitna waqt laga, kitne revision rounds chahiye huay, kitne
              manual steps kiye. Baseline ke baghair aap ke paas ek
              improvement hai jis pe yaqeen hai lekin bata nahi sakte.
            </P>
            <RecapTable
              head={["Workflow Agar...", "Optimize Karo Iske Liye"]}
              rows={[
                ["Internal draft hai", "Time (speed hi point hai)"],
                ["Customer-facing report hai", "Consistency"],
                ["Compliance/finance output hai", "Accuracy"],
                ["Kai logon ka mila jula kaam hai", "Variance"],
              ]}
            />
            <CheckList
              items={[
                "Naya workflow purane ke sath parallel run karo 2-3 cycles ke liye, evidence aur ek fallback milta hai",
                "Cost bata sako: usage cost + baaki insaan ka waqt (jo gates aap ne rakhe), saving = baseline × frequency × log, ek sentence jis pe manager act kar sake",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 6 ---------------------- */}
        <section id="part6" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 6 · Operate Karo, Explain Karo</PartBanner>
            <SubHeading>17. Jab Bad Output Bahar Nikal Jaye</SubHeading>
            <P>
              Ek gate ek busy Friday pe skip ho jati hai, configuration
              stale ho jati hai. Design karne wale ne pehle se ye 4 cheezein
              decide karni chahiye:
            </P>
            <Ladder
              steps={[
                { title: "1. Ye Kaise Ruke", note: "Sabse tez tareeqa workflow rokne ka kya hai, kaun rok sakta hai, kya unhe permission chahiye?" },
                { title: "2. Kya Already Bahar Ja Chuka Hai", note: "Ek output nahi, kitne outputs affect huay, kahan gaye?" },
                { title: "3. Kisay Batana Hai, Kab Tak", note: "Customer, internal owner, risk/compliance function, ye pehle se decide karo" },
                { title: "4. Map Mein Kya Badalta Hai", note: "Har incident design ke baare mein diagnostic data hai, map ko date ke sath update karo" },
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>18. Bolo Ye Kya Karta Hai, Phir Gate Ka Naam Lo</SubHeading>
            <P>3 phrases chupke se overstate karti hain:</P>
            <CheckList
              items={[
                "\"Fully automated\" — almost kabhi sach nahi, pehla visible error isay public expose karta hai",
                "\"AI handles X\" — sentence se human gate hi gayab kar deta hai",
                "\"It's basically as good as a person\" — ek standard set karta hai jo tool aakhir kaar miss karega",
              ]}
            />
            <Callout label="Repair">
              Har baar wahi hai: pehle batao tool kya karta hai, phir
              human checkpoint ka naam lo. Ek extra sentence, aur farq hai
              ek claim jo defend ho sakti hai aur ek jo nahi.
            </Callout>
            <P>Same workflow, 3 audiences ko 3 tareeke se:</P>
            <RecapTable
              head={["Kisay", "Kya Chahiye"]}
              rows={[
                ["Legal lead", "Mechanism aur failure modes: \"Redline draft karta hai, approval hamesha aapki hai, obligation implied wali cheez miss kar sakta hai\""],
                ["Practice executive", "Outcome aur oversight: \"Turnaround 2 din se aadhe din hua hai, wahi approval standard\""],
                ["Client ka risk function", "Sirf control: \"Drafting AI-assisted hai, lawyer har term approve karta hai, sign-off ke bina kuch nahi jata\""],
              ]}
            />
            <PullQuote>
              Stakeholders ek AI workflow pe zyada trust karte hain, kam
              nahi, jab human checkpoints explicit hoon.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Poora Course, Compressed</SubHeading>
            <PullQuote>
              Output verdict nahi hai. Step ko us se judge karo jo wo cost
              karta hai aur jiska jawab dena hai, failure ko us se judge
              karo jab wo shuru hui.
            </PullQuote>
            <CheckList
              items={[
                "Unit step hai, session nahi, personal habit alag cheez hai team workflow se",
                "Requirements ko structure mein nikalo, source ke sath, phir apni hi list pe ambiguity dhoondo",
                "Jo result matter karta hai use compute karo, kabhi likho mat, window test se decide karo kaunsa step aapka hai",
                "Har step 3 decisions leta hai: eligibility, ownership (reversibility/stakes/accountability), implementation, teesra doosre mein mix mat karo",
                "3 mapping errors: halo delegation, unstaffed gate, mapping the tool instead of work, sab true statements se bantay hain, galat step pe",
                "Map ka ek named owner aur review date honi chahiye, scheduled read hi silent decay ka ilaj hai",
                "4 causes timing se pehchano: under-specification, context overload, wrong feature/model, stale configuration, diagnostic sequence sasta pehle chalta hai",
                "Reaction ko instruction mein badlo (lever naam lo), fix ko rule/reference/procedure mein promote karo",
                "Optimize karne se pehle baseline measure karo, sahi metric chuno, naye workflow ko parallel run karo",
                "Bad output nikalne se pehle 4 cheezein decide karo: stop, scope, tell, map change, aur audience ke hisab se human gate ka naam hamesha lo",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 5 Prompts</SubHeading>
            <P>Sab ek sitting mein karne ki zaroorat nahi.</P>
            <Ladder
              steps={[
                { title: "1. Extract Karo, Phir Attack Karo", note: "Ek real document se har requirement table mein nikalwao (label, source section, direct/implied), phir usi list ko dobara review karwao ambiguity ke liye." },
                { title: "2. Wo Step Dhoondo Jo Undo Nahi Ho Sakta", note: "Apna workflow do, sirf 3 sawal poochho: undo ho sakta hai? bad-case cost kya hai? ye decision hai ya input? Recommendation abhi mat maango." },
                { title: "3. Timing Se Diagnose Karo", note: "Agla disappointing output, fix karne se pehle: describe karo kya hua aur kab, AI se ek-ek sawal poochwao jab tak diagnosis na mile." },
                { title: "4. Ek Fix Promote Karo", note: "Ek correction dhoondo jo 2 se zyada dafa ki hai, poocho ye rule hai, reference hai, ya procedure, phir sahi format mein likhwao." },
                { title: "5. 3 Tareeke Se Bolo", note: "Apna workflow describe karo, phir technical, executive, aur risk audience ke liye 3 descriptions likhwao, har ek mein human checkpoint naam lo." },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ek Project: Map, Break, Fix, Explain</SubHeading>
            <P>Ek workflow, 6 hisse, roughly ek ghanta.</P>
            <Ladder
              steps={[
                { title: "1. Map Karo", note: "Real workflow ko table mein likho: step, owner, reason, har reason reversibility/stakes/accountability naam le." },
                { title: "2. Features Rakho", note: "Har AI step ke liye batao kaun carry karta hai (Skill, knowledge, code execution, standing instruction), har human step ke liye person aur moment naam lo." },
                { title: "3. Ek Step Real Mein Chalao", note: "Sabse mechanical AI step pe real input chalao." },
                { title: "4. Jaan Bujh Ke Todo", note: "Ek figure prose mein maango jo compute honi chahiye thi, jab plausible galat number aaye, fix karne se pehle Concept 11 se diagnose karo." },
                { title: "5. Ek Fix Promote Karo", note: "Step 3/4 mein jo correct kiya wo sahi home mein rakho." },
                { title: "6. Baseline Measure Karo", note: "Ek unchanged run: time, revision rounds, manual steps." },
                { title: "7. One-Page Map Bharo", note: "Owner, next review date, aur \"agar galat ho jaye\" wali 4 lines ke sath." },
                { title: "8. 3 Descriptions Likho", note: "Technical, executive, risk, har ek mein gate ka naam." },
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>One-Page Map: Copy Karo</SubHeading>
            <PromptBox>{`DELEGATION MAP: [workflow name]
Owner: [ek named person]        Last reviewed: [date]      Next review: [date]

ELIGIBILITY (dono pass hone chahiye)
Data gate: [kya ye data is tool mein ja sakta hai? kisne confirm kiya?]
Input gate: [kya har step ki har zaroorat supply ho sakti hai?]

STEPS
#  Step          Owner          Criterion              Carried by
1  ...           AI             reversible, low stakes  Skill
2  ...           AI             reversible, checked     code execution
3  ...           Collaborative  high stakes, human judges  Skill + gate
4  ...           Human          ye decision hai         named reviewer
5  ...           Human          irreversible            named signer

GATES (har collaborative/human step ke liye ek line)
Step 3: review [naam], [kab], check kar raha [kya specifically]
Step 4: approve [naam], se pehle [aage kya hota hai]

BASELINE (change se pehle measured)
Time per run: ___   Revision rounds: ___   Manual steps: ___
Metric jo ye workflow optimize karta hai: [time | consistency | accuracy | variance]

AGAR GALAT HO JAYE
Roka kisne: [kaun, aur bina permission act kar sakte hain?]
Scope check: [kaise pata chalega kitne outputs affect huay?]
Bataya kisay: [kaun, kitne waqt mein]
Map change: [yahan record, date ke sath]`}</PromptBox>
            <Callout label="3 Lines Jo Sabse Zyada Kaam Karti Hain">
              Owner, next review date, aur har gate pe &ldquo;exactly kya
              check ho raha hai&rdquo;. Inke bina map ek decision describe
              karta hai. Inke sath, ek operation describe karta hai.
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
                ["Delegation map", "Workflow jo step-by-step likha gaya ho, har step classified (AI-appropriate/human-retained/collaborative) ek reason ke sath"],
                ["Reversibility", "Kya step ko undo kiya ja sakta hai agar AI galat kare"],
                ["Stakes", "Bad case mein error ki cost"],
                ["Accountability", "Kya step khud wo decision hai jiska jawab dena hai, ya ek input jo koi named person judge karta hai"],
                ["AI-appropriate", "Step jo AI own kar sakta hai (reversible, low-stakes, ek input produce karta hai)"],
                ["Human-retained", "Step jo poori tarah insaan ka hai (irreversible, high-stakes, ya khud decision hai)"],
                ["Collaborative", "Step jahan AI produce karta hai aur ek named person judge karta hai"],
                ["Over-delegation", "AI ko utna dena jitna risk profile justify nahi karta"],
                ["Halo delegation", "Step AI ko dena kyunke pichla step acha gaya"],
                ["The unstaffed gate", "Collaborative step jiski review ab actually nahi ho rahi"],
                ["Under-specification", "Output pehli response se galat, kyunke prompt ne zaroori cheez di hi nahi"],
                ["Context overload", "Output jo session badhne ke sath degrade ho"],
                ["Stale configuration", "Output jo chupke se degrade hota hai kyunke ek configuration drift kar gayi"],
                ["Expectation mismatch", "Task jo maangta hai jo tool kar hi nahi sakta"],
                ["The diagnostic sequence", "Prompt, context length, feature/model, configuration, phir task fit, sasta pehle"],
                ["Promotion", "Ek fix ko conversation se nikal kar configuration mein le jana"],
                ["Rule, reference, procedure", "Test jahan promoted fix jaani chahiye: standing instruction, knowledge base, ya Skill"],
                ["Map owner", "Ek named person jo batay ke map abhi bhi asal workflow describe karta hai"],
                ["Scheduled read", "Map ki periodic review"],
                ["Baseline", "Workflow ki measurement, change se pehle"],
                ["Parallel run", "Purana aur naya workflow sath chalana, kuch cycles ke liye"],
                ["Escalation signal", "Doosre log ab kisi cheez pe depend karte hain, matlab wo prompt-and-iterate se bahar nikal gayi"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;Workflow Design &amp; Diagnosis&rdquo; crash course
              par based hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/workflow-design-diagnosis-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/workflow-design-diagnosis-crash-course
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
                  q: "Ek expense workflow ka step 3 total nikalta hai aur policy-limit se upar ka amount compute karta hai. Ye AI-appropriate hai ya human-retained, aur kaun carry karega?",
                  a: "AI-appropriate hai, kyunke total reversible hai aur approval step pe check hota hai, carried by code execution hai kyunke ye arithmetic hai. Numeric hona kabhi khud AI ko step dene ki wajah nahi hai, ye sirf implementation column decide karta hai.",
                },
                {
                  q: "Ek team ne 4 mahine acha drafting dekh kar low-value responses AI ko unsupervised send karne dene ka socha. Ye kaunsi mapping error hai?",
                  a: "Halo delegation. Sending irreversible aur external hai. Drafting quality draft ke baare mein evidence hai, is baare mein nahi ke unreviewed send safe hai.",
                },
                {
                  q: "Ek fresh chat mein pehli response hi galat hai, kuch degrade nahi hua. Timing kya batati hai?",
                  a: "Under-specification. Session fresh thi aur pehla jawab hi galat tha, isliye context ko fill hone ka waqt hi nahi mila, prompt ne zaroori cheez di hi nahi.",
                },
                {
                  q: "Ek personal checklist ab 3 account managers aur HR use kar rahe hain. Ye kya signal hai?",
                  a: "Escalation signal, dependency ka. Doosre log ab is pe depend karte hain, matlab uptime, access control, aur ek fixed guarantee chahiye, ye ab prompt-and-iterate ka kaam nahi raha.",
                },
                {
                  q: "3 coordinators ke updates individually consistent hain, lekin director har hafte unhe ek voice mein rewrite karta hai. Ye kaunsa friction signal hai?",
                  a: "Variance. Har insaan ka apna output consistent hai, inconsistency sirf logon ke darmiyan hai, isliye reviewer pe dikhti hai. Fix ek shared Skill hai jo sabko ek format de.",
                },
                {
                  q: "Ek disappointing output ke baad, first instinct sabse capable model pe switch karna hai. Diagnostic sequence iske baare mein kya kehti hai?",
                  a: "Ye ladder ke neeche se ek move hai, prompt aur context length check karne se pehle. Sequence sasta pehle chalti hai: prompt, context length, feature/model, configuration, phir task fit.",
                },
                {
                  q: "Contract review mein playbook-flag AI-appropriate hai, lekin expense workflow mein wahi tarah ka check collaborative ban jata hai. Kya decide karta hai?",
                  a: "Ye ke koi agli row mein flags parhta hai ya nahi. Contract review mein human turant redline pe flags dekhta hai, expense workflow mein koi downstream nahi re-read karta. Step nahi badla, ye badla ke koi uske baad khada hai ya nahi.",
                },
                {
                  q: "\"AI drafts, manager reviews\" map pe likha hai, lekin manager ab har Friday poori queue ek batch mein approve karta hai bina individual cases khole. Is step ki asal state kya hai?",
                  a: "Practically automated. Collaborative step jiski review ab nahi ho rahi wo automated step hai, chahe map abhi bhi collaborative likhe. Ye khamosh se hota hai kyunke map wo describe karta hai jo design kiya gaya, jo chal raha hai wo nahi.",
                },
                {
                  q: "Ek bad output bahar nikal jata hai. Design karne wale ne pehle se kaunse 2 decisions liye hone chahiye the?",
                  a: "Ye kaise rukega (kaun bina permission ke rok sakta hai), aur incident se map mein kya badlega. Baaki 2 (kya bahar gaya, kisay batana hai) response ke waqt decide hote hain, lekin ye 2 design time pe hi decide hone chahiye.",
                },
                {
                  q: "Client ke risk function ko workflow describe karte waqt sabse zyada trust kaunsi sentence kamati hai?",
                  a: "Wo jo control seedha bataye, jaise: \"Drafting AI-assisted hai. Ek qualified lawyer har term review aur approve karta hai, sign-off ke bina kuch nahi jata.\" Gate ko \"automatically\" ke peeche chupana pehla visible error ke waqt trust todta hai.",
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
