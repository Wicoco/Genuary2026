// Day 16 - ORDER > CHAOS
// Prompt: Order and disorder.
// Tag: chaos

var sketch_16 = (p)=>{
p.setup=()=>{p.createCanvas(600,600);};
p.draw=()=>{
  p.background(8,6,22);
  let t=p.frameCount*0.007,steps=65,maxR=278;
  p.noFill();
  for(let i=0;i<steps;i++){
    let r=p.map(i,0,steps,maxR,6),chaos=p.map(i,0,steps,0,1);
    p.colorMode(p.HSB,360,100,100,100);
    p.stroke(p.map(chaos,0,1,170,320),72+chaos*18,90,72);
    p.strokeWeight(1.3-chaos*0.6);
    let pts=Math.floor(p.map(chaos,0,1,200,24));
    p.beginShape();
    for(let j=0;j<=pts;j++){
      let a=j/pts*p.TWO_PI;
      let noise=chaos*p.noise(Math.cos(a)*2.2+i*0.25,Math.sin(a)*2.2+i*0.25,t)*48;
      p.vertex(300+(r+noise)*Math.cos(a),300+(r+noise)*Math.sin(a));
    }
    p.endShape(p.CLOSE);
  }
  p.colorMode(p.RGB);p.noStroke();p.fill(255,48);p.textFont('monospace');p.textSize(9);
  p.text('ORDERED',530,308);p.text('CHAOS',272,308);
};};
