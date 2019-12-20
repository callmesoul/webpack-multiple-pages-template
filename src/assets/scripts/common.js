// rem
(function (doc, win, designSize, htmlFontSize) {
  var docEl = doc.documentElement
  var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  var dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1
  dpr = window.top === window.self ? dpr : 1 // 被iframe引用时，禁止缩放
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  docEl.dataset.dpr = dpr
  var recalc = function () {
    var width = docEl.clientWidth
    if (width / dpr > designSize) {
      width = designSize * dpr
    }
    docEl.dataset.width = width
    docEl.dataset.percent = htmlFontSize * (width / designSize)
    docEl.style.fontSize = htmlFontSize * (width / designSize) + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
})(document, window, 640, 100)
