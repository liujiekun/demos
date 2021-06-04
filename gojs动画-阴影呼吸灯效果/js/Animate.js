class Animation {
  constructor(diagram, nodes, animationOpts) {
    this.animation = null
    this.animateObjects = new Set(nodes)
    this.diagram = diagram
    this.animationOpts = animationOpts
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
        this.diagram.model.setDataProperty(node.data, 'shadowVisible', false)
      }
    })
    this.diagram.commitTransaction('clearShadow')
  }
  stopAnimation () {
    this.animation && this.animation.stop()
  }
  start () {
    if (!this.animation) {
      this.animation = new go.Animation();
    }
    this.animation.finished = this.clearMarks.bind(this)
    this.updateAnimation(this.animation, this.animationOpts)
    this.animation.start()
  }
  updateAnimation (animation, opts) {
    const diagram = this.diagram
    const statusMap = Animation.statusMap
    const { duration, animationType, animationTarget, runCount } = opts
    console.log('animationType', animationType)
    animation.duration = duration ? +duration : 600;
    animation.reversible = true
    animation.easing = animationType ? go.Animation[animationType] : go.Animation.EaseInOutQuad;
    // Run indefinitely
    animation.runCount = runCount ? +runCount : Infinity;
    const oldSkip = diagram.skipsUndoManager
    diagram.skipsUndoManager = true
    diagram.startTransaction('setShadow')
    const safeSet = diagram.model.setDataProperty.bind(diagram.model)
    this.animateObjects.forEach(part => {
      if (part) {
        safeSet(part.data, 'isShadowed', true)
        safeSet(part.data, 'shadowOffset', new go.Point(0, 0))
        safeSet(part.data, 'shadowColor', statusMap[animationTarget || 'general'])
        safeSet(part.data, 'shadowBlur', 16)
        safeSet(part.data, 'shadowVisible', true)
        animation.add(part, "myShadowBlur", 16, 6)
      }
    })
    diagram.commitTransaction('setShadow')
    diagram.skipsUndoManager = oldSkip
  }
  updateAnimationOpts ({ animationTarget, duration, animationType, runCount }) {
    this.animationOpts = Object.assign(this.animationOpts, { animationTarget, duration, animationType, runCount })
  }
}