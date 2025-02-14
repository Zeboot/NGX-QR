import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import { GenerationContextProvider } from './GenerationContext.tsx'
import { QRContextProvider } from './QRSettings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <GenerationContextProvider>
          <QRContextProvider>
            <App />
          </QRContextProvider>
        </GenerationContextProvider>
      </ThemeProvider>
  </StrictMode>,
)
