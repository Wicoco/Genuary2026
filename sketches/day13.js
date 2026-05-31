// Day 13 - BLACK HOLE
// Prompt: Self portrait.
// Tag: blackhole

var sketch_13 = (p)=>{
// DAY 13: Black hole - accretion disk with Doppler shift,
p.setup=()=>{p.createCanvas(600,600);};
p.draw=()=>{
  p.background(0,0,3,22);p.translate(300,300);
  let t=p.frameCount*0.01;
  p.colorMode(p.HSB,360,100,100,100);
  // accretion disk - many elliptical rings with Doppler color shift
  for(let ring=80;ring>0;ring--){
    let rx=ring*2.8,ry=ring*0.6;
    // Doppler: left side blueshift, right side redshift
    let alpha=p.map(ring,0,80,85,5);
    let hueLeft=185+p.map(ring,0,80,0,-40);
    let hueRight=25+p.map(ring,0,80,0,30);
    // draw two halves
    p.noFill();
    // right half (receding - red)
    p.stroke((hueRight+t*5)%360,90,p.map(ring,0,80,20,95),alpha);
    p.strokeWeight(0.9);
    p.arc(0,0,rx*2,ry*2,0,p.PI);
    // left half (approaching - blue)
    p.stroke((hueLeft+t*5)%360,90,p.map(ring,0,80,20,95),alpha);
    p.arc(0,0,rx*2,ry*2,p.PI,p.TWO_PI);
  }
  // event horizon - pure black circle with glow
  p.noStroke();
  // photon ring glow
  for(let g=6;g>0;g--){p.fill(45,80,100,g*6);p.ellipse(0,0,(52+g*5)*2,(52+g*5)*2);}
  p.fill(185,60,100,25);p.ellipse(0,0,120,120);
  // event horizon - BLACK
  p.fill(0,0,0);p.ellipse(0,0,105,105);
  // inner photon ring
  p.noFill();p.stroke(50,100,100,80);p.strokeWeight(2);p.ellipse(0,0,112,112);
  p.stroke(185,80,100,40);p.strokeWeight(6);p.ellipse(0,0,112,112);
  // relativistic jets
  for(let side=0;side<2;side++){
    let dir=side===0?-1:1;
    for(let j=0;j<3;j++){
      let spread=j*0.08;
      p.stroke(270+j*20,70,100,p.map(j,0,3,55,15));p.strokeWeight(1.5-j*0.4);p.noFill();
      p.beginShape();
      for(let step=0;step<30;step++){
        let r=55+step*7;
        p.vertex(spread*step*3*Math.sin(t*0.5),dir*r);
      }
      p.endShape();
    }
  }
};};
