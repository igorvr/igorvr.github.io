AFRAME.registerComponent('objmat-loader', {
  schema: {
    nmap: {type: 'string'},
	envmap: {type:'string'},
	obj: {type: 'model'},
	reflectivity: {type: 'float'},
	opacity: {type: 'float'},
	refraction: {type: 'float'}
  },

  init: function () {
    this.model = null;
    this.objLoader = new THREE.OBJLoader();
	//this.nmap = null;
    //this.nmapLoader = null;
    // Allow cross-origin images to be loaded.
   
  },

  update: function () {
    var data = this.data;
    if (!data.obj) { return; }
    this.remove();
    this.loadObj(data.obj, data.nmap, data.envmap, data.opacity, data.refraction, data.reflectivity);
  },

  remove: function () {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
  },

  loadObj: function (objUrl, nmapUrl, envmapUrl, opacity, refraction, reflectivity) {
    var self = this;
    var el = this.el;
    var nmapLoader = this.nmapLoader;
    var objLoader = this.objLoader;

    if (nmapUrl || envmapUrl) {
      // .OBJ with an .nmap.
      if (el.hasAttribute('material')) {
        warn('Material component properties are ignored when a .nmap is provided');
      }
      //nmapLoader.setPath(nmapUrl.substr(0, nmapUrl.lastIndexOf('/') + 1));
//nmapLoader = new THREE.TextureLoader();
	  //nmapLoader.load(nmapUrl, function (materials) {
        objLoader.load(objUrl, function (objModel) {
		  self.model = objModel;
          
		  objModel.children[0].material = new THREE.MeshPhongMaterial();
		  
		  if( envmapUrl ){
			new THREE.TextureLoader().load(envmapUrl, function(t, l = el){
				self.model.children[0].material.envMap = t;
				self.model.children[0].material.envMap.mapping = THREE.EquirectangularRefractionMapping;
				self.model.children[0].material.needsUpdate=true;
				alert(l.id);
				self.model.el.setAttribute('dynamic-body','');
				
			});
			
		  }
		  if(nmapUrl)objModel.children[0].material.normalMap = new THREE.TextureLoader().load(nmapUrl);
		  if( reflectivity ){
		    objModel.children[0].material.reflectivity = reflectivity;
		  }
		  if( refraction ){
		    objModel.children[0].material.refractionRatio = refraction;
		  }
		   if( opacity ){
		    objModel.children[0].material.transparent = true;
			objModel.children[0].material.opacity = opacity;
		  }
		  

		  
		  el.setObject3D('mesh', objModel);
		  //el.object3D.children[0].children[0].material.normaumpMap = nmap;
          el.emit('model-loaded', {format: 'obj', model: objModel});
		  try{document.querySelector('*[raycaster]').components.raycaster.refreshObjects();}catch(e){}
        });
      //});
      return;
    }

    // .OBJ only.
    objLoader.load(objUrl, function loadObjOnly (objModel) {
      // Apply material.
      var material = el.components.material;
      if (material) {
        objModel.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = material.material;
          }
        });
      }

      self.model = objModel;
      el.setObject3D('mesh', objModel);
      el.emit('model-loaded', {format: 'obj', model: objModel});
    });
  }
});	

/*	  uniforms = {
    iGlobalTime: { type: "f", value: 1.0 },
    iResolution: { type: "v1", value: new THREE.Vector2(), }
  };


  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  
   objModel.children[0].material = material;
   
   startTime = Date.now();
function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  var currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.001;
  AFRAME.scenes[0].render();
}
*/