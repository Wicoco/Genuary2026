// Day 20 - LISSAJOUS
// Prompt: One line.
// Tag: lissajous

var sketch_20 = (p)=>{p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};p.draw=()=>{p.background(0,0,7,10);p.noFill();p.strokeWeight(1.2);let t=p.frameCount*0.006,a=3+Math.sin(t*0.4)*1.2,b=2+Math.cos(t*0.6)*0.8,delta=t*0.7;p.beginShape();for(let angle=0;angle<=p.TWO_PI*6;angle+=0.015){p.stroke((angle*20+t*40)%360,80,92,55);p.vertex(300+270*Math.sin(a*angle+delta),300+270*Math.sin(b*angle));}p.endShape();};};
