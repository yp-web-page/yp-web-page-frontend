import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './routes/Routes.tsx'

const root = document.getElementById('root')

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
