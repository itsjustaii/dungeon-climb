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
