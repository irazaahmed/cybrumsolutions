"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, SendHorizontal, Sparkles, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Cybrum Solutions assistant. Ask me about our automation, AI agents, chatbots, or how we can help your business. How can I help?",
};

const SUGGESTIONS = [
  "What does Cybrum Solutions do?",
  "How can automation help my business?",
  "Book a free AI audit",
];

export function FloatingDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("chat failed");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't respond right now. Please try again, or reach us on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[30rem] max-h-[70vh] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-surface/60 px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                <Image
                  src="/CS Logo Without BG.png"
                  alt={site.name}
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain"
                />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight font-heading">
                  Cybrum Solutions
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  AI Assistant · Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent text-white"
                        : "border border-border bg-surface/70 text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface/70 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-bright [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-bright [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-bright" />
                  </div>
                </div>
              )}

              {/* Suggestions (only before first user message) */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-col gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 py-2 text-left text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      <Sparkles size={13} className="shrink-0 text-accent-bright" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-surface/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Cybrum Solutions..."
                className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-bright disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <SendHorizontal size={18} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat launcher (bottom-right) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        className="group fixed bottom-5 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_30px_-6px_var(--color-accent)] transition-all hover:bg-accent-bright sm:right-6"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
        )}
        <span className="relative">
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </span>
      </button>
    </>
  );
}
