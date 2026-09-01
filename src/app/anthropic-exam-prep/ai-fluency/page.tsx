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

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "AI Fluency ke 4Ds, Delegation, Description, Discernment, Diligence, ka Agent Factory book se liya gaya, sahih Roman Urdu revision guide, self-test quiz ke saath.";

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
/*  lucide), not the book's original illustrations, to stay on-brand   */
/*  and to avoid reusing a third party's illustration design. Labels   */
/*  and captions are drawn directly from the source figure's alt text. */
/* ------------------------------------------------------------------ */

function FourQualitiesDiagram() {
  const items = [
    { icon: Target, t: "Effective", d: "Aap apne goal tak pahunch jate hain" },
    { icon: Gauge, t: "Efficient", d: "Waqt, mehnat ya tokens zaya nahi hote" },
    { icon: Scale, t: "Ethical", d: "AI ke kirdar ke baare mein sach aur insaaf se bataya jata hai" },
    { icon: ShieldCheck, t: "Safe", d: "Privacy aur ahem maloomat mehfooz rehti hai" },
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
        Ye chaar sifatein hain, aur 4Ds mein se har ek in mein se kam az kam
        ek sifat ki khidmat karta hai, ye ek pukhta (durable) hunar hai, kuch
        chaalaak prompts ka majmua nahi
      </figcaption>
    </figure>
  );
}

function ThreeModesDiagram() {
  const modes = [
    { icon: Settings, t: "Automation", q: "Ye kaam kar do", role: "Aap script writer hain", d: "AI aapki di hui khaas hidayaat se ek khaas kaam anjaam deta hai" },
    { icon: Users, t: "Augmentation", q: "Chalein mil kar sochte hain", role: "Aap co-creator hain", d: "Aap aur AI donon mil kar, ek doosre ke soch ko aage barhate hue kaam karte hain" },
    { icon: Compass, t: "Agency", q: "Meri taraf se ye maqsad hasil karo", role: "Aap director hain", d: "AI aapke bataye hue daaire ke andar khud faisle karta hai" },
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
        <span className="rounded-full border border-border px-2 py-0.5">Kam AI azadi</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border px-2 py-0.5">Zyada AI azadi</span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Koi tareeqa doosre se behtar nahi, hunar ye hai ke jo tareeqa kaam ko
        chahiye wo chuna jaye, aur zaroorat par un teenon ke darmiyan move
        kiya ja sake
      </figcaption>
    </figure>
  );
}

function LlmRealityDiagram() {
  return (
    <figure className="my-7">
      <Flow steps={["Aapka prompt", "Training ke patterns", "Ek plausible tasalsul (continuation)"]} />
      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { t: "Plausible sahi nahi hota", d: "Confident aur ghalat, dono ek sath ho sakte hain" },
          { t: "Jawab badalta rehta hai", d: "Ek hi sawal alag waqt mein alag jawab de sakta hai" },
          { t: "Sirf jo maujood ho", d: "Training, guftagu, documents, tools; jo maujood na ho wahan andaza lagaya ja sakta hai" },
        ].map((n) => (
          <div key={n.t} className="rounded-xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">{n.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{n.d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Har output ko ek qabil colleague ka ek soocha samjha draft samjhein,
        kabhi bhi hatmi sach (ground truth) nahi
      </figcaption>
    </figure>
  );
}

function DelegationPartsDiagram() {
  return (
    <figure className="my-7">
      <Flow
        steps={[
          "Problem Awareness: apna goal aur success ka matlab maloom ho",
          "Platform Awareness: is kaam ke liye kaunsa AI tool theek hai, ye maloom ho",
          "Task Delegation: kaam ko jaan-boojh kar taqseem kiya jaye",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Pehle domain expert bano, phir AI delegator, kyunke AI expertise ko
        tez karta hai, usay replace shayad hi karta hai
      </figcaption>
    </figure>
  );
}

function DescriptionPartsDiagram() {
  const parts = [
    { icon: Package, t: "Product", q: "Kya chahiye", d: "Output ki qisam, audience, format, tul (length), aur lehja (tone)" },
    { icon: GitBranch, t: "Process", q: "Kis tarah ho", d: "Marahil (steps), tarteeb, tareeqa, misaalein, aur beech ke checks" },
    { icon: Sliders, t: "Performance", q: "Kaisa suluk kare", d: "AI aapke sath aur khud apne taur par kaisa behave kare" },
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
        Yaad rakhne ka tareeqa: What → How → Mere sath kis tarah pesh aana
        hai. Mukammal hona chaalaaki se ziyada zaroori hai
      </figcaption>
    </figure>
  );
}

function DiligenceTimelineDiagram() {
  const stops = [
    { icon: ShieldCheck, t: "Pehle · Creation", d: "Sahi tool, sahi data, aur sahi context ka intekhab" },
    { icon: Eye, t: "Dauran · Transparency", d: "AI ke kirdar ke baare mein sab se ziyada honest rehna" },
    { icon: Rocket, t: "Baad Mein · Deployment", d: "Bhejne se pehle taeed (verify) aur zimmedari (vouch)" },
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
        &ldquo;Kya main is par yaqeen ke sath apna naam laga sakta hoon? Agar
        nahi, to ye abhi bhejne ke qabil nahi.&rdquo;
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

      {/* Compact chapter intro, no full hero — this is a sub-page */}
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
            <CoreIdea>
              AI fluency ka matlab chaalaak prompts yaad karna nahi, balke
              chaar salahiyaton, <Strong>4Ds</Strong>, ka majmua hai:
              Delegation, yani kaam ka batwaara karna; Description, yani AI
              ko wo maloomat dena jiski usay zaroorat hai; Discernment, yani
              AI ka diya hua kaam parakhna; aur Diligence, yani is sab ki
              zimmedari uthana. Ek nihayat qawi AI bhi, agar in chaaron ke
              baghair istemal ho, to ghalat ya khatarnaak natija de sakta
              hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Naye Colleague Ki Misaal</SubHeading>
            <P>
              Tasawwur karein ke aapki team mein ek qabil naya colleague
              shamil hota hai. Pehle hi din aap usay kehte hain ke &ldquo;AI
              agents par ek course ki outline tayar karo.&rdquo; Chand
              ghanton baad wo aapke saamne PhD researchers ke liye ek
              chamakti hui outline pesh karti hai, jismein poore semester ka
              time-table shamil hai, magar hands-on practice na ke barabar.
              Yahan masla uski qabiliyat mein nahi tha, balke is baat mein
              tha ke usay poori tarah rehnumai nahi di gayi thi.
            </P>
            <Callout label="Key Distinction">
              Insaan colleague se ye farq hai ke AI, guftagu ke darmiyan
              kuch bhi yaad nahi rakhta. Har naya chat ek aisi hasti se
              shuru hota hai jo aap se pehle kabhi nahi mili. Jo baat aap
              kisi insaan ko ek dafa bata dete hain, wahi baat AI ko har
              baar dobara batani parti hai, ya phir aisi jagah rakhni parti
              hai jahan se AI khud ba khud parh le. Ye koi khaami nahi, balke
              ek kaam karne ki soorat-e-haal hai jiske gird planning honi
              chahiye, aur yehi planning karna un chaar zaroori salahiyaton
              mein se ek hai.
            </Callout>
            <P>
              Ek nihayat qawi AI bhi, agar sath kamzor tareeqe se kaam kiya
              jaye, to ghalat natija deta hai. Sirf chaalaak prompts jaanna
              kaafi nahi. <Strong>AI Fluency ka matlab ye hai</Strong> ke
              AI ko kya dena hai, usay kis tarah rehnumai karni hai, uske
              kaam ko kis tarah parakhna hai, aur kab usay istemal ya
              bharosa nahi karna, ye sab jaan lena.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Is Framework Ka Naam: 4Ds</SubHeading>
            <P>
              Ye framework Professor Rick Dakan aur Professor Joseph Feller
              ne banaya, aur ise Anthropic ke sath milkar tayar kiye gaye
              courses ke zariye parhaya jata hai. Is mein chaar insaani
              salahiyatein shamil hain, jinhein 4Ds kaha jata hai:
            </P>
            <RecapTable
              head={["Competency", "Ek Line Sawal"]}
              rows={[
                ["Delegation", "AI kya kare, aur mere paas kya rahe?"],
                ["Description", "AI ko kaam achi tarah karne ke liye kya chahiye?"],
                ["Discernment", "Kya natija waqai achha aur qabil-e-bharosa hai?"],
                ["Diligence", "Kya ye AI ka zimmedaraana istemal hai, aur kya main is natije ka zimmedar banne ke liye tayyar hoon?"],
              ]}
            />
            <P>
              Aasan lafzon mein: pehle faisla karo, phir wazeh batao, phir
              jaanch lo, aur aakhir mein zimmedari qabool karo. Is ko parhne
              mein taqreeban tees minute lagte hain, aur practice prompts ke
              liye pandra se bees minute alag se darkaar hote hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Course Foundations Mein Kahan Aata Hai</SubHeading>
            <P>Book ka tajweez karda (recommended) tarteeb ye hai:</P>
            <Flow
              steps={[
                "\"What AI Actually Is\", jo machine ko samjhata hai",
                "\"AI Fluency\", ye course, jo machine ke sath kaam karna sikhata hai",
                "\"AI Prompting in 2026\", jo amali (practical) tareeqe sikhata hai",
              ]}
            />
            <RecapTable
              head={["Mauzu", "What AI Actually Is", "Ye Course", "AI Prompting 2026"]}
              rows={[
                ["AI kis tarah kaam karta hai", "Tafseel se", "Ek mukhtasar yaad-dahani", "Pehle se maloom farz kiya gaya"],
                ["Kis tarah baat cheet ki jaye", "Context kyun ahem hai", "Description", "Amali prompting ke tareeqe"],
                ["Jawab ko kis tarah parkha jaye", "Sahi lagna, sahi hone jaisa kyun nahi", "Discernment", "Model ko check karne ki aadatein"],
                ["AI ko kya diya jaye", "Jagged frontier", "Delegation", "Models aur tools ka intekhab"],
                ["Zimmedaraana istemal", "Zyada tar is chapter se bahar", "Diligence", "Mehfooz tool istemal aur permissions"],
              ]}
            />
            <Callout label="Note">
              Tareeqe (techniques) to models behtar hote hi badalte rahenge,
              lekin ye chaar salahiyatein isi liye tayar ki gayi hain ke ye
              hamesha kaam aayen.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Teen Minute Mein Farq Dekhein</SubHeading>
            <P>Pehla prompt, jo aam (generic) hai:</P>
            <PromptBox>Write a welcome email for new members.</PromptBox>
            <P>
              Natija qabil-e-qabool tha, sahi grammar ke sath, magar bilkul
              aam sa.
            </P>
            <P>Doosra prompt, ek naye chat mein, khaas tafseel ke sath:</P>
            <PromptBox>{`Write a welcome email for new members of a small women's cycling club
in Karachi. Most are nervous beginners who have never ridden in traffic.
Warm and a bit funny, under 150 words, no exclamation marks. End by
telling them the Saturday 6am ride is slow on purpose and nobody gets
dropped.`}</PromptBox>
            <P>
              Wahi model, aur mehnat bhi taqreeban teen second ki, lekin
              doosra email pehle se kaafi behtar tha. Is se do baatein
              sabit hoti hain. Pehli ye ke donon natijon ka farq insaan ki
              taraf se aaya, model ki taraf se nahi. Doosri ye ke aap doosre
              email ko behtar isi liye keh sake kyunke aap cycling clubs,
              hichkichahat mehsoos karne wale naye logon, aur Karachi ko
              achi tarah samajhte hain. Pehli baat <Strong>Description</Strong>{" "}
              ki misaal hai, aur doosri <Strong>Discernment</Strong> ki.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Course Ke Aakhir Tak Kya Samajh Aana Chahiye</SubHeading>
            <P>
              Course mukammal hone tak, aapko in cheezon ki wazahat karne ke
              qabil ho jana chahiye:
            </P>
            <CheckList
              items={[
                "AI fluency ka matlab, sirf \"prompts mein mahir hona\" se aage kya hai",
                "Automation, augmentation, aur agency mein farq",
                "Kaam ka kaunsa hissa khud rakhna hai aur kaunsa AI ko dena hai, ye kis tarah tay kiya jaye",
                "Description ki teen qismein: product, process, aur performance",
                "AI ke output ko sirf confident jawab ki bina par qabool karne ki bajaye, usay kis tarah parkha jaye",
                "Diligence ki teen qismein: creation, transparency, aur deployment",
                "Ek asal (real) project mein ye chaaron salahiyatein sath sath kis tarah kaam karti hain",
                "Ye zaati (personal) salahiyatein Agent Factory ki engineering practices mein kis tarah phailti (scale) hain",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · Bari Tasveer Se Ibtida</PartBanner>
            <SubHeading>1. AI Tak Rasai, AI Fluency Nahi</SubHeading>
            <P>
              Ek qawi AI tak rasai hona is baat ki zamanat nahi deta ke usay
              achi tarah istemal karna bhi aata hai. Taqreeban sab logon ke
              paas ek jaisi models mojood hain. Ek hi plan par ek hi
              assistant istemal karne wale do log bilkul mukhtalif natije
              hasil karte hain. Farq tool mein nahi tha, <Strong>farq is
              baat mein tha ke unhon ne usay istemal kis tarah kiya.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>AI Fluency Ka Matlab: AI Ke Sath Aise Kaam Karna Jo</SubHeading>
            <FourQualitiesDiagram />
            <P>
              <Strong>Jo cheez zaroori NAHI hai</Strong> wo ye hai ke large
              language models ki training samjhi jaye, transformer
              architecture ki gehri maloomat hasil ki jaye, ya &ldquo;jaadui
              prompts&rdquo; ka koi majmua yaad kiya jaye. Bunyad sirf itni
              hai ke AI ke gird achay insaani faisle karna seekha jaye. Is
              ka silsila yun hai: Delegation, phir Description, phir
              Discernment, aur aakhir mein Diligence, ya aasan lafzon mein:
              faisla karo, samjhao, jaancho, aur zimmedar bano.
            </P>
            <Callout label="Agent Factory Parhne Walon Ke Liye Ahmiyat">
              Ye sab se pehle aati hai. Mode 1 mein aap aam (general) agents
              istemal kar ke masail hal karte hain. Mode 2 mein aap doosron
              ke liye Digital FTEs banate hain. Donon soorat mein AI fluency
              laazmi hai. <Strong>&ldquo;Agar aap ek AI assistant ke sath
              achi tarah kaam nahi kar sakte, to aap us AI system ko design
              karne ke liye tayyar nahi hain jo saikron ya hazaron logon ki
              taraf se kaam karega.&rdquo;</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pichle Chapter Se Teen Baatein Yaad Rakhein</SubHeading>
            <P>
              &ldquo;What AI Actually Is&rdquo; chapter se ye teen baatein
              zehan mein rakhein:
            </P>
            <CheckList
              items={[
                "Sahi lagna, sahi hone jaisa nahi hota, AI aisa confident jawab de sakta hai jo ghalat ho (hallucination)",
                "Output badalta rehta hai, ek hi darkhwast alag waqt mein alag jawab de sakti hai",
                "AI sirf usi maloomat par kaam karta hai jo us tak mojood ho, jo maloomat mojood na ho, wahan andaza lagaya ja sakta hai",
              ]}
            />
            <LlmRealityDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>2. AI Ke Sath Kaam Karne Ke Teen Tareeqe: Automation, Augmentation, Agency</SubHeading>
            <P>
              4Ds seekhne se pehle, ek aur bunyadi baat samajhni zaroori
              hai. Insaan AI ke sath teen wasee (broad) tareeqon se kaam
              karte hain, aur in mein farq zyada tar is baat se hota hai ke{" "}
              <Strong>AI ko agla qadam khud tay karne ki kitni azadi di gayi
              hai.</Strong>
            </P>
            <ThreeModesDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Automation: &ldquo;Ye Kaam Kar Do&rdquo;</SubHeading>
            <P>
              Automation mein aap AI ko theek theek batate hain ke kaunsa
              kaam karna hai, jaise &ldquo;is report ko paanch bullets mein
              summarize kar do&rdquo;, &ldquo;is email ka Urdu tarjuma kar
              do&rdquo;, ya &ldquo;invoice se number, tareekh, aur total
              nikaal do.&rdquo; Yahan aap ek <Strong>script writer</Strong>{" "}
              ki tarah hote hain. Ye tareeqa tab sab se behtar rehta hai jab
              kaam wazeh aur baar baar dohraya jane wala ho.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Augmentation: &ldquo;Mere Sath Socho&rdquo;</SubHeading>
            <P>
              Augmentation mein aap aur AI mil kar kaam karte hain, misaal
              ke taur par kisi business idea par ghor karna, software ki
              architecture ka jaiza lena, lesson plan ko behtar banana, do
              hikmat-e-amaliyon (strategies) ka muwazna karna, ya koi aisa
              sawal cheher karna jiska jawab abhi khud aapko bhi maloom
              nahi. Yahan AI aik <Strong>sochne wale saathi (thinking
              partner)</Strong> ki tarah kaam karta hai, sirf hidayaat par
              amal nahi karta. Is mein aap ke aur AI ke darmiyan kai baar
              baat aage peeche hoti hai, aap sawal karte hain, wo jawab
              deta hai, aap us par etraaz karte hain, aur wo apna jawab
              tarmeem karta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Agency: &ldquo;Meri Taraf Se Ye Maqsad Hasil Karo&rdquo;</SubHeading>
            <P>
              Agency mein aap AI ko ek maqsad aur usi ki hadood (boundaries)
              de dete hain, phir usay kai qadam khud tay karne dete hain.
              &ldquo;Ye paanch emails parh kar mujhe khulasa (summary) do&rdquo;
              kehne ki bajaye, aap kuch is tarah kehte hain:
            </P>
            <PromptBox>{`"Keep my inbox manageable. Reply to routine messages, flag important ones,
and ask me before doing anything you are unsure about."`}</PromptBox>
            <P>
              Ab AI ko khud faisla karna parta hai ke kya routine hai, kya
              ahem hai, aur kab poochna zaroori hai. Yahan aap script writer
              se <Strong>director</Strong> ban jate hain. Do lafz is mein
              bohot wazan rakhte hain. Pehla, <Strong>future</Strong>, yani
              aap us waqt maujood nahi hote, aap ne peer ko sab kuch tay kar
              diya aur juma ko wo kaam khud anjaam pata hai jab aap so rahe
              hote hain. Doosra, <Strong>for others</Strong>, yani jis
              insaan ki khidmat AI kar rahi hai, wo khud aap na bhi ho.
              Automation aur augmentation mein aap kursi par baithe rehte
              hain, lekin agency mein aap kursi se uth jate hain, aur Mode 2
              ki har mushkil isi ek haqiqat se nikalti hai: aap har faisle
              ki nigrani nahi kar sakte, isliye samajh-boojh (judgment)
              pehle se hi shamil honi chahiye.
            </P>
            <RecapTable
              head={["Pehlu", "Automation", "Agency"]}
              rows={[
                ["Aap kya dete hain", "Kaam ya usi ke marahil (steps)", "Maqsad aur hadood (boundaries)"],
                ["AI kya faisla karta hai", "Bohot kam", "Aage ke kai qadam"],
                ["Aapka kirdar", "Script writer", "Director"],
                ["Aam ghalti", "Koi ek qadam ghalat ho jata hai", "Maqsad ya hadood samajhne mein ghalti ho jati hai"],
              ]}
            />
            <P>
              Koi bhi tareeqa khud ba khud doosre se behtar nahi hota. Ek
              achha AI istemal karne wala wahi tareeqa chunta hai jo us
              waqt kaam ko chahiye, aur ek hi project mein teenon tareeqe
              shamil ho sakte hain. Mode 1 zyada tar automation aur
              augmentation istemal karta hai, jabke Mode 2 agency ko
              tarteeb-yaafta (systematic) bana deta hai. Ek Digital FTE sirf
              itna nahi ke &ldquo;AI kaam kar rahi hai&rdquo;, balke ye ek
              job definition, System of Record, permissions, qawaid, aur
              governance ke andar reh kar kaam karta hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DELEGATION ---------------------- */}
        <section id="delegation" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · Chaar Salahiyatein</PartBanner>
            <SubHeading>3. Delegation: Kaam Kaun Karega, Ye Faisla Karna</SubHeading>
            <P>
              Beginners ki sab se aam ghalti pehle prompt se bhi pehle ho
              jati hai. Log AI assistant khol kar seedha type karna shuru
              kar dete hain, jabke unhon ne abhi ye tay hi nahi kiya hota ke
              asal mein hasil kya karna hai, achha natija kaisa dikhega,
              kaam ka kaunsa hissa AI ko dena hai, kaunsa hissa khud
              sambhalna hai, aur kaunse faisle kabhi bhi AI ke supurd nahi
              karne chahiye. Yehi <Strong>Delegation</Strong> ka masla hai.
            </P>
            <Callout label="Definition">
              <Strong>Delegation</Strong> ka matlab ye tay karna hai ke kaam
              insaan aur AI ke darmiyan kis tarah taqseem hoga. Ye sirf itna
              nahi ke &ldquo;AI ko kaam de diya&rdquo;, balke ye poori
              workflow ko design karna hai.
            </Callout>
            <DelegationPartsDiagram />
            <Callout label="Yaad Rahe">
              Pehle domain expert bano, phir AI delegator, kyunke AI
              expertise ko tez karta hai, usay replace shayad hi karta hai.{" "}
              <Strong>Delegation asal mein workflow design hai, kaam ko AI
              par daal dena nahi.</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3.1 Problem Awareness</SubHeading>
            <P>
              AI se kuch bhi poochne se pehle, khud se ye sawalat poochein:
            </P>
            <CheckList
              items={[
                "Maqsad kya hai?",
                "Ye kis ke liye hai?",
                "Kamiyabi kis tarah nazar aayegi?",
                "Kya galat ho sakta hai?",
                "Kahan par insaani samajh-boojh (judgment) zaroori hai?",
              ]}
            />
            <P>
              Iski ek misaal lein: ek naya (beginner) user AI se kehta hai,
              &ldquo;mujhe ek invoice-chasing agent bana do.&rdquo; AI kuch
              na kuch bana to dega, lekin kai mushkil sawalat abhi bhi jawab
              talab rahenge: kaunse customers se rabta kiya jaye, invoice
              kitne din late hone par follow-up bheja jaye, kaunsa lehja
              (tone) istemal ho, kitni raqam par insaan ki manzoori zaroori
              ho, agar customer invoice par etraaz kare to kya kiya jaye,
              agent kaunsa accounting system parh sakta hai, aur ye ke agent
              sirf message ka draft banaye ya khud bhej bhi sake.{" "}
              <Strong>Ye sawalat business ke hain, prompting ke nahi.</Strong>{" "}
              AI aapki business policy khud se tay nahi kar sakta, jab tak
              aap jaan-boojh kar usay ye ikhtiyar na dein, aur aksar aisa
              karna bhi munasib nahi hota.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.2 Platform Awareness</SubHeading>
            <P>
              Har AI system har kaam mein barabar achha nahi hota. Mushkil,
              kai marahil (steps) wale masail ke liye reasoning model chuna
              ja sakta hai, taaza maloomat ke liye search-enabled assistant,
              software banane ke liye coding agent, aur un kaamon ke liye
              jin mein tools aur kai qadam shamil hon, agent-capable system.
              Ek achi aadat ye hai ke khud se poochein, &ldquo;kya ye tool
              is kaam ke liye theek hai?&rdquo; Alag alag systems ko
              aazmayein, unke natije muwazna karein, aur ye note karte rahein
              ke kya cheez kaam kar rahi hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.3 Task Delegation</SubHeading>
            <P>
              Jab problem aur platform, donon samajh mein aa jayen, to kaam
              ko soch samajh kar hisson mein baant dein. Iski ek misaal, ek
              course banate waqt:
            </P>
            <RecapTable
              head={["Kaam", "Behtareen Zimmedar", "Wajah"]}
              rows={[
                ["Audience aur seekhne ke maqasid tay karna", "Insaan", "Yahan maqsad aur samajh-boojh darkaar hai"],
                ["Course ki mumkin structures tajweez karna", "AI + Insaan", "AI wusaat (breadth) deta hai, insaan intekhab karta hai"],
                ["Tay-shuda outline se sections ka draft banana", "AI", "Pehla draft banane mein tez hai"],
                ["Haqeeqi (factual) daawon ki tasdeeq karna", "Insaan", "Zimmedari mussanif (author) par rehti hai"],
                ["Zaati tajurbaat aur ilaqai misaalein shamil karna", "Insaan", "AI ke paas aapka tajurba nahi hota"],
                ["Grammar aur consistency behtar banana", "AI", "Ye mechanical jaiza lene ke liye munasib hai"],
                ["Course ki aakhri manzoori dena", "Insaan", "Yahan aapka naam aur wuqar (reputation) juda hai"],
              ]}
            />
            <Callout label="Behtar Sawal">
              &ldquo;Kya AI ye kar sakta hai?&rdquo; poochne ki bajaye,
              behtar sawal ye hai: <Strong>&ldquo;Kaunsa hissa AI kare,
              kaunsa main karoon, aur kyun?&rdquo;</Strong>
            </Callout>
            <P>
              Agent Factory mein aa kar Delegation ek engineering amal ban
              jati hai. Problem Awareness ek <Strong>specification</Strong>{" "}
              ki shakl ikhtiyar karti hai, jis mein maqsad, hadood
              (constraints), khatraat (risks), aur &ldquo;definition of
              done&rdquo; shamil hote hain. Task Delegation, Digital FTE ki
              hadd (boundary) ban jati hai, jo ye tay karti hai ke AI kya kar
              sakta hai, insaan kya apne paas rakhte hain, aur kaunsi cheez
              escalate honi chahiye. Aur ek vertical System of Record inhi
              faislon ko mehfooz aur qabil-e-mushahida (inspectable) banata
              hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DESCRIPTION ---------------------- */}
        <section id="description" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>4. Description: AI Ko Wo Dena Jo Usay Chahiye</SubHeading>
            <P>
              Shuru wale colleague ko yaad karein, uski outline isi liye
              galat thi kyunke usay ahem maloomat nahi di gayi thi. AI ko
              bhi yehi masla darpesh hota hai, magar is se bhi shiddat se.
              Wo aapka zehan parh nahi sakta. Agar aap koi ahem baat chhor
              dein, to wo ek mawafiq (reasonable) andaza laga leta hai, aur
              ye mawafiq andaza bhi ghalat sabit ho sakta hai.
            </P>
            <Callout label="Definition">
              <Strong>Description</Strong> wo salahiyat hai jis se aap AI ko
              wo maloomat aur rehnumai faraham karte hain jiski usay kaam
              achi tarah karne ke liye zaroorat hoti hai. Ye sirf &ldquo;ek
              achha prompt likhne&rdquo; se kahin ziyada wasee (bigger)
              cheez hai.
            </Callout>
            <DescriptionPartsDiagram />
            <Callout label="Key Principle">
              &ldquo;Mukammal hona chaalaaki se jeet jata hai, sab se achha
              prompt chaalaak nahi hota, mukammal hota hai.&rdquo; Bare
              paimane par, description khud <Strong>context
              engineering</Strong> ban jati hai, yani wo har cheez design
              karna jo AI ko kamiyab hone ke liye chahiye, na ke sirf ek
              paigham (message) ki alfaaz-bandi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.1 Product Description: Natije Ki Wazahat</SubHeading>
            <P>
              Ye sawal poochti hai: &ldquo;mujhe wapis theek theek kya
              chahiye?&rdquo;
            </P>
            <P>Mubham (vague) darkhwast:</P>
            <PromptBox>Summarize this report.</PromptBox>
            <P>Wazeh (clear) darkhwast:</P>
            <PromptBox>{`Summarize this quarterly financial report for senior executives who have
ten minutes to read. Focus on revenue trends, major risks, and recommended
actions. Use short bullet points and keep it to one page. Highlight any
figure that changed significantly from last quarter. Avoid unnecessary
accounting jargon.`}</PromptBox>
            <P>
              Doosri darkhwast zyada zeheen nahi, balke <Strong>zyada
              mukammal</Strong> hai. Mukammal hona aksar chaalaak alfaaz se
              kahin zyada matter karta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4.2 Process Description: Tareeqe Ki Wazahat</SubHeading>
            <P>Ye sawal poochti hai: &ldquo;AI ko kaam kis tarah karna chahiye?&rdquo; Misaal:</P>
            <PromptBox>{`Review this code for correctness first, security second, and style last.
Do not spend time on naming issues until you have checked whether the
code actually works.`}</PromptBox>
            <P>
              Process description sab se zyada tab matter karti hai jab
              kaam kai marahil par mushtamil ho. Iski ek misaal, teen
              vendors, A, B, aur C, ke proposals se ek sifarish (recommendation)
              banana:
            </P>
            <Ladder
              steps={[
                { title: "Extract", note: "Har proposal se wahi facts ek table mein nikaalein: qeemat, contract ki muddat, exit terms, aur support ke auqaat. Check: teen ya chaar cells ko asal source se taeed karein." },
                { title: "Compare", note: "Sirf usi table ka istemal karte hue vendors ka muwazna karein. Check: har farq waqai table mein maujood hai?" },
                { title: "Score", note: "Har vendor ko score dein, jo baat aapke liye zyada matter karti hai usay zyada wazan dein. Check: scores aapki criteria ke mutabiq hain, ya AI ne khud koi naya criterion shamil kar liya?" },
                { title: "Draft", note: "Sifarish likhein. Check: kya ye sirf wahi baat kehti hai jo pehle teen marahil se sabit hoti hai?" },
              ]}
            />
            <Callout label="Umoomi Usool" tone="warn">
              Jis marhale ki ghalti sab se door tak asar andaaz hoti hai, wo
              sab se pehle aana chahiye, aur aage barhne se pehle usay check
              kar lena chahiye. Extraction is liye pehle hai kyunke agar
              table mein qeematein ghalat hon, to wo comparison, score, aur
              draft tak sath chalti hain, aur parhne tak sahi hi lagti
              rehti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.3 Performance Description: Suluk Ki Wazahat</SubHeading>
            <P>Ye sawal poochti hai: &ldquo;ye AI kis tarah suluk kare, aur kis ke sath?&rdquo; Misaal:</P>
            <PromptBox>{`Challenge my assumptions when they are weak. Flag uncertainty. Do not
agree with me just to be polite. If my argument is stronger, explain why.
If yours is stronger, hold your position and explain it.`}</PromptBox>
            <P>
              Is se AI ek shaista (polite) jawab dene wali machine se
              nikal kar ek behtar sochne wala saathi ban jata hai. Iske do
              darje hain. Chhota darja, chat window mein, sirf aap ke liye,
              aur bara darja, ek deploy ki hui agent mein, jaise ek tutoring
              agent ka ye usool ke &ldquo;student ki koshish se pehle jawab
              mat do.&rdquo; Ye wahi jumla hai, bas iski ahmiyat badal jati
              hai: ek dafa likha jata hai, aur hazar dafa un logon par
              lagoo hota hai jinse aap kabhi mile bhi nahi. Chat mein ek
              kamzor performance description das minute pareshan karti hai,
              lekin ek deploy ki hui agent mein wahi khud{" "}
              <Strong>product</Strong> ban jati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Description, Prompting Se Bara Mafhoom Hai</SubHeading>
            <P>
              Book ka agla chapter, <Strong>&ldquo;AI Prompting in
              2026&rdquo;</Strong>, amali (practical) tareeqe sikhata hai,
              jaise misaalein dena, hadood (constraints) muta&apos;yyin
              karna, kaam ko chhote hisson mein taqseem karna, aur roles
              define karna. Ye chapter is se bhi bara khayal sikhata hai:{" "}
              <Strong>Description.</Strong>
            </P>
            <P>
              Kai teams ek prompt template istemal karti hain jis mein
              role, context, task, constraints, aur output format ke liye
              jagah rakhi jati hai. Task, constraints, aur output format,
              asal mein <Strong>product description</Strong> hi hain.
              Context wahi cheez hai jise agla hissa{" "}
              <Strong>context engineering</Strong> kehta hai. Agar kaam kis
              tarah aage barhe iske liye ek jumla, aur AI aapke sath kis
              tarah pesh aaye iske liye ek jumla shamil kar diya jaye, to ye
              template teenon hisson ko mukammal kar deta hai.
            </P>
            <Callout label="Note">
              Kisi baat ko lafzon mein dhalne ka tareeqa maloom nahi? Ruk mat
              jayein. Apni soorat-e-haal ko aam alfaaz mein bayan karein aur
              AI se poochein ke wo isay ek wazeh hidayat mein badal de.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Prompt Engineering Se Context Engineering Tak</SubHeading>
            <P>
              <Strong>Prompt engineering ye sawal poochti hai:</Strong>{" "}
              &ldquo;ye paigham kis tarah likhun?&rdquo;{" "}
              <Strong>Context engineering is se bara sawal poochti
              hai:</Strong> &ldquo;AI ke kamiyab hone ke liye kya mojood
              hona chahiye?&rdquo;
            </P>
            <CheckList
              items={[
                "Documents", "Misaalein (examples)", "Memory", "Guftagu ki tareekh",
                "Policies", "Tools", "Database ke records", "Tareef (definitions)", "Hidayaat (instructions)",
              ]}
            />
            <P>
              Ek agent ke liye ye bohot matter karta hai: khoobsurat prompt
              bhi agent ko nahi bacha sakta agar uske paas ghalat data ho,
              qawaid maujood na hon, kamzor misaalein hon, ya zaroori tools
              tak rasai na ho. Agent Factory mein: system prompt ek
              performance description ko qaim rakhta hai, ek{" "}
              <Strong>SKILL.md</Strong> ek process description ko dobara
              istemal ke qabil banata hai, aur ek System of Record domain
              ki maloomat, qawaid, tareefain, aur governance rakh sakta hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DISCERNMENT ---------------------- */}
        <section id="discernment" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>5. Discernment: Aitmaad Ko Sehat Na Samjhein</SubHeading>
            <P>
              AI aksar bharosemand (confident) maloom hota hai. Ye pardh-
              waaz (readability) ke liye faidamand hai, lekin bharose ke
              liye khatarnaak. Ek ghalat AI jawab aam taur par kisi warning
              label ke sath nahi aata, balke wo saaf-suthra, tafseeli, aur
              yaqeeni maloom ho sakta hai.
            </P>
            <Callout label="Definition">
              <Strong>Discernment</Strong> AI ke diye hue kaam ko parakhne
              ki salahiyat hai. Description ye sawal poochti hai, &ldquo;kya
              maine kaam wazeh tareeqe se bayan kiya?&rdquo; jabke
              Discernment ye poochti hai, &ldquo;kya AI ne kaam waqai achi
              tarah kiya?&rdquo;
            </Callout>
            <Callout label="Ahem Istilaah" tone="warn">
              <Strong>Automation Bias:</Strong> ek khud-kaar (automated)
              jawab par zaroorat se zyada aasani se bharosa kar lena, khaas
              taur par jab wo bharosemand ya pesha-warana maloom ho.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Bani Hui Baat Bhi Kamiyabi Jaisi Dikh Sakti Hai</SubHeading>
            <P>
              Ek bani hui (hallucinated) jawab, sahi jawab se taqreeban
              milta julta dikh sakta hai. Rawaan (fluent) tehreer koi
              saboot nahi, koi hawala jaisi link koi saboot nahi, aur
              bharosemand lehja bhi koi saboot nahi. Chaar alamaat aksar
              bani hui baat ki nishandahi karti hain:
            </P>
            <RecapTable
              head={["Alamat", "Kya Karein"]}
              rows={[
                ["Bohot ziyada theek theek tafseelaat", "Number dohrane se pehle asal source khol kar check karein"],
                ["Wahan bharosa jahan expert bhi hichkichaye", "Poochein ke kaunsi cheez jawab badal degi"],
                ["Lambi tehreer mein tazaad (contradiction)", "Aakhir ko shuru ke muqable mein parhein"],
                ["Ek daawa kiya gaya amal jo hua hi nahi", "Jab tak tool khud saboot na de (bheja gaya paigham, khula hua safha, test ka log), daawe ko sirf ek jumla samjhein, waqia nahi"],
              ]}
            />
            <Callout label="Umoomi Usool" tone="warn">
              Jahan sehat (accuracy) matter karti hai, wahan taeed (verify)
              zaroor karein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discernment, Description Ki Aks (Mirror) Hai</SubHeading>
            <P>
              Isi tarah is ke bhi teen hisse hain, aur ye teenon hisse unhi
              teen cheezon ki taraf ishara karte hain:
            </P>
            <RecapTable
              head={["Qisam", "Sawal"]}
              rows={[
                ["Product Discernment", "Kya natija achha hai?"],
                ["Process Discernment", "Kya AI ke sath kaam karne ka ye tareeqa faida-mand sabit ho raha hai?"],
                ["Performance Discernment", "Jab AI khud amal karta hai, to kya logon ki achi khidmat ho rahi hai?"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>5.1 Product Discernment</SubHeading>
            <CheckList
              items={[
                "Kya ye haqeeqat mein sahi hai?",
                "Kya har ahem shart poori hui?",
                "Kya kuch chhoot to nahi gaya?",
                "Kya ye andar se ba-ham-aahang (consistent) hai?",
                "Kya ek expert isay qabil-e-etimaad samjhega?",
                "Kya main is par apna naam laga sakta hoon?",
              ]}
            />
            <P>
              <Strong>Ek ahem baat:</Strong> is mauqe par aapki apni domain
              ki maloomat nihayat qeemti ban jati hai. Ek accountant kamzor
              andaazon ko pehchan leta hai, ek programmer chhupi hui bugs
              pakar leta hai, aur ek teacher wo wazahatein pehchan leta hai
              jo naye seekhne walon ke liye uljhi hui hon. &ldquo;AI mahir
              kaam ki raftaar barha sakta hai, lekin ye mahaarat ki
              zaroorat ko khatam nahi karta.&rdquo;
            </P>
            <P>
              Natije ke pichhe ki <Strong>daleel (reasoning) ko bhi
              parakhein</Strong>, kyunke AI kamzor wajooh ke sath bhi sahi
              jawab tak pahunch sakta hai, aur ek ghalat andaaze par khara
              sahi jawab zyada der tak sahi nahi rehta. Behtar ye hai ke AI
              se ye dikhwaya jaye: andaaze (assumptions), saboot (evidence),
              faisle ki bunyad (decision criteria), hisaab-kitaab
              (calculations), darmiyani natije, aur mumkin doosri tashreehat.
              Inhein ek <Strong>jaiza lene ke liye pesh ki gayi daleel</Strong>{" "}
              samjhein, na ke chhupi hui soch ka lafz-ba-lafz byaan.
            </P>
            <PromptBox>{`Before recommending one option, list your assumptions, the evidence
supporting them, and the criteria you are using to decide. Then give
the recommendation.`}</PromptBox>
            <P>
              Documents par mabni (based) jawabon ke liye ye bhi shamil
              karein:
            </P>
            <PromptBox>{`Answer only from the three proposals I attached, not from anything
you know about these vendors. If a proposal does not state its exit
terms, say so instead of guessing. For every term you report, quote
the proposal's section heading and the sentence it came from.`}</PromptBox>
            <P>
              Ye teen kaam karta hai. Pehla, sirf woh cheez istemal karta
              hai jo saath mansook (attached) ki gayi ho, is se training
              ki maloomat se khaali jagah bharne se bacha jata hai, jahan
              se ghair-mojood khususiyaat paida hoti hain. Doosra, ye
              &ldquo;is mein ye likha nahi&rdquo; kehne ki ijazat deta hai.
              Teesra, ye aapko ek minute mein qabil-e-jaanch cheez de deta
              hai, teenon proposals ko dobara parhne ki bajaye. Koi bhi
              cheez jawab ko khud parhne ki jagah nahi le sakti, ye sirf
              parhna tez bana deti hai aur bani hui baat ko pakarna aasan
              kar deti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.2 Process Discernment</SubHeading>
            <P>
              Kabhi kabhi jawab theek hota hai lekin AI ke sath kaam karne
              ka andaaz theek nahi hota. Ye wo sawal hai jo log taqreeban
              kabhi nahi poochte, kyunke output qabil-e-qabool laga aur
              session kamiyab mehsoos hua. Khud se ye poochein:
            </P>
            <CheckList
              items={[
                "Kya AI mere feedback ke mutabiq dhal raha hai, ya wapis purani rawish par laut raha hai?",
                "Kya do baar theek karne ke baad bhi wahi ghalti dohra raha hai?",
                "Kya wo itna razamand ho gaya hai ke ab bekar sabit ho raha hai?",
                "Kya main har baar wahi formatting ka masla khud theek kar raha hoon?",
                "Kya main iske draft ko itni shiddat se tarmeem kar raha hoon ke khud likhna asaan hota?",
              ]}
            />
            <Callout label="Ek Imandaraana Jaiza">
              Aakhri sawal par khaas tawajju dein: aisi bees minute ki
              rehnumai jo ek ghanta bacha de, ek kamiyabi hai. Lekin aisi
              bees minute ki rehnumai jo sirf pandra minute bachaye, dar
              asal ek nuqsaan hai, jise aap kamiyabi samajh rahe hain
              kyunke wo mehnat karte huye achi lagi.
            </Callout>
            <P>
              Jab ye tareeqa kaam na kare, to teen qadam uthaye ja sakte
              hain, aur teenon hi fluency ka hissa hain: performance
              description badal dein, tool badal dein, ya phir kaam wapis
              khud sambhal lein. In mein se sirf teesra qadam shikast jaisa
              lagta hai, lekin aksar aisa nahi hota.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.3 Performance Discernment</SubHeading>
            <P>
              Ye tab wajood mein aati hai jab aap agency istemal kar chuke
              hon, aur book ke aakhir mein isi ki sab se zyada fikar ki
              jati hai. Ye ye sawal poochti hai ke kya AI ka{" "}
              <Strong>khud-mukhtar, user ke saamne aane wala suluk</Strong>{" "}
              logon ke liye achay natije la raha hai. Ye is baat se mukhtalif
              hai ke koi ek jawab sahi tha ya nahi. Misaal ke taur par, ek
              AI tutor har sawal ka sahi jawab de sakta hai, aur phir bhi
              bura tutor sabit ho sakta hai agar wo student ke hichkichane
              ki fauran jawab de deta hai, jis se koi kuch nahi seekhta.
              Isi tarah ek support agent tickets ko tezi se hal kar sakta
              hai, aur phir bhi bura sabit ho sakta hai agar wo guftagu us
              waqt band kar de jab customer usay abhi mukammal na samjhe.
              Ye masla akele chats mein nazar nahi aata, balke majmui
              (aggregate) surat mein zahir hota hai: users iske baad kya
              karte hain, wo kis baat ki shikayat karte hain, aur kaunse
              cases baar baar chupke se wahi ghalati dohrate hain. Chunke
              hazaron guftaguon ko khud dekhna mumkin nahi, isliye koi aisa
              nizaam banana parta hai jo aapki jagah in par nazar rakhe.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Description–Discernment Ka Chakkar (Loop)</SubHeading>
            <Flow
              loop
              steps={[
                "Aap ye bayan karte hain ke kya chahiye",
                "AI kuch tayar karta hai",
                "Aap uska jaiza lete hain",
                "Aap batate hain ke kya badalna hai",
              ]}
            />
            <P>
              Jab Discernment koi masla nishaan-zad kare, to aksar iska hal
              behtar description hota hai. Kabhi kabhi ye wapis Delegation
              tak le jata hai, ya to ghalat tool ki wajah se, ghalat
              taqseem ki wajah se, ya phir ghalat tareeqe ki wajah se.{" "}
              <Strong>&ldquo;Pesha-warana AI tawun (collaboration) baar
              baar koshish se hasil hoti hai, ye kabhi bhi ek hi koshish
              mein kamil nahi hoti.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Ek Fitri Amal Hai</SubHeading>
            <P>
              AI ke sath achha kaam aam taur par baar baar koshish (iterative)
              se hota hai. Pehla jawab aksar ek draft hota hai, aakhri
              manzil nahi. Feedback dete waqt is tarteeb ka istemal karein:
              masla batayein, phir ye ke wo kyun matter karta hai, aur phir
              rehnumai dein.
            </P>
            <P>Kamzor feedback:</P>
            <PromptBox>Wrong. Try again.</PromptBox>
            <P>Behtar feedback:</P>
            <PromptBox>{`The second section assumes enterprise customers. Our audience is solo
founders, so the advice is too expensive. Rewrite that section for a
one-person business with a limited budget.`}</PromptBox>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Achhe Draft Ko Doosri Koshish Ki Zaroorat Kyun Parti Hai</SubHeading>
            <P>
              Isliye kyunke wo galat parhne wale (reader) ke liye likha gaya
              tha. Iski ek misaal, ek quarterly report ki ek dariyaft
              (finding) ko board aur support team, donon ke liye alag alag
              likha jaye:
            </P>
            <RecapTable
              head={["Board Ke Liye", "Support Team Ke Liye"]}
              rows={[
                [
                  "Number, wajah, aur faisla: \"Tickets dogune ho gaye, jawab dene ka waqt 4 se 9 ghante ho gaya, team ka size wahi raha. Do naye afraad ki manzoori dein ya 9 ghante ke jawab qabool karein.\"",
                  "Kya badla, ye unki ghalti kyun nahi, aur juma ko kya karna hai: \"Is quarter tickets dogune ho gaye, team ka size wahi raha, isliye 9 ghante ke jawab volume ki wajah se hain, aapki wajah se nahi. Do naye afraad ki darkhwast ho chuki hai. Jab tak wo aa nahi jate, sab se purana ticket pehle nipatayein.\"",
                ],
              ]}
            />
            <P>
              Facts wahi, model wahi, lekin natije donon alag. In mein se
              koi bhi doosre parhne wale ke liye kaam nahi karta.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Har Jaiza Kisi Ek Anjaam Par Khatam Hota Hai</SubHeading>
            <CheckList
              items={[
                "Kaam bhej diya jata hai, jaise cycling club wala email bhej diya gaya",
                "Ye feedback ke sath wapis chala jata hai",
                "Aap khud kaam apne haath mein le lete hain, kyunke uska hal sirf aap jaante hain",
              ]}
            />
            <Callout label="Ek Ahem Aadat">
              Agla paigham likhne se pehle ye tay kar lein ke natija kya
              hoga. Baar baar koshish karna hamesha ke liye nahi chalna
              chahiye, aakhir ko pehchan lena us &ldquo;bas ek aur chhoti si
              tabdeeli&rdquo; wale silsile ko rokta hai jo poora din kha
              jata hai.
            </Callout>
            <P>
              Kabhi kabhi behtar description bhi kaafi nahi hoti, aur
              Discernment ye zahir kar deti hai ke asal Delegation ka
              faisla hi galat tha, shayad ghalat tool chuna gaya, shayad AI
              ko wo hissa kabhi milna hi nahi chahiye tha, ya shayad ye kaam
              ek insani expert hi maangta hai. Ye bhi fluency ka hissa hai.
              Agent Factory mein Discernment{" "}
              <Strong>evaluation engineering</Strong> ban jati hai, yani
              aapka zaati sawal &ldquo;kya ye kaafi achha hai?&rdquo; eval
              suites, production checks, monitoring, sampling, aur release
              gates ki soorat ikhtiyar kar leta hai.{" "}
              <Strong>&ldquo;Aap wo samajh-boojh khud kar (automate) nahi
              sakte jo aap ne khud kabhi seekhi hi nahi.&rdquo;</Strong>
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- DILIGENCE ---------------------- */}
        <section id="diligence" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>6. Diligence: AI Ka Zimmedaraana Istemal</SubHeading>
            <P>
              Pehli teen Ds behtar natije hasil karne mein madad deti hain.
              Diligence ek bilkul mukhtalif sawal poochti hai:
            </P>
            <PullQuote>Kya mujhe AI ko is tarah istemal karna bhi chahiye?</PullQuote>
            <Callout label="Misaal: Lecture Feedback Ka Masla" tone="warn">
              Ek ustaad AI ki madad se semester ke aakhir mein students ka
              feedback likhwata hai. Tehreer nihayat achi hoti hai. Lekin
              usne students ke naam, grades, aur nazm-o-zabt (disciplinary)
              ke notes ek aam consumer AI service mein daal diye, jise
              university ne kabhi manzoor nahi kiya tha. Students ko ye
              bataya hi nahi gaya ke unke academic record ka ye hissa AI ki
              madad se bana. <Strong>Natija achha ho sakta hai, lekin AI ka
              ye istemal phir bhi ghair-zimmedaraana hai.</Strong>
            </Callout>
            <Callout label="Definition">
              <Strong>Diligence</Strong> ka matlab ye hai ke AI ka istemal
              kis tarah hua, aur uske natije ka anjaam kya hua, iski
              zimmedari khud lena.
            </Callout>
            <DiligenceTimelineDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>6.1 Creation Diligence</SubHeading>
            <P>Koi bhi maloomat share karne se pehle ye poochein:</P>
            <CheckList
              items={[
                "Kya is mein zaati (personal) data shamil hai?",
                "Kya is mein company ki khufiya (confidential) maloomat shamil hai?",
                "Kya mujhe ye maloomat is tool mein daalne ki ijazat hai?",
                "Ye data kaun access ya mehfooz rakh sakta hai?",
                "Kya ye service meri organization se manzoor-shuda hai?",
                "Kya koi qanooni, muahide se juri, ya pesha-warana pabandiyan hain?",
              ]}
            />
            <P>
              <Strong>Aasan raasta hamesha zimmedaraana raasta nahi hota.</Strong>{" "}
              Iska hal aksar ye nahi hota ke kaam chhor diya jaye, balke ye
              hota hai ke data ko <Strong>saaf (strip)</Strong> kar diya
              jaye. Ustaad ki misaal mein, wo naam aur student ID hata
              sakta tha, sirf grade ka daira aur ek suluk baaqi rakh sakta
              tha, aur usi se feedback likh sakta tha. Usool ye hai:
              &ldquo;AI ko pattern chahiye, shakhs nahi.&rdquo; Ise{" "}
              <Strong>redaction</Strong> kaha jata hai.
            </P>
            <RecapTable
              head={["Redaction Kis Tarah Nakaam Hoti Hai", "Kya Hota Hai"]}
              rows={[
                ["Bohot ziyada hata diya jaye", "Feedback bina grade aur bina waqia ke, feedback nahi rehta"],
                ["Bohot kam hataya jaye", "Tafseelaat ka majmua bhi kisi ek shakhs ki pehchaan karwa deta hai, jaise \"wo student jisne week 3 ki lab miss ki\""],
              ]}
            />
            <Callout label="Ek Aazmaish (Test)">
              Kya koi sirf isi paste ki hui tehreer parh kar samajh sakta hai
              ke ye kis ke baare mein hai? Agar jawab haan hai, to aapne
              bohot kam hataya hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.2 Transparency Diligence</SubHeading>
            <P>
              Har AI-assisted kaam ko aam elaan ki zaroorat nahi hoti.
              Lekin jab AI doosron ko sarahniya (materially) mutasir kare,
              to zahoori (disclosure) ki ahmiyat barh jati hai: academic
              kaam, mulazmat (hiring) ke faisle, customers se rabta, tibbi
              ya maali mashware, pesha-warana reports, ya aisi tehreer jo
              khalis insaani kaam ki tarah pesh ki jaye. Iske theek theek
              qawaid haalaat, organization, qanoon, aur pesha-warana
              maiyaar (standard) par munhasir hote hain.
            </P>
            <Callout label="Rehnuma Usool">
              &ldquo;AI ki madad se hasil natija doosron ko jitna zyada
              mutasir karta hai, transparency ka mauqif utna hi mazboot ho
              jata hai.&rdquo; Transparency ka matlab apni poori workflow
              bata dena nahi, balke iska matlab ye hai ke jab AI ka kirdar
              ahem ho, to logon ko ghalat-fehmi mein na rakha jaye.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.3 Deployment Diligence</SubHeading>
            <P>
              AI ki madad se banaya gaya kaam shaya (publish), bheja, chalaya
              ja rahe, ya kisi faisle mein istemal hone se pehle check
              karein. Kitni jaanch honi chahiye, ye transparency ka usool
              tay karta hai: jitne zyada log mutasir hote hain, utni hi
              zyada jaanch chahiye. Khud ke liye likha gaya note sirf ek
              nazar chahta hai, welcome email poori tarah parha jata hai,
              aur regulator ko bheji jane wali report ek doosre reviewer se
              guzarti hai.
            </P>
            <CheckList
              items={[
                "Facts ki taeed karein",
                "Yaqeen karein ke sources waqai mojood hain",
                "Hisaab-kitaab (calculations) check karein",
                "Taasub (bias) ya na-insafi wale natijon ka jaiza lein",
                "Ijazat aur huqooq ki taeed karein",
                "Organization ki policy par amal karein",
                "Bare asar wale amal ke liye insaani manzoori lein",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>The Numbers Rule</SubHeading>
            <Callout label="Ek Nihayat Ahem Usool" tone="warn">
              <Strong>Jis number par koi faisla khara ho, wo hamesha
              hisaab laga kar nikala jana chahiye, kabhi bana kar (generate
              karke) nahi.</Strong> Jab AI se kisi quarterly report ka
              khulasa mangwaya jata hai, to wo column ko spreadsheet ki
              tarah jama nahi karta, sirf ye andaza lagata hai ke jama ka
              natija kya lagega, is liye total ghalat ho sakta hai chahe har
              line item sahi ho. Number hamesha spreadsheet, calculator, ya
              AI ke chalaye hue us code se lein jo aapko dikhaya gaya ho,
              phir sirf inputs check karein, jama nahi: kya sahi rows aur
              sahi rate istemal hui?
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Nihayat Ahem Aakhri Sawal</SubHeading>
            <PullQuote>Kya main is par yaqeen ke sath apna naam laga sakta hoon?</PullQuote>
            <P>Agar jawab &ldquo;nahi&rdquo; hai, to kaam abhi tayyar nahi.</P>
            <P>
              Kabhi kabhi mamla saaf ghalat nahi hota, sirf mubham hota hai.
              Iski misaal: ek AI ki banayi hui job applicants ki fehrist
              mawafiq (reasonable) lagti hai, lekin ye pata nahi chalta ke
              wo khamoshi se do universities ke graduates ko tarjeeh de rahi
              hai ya nahi. Faisla karne se pehle ye chaar sawal poochein:
            </P>
            <CheckList
              items={[
                "Is natije se kaun mutasir hota hai, un logon samet jo isay kabhi dekhenge bhi nahi?",
                "Un ke liye kya ghalat ho sakta hai, aur kya wo isay bata bhi sakenge?",
                "Yahan ek munsifana (fair) natija kaisa hoga?",
                "Kya kisi cheez ki zahoori (disclosure) honi chahiye, aur kis ke saamne?",
              ]}
            />
            <P>
              Agar aap chaaron ka jawab de sakte hain, to faisla karein aur
              usay likh lein. Agar nahi, to andaza laga kar bhejne ki
              bajaye, us faisle ke zimmedar tak baat pahunchayein.{" "}
              <Strong>Andaza lagana ek mubham surat-e-haal ko aapki apni
              ghalti bana deta hai.</Strong>
            </P>
            <PullQuote>AI kaam khud kar sakta hai, lekin zimmedari khud nahi le sakta.</PullQuote>
            <P>
              Agar koi AI-assisted nizaam koi nuqsaan-deh faisla kar leta
              hai, to us nizaam ko chalane wali organization phir bhi
              zimmedar rehti hai. Agar coding assistant kisi khaami
              (vulnerability) ko shamil kar deta hai aur engineer usay
              bhej deta hai, to engineer aur organization, donon hi natije
              ke zimmedar rehte hain. Agent Factory isi liye governance ko
              sab se pehle rakhti hai: Creation diligence data ke qawaid,
              rasai ka control, aur manzoor-shuda tool ki policy ban jati
              hai. Transparency diligence zahoori aur istemal karne wale ke
              tajurbe (user experience) ki design ban jati hai. Deployment
              diligence evaluation gates, audit logs, monitoring, aur
              insaani jaiza ban jati hai.
            </P>
            <Callout label="Policy Bhi Ek Zimmedari Hai">
              Koi bhi policy tabhi kaam karti hai jab manzoor-shuda tool tak
              itni hi aasani se rasai ho jitni us tool tak hai jo log pehle
              se khula rakhte hain. Ustaad ka istemal kiya hua consumer
              service sirf ek click door tha. Agar university ka
              manzoor-shuda tool ek darkhwast farm aur ek hafte ke intezar
              ke baad milta, to ye bhi ek policy ki khaami thi, sirf
              ustaad ki zaati ghalti nahi. Mode 2 mein aap sirf khud
              zimmedaraana AI ka istemal nahi kar rahe, balke aap us
              zimmedari ko ek aise product mein shamil kar rahe hain jise
              doosre log istemal karenge.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Chaaron Ko Ek Sath Milana</PartBanner>
            <SubHeading>7. 4Ds Ek Amali Operating Loop Ki Tarah</SubHeading>
            <Flow
              loop
              steps={["Delegate karein", "Describe karein", "Discern karein", "Diligent rahein"]}
            />
            <P>
              <Strong>Delegation</Strong> ye faisla karti hai ke AI kaam
              mein shamil ho ya nahi, aur kya apni zimmedari mein le.{" "}
              <Strong>Description</Strong> AI ko maqsad, context, tareeqa,
              aur suluk ka pata deti hai. <Strong>Discernment</Strong>{" "}
              natije ka jaiza leti hai aur agla marhala behtar banati hai.{" "}
              <Strong>Diligence</Strong> is poore amal ko zimmedari se gher
              leti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Misaal: Ek Bookkeeping Digital FTE</SubHeading>
            <P>
              Ayesha Lahore mein ek Forward Deployed Engineer hai, jo
              Karachi ki ek chhoti si accounting practice ke liye ek
              bookkeeping Digital FTE bana rahi hai. Sab se pehla kaam jo
              automate karna hai, wo hai monthly bank reconciliation.
            </P>
            <Ladder
              steps={[
                { title: "Marhala 1 · Delegation", note: "Ayesha ye nahi poochti ke \"ek reconciliation agent bana do.\" Wo accounting partners ke sath baith kar poora kaam naqsha (map) karti hai: agent bank transactions ko ledger entries se milaye ga, na-milne wale items nishaan-zad karega, aur report ka draft banayega; insaan har journal adjustment manzoor karenge, har write-off ka faisla apne paas rakhenge, tax se juri koi bhi maamla accountant ke paas rahega, aur zyada raqam wale na-milne wale items ek muta&apos;yyin shakhs tak pahunchaye jayenge." },
                { title: "Marhala 2 · Description", note: "System ko chart of accounts, milane ke qawaid, purani reconciliations ki misaalein, partners ka report format, escalation ke qawaid, aur duplicate ya purani cheques ki tareefain di jati hain. Usool ye hai: agent kabhi khud journal entry post nahi karega, aur kabhi client se seedha rabta nahi karega." },
                { title: "Marhala 3 · Discernment", note: "Ayesha ye farz nahi karti ke agent sirf isliye theek kaam kar raha hai kyunke demo achi lagi. Wo agent ko purani, qabil-e-etimaad reconciliations ke muqable mein aazmati hai: kitne matches sahi hain, kitne ghalat matches nikal jate hain, sahi cases escalate hote hain ya nahi, kya agent zaroorat se zyada escalate kar raha hai, aur kya kaarkardagi waqt ke sath badal rahi hai. Ek accountant kuch \"kamiyab\" matches ka bhi jaiza leta hai, sirf nakaamiyon ka nahi, kyunke koi nizaam khamoshi se nakaam ho kar bhi mehfooz dikh sakta hai." },
                { title: "Marhala 4 · Diligence", note: "Client ka maali data manzoor-shuda infrastructure ke andar rehta hai, agent ke amal ka record rakha jata hai, jahan zaroori ho wahan clients ko bataya jata hai ke reconciliation AI ki madad se hui hai, aur phir bhi ek insaani partner reconciliation par dastkhat karta hai aur aakhri natije ka zimmedar rehta hai." },
              ]}
            />
            <P>
              Yehi 4D loop amal mein hai. <Strong>Ek zaati (personal)
              salahiyat ek nizaam ki khasiyat ban gayi.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Chart: Chat Ki Salahiyat Se Factory Nizaam Tak</SubHeading>
            <RecapTable
              head={["Salahiyat", "Ek Chat Mein", "Agent Factory Mein"]}
              rows={[
                ["Delegation", "Ye faisla karna ke AI se kya poochna hai", "Digital FTE ka daira tay karna, insaan-AI ki hadd muta'yyin karna"],
                ["Description", "Hidayaat aur context faraham karna", "System prompts, skills, context engineering, Systems of Record"],
                ["Discernment", "Jawab ka jaiza lena", "Evals, monitoring, sampling, checker par bharosa"],
                ["Diligence", "Data ki hifazat, natije ki zimmedari lena", "Governance, permissions, audit, zahoori, insaani jaiza"],
              ]}
            />
            <P>
              <Strong>&ldquo;Agent Factory AI fluency ki jagah nahi leta, ye
              usay sanaati (industrialize) banata hai.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>10-80-10 Rule Se Talluq</SubHeading>
            <RecapTable
              head={["Marhala", "4Ds Kis Tarah Kaam Karti Hain"]}
              rows={[
                ["Pehle 10%: samt (direction) tay karna", "Delegation aur Description yahan sab se zyada mazboot hain, ye faisla karna ke kya karne ke qabil hai, aur maqsad wazeh karna"],
                ["Darmiyani 80%: AI ki rehnumai karna", "Description aur Discernment mustaqil dohrai jati hain, jaise jaise AI kaam banata hai, aap usay rehnumai dete rehte hain"],
                ["Aakhri 10%: sach ka faisla karna", "Kuch bhi bhejne se pehle Discernment nihayat ahem ho jati hai"],
                ["Poore 100% mein: zimmedaraana amal", "Diligence koi aakhri checkbox nahi, ye poori workflow ko gher leti hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- MISTAKES ---------------------- */}
        <section id="mistakes" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>8. Naye Logon Ki Chaar Aam Ghaltiyan</SubHeading>
            <RecapTable
              head={["Ghalti", "Kaunsi Salahiyat Ki Kami", "Hal"]}
              rows={[
                ["Masla samjhe baghair prompt likhna", "Delegation", "Pehle maqsad, audience, hadood, aur insaan-AI ki taqseem tay karein"],
                ["Pehle jawab ko hi aakhri samajh lena", "Description + Discernment ka chakkar", "Natije ka jaiza lein, khaas feedback dein, aur baar baar koshish karein"],
                ["Pesha-warana lagne wale jawab par andhi tarah bharosa karna", "Discernment", "Ahem facts, andaaze, hisaab-kitaab, aur sources ki taeed karein"],
                ["Privacy aur zimmedari ke baare mein sirf kuch ghalat hone ke baad sochna", "Diligence", "Deployment se pehle data, zahoori, manzoori, aur zimmedari ke qawaid tay karein"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Roz Ka Checklist</SubHeading>
            <RecapTable
              head={["Marhala", "Khud Se Poochein"]}
              rows={[
                ["Delegate", "Maqsad kya hai? AI kya kare? Mere paas kya rahe?"],
                ["Describe", "Output, context, tareeqa, aur suluk mein se AI ko kya chahiye?"],
                ["Discern", "Mujhe kaise pata chalega ke jawab sahi, mukammal, aur qabil-e-istemal hai?"],
                ["Be diligent", "Kya data mehfooz hai? Kya AI ke kirdar ki zahoori zaroori hai? Natije ko kaun manzoor aur zimmedar karta hai?"],
              ]}
            />
            <P>
              Har chhote se kaam ke liye ise kaghazi karwai (paperwork)
              banane ki zaroorat nahi, maqsad sirf itna hai ke ye chaar
              sawal khud-ba-khud zehan mein aa jayen.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Practice Se Pehle Ek Chhota Khulasa</SubHeading>
            <P>
              AI fluency prompts ratta lagane ki salahiyat nahi. Ye AI ke
              sath <Strong>mo&apos;ussar (effective), momtaaz (efficient),
              akhlaaqi (ethical), aur mehfooz (safe)</Strong> tareeqe se
              kaam karne ki salahiyat hai. Iske teen tareeqe hain: Automation,
              jahan AI muta&apos;yyin kaam anjaam deta hai; Augmentation, jahan
              aap aur AI mil kar sochte hain; aur Agency, jahan AI aapke
              tay kiye maqsad ki taraf khud kaam karta hai, aksar un logon
              ke liye jo aap khud nahi hote.
            </P>
            <PullQuote>
              Faisla karo ke AI kya kare. Kaam ko wazeh tareeqe se bayan
              karo. Jo wapis aaye usay jaancho. Aage jo bhi ho, uski
              zimmedari lo.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Aazmayein: Chhe Prompts</SubHeading>
            <P>
              Sirf parh lena kaafi nahi, ek AI assistant khol kar ye
              mashqein (exercises) khud aazmayein. Sab ko ek hi baithak mein
              mukammal karna zaroori nahi.
            </P>
            <Ladder
              steps={[
                {
                  title: "1. Kisi Asal Kaam Ke Liye 4D Plan Banayein",
                  note: "Koi asal kaam chunein aur AI se kahein ke wo ek ek karke Delegation, Description, Discernment, aur Diligence par sawal poochhe, jo apply na ho usay chhor de, aur aakhir mein ek chhoti si table de. Ghor karne wali baat: plan zyada tar aapke apne jawabon se banta hai, AI ke nahi, kyunke Delegation aur Diligence sirf aap khud faisla kar sakte hain.",
                },
                {
                  title: "2. Ek Jaani-Pehchani Mauzu Par Discernment Aazmayein",
                  note: "Ek aisi mauzu par baat karein jismein aapko waqai tajurba ho, aur AI se kahein ke wo aik samajhdar saathi ki tarah baat kare, ustaad ki tarah nahi. Ghor karne wali baat: jab mauzu aapki apni domain ho to Discernment kitni sasti mehsoos hoti hai, aap bina koshish ke hi ghalat daawa pakar lete hain.",
                },
                {
                  title: "3. Non-Expert Hone Ka Ehsaas Karein",
                  note: "Ek aisi mauzu chunein jismein aapko kuch bhi maloom na ho, aur AI se kahein ke wo ek naye seekhne wale ke liye samjhaye, aur aakhir mein wo daawe batae jo aapko taeed karne chahiye. Ghor karne wali baat: usi darje ka output kitna mukhtalif mehsoos hota hai jab check karne ko kuch bhi na ho, yehi ehsaas har us user ko hoga jo aapki banayi hui agent istemal karega.",
                },
                {
                  title: "4. Ek Performance Description Likhein",
                  note: "Session ke shuru mein hi AI ko batayein ke wo kamzor andaazon ko chunauti de, be-yaqeeni ko nishaan-zad kare, aur sirf shaistagi ke liye razamandi na dikhaye. Ghor karne wali baat: farq kitni jaldi nazar aata hai, aur agar naya chat khol kar ye dobara na batayein, to ye kitni jaldi mit jata hai.",
                },
                {
                  title: "5. Sifarish Se Pehle Uski Daleel Ka Jaiza Lein",
                  note: "Koi asal faisla AI ko dein aur usay andaaze, saboot, criteria, aur be-yaqeeniyaan fehrist karne ko kahein, phir sifarish mangwayein. Ghor karne wali baat: koi bhi aisa andaza jo aap bina likhe khamoshi se qabool kar lete, wahi sab se zyada jaanch ke qabil hota hai.",
                },
                {
                  title: "6. Ek Chhota Project Poore 4D Chakkar Se Guzarein",
                  note: "Ek ghante mein mukammal hone wala project chunein: Delegation se shuru karein, har AI ke zimme kaam se pehle description poochein, har ahem output ke baad ruk kar jaiza lein, aur aakhir mein facts, hassas data, zahoori, aur manzoori ka Diligence check karein.",
                },
              ]}
            />
            <Callout label="Har Mashq Ke Baad">
              Khud se poochein: &ldquo;kaunsi D mujh se sab se zyada mehnat
              mangti hai?&rdquo; Yehi wo salahiyat hai jiski aapko sab se
              zyada practice karni chahiye.
            </Callout>
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
                ["AI fluency", "AI ke sath mo'ussar, momtaaz, akhlaaqi, aur mehfooz tareeqe se kaam karne ki salahiyat"],
                ["The 4Ds", "Delegation, Description, Discernment, aur Diligence"],
                ["Automation", "AI khaas hidayaat se ek muta'yyin kaam anjaam deta hai"],
                ["Augmentation", "Insaan aur AI ek doosre ke sochne mein saathi ki tarah kaam karte hain"],
                ["Agency", "AI kisi insaan ki taraf se ek maqsad ki taraf kaam karta hai aur khud kai qadam chunta hai"],
                ["Delegation", "Ye faisla karna ke kaam ka kya hona chahiye, AI kya kare, aur insaan kya apne paas rakhein"],
                ["Problem awareness", "AI ko shamil karne se pehle maqsad, kaam, khatraat, aur kamiyabi ko samajhna"],
                ["Platform awareness", "Ye samajhna ke kaunsa AI system ya tool is kaam ke liye theek hai"],
                ["Task delegation", "Kaam ke hisson ko jaan-boojh kar insaan ya AI ko sonpna"],
                ["Description", "AI ko wo maloomat aur rehnumai dena jo achay kaam ke liye zaroori hai"],
                ["Product description", "Chahiye wale output ki wazahat karna"],
                ["Process description", "AI ko kaam kis tareeqe se karna hai, iski wazahat karna"],
                ["Performance description", "Ye wazahat karna ke AI khud se un logon ke liye kis tarah suluk kare jo isay istemal karenge"],
                ["Discernment", "AI ke output, uski daleel, aur uske suluk ka jaiza lena"],
                ["Product discernment", "Khud natije ka jaiza lena"],
                ["Process discernment", "Ye jaiza lena ke AI ke sath kaam karne ka ye tareeqa faida-mand hai ya nahi"],
                ["Performance discernment", "Ye jaiza lena ke AI ka khud-mukhtar, user ke saamne aane wala suluk logon ke liye achay natije la raha hai ya nahi"],
                ["Diligence", "AI ka istemal kis tarah hua, aur uske natije ka anjaam kya hua, iski zimmedari lena"],
                ["Creation diligence", "Banane se pehle aur is dauran tools, data, aur AI ka zimmedaraana intekhab"],
                ["Transparency diligence", "Jab AI ka kirdar mutasir hone wale logon ke liye ahem ho, to sachai batana"],
                ["Deployment diligence", "AI-assisted kaam ko istemal, shaya, bhejne, ya chalane se pehle taeed aur zimmedari lena"],
                ["Context engineering", "AI system ke liye zaroori poora ma'lumati mahol design karna: hidayaat, documents, tools, memory, policies, aur misaalein"],
                ["Automation bias", "Khud-kaar output par zaroorat se zyada aasani se bharosa kar lene ki insaani fitrat"],
                ["Hallucination", "Ek bharosemand ya sahi lagne wala AI output jismein banayi hui ya ghalat maloomat shamil ho"],
                ["Redaction", "AI ko data dene se pehle shakhs ya organization ki pehchaan karwane wali tafseelaat hatana, jabke kaam ke liye zaroori pattern baaqi rakhna"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source &amp; License Note">
              AI Fluency Framework <Strong>Rick Dakan</Strong> (Ringling
              College) aur <Strong>Joseph Feller</Strong> (University
              College Cork) ne banaya, aur ye Anthropic ke sath milkar tayar
              hua. Framework ka course <Strong>CC BY-NC-SA 4.0</Strong> ke
              tehat jaari hua, jabke unka practical overview reference
              document <Strong>CC BY-NC-ND 4.0</Strong> ke tehat hai. Ye
              Cybrum ke notes is framework ki apni ek Roman Urdu tashreeh
              hain, jo Agent Factory book (agentfactory.panaversity.org) ke
              crash course par mabni hain, iski copy nahi. Asal (original)
              parhne ke liye:{" "}
              <a
                href="https://aifluencyframework.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                aifluencyframework.org
              </a>{" "}
              aur Claude Academy ka muft course{" "}
              <a
                href="https://academy.claude.com/courses/ai-fluency-framework-foundations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                AI Fluency: Framework and Foundations
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
              Pehle khud jawab dein, phir sawal par click kar ke jawab check
              karein. Agar aath ya zyada sahi hon, to aap agle chapter ke
              liye tayyar hain.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "AI fluency ki chaar sifaat kya hain?",
                  a: "Effective, Efficient, Ethical, aur Safe. Ye ek pukhta salahiyat hai, prompt tricks ka majmua nahi.",
                },
                {
                  q: "Automation, augmentation, aur agency mein farq kya hai?",
                  a: "Automation mein AI khaas hidayaat se ek muta'yyin kaam karta hai (aap script writer hain). Augmentation mein aap aur AI ek doosre ke sochne mein saathi ki tarah kaam karte hain (aap co-creator hain). Agency mein AI ek maqsad ki taraf, apni hadood ke andar, khud kai qadam chunta hai, aksar aapki maujoodgi ke baghair aur kabhi kabhi doosron ke liye (aap director hain).",
                },
                {
                  q: "Delegation ke teen hisse kya hain?",
                  a: "Problem Awareness (maqsad aur kamiyabi samajhna), Platform Awareness (sahi AI tool ka intekhab), aur Task Delegation (kaam ko jaan-boojh kar taqseem karna).",
                },
                {
                  q: "Description ke teen hisse kya hain?",
                  a: "Product description (kya chahiye), Process description (kis tarah ho), aur Performance description (AI kaisa suluk kare). Yaad rakhne ka tareeqa: What → How → Mere sath kis tarah pesh aana hai.",
                },
                {
                  q: "Ek bharosemand AI jawab ko bhi taeed ki zaroorat kyun hoti hai?",
                  a: "Kyunke AI sahi lagne wala (plausible) output banata hai, aur sahi lagna, sahi hone jaisa nahi hota. Rawaan alfaaz facts, andaazon, ya daleel ki taeed nahi karte; automation bias humein bharosemand lagne wale jawabon par zaroorat se zyada aasani se yaqeen karwa deta hai.",
                },
                {
                  q: "Discernment ke teen hisse kya hain?",
                  a: "Product discernment (kya natija achha hai?), Process discernment (kya ye tareeqa faida-mand hai?), aur Performance discernment (jab AI khud amal karta hai, kya logon ki achi khidmat ho rahi hai?).",
                },
                {
                  q: "Diligence ke teen hisse kya hain?",
                  a: "Creation diligence (tools aur data ka zimmedaraana intekhab), Transparency diligence (AI ke kirdar ke baare mein sachai batana), aur Deployment diligence (bhejne se pehle taeed aur zimmedari lena).",
                },
                {
                  q: "AI-assisted kaam bhejne se pehle kaunsa sawal poochna chahiye?",
                  a: "\"Kya main is par yaqeen ke sath apna naam laga sakta hoon?\" Agar jawab nahi hai, to kaam abhi tayyar nahi.",
                },
                {
                  q: "Ek jumle mein, 4D loop kya hai?",
                  a: "Faisla karo ke AI kya kare, kaam ko bayan karo, jo wapis aaye usay parkho, aur poore amal ki zimmedari lo, zaroorat parne par ye silsila dohrao.",
                },
                {
                  q: "Agent Factory mein Discernment ek engineering amal kis tarah banti hai?",
                  a: "Ye eval suites, monitoring, sampling, aur release gates jaise tareeqon mein badal jati hai, jo ye jaanchte hain ke koi AI system qabil-e-qabool tareeqe se kaam kar raha hai ya nahi. Zaati sawal \"kya ye kaafi achha hai?\" ek nizaam-paimana (system-scale) infrastructure ban jata hai.",
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
