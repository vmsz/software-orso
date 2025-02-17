import './style.css'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spreadsheet } from './pages/Spreadsheet'
import { applyUserPreferredTheme } from './helpers/functions/applyUserPreferredTheme'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000,
    },
  },
})

applyUserPreferredTheme()

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className='bg-base flex h-screen w-screen font-Inter text-md text-primary antialiased'>
        <Routes>
          <Route path='/' element={<Spreadsheet />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>,
)
