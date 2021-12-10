function wwcalbuild(){
  let cal={};
    
  let d = new Date();
  
  let form = new Intl.DateTimeFormat('ru',{month: 'long'});
  let formsh = new Intl.DateTimeFormat('ru',{month: 'short'});
  let mshort = String('янв фев мар апр май июнь июль авг сен окт ноя дек').split(' ');
  
  let alt = true;
    
  for ( let i=0; i<=11; i++){
    let da;
    cal[String(i+1)]={};
	cal[String(i+1)].dates={};
	cal[String(i+1)].name=form.format(d.setMonth(i));
	cal[String(i+1)].namesh=mshort[i];
	
    
    if(alt){
      da = 31;
      alt = false;
      if(i==6) alt=true;
    }else{
      da = 30;
      alt = true;
    }
    if(i==1) da = 29;
    
    for( let j = 1; j <= da; j++){
		let m = (i<9)?("0"+(i+1)):(i+1);
		let d = (j<10)?("0"+j):j;
      cal[String(i+1)].dates[String(j)]={};
      cal[String(i+1)].dates[String(j)].name=j;
      cal[String(i+1)].dates[String(j)].ref="calendar/"+d+"-"+m+"/";
    }
  }
  return cal;
}

function caldiv(cal){
	let cwrap=document.querySelector('#calwrap');
 	
	let cm = document.createElement('div');
    cm.classList.add('cmonth');
	cm.id = "cfill";
    cwrap.appendChild(cm);
	
	let chw = document.createElement('div');
	chw.classList.add('cheadw');
	cm.appendChild(chw);
	let ch = document.createElement('div');
	ch.classList.add('chead');
	chw.appendChild(ch);
	
	for( let i = 0; i<47; i++ ){
		if( i<35 ){
			let cdw = document.createElement('div');
			cdw.classList.add("cdatew");
			cm.appendChild(cdw);
		}else{
			let mnw=document.createElement('div');
			mnw.classList.add('cmnamew');
			cm.appendChild(mnw);
		}
	
	}
	
  
	for( let i in cal ){
		
		let cm = document.createElement('div');
		cm.id = "m"+ i;
		cm.classList.add('cmonth');
		cwrap.appendChild(cm);
		
		let chw = document.createElement('div');
		chw.classList.add('cheadw');
		cm.appendChild(chw);
		let ch = document.createElement('div');
		ch.classList.add('chead');
		ch.innerText = cal[i].name;
		chw.appendChild(ch);
  
		for( let j in cal[i].dates){
            
			let cdw = document.createElement('div');
			cdw.classList.add("cdatew");
			cm.appendChild(cdw);
	  
			//cdw.onclick = function(e){alert(e);}
	  
			let cd = document.createElement('div');
			cd.classList.add("cdate", "d"+ j);
			cd.innerText = j;
			cdw.appendChild(cd);
      
			let da = document.createElement('a');
			da.classList.add("cdancor");
			da.href = cal[i].dates[j].ref;
			cdw.appendChild(da);
      
		}
	
		let df = document.createElement('div');
		df.classList.add("dfill");
		cm.appendChild(df);
	
		for(  let k=1; k<=12; k++){
			let mnw=document.createElement('div');
			mnw.classList.add('cmnamew');
			cm.appendChild(mnw);
			
			let mn=document.createElement('div');
			mn.classList.add('cmname', 'nlong', 'm'+k );
			mn.innerText = cal[k].name;
			if( k == i ) mn.classList.add('mnthis');
			mnw.appendChild(mn);
			
			let mnsh=document.createElement('div');
			mnsh.classList.add('cmname', 'nshort', 'm'+k );
			mnsh.innerText = cal[k].namesh;
			if( k == i ) mnsh.classList.add('mnthis');
			mnw.appendChild(mnsh);
			
		}
	
  
	}
}