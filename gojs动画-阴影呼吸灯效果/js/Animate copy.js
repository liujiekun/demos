class Animation {
  constructor(diagram, nodes, animationOpts) {
    this.animation = null
    this.animateObjects = new Set(nodes)
    this.diagram = diagram
    this.animationOpts = animationOpts
    this.init()
  }
  static statusMap = {
    general: 'blue',
    warning: 'yellow',
    serious: 'orange',
    emergency: 'red'
  }
  clearMarks(){
    this.stopAnimation()
    this.diagram.startTransaction('clearShadow')
    this.animateObjects.forEach(node=>{
      if (node) {
        this.diagram.model.setDataProperty(node.data, 'isShadowed', false)
      }
    })
    this.diagram.commitTransaction('clearShadow')
  }
  stopAnimation () {
    this.animation && this.animation.stop()
  }
  init () {
    const _this = this
    const statusMap = Animation.statusMap
    const diagram = _this.diagram
    go.AnimationManager.defineAnimationEffect('myShadowBlur', function (obj, startValue, endValue, easing, currentTime, duration, animation) {
      var hueValue = easing(currentTime, startValue, endValue - startValue, duration);
      obj.shadowBlur = hueValue;
    });
    const animation = new go.Animation();
    const { duration, animationType, animationTarget, runCount } = _this.animationOpts
    animation.duration = duration ? +duration : 600;
    animation.reversible = true
    animation.easing = animationType ? go.Animation[animationType] : go.Animation.EaseInOutQuad;
    // Run indefinitely
    animation.runCount = runCount ? +runCount : Infinity;
    const oldSkip = diagram.skipsUndoManager
    diagram.skipsUndoManager = true
    diagram.startTransaction('setShadow')
    const safeSet = diagram.model.setDataProperty.bind(diagram.model)
    _this.animateObjects.forEach(part => {
      if (part) {
        safeSet(part.data, 'isShadowed', false)
        safeSet(part.data, 'shadowOffset', new go.Point(0, 0))
        console.log('animationTarget', animationTarget)
        safeSet(part.data, 'shadowColor', statusMap[animationTarget || 'general'])
        safeSet(part.data, 'shadowBlur', 16)
        safeSet(part.data, 'shadowVisible', true)
        animation.add(part, "myShadowBlur", 16, 6)
      }
    })
    diagram.commitTransaction('setShadow')
    diagram.skipsUndoManager = oldSkip
    _this.animation = animation
  }
  start () {
    const _this = this
    const statusMap = Animation.statusMap
    if (_this.animation) {
      const oldSkip = _this.diagram.skipsUndoManager
      _this.diagram.skipsUndoManager = true
      _this.diagram.startTransaction('setShadow')
      const safeSet = _this.diagram.model.setDataProperty.bind(_this.diagram.model)
      _this.animateObjects.forEach(part => {
        safeSet(part.data, 'isShadowed', true)
      })
      _this.diagram.commitTransaction('setShadow')
      _this.diagram.skipsUndoManager = oldSkip
      _this.animation.start();
    }
  }
}