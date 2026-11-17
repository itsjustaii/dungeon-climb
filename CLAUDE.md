# Dungeon Climb

Retro pixel endless climber (PICO-8 style palette). Game logic runs in a 144x256 world, drawn at 2x (288x512 canvas).
Single file: index.html, vanilla JS + Canvas, no dependencies. tools/botcheck.js is the fairness bot (loaded only with ?bot).
Live: https://itsjustaii.github.io/dungeon-climb
TODO.md tracks what's done and what's next. Design notes and fairness lessons: Obsidian vault, `Dungeon Climb/Design Learnings.md`.

## Gameplay
- Explorer runs out of a cave, lava pours in, he climbs automatically
- 3 vines (lanes), one swipe = one lane switch (multi-swipe was tried and rejected)
- ~10s slow warm-up, then speed ramps steeply (~95 at 1 min, cap 140); warnings shrink as you climb
- Vines come from hand-made sections that unlock by height; fragile (brown) pieces crumble 0.9s after grabbing
- Traps come from a shuffled deck: spike waves, fire jets, geysers, bats, coiled/dropping snakes, wall spikes, buzzsaws
- Orange gem trail follows the current safe lane (curves instead of jumping), 2 pts each
- Bait gems sit off the safe line: purple (6) on fragile vines or running up to a break, red (12) on the last stub
  before a break; more bait and more red the higher you climb; close calls also spawn a small bonus burst
- Gem chain: x2/x3/x4 gem points at 15/40/100 gems in a row; a hit or 2s without a gem breaks it
- Lava surge: a hit brings the lava to your heels for ~4s; a second hit in that time burns you
- Bait gems start at 260M, power-ups at 300M
- Power-ups all run on timers: shield 12s (absorbs one hit), rope 12s (saves one fall), magnet 8s (caught gems fly to you like a vacuum), double gems 10s,
  lava cooled 8s. Shield and rope trigger on their own, the timer makes them a window to take risks in
- Power-ups come one every 9-16s of climbing (14-24s felt too lonely) and come from a shuffled bag, never one that's still running.
  About 2 in 3 sit on a vine one lane off the gem trail, the rest float between the trail's vine and a neighbour
  and are grabbed by swiping across
- Gems are banked between runs (orange 1, purple 3, red 6) and spent in the shop: power-up upgrades (5 levels,
  +15% time each), boosts (starter shield, revive) and outfits (palette swaps of the explorer)
- Screens: title (TAP TO PLAY anywhere, SKINS | UPGRADES | settings cog), shop ('up': upgrades/boosts tabs, tap a row
  for info; 'skins': outfits), death (small HOME | big RETRY | small REVIVE for gems). All drawn on the canvas with btn()
  (rounded block buttons, shine sweep on menus) and panel() (stone frame). Logo is built once by makeLogo()
- Boosts in stock float up in bubbles for 5s when a run starts: pop shield to use it, pop revive to come back
  automatically on your first death. Unpopped ones stay in stock
- Intro stands ~1.2s before the jump (3.6s total). Deaths play out first (camera follows a fall into the lava,
  a burn sinks in smoke), then the panel drops in
- Swipe hint and lava warning show only on the very first run
- Pause: top-right button, 3-2-1 on resume, auto-pauses when the app is hidden; sound on/off and quit on the pause screen
- Score = height + gems + close call bonuses (CLOSE / DODGE / CLUTCH), combos

## Fairness rules (don't break these)
- Every height has a way through; two broken vines start together but end at different heights
- Every warning is a real attack: fairness is checked before the warning shows, and a showing warning reserves its lane
- Never aim at the lane the player just escaped to; never put fragile pieces on the only way through
- Bait gems are always optional: the vine under them is whole and a neighbouring vine stays open past the break
- Power-ups only go where the vines involved are whole and no trap is set up; between-vine ones need a safe landing,
  vine ones need the trail's vine next to them whole so you can swipe back
- After changing generation, traps, bait or power-ups, run the bot: open `index.html?bot` (served, e.g. `python3 -m http.server`),
  then `botCheck()` and `botCheck(100,150,true)` in the console. It must print PASS (see tools/botcheck.js for what it checks)

## Plan
- Next: friends playtest and tuning of the new stuff (power-up pacing, shop prices); then a vehicle moment, height zones, missions
- Wrap with Capacitor for Android, publish on Play Store first
- iOS later maybe (Apple fee is yearly)

## How I like to work
- I'm Aii, casual and direct, keep replies short
- One step at a time, check with me before big changes
- Test properly, then ask me before any commit or push
- After a push, give me the play link with `?v=N` so my phone skips the cache
- I'm on a Mac with Rider; Android Studio not installed yet
