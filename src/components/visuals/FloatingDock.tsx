"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, SendHorizontal, Sparkles, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type Msg = {
  role: "user" | "assistant";
  content: string;
  /** Prefilled wa.me link from the API after a lead is captured; rendered as a
   *  "Continue on WhatsApp" button under the reply. */
  whatsapp?: string;
};

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
  // Mobile keyboard inset + visible height, from the visualViewport API.
  // Needed on iOS Safari where the keyboard overlays instead of resizing the page.
  const [kb, setKb] = useState(0);
  const [vvh, setVvh] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      setVvh(vv.height);
      setKb(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setKb(0);
    };
  }, [open]);

  // Grow the textarea with its content, up to ~4 lines.
  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 104)}px`;
  }, [input, open]);

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
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply,
          whatsapp: typeof data.whatsapp === "string" ? data.whatsapp : undefined,
        },
      ]);
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
            className="fixed bottom-24 left-4 right-4 z-[70] flex h-[30rem] max-h-[calc(100dvh-7.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6 sm:w-[22rem]"
            style={
              kb > 4
                ? { bottom: kb + 12, maxHeight: Math.max(vvh - 24, 260) }
                : undefined
            }
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-surface/60 px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                <Logo size={22} className="h-5 w-5" />
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
                    className={`max-w-[85%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent text-white"
                        : "border border-border bg-surface/70 text-foreground"
                    }`}
                  >
                    {m.content}
                    {m.whatsapp && (
                      <a
                        href={m.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-bright"
                      >
                        <MessageCircle size={14} />
                        Continue on WhatsApp
                      </a>
                    )}
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
              className="flex items-end gap-2 border-t border-border bg-surface/60 p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                enterKeyHint="send"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Type your message..."
                className="min-w-0 flex-1 resize-none overflow-y-auto rounded-xl border border-border bg-card px-3.5 py-2.5 text-base leading-snug text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent sm:text-sm"
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
