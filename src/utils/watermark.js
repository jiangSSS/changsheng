let watermark = {}

let setWatermark = (str, str2) => {
    let id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    can.width = 230
    can.height = 120

    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 90)
    cans.font = '12px Vedana'
    //cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
    cans.fillStyle = '#bfbfbf'   // 字体颜色
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    //cans.fillText(str, can.width / 3, can.height / 2)
    cans.fillText(str, 0, 55)    //第一行字体
    cans.fillText(str2, -10, 75)  //第二行字体

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '12%'
    div.style.right = '20px'
    div.style.left = '15%'
    div.style.opacity = 0.5   //调节字体颜色的深浅
    div.style.position = 'absolute'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight - 140 + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

watermark.set = (str, str2) => {
    let id = setWatermark(str, str2)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str, str2)
        }
    }, 500)
    //   window.onresize = () => {
    //     setWatermark(str)
    //   }
    window.onresize = () => {
        setWatermark(str, str2)
    }
}

export default watermark