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
- Score = height + close call bonuses (CLOSE / DODGE / CLUTCH), combos

## Fairness rules (don't break these)
- Every height has a way through; two broken vines start together but end at different heights
- Every warning is a real attack: fairness is checked before the warning shows, and a showing warning reserves its lane
- Never aim at the lane the player just escaped to; never put fragile pieces on the only way through
- After changing generation or traps, run the in-browser bot checks (no-escape moments, fake warnings, trap droughts)

## Plan
- Next: gems along safe lines, shield charm and power-ups; then a vehicle moment, height zones, shop/missions
- Wrap with Capacitor for Android, publish on Play Store first
- iOS later maybe (Apple fee is yearly)

## How I like to work
- I'm Aii, casual and direct, keep replies short
- One step at a time, check with me before big changes
- Test properly, then ask me before any commit or push
- After a push, give me the play link with `?v=N` so my phone skips the cache
- I'm on a Mac with Rider; Android Studio not installed yet
