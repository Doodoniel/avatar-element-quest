# Validation

Production build, TypeScript checks and score/content integrity checks passed. Checks cover both levels, totals, duplicate prevention, turn rotation, invalid input, persistence recovery and asset references.

The first hosted build had a production-only vinext Link navigation failure: the browser displayed the home screen but clicking a section threw a client routing error. All game navigation now uses native HTML anchors. The routes remain separate pages and local progress remains stored on this device.

The corrected production Worker build was tested through the browser: home to heroes, level switching, next-stop navigation, map selection, vocabulary reveal, quiz question opening, correct-answer feedback, 100-point award and team rotation, independent quiz levels, sentence building, and movie-time route. Every route also returned HTTP 200. Video playback and installed text-to-speech voices require the user's media/device and were not asserted.

Generated art was visually inspected. Optional WebMCP runtime registration remains outside this regression check. The visible UI works without it.
