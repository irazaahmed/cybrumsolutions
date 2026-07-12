---
title: "Stop Fighting VLOOKUP: Get Any Excel Formula by Describing It in Plain Words"
date: "2026-07-12"
excerpt: "You know exactly what you want the spreadsheet to do. You just do not know which formula does it. Here is how to get the exact Excel or Google Sheets formula, with a plain explanation, by simply describing the task."
tags: ["Excel", "Google Sheets", "Productivity", "AI Skills"]
---

Everyone who works with a spreadsheet knows this moment. The data is right there. You know exactly what you want: "total sales, but only for Karachi, and only for March." What you do not know is which formula does that, and the next hour disappears into Google, forum answers written for someone else's columns, and a cell that says `#N/A`.

The formula was never the hard part. Explaining your task to the spreadsheet was. So skip that part: explain it to an AI instead, in your own words, and let it write the formula for you.

## The old way: search, copy, break

The usual routine looks like this. You search "excel formula lookup value from another sheet." You land on a forum thread from 2019. The answer uses columns D and F; your data lives in B and K. You paste it anyway, edit it half-correctly, and get `#N/A`. Now you are debugging a formula you never understood in the first place.

The problem is not you. Generic answers cannot know your layout, your app (Excel or Google Sheets), or your version. So they almost fit, which is worse than not fitting at all.

## The new way: describe the task, get the formula

We packaged this into a free, downloadable AI skill: the [Excel & Google Sheets Formula Generator](/skills/excel-formula-generator). You describe what you want in plain words, and it returns:

- **The formula**, written for your app, using your actual columns when you share them.
- **A plain explanation**, step by step, so you understand what each part does.
- **A tiny worked example**, a few rows in, result out, so you can verify it instantly.
- **The pitfalls**, the classic traps like `#N/A`, text stored as numbers, or references that shift when you copy the cell.
- **A better alternative** when one exists, like `XLOOKUP` instead of `VLOOKUP`, or `FILTER` in Google Sheets.

You can write your request in English, Urdu, or Roman Urdu. The explanation comes back in your language; the formula stays standard.

## Three examples from real work

**"Total sales for one branch only."** Say column A holds branch names and column B holds amounts:

```
=SUMIF(A:A, "Karachi", B:B)
```

One condition, one line. Add a month column and it becomes `SUMIFS`, and the skill will show you exactly how.

**"Find a customer's balance by name."** The classic lookup. Instead of wrestling `VLOOKUP` and its column-counting, the skill will usually hand you the modern version:

```
=XLOOKUP(E2, A:A, C:C, "Not found")
```

And it will tell you why this one does not break when you insert a column, which is precisely how most `VLOOKUP` sheets die.

**"Count invoices that are overdue."** Dates in column B, today as the cutoff:

```
=COUNTIF(B:B, "<" & TODAY())
```

Each answer arrives with the explanation and the example, so the third time you need something similar, you may not need to ask at all.

## Why the explanation matters more than the formula

A pasted formula solves today. An explained formula solves the category. When the skill tells you "SUMIF takes the range to check, the condition, and the range to add," you have not just fixed one cell. You have learned a pattern you will reuse fifty times.

That is also why the skill refuses to guess silently. If your request really points to a data problem, like merged cells or totals mixed into the data, it says so honestly and suggests the small restructure first. A formula on top of broken structure is a time bomb with a nicer interface.

## How to use it in one minute

The skill is a single Markdown file, and there are two ways to run it:

1. **[Download the skill](/skills/excel-formula-generator)** from our free Skills Library.
2. Drop it into your Claude Code skills folder, **or simply paste its text into any AI chat** (Claude, ChatGPT, anything) followed by your request.
3. Describe your task. For best results, paste two or three sample rows and say whether you use Excel or Google Sheets.

No signup, no cost. If you are new to the idea of AI skills, we explained the whole concept in [What are AI skills](/blog/what-are-ai-skills).

## The bottom line

You should not need to speak formula to use a spreadsheet. Describe the task the way you would to a colleague, and let the skill translate it into something the spreadsheet understands, then teach you what it wrote.

**[Download the Excel & Google Sheets Formula Generator](/skills/excel-formula-generator)** and try it on the formula that has been annoying you all week. And if your spreadsheet work has grown into something bigger, reports that build themselves, data that flows in automatically, [book a free AI audit](/contact) and we will map out what is worth automating.
