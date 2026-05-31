// Day 30 - AURORA BOREALIS
// Prompt: Not a bug, it's a feature.
// Tag: aurora

var sketch_30 = (p)=>{
// DAY 30: Aurora borealis - curtains of light, sine wave bands
p.setup=()=>{p.createCanvas(600,600);p.colorMode(p.HSB,360,100,100,100);};
p.draw=()=>{
  p.background(240,80,5,25);
  let t=p.frameCount*0.008;
  // star field
  p.randomSeed(42);p.noStroke();
  for(let i=0;i<90;i++){
    let sx=p.random(600),sy=p.random(300);
    p.fill(0,0,100,p.map(Math.sin(p.frameCount*0.05+i),-1,1,40,100));
    p.ellipse(sx,sy,1.5,1.5);
  }
  // aurora curtains - vertical sine-wave bands
  const BANDS=8;
  for(let b=0;b<BANDS;b++){
    let bandPhase=b/BANDS*p.TWO_PI+t*0.4;
    let baseX=b*(600/BANDS)+50+Math.sin(t*0.2+b)*30;
    let hue=[160,180,200,270,290,185,270,160][b];
    let bandAlpha=0.5+0.5*Math.sin(t*0.6+b*0.9);
    // draw curtain as many thin vertical strips
    for(let x=baseX-30;x<baseX+30;x+=2.5){
      let distFromCenter=Math.abs(x-baseX)/30;
      let intensity=(1-distFromCenter*distFromCenter)*bandAlpha;
      p.noFill();
      p.beginShape();
      for(let y=50;y<400;y+=4){
        let wx=x+Math.sin(y*0.03+t*1.2+b)*20+Math.sin(y*0.015+t*0.7)*12;
        p.stroke(hue,80,100,intensity*50);p.strokeWeight(2.5);
        p.vertex(wx,y);
      }
      p.endShape();
    }
    // bright leading edge
    p.stroke(hue,60,100,bandAlpha*30);p.strokeWeight(1);p.noFill();
    p.beginShape();
    for(let y=50;y<400;y+=4){
      let wx=baseX+Math.sin(y*0.03+t*1.2+b)*20+Math.sin(y*0.015+t*0.7)*12;
      p.vertex(wx,y);
    }
    p.endShape();
  }
  // ground snow - dark horizon
  p.noStroke();p.fill(240,60,10,90);p.rect(0,420,600,180);
  // horizon glow
  for(let g=5;g>0;g--){p.fill(185,60,100,g*4);p.rect(0,418,600,g*12);}
  // reflection on snow
  for(let b=0;b<BANDS;b++){
    let hue=[160,180,200,270,290,185,270,160][b];
    let bx=b*(600/BANDS)+50;
    p.fill(hue,70,100,8+Math.sin(t+b)*5);
    p.ellipse(bx+Math.sin(t*0.3+b)*20,480+b*8,60+b*10,15);
  }
};};
