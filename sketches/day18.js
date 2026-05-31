// Day 18 - LIGHTNING
// Prompt: Unexpected path.
// Tag: lightning

var sketch_18 = (p)=>{
// DAY 18: Lightning fractal - recursive branching electric discharge
let bolts=[];
let timer=0;
function branch(x1,y1,x2,y2,d,hue){
  if(d===0||Math.hypot(x2-x1,y2-y1)<4)return;
  let mx=(x1+x2)/2+(p.random()-.5)*p.map(d,0,8,2,30);
  let my=(y1+y2)/2+(p.random()-.5)*p.map(d,0,8,2,30);
  bolts.push({x1,y1,x2:mx,y2:my,d,hue});
  bolts.push({x1:mx,y1:my,x2,y2,d,hue});
  // random branch
  if(p.random()<0.45&&d>1){
    let branchLen=Math.hypot(x2-x1,y2-y1)*0.6;
    let angle=Math.atan2(y2-y1,x2-x1)+p.random(-1.0,1.0);
    branch(mx,my,mx+Math.cos(angle)*branchLen,my+Math.sin(angle)*branchLen,d-2,hue+15);
  }
  branch(x1,y1,mx,my,d-1,hue);
  branch(mx,my,x2,y2,d-1,hue);
}
function newBolt(){
  bolts=[];
  let sx=p.random(100,500),startHue=p.random()<0.5?270:185;
  branch(sx,0,sx+(p.random()-.5)*200,600,8,startHue);
}
p.setup=()=>{p.createCanvas(600,600);newBolt();};
p.draw=()=>{
  p.background(0,0,3,p.frameCount%30===0?80:30);
  p.colorMode(p.HSB,360,100,100,100);
  timer++;
  if(timer%35===0)newBolt();
  let age=timer%35;
  let fade=p.map(age,0,35,1,0);
  // draw lightning
  bolts.forEach(b=>{
    let alpha=p.map(b.d,0,8,20,90)*fade;
    // glow
    p.stroke(b.hue,60,100,alpha*0.25);p.strokeWeight(p.map(b.d,0,8,1,8));
    p.line(b.x1,b.y1,b.x2,b.y2);
    // core
    p.stroke(b.hue,80,100,alpha);p.strokeWeight(p.map(b.d,0,8,0.3,1.5));
    p.line(b.x1,b.y1,b.x2,b.y2);
    // hottest core - white
    if(b.d>5){p.stroke(0,0,100,alpha*0.7);p.strokeWeight(0.4);p.line(b.x1,b.y1,b.x2,b.y2);}
  });
  // impact glow
  if(age<6){
    p.noStroke();
    let bx=bolts.length>0?bolts[bolts.length-1].x2:300;
    let by=bolts.length>0?bolts[bolts.length-1].y2:600;
    for(let g=5;g>0;g--){p.fill(270,80,100,p.map(age,0,6,g*18,0));p.ellipse(bx,by,g*20,g*20);}
  }
};};
