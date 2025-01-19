import useReviewSentences from "../../../hooks/use-review-sentences";
import Loader from "../../shared/loader";
import SentenceList from "../../sub-components/vocab/sentence-list";

const ReviewSentencesPage = () => {
  const { sentences, loading, handleMarkAsReviewed, handleDeleteSentence } =
    useReviewSentences();

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
        />
      )}
    </div>
  );
};

export default ReviewSentencesPage;