import React from 'react';
import useCanvasQuestions from '@/hooks/useCanvasQuestions';

/**
 * Component that displays guided questions for a specific BMC segment
 */
const SegmentQuestions = ({ segment, userId = null }) => {
  const { questions, loading, error } = useCanvasQuestions(segment, userId);

  if (loading) {
    return (
      <div className="p-4 bg-gray-50 rounded-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p>Unable to load questions: {error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
        <p>No guided questions available for this segment.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-md">
      <h4 className="font-medium text-blue-800 mb-2">Guided Questions</h4>
      <ul className="list-disc pl-5 space-y-1">
        {questions.map((question: string, index: number) => (
          <li key={index} className="text-sm text-blue-700">{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default SegmentQuestions;
