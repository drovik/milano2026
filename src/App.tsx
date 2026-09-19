import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { SurveyPage } from './pages/SurveyPage'
import { TopicPage } from './pages/TopicPage'
import { ResultsPage } from './pages/ResultsPage'
import { AboutPage } from './pages/AboutPage'
import { ScrollToTop } from './components/ScrollToTop'

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/topic/:id" element={<TopicPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
