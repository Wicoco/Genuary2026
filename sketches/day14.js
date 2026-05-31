// Day 14 - TRUCHET TILES
// Prompt: Everything fits perfectly.
// Tag: truchet

var sketch_14 = (p)=>{const SZ=40,C=15,R=15;let tiles=[];p.setup=()=>{p.createCanvas(600,600);p.strokeWeight(2);p.noFill();tiles=Array.from({length:C},()=>Array.from({length:R},()=>Math.floor(p.random(2))));};p.draw=()=>{p.background(8,6,22);if(p.frameCount%55===0){let i=Math.floor(p.random(C)),j=Math.floor(p.random(R));tiles[i][j]^=1;}p.colorMode(p.HSB,360,100,100,100);for(let i=0;i<C;i++)for(let j=0;j<R;j++){let x=i*SZ,y=j*SZ,hue=(i*22+j*14+p.frameCount*0.4)%360;p.stroke(hue,65,88);if(tiles[i][j]===0){p.arc(x,y,SZ*2,SZ*2,0,p.HALF_PI);p.arc(x+SZ,y+SZ,SZ*2,SZ*2,p.PI,p.PI+p.HALF_PI);}else{p.arc(x+SZ,y,SZ*2,SZ*2,p.HALF_PI,p.PI);p.arc(x,y+SZ,SZ*2,SZ*2,p.PI+p.HALF_PI,p.TWO_PI);}}};};
