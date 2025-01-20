import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/header'
import ChapterDetailsPage from './components/pages/chapter/chapter-detail-page'
import ChaptersPage from './components/pages/chapter/chapters-page'
import QuizPage from './components/pages/quiz/quiz-page'
import ReviewSentencesPage from './components/pages/sentences/review-sentences-page copy'
import SentencesPage from './components/pages/sentences/sentences-page'
import AddVocabPage from './components/pages/vocab/add-vocab-page'
import EditVocabPage from './components/pages/vocab/edit-vocab-page'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-start justify-center py-2">
        <Routes>

          <Route path="/" element={<QuizPage />} />
          <Route path="/review" element={<ReviewSentencesPage />} />
          <Route path="/sentences" element={<SentencesPage />} />
          <Route path="/vocab/add" element={<AddVocabPage />} />
          <Route path="/vocab/edit/:id" element={<EditVocabPage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/chapters/:chapterId" element={<ChapterDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
