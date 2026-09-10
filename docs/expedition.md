# The South Pole Expedition

Explorer extension at /expedition. Four mechanics, three rounds each. This is an imagined side adventure, not a retelling of episode events.

1. Ice crossing: navigate adjacent floes, open a missing bridge, collect supplies and return. Three layouts; bridge is necessary in each.
2. Current rescue: move the aiming line, identify the requested cargo among distractors and time the catch. Three successful catches per round.
3. Appa flight: vertical steering with arrows, touch or buttons; scrolling cargo and wind hazards; three requested items per round. The route repeats if cargo was missed.
4. Village deliveries: listen to three characters, select or drag cargo to the matching recipient. Three sets of requests.

Each round rotates pilot, navigator and speaker. With 12 rounds there are 36 role slots, covering class sizes supported by the selector. For more speaking, invite partners to echo or give the next direction. Do not require the pilot to speak and operate simultaneously. The teacher confirms the short reflection before swapping players; speech is not automatically assessed. Use the sentence-support toggle to fade scaffolding. Gentle pace changes physical speed, not the language level. Challenge score never removes a learner.

This extension rehearses directions, everyday cargo vocabulary, can, have got and requests. It complements the existing character and nation activities and the separate two-level final quiz; it does not replace them. No CEFR certification or formal learning-outcome claim is made.

Progress is currently held for the open page only. Restart and leaving the page reset the expedition. Missions can be selected directly from the opening scene for a shorter class session.

Animation update: eight generated jump poses travel along a timed arc, with a shared feet baseline, breathing at rest, facing direction, carried cargo and a ground shadow. Movement commits only after landing. Eight generated water frames emerge from a sea ripple, raise cargo and carry it ashore; rewards commit after the animation. Both action clocks stop on pause or restart confirmation. OS reduced-motion shortens jumping and removes the arc and idle sway. Browser checks observed mid-jump poses, water emergence and disabled recasting during the effect. Automated motion checks cover the arc, endpoints, facing, frame bounds, delivery path and assets.
Jump playback fix: trajectory and eight-frame atlas now share a browser CSS timeline. Landing commits on the trajectory animation end, rather than the React scene clock. This prevents pose switching from depending on repeated image updates. Verified visible anticipation frames, successive landings and pause UI in the browser.
Landing/bridge fix: idle and jump use the same atlas viewport; a more-specific rule prevents generic grid label styles from shortening the jump frame. Feet anchors account for grid gaps, contained floe size and transparent foot padding, recalculated by ResizeObserver. Bridge construction plays a 2.4-second water atlas and ice reveal before enabling the crossing. Browser screenshots verified a visible emerging fountain and resting feet on the upper floe surface.
