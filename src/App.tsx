import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './components/quiz/quiz'
import AddVocab from './components/vocab/add-vocab/add-vocab'
import Header from './components/header/header'
import ReviewSentences from './components/vocab/review/review-sentences'
import SentencesPage from './components/pages/sentences/sentence-page'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>

          <Route path="/" element={<Quiz />} />
          <Route path="/add-vocab" element={<AddVocab />} />
          <Route path="/review" element={<ReviewSentences />} />
          <Route path="/sentences" element={<SentencesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
