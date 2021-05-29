class Spirit {
  constructor(width, height, radius) {
    this.position = {
      x: Math.floor(Util.createRandomBetween(radius, width - radius)),
      y: Math.floor(Util.createRandomBetween(radius, height - radius))
    }
    this.vX = Util.createRandomBetween(1, 5) * 0.3
    this.vY = Util.createRandomBetween(1, 5) * 0.3
  }
}