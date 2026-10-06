# Carem Ipsum / Hopecore Bingo

A corporate-lorem-ipsum-style generator for futures-lab language, with a paste-to-check bingo card. Choose an academic abstract, workshop invitation, collective manifesto or exhibition wall text. Pick a futures-lab, more-than-human or commons-and-repair world, set the jargon level, generate one to five paragraphs and copy the result. The checker lights up 24 trope families and shows the exact text behind each match. Five squares in a row, column or diagonal make bingo, with a free centre. All twelve winning lines have names. The card groups related themes into rows and gives each column and diagonal its own name. Completed-line badges highlight their five squares and link to the matching evidence; the expandable guide lists every line and its progress.

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

The generator is an original compositional grammar. It selects a consistent world and setting, draws sentence structures without replacement, and pairs grounded and dense vocabulary. The highest jargon level adds an exaggerated aside. It does not call an LLM or retrieve source text. The app limits paste input to 40,000 characters. Fonts are currently loaded from Google Fonts; text processing does not make network calls.

## Source material

- [Conceptual references and academic raw material](research/reference-map.md)
- [Practice sources and visual references](research/practice-sources.md)
- [Expanded sources, including the Monash lead](research/expanded-sources.md)
- [Lipsum mechanisms and design decisions](research/lipsum-mechanics.md)

The term hopecore is this project's interpretation of the register. The sources make distinct arguments; matching their vocabulary does not assess research quality. The built-in example is fictional. The app includes no author attributions or outbound research links. Private Obsidian notes and downloaded screenshots are not included.

## Structure

`dist/vocabulary.mjs` owns trope labels and matching patterns. `dist/engine.mjs` owns analysis and line detection. `dist/bingo-card.mjs` owns the card arrangement and names for every winning line. `dist/generator.mjs` owns composition; `dist/generator-corpus.mjs` holds the original grammar and themed vocabulary. `dist/app.mjs` connects browser controls to these operations. Static hosting uses `dist/` and the Sites identity in `.openai/hosting.json`.

## Sharing

Completed bingos have a large prize reveal and navigation between wins. Share this bingo opens a PNG preview, image download, copyable caption, and native file sharing where supported. The exported model contains only the controlled prize name and board state, never pasted text or evidence.

## Personal Render deployment

`render.yaml` defines a static site serving only `dist/`, with `npm test` as the build check and automatic deployments disabled. No server, database, secrets, or paid compute plan is required. Before applying it, verify the authenticated account and personal workspace ID; never apply it in a work workspace. The saved CLI login expired during preparation, so no Render resource has been created. A Git source destination and the personal workspace still need to be confirmed.
