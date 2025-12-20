import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
}

function QuizComponent({ questions }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No quiz questions available yet.</p>
        <p className="text-sm text-gray-400 mt-2">
          Quiz questions will be generated after processing your lecture.
        </p>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct_answer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correct_answer;
  const allAnswered = selectedAnswers.every((answer) => answer !== null);

  // Results view
  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete! 🎉</h2>
            <div className="text-6xl font-bold mb-4">
              <span className={score.percentage >= 70 ? 'text-green-600' : 'text-orange-600'}>
                {score.percentage}%
              </span>
            </div>
            <p className="text-xl text-gray-700">
              You got <strong>{score.correct}</strong> out of <strong>{score.total}</strong> correct
            </p>
            {score.percentage >= 90 && (
              <p className="text-green-600 mt-2">Excellent work! You've mastered this material! 🌟</p>
            )}
            {score.percentage >= 70 && score.percentage < 90 && (
              <p className="text-blue-600 mt-2">Good job! You understand most of the concepts. 👍</p>
            )}
            {score.percentage < 70 && (
              <p className="text-orange-600 mt-2">
                Keep studying! Review the notes and try again. 📚
              </p>
            )}
          </div>
        </div>

        {/* Review Answers */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Review Your Answers</h3>
          <div className="space-y-4">
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const wasCorrect = userAnswer === q.correct_answer;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    wasCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">{wasCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        {index + 1}. {q.question}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Your answer:</strong> {q.options[userAnswer!]}
                      </p>
                      {!wasCorrect && (
                        <p className="text-sm text-green-700 mb-1">
                          <strong>Correct answer:</strong> {q.options[q.correct_answer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 mt-2 italic">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRetake}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {allAnswered ? '✅ All answered' : `${selectedAnswers.filter((a) => a !== null).length} answered`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const showCorrect = showExplanation && index === question.correct_answer;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showCorrect
                        ? 'border-green-500 bg-green-500'
                        : showIncorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {showCorrect && <span className="text-white text-sm">✓</span>}
                    {showIncorrect && <span className="text-white text-sm">✗</span>}
                    {isSelected && !showExplanation && <span className="text-white text-sm">•</span>}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-blue-50'}`}>
            <p className="font-semibold text-gray-800 mb-2">
              {isCorrect ? '✅ Correct!' : '💡 Explanation:'}
            </p>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        <div className="flex gap-3">
          {isAnswered && !showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Answer
            </button>
          )}

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
