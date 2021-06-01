class Animation {
  constructor() {
    this.animation = null
    this.animateObjects = new Set()
    this.diagram = null
  }
  static statusMap = {
    general: 'blue',
    warning: 'yellow',
    serious: 'orange',
    emergency: 'red'
  }
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
  }
  clearAnimation(){
    this.animation && this.animation.stop()
  }
  setState (go, diagram, keys, state, duration, animationType, runCount) {
    const _this = this
    _this.animateObjects = new Set()
    _this.diagram = diagram
    const statusMap = Animation.statusMap
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
          diagram.model.setDataProperty(part.data, 'shadowColor', statusMap[state])
          _this.animateObjects.add(part)
        }
      })
      diagram.commitTransaction('setShadow')
    } else {
      const animation = new go.Animation();
      animation.duration = duration ? +duration : 600;
      animation.reversible = true
      animation.easing = animationType ? go.Animation[animationType] : go.Animation.EaseInOutQuad;
      // Run indefinitely
      animation.runCount = runCount || Infinity;
      diagram.startTransaction('setShadow')
      keys.forEach(key => {
        const part = diagram.findNodeForKey(key)
        const safeSet = diagram.model.setDataProperty.bind(diagram.model)
        if(part){
          safeSet(part.data, 'isShadowed', true)
          safeSet(part.data, 'shadowOffset', new go.Point(0, 0))
          safeSet(part.data, 'shadowColor', statusMap[state])
          safeSet(part.data, 'shadowBlur', 16)
          safeSet(part.data, 'shadowVisible', true)
          animation.add(part, "myShadowBlur", 16, 6)
          _this.animateObjects.add(part)
        }
      })
      diagram.commitTransaction('setShadow')
      _this.animation = animation
    }
    return _this.animation
    // _this.animation.start();
  }
}