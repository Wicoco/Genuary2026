// Day 01 - LIQUID DROP
// Prompt: One color, one shape.
// Tag: fluid

var sketch_01 = (p)=>{
// DAY 1: Liquid drop - single morphing water drop, surfac
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};
p.draw=()=>{
  p.background(0,0,4,22);p.translate(300,300);
  let t=p.frameCount*0.016;
  const PTS=120;
  // multiple glow layers
  [8,5,3,1.2].forEach((sw,li)=>{
    let alpha=[10,18,35,80][li];
    p.stroke(185,90,100,alpha);p.strokeWeight(sw);p.noFill();
    p.beginShape();
    for(let i=0;i<=PTS;i++){
      let a=i/PTS*p.TWO_PI;
      let r=140
        +Math.sin(a*2+t)*30
        +Math.sin(a*3-t*1.4)*18
        +Math.sin(a*5+t*0.7)*10
        +p.noise(Math.cos(a)*1.5,Math.sin(a)*1.5,t)*25-12;
      p.curveVertex(r*Math.cos(a),r*Math.sin(a));
    }
    p.endShape(p.CLOSE);
  });
  // surface sheen - arc highlight
  p.noFill();p.stroke(185,30,100,40);p.strokeWeight(2);
  p.arc(-40,-55,80,55,p.PI*1.2,p.PI*1.8);
  // inner refraction ring
  p.stroke(185,80,100,30);p.strokeWeight(1);p.ellipse(0,0,80,80);
  // core glow
  p.noStroke();
  for(let g=6;g>0;g--){p.fill(185,80,100,g*8);p.ellipse(0,0,g*10,g*10);}
  // tension surface particles
  for(let i=0;i<20;i++){
    let a=i/20*p.TWO_PI+t*0.2;
    let r=135+Math.sin(t*2+i)*25;
    p.fill(48,80,100,p.noise(i,t*0.5)*35);p.ellipse(r*Math.cos(a),r*Math.sin(a),3,3);
  }
};};
