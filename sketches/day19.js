// Day 19 - RULE 110
// Prompt: 16x16
// Tag: wolfram

var sketch_19 = (p)=>{
// DAY 19: Rule 110 automaton - Wolfram 1D CA evolving, vivid neon
const COLS=120,CELL=5;
let rows=[],rowColors=[];
const RULE=110;
function ruleApply(l,c,r){return (RULE>>(l*4+c*2+r))&1;}
p.setup=()=>{
  p.createCanvas(600,600);p.noStroke();p.colorMode(p.HSB,360,100,100,100);
  // seed
  let init=new Array(COLS).fill(0);init[Math.floor(COLS/2)]=1;
  rows=[init];rowColors=[[48,185,330,50,270]];
};
p.draw=()=>{
  // evolve one row per frame
  let prev=rows[rows.length-1];
  let next=new Array(COLS).fill(0);
  for(let i=0;i<COLS;i++){
    let l=prev[(i-1+COLS)%COLS],c=prev[i],r=prev[(i+1)%COLS];
    next[i]=ruleApply(l,c,r);
  }
  rows.push(next);
  let baseHue=(p.frameCount*1.5)%360;
  rowColors.push([baseHue,(baseHue+60)%360,(baseHue+120)%360,(baseHue+180)%360,(baseHue+240)%360]);
  if(rows.length>600/CELL+2){rows.shift();rowColors.shift();}
  // draw
  p.background(0,0,4);
  let startRow=Math.max(0,rows.length-(600/CELL));
  for(let ri=startRow;ri<rows.length;ri++){
    let screenY=(ri-startRow)*CELL;
    let hues=rowColors[ri]||[185];
    rows[ri].forEach((val,ci)=>{
      if(val){
        let hue=hues[ci%hues.length];
        let pulse=0.7+0.3*Math.sin(p.frameCount*0.08+(ci+ri)*0.2);
        p.fill(hue,88,95*pulse);
        p.rect(ci*CELL,screenY,CELL-1,CELL-1,1);
        // glow
        p.fill(hue,60,100,20);p.rect(ci*CELL-1,screenY-1,CELL+1,CELL+1,2);
      } else {
        p.fill(0,0,5);p.rect(ci*CELL,screenY,CELL,CELL);
      }
    });
  }
  // scan line
  let sl=(p.frameCount*2.2)%600;
  p.fill(185,80,100,15);p.rect(0,sl,600,3);
};};
