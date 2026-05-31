// Day 29 - FLUID VORTEX
// Prompt: Genetic evolution.
// Tag: simulation

var sketch_29 = (p)=>{
// DAY 29: Fluid vortex - swirling water simulation with particles
let particles=[];
p.setup=()=>{
  p.createCanvas(600,600);
  for(let i=0;i<600;i++)particles.push({
    x:p.random(600),y:p.random(600),
    vx:0,vy:0,hue:p.random()<0.5?185:p.random()<0.4?270:48,
    trail:[]
  });
};
p.draw=()=>{
  p.background(0,0,4,15);
  p.colorMode(p.HSB,360,100,100,100);
  let t=p.frameCount*0.008;
  // double vortex field
  particles.forEach(pt=>{
    // primary vortex center
    let dx1=pt.x-300,dy1=pt.y-300;
    let d1=Math.sqrt(dx1*dx1+dy1*dy1)+1;
    let str1=180/(d1+50);
    // secondary counter-vortex
    let cx2=300+Math.cos(t*0.3)*120,cy2=300+Math.sin(t*0.3)*120;
    let dx2=pt.x-cx2,dy2=pt.y-cy2;
    let d2=Math.sqrt(dx2*dx2+dy2*dy2)+1;
    let str2=80/(d2+40);
    // velocity: perpendicular to radius + slight inward spiral
    let vx=(-dy1/d1*str1+(-dy2/d2)*str2-dx1/d1*0.3);
    let vy=(dx1/d1*str1+(dx2/d2)*str2-dy1/d1*0.3);
    pt.vx=pt.vx*0.85+vx*0.4;
    pt.vy=pt.vy*0.85+vy*0.4;
    pt.x+=pt.vx;pt.y+=pt.vy;
    // wrap
    if(pt.x<0)pt.x=600;if(pt.x>600)pt.x=0;
    if(pt.y<0)pt.y=600;if(pt.y>600)pt.y=0;
    pt.trail.push({x:pt.x,y:pt.y});if(pt.trail.length>14)pt.trail.shift();
    // draw trail
    pt.trail.forEach((tr,i)=>{
      p.noStroke();
      let spd=Math.sqrt(pt.vx*pt.vx+pt.vy*pt.vy);
      let alpha=p.map(i,0,pt.trail.length,0,p.map(spd,0,8,20,55));
      p.fill(pt.hue,85,100,alpha);p.ellipse(tr.x,tr.y,2,2);
    });
    p.noStroke();p.fill(pt.hue,90,100,60);p.ellipse(pt.x,pt.y,2.5,2.5);
  });
  // vortex eye glow
  for(let g=5;g>0;g--){p.noStroke();p.fill(185,70,100,g*5);p.ellipse(300,300,g*12,g*12);}
};};
