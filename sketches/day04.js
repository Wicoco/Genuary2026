// Day 04 - LOWRES TERRAIN
// Prompt: Lowres.
// Tag: noise

var sketch_04 = (p)=>{const SZ=20;p.setup=()=>{p.createCanvas(600,600);p.noStroke();};p.draw=()=>{let t=p.frameCount*0.007;for(let x=0;x<600;x+=SZ)for(let y=0;y<600;y+=SZ){let n=p.noise(x*0.035,y*0.035,t),n2=p.noise(x*0.02+100,y*0.02+100,t*0.5);p.fill(p.map(n,0,1,8,60),p.map(n2,0,1,15,130),p.map(n,0,1,90,240));p.rect(x,y,SZ,SZ);}};};
