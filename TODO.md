# Dungeon Climb TODO

Add, remove or reorder anything. Check items off with [x].

## Bugs
- [x] Death screen score/height keep dropping during the fall animation (shows SCORE 150 / 0M but NEW BEST 289)
- [ ] Game doesn't pause when the app is backgrounded (you die if you switch apps)

## Gameplay
- [x] Darts were near impossible to dodge: replaced with wall fire jets (vent glows, then fire covers 1-2 lanes from that side; dodge by switching lanes)
- [x] Redo vine generator: always a safe lane, fragile vines short enough to climb past, gaps don't stack weirdly
- [x] Hand-made sections (Subway Surfers style) instead of random rows; fragile bridges and jump-offs
- [x] Speed keeps ramping for ~3 minutes, then levels off
- [x] Hits could knock you back into a gap you just passed (unfair death)
- [x] Faster (Jetpack Joyride feel), fragile bridges removed
- [x] Spike waves: single and double-lane drops in sequence
- [x] New traps: lava geyser, bats (red ones swerve), swinging buzzsaw, wall spikes, snake
- [x] Staircase section was too tight at high speed (~0.13s to switch)
- [x] Much faster (60 -> 140) with speed streaks; denser, less predictable vine sections
- [x] Fragile vines mixed into layouts, crumble 0.9s after grab (jump-off section removed)
- [x] Bats swoop diagonally in waves; coiled striking snake + dropping snake
- [x] Trap deck: every trap type comes up regularly, new ones introduced one at a time
- [x] Core feel pass (Subway Surfers / Jetpack Joyride research): slow 10s warm-up then steep ramp, chunk tiers,
      warnings shrink as you climb, multi-swipe in one drag
- [x] Traps evolve into patterns: geyser sweep/squeeze/double, twin saws, spike stairs, crossing bats
- [x] Traps check each other so they never stack into a no-escape spot; fragile never on your only way through

- [x] Friend feedback: multi-swipe removed; two-vine breaks never stop at the same height;
      traps don't chase you into the lane you just escaped to; spikes fall a bit slower

## Next (after core feels right)
- [ ] Gem trails along the safe lines (reward + guide, like coins)
- [ ] Shield charm (one free hit/fall), then rope/grapple, magnet, x2
- [ ] A "vehicle" moment (mine cart / bat ride)
- [ ] Height zones with new scenery (dungeon -> crystal mine -> lava forge -> frozen depths)
- [ ] Before launch: gem shop, outfits, gadgets, missions + ranks, end-of-run spin, daily reward
- [ ] Playtest difficulty curve on a real phone (gaps/jets/spikes frequency)

## Feel / UX
- [ ] Death screen hard to read over lava (add a solid box behind the text)
- [ ] Pause button
- [ ] Mute button
- [ ] Lava meter on the left needs an icon or label
- [ ] Music

## Models (sprites)
- [x] Raise game resolution (2x, 288x512) so everything gets finer, still retro pixel art
- [x] Explorer: more detailed, outlined, 1.5x bigger
- [x] Explorer: real running animation in the intro
- [x] Explorer: proper climbing animation (hand over hand, not just a flip)
- [x] Explorer: hit pose and fall pose
- [x] Bricks, pillars, vines, lava, spikes redrawn at 2x detail
- [ ] Fragile vine: still could be easier to tell apart from normal vines
- [ ] Title text and HUD font still the old chunky style
- [ ] Cave entrance and lava pipe at the start still old style

## Android (Capacitor)
- [ ] Install Android Studio
- [ ] Wrap game with Capacitor
- [ ] Safe areas (notch / status bar)
- [ ] Haptics on hit / close calls
- [ ] Play Store listing (icon, screenshots, description)

## Ideas
- 
