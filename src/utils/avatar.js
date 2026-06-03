import { resolvePublicPath } from './paths'

function generateInitialsAvatar(initials = 'U', size = 128, bg = null, fg = '#fff') {
  const colors = ['#0ea5e9', '#7c3aed', '#ef4444', '#f97316', '#059669', '#db2777', '#0ea5e9']
  let bgColor = bg
  if (!bgColor) {
    const charCode = initials.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    bgColor = colors[charCode % colors.length]
  }

  const fontSize = Math.floor(size * 0.42)
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <rect width='100%' height='100%' fill='${bgColor}' rx='${size * 0.2}'/>
    <text x='50%' y='50%' dy='0.35em' text-anchor='middle' font-family='Inter, Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial' font-size='${fontSize}' fill='${fg}' font-weight='700'>${initials}</text>
  </svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function getAvatarSrc(contentHeader = {}, size = 128) {
  try {
    const avatar = contentHeader?.avatar
    if (avatar && typeof avatar === 'string') {
      if (/^data:|^https?:\/\//i.test(avatar)) return avatar
      return resolvePublicPath(avatar)
    }
  } catch (e) {
    // ignore and fallback
  }

  const initials = (contentHeader?.initials || (contentHeader?.name || 'U').split(' ').map(n => n[0]).join('').slice(0,2)).toUpperCase()
  return generateInitialsAvatar(initials, size)
}
