
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,1000);
camera.position.set(0,0,6);

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff,3);
light.position.set(3,5,4);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,1));

const geo=new THREE.CylinderGeometry(1,1,0.12,64);
const mat=new THREE.MeshStandardMaterial({
 color:0xffd700,
 metalness:1,
 roughness:0.18
});
const coin=new THREE.Mesh(geo,mat);
coin.rotation.z=Math.PI/2;
scene.add(coin);

let heads=0,tails=0,anim=false;

function flip(){
 if(anim) return;
 anim=true;
 const isHeads=Math.random()<0.5;
 const target=(Math.random()*10+15)*Math.PI+(isHeads?0:Math.PI);

 let t=0;
 const startY=coin.rotation.y;

 function step(){
   t+=0.015;
   coin.position.y=Math.sin(t*Math.PI)*2.2;
   coin.rotation.x+=0.45;
   coin.rotation.y=startY+(target-startY)*Math.min(t,1);

   if(t<1){
      requestAnimationFrame(step);
   }else{
      coin.position.y=0;
      coin.rotation.y=target;
      document.getElementById('result').textContent=isHeads?'🟡 TESTA':'⚪ CROCE';
      if(isHeads){
        heads++;
        document.getElementById('headsCount').textContent=heads;
      }else{
        tails++;
        document.getElementById('tailsCount').textContent=tails;
      }
      anim=false;
   }
 }
 step();
}

document.getElementById('flipBtn').addEventListener('click',flip);

addEventListener('resize',()=>{
 camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});

const particles=[];
for(let i=0;i<200;i++){
 const p=new THREE.Mesh(
   new THREE.SphereGeometry(0.02,8,8),
   new THREE.MeshBasicMaterial({color:0xffffff})
 );
 p.position.set((Math.random()-0.5)*20,(Math.random()-0.5)*20,(Math.random()-0.5)*20);
 scene.add(p);
 particles.push(p);
}

function animate(){
 requestAnimationFrame(animate);
 particles.forEach((p,i)=>{
   p.rotation.x+=0.01;
   p.position.y+=Math.sin(Date.now()*0.001+i)*0.001;
 });
 renderer.render(scene,camera);
}
animate();
