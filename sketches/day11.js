// Day 11 - CODE RAIN
// Prompt: Quine.
// Tag: matrix

var sketch_11 = (p)=>{
const CODE='(p)=>setup=()=>createCanvas(600,600);const COLS=55;drops=[];for(i=0;i<COLS;i++)drops.push(-Math.floor(Math.random()*60));draw=()=>{background(0,0,10,55);drops.forEach((d,i)=>{let char=CODE[Math.floor(Math.random()*CODE.length)];fill(0,255,110,220);text(char,i*11,d*11);for(let k=1;k<10;k++){fill(0,185,75,(10-k)*17);text(CODE[Math.floor(Math.random()*CODE.length)],i*11,(d-k)*11);}if(d*11>600&&Math.random()>0.975)drops[i]=0;drops[i]++;});}';
const COLS=55;
let drops=[];
p.setup=()=>{
  p.createCanvas(600,600);p.textFont('monospace');p.textSize(10);
  for(let i=0;i<COLS;i++)drops.push(Math.floor(p.random(-60,0)));
};
p.draw=()=>{
  p.background(0,0,10,55);
  drops.forEach((d,i)=>{
    let char=CODE[Math.floor(p.random(CODE.length))];
    p.fill(0,255,110,220);p.noStroke();p.text(char,i*11,d*11);
    for(let k=1;k<10;k++){p.fill(0,185,75,(10-k)*17);p.text(CODE[Math.floor(p.random(CODE.length))],i*11,(d-k)*11);}
    if(d*11>600&&p.random()>0.975)drops[i]=0;
    drops[i]++;
  });
};};
