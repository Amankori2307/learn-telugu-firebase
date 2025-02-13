// components/QuizLoader.tsx
import React from "react";

interface QuizLoaderProps {
  message: string;
}

const QuizLoader: React.FC<QuizLoaderProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-xl">{message}</p>
    </div>
  );
};

export default QuizLoader;
