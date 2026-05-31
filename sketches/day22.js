// Day 22 - MOUNTAIN TOPO
// Prompt: Pen plotter ready.
// Tag: contour

var sketch_22 = (p)=>{
// DAY 22: Mountain topography - contour lines from above,
p.setup=()=>{
  p.createCanvas(600,600);p.background(0,0,4);
  p.colorMode(p.HSB,360,100,100,100);p.noFill();p.noLoop();
};
p.draw=()=>{
  p.background(0,0,4);
  const LEVELS=40,STEP=5;
  for(let lev=0;lev<LEVELS;lev++){
    let threshold=p.map(lev,0,LEVELS,0.1,0.92);
    let hue=p.map(lev,0,LEVELS,185,48);
    let alpha=p.map(lev,0,LEVELS,25,70);
    p.strokeWeight(lev%8===0?1.2:0.5);
    p.stroke(hue,80,100,alpha);
    // marching squares iso-line
    for(let x=0;x<590;x+=STEP)for(let y=0;y<590;y+=STEP){
      let n00=p.noise(x*0.006,y*0.006);
      let n10=p.noise((x+STEP)*0.006,y*0.006);
      let n01=p.noise(x*0.006,(y+STEP)*0.006);
      let n11=p.noise((x+STEP)*0.006,(y+STEP)*0.006);
      let c=0;
      if(n00>threshold)c|=8;if(n10>threshold)c|=4;
      if(n11>threshold)c|=2;if(n01>threshold)c|=1;
      if(c===0||c===15)continue;
      let t1=(threshold-n00)/(n10-n00+1e-6)*STEP;
      let t2=(threshold-n00)/(n01-n00+1e-6)*STEP;
      let t3=(threshold-n10)/(n11-n10+1e-6)*STEP;
      let t4=(threshold-n01)/(n11-n01+1e-6)*STEP;
      let top=[x+t1,y],bot=[x+t4,y+STEP],lft=[x,y+t2],rgt=[x+STEP,y+t3];
      if((c&9)===8||(c&9)===1)p.line(top[0],top[1],lft[0],lft[1]);
      if((c&6)===4||(c&6)===2)p.line(rgt[0],rgt[1],bot[0],bot[1]);
      if((c&12)===8||(c&12)===4)p.line(top[0],top[1],rgt[0],rgt[1]);
      if((c&3)===2||(c&3)===1)p.line(bot[0],bot[1],lft[0],lft[1]);
    }
  }
  // neon border
  p.stroke(185,80,100,35);p.strokeWeight(1);p.rect(8,8,584,584);
};};
