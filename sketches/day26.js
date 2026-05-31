// Day 26 - FRACTAL TREE
// Prompt: Recursive Grids.
// Tag: l-system

var sketch_26 = (p)=>{
// DAY 26: Fractal tree - recursive L-system branching, neon glow
function branch(x,y,angle,len,d,hue){
  if(d===0||len<3)return;
  let x2=x+Math.cos(angle)*len;
  let y2=y+Math.sin(angle)*len;
  let alpha=p.map(d,0,10,20,90);
  let sw=p.map(d,0,10,0.4,2.2);
  // glow
  p.stroke(hue,60,100,alpha*0.25);p.strokeWeight(sw*4);p.line(x,y,x2,y2);
  // main branch
  p.stroke((hue+d*8)%360,85,100,alpha);p.strokeWeight(sw);p.line(x,y,x2,y2);
  // recurse
  let t=p.frameCount*0.008;
  let sway=Math.sin(t+d*0.5)*0.08;
  branch(x2,y2,angle-0.42+sway,len*0.72,d-1,hue+12);
  branch(x2,y2,angle+0.42+sway,len*0.72,d-1,hue-12);
  if(d>4)branch(x2,y2,angle+sway*0.5,len*0.55,d-2,(hue+60)%360);
  // leaf glow at tips
  if(d<3){
    p.noStroke();p.fill(hue,90,100,30);p.ellipse(x2,y2,6,6);
    p.fill(hue,60,100,12);p.ellipse(x2,y2,14,14);
  }
}
p.setup=()=>{p.createCanvas(600,600);};
p.draw=()=>{
  p.background(0,0,4,25);
  p.colorMode(p.HSB,360,100,100,100);
  let t=p.frameCount*0.006;
  branch(300,580,-p.HALF_PI,115,10,(t*20+185)%360);
  // ground glow
  p.noStroke();p.fill(185,60,100,15);p.ellipse(300,590,180,20);
};};
