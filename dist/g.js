function getConfigs(t){const[e,n]=t,o=e/2,i=n/2;return function t(c){const r=Math.round(.618*c);const s=Math.round(.1*r);const u=16*r+8*s;if(u>e)return c=Math.round(.98*c),t(c);const f=Math.round(.618*r);const l=3*r;const a=l+c;const d=o+r;const g=d+5*r+3*s;const h=o-5*r-3*s;const S=h-3*r-s;const R=Math.round(1.618*c);const O=[{Class:Text,config:{text:"BRING THE NUMBER BACK!",x:o,y:r,color:COLORS.c5,stroke:COLORS.c2,fontSize:r,fontFamily:"fantasy"}},{Class:Text,config:{text:"YOUR GUESS",x:d,y:l,color:COLORS.c4,stroke:COLORS.c2,fontSize:f,fontWeight:"bold",align:"left",fontFamily:"system-ui"}},{Class:Text,config:{text:"ROBOT GUESS",x:o-r,y:l,color:COLORS.c3,stroke:COLORS.c2,fontSize:f,fontWeight:"bold",align:"right",fontFamily:"system-ui"}},{Class:Text,config:{text:"SCORE",x:g,y:l,color:COLORS.c3,stroke:COLORS.c2,fontSize:f,fontWeight:"bold",align:"left",fontFamily:"system-ui"}},{Class:Text,config:{text:"SCORE",x:S+2*r+s,y:l,color:COLORS.c4,stroke:COLORS.c2,fontSize:f,fontWeight:"bold",align:"right",fontFamily:"system-ui"}}];return{width:e,height:n,centerX:o,centerY:i,initBlockY:a,rightBlockX:d,leftBlockX:h,rightBlockX1:g,leftBlockX1:S,stepHeight:R,digitBlockConfig:{dw:r,dh:c,dg:s},staticItems:O}}(Math.round(n/16))}const COLORS={c1:"#26717F",c2:"#0A4B59",c3:"#B19F3C",c4:"#F2AC29",c5:"#DB5C43"},RESULTS={USER:"You won!.A genuine triumph of the human mind!.Hit Space to beat that piece of metal again",ROBOT:"You lose.Don't sweat.Hit Space to try again.",DRAW:"It's a draw.You almost there.Hit Space to try again.",DUPLICATE_GUESS:"Oops!.You already have this variant.Think harder))",SCORE_ERROR:"Oops!.There is an error in your scores.Hit Space to restart the game."},INPUT_TYPES={GUESS:"guess",SCORE:"score"};function Game(t,e,n){const{centerX:o,centerY:i,initBlockY:c,rightBlockX:r,leftBlockX:s,rightBlockX1:u,leftBlockX1:f,stepHeight:l,digitBlockConfig:a}=n,d=new Robot,g=new ResultDisplay(o,i,a);let h,S,R,O,p;return{start:function(){h=0,S=[],d.start(),w(d.getGuess())}};function m(t){const e=t.join("");if(R(),S.includes(e))E(RESULTS.DUPLICATE_GUESS),O.reset(),x(O,m);else{S.push(e),C(d.getScore(t))}}function y(t){R(),p=t,d.handleScore(t)?E(RESULTS.SCORE_ERROR):w()}function C(e){const n=c+h*l,o=e?u:f,i=e?COLORS.c3:COLORS.c4,r=new InputSet(INPUT_TYPES.SCORE,o,n,a,i);if(t.add(r),e){r.setDigits(e),1==++h&&t.add(g);const n=function(t){let e=null,n=T(t),o=T(p);o&&n?e=RESULTS.DRAW:o?e=RESULTS.ROBOT:n&&(e=RESULTS.USER);return e}(e);if(n)E(n);else{w(d.getGuess())}}else x(r,y)}function w(e){const n=c+h*l,o=e?s:r,i=e?COLORS.c3:COLORS.c4,u=new InputSet(INPUT_TYPES.GUESS,o,n,a,i);t.add(u),e?(u.setDigits(e),C()):x(u,m)}function x(t,n){t.activate(n),R=e.subscribe(t.onKey),O=t}function E(e){t.moveToTop(g),g.show(e)}function T(t){return 4===t[0]&&4===t[1]}}function InputItem(t,e,n,{dw:o,dh:i,dg:c},r,s){let u,f="";const l=e+t*(o+c),a=l+o/2,d=n+i/2,g=`bold ${.618*i}px monospace`;let h=!1;return{render:function(){u.fillStyle=h?COLORS.c5:r,u.fillRect(l,n,o,i),u.fillStyle=s,u.font=g,u.fillText(f,a,d)},setContext:function(t){u=t},setDigit:function(t){f=t},activate:function(){h=!0},deactivate:function(){h=!1}}}function InputSet(t,e,n,{dw:o,dh:i,dg:c},r){let s,u,f,l=null,a=[];const d=t===INPUT_TYPES.SCORE;d?(u=2,f=function(t){return t<=4}):(u=4,f=function(t){return!a.includes(t)});const g=Array.from({length:u},(t,s)=>new InputItem(s,e,n,{dw:o,dh:i,dg:c},r,COLORS.c1));return{render:function(){g.forEach(t=>t.render())},setContext:function(t){g.forEach(e=>e.setContext(t))},setDigits:function(t){g.forEach((e,n)=>e.setDigit(t[n]))},activate:function(t){s=t,g[l=0].activate()},onKey:function(t){t.isDigit?function(t){if(!f(t))return;const e=a[l];if(a[l]=t,d&&S(a[0])&&S(a[1])&&(4===a[0]&&3===a[1]||!(a[0]>=a[1])))return void(a[l]=e);g[l].setDigit(t),h()}(t.digit):t.isArrowRight?h():t.isArrowLeft?function(){g[l].deactivate(),(l-=1)<0&&(l=u-1);g[l].activate()}():t.isEnter&&a.length===u&&(g[l].deactivate(),l=null,s(a))},reset:function(){a=[],g.forEach((t,e)=>t.setDigit(""))}};function h(){g[l].deactivate(),g[l=(l+1)%u].activate()}function S(t){return Number.isInteger(t)}}function Keyboard(){const t={};let e=[],n=!1;return window.addEventListener("keyup",function(n){const o=Number(n.key),i={};c=n.key," "===c?i.isSpace=!0:!function(t){return Number.isInteger(t)}(o)?i[`is${n.key}`]=!0:(i.digit=o,i.isDigit=!0);var c;e.forEach(e=>t[e](i))}),{subscribe:function(n){const o=Date.now();return t[o]=n,e=Object.keys(t),function(){delete t[o],e=Object.keys(t)}},lock:function(){n=!0},unlock:function(){n=!1}}}const world=new World,help=document.querySelector(".help-outer"),keyboard=new Keyboard,configs=getConfigs(world.getBounds()),game=new Game(world,keyboard,configs);let isFirstRun=!0,isHelpShown=!0;function init(){world.reset(),configs.staticItems.forEach(createStaticItem),game.start()}function createStaticItem({Class:t,config:e}){const n=new t(e);world.add(n)}function onKey(t){t.isEscape?(isFirstRun&&(isFirstRun=!1,init()),toggleHelp()):t.isSpace&&init()}function toggleHelp(){isHelpShown=!isHelpShown,help.style.display=isHelpShown?"table":"none"}function ResultDisplay(t,e,{dw:n,dh:o}){let i,c="",r="",s="",u=0,f=.03;const l=4e3;let a=!1;const d=`bold ${.618*o}px monospace`,g=`bold ${.618*o*.618}px monospace`,h=16*n,S=4*o,R=t-h/2,O=e-S/2;return{render:function(){c&&(i.save(),i.globalAlpha=u,i.fillStyle=COLORS.c2,i.fillRect(R,O,h,S),i.fillStyle=COLORS.c3,i.font=d,i.fillText(c,t,e-o),i.font=g,i.fillText(r,t,e),i.font=g,i.fillText(s,t,e+o),i.restore())},update:function(){c&&(a?(u-=f)<0&&(c="",u=1):(u+=f)>1&&(u=1))},setContext:function(t){i=t},show:function(t){a=!1,[c,r,s]=t.split("."),setTimeout(p,l)},hide:p};function p(){a=!0}}function Robot(){const t=Array.from(Array(10),(t,e)=>e),e=permutations(t,4);let n,o,i;return{start:function(){n=getRandomItems(4,t),console.log("robot secret is ",n),o=[...e];const i=getRandomItems(4,t).join("");console.log("your secret is ",i)},handleScore:function(t){return 0===(o=reducePermutations(o,i,t[0],t[1])).length},getScore:function(t){return scoreGuess(n,t)},getGuess:function(){return i=pick(o)}}}function reducePermutations(t,e,n,o){const i=[...t];return 0===n?i.filter(function(t){return 0===t.reduce(c,0)}):i.filter(function(t){const[e,i]=t.reduce(r,[0,0]);return e===n&&i===o});function c(t,n){return-1!==e.indexOf(n)&&t++,t}function r(t,n,o){const i=e.indexOf(n);return-1!==i&&(t[0]++,i===o&&t[1]++),t}}function pick(t){return t[Math.floor(Math.random()*t.length)]}function getRandomItems(t,e){return shuffle(e).slice(0,t)}function scoreGuess(t,e){return t.reduce(function(t,n,o){const i=e.indexOf(n);-1!==i&&(t[0]+=1,i===o&&(t[1]+=1));return t},[0,0])}function permutations(t,e){const n=[];return function t(e,i,c=[]){if(c.length===i)n.push(c);else for(let n of e){const r=[...c];r.push(n);const s=o(n,e);t(s,i,r)}}(t,e),n;function o(t,e){return e.filter(e=>e!==t)}}function shuffle(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Text({text:t="",fontFamily:e="fantasy",fontSize:n=14,align:o="center",strokeWidth:i=5,color:c,stroke:r,x:s,y:u,fontWeight:f}){let l;const a=`${f?`${f} `:""}${n}px ${e}`;return{render:function(){l.save(),l.font=a,l.textAlign=o,r&&(l.strokeStyle=r,l.lineWidth=i,l.strokeText(t,s,u));l.fillStyle=c,l.fillText(t,s,u),l.restore()},setContext:function(t){l=t},setText:function(e){t=e}}}function World(){const t=document.querySelector("canvas"),e=t.getContext("2d"),n=.3;let o=[],i=[],c=performance.now();return t.width=window.innerWidth,t.height=window.innerHeight,e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",{getBounds:function(){return[t.width,t.height]},moveToTop:function(t){(o=o.filter(e=>e!==t)).push(t)},add:function(t){t.setContext(e),o.push(t),"function"==typeof t.update&&i.push(t)},reset:function(){o=[],i=[],r(c=performance.now())}};function r(s){const u=s-c;!function(t){i.forEach(e=>e.update(t))}(s),u>n&&(c=s,e.clearRect(0,0,t.width-10,t.height-10),o.forEach(t=>t.render())),requestAnimationFrame(r)}}keyboard.subscribe(onKey);
//# sourceMappingURL=g.js.map
