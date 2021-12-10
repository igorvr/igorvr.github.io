let cdnow = new Date();
let cmcurrent = document.querySelector("#m"+(cdnow.getMonth()+1));
cmcurrent.style.zIndex = 5;
document.querySelector("#m"+(cdnow.getMonth()+1)+" .d"+cdnow.getDate()).style.color="#ff8b00";

let cmnames = document.querySelectorAll('.cmname');
for(let i in cmnames){
  cmnames[i].onclick = cmnclick;
}

function cmnclick(e){
	cmcurrent.style.zIndex = 1;
	cmcurrent = document.querySelector( "#"+e.target.classList[2] );
	cmcurrent.style.zIndex = 5;
}

function cFont(){
	let d=document.querySelector('.cdate');
  let w=document.querySelector('#calwrap');
 
	
  this.do = function(){
    w.style.fontSize = d.offsetHeight; 
  }
  this.do()
}

let wwcal = new cFont;
window.onresize = wwcal.do 