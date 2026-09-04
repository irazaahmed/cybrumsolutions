import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Database,
  ListChecks,
  Plug,
  Scale,
  ShieldCheck,
  Users,
  XCircle,
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

const chapter = chapters.find((c) => c.slug === "governance-risk-responsible-use")!;
const prevChapter = getPrevLiveChapter("governance-risk-responsible-use");
const nextChapter = getNextLiveChapter("governance-risk-responsible-use");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "4 sawal (Case, Data, Capability, People) se AI ka kaam safe rakhna, defined gate kaise likhen, data tiers, Skills ka trust check, aur incident hone par kya karein, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/governance-risk-responsible-use" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/governance-risk-responsible-use`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Ek Ordinary Tuesday", level: 2 },
  { id: "part1", text: "Part 1 · The Case", level: 2 },
  { id: "part2", text: "Part 2 · The Data", level: 2 },
  { id: "part3", text: "Part 3 · The Capability", level: 2 },
  { id: "part4", text: "Part 4 · The People", level: 2 },
  { id: "part5", text: "Part 5 · Sab Kuch Sath, Aur Incident", level: 2 },
  { id: "part6", text: "Part 6 · Habit Ko Zinda Rakho", level: 2 },
  { id: "recap", text: "Recap", level: 2 },
  { id: "practice", text: "Practice: Apna Record Banao", level: 2 },
  { id: "projects", text: "Governance Record Template", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function FourQuestionsDiagram() {
  const rows = [
    { icon: Scale, t: "The Case", a: "Fully appropriate", m: "Appropriate with human review", z: "Inappropriate" },
    { icon: Database, t: "The Data", a: "Green", m: "Check first / control add karo", z: "Route se bahar" },
    { icon: Plug, t: "The Capability", a: "Enable", m: "Escalate for review", z: "Decline" },
    { icon: Users, t: "The People", a: "Decide aur document karo", m: "Disclose", z: "Sawal escalate karo" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-2.5">
        {rows.map(({ icon: Icon, t, a, m, z }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                <Icon size={14} />
              </span>
              {t}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted">{a}</div>
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-500">{m}</div>
              <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted">{z}</div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Middle answer (highlighted) sabse demanding hai, ye ek commitment
        maangta hai: ek reviewer, ek control, ek route ka naam
      </figcaption>
    </figure>
  );
}

function DefinedGateDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
          <p className="mb-2 text-sm font-semibold text-foreground">Defined Gate</p>
          <CheckList
            items={[
              "Who: wo role jo actually responsibility rakhta hai",
              "What: wo specific risk jo review pakadne ke liye hai",
              "When: output hard-to-undo hone se pehle",
            ]}
          />
        </div>
        <div className="rounded-xl border border-border bg-card/40 p-4">
          <p className="mb-2 text-sm font-semibold text-muted">Gate Nahi Hai</p>
          <ul className="space-y-2 text-xs text-muted">
            <li>&ldquo;Human loop mein rahega&rdquo;</li>
            <li>&ldquo;Koi check kar lega&rdquo;</li>
            <li>&ldquo;Review hoti hai&rdquo;</li>
            <li>&ldquo;Appropriate oversight ke sath&rdquo;</li>
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Agar who/what/when form mein nahi likh sakte, workflow chalne ke
        liye ready nahi hai
      </figcaption>
    </figure>
  );
}

function DataTiersDiagram() {
  return (
    <figure className="my-7">
      <div className="space-y-2.5">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-sm font-semibold text-foreground">Green · Generally Permitted</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Public material, genuinely anonymised/aggregated data, internal
            material jo broad use ke liye approved hai
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm font-semibold text-foreground">Yellow · Pehle Check Karo</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Internal-only documents, personal contact info, customer/employee
            identifiers, unannounced deal ya product information
          </p>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm font-semibold text-foreground">Red · Unapproved Route Se Nahi</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Credentials, secrets, highly regulated ya specially protected
            data, privileged ya third-party confidential material
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        2 tiers ke darmiyan confused ho, to zyada sensitive wala chuno, ek
        tier zyada ehtiyat sirf ek confirmation ki cost rakhti hai
      </figcaption>
    </figure>
  );
}

function TrustCheckDiagram() {
  const items = [
    { icon: ShieldCheck, t: "Enable", d: "Source pata hai, reach proportionate hai, task fit karta hai, actions controlled hain" },
    { icon: AlertTriangle, t: "Escalate", d: "Kuch important establish nahi ho pa raha: source uncertain, reach broad, ya security implications role se bahar" },
    { icon: XCircle, t: "Decline", d: "Reach clearly disproportionate, ya trust establish nahi ho sakta" },
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
        Sab kuch escalate karna utni hi badi failure hai jitni sab kuch
        enable karna
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
  url: `${site.url}/anthropic-exam-prep/governance-risk-responsible-use`,
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

export default function GovernanceRiskResponsibleUseChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke Governance,
              Risk, and Responsible Use domain ke liye foundation hai
            </p>
            <CoreIdea>
              Ek logistics company ka AI ke sath acha saal chal raha hai.
              Phir ek project manager, ek director ka sawal lunch se pehle
              answer karne ki koshish mein, customer names aur account
              numbers wali spreadsheet AI chat mein upload kar deti hai. Wo
              koi rule todne ki koshish nahi kar rahi. Company investigate
              hone tak AI use freeze kar deti hai, aur wo teams bhi apna
              workflow kho dete hain jinhone kuch galat nahi kiya, kyunke ek
              routine decision ne aisa risk bana diya jise organisation
              ignore nahi kar sakti. Ye ek dramatic failure nahi hai, ek
              ordinary decision hai jise kisi ne decision ki tarah frame
              hi nahi kiya.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Poora Course, 30 Seconds Mein</SubHeading>
            <P>
              AI se koi meaningful kaam karwane se pehle 4 sawal poocho:
            </P>
            <FourQuestionsDiagram />
            <Callout label="Kab Ye Chalana Hai">
              &ldquo;Meaningful work&rdquo; matlab wo kaam jo kisi aur ke
              data, kisi ke paise, ya kisi insaan ke baare mein decision ko
              touch kare. Apna email reword karna, ek public article
              summarize karna, koi notes jin pe koi act nahi karega, in par
              nahi chalta. Jo kaam qualify karta hai us pe chalao, baaki
              skip karo, warna ye habit ek hafte mein chhoot jayegi.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · The Case: Kya AI Ye Kaam Kar Sakta Hai?</PartBanner>
            <P>
              Ye sawal pehle aata hai, kyunke agar AI ko ye kaam karna hi
              nahi chahiye, baad ke data aur tool wale sawal matter hi
              nahi karte. 4 screens use karo (AI Fluency Framework mein
              inhe <Strong>Delegation criteria</Strong> kehte hain):
            </P>
            <RecapTable
              head={["Screen", "Sawal"]}
              rows={[
                ["Reversibility", "Agar output galat hai, kya nuksan hone se pehle catch aur undo kar saktay hain?"],
                ["Consequence of error", "Agar galat hui, kya hota hai? Cost trivial hai, mehngi hai, harmful, regulated, ya irreversible?"],
                ["Human judgment ya empathy", "Kya task relationship, care, ya original judgment maangta hai jo insaan ko khud karni chahiye?"],
                ["Accountability", "Iska jawab kaun deta hai, aur kya wo AI ka output meaningfully review aur own kar sakta hai?"],
              ]}
            />
            <RecapTable
              head={["Answer", "Matlab"]}
              rows={[
                ["Fully appropriate", "Low consequence, reversible, normal work mein review hona aasan, koi special gate nahi chahiye"],
                ["Appropriate with human review", "AI useful hai, lekin use hone/send/publish hone se pehle ek specific human check chahiye"],
                ["Inappropriate", "Consequence, irreversibility, ya human responsibility itni bhari hai ke review se bhi repair nahi hoti"],
              ]}
            />
            <Callout label="Deciding Factor Dhoondo">
              Poocho: agar in 4 jawabon mein se ek badal jaye, kaunsa
              change is classification ko doosri category mein le jayega?
              Wahi factor ye decision carry kar raha hai. &ldquo;Ye risky
              lagta hai&rdquo; ki bajaye ab aap keh saktay ho: &ldquo;Ye
              appropriate with review hai kyunke organisation customer ko
              di gayi factual claim ke liye accountable hai.&rdquo;
            </Callout>
            <SubHeading>Human In The Loop Ek Gate Nahi Hai</SubHeading>
            <P>
              &ldquo;Insaan review karega&rdquo; responsible lagta hai aur
              aksar kuch matlab nahi rakhta:
            </P>
            <DefinedGateDiagram />
            <RecapTable
              head={["Use Case", "Classification", "Kyun", "Gate"]}
              rows={[
                ["Approved policy docs se internal FAQ draft karna", "Appropriate", "Reversible, low consequence, authoritative sources maujood hain", "Normal editorial review"],
                ["Billing complaint ka customer response draft karna", "Appropriate with review", "Company customer ke account facts ke liye accountable hai", "Support agent facts aur tone verify kare, bhejne se pehle"],
                ["Final professional determination banana", "Inappropriate", "Professional accountability aur consequence transfer nahi ho sakti", "Human professional khud decide aur own karta hai"],
                ["Candidate applications summarize kar ke organise karna", "Appropriate with strong review", "Applicants ke liye consequential, unfair filtering ka risk", "Hiring owner inclusion AND exclusion dono review kare"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · The Data: Kya Ye Information Andar Ja Sakti Hai?</PartBanner>
            <P>Order yaad rakho:</P>
            <Flow
              steps={["Data classify karo", "Poocho kya task ko identifying details chahiye", "Route confirm karo", "Control chuno"]}
            />
            <SubHeading>3 Practical Tiers</SubHeading>
            <DataTiersDiagram />
            <SubHeading>Sabse Zyada Useful Data Sawal</SubHeading>
            <PullQuote>
              Kya task ko actually identifiers chahiye, ya sirf pattern?
            </PullQuote>
            <P>
              Agar spending trends analyse kar rahe ho, shayad customer
              names ki zaroorat nahi. Agar ek specific account reconcile
              kar rahe ho, identifier zaroori hai.
            </P>
            <Callout label="Redaction Magic Nahi Hai" tone="warn">
              2 tareeke se fail hoti hai: <Strong>Partial redaction</Strong>{" "}
              (obvious identifier hataya lekin itne clues chhod diye ke
              insaan phir bhi pehchana ja sake), aur{" "}
              <Strong>Redaction jo task todti hai</Strong> (wo information
              hata di jo task ko actually chahiye thi). &ldquo;Customer
              17&rdquo; likhna pehla move hai, verdict nahi. Poocho: kya
              koi abhi bhi wo list rakhta hai jo Customer 17 ko real insaan
              se jodti hai? Agar haan, ye <Strong>pseudonymised</Strong>{" "}
              hai, tier wahi rehti hai. Agar mapping gaya, task ko sirf
              pattern chahiye tha, tab ye <Strong>anonymised</Strong> hai
              aur restriction apply nahi hoti.
            </Callout>
            <SubHeading>Route Utna Hi Matter Karta Hai Jitna Tool Ka Naam</SubHeading>
            <P>
              Sawal ye nahi hai &ldquo;kya ye AI product approved
              hai?&rdquo;, sawal ye hai:{" "}
              <Strong>&ldquo;kya ye specific route, is data, aur is
              purpose ke liye approved hai?&rdquo;</Strong>. Data apne
              collect hone ki wajah ke sath aati hai, ek gym members ka
              phone number class reminders ke liye rakhta hai, wahi
              numbers supplements bechne ke liye use karna ek alag purpose
              hai. Naya AI workflow chalane se pehle poocho ke jis
              purpose ke liye data collect hua tha, kya wo is use ko
              cover karta hai.
            </P>
            <Callout label="Controls Narrower Sawal Answer Karte Hain">
              Temporary/incognito conversation, memory controls, sandbox,
              Project, org-managed workspace, ye sab kisi particular risk
              ko kam kar sakte hain, lekin ye khud se authorisation ka
              sawal answer nahi karte. Sandbox ek execution boundary hai,
              approval boundary nahi.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · The Capability: Kya Main Ye On Kar Sakta Hoon?</PartBanner>
            <P>
              Sawal ab sirf &ldquo;kya main model pe trust karta hoon&rdquo;
              nahi hai, ye hai: <Strong>&ldquo;is session ya agent mein
              main kya authority add kar raha hoon?&rdquo;</Strong>
            </P>
            <Callout label="Sabse Zaroori Fact" tone="warn">
              <Strong>Ek Skill apni permission list nahi rakhti.</Strong>{" "}
              Ek Connector ke scopes hote hain jo aap grant aur narrow kar
              saktay ho. Skill ka koi dial nahi hai, wo usi access ke sath
              chalti hai jo session ke paas already hai, iski reach har wo
              cheez hai jo session reach kar sakta hai, sirf wo nahi jo
              uske stated task ko chahiye.
            </Callout>
            <P>5 checks chalao:</P>
            <CheckList
              items={[
                "Source: kisne banaya ya publish kiya?",
                "Reach: jis environment mein ye chalti hai, kya data, files, systems, tools, ya credentials touch kar sakti hai?",
                "Fit: kya ye reach us kaam ke proportionate hai jo aapko chahiye?",
                "Outside content: kya ye web pages, incoming email, customer files, shared documents parhegi?",
                "Actions: kya ye send, pay, delete, publish, edit, ya kisi hard-to-reverse change ka sabab ban sakti hai?",
              ]}
            />
            <TrustCheckDiagram />
            <Callout label="Ehtiyat" tone="warn">
              Sabse mushkil source case anonymous forum download nahi hai,
              wo Skill hai jo aapki hi company ki doosri team ne banayi
              hai, kyunke &ldquo;internal&rdquo; vetted lagti hai bina
              vetted huay. Us team ne apni convenience ke liye broad reach
              di ho sakti hai, ya ek policy ke against banayi ho jo ab
              badal chuki hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Trusted Tool, Untrusted Content</SubHeading>
            <P>
              Ek capability trusted publisher se aa sakti hai aur phir bhi
              wo content parh sakti hai jo kisi na-trusted ne likha ho.
              Isay <Strong>prompt injection</Strong> kehte hain.
            </P>
            <PullQuote>
              Tool kisne likha aur content kisne likha, ye 2 alag trust
              sawal hain.
            </PullQuote>
            <P>
              Risk sabse zyada tab barhta hai jab ek AI workflow untrusted
              content parhta bhi hai <Strong>aur</Strong> consequential
              actions le sakta hai. Ordinary knowledge work ke liye
              default: AI ko sirf wahi parhne do jo zaroori hai, read-only
              access ko prefer karo jab kaafi ho, aur send/publish/pay/
              delete/approve ko ek defined human gate ke peeche rakho jab
              tak workflow ne higher autonomy earn na ki ho.
            </P>
            <Callout label="Agent Builders Ke Liye">
              System level pe, &ldquo;reach&rdquo; architecture ban jati
              hai: scoped credentials, tool allow-lists, typed actions,
              confirmation policies, network restrictions, audit logs.
              Governing principle: <Strong>least privilege</Strong>, agent
              ko sirf utni authority do jitni job ke liye chahiye.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · The People: Kya Ye Kisi Ko Unfairly Affect Karega?</PartBanner>
            <P>Pehle 3 sawal mostly organisation aur uski information ko protect karte hain. Ye sawal bahar dekhta hai:</P>
            <CheckList
              items={[
                "Kaun affect ho raha hai, un logon samet jo output kabhi dekhte hi nahi?",
                "Unke liye kya galat ho sakta hai?",
                "Kya wo notice ya challenge kar payenge?",
                "Ek fair process kaisa dikhega?",
                "Kya disclosure zaroori hai, ya AI involvement unke liye reasonably matter karti hai?",
              ]}
            />
            <Callout label="Jo Exclude Hua Wo Dekho" tone="warn">
              Sabse aasan miss hone wala risk tab hota hai jab system ek
              set narrow karta hai aur insaan sirf survivors ko inspect
              karte hain (candidate shortlists, fraud flags, escalation ke
              liye chuni gayi tickets). Agar AI ek group ko systematically
              hata deta hai, koi notice nahi karta agar review sirf jo
              bacha hai usay dekhe. Practical control: exclusions ko bhi
              sample karo, sirf inclusions nahi.
            </Callout>
            <SubHeading>Disclosure: Pehle Rules, Phir Judgment</SubHeading>
            <Ladder
              steps={[
                { title: "Pehle: Kya Disclosure Required Hai?", note: "Law, policy, contract, professional rules, client commitments check karo. Agar koi require karta hai, decision ho chuka" },
                { title: "Doosra: Agar Koi Rule Nahi", note: "Kya AI involvement is insaan ki work ya relationship ki understanding badal degi? Consequential ya relational work zyada transparency deserve karti hai" },
              ]}
            />
            <P>
              2 disclosure cases baar baar aati hain: <Strong>Authorship</Strong>{" "}
              (jo kaam aapke naam se jata hai wo aapka hai use stand karne
              ke liye, chahe AI ne kitna bhi draft kiya ho) aur{" "}
              <Strong>meeting notetaker</Strong> (chaaron sawal ek sath
              touch karti hai, sabko announce karo shuru mein, kuch
              jurisdictions mein har participant ki consent chahiye).
            </P>
            <SubHeading>Sawal Escalate Karo, Verdict Nahi</SubHeading>
            <P>3 signals mein se koi ek kaafi hai:</P>
            <CheckList
              items={[
                "Affected population bada hai",
                "Potential harm significant hai",
                "Sawal aisi area ko touch karta hai jahan aapki team ko standing hi nahi (law, contract, employment)",
              ]}
            />
            <Callout label="Weak Vs Strong Escalation">
              Weak: &ldquo;Mujhe lagta hai ye theek hai, approve kar
              den?&rdquo; Strong: &ldquo;Ye raha workflow, ye affected hain,
              ye control hamne add kiya, aur ye wo point hai jo framework
              settle nahi karta.&rdquo;
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 5 ---------------------- */}
        <section id="part5" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 5 · Sab Kuch Sath, Aur Incident</PartBanner>
            <SubHeading>Ek Ordinary Workflow, Shuru Se Aakhir Tak</SubHeading>
            <P>
              Ayesha ek logistics company mein operations lead hai. Weekly
              service-exception report AI se draft karwana chahti hai,
              phir account manager bhejta hai.
            </P>
            <RecapTable
              head={["Sawal", "Answer"]}
              rows={[
                ["The Case", "Appropriate with human review, deciding factor accountability. Gate: account manager delivery facts dispatch record se check kare, tone disputed accounts pe dekhe, bhejne se pehle"],
                ["The Data", "Yellow tier (customer names, shipment info), task ko identifiers chahiye (customer report), isliye specific workspace aur route confirm kiya"],
                ["The Capability", "Dispatch system connector, source internal platform team, reach sirf reporting tables, actions mein sending shamil nahi, read-only enable, sending account manager ke paas rehti hai"],
                ["The People", "Customers aur drivers/staff dono affected (free-text notes mein), fairness check: attribution dispatch record se match kare, disclosure contract/policy se check karo"],
              ]}
            />
            <P>
              <Strong>The Evidence</Strong> (5th part): success measure
              (account managers check karte hain bhejne se pehle),
              failure threshold (koi bhi material factual error customer
              tak pahunche), monitor (Ayesha monthly sample review karti
              hai), residual risk (consistent wording bias sab reports
              mein individual checks se bach sakta hai, isliye sample
              review customers ke across bhi compare karta hai).
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Governance Record: Ek Page Jo Meeting Se Bach Jaye</SubHeading>
            <P>
              4 sawal aapke sar mein useful hain. Likh diye jayein to
              organisationally useful ban jate hain. Ek blank field ek
              guess kiye hue field se behtar hai, agar owner ya route
              pata nahi, <Strong>OPEN QUESTION</Strong> likho aur sahi
              banda dhoondo.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Jab Kuch Galat Ho Jaye</SubHeading>
            <P>
              Governance ye promise nahi hai ke koi galti kabhi nahi hogi.
              Ye galtiyon ko itna jaldi surface karne ki ability hai ke
              contain ho sakein.
            </P>
            <Ladder
              steps={[
                { title: "1. Spread Roko", note: "Forward, repost, ya unnecessary new copies mat banao" },
                { title: "2. Facts Record Karo", note: "Kya hua, kaunsa data/output/action shamil tha, kaunsa route, kab, aur kya kahin aage gaya" },
                { title: "3. Foran Report Karo", note: "Apni organisation ke incident path se, sensitive cases mein timing legally matter karti hai" },
                { title: "4. Facts Plainly Batao", note: "Speculation aur self-defence avoid karo" },
                { title: "5. Incident Owner Ki Instructions Follow Karo", note: "Deletion, notification, disclosure jaise sawal khud decide mat karo" },
              ]}
            />
            <Callout label="Ehtiyat" tone="warn">
              Chupke se evidence delete mat karo aur ummeed mat karo issue
              gayab ho jayega. Aapki visible copy delete karna organisation
              ya vendor records delete nahi karta, aur investigation mein
              rukawat daal sakta hai. <Strong>Near misses bhi report
              karo</Strong>, wo batati hain process kahan confusing hai.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 6 ---------------------- */}
        <section id="part6" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 6 · Habit Ko Zinda Rakho</PartBanner>
            <SubHeading>Governance Kyun Drift Karti Hai</SubHeading>
            <P>
              High-stakes decisions attention paate hain kyunke sab jante
              hain ye important hain. Routine decisions governance ke
              liye zyada khatarnak hain kyunke har ek itna chhota lagta
              hai ke count na ho. Ek insaan thodi aasan tool use karta hai.
              Ek human review ek glance ban jata hai. Ek connector project
              badalne ke baad bhi permission rakhta hai.
            </P>
            <PullQuote>
              Policy aur asal mein log jo karte hain, uske darmiyan jo
              faasla hai, wahin risk rehta hai. Isay Diligence gap kehte
              hain.
            </PullQuote>
            <SubHeading>Usage Audit Chalao</SubHeading>
            <CheckList
              items={[
                "Kaunse AI workflows actually use ho rahe hain?",
                "Unse actually kaunsa data guzarta hai?",
                "Kya defined human gates actually chali?",
                "Kaunse naye tools, Skills, connectors, ya permissions add huay?",
                "Model, feature, route, data, ya audience mein kya badla?",
              ]}
            />
            <Callout label="Process Audit Karo, Insaan Nahi">
              Agar audit ek chupi hui performance review ban jaye, log
              auditors ko sirf sabse saaf kaam dikhayenge. Purpose{" "}
              <Strong>system gaps</Strong> dhoondna hai: confusing rules,
              zaroorat se zyada friction, kamzor gates.
            </Callout>
            <SubHeading>Friction Ka Rule</SubHeading>
            <P>
              Agar approved path 10 steps leta hai aur unapproved path 1
              step, log deadline ke neeche 1-step wala route dhoondh
              lenge. Isay <Strong>shadow AI</Strong> kehte hain, work data
              jo un tools/accounts se guzarta hai jo organisation ne kabhi
              approve nahi kiye. Jab bar bar workarounds dikhein, poocho:{" "}
              <Strong>&ldquo;approved way ko unsafe way se harder kya
              bana raha hai?&rdquo;</Strong> Ye ek fix, doosri reminder
              email se zyada risk kam kar sakta hai.
            </P>
            <SubHeading>Agar Koi AI Policy Nahi Hai</SubHeading>
            <P>
              Apni khud ki policy invent kar ke official ki tarah present
              mat karo. Sahi owner ke liye ek interim proposal banao:
            </P>
            <CheckList
              items={[
                "Approved AI products aur work data ke liye specific routes",
                "Ek chhoti list un data types ki jinhe use se pehle confirmation chahiye",
                "External ya consequential outputs ke liye human-gate rule",
                "Naye Skills, connectors, high-authority tools ke liye review rule",
                "Sawalon aur incidents ke liye ek named role ya channel",
              ]}
            />
            <SubHeading>Workflow Badle To Dobara Check Karo</SubHeading>
            <P>
              Model ya model family, feature ya retention behaviour,
              connector/Skill/permission/action, data type, outside
              content ka source, audience, error ki consequence, law/
              policy/contract/vendor terms, in mein se koi badle to
              Governance Record dobara check karo. &ldquo;Pichle saal
              approved tha&rdquo; review skip karne ki wajah nahi hai agar
              jo approve hua tha wo ab wahi cheez nahi rehi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>One-Minute Checklist</SubHeading>
            <RecapTable
              head={["Sawal", "Quick Check", "Middle Answer Ke Liye"]}
              rows={[
                ["Case", "Kya AI ye task responsibly kar sakta hai?", "Defined human gate: who/what/when"],
                ["Data", "Kya ye information is route se ja sakti hai?", "Ek control, data minimisation, ya confirmed approved route"],
                ["Capability", "Kya ye tool ya authority enable honi chahiye?", "Ek specific security/admin review sawal"],
                ["People", "Kya ye logon ko affect kar sakti hai ya disclosure maangti hai?", "Fairness check, disclosure, ya escalation"],
              ]}
            />
            <Callout label="Aakhri Sawal">
              &ldquo;Pichli baar jab hamne ye decide kiya theek hai, tab
              se kya badla?&rdquo; Agar kuch nahi, aage badho. Agar kuch
              material badla, relevant block dobara check karo.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Poora Course, Compressed</SubHeading>
            <PullQuote>
              Act karne se pehle classify karo. Agar answer beech mein
              hai, commitment ka naam lo. Phir likho ke kyun.
            </PullQuote>
            <CheckList
              items={[
                "4 sawal: The Case (kya AI kar sakta hai), The Data (kya andar ja sakti hai), The Capability (kya on karna hai), The People (kya kisi ko unfairly affect karega)",
                "Har sawal ke 3 jawab hain, middle wala hamesha ek commitment maangta hai: reviewer, control, ya route ka naam",
                "Ek defined gate who/what/when form mein likha jata hai, \"human review karega\" ek gate nahi hai",
                "Data ke liye: pehle classify karo, phir poocho identifiers chahiye ya sirf pattern, phir route confirm karo",
                "Ek Skill ki apni permission list nahi hoti, wo session ki poori reach ke sath chalti hai, isliye source/reach/fit check karo",
                "Prompt injection tab sabse khatarnak hai jab AI untrusted content parhta bhi hai aur consequential action bhi le sakta hai",
                "Jo exclude hua wo bhi sample karo, sirf jo bacha wo nahi, warna unfair filtering kabhi pakdi hi nahi jati",
                "Governance Record ek page hai: Case, Data, Capability, People, Evidence, owner, aur re-check triggers",
                "Incident ho to: spread roko, facts record karo, foran report karo, incident owner follow karo, evidence chupao mat",
                "Diligence gap wahan banti hai jahan policy aur asal practice mein faasla hota hai, fix friction hai, extra reminder nahi",
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: Apna Governance Record Banao</SubHeading>
            <P>
              Ek real workflow chuno jo aap own ya influence karte ho,
              jahan AI already help karta hai ya jald karega. Fictional ya
              already-approved example use karo, koi confidential material
              is exercise ke liye paste mat karo.
            </P>
            <Ladder
              steps={[
                { title: "Block 1 · The Case", note: "AI kya karta hai, human kya karta hai, classification, deciding factor, gate (who/what/when)." },
                { title: "Block 2 · The Data", note: "Kya data andar jata hai, uski tier, kya task ko identifiers chahiye, agar sensitive fields rahen to approved route." },
                { title: "Block 3 · The Capability", note: "Har Skill/connector/tool ke liye: source, reach, fit, outside content, consequential actions, outcome (enable/escalate/decline)." },
                { title: "Block 4 · The People", note: "Kaun affected hai, kya harm plausible hai (exclusions samet), disclosure decision, kya escalate hona chahiye." },
                { title: "Block 5 · The Evidence", note: "Success measure, failure threshold, monitoring owner/cadence, residual risk." },
              ]}
            />
            <Callout label="Ehtiyat" tone="warn">
              AI assistant se apni reasoning challenge karwao, approve
              mat karwao. Ek AI assistant aapka policy owner, security
              reviewer, compliance function, ya final authority nahi hai.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Governance Record: Copy Karo</SubHeading>
            <PromptBox>{`GOVERNANCE RECORD
Workflow:                        Owner:                    Date:

THE CASE
  Classification:      appropriate / appropriate with review / inappropriate
  Deciding factor:
  Gate: who               what they verify              when

THE DATA
  Tier:                green / yellow / red
  Does the task need the identifiers?     yes / no
  Fields removed:
  Approved route:

THE CAPABILITY
  Tools, Skills, connectors enabled:
  Source:                                  Reach:
  Outside content it reads:
  Actions it must not take without review:

THE PEOPLE
  Who is affected:
  Fairness check (including exclusions):
  Disclosure decision:                     Required by / judgment
  Open question or escalation:

THE EVIDENCE
  Success measure:
  Failure threshold:
  Monitored by:                            How often:
  Residual risk:

RE-CHECK IF: model, feature, data, audience, permission, policy,
vendor term, or business consequence changes.`}</PromptBox>
            <Callout label="Aakhri Kadam">
              Record us insaan ko bhejo jo workflow, policy, ya risk ka
              owner hai: &ldquo;Ye main is workflow ko chalane ka propose
              kar raha hoon, approval, data route, reviewer, ya control ke
              baare mein koi assumption correct kar dein.&rdquo; Goal har
              harmless task pe signature lena nahi hai, non-obvious
              assumptions ko incident banne se pehle visible decisions
              banana hai.
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
                ["Delegation criteria", "4 screens jo decide karte hain AI ye kaam kare ya nahi: reversibility, consequence of error, human judgment/empathy, accountability"],
                ["Appropriate with review", "AI kaam kar sakta hai, lekin use hone se pehle ek specific human gate chalni chahiye"],
                ["Defined gate", "Ek review jo who, what, aur when naam leta hai"],
                ["Deciding factor / load-bearing criterion", "Wo factor jo classification ko actually carry kar raha hai"],
                ["Accountability", "Jawab kaun deta hai, ye kabhi tool ko transfer nahi hoti"],
                ["Diligence", "AI Fluency Framework ki competency, AI use ke liye responsibility lena, team scale pe iska matlab audit karna ke log actually kya kar rahe hain"],
                ["Diligence gap", "Policy jo maangti hai aur log actually jo karte hain, uske darmiyan ka faasla, yahin risk rehta hai"],
                ["Data tier", "Information handle karne ki simple classification (green/yellow/red)"],
                ["Entry point / route", "Specific tareeqa jis se data AI system tak pahunchti hai"],
                ["Purpose", "Wo wajah jiske liye data collect hui thi, naya use usi purpose se cover hona chahiye"],
                ["Redaction", "Wo fields hatana jo task ko nahi chahiye, AI tak pahunchne se pehle"],
                ["Pseudonymisation", "Identifiers ko labels se replace karna jabke reconnect karne ka tareeqa abhi bhi maujood ho"],
                ["Anonymisation", "Data ko is tarah transform karna ke wo organisation ke standard ke hisab se identify nahi ho sakta"],
                ["The five checks", "Source, reach, fit, outside content, actions, Skill/connector/tool trust check karne ke liye"],
                ["Prompt injection", "Malicious ya misleading instructions jo content ke andar hon (webpage, email, document) aur AI ko steer karne ki koshish karein"],
                ["Least privilege", "Ek insaan, service, ya agent ko sirf utni access dena jitni task ke liye chahiye"],
                ["Shadow AI", "Work data jo un AI tools/accounts se guzarta hai jo organisation ne kabhi approve nahi kiye"],
                ["Residual risk", "Jo abhi bhi galat ho sakta hai jab planned controls apni design ke hisab se kaam karein"],
                ["Governance Record", "Ek workflow ke Case, Data, Capability, People, evidence, owner, aur re-check triggers ka one-page summary"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;Governance, Risk &amp; Responsible Use&rdquo; crash
              course par based hain, uski copy nahi. Original source
              dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/governance-risk-responsible-use-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/governance-risk-responsible-use-crash-course
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
                  q: "Ek team chahti hai Claude benefits eligibility ke final, unreviewed determinations banaye. Ye classification kya hogi, aur kyun?",
                  a: "Inappropriate. Consequence applicant ke liye irreversible hai, aur ek determination ki professional accountability kisi tool ko transfer nahi ho sakti. \"Light human review\" ek undefined gate hai, reassuring adjective ke sath.",
                },
                {
                  q: "Ek brief kehta hai shortlisting workflow \"appropriate with human review\" hai. 6 hafte baad kisi ne kuch review nahi kiya. Kya galat hua?",
                  a: "Gate kabhi define hi nahi hui, koi role, koi specific check, koi point nahi tha. Label record hua lekin koi control kabhi bana hi nahi, isliye ye chupke se fully appropriate ki tarah chal raha hai.",
                },
                {
                  q: "Client ke liye condolence note likhwana fully reversible hai, koi cost nahi, koi regulatory weight nahi. Phir bhi ye insaan ko karni chahiye, ye criteria se contradict kyun nahi karta?",
                  a: "4 criteria interact karte hain, ek scorecard nahi hain jahan 3/4 jeet jaye. Yahan human-element criterion akela poori decision carry kar sakta hai chahe baaki 3 doosri taraf point karein.",
                },
                {
                  q: "Ek analyst ke paas customer names aur account numbers wali spreadsheet hai, task spending trends dhoondna hai, policy regulated personal data restrict karti hai. Sahi action kya hai?",
                  a: "Identifiers ko \"Customer 1, Customer 2\" jaisi labels se replace karo, phir analysis chalao. Identifiers gayab hote hi analysis regulated data ko touch hi nahi karta, isliye restriction apply nahi hoti. Analysis skip karna kisi ko protect nahi karta.",
                },
                {
                  q: "Ek Skill colleague ne forum se share ki hai, publisher unknown hai, aur uski instructions meeting notes tak limited nahi hain. Sahi action kya hai?",
                  a: "Escalate ya decline karo, enable mat karo. Skill ki apni permission list nahi hoti, wo session ki poori reach ke sath chalti hai, jo notes summarize karne ke liye out of proportion hai. Colleague ki recommendation warmth hai, vetting nahi.",
                },
                {
                  q: "Ek hiring coordinator AI se résumés screen kar ke shortlist banati hai aur usay \"qualifying candidates\" bol kar forward karti hai. Manager sirf unhi se interview karta hai. Ye kaunsi concern sabse direct raise karti hai?",
                  a: "Bias/fairness. Screen kisi group ko systematically disadvantage kar sakta hai bina kisi human review ke exclusions ki, aur sirf jo exclude huay unhi ko pata chal sakta tha, aur unhe kabhi bataya hi nahi gaya.",
                },
                {
                  q: "Ek quarterly review dikhata hai team members draft client deliverables personal Claude accounts mein paste kar rahe hain kyunke approved workspace login mein slow hai. Ye kya represent karta hai?",
                  a: "Ek Diligence gap. Friction approved path ko unapproved se harder bana raha hai, isliye log easy route dhoond lete hain. Fix friction hatana hai, banning ya disciplinary action nahi.",
                },
                {
                  q: "Ek team Anthropic-published research Skill enable karti hai jo web pages fetch/summarize karti hai, aur usay ek mailbox se connect karti hai taake summaries send kar sake. Source check clean pass hui. Kya risk baaki hai?",
                  a: "Prompt injection. Source check batati hai tool kisne likha, ye nahi batati content kisne likha jo tool parhta hai. Ye workflow send bhi kar sakta hai, isliye untrusted content parhna aur consequential action lena, dono ka combo khatarnak hai.",
                },
                {
                  q: "20 minute pehle aapne ek unapproved route pe client file upload ki jisme personal data tha, abhi tak kisi ko bheja nahi. Sahi pehla move kya hai?",
                  a: "Chat delete mat karo (visibility khud ki khatam hoti hai, data nahi). Ruko, likho kya andar gaya aur kab, aur aaj hi apne manager/admin ko batao, phir unse poocho aage kya karna hai, khud decide mat karo.",
                },
                {
                  q: "Aapki organisation mein koi AI policy nahi hai. Course kya kehta hai?",
                  a: "Policy ka wait mat karo. 2 cheezein badalti hain: aapki likhi hui reasoning ko wo weight uthana hai jo policy uthati, aur aapke defaults de-facto policy ban jate hain, isliye unhe explicit likho — approved routes, ek chhoti red list, gate rule, capability rule, ek named person jisse poocha jaye.",
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
