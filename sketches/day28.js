// Day 28 - CRYSTAL CSS
// Prompt: No canvas, HTML only.
// Tag: css

var sketch_28 = (p)=>{
// DAY 28: CSS crystal growth - animated CSS only, no canvas
let shards=[];
p.setup=()=>{
  p.noCanvas();
  let sty=document.createElement('style');
  sty.textContent=`
    .cw{position:relative;width:600px;height:600px;background:#030508;overflow:hidden;}
    .shard{position:absolute;transform-origin:bottom center;clip-path:polygon(50% 0%,100% 100%,0% 100%);transition:height .4s ease,opacity .3s;}
    .shard-h{position:absolute;transform-origin:center;clip-path:polygon(50% 100%,100% 0%,0% 0%);transition:height .4s ease,opacity .3s;}
    .ring{position:absolute;border-radius:50%;border-style:solid;transform:translate(-50%,-50%);animation:cr-grow linear forwards;}
    @keyframes cr-grow{from{transform:translate(-50%,-50%) scale(0);opacity:.8}to{transform:translate(-50%,-50%) scale(1);opacity:0}}
    @keyframes cr-pulse{0%,100%{opacity:.4}50%{opacity:.9}}
    .node{position:absolute;border-radius:50%;transform:translate(-50%,-50%);animation:cr-pulse 2s ease-in-out infinite;}
    .bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,255,204,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,204,.03) 1px,transparent 1px);background-size:20px 20px;}
  `;
  document.head.appendChild(sty);
  let ctn=p.createDiv('');ctn.elt.className='cw';
  let grid=document.createElement('div');grid.className='bg-grid';ctn.elt.appendChild(grid);
  const HUES=['rgba(0,255,204','rgba(255,200,0','rgba(255,0,102','rgba(180,50,255','rgba(0,180,255'];
  // Seed nodes
  const seeds=[[300,300],[150,200],[450,180],[200,420],[400,380],[100,350],[500,250],[300,500]];
  seeds.forEach(([sx,sy],si)=>{
    let hue=HUES[si%HUES.length];
    let node=document.createElement('div');node.className='node';
    node.style.cssText=`left:${sx}px;top:${sy}px;width:8px;height:8px;background:${hue},.9);box-shadow:0 0 12px ${hue},.5);animation-delay:${si*0.3}s;`;
    ctn.elt.appendChild(node);
    // shard array around seed
    for(let a=0;a<6;a++){
      let angle=a/6*360;
      let shard=document.createElement('div');shard.className='shard';
      let h=20+Math.random()*120;
      let w=6+Math.random()*18;
      let dist=20+Math.random()*80;
      let cx=sx+Math.cos(angle*Math.PI/180)*dist;
      let cy=sy+Math.sin(angle*Math.PI/180)*dist;
      shard.style.cssText=`left:${cx}px;top:${cy}px;width:${w}px;height:${h}px;background:linear-gradient(${hue},0.7),${hue},0.1));box-shadow:0 0 6px ${hue},.3);transform:rotate(${angle}deg);animation:cr-pulse ${1.5+Math.random()}s ease-in-out infinite;animation-delay:${Math.random()*2}s;`;
      ctn.elt.appendChild(shard);
      shards.push({el:shard,baseH:h,phase:Math.random()*Math.PI*2});
    }
  });
  // Expanding rings
  function addRing(){
    let sx=seeds[Math.floor(Math.random()*seeds.length)];
    let ring=document.createElement('div');ring.className='ring';
    let hue=HUES[Math.floor(Math.random()*HUES.length)];
    let sz=40+Math.random()*200;
    ring.style.cssText=`left:${sx[0]}px;top:${sx[1]}px;width:${sz}px;height:${sz}px;border-width:1px;border-color:${hue},.6);animation-duration:${1.5+Math.random()*2}s;`;
    ctn.elt.appendChild(ring);
    setTimeout(()=>{try{ctn.elt.removeChild(ring);}catch(e){}},3000);
  }
  setInterval(addRing,400);
  let fr=0;
  setInterval(()=>{
    fr++;
    shards.forEach(s=>{
      let h=s.baseH*(0.7+0.3*Math.abs(Math.sin(fr*0.05+s.phase)));
      s.el.style.height=h+'px';
    });
  },50);
};
p.draw=()=>{};};
