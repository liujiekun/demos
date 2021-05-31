const Animation = {
  animation:null,
  animateObjects: new Set(),
  diagram: null,
  status:{
    general:'blue',
    warning:'yellow',
    serious:'orange',
    emergency:'red'
  },
  clearMarks(){
    this.diagram.startTransaction('clearShadow')
    this.animateObjects.forEach(node=>{
      if (node) {
        this.diagram.model.setDataProperty(node.data, 'isShadowed', false)
        this.diagram.model.setDataProperty(node.data, 'shadowVisible', false)
      }
    })
    this.diagram.commitTransaction('clearShadow')
    this.animation = null
  },
  clearAnimation(){
    this.animation.stop()
  },
  setState: function (go,diagram,keys,state){
    const _this = this
    _this.animateObjects = new Set()
    _this.diagram = diagram
    go.AnimationManager.defineAnimationEffect('myShadowBlur', function (obj, startValue, endValue, easing, currentTime, duration, animation) {
      var hueValue = easing(currentTime, startValue, endValue - startValue, duration);
      obj.shadowBlur = hueValue;
    });
    if(_this.animation){
      diagram.startTransaction('setShadow')
      keys.forEach(key => {
        const part = diagram.findNodeForKey(key)
        // const safeSet = diagram.model.setDataProperty
        if (part) {
          diagram.model.setDataProperty(part.data, 'shadowColor', _this.status[state])
          _this.animateObjects.add(part)
        }
      })
      diagram.commitTransaction('setShadow')
    } else {
      const animation = new go.Animation();
      animation.duration = 600;
      animation.reversible = true
      animation.easing = go.Animation.EaseLinear;
      // Run indefinitely
      animation.runCount = Infinity;
      diagram.startTransaction('setShadow')
      keys.forEach(key => {
        const part = diagram.findNodeForKey(key)
        // const safeSet = diagram.model.setDataProperty
        if(part){
          diagram.model.setDataProperty(part.data,'isShadowed', true)
          diagram.model.setDataProperty(part.data,'shadowOffset', new go.Point(0, 0))
          diagram.model.setDataProperty(part.data, 'shadowColor', _this.status[state])
          diagram.model.setDataProperty(part.data,'shadowBlur',16)
          diagram.model.setDataProperty(part.data,'shadowVisible' , true)
          animation.add(part, "myShadowBlur", 16, 6)
          _this.animateObjects.add(part)
        }
      })
      diagram.commitTransaction('setShadow')
      _this.animation = animation
      animation.start();
    }
  }
}