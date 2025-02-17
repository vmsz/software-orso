/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: 'Inter',
      },
      fontSize: {
        md: '1rem',
      },
      colors: {
        base: 'var(--base)',
        cell: 'var(--cell)',
        cellHovered: 'var(--cellHovered)',
        button: 'var(--button)',
        header: 'var(--header)',
        toolbar: 'var(--toolbar)',
        modal: 'var(--modal)',
        modalContainer: 'var(--modal-container)',
        modalContainerVariant: 'var(--modal-container-variant)',
        menu: 'var(--menu)',
        tooltip: 'var(--tooltip)',
        error: 'var(--error)',

        accent: 'var(--accent)',
        accentVariant: 'var(--accent-variant)',

        inputs: 'var(--inputs)',

        border: 'var(--border)',
        borderVariant: 'var(--border-variant)',
        borderSpreadsheet: 'var(--border-spreadsheet)',

        firstLevelItem: 'var(--first-level-item)',
        secondLevelItem: 'var(--second-level-item)',
        thirdLevelItem: 'var(--third-level-item)',
        fourthLevelItem: 'var(--fourth-level-item)',
        fifthLevelItem: 'var(--fifth-level-item)',

        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        inactive: 'var(--inactive)'
      },
      brightness: {
        'responsive': 'var(--brightness)',
      },
    },

  },
  plugins: [
    tailwindScrollbar({ nocompatible: true })
  ],
}
