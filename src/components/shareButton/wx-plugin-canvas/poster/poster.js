const defaultOptions = {
  selector: '#poster'
}

function Poster(options = {}) {
  options = {
    ...defaultOptions,
    ...options
  }

  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]

  let poster = options.poster
    ? options.poster
    : ctx.selectComponent(options.selector)
  delete options.selector

  return poster
}

Poster.create = (reset = false, posterComp) => {
  const poster = Poster({
    poster: posterComp
  })
  if (!poster) {
    console.error('请设置组件的id="poster"!!!')
  } else {
    return poster.onCreate(reset)
  }
}

export default Poster
