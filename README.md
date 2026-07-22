# CatChat

AI cat companions — browse generated characters, chat in character, install as a PWA.

**Live:** [catchatapp-6f11c.web.app](https://catchatapp-6f11c.web.app/)

## What it is

CatChat is a Next.js web app / PWA where you browse AI-generated cat characters (name, personality, scenario, portrait) and chat with them in character. Auth and threads live on Firebase; generation and chat run through Cloud Functions.

## Features

- Companion grid with portraits and short bios
- Character modal → start chat (auth-gated)
- In-character chat with thread history and quick prompts
- Email/password auth and basic profile
- Installable PWA on Firebase Hosting

## Stack

| Layer | Tech |
|---|---|
| App | Next.js · React · TypeScript · Tailwind |
| Auth / data | Firebase Auth · Firestore · Storage |
| AI | Cloud Functions · OpenAI / OpenRouter (profiles, portraits, chat) |
| Hosting | Firebase Hosting (static export) |

## Local development

```bash
npm install   # or yarn
npm run dev
```

You’ll need Firebase and API env vars for full chat/generation. The UI still loads without them for layout work.

## Notes

I built the product surface (Next.js UI + Firebase wiring). Cloud Functions for generation/chat had teammate contributions.

## License

Private / portfolio project unless noted otherwise.
