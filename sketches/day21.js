// Day 21 - SOLAR FLARE
// Prompt: Bauhaus Poster.
// Tag: plasma

var sketch_21 = (p)=>{
// DAY 21: Solar flare - plasma loops arching from star surface
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};
p.draw=()=>{
  p.background(0,0,3,20);p.translate(300,420);
  let t=p.frameCount*0.012;
  // corona background glow
  p.noStroke();
  for(let g=12;g>0;g--){p.fill(25,85,100,g*3);p.ellipse(0,0,(180+g*25)*2,(180+g*25)*2);}
  // plasma loop arcs
  for(let flare=0;flare<5;flare++){
    let phase=flare/5*p.TWO_PI+t*0.15;
    let w=50+flare*30+Math.sin(t*0.7+flare)*20;
    let h=80+flare*25+Math.sin(t*0.5+flare*1.3)*30;
    let hue=p.map(flare,0,5,25,50);
    let alpha=0.6+0.4*Math.sin(t*1.2+flare);
    // glow arc
    [8,5,3,1.5].forEach((sw,li)=>{
      p.stroke(hue,90,100,[12,20,40,80][li]*alpha);p.strokeWeight(sw);p.noFill();
      p.beginShape();
      for(let a=p.PI;a>=0;a-=0.04){
        let x=w*Math.cos(a+phase-p.PI/2);
        let y=-h*Math.abs(Math.sin(a));
        p.vertex(x,y);
      }
      p.endShape();
    });
  }
  // solar surface - arc
  p.noFill();p.stroke(50,90,100,90);p.strokeWeight(3);
  p.arc(0,0,360,360,p.PI,p.TWO_PI);
  p.stroke(48,60,100,20);p.strokeWeight(14);p.arc(0,0,360,360,p.PI,p.TWO_PI);
  // granulation texture
  for(let i=0;i<40;i++){
    let a=p.random(-p.PI,0);
    let r=180+p.random(-8,8);
    let cx2=r*Math.cos(a),cy2=r*Math.sin(a);
    p.noStroke();p.fill(35,80,100,25+p.noise(i,t)*30);
    p.ellipse(cx2,cy2,p.random(8,22),p.random(5,12));
  }
  // spicules - thin jets
  for(let s=0;s<20;s++){
    let sa=-p.PI+s/20*p.PI;
    let r1=180,r2=180+20+Math.sin(t*3+s)*15;
    let cx1=r1*Math.cos(sa),cy1=r1*Math.sin(sa);
    let cx2=r2*Math.cos(sa),cy2=r2*Math.sin(sa);
    p.stroke(50,90,100,40+Math.sin(t*2+s)*20);p.strokeWeight(0.7);
    p.line(cx1,cy1,cx2,cy2);
  }
};};
