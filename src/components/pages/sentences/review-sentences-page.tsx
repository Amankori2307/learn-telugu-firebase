import { useNavigate } from "react-router-dom";
import useReviewSentences from "../../../hooks/use-review-sentences";
import useSearch from "../../../hooks/use-search";
import Loader from "../../shared/loader";
import SearchInput from "../../shared/search-input";
import SentenceList from "../../sub-components/vocab/sentence-list";

const ReviewSentencesPage = () => {
  const navigate = useNavigate();
  const { sentences, loading, handleMarkAsReviewed, handleDeleteSentence } =
    useReviewSentences();
  const { searchTerm, setSearchTerm, filteredData } = useSearch(sentences);
  const onEdit = (id: string) => {
    navigate(`/vocab/edit/${id}`)
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Un-reviewed Sentences ({filteredData.length}/{sentences.length})
      </h1>
      {/* Search Input */}
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by text or meaning..."
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <SentenceList
          sentences={filteredData}
          onMarkAsReviewed={handleMarkAsReviewed}
          onDelete={handleDeleteSentence}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default ReviewSentencesPage;