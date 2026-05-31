// Day 25 - MERCURY DROPS
// Prompt: Organic Geometry.
// Tag: mercury

var sketch_25 = (p)=>{
// DAY 25: Mercury droplets - liquid metal spheres with reflections
let drops=[];
p.setup=()=>{
  p.createCanvas(600,600);
  for(let i=0;i<25;i++)drops.push({
    x:p.random(80,520),y:p.random(80,520),
    vx:(p.random()-.5)*1.2,vy:(p.random()-.5)*1.2,
    r:p.random(12,50),
    hue:p.random()<0.5?185:p.random()<0.5?270:48
  });
};
p.draw=()=>{
  p.background(0,0,5,20);
  p.colorMode(p.HSB,360,100,100,100);
  let t=p.frameCount*0.01;
  // move drops, merge when close
  drops.forEach(d=>{
    d.x+=d.vx;d.y+=d.vy;
    if(d.x<d.r){d.x=d.r;d.vx*=-1;}if(d.x>600-d.r){d.x=600-d.r;d.vx*=-1;}
    if(d.y<d.r){d.y=d.r;d.vy*=-1;}if(d.y>600-d.r){d.y=600-d.r;d.vy*=-1;}
  });
  // draw drops
  drops.forEach(d=>{
    let pulse=0.98+0.02*Math.sin(t*3+d.x*0.05);
    let r2=d.r*pulse;
    // shadow/ground reflection
    p.noStroke();p.fill(0,0,0,30);p.ellipse(d.x+4,d.y+4,r2*2,r2*2);
    // chrome base - dark metallic
    p.fill(220,30,35,95);p.ellipse(d.x,d.y,r2*2,r2*2);
    // mid tone
    p.fill(d.hue,50,75,80);p.ellipse(d.x,d.y,r2*2,r2*2);
    // bright specular highlight - upper left
    p.fill(0,0,100,75);p.ellipse(d.x-r2*0.3,d.y-r2*0.3,r2*0.7,r2*0.5);
    // secondary highlight
    p.fill(d.hue,40,100,50);p.ellipse(d.x+r2*0.2,d.y+r2*0.25,r2*0.35,r2*0.25);
    // neon rim light
    p.noFill();p.stroke(d.hue,90,100,45);p.strokeWeight(1.2);p.ellipse(d.x,d.y,r2*2,r2*2);
    p.stroke(d.hue,60,100,18);p.strokeWeight(5);p.ellipse(d.x,d.y,r2*2,r2*2);
    // meniscus edge
    p.stroke(0,0,100,30);p.strokeWeight(0.8);
    p.arc(d.x,d.y,r2*1.8,r2*1.8,p.PI*1.15,p.PI*1.85);
  });
  // floor reflection
  drops.forEach(d=>{
    p.noStroke();p.fill(d.hue,60,100,12);
    p.ellipse(d.x,d.y,d.r*2.5,d.r*0.5);
  });
};};
