import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  Cpu,
  Database,
  Eye,
  FileText,
  ListChecks,
  LogOut,
  MessageSquare,
  Plug,
  Radar,
  Search,
  Server,
  ShieldCheck,
  Unlock,
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
import { chapters, getNextLiveChapter, getPrevLiveChapter } from "../_lib/chapters";

const chapter = chapters.find((c) => c.slug === "general-agents-web")!;
const prevChapter = getPrevLiveChapter("general-agents-web");
const nextChapter = getNextLiveChapter("general-agents-web");

const pageTitle = `${chapter.title} — Anthropic Exam Prep`;
const pageDescription =
  "Chat box aur agent surface ka farq, cloud vs local session, file custody ke 3 tiers, human gate, aur scheduling, Agent Factory book se liya gaya Roman Urdu revision guide, self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep/general-agents-web" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep/general-agents-web`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const toc: TocItem[] = [
  { id: "intro", text: "Chat Box Vs Agent Surface", level: 2 },
  { id: "part1", text: "Part 1 · The Shift", level: 2 },
  { id: "part2", text: "Part 2 · The Surface", level: 2 },
  { id: "part3", text: "Part 3 · Working Unwatched", level: 2 },
  { id: "part4", text: "Part 4 · Choosing, Aur Open Path", level: 2 },
  { id: "recap", text: "Recap", level: 2 },
  { id: "practice", text: "Practice: 6 Drills", level: 2 },
  { id: "projects", text: "6 Projects", level: 2 },
  { id: "glossary", text: "Terms Glossary", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Diagrams: recreated in Cybrum's own visual language (Tailwind +    */
/*  lucide), not the book's original illustrations.                    */
/* ------------------------------------------------------------------ */

function ChatVsAgentDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <MessageSquare size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Chat Box</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Aapke turn ka wait karta hai. Aap type karo, wo answer de, phir
            phir wait kare. Tab band karo, kaam ruk jata hai.
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
            <Bot size={17} />
          </span>
          <p className="text-sm font-semibold text-foreground">Agent Surface</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Aap assignment dete ho. Wo plan banata hai, tools use karta hai,
            steps complete karta hai. Aap tab band kar do, kaam chalta rehta
            hai.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Test: agar main typing rok doon, kya kaam ruk jayega? Chat box mein
        haan, Agent surface mein nahi
      </figcaption>
    </figure>
  );
}

function SixPartsDiagram() {
  const parts = [
    { icon: Clock, t: "Heartbeat", d: "Kya kaam start karta hai" },
    { icon: Plug, t: "Reach", d: "Kya read/act kar sakta hai" },
    { icon: ArrowRight, t: "Run-until-done Loop", d: "Outcome tak kaise chalta hai" },
    { icon: Database, t: "State Spine", d: "Agla run zero se shuru nahi hota" },
    { icon: ShieldCheck, t: "Human Gate", d: "Autonomy kahan rukti hai" },
    { icon: Server, t: "Body", d: "Kaam actually kahan execute hota hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {parts.map(({ icon: Icon, t, d }) => (
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
        Cowork aur ChatGPT Work alag naam use karte hain, lekin dono ye 6
        hisse rebuild karte hain, shape wahi hai
      </figcaption>
    </figure>
  );
}

function FileTiersDiagram() {
  return (
    <figure className="my-7">
      <div className="space-y-2.5">
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-muted">
              <FileText size={15} />
            </span>
            <p className="text-sm font-semibold text-foreground">Tier 1 · Task Filesystem</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Session ka scratch space, task khatam hote hi wipe. Kabhi bhi
            storage nahi samjho.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Database size={15} />
            </span>
            <p className="text-sm font-semibold text-foreground">Tier 2 · Platform Storage</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Aapke vendor account mein permanently saved. Survive karta hai,
            lekin vendor ki custody, vendor ke format mein.
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <LogOut size={15} />
            </span>
            <p className="text-sm font-semibold text-foreground">Tier 3 · The Exit</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            File platform se nikal kar aapke apne control wale system mein
            jati hai, Drive, email, repo, ya local folder. Sirf yehi tier
            aapki custody mein hai.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Finished work platform se exit karti hai. Baaki sab kahin bhi reh
        sakta hai
      </figcaption>
    </figure>
  );
}

function ReachLadderDiagram() {
  const rungs = [
    { icon: Plug, t: "Connector", d: "Structured permission, sabse safe default" },
    { icon: Search, t: "Built-in Browser", d: "Portals, forms, jahan connector nahi hai" },
    { icon: Eye, t: "Your Own Browser Context", d: "Jo page aapke saamne already khula hai" },
    { icon: Cpu, t: "Computer Use", d: "Full GUI control, sabse zyada risk" },
  ];
  return (
    <figure className="my-7">
      <div className="space-y-2">
        {rungs.map(({ icon: Icon, t, d }, i) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3"
            style={{ marginLeft: `${i * 10}px` }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={15} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{t}</p>
              <p className="text-xs text-muted">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Jo sabse structured tool kaam kar sake wo use karo, connector browser
        se pehle, browser full computer use se pehle
      </figcaption>
    </figure>
  );
}

function GateModesDiagram() {
  const modes = [
    { icon: Eye, t: "Manual", d: "Har consequential action pe rukta hai, aap allow/deny karte ho" },
    { icon: ShieldCheck, t: "Auto", d: "Chalta rehta hai, har action safety-screened hota hai" },
    { icon: Unlock, t: "Skip", d: "Ordinary approvals ke bina, sirf tightly trusted bounded kaam ke liye" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map(({ icon: Icon, t, d }) => (
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
        Cowork side panel currently Auto se start hota hai, lekin ye product
        default hai, aapki policy nahi, unfamiliar kaam pe Manual pe switch
        karo
      </figcaption>
    </figure>
  );
}

function HeartbeatDiagram() {
  const beats = [
    { icon: Clock, t: "Once", d: "Ek baar baad mein chalta hai" },
    { icon: Calendar, t: "On A Schedule", d: "Clock pe fire hota hai" },
    { icon: Zap, t: "On A Trigger", d: "Kisi event par start hota hai" },
    { icon: Radar, t: "Monitor / Watch", d: "Repeatedly check karta hai, condition true pe surface karta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        {beats.map(({ icon: Icon, t, d }) => (
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
        Ye course ki ceiling: schedules jo REPORT karte hain. Schedules jo
        ACT karte hain, wo Loop Engineering chapter ka subject hai
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
  url: `${site.url}/anthropic-exam-prep/general-agents-web`,
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

export default function GeneralAgentsWebChapterPage() {
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
              Ye chapter <Strong>{chapter.examCode}</Strong> ke liye foundation
              hai, do rival products (Claude Cowork aur ChatGPT Work) ke saath
            </p>
            <CoreIdea>
              Pichle 4 chapters mein aap ek chat tab mein kaam karte the: aap
              poochte, AI jawab deta, aap phir poochte. Har turn aap se shuru
              hota tha. Ye chapter division of labour badalta hai:{" "}
              <Strong>chat box</Strong> aur <Strong>agent surface</Strong> ab
              same address pe agal-bagal baithte hain, aur ek assignment ko
              plan kar ke, tools use kar ke, aap ke tab band karne ke baad
              bhi khatam karna, ab ek normal product feature hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Chat Box Vs Agent Surface</SubHeading>
            <ChatVsAgentDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Zaroori Terms, Shuru Mein Ek Baar Parh Lo</SubHeading>
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["Chat box", "Conversation jo har turn aapka wait karti hai, band karo to ruk jati hai"],
                ["Agent surface", "Jagah jahan aap outcome assign karte ho, aur system plan bana kar khud steps complete karta hai"],
                ["Agent loop", "Wo hissa jo decide karta hai agla kadam kya hai, jab tak kaam finish, block, ya stop na ho"],
                ["Cloud session", "Session jiska agent loop vendor ke servers pe chalta hai, aapka tab sirf ek window hai"],
                ["Local session", "Session jiska agent loop aapki apni machine pe chalta hai"],
                ["Desktop bridge", "Controlled path jo cloud session ko aapki machine ke selected tools (browser, local folder) tak pahunchne deta hai"],
                ["Connector", "Permission-scoped, structured access ek service tak (Drive, Gmail, Slack)"],
                ["Human gate", "Control jo sahi risk boundary pe insaan ko loop mein rakhta hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PART 1 ---------------------- */}
        <section id="part1" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 1 · The Shift</PartBanner>
            <SubHeading>1. Same Address, Do Alag Cheezein</SubHeading>
            <P>
              Claude.ai ya ChatGPT.com khol lo, chat box aur agent surface ab
              same address pe hain. ChatGPT pe to Chat mode aur Work mode
              screen pe sath sath dikhte hain.
            </P>
            <P>
              Chat box wahi conversation hai jo Foundations se pehchan chuke
              ho, har turn aapka wait karti hai, schedule pe start nahi ho
              sakti, event pe react nahi kar sakti, tab band karne ke baad
              continue nahi hoti. Ye missing feature nahi hai, ye conversation
              hone ka matlab hi yehi hai.
            </P>
            <P>
              Agent surface iske bagal mein baithta hai. Aap usay ek
              assignment dete ho, message nahi. Wo plan banata hai, tools use
              karta hai, steps complete karta hai, sirf wahan rukta hai jahan
              decision ke liye aap chahiye ho, aur aapke dekhna band karne ke
              baad bhi kaam karta rehta hai.
            </P>
            <PullQuote>
              Agar main typing rok doon, kya kaam ruk jayega? Chat box: haan.
              Agent surface: nahi.
            </PullQuote>
            <Callout label="Ehtiyat">
              Aap aksar chat box se hi ek delegated run <Strong>shuru</Strong>{" "}
              karte ho, plain words mein. &ldquo;Har Monday, ye emails
              summarize karo.&rdquo; Words chat mein jaate hain, lekin jo aap
              set up kar rahe ho wo ek delegated task hai, normal reply nahi.
              Dekho kaam kya <Strong>karta</Strong> hai, sirf ye nahi ke aap
              ne kahan type kiya.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>2. Remote Session: Tab Ek Window Hai, Runtime Nahi</SubHeading>
            <P>
              Purana simple model tha: agent ya aapki machine pe hai, ya
              vendor ke servers pe. Ye ab bhi ek acha first picture hai,
              lekin poora nahi hai. Do axes use karo:
            </P>
            <RecapTable
              head={["Axis", "Sawal"]}
              rows={[
                ["Axis 1", "Agent loop kahan chal raha hai? Cloud session ya Local session?"],
                ["Axis 2", "Tool kahan execute hota hai? Cloud connector, ya bridge ke through browser/local tool?"],
              ]}
            />
            <P>Isse 3 common runtime patterns milte hain:</P>
            <RecapTable
              head={["Pattern", "Agent Loop", "Laptop Band Ho To?"]}
              rows={[
                ["Cloud-only", "Vendor cloud", "Run chalta rehta hai"],
                ["Cloud + Desktop Bridge", "Vendor cloud", "Cloud run chal sakta hai, lekin bridged tool disappear ho jata hai jab required desktop component offline ho"],
                ["Local", "Aapki machine", "Run depend karta hai aapki machine online rehne pe"],
              ]}
            />
            <CheckList
              items={[
                "Tab band karna cloud run rokna nahi hai, tab sirf ek window hai",
                "Laptop band karna bridged tool ko cloud session mein maar sakta hai, cloud session mar nahi jata",
                "Local file bhi cloud mein process ho sakti hai, \"laptop se aayi\" ka matlab \"laptop pe rehti hai\" nahi hai",
                "Scheduling sirf tab device-independent hai jab workflow ka har required tool bhi device-independent ho",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>3. Do Vendors, Ek Shape</SubHeading>
            <P>
              Yehi is chapter ka reading lens hai. Product features badalte
              rehte hain, lekin har serious agent surface yehi 6 hisse
              rebuild karta hai:
            </P>
            <SixPartsDiagram />
            <RecapTable
              head={["Part", "ChatGPT Work Misal", "Claude Cowork Misal"]}
              rows={[
                ["Heartbeat", "Scheduled Tasks aur doosre triggers", "Scheduled tasks, on-demand runs"],
                ["Reach", "Plugins, cloud browser, desktop browser/local tools", "Connectors, plugins, built-in browser, Claude in Chrome"],
                ["Run-until-done", "Plan mode ke sath outcome-oriented multi-step kaam", "Multi-step task execution, sub-agent coordination"],
                ["State Spine", "Sessions, Projects, memory/instructions", "Sessions, Projects, cloud memory, instructions, files"],
                ["Human Gate", "Approval prompts, product policy", "Manual, Auto, Skip modes"],
                ["Body", "Cloud Work, cloud browser, desktop execution", "Cloud sandbox, optional local session, bridged desktop tools"],
              ]}
            />
            <Callout label="2 Warnings" tone="warn">
              Same shape, same trust nahi hai, connector aur browser click
              same system reach kar sakte hain lekin unki permissions,
              observability, aur prompt-injection exposure alag hoti hai. Aur
              same label, same implementation nahi hai, &ldquo;memory&rdquo;,
              &ldquo;plugin&rdquo;, &ldquo;approval&rdquo; har vendor mein
              alag mechanism ho sakta hai. Naam se part dhoondo, phir
              implementation inspect karo.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 2 ---------------------- */}
        <section id="part2" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 2 · The Surface</PartBanner>
            <SubHeading>4. Account Spine: Ek Stack Hai, Ek Blob Nahi</SubHeading>
            <P>
              &ldquo;Account spine&rdquo; ka matlab hai aapke saved sessions
              aur files aapke sath chalte hain. 2026 mein persistent context
              ek layered stack hai, ek cheez jise sirf &ldquo;memory&rdquo;
              kaha jaye wo nahi:
            </P>
            <RecapTable
              head={["Layer", "Kya Batati Hai", "Lifetime"]}
              rows={[
                ["Session history", "Is particular task mein kya hua", "Ek workstream ya task history"],
                ["Project", "Is continuing kaam ka kya hissa hai", "Weeks, months, ya usse zyada"],
                ["Semantic memory", "Konse facts/preferences cloud sessions ke across carry hon", "Cross-session, jab tak edit/reset/disable na ho"],
                ["Standing instructions", "Assistant generally kaise behave kare", "Jab tak aap ya admin change na kare"],
                ["User-owned context file", "Aap khud kya portable aur inspectable chahte ho", "Jab tak aap file maintain karo"],
              ]}
            />
            <Callout label="August Update">
              Claude ke cloud Cowork tasks ab wahi memory use karte hain jo
              Claude chat. Aap topic by topic memory inspect kar sakte ho aur
              edit ya delete kar sakte ho. Local Cowork sessions is cloud
              memory mechanism ko use nahi karte.
            </Callout>
            <P>
              Isse ek common beginner mistake fix hoti hai: <Strong>ek purani
              session memory nahi hai</Strong>. Ek Project bhi memory nahi
              hai. Sab persist karte hain, lekin alag reasons se.
            </P>
            <CheckList
              items={[
                "Sessions ko work products ki tarah naam do",
                "Ek session ya Project mein ek hi workstream rakho",
                "Durable instructions sahi layer mein rakho, har prompt mein dobara mat likho",
                "Operational state vendor spine mein reh sakta hai, lekin critical state ka ek portable source of truth honi chahiye",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>5. 3 File Tiers: Deliverable Actually Kahan Rehta Hai?</SubHeading>
            <P>
              Ye is chapter ka signature concept hai. Har file jo aapka agent
              touch karta hai, teen tiers mein se ek mein rehti hai:
            </P>
            <FileTiersDiagram />
            <PullQuote>
              Finished work platform se exit karti hai. Baaki sab kahin bhi
              reh sakta hai.
            </PullQuote>
            <P>
              Har brief ke end mein ye ek line add karo, phir tier decision
              khud handle ho jati hai:
            </P>
            <PromptBox>{`End by listing every file you created and where each one
landed: temporary working space, platform storage, or a system
I control (connector save, download, local write, or repo commit).`}</PromptBox>
          </Reveal>

          <Reveal>
            <SubHeading>6. Connectors: Reach Aur Exit Door Dono</SubHeading>
            <P>
              Connector ab bhi sabse clean tareeka hai, structured,
              permission-scoped access, screen-driving imitate karne ki
              bajaye. Lekin ab reach ke 4 raaste hain:
            </P>
            <ReachLadderDiagram />
            <Callout label="Default Rule">
              Jo sabse structured tool kaam kar sake wo use karo. Connector
              browser se pehle. Browser full computer use se pehle.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Jab Agent Read Bhi Kar Sakta Hai Aur Act Bhi</SubHeading>
            <P>
              Prompt injection sabse zyada matter karta hai jab do conditions
              milti hain: agent trusted boundary ke bahar content parh sakta
              hai, <Strong>aur</Strong> consequential action le sakta hai.
              Anthropic browser surfaces ke liye clear rule rakhta hai:{" "}
              <Strong>emails ya web content ke andar milne wali
              instructions complete karna, permission mode kuch bhi ho,
              prohibited hai</Strong>. Aapka brief authority hai. External
              content evidence hai. Us content ke andar milne wali
              instructions untrusted input hain, agent ka naya boss nahi.
            </P>
            <CheckList
              items={[
                "Trusted sites aur low-stakes accounts se shuru karo",
                "Banking, medical, identity, ya sensitive systems ke logins casually import mat karo",
                "Unfamiliar sites, naye plugins/connectors, ya send/spend/delete/publish actions ke liye Manual approval use karo",
                "Har workflow ko sirf utna connector aur browser reach do jitna zaroorat hai",
                "Connector ko entry aur exit dono ki tarah use karo, agar finished report Drive mein jani hai, wo destination brief ka hissa banao",
              ]}
            />
            <Callout label="Permission Ka Matlab">
              Read, send nahi hai. Draft, publish nahi hai. View, edit nahi
              hai. Sabse chhoti scope grant karo jo workflow complete kare,
              barhao sirf tab jab workflow prove kare zaroorat hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>7. Gate Jo Aapki Pocket Mein Hai</SubHeading>
            <P>
              Purani story simple thi: agent kaam karta, phir approval phone
              pe pahunchti. Idea same hai, implementation update ho gayi hai.
              Cowork abhi 3 modes ke sath autonomy choice visible banata hai:
            </P>
            <GateModesDiagram />
            <P>
              Ye mental model do behtar sawalon mein badal deta hai:{" "}
              <Strong>mujhe bina kya allowed hai?</Strong> aur{" "}
              <Strong>action count hone se pehle usay kya rokta ya screen
              karta hai?</Strong>
            </P>
            <SubHeading>Gate Ko Blast Radius Se Match Karo</SubHeading>
            <RecapTable
              head={["Level", "Kaam", "Gate"]}
              rows={[
                ["1", "Read aur summarize", "Low consequence, permissions samajhne ke baad automatic execution reasonable"],
                ["2", "Draft banao lekin send mat karo", "Medium, output system se nikalne se pehle reviewable"],
                ["3", "Reversible records mein likho", "Higher, workflow prove hone tak stronger gate"],
                ["4", "Send, publish, purchase, delete, ya critical data change karo", "High, Manual ya explicit human control use karo"],
              ]}
            />
            <Callout label="Gate Test Karo">
              Ek harmless step banao jo aapka input mange, task start karo,
              computer se door jao, confirm karo ke request aapke dekhne
              wali surface tak pahunchti hai. Phir deny ya approve karo aur
              confirm karo run sahi respond karta hai. Jo escalation path
              kabhi test nahi hui, wo sirf ek assumption hai.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- PART 3 ---------------------- */}
        <section id="part3" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 3 · Working Unwatched</PartBanner>
            <SubHeading>8. Delegation Loop: Brief, Plan, Approve, Review</SubHeading>
            <P>
              Product aapke bina kaam kar sakta hai, isliye handoff ki quality
              pehle se zyada important ho jati hai. Agar workflow clear nahi
              hai, longer prompt likhne ki bajaye, workflow discovery se
              shuru karo:
            </P>
            <PromptBox>{`Every Monday I spend an hour checking three places and still
miss something. Interview me until you understand what I am
trying to accomplish, what sources matter, what I never want
changed, and what a good finished brief looks like. Then propose
the workflow before doing it.`}</PromptBox>
            <Flow
              loop
              steps={[
                "Brief: outcome, audience, sources, constraints, permissions, destination, definition of done batao",
                "Plan: consequential kaam shuru hone se pehle agent apna plan dikhaye",
                "Approve ya redirect: jab tak changes sasti hain, plan fix karo, gate ko stakes se match karo",
                "Review: finished deliverable, jo actions matter kartay thay, aur har file kahan landed dekho",
              ]}
            />
            <Callout label="Manual Mode Ki Guarantee Nahi">
              Current Cowork side panel mein, Manual mode khud approval ke
              liye plan nahi banata. Agar Concept 8 wala intercept chahiye,
              brief mein likho: &ldquo;Show me your plan first and wait for
              my approval before taking consequential actions.&rdquo;
            </Callout>
            <P>Plan review karte waqt 4 checks lagao:</P>
            <CheckList
              items={[
                "Scope: sirf wahi kaam aur data touch ho raha hai jo maine bataya, ya job chupke se barh gayi?",
                "Order: verify karne se pehle act to nahi kar raha?",
                "Reach: koi connector, browser, send, publish, write, ya delete action to propose nahi ho raha jo maine intend nahi kiya?",
                "Assumptions: audience, format, ya missing fact chupke se decide to nahi kar raha?",
              ]}
            />
            <P>
              Agar galat plan perfectly execute ho jaye, wo phir bhi galat run
              hai. Ek sentence se plan redirect karna, complete run ke baad
              cleanup karne se sasta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>9. Scheduled Tasks, Koi Device Online Nahi</SubHeading>
            <P>
              Schedule khud heartbeat hai, aapki agli chat turn ke ilawa
              koi cheez kaam start karti hai:
            </P>
            <HeartbeatDiagram />
            <PullQuote>
              Ek schedule sirf tab truly device-independent hai jab har
              required tool bhi bina device ke reach ho sake.
            </PullQuote>
            <P>Schedule karne se pehle 4 sawal likh lo, phir 2 safety sawal:</P>
            <CheckList
              items={[
                "Run kya start karta hai? Clock, event, ya watch condition",
                "Ye kya touch karta hai? Har connector, source, website, plugin, destination",
                "Kya ye sab devices off hone par bhi reach kar sakta hai?",
                "Success kaise pata chalega? Ek finished file, dated report, notification, ya observable signal",
                "Bina approval ke kya allowed hai? Pehle unattended run se pehle gate set karo",
                "Empty ya ambiguous case mein kya hota hai? \"No new items\" ek valid result honi chahiye, kaam invent karne ki wajah nahi",
              ]}
            />
            <Callout label="Ran Hona, Worked Hone Jaisa Nahi Hai">
              Scheduler bata sakta hai ke run start ya complete hui. Ye proof
              nahi ke output correct, complete, ya sahi jagah deliver hui. Har
              recurring workflow ko ek observable success signal do.
            </Callout>
            <P>
              Beginners ke liye safest scheduled agent wo hai jo{" "}
              <Strong>read, analyse, aur report</Strong> karta hai. Workflow
              ko kam se kam do baar haath se chalao, sources, plan,
              permissions, output, empty case, aur tier-3 destination inspect
              karo, tab jaake schedule attach karo. Scheduling ek workflow ko
              future mein photocopy karne jaisa hai, agar galti hai to
              schedule usay dilute nahi karti, reproduce karti hai.
            </P>
          </Reveal>
        </section>

        {/* ---------------------------- PART 4 ---------------------- */}
        <section id="part4" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <PartBanner>Part 4 · Choosing, Aur Open Path</PartBanner>
            <SubHeading>10. Web, Desktop, Ya Terminal: Kaam Jo Touch Kare Us Se Choose Karo</SubHeading>
            <P>Asal deciding sawal wahi hai: <Strong>kaam kya touch karta hai?</Strong> Do aur sawal add karo:</P>
            <CheckList
              items={[
                "Kya ye mera device band hone par bhi chalna chahiye?",
                "Data kaun hold/process kar sakta hai?",
              ]}
            />
            <RecapTable
              head={["Work Pattern", "Best Starting Surface"]}
              rows={[
                ["One-off thinking, drafting", "Chat"],
                ["Cloud files + connectors, device off rehna zaroori", "Cloud-only Cowork / Work"],
                ["Cloud session ko ek approved local folder ya browser chahiye", "Cloud + Desktop Bridge"],
                ["Kaam fundamentally local files/apps hai", "Local Desktop Agent"],
                ["Repository, terminal, tests, CI", "Coding Agent / Terminal"],
                ["Website jiska koi connector nahi", "Browser Path"],
                ["Regulated ya contractually restricted data", "Stop Aur Verify"],
              ]}
            />
            <Callout label="Regulated Data" tone="warn">
              Anthropic khud batata hai ke Cowork abhi HIPAA use ke liye
              apni BAA ke under covered nahi hai. OpenAI bhi wahi baat kehta
              hai, ChatGPT for Healthcare mein event-triggered Work tasks
              BAA-covered nahi, PHI transmit/store/process nahi karne
              chahiye. Product availability, permission nahi hai. Regulated
              identifiers ke liye pehle organisation ka likha hua compliance
              jawab lo. Agar task ko sirf pattern chahiye, identifiers nahi,
              pehle unhe redact/anonymise kar ke check karo, shayad regulated
              data route hi na kare.
            </Callout>
            <P>
              Ek bridge convenience hai, custody loophole nahi. Agar cloud
              session Desktop ke through local file parhta hai, file aapki
              machine se aayi, lekin uska content cloud mein process hota
              hai. Pehla routing sawal ye hai ke agent loop aur processing
              kahan ho rahe hain, na ke source file 5 second pehle kahan
              baithi thi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>11. Open Path: Bina Vendor Cloud Ke</SubHeading>
            <P>
              Is book ke har general-agents course mein ek vendor tool aur
              ek open-source twin pair hota hai. Ye course closed hai
              (Cowork aur ChatGPT Work), kyunke do rivals ne days ke andar
              same shape ship ki, jo is book ki thesis ka proof hai. Lekin
              open path exist karta hai:
            </P>
            <CheckList
              items={[
                "OpenWork: open-source desktop co-worker jo remote ya shared cloud workers se connect ho sakta hai, aap ya aapki organisation infrastructure control karte hain",
                "OpenCode + apna scheduler: repo-attached kaam ke liye, apna cron ya scheduled GitHub Actions job, koi vendor cloud, koi plan tier nahi",
              ]}
            />
            <PullQuote>
              Companies aapko ek spine bechti hain. Open path aapko wo khud
              banwati hai.
            </PullQuote>
            <P>
              Managed surface pe sab handed to you hai, working, day one se,
              lekin unki custody mein, unke format mein, unke price aur
              rules ke under. Open path mein har cheez aap set up, chalate,
              aur fix karte ho, badle mein custody aur choice milti hai.
              Regulated data ke liye custody jeet jati hai, ek solo consultant
              jo Friday tak brief ship karna chahta hai ke liye working
              spine jeet jati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>12. Ye Surface Kya Nahi Kar Sakta</SubHeading>
            <CheckList
              items={[
                "Web surface weak work ko good nahi banata, memory ek galat assumption preserve kar sakti hai, browser ek galat plan tez execute kar sakta hai, scheduling ek galti har Monday repeat kar sakti hai",
                "Vendor abhi bhi harness ke important hisse own karta hai, aap runtime, sandbox, model routing, ya enforcement machinery poori tarah control nahi karte",
                "Cloud-to-desktop bridge local runtime jaisa nahi hai, ye selected access lend karta hai jab desktop side available ho",
                "Browser agents ki ek security ceiling hai, arbitrary pages authenticated hokar parhna prompt-injection path banata hai, safety screening risk kam karti hai, khatam nahi karti",
                "Persistent context leverage aur lock-in dono banati hai, critical instructions aur finished work portable rakho takay vendor chhodna inconvenient ho, catastrophic nahi",
              ]}
            />
            <PullQuote>
              Chat wahan hai jahan aap design karte ho. Agent surface wahan
              hai jahan delegated work chalta hai. Agent loop aur uske tools
              alag jagah reh sakte hain. Discipline yehi hai: shape, boundary,
              aur custody har step pe jaanna.
            </PullQuote>
            <Callout label="Aage Kya">
              Repo-attached coding kaam <Strong>Agentic Coding</Strong>{" "}
              chapter ka subject hai. Desktop/local kaam, browser/computer
              use, aur trust levers <Strong>Cowork &amp; OpenWork</Strong>{" "}
              chapter ka. Explicit stopping rules aur owned state{" "}
              <Strong>Loop Engineering</Strong> ka. Rented enforcement se
              owned enforcement tak <Strong>Harness Engineering</Strong> ka.
              Checker ko test karna <Strong>Trusting the Checker</Strong> ka.
              Aur proven workflow kahan permanently rehni chahiye,{" "}
              <Strong>Leaving the Laptop</Strong> ka subject hai. Ye sab is
              book ke aage aane wale courses hain.
            </Callout>
          </Reveal>
        </section>

        {/* ---------------------------- RECAP ---------------------- */}
        <section id="recap" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Poora Course, Compressed</SubHeading>
            <CheckList
              items={[
                "Chat box har turn wait karti hai, Agent surface aap ke tab band karne ke baad bhi kaam karta rehta hai, \"agar main typing rok doon, kya kaam ruk jayega\" yehi test hai",
                "Do sawal poocho: agent loop kahan chal raha hai (cloud/local), aur tool kahan execute hota hai, ye dono alag ho sakte hain (desktop bridge)",
                "Har serious agent product ko 6 hisso se padho: Heartbeat, Reach, Run-until-done Loop, State Spine, Human Gate, Body, same shape, different implementation",
                "Persistent context ek stack hai: session history, Project, semantic memory, standing instructions, aapki apni context file, sabko \"memory\" mat samjho",
                "3 file tiers yaad rakho: Tier 1 scratch (wipe ho jati hai), Tier 2 platform storage (vendor ki custody), Tier 3 exit (aapki custody), finished work hamesha exit karti hai",
                "Reach ladder: Connector pehle, phir browser, phir full computer use, jitna narrow tool utna behtar",
                "3 gate modes: Manual (rukta hai), Auto (safety-screened chalta hai), Skip (approvals ke bina), gate ko blast radius se match karo",
                "Delegation loop: Brief → Plan → Approve/redirect → Review, plan review karte waqt scope, order, reach, aur assumptions check karo",
                "Schedule sirf tab device-independent hai jab har required tool bhi device-independent ho, \"ran\" hona \"worked\" hone jaisa nahi hai",
                "Kaam route karo us se jo wo actually touch karta hai, regulated data ke liye product availability permission nahi hai",
              ]}
            />
            <PullQuote>
              Chat wahan hai jahan aap sochte ho. Agent surface wahan hai
              jahan delegated kaam chalta hai. Discipline ek hi rehti hai:
              clear brief, explicit boundaries, checks, aur apna system of
              record.
            </PullQuote>
          </Reveal>
        </section>

        {/* ---------------------------- PRACTICE ---------------------- */}
        <section id="practice" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>Ab Khud Try Karo: 6 Drills</SubHeading>
            <P>Har ek 20-45 minutes leta hai, real lekin low-stakes kaam use karo.</P>
            <Ladder
              steps={[
                { title: "1. Worker/Tool-Location Test", note: "Ek cloud task shuru karo sirf cloud-reachable source se, tab band karo, doosri surface se wapis kholo. Agar Claude Desktop hai, ek harmless task try karo jo connected local folder use kare, dekho desktop offline hone par kya change hota hai." },
                { title: "2. Three-Tier Audit", note: "Ek real deliverable produce karo, batao kaunsi state layer kaam hold kar rahi hai, aur har output ki file tier kya hai. Confirm karo final deliverable Tier 3 mein hai." },
                { title: "3. Gate Lab", note: "Ek harmless test folder use kar ke pehle Manual mode mein workflow chalao, har interruption note karo, phir agar mumkin ho Auto mode mein rerun karo. Purchases, sending, deletion ke liye Skip use mat karo." },
                { title: "4. Pehla Cloud Schedule", note: "Sirf cloud-reachable sources se ek Monday brief banao, trigger, touch, device independence, success signal, autonomy, empty case likho, do baar haath se chalao, phir schedule karo." },
                { title: "5. Ek Task, Do Harnesses", note: "Agar dono products access hain, same low-stakes assignment Cowork aur ChatGPT Work dono ko do, jo dekho usay heartbeat, reach, loop, spine, gate, body pe map karo." },
                { title: "6. Portability Drill", note: "Socho aapka vendor kal gayab ho jaye. Sirf Tier 3 files aur user-owned context se ek working workflow reconstruct karo, jo reconstruct nahi ho saka wo likh lo." },
              ]}
            />
          </Reveal>
        </section>

        {/* ---------------------------- PROJECTS ---------------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <SubHeading>6 Hands-On Projects (Book Ke Original)</SubHeading>
            <RecapTable
              head={["Project", "Waqt", "Kya Banega"]}
              rows={[
                ["1. Worker/Tool-Location Test", "20 min", "Agent-loop location aur tool-execution location ka farq bina product names use kiye explain kar sako"],
                ["2. Three-Tier Audit", "30 min", "Final deliverable Tier 3 mein exist kare, aur pata ho vendor account gayab hone par kya lost hota"],
                ["3. Gate Lab", "30-45 min", "Pata ho kya automatically allowed hua, kya escalate hua, real workflow ke liye kaunsa mode chunoge"],
                ["4. Pehla Cloud Schedule", "30 min + 1 hafta", "Kam se kam 2 baar laptop band hone par fire ho, har run Tier 3 mein verifiable success signal chhode"],
                ["5. Ek Task, Do Harnesses", "45 min", "Ek page comparison jo teen parts mein kam se kam ek implementation difference name kare"],
                ["6. Portability Drill", "60 min", "Ek written list jo aapka lock-in exposure aur agla portability backlog batati ho"],
              ]}
            />
            <Callout label="Ehtiyat">
              Banking, medical, identity, privileged, ya doosri regulated
              data pe practice mat karo sirf isliye ke tool wahan tak reach
              kar sakta hai.
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
                ["Chat box", "Conversation jo har turn ka wait karti hai, band karne par ruk jati hai"],
                ["Agent surface", "Jagah jahan outcome assign hota hai aur system khud steps complete karta hai"],
                ["Agent loop", "Agla kadam decide karne wala hissa, jab tak finish, block, ya stop na ho"],
                ["Cloud session", "Agent loop vendor ke servers pe chalta hai"],
                ["Local session", "Agent loop aapki apni machine pe chalta hai"],
                ["Desktop bridge", "Controlled path jo cloud session ko selected local tools tak pahunchati hai"],
                ["Tool execution location", "Wo jagah jahan ek particular action actually hoti hai"],
                ["Connector", "Permission-scoped, structured access ek service tak"],
                ["Browser agent", "Agent jo browser se pages parhta aur (jahan allowed) click/type/navigate karta hai"],
                ["Task filesystem (Tier 1)", "Temporary scratch space, task khatam hote hi wipe"],
                ["Platform storage (Tier 2)", "Vendor account mein saved files, vendor ki custody mein"],
                ["The exit (Tier 3)", "Deliverable ek system mein jaati hai jo aap control karte ho"],
                ["State spine", "Poori persistence stack: sessions, Projects, memory, instructions, files"],
                ["Semantic memory", "Facts/preferences jo assistant cloud sessions ke across carry karta hai"],
                ["Standing instructions", "Rules jo repeatedly apply hoti hain"],
                ["Human gate", "Control jo sahi risk boundary pe insaan ko loop mein rakhta hai"],
                ["Approval mode", "Agent kitni baar permission ke liye rukta hai (Manual/Auto/Skip)"],
                ["Scheduled task", "Clock ya doosre trigger pe shuru hone wala kaam"],
                ["Custody", "Aapka data kiske paas hai, kis machine pe, kis rule ke under"],
                ["Delegation loop", "Brief → Plan → Approve/redirect → Review ka 4-step cycle"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source Note">
              Ye Cybrum notes Agent Factory book (agentfactory.panaversity.org)
              ke &ldquo;General Agents on the Web&rdquo; crash course par
              based hain, uski copy nahi. Original source dekho:{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/general-agents-web-crash-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                agentfactory.panaversity.org/docs/general-agents-web-crash-course
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
                  q: "Ek colleague type kar ke bolta hai \"Every Monday at 8, summarise last week's emails and save the brief.\" Ye ordinary chat hai ya delegated agent work?",
                  a: "Delegated agent work hai, kyunke ye doosri chat turn ke bina chal sakta hai. Instruction chat box mein shuru hui, lekin kaam baad mein start hota hai aur bina message ke continue hota hai, isliye \"stop typing\" test ye alag karta hai.",
                },
                {
                  q: "Ek cloud Cowork task ko ek local folder Claude Desktop ke through chahiye. Desktop app offline ho jaye to kya hota hai?",
                  a: "Cloud loop chalta rehta hai kyunke wo vendor infrastructure pe hai, lekin bridged local tool offline ho jata hai. Agent-loop location aur tool-execution location alag decisions hain.",
                },
                {
                  q: "\"Same shape, same trust nahi hai\" ka kya matlab hai?",
                  a: "Ek connector call aur ek authenticated browser click same business system reach kar sakte hain, lekin unki permissions, observability, aur prompt-injection exposure alag hoti hai. Six-part lens sirf part ka role batata hai, implementation khud inspect karni parti hai.",
                },
                {
                  q: "3 file tiers kya hain, aur kaunsa tier deliverable ke liye final hona chahiye?",
                  a: "Tier 1 task filesystem (scratch, wipe ho jati hai), Tier 2 platform storage (vendor ki custody), Tier 3 the exit (aapki apni custody). Finished work hamesha Tier 3 mein exit karni chahiye.",
                },
                {
                  q: "Reach ladder ka default rule kya hai?",
                  a: "Jo sabse structured tool kaam kar sake wo use karo: Connector pehle, phir browser, phir full computer use, jitna narrow tool utna kam risk aur ambiguity.",
                },
                {
                  q: "Cowork ke 3 approval modes kya karte hain?",
                  a: "Manual har consequential action pe rukta hai. Auto chalta rehta hai lekin har action ek safety classifier se screen hota hai. Skip ordinary approvals aur Auto ka action check dono skip karta hai, sirf tightly trusted bounded kaam ke liye.",
                },
                {
                  q: "Delegation loop ke 4 steps kya hain?",
                  a: "Brief (outcome, sources, boundaries batao), Plan (consequential kaam se pehle agent apna plan dikhaye), Approve ya redirect (plan fix karo jab tak sasta hai), Review (finished deliverable aur file locations inspect karo).",
                },
                {
                  q: "Ek scheduled task \"completed\" dikhati hai. Ise successful kehne se pehle course kya maangta hai?",
                  a: "Ek observable signal ke sath, jaise sahi file sahi jagah, ya explicit \"no new items\" result. \"Ran\" hona \"worked\" hone jaisa nahi hai, scheduler sirf execution status batata hai, output correctness nahi.",
                },
                {
                  q: "Ek team enterprise compliance controls dekh kar foran PHI Cowork mein daalna chahti hai. Sahi agla kadam kya hai?",
                  a: "Ruko aur verify karo, kyunke Cowork abhi HIPAA ke liye apni BAA ke under covered nahi hai. Enterprise observability controls automatically kisi regulated workload ko approve nahi karte, exact surface aur configuration ka likha hua jawab chahiye.",
                },
                {
                  q: "Managed agent surface aur open path (OpenWork/OpenCode) ke darmiyan central trade kya hai?",
                  a: "Managed surface ek ready spine deta hai (sessions, sync, scheduling, sab kaam karta hua din 1 se), unki custody, unke rules ke under. Open path zyada custody aur model/runtime choice deta hai, lekin har cheez aapko khud build aur operate karni parti hai.",
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
