// Day 24 - KALEIDOSCOPE
// Prompt: Perfectionist's nightmare.
// Tag: mirror

var sketch_24 = (p)=>{
// DAY 24: Kaleidoscope - rotational symmetry with imperfect drift
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};
p.draw=()=>{
  p.background(0,0,4,18);p.translate(300,300);
  let t=p.frameCount*0.008;
  const FOLDS=8;
  // base patterns to mirror
  function basePetal(layer){
    let hue=(layer*35+t*20)%360;
    let r1=20+layer*22,r2=r1+18;
    let drift=p.noise(layer*2.3,t*0.5)*0.15-0.075; // slight drift
    p.push();p.rotate(drift);
    p.stroke(hue,88,100,70);p.strokeWeight(1.2);p.noFill();
    // petal arc
    p.arc(0,r1+9,(r2-r1)*2.5,(r2-r1)*1.8,-p.HALF_PI*1.5,-p.HALF_PI*0.5);
    // radial line
    p.stroke(hue,70,100,45);p.strokeWeight(0.8);
    p.line(0,r1,0,r2);
    // dot
    p.noStroke();p.fill(hue,100,100,80);p.ellipse(0,r1,4,4);
    p.pop();
  }
  // replicate with FOLDS symmetry
  for(let fold=0;fold<FOLDS;fold++){
    p.push();p.rotate(fold/FOLDS*p.TWO_PI+t*0.03);
    for(let layer=1;layer<=6;layer++)basePetal(layer+fold);
    // mirror
    p.scale(1,-1);
    for(let layer=1;layer<=6;layer++)basePetal(layer+fold);
    p.pop();
  }
  // center jewel
  p.noFill();
  for(let i=0;i<FOLDS;i++){
    let a=i/FOLDS*p.TWO_PI+t*0.1;
    let hue=(i*45+t*30)%360;
    p.stroke(hue,90,100,60);p.strokeWeight(1);
    p.line(10*Math.cos(a),10*Math.sin(a),18*Math.cos(a),18*Math.sin(a));
  }
  p.noStroke();
  for(let g=4;g>0;g--){p.fill((t*50)%360,80,100,15*g);p.ellipse(0,0,g*6,g*6);}
};};
