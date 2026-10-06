# Hopecore Bingo

A corporate-lorem-ipsum-style generator for futures-lab language, with a paste-to-check bingo card. Choose an academic abstract or workshop invitation; generate one to five paragraphs; copy the result. The checker lights up 24 trope families and shows the exact text behind each match. Five squares in a row, column or diagonal make bingo, with a free centre.

## Run

Requires Node.js 24 or newer. No package installation or API key is needed.

```sh
npm run dev
# http://localhost:4178
npm test
```

The local preview server serves only the app's explicit asset list. It listens on all interfaces for WSL-to-Windows access; stop it when finished.

## How matching works

The browser uses a curated phrase lexicon with word boundaries, case-insensitive matching, selected word-form variants and normalized Unicode hyphens. Evidence retains offsets into the original text. Scores count matched families, not repeated mentions. Text is processed locally and is not stored. This is lexical matching, not semantic classification: criticism, negation and ironic uses still count. English is the initial supported language.

The generator is an original template grammar, not an LLM call or a retrieval system. The app limits paste input to 40,000 characters. Fonts are currently loaded from Google Fonts; text processing does not make network calls.

## Source material

- [Conceptual references and academic raw material](research/reference-map.md)
- [Fourteen practice sources and visual references](research/practice-sources.md)

The term hopecore is this project's interpretation of the register. The sources make distinct arguments; matching their vocabulary does not assess research quality. The example abstract was supplied by the user and links to its publication. Private Obsidian notes and downloaded screenshots are not included.

## Structure

`dist/vocabulary.mjs` owns trope labels, matching patterns and source links. `dist/engine.mjs` owns analysis, line detection and generation. `dist/app.mjs` connects browser controls to these operations. Static hosting uses `dist/` and the Sites identity in `.openai/hosting.json`.
