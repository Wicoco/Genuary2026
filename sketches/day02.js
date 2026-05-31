// Day 02 - ORBITAL SYSTEM
// Prompt: Twelve principles of animation.
// Tag: orbit

var sketch_02 = (p)=>{
// DAY 2: Orbital mechanics - bodies orbiting with gravita
let bodies=[];
const G=0.5;
p.setup=()=>{
  p.createCanvas(600,600);
  bodies=[
    {x:300,y:300,vx:0,vy:0,mass:4000,r:18,hue:50,fixed:true},
    {x:460,y:300,vx:0,vy:2.1,mass:40,r:7,hue:185,trail:[]},
    {x:220,y:300,vx:0,vy:-2.8,mass:25,r:5,hue:330,trail:[]},
    {x:510,y:300,vx:0,vy:1.6,mass:15,r:4,hue:48,trail:[]},
    {x:160,y:300,vx:0,vy:-3.5,mass:10,r:3,hue:270,trail:[]}
  ];
};
p.draw=()=>{
  p.background(0,0,4,20);
  p.colorMode(p.HSB,360,100,100,100);
  // integrate
  for(let i=1;i<bodies.length;i++){
    let b=bodies[i];
    // gravity from star
    let dx=bodies[0].x-b.x,dy=bodies[0].y-b.y;
    let d=Math.sqrt(dx*dx+dy*dy)+0.1;
    let f=G*bodies[0].mass/(d*d);
    b.vx+=dx/d*f;b.vy+=dy/d*f;
    b.x+=b.vx;b.y+=b.vy;
    b.trail.push({x:b.x,y:b.y});
    if(b.trail.length>220)b.trail.shift();
    // wrap
    if(b.x<0||b.x>600||b.y<0||b.y>600){b.trail=[];b.x=b.x<0?600:b.x>600?0:b.x;b.y=b.y<0?600:b.y>600?0:b.y;}
  }
  // draw trails
  bodies.slice(1).forEach(b=>{
    b.trail.forEach((pt,i)=>{
      let alpha=p.map(i,0,b.trail.length,0,55);
      p.noStroke();p.fill(b.hue,85,100,alpha);p.ellipse(pt.x,pt.y,2.5,2.5);
    });
    // glow trail tip
    p.fill(b.hue,60,100,25);p.ellipse(b.x,b.y,b.r*3,b.r*3);
    p.fill(b.hue,90,100,90);p.ellipse(b.x,b.y,b.r*2,b.r*2);
  });
  // draw star
  let t=p.frameCount;
  for(let g=8;g>0;g--){p.noStroke();p.fill(50,90,100,g*7);p.ellipse(300,300,g*12,g*12);}
  p.fill(50,100,100,100);p.ellipse(300,300,36,36);
  // corona rays
  p.noFill();
  for(let i=0;i<12;i++){
    let a=i/12*p.TWO_PI+t*0.01;
    let r1=20,r2=28+Math.sin(t*0.1+i)*6;
    p.stroke(48,80,100,40);p.strokeWeight(1);
    p.line(300+r1*Math.cos(a),300+r1*Math.sin(a),300+r2*Math.cos(a),300+r2*Math.sin(a));
  }
};};
