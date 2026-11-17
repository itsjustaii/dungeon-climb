# Dungeon Climb

Retro pixel endless climber (PICO-8 style palette). Game logic runs in a 144x256 world, drawn at 2x (288x512 canvas).
Single file: index.html, vanilla JS + Canvas, no dependencies.
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
- Bait gems start at 260M, power-ups at 300M (then one roughly every 17s, from a shuffled deck)
- Power-ups: shield (absorbs a hit) and rope (saves a fall) are held until used; magnet 8s, double gems 10s,
  lava cooled 8s run on timers. Half sit on a vine, half float between two vines and are grabbed by swiping across
- Pause: top-right button, 3-2-1 on resume, auto-pauses when the app is hidden
- Score = height + gems + close call bonuses (CLOSE / DODGE / CLUTCH), combos

## Fairness rules (don't break these)
- Every height has a way through; two broken vines start together but end at different heights
- Every warning is a real attack: fairness is checked before the warning shows, and a showing warning reserves its lane
- Never aim at the lane the player just escaped to; never put fragile pieces on the only way through
- Bait gems are always optional: the vine under them is whole and a neighbouring vine stays open past the break
- Power-ups only go where the vines involved are whole and no trap is set up; between-vine ones need a safe landing
- After changing generation or traps, run the in-browser bot checks (no-escape moments, fake warnings, trap droughts)

## Plan
- Next: friends playtest and tuning of the new stuff; then a vehicle moment, height zones, shop/missions
- Wrap with Capacitor for Android, publish on Play Store first
- iOS later maybe (Apple fee is yearly)

## How I like to work
- I'm Aii, casual and direct, keep replies short
- One step at a time, check with me before big changes
- Test properly, then ask me before any commit or push
- After a push, give me the play link with `?v=N` so my phone skips the cache
- I'm on a Mac with Rider; Android Studio not installed yet
