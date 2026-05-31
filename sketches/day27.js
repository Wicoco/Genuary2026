// Day 27 - SUPERNOVA
// Prompt: Lifeform.
// Tag: explosion

var sketch_27 = (p)=>{
// DAY 27: Supernova - expanding shockwave, nebula formati
let shockwave=0,debris=[],nebula=[];
let exploded=false,timer2=0;
p.setup=()=>{
  p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);
  // debris particles
  for(let i=0;i<200;i++)debris.push({
    a:p.random(p.TWO_PI),spd:p.random(0.5,4.5),
    r:0,size:p.random(1.5,6),hue:p.random()<0.4?48:p.random()<0.5?185:330,
    trail:[]
  });
  // nebula wisps
  for(let i=0;i<80;i++)nebula.push({
    a:p.random(p.TWO_PI),r:p.random(20,180),
    hue:p.random()<0.4?270:p.random()<0.5?185:330,
    size:p.random(8,35),opacity:0
  });
};
p.draw=()=>{
  p.background(0,0,4,18);p.translate(300,300);
  let t=p.frameCount;
  timer2++;
  if(timer2>180){timer2=0;shockwave=0;debris.forEach(d=>{d.r=0;d.trail=[];});}
  // collapse phase (before explosion)
  if(timer2<30){
    let compress=p.map(timer2,0,30,80,8);
    for(let g=6;g>0;g--){p.noStroke();p.fill(50,90,100,g*8);p.ellipse(0,0,(compress+g*5)*2,(compress+g*5)*2);}
    p.noStroke();p.fill(50,100,100,100);p.ellipse(0,0,compress*2,compress*2);
    return;
  }
  // explosion
  let age=timer2-30;
  shockwave=Math.min(age*3.5,350);
  // shockwave ring
  if(shockwave<350){
    [12,7,4,1.5].forEach((sw,li)=>{
      p.stroke(48+li*12,90,100,[10,18,35,80][li]);p.strokeWeight(sw);p.noFill();
      p.ellipse(0,0,shockwave*2,shockwave*2);
    });
  }
  // nebula gas
  nebula.forEach(n=>{
    n.opacity=Math.min(1,age*0.015);
    let nx=n.r*Math.cos(n.a),ny=n.r*Math.sin(n.a);
    p.noStroke();p.fill(n.hue,60,100,n.opacity*25);p.ellipse(nx,ny,n.size*2,n.size*2);
    p.fill(n.hue,40,100,n.opacity*10);p.ellipse(nx,ny,n.size*3.5,n.size*3.5);
  });
  // debris
  debris.forEach(d=>{
    d.r+=d.spd*(1-d.r/400);
    let x=d.r*Math.cos(d.a),y=d.r*Math.sin(d.a);
    d.trail.push({x,y});if(d.trail.length>12)d.trail.shift();
    d.trail.forEach((pt,i)=>{
      p.noStroke();p.fill(d.hue,85,100,p.map(i,0,d.trail.length,0,50));
      p.ellipse(pt.x,pt.y,d.size*0.5,d.size*0.5);
    });
    p.fill(d.hue,90,100,75);p.ellipse(x,y,d.size,d.size);
  });
  // remnant core
  let coreSize=p.map(age,0,150,80,8);
  for(let g=5;g>0;g--){p.noStroke();p.fill(185,80,100,g*5);p.ellipse(0,0,(coreSize+g*4)*2,(coreSize+g*4)*2);}
  p.fill(0,0,100,90);p.ellipse(0,0,coreSize*2,coreSize*2);
};};
