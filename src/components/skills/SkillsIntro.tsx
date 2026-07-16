"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Trilingual explainer shown above the skills grid. Written natively in each
 * language (not machine translated) so a non-technical visitor immediately
 * understands what a skill is, why it matters, and which one fits them.
 */

type Lang = "en" | "ro" | "ur";

type IntroContent = {
  what: { title: string; paragraphs: string[] };
  why: { title: string; points: string[] };
  how: { title: string; steps: string[] };
};

const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "ro", label: "Roman Urdu" },
  { id: "ur", label: "اردو" },
];

const CONTENT: Record<Lang, IntroContent> = {
  en: {
    what: {
      title: "What exactly is a skill?",
      paragraphs: [
        "Think of a skill as a job manual for AI. When you hire a smart new employee, they still need training: how you write invoices, how you talk to customers, what to say and what to avoid.",
        "An AI skill is that training, written down once in a small file. Hand the file to an AI like Claude, and it does that one job your way, every single time, without getting tired.",
      ],
    },
    why: {
      title: "Why would you need one?",
      points: [
        "Without a skill, AI gives generic, one-size-fits-all answers. A skill turns it into a specialist for your exact task.",
        "No more typing long instructions every day. The instructions are written once, properly, and saved forever.",
        "The output stays consistent: the same quality today, tomorrow, and six months from now.",
        "Download once, run it in Claude Code or any AI agent. Completely free.",
      ],
    },
    how: {
      title: "How to use a skill (3 steps)",
      steps: [
        "Open any skill below and read what it does and how it behaves.",
        "Download the .md file with one click.",
        "Drop it into your Claude Code skills folder, or simply paste its text into any AI chat and put it to work.",
      ],
    },
  },

  ro: {
    what: {
      title: "Skill aakhir hai kya?",
      paragraphs: [
        "Skill ko aise samjhein jaise aap ne apne kaam ke liye ek naya, samajhdar mulazim rakha ho. Banda qabil hai, lekin training to phir bhi deni parti hai: hamare yahan invoice kaise banti hai, customer se kis andaz me baat hoti hai, kya kehna hai aur kya nahi.",
        "AI skill asal me yehi training hai, bas ek chhoti si file me likhi hui. Ye file aap Claude jaise AI ko de dein, to wo kaam bilkul aap ke tareeqe se kare ga. Har bar ek jaisa, bina thake.",
      ],
    },
    why: {
      title: "Is ki zaroorat kyun hai?",
      points: [
        "Bina skill ke AI har bar aam sa, ratta rataya jawab deta hai. Skill usay aap ke kaam ka expert bana deti hai.",
        "Roz roz lambi hidayaat likhne ka jhanjhat khatam. Hidayat ek bar theek tarah likhi gayi, hamesha ke liye mehfooz.",
        "Nateeja har bar ek jaisa: aaj bhi wohi quality, kal bhi, aur 6 mahine baad bhi.",
        "Ek bar download karein, Claude Code ya kisi bhi AI agent me chalayen. Bilkul free.",
      ],
    },
    how: {
      title: "Skill use kaise karein? (3 qadam)",
      steps: [
        "Neeche list me se koi skill kholein aur parhein ke wo kya karti hai.",
        "Ek click me .md file download karein.",
        "File Claude Code ke skills folder me rakh dein, ya us ka text kisi bhi AI chat me paste kar ke kaam lein.",
      ],
    },
  },

  ur: {
    what: {
      title: "اسکل آخر ہے کیا؟",
      paragraphs: [
        "اسکل کو یوں سمجھیے جیسے آپ نے اپنے کام کے لیے ایک نیا، سمجھ دار ملازم رکھا ہو۔ بندہ قابل ہے، مگر تربیت پھر بھی دینی پڑتی ہے: ہمارے ہاں انوائس کیسے بنتی ہے، کسٹمر سے کس انداز میں بات ہوتی ہے، کیا کہنا ہے اور کیا نہیں۔",
        "اے آئی اسکل دراصل یہی تربیت ہے، بس ایک چھوٹی سی فائل میں لکھی ہوئی۔ یہ فائل آپ کلاڈ جیسے اے آئی کو دے دیں، تو وہ کام بالکل آپ کے طریقے سے کرے گا۔ ہر بار ایک جیسا، بغیر تھکے۔",
      ],
    },
    why: {
      title: "اس کی ضرورت کیوں ہے؟",
      points: [
        "بغیر اسکل کے اے آئی ہر بار عام سا، رٹا رٹایا جواب دیتا ہے۔ اسکل اسے آپ کے کام کا ماہر بنا دیتی ہے۔",
        "روز روز لمبی ہدایات لکھنے کا جھنجھٹ ختم۔ ہدایت ایک بار ٹھیک طرح لکھی گئی، ہمیشہ کے لیے محفوظ۔",
        "نتیجہ ہر بار ایک جیسا: آج بھی وہی معیار، کل بھی، اور چھ مہینے بعد بھی۔",
        "ایک بار ڈاؤن لوڈ کیجیے، کلاڈ کوڈ یا کسی بھی اے آئی ایجنٹ میں چلائیے۔ بالکل مفت۔",
      ],
    },
    how: {
      title: "اسکل استعمال کیسے کریں؟ (تین قدم)",
      steps: [
        "نیچے فہرست میں سے کوئی اسکل کھولیے اور پڑھیے کہ وہ کیا کرتی ہے۔",
        "ایک کلک میں ‎.md فائل ڈاؤن لوڈ کیجیے۔",
        "فائل کلاڈ کوڈ کے اسکلز فولڈر میں رکھ دیجیے، یا اس کا متن کسی بھی اے آئی چیٹ میں پیسٹ کر کے کام لیجیے۔",
      ],
    },
  },
};

export function SkillsIntro() {
  const [lang, setLang] = useState<Lang>("en");

  const c = CONTENT[lang];
  const isUrdu = lang === "ur";

  // Nastaliq needs extra line height; Roman Urdu and English share the
  // default Latin typography.
  const bodyText = isUrdu
    ? "[font-family:var(--font-nastaliq)] text-base leading-[2.2] sm:text-lg"
    : "text-sm leading-relaxed sm:text-base";
  const headingText = isUrdu
    ? "urdu-heading text-xl font-semibold sm:text-2xl"
    : "font-heading text-lg font-semibold tracking-tight sm:text-xl";

  // NOTE: intentionally not wrapped in <Reveal>. On mobile this section is
  // several viewports tall, so a whole-section whileInView (amount 0.2) never
  // fires and the content would stay invisible.
  return (
    <section
      aria-label="What AI skills are and how to use them"
      className="mt-10 rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/8 to-transparent p-6 sm:p-9"
    >
        {/* Language toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            {lang === "en"
              ? "New to skills? Start here"
              : lang === "ro"
                ? "Skills me naye hain? Yahan se shuru karein"
                : "اسکلز میں نئے ہیں؟ یہاں سے شروع کیجیے"}
          </p>
          <div className="flex gap-2" role="group" aria-label="Choose language">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  lang === l.id
                    ? "border-accent bg-accent/10 text-accent-bright"
                    : "border-border bg-surface/60 text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div dir={isUrdu ? "rtl" : "ltr"} className="mt-7">
          {/* What + Why, side by side on large screens */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-7">
              <h2 className={headingText}>{c.what.title}</h2>
              <div className={`mt-3 space-y-3 text-muted ${bodyText}`}>
                {c.what.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-7">
              <h2 className={headingText}>{c.why.title}</h2>
              <ul className={`mt-3 space-y-2.5 text-muted ${bodyText}`}>
                {c.why.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to use */}
          <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-7">
            <h2 className={headingText}>{c.how.title}</h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-3">
              {c.how.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold text-accent-bright">
                    {i + 1}
                  </span>
                  <span className={`text-muted ${bodyText}`}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}
