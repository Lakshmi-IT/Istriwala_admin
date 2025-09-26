import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import PWA service worker register helper
import { registerSW } from 'virtual:pwa-register'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // you can show a toast/banner here asking user to refresh
    console.log('New content available, please refresh.')
  },
  onOfflineReady() {
    // you can show a message like "App ready to use offline"
    console.log('App is ready to work offline.')
  },
})

createRoot(document.getElementById("root")).render(<App />)
