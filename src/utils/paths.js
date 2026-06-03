function resolvePublicPath(path) {
  if (!path) return path
  if (/^data:|^https?:\/\//i.test(path)) return path

  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
  const b = base.endsWith('/') ? base.slice(0, -1) : base

  if (path.startsWith('/')) {
    return `${b}${path}`
  }

  return `${b}/${path.replace(/^\/+/, '')}`
}

export { resolvePublicPath }
