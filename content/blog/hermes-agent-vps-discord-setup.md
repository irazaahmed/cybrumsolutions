---
title: "I Put an AI Agent on My VPS Today and Now I Run It From My Phone"
date: "2026-08-26"
excerpt: "Today I installed Hermes Agent on my own VPS, connected it to OpenAI's GPT-5-mini, and wired it up to Discord so I can command it from my phone. Here is exactly what got built, what I deliberately left alone, and why this is the same thing I sell clients, just pointed at my own infrastructure first."
tags: ["Founder Update", "AI Agents", "Automation", "Cybrum Solutions"]
---

Today's build was not client work. It was infrastructure for myself: an AI agent that lives on my own server, that I can talk to from my phone, and that can actually go look at the server and tell me the truth about it instead of me SSH-ing in every time I want to know something.

That agent is Hermes Agent, and by the end of today it went from "not installed" to "running as a background service, reachable from Discord, tested against real commands on the box."

## Step one: check if the VPS could even handle it, before installing anything

Before touching Hermes, I checked what the server actually had to give it:

```
free -h && nproc
```

7.8 GB RAM, about 5.4 GB free, 2 CPU cores, no swap. Enough headroom to run an agent without starving whatever else is on that box. Cheap infrastructure decisions made in week one have a way of becoming expensive problems in month six, so this five-second check came first, not as an afterthought.

## Installed Hermes, deliberately skipped Ollama

Hermes installed clean — binary at `/usr/local/lib/hermes-agent`, config at `/root/.hermes/config.yaml`, keys in `/root/.hermes/.env`. One decision I made early and stuck to: no local model, no Ollama. This VPS runs a real cloud model through an API, not a local model competing for the same 2 cores the rest of the server needs. Not every automation needs to be self-hosted end to end — sometimes the right call is renting the intelligence and owning the infrastructure around it.

## Pointed it at OpenAI's GPT-5-mini, not the most expensive option

Hermes supports a handful of providers — OpenAI, Anthropic, Nous Portal, OpenRouter, Google AI Studio among them. The goal here was a low-cost model that is still good enough to run real commands and reason about real output, not the flagship model for every trivial "check my disk space" request. GPT-5-mini through the OpenAI API was the right fit for that job, and Hermes confirmed the connection immediately: `Default model set to: gpt-5-mini (via OpenAI API)`.

## Tested it on the actual server before trusting it with anything

Before wiring up any remote access, I ran Hermes locally on the VPS and gave it a boundary-testing instruction: tell me the OS, CPU, and available RAM — don't change anything. It came back correct: Ubuntu 24.04.4 LTS, 2 CPUs, roughly 7.8 GiB RAM, about 5.2 GiB available. Then I asked it to list `/root` without making changes, and it read the directory correctly — `.hermes/`, `.ssh/`, `backups/`, the lot — without touching any of it.

That distinction matters more than it sounds: an agent that can execute commands is only useful if you have first proven it respects "don't change anything" when you say it.

## Wired it to Discord so my phone becomes the control panel

The actual point of today was not "run an agent on a server I have to SSH into." It was: control this from my phone, from anywhere. That meant a Discord bot.

- Created a `hermes-agent` application in the Discord Developer Portal and enabled the Message Content Intent, which the bot needs to actually read what gets typed to it.
- Added the Discord bot token into Hermes's config — never exposed anywhere public.
- Added my own Discord user ID to Hermes's allowlist, so the agent only takes instructions from me, not from anyone else who might end up in the same server.
- Installed the gateway as a system service, `hermes-gateway.service`, set to start on boot — the service runs under root on this box, which Hermes itself flagged as not the recommended setup for a hardened production environment. Noted honestly, not hidden: this VPS is not running client workloads, so I accepted the tradeoff here. I would not make the same call on a box that is.
- Verified with `hermes gateway status --system`: active, running, enabled at boot.

## First message failed. Second one worked, and that told me something useful

I sent a plain `hello` into the channel first. Nothing happened — Hermes doesn't reply to ambient chatter, only to messages that actually mention it. That is a deliberate design choice, not a bug: an agent sitting in a shared channel that responds to every stray word is a liability, not a feature. Once I sent `@hermes-agent tell me about you?`, it replied immediately, and the full chain was proven end to end: **Discord → Hermes Gateway → Hermes Agent → GPT-5-mini → back to Discord.**

I gave it its own channel, `#hermes-agent`, and set it as the home channel with `/sethome` — the place where cron job results and cross-platform notifications will land later. Setting a home channel does not make Hermes reply to everything said there either; it still needs the mention. Two different concepts, both tested separately so I actually understand the boundary instead of assuming it.

I also tested it in Roman Urdu — "kia tum roman me bat kar sakte ho?" — and it replied naturally in Roman Urdu. Small thing, but it matters for how I will actually use this day to day.

## Closed the loop with a real task, not just a greeting

The last test was the one that actually matters: from my phone, over Discord, I asked Hermes to check the VPS's disk usage without changing anything. It ran `df -hT --total`, `df -i`, and a `du` sweep of the top directories, and reported back accurately — 96 GB total, 30 GB used, 66 GB free, `/var` around 24 GB, `/usr` around 4.2 GB. That is the whole point proven in one message: a real command, executed on a real server, triggered from my phone, with the result read back to me in plain language.

## What I deliberately did not touch today

My laptop is completely untouched — I checked its OS out of curiosity earlier, considered a native Hermes install on it, and decided against it for now. No Ollama anywhere in this setup. Both were conscious calls, not gaps I forgot about.

## Why this is not just a personal toy

This is the same architecture I build for clients, just pointed at my own server first: an agent that reads real state, is honest about what it doesn't know, and only acts within a boundary someone deliberately set. Cybrum's whole pitch is "one founder, an agentic AI workforce, team-level output" — today was that pitch, applied to my own infrastructure before I'd ever ask a client to trust it with theirs.

Execution over words, day by day. If you want an agent like this reading and acting on your own systems — not a demo, an actual working agent — [book a free AI audit](/contact) and let's talk about what that looks like for your business.
