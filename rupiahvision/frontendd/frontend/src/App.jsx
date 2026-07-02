import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import DetectionPage from './pages/DetectionPage'
import HistoryPage from './pages/HistoryPage'
import BanknotesPage from './pages/BanknotesPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/deteksi" element={<DetectionPage />} />
        <Route path="/riwayat" element={<HistoryPage />} />
        <Route path="/nominal" element={<BanknotesPage />} />
        <Route path="/tentang" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
