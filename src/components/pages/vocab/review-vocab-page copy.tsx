import useFetchVocabulary from "../../../hooks/use-fetch-vocabulary";
import useSearch from "../../../hooks/use-search";
import Loader from "../../shared/loader";
import SearchInput from "../../shared/search-input";
import VocabList from "../../sub-components/vocab/vocab-list";

const ReviewVocabPage = () => {
  const { vocabularyEntries, loading, reloadVocabulary } = useFetchVocabulary(false);
  const { searchTerm, setSearchTerm, filteredData } = useSearch(vocabularyEntries);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Un-reviewed Vocabulary ({filteredData.length}/{vocabularyEntries.length})
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
        <VocabList
          vocabularyEntryList={filteredData}
          onDelete={reloadVocabulary}
          onMarkAsReviewed={reloadVocabulary}
        />
      )}
    </div>
  );
};

export default ReviewVocabPage;