const ids = ['duration', 'animationType', 'runCount', 'animationProp', 'animationTarget']
const Util = {
  setForm (data) {
    ids.forEach(id => {
      const ele = document.getElementById(id);
      ele.value = data[id]
      if (id === 'animationProp') {
        ele.value = 'state'
      }
    })
  },
  getDataFromForm () {
    return ids.map(id => {
      const ele = document.getElementById(id);
      return ele.value
    })
  },
  createRandom (num, max, min) {
    let result = new Set()
    max = max || 1
    min = min || 0
    while (result.size < num) {
      const random = Math.round(Math.random() * (max - min) + min)
      result.add(random)
    }
    return [...result]
  }
}