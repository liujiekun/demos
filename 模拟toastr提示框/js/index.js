const utils = {
  computePosition(direction,position,height){
    let result = 0
    switch (direction) {
      case 'top':
        console.log('top');
        result = position + height
        break;
      case 'bottom':
        console.log('bottom');
        result = position - height - height
        break;
      default:
        break;
    }
    console.log('result',result);
    return result;
  }
}

const toastr = {
  timer: null,
  instance:null,
  addModal(options){
    let timer = null
    const modalCon = document.createElement('div')
    const classList = ['modal']
    classList.push(options.position)
    modalCon.classList = classList.join(' ')
    if(this.instance){
      if(this.instance.options.position == options.position){
        const direction = options.position.indexOf('top')>-1?'top':'bottom'
        const existDomNum = document.querySelectorAll(`.${options.position}`).length
        modalCon.style[direction] = existDomNum * 120 + 'px'
      }
    }
    const titleDiv = document.createElement('div')
    titleDiv.className = 'modal-title'
    titleDiv.textContent = options.title || ''
    const modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    const msgCon = document.createElement('p')
    msgCon.textContent = options.content || ''
    modalBody.appendChild(msgCon)
    modalCon.appendChild(titleDiv)
    modalCon.appendChild(modalBody)
    const body = document.body
    body.appendChild(modalCon)
    this.instance = modalCon
    this.instance.options = options
    timer = setTimeout(
      function () {
        body.removeChild(modalCon)
      },
      (options.delay || 3000)
    )
    const _this = this
    modalCon.onmouseenter = function(){
      console.log('enter');
      if(timer){
        clearTimeout(timer)
      }
    }
    modalCon.onmouseleave = function(){
      console.log('leave');
      timer = setTimeout(
        function () {
          body.removeChild(modalCon)
        },
        (options.delay || 3000)
      )
    }
  },
  warning(){}
}