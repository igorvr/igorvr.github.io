AFRAME.registerComponent('multitouch-zoom', {
  schema: {
    zst: {type: 'float', default: 0.01},
	zmin: {type: 'float', default: 0.8},
    zmax: {type: 'float', default: 5}
	
  },

  init: function () {
    ca=document.querySelector('canvas');
	ca.cam = this.el;
	ca.multouch = false;
	this.ca = ca;
	ca.zst = this.zst;
	ca.zmax = this.zmax;
	ca.zmin = this.zmin;
	
    ca.addEventListener('touchstart',this.ts);
	ca.addEventListener('touchmove',this.tm);
	ca.addEventListener('touchend',this.te);
  },
  ts: function(e){	
		if(e.touches.length > 1){
			this.multouch=true;
			this.zm = this.cam.getAttribute('zoom');
			this.dd = Math.sqrt((e.touches[0].pageX - e.touches[1].pageX)*(e.touches[0].pageX - e.touches[1].pageX)+(e.touches[0].pageY - e.touches[1].pageY)*(e.touches[0].pageY - e.touches[1].pageY));
		}
	
  },
  te: function(e){
		this.multouch=false;
  },
  tm: function(e){
		if(this.multouch && e.touches.length > 1){
			dd=Math.sqrt((e.touches[0].pageX - e.touches[1].pageX)*(e.touches[0].pageX - e.touches[1].pageX)+(e.touches[0].pageY - e.touches[1].pageY)*(e.touches[0].pageY - e.touches[1].pageY));
			this.zm = parseFloat(this.zm + (dd - this.dd)*this.zst);
			this.dd = dd;
			if(this.zm<this.zmin)return this.zm=this.zmin;
			this.cam.setAttribute('zoom', parseFloat(this.zm));
			
			
		}this.tmv2=e;
  },
  update: function () {
    this.ca.zst = this.data.zst;
	this.ca.zmin = this.data.zmin;
	this.ca.zmax = this.data.zmax;
  },

  remove: function () {
    this.ca.removeEventListener('touchmove',this.tm);
	this.ca.removeEventListener('touchend',this.te);
	this.ca.removeEventListener('touchstart',this.ts);
	
	
  }
});	

