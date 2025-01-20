import { useNavigate } from "react-router-dom";
import useDeleteSentence from "../../../hooks/vocab/use-delete-sentence";
import useMarkSentenceReviewed from "../../../hooks/vocab/use-mark-sentence-reviewed";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import vocabUtils from "../../../utils/vocab.utils";
import SentenceItemUI from "./sentence-item-ui";


interface SentenceItemProps {
    sentence: ISentence;
    onMarkAsReviewed?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const SentenceItem: React.FC<SentenceItemProps> = ({
    sentence,
    onMarkAsReviewed,
    onDelete,
    onEdit,
}) => {
    const navigate = useNavigate();

    // Hooks for handling actions
    const { handleDeleteSentence, loading: isLoadingDelete } = useDeleteSentence();
    const { handleMarkAsReviewed, loading: isLoadingMarkAsReviewed } = useMarkSentenceReviewed();

    // Handle edit action
    const handleEdit = () => {
        navigate(vocabUtils.getEditPageUrl(sentence.id));
        if (onEdit) onEdit(sentence.id);
    };

    // Handle mark as reviewed action
    const handleMarkReviewed = async () => {
        const success = await handleMarkAsReviewed(sentence.id);
        if (success && onMarkAsReviewed) {
            onMarkAsReviewed(sentence.id);
        }
    };

    // Handle delete action
    const handleDelete = async () => {
        const success = await handleDeleteSentence(sentence.id);
        if (success && onDelete) {
            onDelete(sentence.id);
        }
    };

    return (
        <SentenceItemUI
            sentence={sentence}
            onEdit={handleEdit}
            onMarkAsReviewed={handleMarkReviewed}
            onDelete={handleDelete}
            isLoadingMarkAsReviewed={isLoadingMarkAsReviewed}
            isLoadingDelete={isLoadingDelete}
        />
    );
};

export default SentenceItem;