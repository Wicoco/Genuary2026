// Day 17 - ISLAMIC STARS
// Prompt: Wallpaper group.
// Tag: symmetry

var sketch_17 = (p)=>{
function star6(cx,cy,R,t){
  p.push();p.translate(cx,cy);
  let hue=(cx*0.3+cy*0.2+p.frameCount*0.5)%360;
  p.colorMode(p.HSB,360,100,100,100);
  p.noStroke();
  for(let k=0;k<6;k++){
    p.push();p.rotate(k*p.PI/3+t);
    p.fill(hue,88,82,55);
    p.beginShape();p.vertex(0,0);p.vertex(R*0.5,-R*0.86);p.vertex(R,-R*0.4);p.endShape(p.CLOSE);
    p.pop();
  }
  p.fill((hue+60)%360,75,95,80);
  p.beginShape();
  for(let k=0;k<6;k++){let a=k*p.PI/3;p.vertex(R*0.42*Math.cos(a),R*0.42*Math.sin(a));}
  p.endShape(p.CLOSE);
  p.noFill();p.stroke(hue,95,100,75);p.strokeWeight(1.2);
  for(let k=0;k<6;k++){
    p.push();p.rotate(k*p.PI/3+t);
    p.beginShape();p.vertex(0,0);p.vertex(R*0.5,-R*0.86);p.vertex(R,-R*0.4);p.endShape(p.CLOSE);
    p.pop();
  }
  p.stroke((hue+120)%360,90,100,80);p.strokeWeight(1.5);
  p.beginShape();
  for(let k=0;k<6;k++){let a=k*p.PI/3;p.vertex(R*0.42*Math.cos(a),R*0.42*Math.sin(a));}
  p.endShape(p.CLOSE);
  p.pop();
}
const R=42,H=R*Math.sqrt(3);
p.setup=()=>{p.createCanvas(600,600);};
p.draw=()=>{
  p.background(8,5,18);
  let t=p.frameCount*0.005;
  for(let col=-1;col<9;col++)for(let row=-1;row<10;row++)
    star6(col*R*1.73+((row%2)*R*0.87),row*H*0.75,R-2,t);
};};
