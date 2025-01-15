import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './components/quiz/quiz'
import AddVocab from './components/vocab/add-vocab/add-vocab'
import Header from './components/header/header'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>

          <Route path="/" element={<Quiz />} />
          <Route path="/add-vocab" element={<AddVocab />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
