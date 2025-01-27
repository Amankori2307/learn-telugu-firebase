import { useNavigate } from "react-router-dom";
import useRemoveSentenceFromChapter from "../../../hooks/chapter/use-remove-sentence-from-chapter";
import useDeleteVocabularyEntry from "../../../hooks/vocab/use-delete-sentence";
import useMarkVocabularyEntryReviewed from "../../../hooks/vocab/use-mark-sentence-reviewed";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import vocabUtils from "../../../utils/vocab.utils";
import VocabularyEntryUI from "./sentence-item-ui";


interface VocabularyEntryProps {
    vocabularyEntry: IVocabularyEntry;
    onMarkAsReviewed?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
    onRemoveVocabularyEntry?: (id: string) => void;
    chapterId?: string;
}

const VocabularyEntry: React.FC<VocabularyEntryProps> = ({
    vocabularyEntry,
    onMarkAsReviewed,
    onDelete,
    onEdit,
    onRemoveVocabularyEntry,
    chapterId
}) => {
    const navigate = useNavigate();

    // Hooks for handling actions
    const { handleDeleteVocabularyEntry, loading: isLoadingDelete } = useDeleteVocabularyEntry();
    const { handleMarkAsReviewed, loading: isLoadingMarkAsReviewed } = useMarkVocabularyEntryReviewed();
    const { handleRemoveSentence, loading: isLoadingRemoveSentenceFromChapter } = useRemoveSentenceFromChapter();

    // Handle edit action
    const handleEdit = () => {
        navigate(vocabUtils.getEditPageUrl(vocabularyEntry.id));
        if (onEdit) onEdit(vocabularyEntry.id);
    };

    // Handle mark as reviewed action
    const handleMarkReviewed = async () => {
        const success = await handleMarkAsReviewed(vocabularyEntry.id);
        if (success && onMarkAsReviewed) {
            onMarkAsReviewed(vocabularyEntry.id);
        }
    };

    // Handle delete action
    const handleDelete = async () => {
        const success = await handleDeleteVocabularyEntry(vocabularyEntry.id);
        if (success && onDelete) {
            onDelete(vocabularyEntry.id);
        }
    };

    // Handle remove sentence from chapter
    const handleRemoveSentenceFromChapter = async () => {
        if (!chapterId) return;
        const success = await handleRemoveSentence(chapterId, vocabularyEntry.id);
        if (success && onRemoveVocabularyEntry) {
            onRemoveVocabularyEntry(vocabularyEntry.id);
        }
    }

    return (
        <VocabularyEntryUI
            vocabularyEntry={vocabularyEntry}
            onEdit={handleEdit}
            onMarkAsReviewed={handleMarkReviewed}
            onDelete={handleDelete}
            isLoadingMarkAsReviewed={isLoadingMarkAsReviewed}
            isLoadingDelete={isLoadingDelete}
            chapterId={chapterId}
            onRemoveFromChapter={handleRemoveSentenceFromChapter}
            isLoadingRemoveFromChapter={isLoadingRemoveSentenceFromChapter}
        />
    );
};

export default VocabularyEntry;