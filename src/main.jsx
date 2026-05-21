import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { LangProvider } from './contexts/LangContext'
import { AuthProvider } from './contexts/AuthContext'

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="524457965796-p7jjhpr24e1ourbjanpseq6umrqbruma.apps.googleusercontent.com">
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <LangProvider>
            <App />
          </LangProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)
