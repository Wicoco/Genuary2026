// Day 15 - WORMHOLE
// Prompt: Invisible object.
// Tag: portal

var sketch_15 = (p)=>{
// DAY 15: Wormhole portal - tunnel pulled toward vanishing point
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};
p.draw=()=>{
  p.background(0,0,3,20);p.translate(300,300);
  let t=p.frameCount*0.018;
  const RINGS=28;
  // tunnel rings - perspective circles shrinking to center
  for(let i=RINGS;i>=0;i--){
    let progress=i/RINGS;
    let ease=Math.pow(progress,1.8);
    let r=ease*285;
    let hue=(i*12+t*30)%360;
    let twist=i*0.18+t*0.8;
    let alpha=p.map(i,0,RINGS,85,8);
    // main ring
    p.stroke(hue,90,100,alpha);p.strokeWeight(1.5*ease+0.4);p.noFill();
    p.ellipse(0,0,r*2,r*2*0.7);
    // glow
    p.stroke(hue,60,100,alpha*0.25);p.strokeWeight((1.5*ease+0.4)*5);
    p.ellipse(0,0,r*2,r*2*0.7);
    // connecting lines (twisted)
    if(i<RINGS){
      let prevR=(Math.pow((i+1)/RINGS,1.8))*285;
      for(let seg=0;seg<8;seg++){
        let a1=seg/8*p.TWO_PI+twist;
        let a2=seg/8*p.TWO_PI+twist-0.12;
        p.stroke(hue,80,100,alpha*0.5);p.strokeWeight(0.6);
        p.line(r*Math.cos(a1),r*0.7*Math.sin(a1),prevR*Math.cos(a2),prevR*0.7*Math.sin(a2));
      }
    }
  }
  // singularity core
  p.noStroke();
  for(let g=8;g>0;g--){p.fill(270,80,100,g*8);p.ellipse(0,0,g*5,g*5);}
  p.fill(0,0,100,100);p.ellipse(0,0,12,12);
  // outer wormhole frame
  p.stroke(185,80,100,40);p.strokeWeight(2);p.noFill();p.ellipse(0,0,560,560*0.7);
  p.stroke(185,50,100,15);p.strokeWeight(10);p.ellipse(0,0,560,560*0.7);
};};
