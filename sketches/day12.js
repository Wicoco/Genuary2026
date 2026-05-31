// Day 12 - LAVA CELLS
// Prompt: Boxes only.
// Tag: convection

var sketch_12 = (p)=>{
// DAY 12: Lava convection - hexagonal Bénard cells, heat rising
let cells=[];
const HEX_R=32,cols=10,rows=10;
p.setup=()=>{
  p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);
  // create hex grid
  for(let c=0;c<cols;c++)for(let r=0;r<rows;r++){
    let cx=c*HEX_R*1.73+(r%2)*HEX_R*0.87;
    let cy=r*HEX_R*1.5;
    cells.push({cx,cy,phase:p.random(p.TWO_PI),spd:p.random(0.8,1.8),hue:p.random(10,45)});
  }
};
p.draw=()=>{
  p.background(0,0,3);
  let t=p.frameCount*0.012;
  function hexPath(cx,cy,r){
    p.beginShape();
    for(let i=0;i<6;i++){let a=i/6*p.TWO_PI;p.vertex(cx+r*Math.cos(a),cy+r*Math.sin(a));}
    p.endShape(p.CLOSE);
  }
  cells.forEach(c=>{
    let heat=0.5+0.5*Math.sin(t*c.spd+c.phase);
    let hue=p.map(heat,0,1,c.hue,c.hue+25);
    let bri=p.map(heat,0,1,30,98);
    let sat=p.map(heat,0,1,80,100);
    // cell fill
    p.fill(hue,sat,bri,90);p.noStroke();
    hexPath(c.cx,c.cy,HEX_R*0.96);
    // border crack lines (cooling)
    p.stroke(c.hue*0.3,40,20,80);p.strokeWeight(1.5);p.noFill();
    hexPath(c.cx,c.cy,HEX_R*0.96);
    // hot center glow
    if(heat>0.7){
      p.noStroke();p.fill(hue+15,60,100,p.map(heat,0.7,1,0,55));
      hexPath(c.cx,c.cy,HEX_R*0.5);
    }
    // rising convection dot
    let dotY=c.cy-p.map(heat,0,1,-8,8);
    p.noStroke();p.fill(hue+20,50,100,heat*60);
    p.ellipse(c.cx,dotY,4,4);
  });
  // magma glow overlay
  p.noStroke();
  for(let g=4;g>0;g--){
    p.fill(25,90,100,g*3);
    p.ellipse(300,600,600-g*50,g*60);
  }
};};
