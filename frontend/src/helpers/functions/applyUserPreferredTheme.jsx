function applyUserPreferredTheme() {
  const page = document.body.classList
  const storedTheme = localStorage.getItem('theme')

  if (storedTheme) {
    return page.add(storedTheme)
  }
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return page.add('light-theme')
    }
  }
  return page.add('dark-theme')
}

export { applyUserPreferredTheme }
