import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, Lightbulb } from 'lucide-react';
import Card from './Card';

interface CrosswordCell {
  letter: string;
  isBlocked: boolean;
  wordId?: number;
  position?: number;
  userInput?: string;
  isCorrect?: boolean;
}

interface CrosswordWord {
  id: number;
  word: string;
  clue: string;
  startRow: number;
  startCol: number;
  direction: 'horizontal' | 'vertical';
  isCompleted: boolean;
}

const crosswordData: CrosswordWord[] = [
  {
    id: 1,
    word: 'DAO',
    clue: 'Khái niệm trung tâm trong triết học Lão Tử',
    startRow: 1,
    startCol: 1,
    direction: 'horizontal',
    isCompleted: false
  },
  {
    id: 2,
    word: 'AMDUONG',
    clue: 'Cặp phạm trù đối lập thống nhất trong tư tưởng Đạo gia',
    startRow: 0,
    startCol: 2,
    direction: 'vertical',
    isCompleted: false
  },
  {
    id: 3,
    word: 'VANDONG',
    clue: 'Mọi sự vật luôn trong trạng thái này theo Mác-Lê-nin',
    startRow: 3,
    startCol: 0,
    direction: 'horizontal',
    isCompleted: false
  },
  {
    id: 4,
    word: 'KETQUA',
    clue: 'Cặp với "nguyên nhân" trong mối quan hệ nhân quả',
    startRow: 2,
    startCol: 4,
    direction: 'vertical',
    isCompleted: false
  },
  {
    id: 5,
    word: 'DAUTRANH',
    clue: 'Mặt đối lập với "thống nhất" trong quy luật biện chứng',
    startRow: 5,
    startCol: 1,
    direction: 'horizontal',
    isCompleted: false
  }
];

const GRID_SIZE = 8;

const CrosswordGame: React.FC = () => {
  const [grid, setGrid] = useState<CrosswordCell[][]>([]);
  const [words, setWords] = useState<CrosswordWord[]>(crosswordData);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  // Initialize grid
  useEffect(() => {
    const newGrid: CrosswordCell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        letter: '',
        isBlocked: true,
        userInput: '',
        isCorrect: false
      }))
    );

    // Place words in grid
    words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        const row = word.direction === 'horizontal' ? word.startRow : word.startRow + i;
        const col = word.direction === 'horizontal' ? word.startCol + i : word.startCol;
        
        if (row < GRID_SIZE && col < GRID_SIZE) {
          newGrid[row][col] = {
            letter: word.word[i],
            isBlocked: false,
            wordId: word.id,
            position: i,
            userInput: '',
            isCorrect: false
          };
        }
      }
    });

    setGrid(newGrid);
  }, []);

  const handleCellInput = (row: number, col: number, value: string) => {
    if (value.length > 1) return;
    
    const newGrid = [...grid];
    const cell = newGrid[row][col];
    
    if (!cell.isBlocked) {
      cell.userInput = value.toUpperCase();
      cell.isCorrect = cell.userInput === cell.letter;
      setGrid(newGrid);
      
      // Check if word is completed
      checkWordCompletion();
    }
  };

  const checkWordCompletion = () => {
    const newWords = words.map(word => {
      let isCompleted = true;
      
      for (let i = 0; i < word.word.length; i++) {
        const row = word.direction === 'horizontal' ? word.startRow : word.startRow + i;
        const col = word.direction === 'horizontal' ? word.startCol + i : word.startCol;
        
        if (row < GRID_SIZE && col < GRID_SIZE) {
          const cell = grid[row][col];
          if (!cell.isCorrect || cell.userInput !== word.word[i]) {
            isCompleted = false;
            break;
          }
        }
      }
      
      return { ...word, isCompleted };
    });
    
    setWords(newWords);
    
    // Check if all words are completed
    const allCompleted = newWords.every(word => word.isCompleted);
    if (allCompleted && !isCompleted) {
      setIsCompleted(true);
      setShowCongrats(true);
    }
  };

  const resetGame = () => {
    const newGrid = [...grid];
    newGrid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isBlocked) {
          cell.userInput = '';
          cell.isCorrect = false;
        }
      });
    });
    setGrid(newGrid);
    setWords(words.map(word => ({ ...word, isCompleted: false })));
    setIsCompleted(false);
    setShowCongrats(false);
    setSelectedWord(null);
  };

  const highlightWord = (wordId: number) => {
    setSelectedWord(selectedWord === wordId ? null : wordId);
  };

  const getCellClassName = (row: number, col: number) => {
    const cell = grid[row][col];
    if (cell.isBlocked) return 'bg-gray-800';
    
    let className = 'bg-white border-2 border-gray-300 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200';
    
    if (selectedWord && cell.wordId === selectedWord) {
      className += ' ring-2 ring-yellow-400 bg-yellow-50';
    }
    
    if (cell.userInput) {
      if (cell.isCorrect) {
        className += ' bg-green-100 border-green-500 text-green-800';
      } else {
        className += ' bg-red-100 border-red-500 text-red-800';
      }
    }
    
    return className;
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Trò chơi Ô chữ
            </h3>
            <p className="text-gray-600">Kiểm tra kiến thức triết học Lão Tử</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Hoàn thành: {words.filter(w => w.isCompleted).length}/{words.length}
          </div>
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Crossword Grid */}
        <div className="flex justify-center">
          <div className="inline-block p-4 bg-gray-50 rounded-xl shadow-inner">
            <div className="grid grid-cols-8 gap-1">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    whileHover={!cell.isBlocked ? { scale: 1.05 } : {}}
                    className="relative"
                  >
                    {cell.isBlocked ? (
                      <div className="w-8 h-8 bg-gray-800 rounded"></div>
                    ) : (
                      <input
                        type="text"
                        value={cell.userInput || ''}
                        onChange={(e) => handleCellInput(rowIndex, colIndex, e.target.value)}
                        className={`w-8 h-8 rounded ${getCellClassName(rowIndex, colIndex)}`}
                        maxLength={1}
                      />
                    )}
                    {!cell.isBlocked && cell.position === 0 && (
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {cell.wordId}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Clues */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Câu hỏi gợi ý:</h4>
          <div className="space-y-3">
            {words.map((word) => (
              <motion.div
                key={word.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => highlightWord(word.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedWord === word.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : word.isCompleted
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-teal-600 text-white text-sm rounded-full flex items-center justify-center font-bold">
                      {word.id}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">{word.clue}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        {word.direction === 'horizontal' ? 'Ngang' : 'Dọc'} • {word.word.length} chữ cái
                      </span>
                      {word.isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCongrats(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-10 h-10 text-yellow-600" />
              </motion.div>
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                🎉 Chúc mừng!
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Bạn đã hoàn thành trò chơi ô chữ! Kiến thức về triết học Lão Tử và 
                biện chứng Mác-Lê-nin của bạn thật ấn tượng.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCongrats(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    resetGame();
                    setShowCongrats(false);
                  }}
                  className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
                >
                  Chơi lại
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default CrosswordGame;