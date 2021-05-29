const Util = {
  createRandomBetween (min, max) {
    return min + Math.random() * (max - min)
  },
  calcDistance (p1, p2) {
    const disX = p1.x - p2.x
    const disY = p1.y - p2.y
    return Math.sqrt(disX * disX + disY * disY)
  }
}