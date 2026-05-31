// Day 03 - CRYSTAL GROWTH
// Prompt: Fibonacci forever.
// Tag: crystal

var sketch_03 = (p)=>{
// DAY 3: Crystal growth - hexagonal lattice growing from center
let crystals=[];
let queue=[[300,300,0]];
let grown=new Set();
const dirs=[[1,0],[0.5,0.866],[-0.5,0.866],[-1,0],[-0.5,-0.866],[0.5,-0.866]];
const R=22;
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);p.noLoop();};
p.draw=()=>{
  p.background(0,0,4);
  // grow crystal
  let maxCrystals=320;
  while(crystals.length<maxCrystals&&queue.length>0){
    let [cx,cy,gen]=queue.shift();
    let key=`${Math.round(cx)},${Math.round(cy)}`;
    if(grown.has(key))continue;
    grown.add(key);
    let hue=(gen*18+185)%360;
    let sat=p.map(gen,0,15,95,60);
    let bri=p.map(gen,0,15,100,40);
    crystals.push({x:cx,y:cy,hue,sat,bri,gen});
    // add neighbours with probability
    dirs.forEach(([dx,dy])=>{
      let nx=cx+dx*R*1.15,ny=cy+dy*R;
      if(nx>10&&nx<590&&ny>10&&ny<590&&p.random()<0.85)
        queue.push([nx,ny,gen+1]);
    });
  }
  // draw crystals
  crystals.forEach(c=>{
    // hex fill
    p.noStroke();p.fill(c.hue,c.sat*0.3,c.bri*0.15,90);
    p.beginShape();
    dirs.forEach(([dx,dy])=>p.vertex(c.x+dx*R*0.52,c.y+dy*R*0.52));
    p.endShape(p.CLOSE);
    // hex border
    p.stroke(c.hue,c.sat,c.bri,75);p.strokeWeight(0.9);p.noFill();
    p.beginShape();
    dirs.forEach(([dx,dy])=>p.vertex(c.x+dx*R*0.52,c.y+dy*R*0.52));
    p.endShape(p.CLOSE);
    // glow on recent generations
    if(c.gen<3){
      p.stroke(c.hue,c.sat,100,p.map(c.gen,0,3,40,10));p.strokeWeight(4);
      p.beginShape();dirs.forEach(([dx,dy])=>p.vertex(c.x+dx*R*0.52,c.y+dy*R*0.52));p.endShape(p.CLOSE);
    }
    // center node
    p.noStroke();p.fill(c.hue,c.sat*0.8,100,60);p.ellipse(c.x,c.y,4,4);
  });
};
p.mousePressed=()=>{crystals=[];queue=[[300,300,0]];grown=new Set();p.redraw();};};
