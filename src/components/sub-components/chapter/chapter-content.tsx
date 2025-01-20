import React from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import Loader from "../../shared/loader";
import SentenceList from "../../sub-components/vocab/sentence-list";

interface ChapterContentProps {
  sentences: ISentence[];
  isLoading: boolean;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ sentences, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (sentences.length === 0) {
    return <p className="text-gray-500">No sentences found in this chapter.</p>;
  }

  return <SentenceList sentences={sentences} />;
};

export default ChapterContent;