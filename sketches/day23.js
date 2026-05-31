// Day 23 - TRANSPARENCY
// Prompt: Transparency.
// Tag: opacity

var sketch_23 = (p)=>{let blobs=[];p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);for(let i=0;i<8;i++)blobs.push({x:p.random(600),y:p.random(600),vx:p.random(-1.2,1.2),vy:p.random(-1.2,1.2),r:p.random(70,160),h:p.random(360),rS:p.random(-0.3,0.3)});};p.draw=()=>{p.background(0,0,7,22);p.noStroke();blobs.forEach(b=>{b.x+=b.vx;b.y+=b.vy;if(b.x<-b.r||b.x>600+b.r)b.vx*=-1;if(b.y<-b.r||b.y>600+b.r)b.vy*=-1;b.h=(b.h+0.15)%360;b.r+=Math.sin(p.frameCount*0.03)*b.rS;p.fill(b.h,55,90,22);p.ellipse(b.x,b.y,b.r*2,b.r*2);p.fill(b.h,30,100,15);p.ellipse(b.x-b.r*0.2,b.y-b.r*0.2,b.r,b.r);});};};
