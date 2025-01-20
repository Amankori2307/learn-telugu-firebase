import React from "react";

interface PopupFooterProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

const PopupFooter: React.FC<PopupFooterProps> = ({
  onClose,
  onSubmit,
  loading,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {loading ? "Adding..." : "Add Sentences"}
      </button>
    </div>
  );
};

export default PopupFooter;