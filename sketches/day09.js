// Day 09 - CYCLIC AUTOMATON
// Prompt: Crazy automaton.
// Tag: automaton

var sketch_09 = (p)=>{const C=80,R=80,SZ=7.5;let grid,next;p.setup=()=>{p.createCanvas(600,600);p.noStroke();grid=Array.from({length:C},()=>Array.from({length:R},()=>Math.floor(p.random(4))));next=Array.from({length:C},()=>new Array(R).fill(0));};p.draw=()=>{const PAL=['#080520','#ff1f45','#00ffc8','#f0b030','#7040ff'];for(let i=0;i<C;i++)for(let j=0;j<R;j++){p.fill(PAL[grid[i][j]]);p.rect(i*SZ,j*SZ,SZ,SZ);let s=grid[i][j],ns=(s+1)%4,cnt=0;for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){if(di===0&&dj===0)continue;let ni=(i+di+C)%C,nj=(j+dj+R)%R;if(grid[ni][nj]===ns)cnt++;}next[i][j]=cnt>=3?ns:s;}[grid,next]=[next,grid];};p.mousePressed=()=>{grid=Array.from({length:C},()=>Array.from({length:R},()=>Math.floor(p.random(4))));};};
