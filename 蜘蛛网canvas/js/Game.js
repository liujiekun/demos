class Game {
  constructor(id, num) {
    this.id = id
    this.context = null
    this.spirits = []
    this.num = num
    this.margin = 10
    this.spiritRadius = 10
    this.collisionDistance = 120
    this.collisionMap = {}
    this.mouse = {}
    this.init(id)
  }
  init (id) {
    const _this = this
    const canvas = document.getElementById(id)
    const canvasBounds = canvas.getBoundingClientRect()
    const { width, height } = canvasBounds
    this.context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    this.context.width = width
    this.context.height = height
    for (let i = 0; i < this.num; i++) {
      this.spirits.push(new Spirit(width, height, this.spiritRadius))
    }
    this.draw()
    requestAnimationFrame(this.move.bind(this))
    canvas.onmousemove = function (e) {
      const mouseposition = { x: e.offsetX, y: e.offsetY }
      _this.mouse.position = mouseposition
      _this.spirits['mouse'] = { position: mouseposition }
    }
    canvas.onmouseleave = function () {
      this.mouse = {}
    }
  }
  draw () {
    this.context.clearRect(0, 0, this.context.width, this.context.height)
    for (let i = 0, len = this.spirits.length; i < len; i++) {
      const spirit = this.spirits[i]
      this.context.beginPath()
      this.context.arc(spirit.position.x, spirit.position.y, 10, 0, Math.PI * 2, false)
      this.context.stroke()
      this.context.closePath()
    }
    if (this.mouse.position) {
      this.context.beginPath()
      this.context.arc(this.mouse.position.x, this.mouse.position.y, 10, 0, Math.PI * 2, false)
      this.context.stroke()
      this.context.closePath()
    }
  }
  move () {
    for (let i = 0, len = this.spirits.length; i < len; i++) {
      const spirit = this.spirits[i]
      spirit.position.x += spirit.vX
      spirit.position.y += spirit.vY
      if (spirit.position.x > this.context.width - this.margin || spirit.position.x < this.margin) {
        spirit.vX = -spirit.vX
      }
      if (spirit.position.y > this.context.height - this.margin || spirit.position.y < this.margin) {
        spirit.vY = -spirit.vY
      }
    }
    this.collision()
    this.draw()
    this.drawLines()
    requestAnimationFrame(this.move.bind(this))
  }
  collision () {
    this.collisionMap = {}
    const len = this.spirits.length
    for (let i = 0; i < len; i++) {
      const sourceSpirit = this.spirits[i]
      if (this.mouse.position) {
        const mouseDis = Util.calcDistance(sourceSpirit.position, this.mouse.position)
        if (mouseDis <= this.collisionDistance) {
          sourceSpirit.position.x -= 0.03 * (sourceSpirit.position.x - this.mouse.position.x)
          sourceSpirit.position.y -= 0.03 * (sourceSpirit.position.y - this.mouse.position.y)
          if (!this.collisionMap['mouse']) {
            this.collisionMap['mouse'] = {}
          }
          this.collisionMap['mouse'][i] = { dis: mouseDis }
        }
      }
      for (let j = 0; j < len; j++) {
        if (j == i) continue;
        const targetSpirit = this.spirits[j]
        const distance = Util.calcDistance(sourceSpirit.position, targetSpirit.position)
        if (distance <= this.collisionDistance) {
          if (this.collisionMap[i] && (!this.collisionMap[j] || !this.collisionMap[j][i])) {
            this.collisionMap[i][j] = { dis: distance }
          } else {
            this.collisionMap[i] = {}
            this.collisionMap[i][j] = { dis: distance }
          }
        }
      }
    }
  }
  drawLines () {
    this.context.save()
    for (let sourceIndex in this.collisionMap) {
      const sourceSpirit = this.spirits[sourceIndex]
      if (this.collisionMap[sourceIndex]) {
        for (let j in this.collisionMap[sourceIndex]) {
          const targetSpirit = this.spirits[j]
          const { dis } = this.collisionMap[sourceIndex][j]
          this.context.beginPath()
          const { x: fromX, y: fromY } = sourceSpirit.position
          const { x: toX, y: toY } = targetSpirit.position
          this.context.moveTo(fromX, fromY)
          this.context.lineTo(toX, toY)
          this.context.closePath()
          this.context.lineWidth = 6 * (1 - dis / this.collisionDistance)
          this.context.stroke()
        }
      }
    }
    this.context.restore()
  }
}