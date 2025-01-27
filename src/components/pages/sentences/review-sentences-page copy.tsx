import useFetchVocabulary from "../../../hooks/use-fetch-sentences";
import useSearch from "../../../hooks/use-search";
import Loader from "../../shared/loader";
import SearchInput from "../../shared/search-input";
import SentenceList from "../../sub-components/vocab/sentence-list";

const ReviewVocabPage = () => {
  const { vocabularyEntries: sentences, loading, reloadVocabulary: reloadSentences } = useFetchVocabulary(false);
  const { searchTerm, setSearchTerm, filteredData } = useSearch(sentences);
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
          onDelete={reloadSentences}
          onMarkAsReviewed={reloadSentences}
        />
      )}
    </div>
  );
};

export default ReviewVocabPage;