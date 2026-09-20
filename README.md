# The Runaround

Lean New Zealand systems-navigation MVP.

## What is in V1

- Council complaint builder
- Private parking / clamping dispute builder
- Privacy Act personal-information request builder
- Debt collection dispute / information request builder
- Rent increase query builder
- Pay deduction query builder
- NZTA Motor Vehicle Register myth-check panel
- Official source links for each tool
- Copy-ready wording generated entirely in the browser

## Product rule

The app does **not** use an LLM to decide someone's rights. Each tool is based on a manually verified rule summary and official source. Automation only turns user-supplied facts into structured wording.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Railway

This repo is deployable as a standard Next.js service. Railway can use the default build command (`npm run build`) and start command (`npm start`).

No environment variables or database are required for V1.

## Next build stage

1. Create structured `rules` storage in Postgres with `last_verified_at`, `source_url`, risk level and revision notes.
2. Add issue-specific escalation ladders.
3. Add case export / printable bundle.
4. Add anonymous analytics for which systems create the most demand.
5. Add an editorial workflow for social-post seeds and myth checks.
6. Add a human review gate for higher-risk modules such as ACC, MSD and employment disputes.
