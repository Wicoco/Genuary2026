// Day 08 - DEEP SEA
// Prompt: A City.
// Tag: ocean

var sketch_08 = (p)=>{
// DAY 8: Deep sea bioluminescence - creatures made from s
let creatures=[],bubbles=[];
function makeCr(){
  return{
    x:p.random(-60,660),y:p.random(600,750),
    vx:(p.random()-.5)*0.6,vy:p.random(-0.8,-0.2),
    size:p.random(15,55),hue:p.random()<0.5?185:p.random()<0.5?270:330,
    phase:p.random(p.TWO_PI),type:Math.floor(p.random(3))
  };
}
p.setup=()=>{
  p.createCanvas(600,600);
  for(let i=0;i<12;i++)creatures.push(makeCr());
  for(let i=0;i<60;i++)bubbles.push({x:p.random(600),y:p.random(600),r:p.random(2,9),spd:p.random(0.4,1.2),wobble:p.random(p.TWO_PI)});
};
p.draw=()=>{
  // deep ocean gradient
  p.noStroke();
  for(let y=0;y<600;y+=3){
    let t=y/600;
    p.fill(220,80,p.map(t,0,1,8,2));p.rect(0,y,600,3);
  }
  p.colorMode(p.HSB,360,100,100,100);
  let t=p.frameCount*0.01;
  // caustic light rays from surface
  for(let i=0;i<8;i++){
    let lx=p.noise(i*0.5,t*0.2)*600;
    p.stroke(185,40,100,8);p.strokeWeight(12+i*3);
    p.line(lx,0,lx+(p.noise(i,t)*40-20),200);
  }
  // bubbles
  bubbles.forEach(b=>{
    b.y-=b.spd;b.x+=Math.sin(t*2+b.wobble)*0.5;
    if(b.y<-10){b.y=610;b.x=p.random(600);}
    p.noFill();p.stroke(185,40,100,40);p.strokeWeight(0.7);p.ellipse(b.x,b.y,b.r*2,b.r*2);
    p.stroke(185,20,100,20);p.strokeWeight(2);p.ellipse(b.x,b.y,b.r*2,b.r*2);
  });
  // creatures
  creatures.forEach(c=>{
    c.x+=c.vx+Math.sin(t+c.phase)*0.3;c.y+=c.vy;
    if(c.y<-80){Object.assign(c,makeCr());}
    let pulse=0.7+0.3*Math.sin(t*2+c.phase);
    p.push();p.translate(c.x,c.y);
    if(c.type===0){
      // jellyfish - dome + tentacles
      p.noFill();p.stroke(c.hue,80,100,60*pulse);p.strokeWeight(1.2);
      p.arc(0,0,c.size*2,c.size*1.4,p.PI,p.TWO_PI);
      p.fill(c.hue,50,100,15*pulse);p.noStroke();
      p.arc(0,0,c.size*2,c.size*1.4,p.PI,p.TWO_PI,p.CHORD);
      for(let i=0;i<6;i++){
        let tx=(i-2.5)*c.size*0.38;
        let tlen=c.size*0.6+Math.sin(t*3+i)*c.size*0.25;
        p.stroke(c.hue,70,100,35*pulse);p.strokeWeight(0.8);p.noFill();
        p.beginShape();p.vertex(tx,0);p.vertex(tx+Math.sin(t*2+i)*8,tlen);p.endShape();
      }
    } else if(c.type===1){
      // anglerfish light lure - just the bioluminescent orb
      p.noFill();p.stroke(c.hue,80,100,50*pulse);p.strokeWeight(1);
      p.ellipse(0,0,c.size*1.6,c.size);
      p.stroke(c.hue,60,100,20*pulse);p.strokeWeight(5);p.ellipse(0,0,c.size*1.6,c.size);
      // lure
      p.stroke(48,90,100,70*pulse);p.strokeWeight(0.8);p.noFill();
      p.beginShape();p.vertex(0,-c.size*0.5);p.vertex(10,-c.size*0.9);p.endShape();
      for(let g=4;g>0;g--){p.noStroke();p.fill(48,90,100,15*g*pulse);p.ellipse(10,-c.size*0.9,g*5,g*5);}
    } else {
      // radiolarian - geometric sphere
      p.noFill();p.stroke(c.hue,85,100,55*pulse);p.strokeWeight(1);
      for(let i=0;i<6;i++){let a=i/6*p.TWO_PI;p.line(0,0,c.size*Math.cos(a),c.size*Math.sin(a));}
      p.ellipse(0,0,c.size*1.2,c.size*1.2);p.ellipse(0,0,c.size*0.7,c.size*0.7);
    }
    p.pop();
  });
};};
