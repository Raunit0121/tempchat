import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
