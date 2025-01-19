import { useNavigate } from "react-router-dom";
import useReviewSentences from "../../../hooks/use-review-sentences";
import Loader from "../../shared/loader";
import SentenceList from "../../sub-components/vocab/sentence-list";

const ReviewSentencesPage = () => {
  const navigate = useNavigate();
  const { sentences, loading, handleMarkAsReviewed, handleDeleteSentence } =
    useReviewSentences();
  const onEdit = (id: string) => {
    navigate(`/vocab/edit/${id}`)
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Un-reviewed Sentences ({sentences.length})
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <SentenceList
          sentences={sentences}
          onMarkAsReviewed={handleMarkAsReviewed}
          onDelete={handleDeleteSentence}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default ReviewSentencesPage;