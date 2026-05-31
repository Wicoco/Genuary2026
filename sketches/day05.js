// Day 05 - STORM VORTEX
// Prompt: Write without a font.
// Tag: vortex

var sketch_05 = (p)=>{
// DAY 5: Vortex storm - spiraling wind bands, pure energy visual
let particles=[];
p.setup=()=>{
  p.createCanvas(600,600);
  for(let i=0;i<400;i++)particles.push({
    r:p.random(20,270),a:p.random(p.TWO_PI),
    spd:p.map(p.random(20,270),20,270,0.08,0.018),
    drift:p.random(-0.004,0.004),
    hue:p.random()<0.6?185:p.random()<0.5?48:330,
    size:p.random(1.5,4)
  });
};
p.draw=()=>{
  p.background(0,0,4,18);p.translate(300,300);
  p.colorMode(p.HSB,360,100,100,100);
  let t=p.frameCount*0.008;
  // eye wall rings
  for(let ring=0;ring<6;ring++){
    let r=18+ring*9+Math.sin(t*2+ring)*4;
    p.noFill();p.stroke(185,90,100,p.map(ring,0,6,90,25));
    p.strokeWeight(p.map(ring,0,6,2.5,0.6));p.ellipse(0,0,r*2,r*2);
  }
  // spiral arms - arcs that suggest rotation
  for(let arm=0;arm<4;arm++){
    let armPhase=arm/4*p.TWO_PI+t*0.3;
    p.stroke(48+arm*30,90,100,40);p.strokeWeight(1.2);p.noFill();
    p.beginShape();
    for(let i=0;i<60;i++){
      let a=armPhase+i*0.08;
      let r=85+i*2.8+Math.sin(a*3+t)*15;
      if(r>270)break;
      p.vertex(r*Math.cos(a),r*Math.sin(a));
    }
    p.endShape();
  }
  // particles on spiral paths
  particles.forEach(pt=>{
    pt.a+=pt.spd+pt.drift;
    pt.r+=Math.sin(p.frameCount*0.02+pt.a)*0.2;
    pt.r=p.constrain(pt.r,15,270);
    let x=pt.r*Math.cos(pt.a),y=pt.r*Math.sin(pt.a);
    let alpha=p.map(pt.r,15,270,90,25);
    p.noStroke();p.fill(pt.hue,85,100,alpha*0.8);p.ellipse(x,y,pt.size,pt.size);
    p.fill(pt.hue,60,100,alpha*0.2);p.ellipse(x,y,pt.size*3,pt.size*3);
  });
  // outer bands
  for(let b=0;b<5;b++){
    let r=220+b*14+Math.sin(t+b)*6;
    p.noFill();p.stroke(270+b*18,70,100,p.map(b,0,5,35,8));p.strokeWeight(3-b*0.5);
    p.ellipse(0,0,r*2,r*2);
  }
};};
