# Avatar · Element Quest

A complete multi-file English movie-night game for episode one of the 2005 animated series. The seven activity/guide routes and home screen share reusable game components. Content lives separately from presentation.

## Run locally

## GitHub Pages

The Pages build uses the same game components and artwork in a standalone browser application. Run `npm run build:pages`, then `node scripts/check-pages.mjs`. Output is in `dist-pages/`; each activity has its own directory entry point so direct links and refresh work without a server. `PAGES_BASE_PATH` selects the repository URL prefix (default `/avatar-element-quest/`).

The `.github/workflows/pages.yml` workflow builds and publishes automatically on pushes to `main`. Select **GitHub Actions** in the repository's **Settings → Pages**. The original Sites build remains available through `npm run build`.

## Local Sites development

Use Node 22.13+ and npm. Run `npm install`, then `npm run dev`. Open the address printed by the server (normally http://localhost:3000).

Run `npm run build` for the production build. Run `node scripts/check-game.mjs` for scoring/content checks and `node node_modules/typescript/bin/tsc --noEmit` for type checking.

## Project structure

- `app/`: eight routes, root layout, theme and activity styles.
- `components/game/`: shared shell, activities, quiz, score rules, teacher guide and optional WebMCP integration.
- `components/ui/`: installed accessible UI primitives.
- `data/content.ts`: both levels, characters, nations, vocabulary, sentence practice and 24 quiz questions.
- `public/assets/`: local images; no image service is required at play time.
- `docs/`: design, sources and image-generation prompts.
- `scripts/check-game.mjs`: meaningful score and content integrity checks.

## Classroom use

Explorer uses beginner supports; Challenger adds reading, detail and explanation. Use Teacher guide in the game for the lesson sequence and adaptations. Nation names and specialist words are explicitly taught language chunks. Level labels are instructional estimates, not test certification.

The movie itself is not bundled. Open a local video file in Movie time or use your usual viewing service. A selected video uses a browser object URL and is never uploaded. Browser text-to-speech uses available English voices and falls back to teacher reading. Internet is needed for initial hosted access; an offline service worker is not included.

Progress and separate quiz scores use localStorage on the current browser/device. There are no student accounts. Next-stop completion means visited, not assessed mastery. Spoken answers are teacher-led and are not automatically evaluated.

Location and character illustrations were made with the built-in image generation tool; prompt manifests are in docs. The supplied source map and vocabulary illustrations are retained with corrected English teaching labels and contextual notes. See the in-app teacher guide for sources and ownership notes.

## Explorer adventure

The /rescue route is Appa's Rescue Flight: a playable snowy-shore scene with sliced character frames, water rescue animation, free flight controls, ordered sentence collection and delivery. Explorer's word section leads into the adventure. Speech is encouraged with teacher confirmation, never automatically scored. There is no timer or failure penalty. Use arrow keys, on-screen controls, or tap destinations. Pause and restart are available. Run node scripts/check-rescue.mjs for game-state checks. Artwork prompts are in docs/rescue-image-prompts.json; original sheets and sliced frames are in public/assets/rescue.
