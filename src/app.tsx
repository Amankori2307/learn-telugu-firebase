import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import ChapterDetailsPage from "./components/pages/chapter/chapter-detail-page";
import ChaptersPage from "./components/pages/chapter/chapters-page";
import QuizPage from "./components/pages/quiz/quiz-page";
import AddVocabPage from "./components/pages/vocab/add-vocab-page";
import EditVocabPage from "./components/pages/vocab/edit-vocab-page";
import ReviewVocabPage from "./components/pages/vocab/review-vocab-page copy";
import VocabPage from "./components/pages/vocab/vocab-page";
import Back from "./components/shared/back";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="bg-gray-100 relative">
        <div className="py-7"></div>
        <div className="absolute top-0 left-0 px-3 pt-7 pb-2 sm:p-10 z-10 mt-12">
          <Back />
        </div>
        <div className="min-h-screen  flex items-start justify-center py-2">
          <Routes>
            <Route path="/" element={<QuizPage />} />
            <Route path="/review" element={<ReviewVocabPage />} />
            <Route path="/vocab" element={<VocabPage />} />
            <Route path="/vocab/add" element={<AddVocabPage />} />
            <Route path="/vocab/edit/:id" element={<EditVocabPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route
              path="/chapters/:chapterId"
              element={<ChapterDetailsPage />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
