import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Card from './Card';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Theo Lão Tử, 'Đạo' có đặc điểm gì?",
    options: [
      "Là nguyên lý tối cao, vĩnh hằng và bất biến",
      "Là thực thể vật chất cụ thể",
      "Chỉ tồn tại trong tư duy con người",
      "Là sản phẩm của xã hội phong kiến"
    ],
    correct: 0,
    explanation: "Đạo trong tư tưởng Lão Tử là nguyên lý tối cao của vũ trụ, vĩnh hằng và bất biến, là nguồn gốc của vạn vật."
  },
  {
    id: 2,
    question: "Phép biện chứng trong tư tưởng Lão Tử thể hiện qua:",
    options: [
      "Sự đấu tranh giai cấp",
      "Mối quan hệ Âm - Dương",
      "Phát triển công nghệ",
      "Cải cách chính trị"
    ],
    correct: 1,
    explanation: "Âm-Dương trong triết học Lão Tử thể hiện tính biện chứng: hai mặt đối lập thống nhất, chuyển hóa lẫn nhau."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const question = questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <HelpCircle className="w-6 h-6 text-teal-600 mr-2" />
        <h3 className="text-xl font-serif font-bold text-gray-900">
          Kiểm tra hiểu biết
        </h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Câu hỏi {currentQuestion + 1} / {questions.length}</span>
          <span>Điểm: {score}/{questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h4 className="text-lg font-medium text-gray-900 mb-6">
        {question.question}
      </h4>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !showResult && handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? showResult
                  ? index === question.correct
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-teal-500 bg-teal-50'
                : showResult && index === question.correct
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && (
                <span>
                  {index === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : null}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <h5 className="font-medium text-blue-900 mb-2">Giải thích:</h5>
            <p className="text-blue-800">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Trả lời
          </button>
        ) : (
          <div className="flex space-x-4">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Câu tiếp theo
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
              >
                Làm lại
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Quiz;