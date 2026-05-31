// Day 10 - SPIDER WEB
// Prompt: Polar coordinates.
// Tag: web

var sketch_10 = (p)=>{
// DAY 10: Spider web - radial + spiral structure vibratin
let web=[];
p.setup=()=>{
  p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);
  buildWeb();
};
function buildWeb(){
  web=[];
  const RADIALS=18,RINGS=22,cx=300,cy=285;
  // radial lines
  for(let r=0;r<RADIALS;r++){
    let a=r/RADIALS*Math.PI*2-Math.PI/2;
    let pts=[];
    for(let ring=0;ring<=RINGS;ring++){
      let radius=ring*(248/RINGS);
      pts.push({x:cx+radius*Math.cos(a),y:cy+radius*Math.sin(a),base:{x:cx+radius*Math.cos(a),y:cy+radius*Math.sin(a)}});
    }
    web.push({type:'radial',pts,radialIdx:r});
  }
  // spiral rings
  for(let ring=1;ring<=RINGS;ring++){
    let pts=[];
    for(let r=0;r<RADIALS*4;r++){
      let a=r/(RADIALS*4)*Math.PI*2-Math.PI/2;
      let radius=ring*(248/RINGS);
      pts.push({x:cx+radius*Math.cos(a),y:cy+radius*Math.sin(a)});
    }
    pts.push(pts[0]);
    web.push({type:'spiral',pts,ring});
  }
}
p.draw=()=>{
  p.background(0,0,4,18);
  let t=p.frameCount*0.015;
  const cx=300,cy=285;
  // vibrate web nodes
  web.forEach(strand=>{
    if(strand.type==='radial'){
      strand.pts.forEach((pt,i)=>{
        let d=Math.hypot(pt.base.x-cx,pt.base.y-cy);
        let vibration=Math.sin(t*4-d*0.04)*p.map(d,0,248,0,5);
        pt.x=pt.base.x+vibration*Math.cos(strand.radialIdx/18*p.TWO_PI+p.PI/2);
        pt.y=pt.base.y+vibration*Math.sin(strand.radialIdx/18*p.TWO_PI+p.PI/2);
      });
    }
  });
  // draw spiral rings
  web.filter(s=>s.type==='spiral').forEach(strand=>{
    let alpha=p.map(strand.ring,1,22,60,15);
    let hue=(strand.ring*12+t*15)%360;
    p.stroke(hue,80,100,alpha);p.strokeWeight(0.7);p.noFill();
    p.beginShape();strand.pts.forEach(pt=>p.vertex(pt.x,pt.y));p.endShape();
    // glow
    p.stroke(hue,50,100,alpha*0.3);p.strokeWeight(3);
    p.beginShape();strand.pts.forEach(pt=>p.vertex(pt.x,pt.y));p.endShape();
  });
  // draw radials
  web.filter(s=>s.type==='radial').forEach(strand=>{
    let hue=(strand.radialIdx*20+t*10)%360;
    p.stroke(hue,70,100,50);p.strokeWeight(0.9);p.noFill();
    p.beginShape();strand.pts.forEach(pt=>p.vertex(pt.x,pt.y));p.endShape();
  });
  // dew drops at intersections
  if(p.frameCount%3===0){
    p.noStroke();p.fill(185,40,100,60);
    let r=Math.floor(p.random(1,22)),rad=Math.floor(p.random(18));
    let angle=rad/18*p.TWO_PI-p.PI/2;
    let radius=r*(248/22);
    p.ellipse(cx+radius*Math.cos(angle),cy+radius*Math.sin(angle),5,5);
  }
  // center anchor
  for(let g=4;g>0;g--){p.noStroke();p.fill(185,80,100,g*8);p.ellipse(cx,cy,g*6,g*6);}
};};
