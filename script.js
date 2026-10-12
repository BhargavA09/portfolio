/* ═══════════════ bhargav.dev — interactions ═══════════════ */
(function(){
"use strict";

/* ── 1. Hero candlestick canvas ── */
const cv = document.getElementById('candles');
if (cv) {
  const ctx = cv.getContext('2d');
  const GREEN = '#00e5a0', RED = '#ff5d6c';
  let W, H, candles = [], price = 100, t = 0;

  function resize(){
    const r = cv.parentElement.getBoundingClientRect();
    W = cv.width = r.width * devicePixelRatio;
    H = cv.height = r.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    W = r.width; H = r.height;
  }
  resize(); addEventListener('resize', resize);

  const CW = 14, GAP = 10; // candle width / gap in css px
  function newCandle(){
    const drift = (Math.random()-0.48) * 6;
    const open = price;
    const close = open + drift;
    const high = Math.max(open,close) + Math.random()*4;
    const low  = Math.min(open,close) - Math.random()*4;
    price = close;
    return {open, close, high, low, born: performance.now()};
  }
  // seed history
  let x = W;
  while (x > -50) { candles.push(newCandle()); x -= (CW+GAP); }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = performance.now();

  function frame(now){
    const dt = Math.min(64, now - last); last = now;
    if (!reduceMotion) {
      t += dt;
      // scroll candles left slowly
      const speed = 0.028 * dt;
      candles.forEach(c => c.x = (c.x ?? 0) - speed);
      if (t > 900) { t = 0; candles.push(newCandle()); }
      if (candles.length && candles[0].x < -60) candles.shift();
    }
    ctx.clearRect(0,0,W,H);
    const mid = H * 0.62, scale = 3.2;
    const n = candles.length;
    candles.forEach((c,i) => {
      const cx = (c.x ?? (W - (n-1-i)*(CW+GAP)));
      c.x = cx;
      const up = c.close >= c.open;
      const col = up ? GREEN : RED;
      const yo = mid - (c.open-100)*scale, yc = mid - (c.close-100)*scale;
      const yh = mid - (c.high-100)*scale, yl = mid - (c.low-100)*scale;
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = col; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx+CW/2, yh); ctx.lineTo(cx+CW/2, yl); ctx.stroke();
      ctx.fillStyle = col;
      const top = Math.min(yo,yc), hgt = Math.max(2, Math.abs(yc-yo));
      ctx.globalAlpha = up ? 0.75 : 0.45;
      ctx.fillRect(cx, top, CW, hgt);
    });
    // faint price line
    ctx.globalAlpha = 0.18; ctx.strokeStyle = GREEN; ctx.setLineDash([6,8]); ctx.lineWidth = 1;
    const ly = mid - (price-100)*scale;
    ctx.beginPath(); ctx.moveTo(0,ly); ctx.lineTo(W,ly); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    if (!document.hidden) requestAnimationFrame(frame);
  }
  // assign x positions for seeded candles
  candles.forEach((c,i)=>{ c.x = W - (candles.length-1-i)*(CW+GAP); });
  requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden){ last = performance.now(); requestAnimationFrame(frame);} });
}

/* ── 2. Typing effect ── */
const roles = [
  'Full-Stack Software Engineer',
  'React · Node.js · TypeScript · C#',
  'I build systems that stay up.'
];
const typedEl = document.getElementById('typed');
if (typedEl && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ri = 0, ci = 0, del = false;
  (function tick(){
    const word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    let wait = del ? 34 : 62;
    if (!del && ci === word.length) { wait = 1700; del = true; }
    else if (del && ci === 0) { del = false; ri = (ri+1) % roles.length; wait = 350; }
    ci += del ? -1 : 1;
    setTimeout(tick, wait);
  })();
} else if (typedEl) { typedEl.textContent = roles[0]; }

/* ── 3. Ticker duplication (seamless loop) ── */
const track = document.getElementById('tickerTrack');
if (track) track.innerHTML += track.innerHTML;

/* ── 4. Scroll reveal ── */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── 5. Animated stat counters ── */
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  cio.unobserve(e.target);
  const el = e.target, target = parseFloat(el.dataset.count),
        dec = parseInt(el.dataset.decimals || 0), suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1400;
  (function step(now){
    const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1-p, 3);
    el.textContent = (target * ease).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}), {threshold: 0.5});
document.querySelectorAll('.stat-num').forEach(el => cio.observe(el));

/* ── 6. Nav active state + mobile menu ── */
const navLinks = document.querySelectorAll('.nav-links a[data-sec]');
const secs = [...navLinks].map(a => document.getElementById(a.dataset.sec)).filter(Boolean);
const nio = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.id));
  }
}), {rootMargin: '-40% 0px -55% 0px'});
secs.forEach(s => nio.observe(s));

const menuBtn = document.getElementById('menuBtn'), navBox = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navBox.classList.toggle('open'));
navBox.addEventListener('click', e => { if (e.target.tagName === 'A') navBox.classList.remove('open'); });

/* ── 7. Mini candlestick strip inside QuantLab card ── */
const mini = document.getElementById('miniChart');
if (mini) {
  const m = document.createElement('canvas');
  m.style.cssText = 'width:100%;height:100%';
  mini.appendChild(m);
  const mc = m.getContext('2d');
  let MW, MH;
  function msize(){
    const r = mini.getBoundingClientRect();
    MW = m.width = r.width * devicePixelRatio; MH = m.height = r.height * devicePixelRatio;
    mc.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); MW = r.width; MH = r.height;
  }
  msize(); addEventListener('resize', msize);
  const data = []; let p = 50;
  for (let i=0;i<48;i++){ const o=p; p=o+(Math.random()-0.46)*5;
    data.push({o, c:p, h:Math.max(o,p)+Math.random()*3, l:Math.min(o,p)-Math.random()*3}); }
  function draw(){
    mc.clearRect(0,0,MW,MH);
    const cw = MW/data.length, mid = MH*0.55, sc = 2.4;
    data.forEach((d,i)=>{
      const up = d.c>=d.o, col = up?'#00e5a0':'#ff5d6c';
      const x = i*cw + cw*0.22, w = cw*0.56;
      mc.strokeStyle=col; mc.globalAlpha=.7; mc.lineWidth=1;
      mc.beginPath(); mc.moveTo(x+w/2, mid-(d.h-50)*sc); mc.lineTo(x+w/2, mid-(d.l-50)*sc); mc.stroke();
      mc.globalAlpha = up?.85:.5; mc.fillStyle=col;
      const yTop = mid - (Math.max(d.o,d.c)-50)*sc;
      const hgt = Math.max(2, Math.abs(d.c-d.o)*sc);
      mc.fillRect(x, yTop, w, hgt);
    });
    // glow grid
    mc.globalAlpha=.08; mc.strokeStyle='#38e1ff'; mc.lineWidth=1;
    for(let y=0;y<MH;y+=36){ mc.beginPath(); mc.moveTo(0,y); mc.lineTo(MW,y); mc.stroke(); }
    mc.globalAlpha=1;
  }
  draw();
  // subtle live drift every 2s
  setInterval(()=>{
    const lastD = data[data.length-1]; const o = lastD.c;
    const c = o + (Math.random()-0.47)*4;
    data.push({o, c, h:Math.max(o,c)+Math.random()*2.5, l:Math.min(o,c)-Math.random()*2.5});
    data.shift(); draw();
  }, 2000);
}
})();
