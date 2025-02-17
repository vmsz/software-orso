import { WiMoonAltFirstQuarter } from 'react-icons/wi'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

function ThemeToggler() {
  const [loading, setLoading] = useState(false)

  return (
    <button
      className='relative right-0.5 flex cursor-pointer items-center gap-1 text-center transition-all hover:brightness-responsive active:scale-90'
      onMouseUp={async () => {
        setLoading(true)
        const page = document.body.classList

        if (page.contains('light-theme')) {
          page.remove('light-theme')
          localStorage.setItem('theme', 'dark-theme')
          page.add('dark-theme')
          return setLoading(false)
        }

        page.remove('dark-theme')
        localStorage.setItem('theme', 'light-theme')
        page.add('light-theme')

        setLoading(false)
      }}
    >
      <WiMoonAltFirstQuarter size={32} className='shrink-0' />
      <span className='relative right-0.5 shrink-0 text-sm font-semibold'>Mudar Tema</span>
      <ClipLoader
        size={20}
        color='var(--primary)'
        className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
    </button>
  )
}

export { ThemeToggler }
