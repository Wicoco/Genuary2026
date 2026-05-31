// Day 07 - MAGNETIC FIELD
// Prompt: Boolean algebra.
// Tag: magnetism

var sketch_07 = (p)=>{
// DAY 7: Magnetic field lines - iron-filing patterns around two poles
p.setup=()=>{p.createCanvas(600,600);};
p.draw=()=>{
  p.background(0,0,4,25);
  let t=p.frameCount*0.008;
  p.colorMode(p.HSB,360,100,100,100);
  // animated pole positions
  let p1x=220+Math.sin(t*0.5)*30,p1y=300+Math.cos(t*0.4)*20;
  let p2x=380-Math.sin(t*0.5)*30,p2y=300-Math.cos(t*0.4)*20;
  // field lines - trace from pole 1
  const LINES=36;
  for(let l=0;l<LINES;l++){
    let startA=l/LINES*p.TWO_PI;
    let x=p1x+15*Math.cos(startA),y=p1y+15*Math.sin(startA);
    let hue=(l*10+p.frameCount*0.5)%360;
    p.stroke(hue,85,100,55);p.strokeWeight(0.8);p.noFill();
    p.beginShape();
    for(let step=0;step<180;step++){
      // field direction: sum of dipole fields
      let dx1=x-p1x,dy1=y-p1y;
      let d1=Math.sqrt(dx1*dx1+dy1*dy1)+0.5;
      let dx2=x-p2x,dy2=y-p2y;
      let d2=Math.sqrt(dx2*dx2+dy2*dy2)+0.5;
      let fx=dx1/(d1*d1*d1)-dx2/(d2*d2*d2);
      let fy=dy1/(d1*d1*d1)-dy2/(d2*d2*d2);
      let fm=Math.sqrt(fx*fx+fy*fy)+0.001;
      x+=fx/fm*2.5;y+=fy/fm*2.5;
      if(x<0||x>600||y<0||y>600)break;
      if(Math.hypot(x-p2x,y-p2y)<14)break;
      p.vertex(x,y);
    }
    p.endShape();
  }
  // pole glows
  function pole(px,py,hue){
    for(let g=5;g>0;g--){p.noStroke();p.fill(hue,80,100,g*10);p.ellipse(px,py,g*14,g*14);}
    p.fill(hue,100,100,100);p.noStroke();p.ellipse(px,py,16,16);
    p.fill(0,0,5);p.ellipse(px,py,6,6);
  }
  pole(p1x,p1y,48);pole(p2x,p2y,185);
};};
