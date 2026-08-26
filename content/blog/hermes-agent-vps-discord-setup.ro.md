---
title: "Aaj Maine Apni VPS Pe AI Agent Laga Diya, Ab Phone Se Chalata Hoon"
date: "2026-08-26"
excerpt: "Aaj maine apni VPS pe Hermes Agent install kiya, OpenAI ke GPT-5-mini se connect kiya, aur Discord ke through wire kiya taake apne phone se command kar sakoon. Yeh raha exact kya bana, kya jaan boojh kar chhoda, aur yeh kyun wahi cheez hai jo main clients ko bechta hoon — bas pehle apni hi infrastructure pe azma li."
tags: ["Founder Update", "AI Agents", "Automation", "Cybrum Solutions"]
---

Aaj ka build client work nahi tha. Apne liye infrastructure thi: ek AI agent jo apne hi server pe rehta ho, jise main apne phone se baat kar sakoon, aur jo actually server ko dekh ke sach bata sake — har baar SSH karke khud check karne ke bajaye.

Wo agent Hermes Agent hai, aur din khatam hote hote yeh "install hi nahi" se "background service ki tarah chal raha, Discord se reachable, real commands pe test shuda" tak pohonch gaya.

## Pehla step: kuch install karne se pehle check kiya ke VPS handle kar bhi sakta hai ya nahi

Hermes ko haath lagane se pehle, dekha VPS ke paas actually kya hai:

```
free -h && nproc
```

7.8 GB RAM, tqreeban 5.4 GB free, 2 CPU cores, koi swap nahi. Itni jagah thi ke agent ko chalaya ja sake bina baaki server ko bhooka rakhe. Week one mein li gayi sasti infrastructure decisions month six mein mehngi problem ban jati hain, isliye yeh paanch second ka check pehle hua, baad mein nahi.

## Hermes install kiya, jaan boojh kar Ollama skip kiya

Hermes cleanly install ho gaya — binary `/usr/local/lib/hermes-agent` pe, config `/root/.hermes/config.yaml` pe, keys `/root/.hermes/.env` mein. Ek decision jo maine shuru mein li aur uspe qaim raha: koi local model nahi, Ollama nahi. Yeh VPS ek real cloud model API ke through chalata hai, koi local model nahi jo baaki server ke saath usi 2 cores ke liye compete kare. Har automation ko end-to-end self-hosted hona zaroori nahi — kabhi kabhi sahi decision yeh hota hai ke intelligence rent pe lo aur uske around ki infrastructure khud rakho.

## GPT-5-mini pe point kiya, sabse mehnga option nahi

Hermes kai providers support karta hai — OpenAI, Anthropic, Nous Portal, OpenRouter, Google AI Studio inme se kuch. Goal yeh tha ke ek low-cost model mile jo phir bhi real commands run karne aur real output pe reason karne ke liye kaafi accha ho — har chhoti si "meri disk space check karo" request ke liye flagship model nahi. OpenAI API ke through GPT-5-mini isi kaam ke liye sahi fit tha, aur Hermes ne foran confirm kar diya: `Default model set to: gpt-5-mini (via OpenAI API)`.

## Kisi ko bhi trust karne se pehle actual server pe test kiya

Koi remote access wire karne se pehle, maine Hermes ko VPS pe locally chalaya aur ek boundary-testing instruction di: OS, CPU, aur available RAM batao — kuch change mat karna. Jawab sahi aaya: Ubuntu 24.04.4 LTS, 2 CPUs, tqreeban 7.8 GiB RAM, tqreeban 5.2 GiB available. Phir maine kaha `/root` list karo bina kuch change kiye, aur usne directory sahi parh li — `.hermes/`, `.ssh/`, `backups/`, sab kuch — bina kisi cheez ko chhue.

Yeh farq sunne mein jitna chhota lagta hai, utna hai nahi: aisa agent jo commands execute kar sake wo tabhi kaam ka hai jab pehle yeh sabit ho jaye ke jab aap kahein "kuch mat badlo" to wo waqai respect karta hai.

## Discord se wire kiya taake phone hi control panel ban jaye

Aaj ka asal maqsad yeh nahi tha ke "aisa agent server pe chalao jise SSH karke access karna pade." Maqsad tha: isse apne phone se, kahin se bhi, control karna. Iske liye Discord bot chahiye tha.

- Discord Developer Portal mein `hermes-agent` naam ki application banayi aur Message Content Intent enable kiya, jo bot ko zaroori hai taake wo actually parh sake ke usse kya likha ja raha hai.
- Hermes ke config mein Discord bot token daala — kahin publicly expose nahi kiya.
- Apna Discord user ID Hermes ki allowlist mein add kiya, taake agent sirf mujhse instructions le, kisi aur se nahi jo isi server mein aa jaye.
- Gateway ko system service ki tarah install kiya, `hermes-gateway.service`, boot pe start hone ke liye set kiya — service is box pe root ke under chalti hai, jise Hermes ne khud flag kiya ke yeh hardened production environment ke liye recommended setup nahi hai. Honestly note kiya, chhupaya nahi: yeh VPS client workloads nahi chala raha, isliye yahan yeh tradeoff accept kiya. Jis box pe client workload chal rahi ho, wahan yehi decision nahi loonga.
- `hermes gateway status --system` se verify kiya: active, running, boot pe enabled.

## Pehla message fail hua. Doosra chala, aur usse ek kaam ki baat pata chali

Pehle channel mein sirf `hello` bheja. Kuch nahi hua — Hermes ambient chatter ka reply nahi deta, sirf un messages ka jinme usse actually mention kiya jaye. Yeh jaan boojh kar liya gaya design decision hai, bug nahi: ek shared channel mein baitha hua agent jo har chhote se word ka reply de, wo feature nahi, liability hai. Jaise hi `@hermes-agent tell me about you?` bheja, usne foran reply diya, aur poori chain end to end sabit ho gayi: **Discord → Hermes Gateway → Hermes Agent → GPT-5-mini → wapas Discord.**

Isko apna alag channel diya, `#hermes-agent`, aur `/sethome` se ise home channel set kiya — wo jagah jahan baad mein cron job results aur cross-platform notifications aayenge. Home channel set karne se Hermes wahan bhi har baat ka reply nahi deta; usse phir bhi mention chahiye hota hai. Do alag concepts, dono alag alag test kiye taake main waqai boundary samjhoon, sirf assume na karoon.

Isse Roman Urdu mein bhi test kiya — "kia tum roman me bat kar sakte ho?" — aur usne naturally Roman Urdu mein jawab diya. Chhoti si baat hai, lekin matter karti hai ke main isse din-ba-din actually kaise use karunga.

## Ek real task se loop close kiya, sirf greeting se nahi

Aakhri test wahi tha jo actually matter karta hai: apne phone se, Discord ke through, maine Hermes se kaha VPS ki disk usage check karo bina kuch change kiye. Usne `df -hT --total`, `df -i`, aur top directories ka `du` sweep run kiya, aur accurately report kiya — 96 GB total, 30 GB used, 66 GB free, `/var` tqreeban 24 GB, `/usr` tqreeban 4.2 GB. Yehi wo poori baat hai jo ek message mein sabit ho gayi: ek real command, real server pe execute hui, mere phone se trigger hui, aur jawab mujhe plain language mein wapas mila.

## Aaj jaan boojh kar kya nahi chheda

Mera laptop bilkul untouched hai — pehle sirf curiosity mein iska OS check kiya tha, usme native Hermes install karne ka socha bhi, lekin abhi ke liye mana kar diya. Is poore setup mein kahin Ollama nahi hai. Dono conscious decisions the, koi bhoola hua gap nahi.

## Yeh sirf personal toy kyun nahi hai

Yeh wahi architecture hai jo main clients ke liye banata hoon, bas pehle apne hi server pe point kiya: ek agent jo real state parhta hai, jo yeh honestly bataye ke usse kya nahi pata, aur jo sirf usi boundary ke andar act kare jo kisi ne jaan boojh kar set ki ho. Cybrum ka poora pitch yehi hai — "ek founder, ek agentic AI workforce, team-level output" — aaj wahi pitch, apni hi infrastructure pe apply hui, isse pehle ke kisi client se yeh kahoon ke apni system iske hawale kare.

Execution over words, din ba din. Agar aap chahte hain ke aisa hi agent aapke apne systems ko parhe aur unpe act kare — koi demo nahi, ek actual working agent — to [free AI audit book karein](/contact) aur baat karte hain ke yeh aapke business ke liye kaisa dikhega.
