// Fairness bot for Dungeon Climb.
// How to run: open the game with ?bot in the address (e.g. index.html?bot), open the browser console and run
//   botCheck()            100 runs of 150s with a careful bot
//   botCheck(100,150,true) same, but the bot also chases bait gems and power-ups
// It plays by calling update() directly, so it finishes in a few seconds.
//
// What to look at (trust these more than the survival numbers, which are noisy):
//   wallRows          moments where all three vines are broken at your height       -> must be 0
//   bait.onGap/noVine/noExit   bait gems over a gap, with no whole vine under them,
//                     or with no open neighbouring vine at the break                -> must be 0
//   pup.vineBad/betweenBad/noLanding   power-ups over a gap or fragile vine, or
//                     between-vine ones with nowhere safe to land                   -> must be 0
//   pup.noReturn      vine power-ups (one lane off the gem trail) where the trail's
//                     vine next to them is broken, so there's no swiping back       -> must be 0
//   pup.dupe          picked up a power-up while the same one was still running     -> must be 0
//   pup.perMin / activePct   how many you're offered per minute and how much of the
//                     time (after the first one) something is running               -> pacing, not pass/fail
//   fellAfterRope     fell within 1s of a rope save (the save was wasted)           -> must be 0
//   popIn             bait or power-ups that appeared already on screen             -> must be 0
//   spikes            warnings shown vs spikes that actually fell (about 1% gap is
//                     normal: warnings still showing when a run ends)
//   maxQuiet          longest stretch with no trap after the first 15s              -> watch for droughts
window.botCheck=function(runs=100,secs=150,greedy=false){
  const res={greedy,runs,fall:0,burn:0,survived:0,hits:0,shieldSaves:0,ropeSaves:0,fellAfterRope:0,wallRows:0,popIn:0,maxQuiet:0,
    spikes:{warned:0,fired:0},
    bait:{gems:0,firstM:1e9,onGap:0,noVine:0,noExit:0},
    pup:{seen:0,got:0,between:0,gotBetween:0,firstM:1e9,vineBad:0,betweenBad:0,noLanding:0,noReturn:0,dupe:0,fellAfterBetween:0,perMin:0,activePct:0},
    avgHeightM:0,avgScore:0,avgSecs:0,x4Runs:0};
  // the bot's runs must not touch your real best score, hint counter, sound, gem bank or shop items
  // (it plays with no upgrades and no boosts, so results don't depend on what you've bought)
  const keep={best,hints,muted,save:JSON.stringify(save),ls:['lavaclimb_best','lavaclimb_hint','lavaclimb_save'].map(k=>{try{return [k,localStorage.getItem(k)]}catch(e){return [k,null]}})};
  muted=true;for(const k in save.up)save.up[k]=0;save.boost={shield:0,revive:0};
  let pupT=0,actT=0;
  const segAt=(l,a,b)=>segs.some(s=>s.lane===l&&s.y0<b&&s.y1>a);
  const gapAt=(l,a,b)=>segs.some(s=>s.lane===l&&s.type==='G'&&s.y0<b&&s.y1>a);
  for(let r=0;r<runs;r++){
    reset();state='intro';let n=0;while(state!=='play'&&n++<2000)update(1/60);
    let t=0,lastTrapT=0,mc=0,betweenT=-9,ropeT=-9;const seen=new WeakSet(),sp=new WeakMap(),allPups=[];
    while(state==='play'&&t<secs){
      const near=speed*.3+22;
      const gd=l=>{let d=1e9;for(const s of segs)if(s.lane===l&&isGap(s)&&s.y1>hands())d=Math.min(d,s.y0-hands());return d};
      const th=l=>laneThreat(l,p.y-6,p.y+near)||spikes.some(s=>s.lane===l&&((s.st==='warn'&&s.w<s.sw)||(s.st==='fall'&&s.y>p.y-4)));
      const Gd=[0,1,2].map(gd),Th=[0,1,2].map(th),c=p.lane,R2=speed*.55+12;let R=speed*.22+6;
      if([0,1,2].every(l=>gapAt(l,hands(),hands()+1)))res.wallRows++; // generated breaks only (crumbled fragile vines don't count)

      // audits: everything newly generated gets checked once
      for(const g of gems)if(g.bait&&!seen.has(g)){seen.add(g);const b=res.bait;b.gems++;b.firstM=Math.min(b.firstM,g.y/8);
        if(g.y<camY+H)res.popIn++;
        if(gapAt(g.lane,g.y-5,g.y+6))b.onGap++;
        const adjFree=(a,bb)=>[g.lane-1,g.lane+1].some(q=>q>=0&&q<=2&&!gapAt(q,a,bb));
        if(g.bait==='frag'){if(!adjFree(g.y-10,g.y+30))b.noExit++}
        else{const brk=segs.filter(s=>s.lane===g.lane&&s.type==='G'&&s.y0>g.y).sort((x,y)=>x.y0-y.y0)[0];
          if(!brk||segAt(g.lane,g.y-10,brk.y0))b.noVine++;else if(!adjFree(brk.y0-20,brk.y0+30))b.noExit++}}
      for(const u of pups)if(!seen.has(u)){seen.add(u);allPups.push(u);const q=res.pup;q.seen++;q.firstM=Math.min(q.firstM,u.y/8);
        if(u.y<camY+H)res.popIn++;
        if(u.between){q.between++;const rr=10+spAt(u.y)*.3;
          if(segAt(u.l0,u.y-30,u.y+12)||segAt(u.l0+1,u.y-30,u.y+12))q.betweenBad++;
          if(segAt(u.l0,u.y,u.y+rr)&&segAt(u.l0+1,u.y,u.y+rr))q.noLanding++}
        else{if(segAt(u.lane,u.y-15,u.y+25))q.vineBad++;if(gapAt(u.back,u.y-15,u.y+25))q.noReturn++}}

      // steering
      let moved=false;
      if(greedy&&!Th[c]&&Math.abs(p.x-LX[c])<3){
        const mine=gems.find(g=>g.bait&&!g.got&&g.lane===c&&g.y>hands()-6&&g.y-hands()<Gd[c]);
        if(mine)R=3; // ride the vine to the last moment for the bait on it
        const bu=pups.find(u=>u.between&&!u.got&&(u.l0===c||u.l0+1===c)&&u.y>p.y-4&&u.y<p.y+26);
        if(bu){const l=bu.l0===c?c+1:c-1;if(Gd[l]>speed*.3+16&&!Th[l]){move(l-c);moved=true;betweenT=t}}
        if(!moved&&Gd[c]>R2){
          const want=[...pups.filter(u=>!u.between&&!u.got).map(u=>({lane:u.lane,y:u.y,pad:20})),...gems.filter(g=>g.bait&&!g.got).map(g=>({lane:g.lane,y:g.y,pad:6}))]
            .find(o=>Math.abs(o.lane-c)===1&&o.y-hands()>10&&o.y-hands()<speed*.5+30&&Gd[o.lane]>o.y-hands()+o.pad&&!Th[o.lane]);
          if(want){move(want.lane-c);moved=true}
        }
      }
      if(!moved){
        const adj=[c-1,c+1].filter(l=>l>=0&&l<=2),far=c===0?2:c===2?0:-1;
        if(Gd[c]<R2){
          const ok=adj.filter(l=>Gd[l]>R2).sort((x,y)=>(Th[x]-Th[y])||(Gd[y]-Gd[x]));
          if(ok.length){if(Gd[c]<R)move(ok[0]-c)}
          else if(far>=0&&Gd[far]>R2&&Gd[1]>-4)move(1-c);
          else if(Gd[c]<R){const best=adj.sort((x,y)=>Gd[y]-Gd[x])[0];if(Gd[best]>Gd[c]&&Gd[best]>0)move(best-c)}
        }else if(Th[c]&&Math.abs(p.x-LX[c])<3){
          const ok=adj.filter(l=>!Th[l]&&Gd[l]>R2);
          if(ok.length)move(ok.sort((x,y)=>Gd[y]-Gd[x])[0]-c);
        }
      }

      const inv0=p.inv,run0=PUP_KINDS.filter(k=>pT[k]>0),got0=allPups.filter(u=>!u.got);update(1/60);t+=1/60;
      const sh=pops.some(q=>q.t===0&&q.s==='SHIELD BROKE'),ro=pops.some(q=>q.t===0&&q.s==='ROPE SAVE!');
      if(sh)res.shieldSaves++;
      if(ro){res.ropeSaves++;ropeT=t}
      if(p.inv>inv0+.4&&!sh&&!ro)res.hits++;
      for(const u of got0)if(u.got&&run0.includes(u.kind))res.pup.dupe++;
      if(p.y>=PUP_START){pupT+=1/60;if(PUP_KINDS.some(k=>pT[k]>0))actT+=1/60}
      mc=Math.max(mc,chain);
      for(const s of spikes){const st=sp.get(s)||{};if(s.st==='warn'&&s.w<s.sw&&!st.w){st.w=1;res.spikes.warned++}if(s.st==='fall'&&!st.f){st.f=1;res.spikes.fired++}sp.set(s,st)}
      const active=traps.some(o=>o.st!=='wait')||spikes.some(s=>s.st==='fall'||s.w<s.sw)||jets.some(j=>j.st==='warn'||j.st==='fire');
      if(active)lastTrapT=t;else if(t>15)res.maxQuiet=Math.max(res.maxQuiet,t-lastTrapT);
    }
    if(state==='dead'){res[deathKind]++;if(deathKind==='fall'&&t-betweenT<1)res.pup.fellAfterBetween++;if(deathKind==='fall'&&t-ropeT<1)res.fellAfterRope++}else res.survived++;
    for(const u of allPups)if(u.got){res.pup.got++;if(u.between)res.pup.gotBetween++}
    res.avgHeightM+=height()/runs;res.avgScore+=score()/runs;res.avgSecs+=t/runs;if(mc>=100)res.x4Runs++;
  }
  for(const k of ['avgHeightM','avgScore','avgSecs'])res[k]=Math.round(res[k]);
  res.maxQuiet=+res.maxQuiet.toFixed(1);res.bait.firstM=Math.round(res.bait.firstM);res.pup.firstM=Math.round(res.pup.firstM);
  res.pup.perMin=+(res.pup.seen/Math.max(1,pupT)*60).toFixed(1);res.pup.activePct=Math.round(actT/Math.max(1,pupT)*100);
  const bad=res.fellAfterRope+res.wallRows+res.popIn+res.bait.onGap+res.bait.noVine+res.bait.noExit+res.pup.vineBad+res.pup.betweenBad+res.pup.noLanding+res.pup.noReturn+res.pup.dupe;
  res.verdict=bad?'FAIL: '+bad+' fairness problems':'PASS: no fairness problems found';
  reset();state='title';best=keep.best;hints=keep.hints;muted=keep.muted;save=JSON.parse(keep.save);
  for(const [k,v] of keep.ls)try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}
  console.log(res.verdict);console.log(JSON.stringify(res,null,1));
  return res;
};
console.log('botCheck ready: run botCheck() or botCheck(100,150,true)');
