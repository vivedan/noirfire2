/* globals AFRAME */
/* globals NAF */

AFRAME.registerComponent('portal', {
  
  schema: {
    src: {type: 'string', default: ''},
    objects: {type: 'selector'},
    state: {type: 'string', default: ''},
    radius: {type: 'number', default: 0.5},
    pos: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    rot: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    
    
  },
  
  init: function(){
    
    var el = this.el;
    var scene = document.querySelector('a-scene');
    var data = this.data;
    var portal = document.createElement('a-entity');
    var collider = document.createElement('a-sphere');
    var light = document.createElement('a-entity');
    
    portal.setAttribute('gltf-model', data.src);
    portal.setAttribute('scale', {x: 4, y: 4, z: 4});
    portal.setAttribute('position', data.pos);
    portal.setAttribute('rotation', data.rot);
    
    collider.setAttribute('class', "ports");
    collider.setAttribute('scale', {x: 0.05, y: 3, z: 3});
    collider.setAttribute('sphere-collider', {objects: data.objects, state: data.state, radius: data.radius});
    collider.setAttribute('position', data.pos);
    collider.setAttribute('rotation', data.rot);
    
    light.setAttribute('light', {type: 'point', color: data.color, intensity: 5, distance: 7});
    light.setAttribute('position', {x: data.pos.x, y: data.pos.y + 4.5, z: data.pos.z});
    light.setAttribute('rotation', data.rot);
    
    scene.appendChild(portal);
    scene.appendChild(collider);
    scene.appendChild(light);
    
    
    
  }
  
  
});



AFRAME.registerPrimitive('a-portal', {
  
  defaultComponents: {
    portal: {}
  },
  
  mappings: {
    src: 'portal.src',
    objects: 'portal.objects',
    state: 'portal.state',
    radius: 'portal.radius',
    pos: 'portal.pos',
    rot: 'portal.rot',
  },
  
});