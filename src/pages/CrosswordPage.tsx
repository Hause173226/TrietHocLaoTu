import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";

// 9 câu hỏi theo yêu cầu + 1 câu hỏi cột dọc
const crosswordData = [
  {
    id: 1,
    clue: "Khái niệm về sự thay đổi, sự biến chuyển của vạn vật",
    answer: "biendoi",
    row: 0,
    startCol: 6,
    crossIndex: 0, // 'b' -> col 6
    displayAnswer: "Biến đổi",
  },
  {
    id: 2,
    clue: "Nguyên lý: mọi sự vật luôn trong trạng thái di chuyển, thay đổi",
    answer: "dichuyen",
    row: 1,
    startCol: 5,
    crossIndex: 1, // 'i' -> col 6
    displayAnswer: "di chuyển",
  },
  {
    id: 3,
    clue: "Tác phẩm kinh điển liên quan đến Lão Tử",
    answer: "kinhdien",
    row: 2,
    startCol: 0,
    crossIndex: 6, // 'e' -> col 6
    displayAnswer: "Kinh điển",
  },
  {
    id: 4,
    clue: "Yếu tố: hòa hợp, sống hòa hợp với gì? (thuộc tinh thần Lao Tu)",
    answer: "tunhien",
    row: 3,
    startCol: 4,
    crossIndex: 2, // 'n' -> col 6
    displayAnswer: "Tự nhiên",
  },
  {
    id: 5,
    clue: "Một khía cạnh quan trọng: giá trị lịch sử",
    answer: "lichsu",
    row: 4,
    startCol: 4,
    crossIndex: 2, // 'c' -> col 6
    displayAnswer: "Lịch sử",
  },
  {
    id: 6,
    clue: "Thuật ngữ chung: phương thức, cách tiếp cận",
    answer: "phuongphap",
    row: 5,
    startCol: 5,
    crossIndex: 1, // 'h' -> col 6
    displayAnswer: "Phương pháp",
  },
  {
    id: 7,
    clue: "Quan niệm triết học 'duy vat' (materialism) - mot tu: duyvat",
    answer: "duyvat",
    row: 6,
    startCol: 5,
    crossIndex: 1, // 'u' -> col 6
    displayAnswer: "Duy vật",
  },
  {
    id: 8,
    clue: "Mọi sự vật luôn trong trạng thái nào theo phép biện chứng?",
    answer: "vandoi",
    row: 7,
    startCol: 4,
    crossIndex: 2, // 'n' -> col 6
    displayAnswer: "Vận động",
  },
  {
    id: 9,
    clue: "Quy luật: su thay doi tu luong den chat",
    answer: "luongchat",
    row: 8,
    startCol: 2,
    crossIndex: 4, // 'g' -> col 6
    displayAnswer: "Lượng chất",
  },
];

// Câu hỏi cột dọc
const verticalQuestion = {
  id: 10,
  clue: "Phương pháp tư duy khoa học để nhận thức thế giới",
  answer: "bienchung", // BIỆNCHỨNG không dấu
};

const SECRET_WORD = "BIỆNCHỨNG";
const SECRET_COL = 6; // cột giao nhau
const GRID_ROWS = 9;
const GRID_COLS = 16; // đủ chứa đáp án dài nhất

const CrosswordPage: React.FC = () => {
  const [grid, setGrid] = useState<any[][]>([]);
  const [answered, setAnswered] = useState<boolean[]>(
    Array(crosswordData.length).fill(false)
  );
  const [correct, setCorrect] = useState<boolean[]>(
    Array(crosswordData.length).fill(false)
  );
  const [verticalAnswered, setVerticalAnswered] = useState(false);
  const [verticalCorrect, setVerticalCorrect] = useState(false);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const [showVerticalPopup, setShowVerticalPopup] = useState(false);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState<{
    correct: boolean;
    idx: number;
    message: string;
    isVertical?: boolean;
  } | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  // Khởi tạo grid
  useEffect(() => {
    const newGrid = Array(GRID_ROWS)
      .fill(null)
      .map(() => Array(GRID_COLS).fill({}));

    crosswordData.forEach((item, idx) => {
      for (let i = 0; i < item.answer.length; i++) {
        const col = item.startCol + i;
        if (col < GRID_COLS) {
          newGrid[item.row][col] = {
            idx,
            letter: "",
            cross: col === SECRET_COL,
            position: i,
          };
        }
      }
    });

    // Thêm ô đặc biệt cho cột dọc (ở vị trí dưới grid)
    for (let i = 0; i < GRID_ROWS; i++) {
      if (newGrid[i][SECRET_COL] && newGrid[i][SECRET_COL].cross) {
        newGrid[i][SECRET_COL].verticalLetter = "";
      }
    }

    setGrid(newGrid);
  }, []);

  // Hiển thị đáp án lên grid khi trả lời đúng
  useEffect(() => {
    if (!showResult || !showResult.correct) return;

    if (showResult.isVertical) {
      // Hiển thị cột dọc
      setGrid((prev) => {
        const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
        for (let i = 0; i < SECRET_WORD.length; i++) {
          if (
            newGrid[i] &&
            newGrid[i][SECRET_COL] &&
            newGrid[i][SECRET_COL].cross
          ) {
            newGrid[i][SECRET_COL].verticalLetter = SECRET_WORD[i];
          }
        }
        return newGrid;
      });
    } else {
      // Hiển thị hàng ngang
      const { idx } = showResult;
      const item = crosswordData[idx];

      setGrid((prev) => {
        const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
        for (let i = 0; i < item.answer.length; i++) {
          const col = item.startCol + i;
          if (col < GRID_COLS) {
            newGrid[item.row][col].letter = item.answer[i].toUpperCase();
          }
        }
        return newGrid;
      });
    }

    // Kiểm tra hoàn thành tất cả
    const horizontalComplete = correct
      .filter((c, i) => (i !== showResult.idx ? c : true))
      .every((c) => c);

    if (horizontalComplete && verticalCorrect) {
      // Đóng popup kết quả trước khi hiện chúc mừng
      setShowResult(null);
      setTimeout(() => setShowCongrats(true), 300); // Đợi popup kết quả đóng rồi mới hiện chúc mừng
    }
  }, [showResult, correct, verticalCorrect]);

  // Hiệu ứng rung cho hàng sai
  useEffect(() => {
    if (showResult && !showResult.correct) {
      if (showResult.isVertical) {
        // Hiệu ứng cho cột dọc
        setGrid((prev) => {
          const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
          for (let i = 0; i < GRID_ROWS; i++) {
            if (newGrid[i][SECRET_COL] && newGrid[i][SECRET_COL].cross) {
              newGrid[i][SECRET_COL].wrong = true;
            }
          }
          return newGrid;
        });
      } else {
        // Hiệu ứng cho hàng ngang
        const { idx } = showResult;
        const item = crosswordData[idx];

        setGrid((prev) => {
          const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
          for (let i = 0; i < item.answer.length; i++) {
            const col = item.startCol + i;
            if (col < GRID_COLS) {
              newGrid[item.row][col].wrong = true;
            }
          }
          return newGrid;
        });
      }

      // Bỏ hiệu ứng rung sau 0.5s
      setTimeout(() => {
        setGrid((prev) => {
          const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
          if (showResult.isVertical) {
            for (let i = 0; i < GRID_ROWS; i++) {
              if (newGrid[i][SECRET_COL] && newGrid[i][SECRET_COL].cross) {
                newGrid[i][SECRET_COL].wrong = false;
              }
            }
          } else {
            const { idx } = showResult;
            const item = crosswordData[idx];
            for (let i = 0; i < item.answer.length; i++) {
              const col = item.startCol + i;
              if (col < GRID_COLS) {
                newGrid[item.row][col].wrong = false;
              }
            }
          }
          return newGrid;
        });
      }, 500);
    }
  }, [showResult]);

  // Xử lý chọn số hàng ngang
  const handleCellNumberClick = (idx: number) => {
    if (answered[idx]) return;
    setShowPopup(idx);
    setInput("");
    setShowResult(null);
  };

  // Xử lý chọn cột dọc
  const handleVerticalClick = () => {
    if (verticalAnswered) return;
    setShowVerticalPopup(true);
    setInput("");
    setShowResult(null);
  };

  // Xử lý trả lời hàng ngang
  const handleSubmit = () => {
    if (showPopup === null) return;
    const ans = input.trim().toLowerCase();
    const item = crosswordData[showPopup];
    const isCorrect = ans === item.answer;

    setAnswered((prev) => {
      const arr = [...prev];
      arr[showPopup] = true;
      return arr;
    });

    setCorrect((prev) => {
      const arr = [...prev];
      arr[showPopup] = isCorrect;
      return arr;
    });

    setShowResult({
      correct: isCorrect,
      idx: showPopup,
      message: isCorrect
        ? "Chính xác! Đáp án đã được hiển thị trên ô chữ."
        : "Sai rồi! Bạn không thể chọn lại câu hỏi này nữa.",
    });

    setShowPopup(null);
  };

  // Xử lý trả lời cột dọc
  const handleVerticalSubmit = () => {
    const ans = input.trim().toLowerCase();
    const isCorrect = ans === verticalQuestion.answer;

    if (isCorrect) {
      setVerticalAnswered(true);
      setVerticalCorrect(true);

      setShowResult({
        correct: true,
        idx: -1,
        message: "Chính xác! Từ khóa bí mật đã được hiển thị!",
        isVertical: true,
      });

      setShowVerticalPopup(false);
    } else {
      // Không khóa lại, chỉ hiện thông báo sai
      setShowResult({
        correct: false,
        idx: -1,
        message: "Sai rồi! Hãy thử lại đáp án cho cột dọc bí mật.",
        isVertical: true,
      });
      // Giữ popup mở để người chơi thử lại
      // setShowVerticalPopup(false); // <-- XÓA DÒNG NÀY
      setShowVerticalPopup(false);
    }
  };

  // Reset game
  const handleReset = () => {
    setAnswered(Array(crosswordData.length).fill(false));
    setCorrect(Array(crosswordData.length).fill(false));
    setVerticalAnswered(false);
    setVerticalCorrect(false);
    setShowPopup(null);
    setShowVerticalPopup(false);
    setInput("");
    setShowResult(null);
    setShowCongrats(false);

    // Reset grid
    const newGrid = Array(GRID_ROWS)
      .fill(null)
      .map(() => Array(GRID_COLS).fill({}));

    crosswordData.forEach((item, idx) => {
      for (let i = 0; i < item.answer.length; i++) {
        const col = item.startCol + i;
        if (col < GRID_COLS) {
          newGrid[item.row][col] = {
            idx,
            letter: "",
            cross: col === SECRET_COL,
            position: i,
          };
        }
      }
    });

    for (let i = 0; i < GRID_ROWS; i++) {
      if (newGrid[i][SECRET_COL] && newGrid[i][SECRET_COL].cross) {
        newGrid[i][SECRET_COL].verticalLetter = "";
      }
    }

    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Trò chơi Ô chữ
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Nhấn vào số thứ tự để trả lời từng hàng ngang! Nhấn vào ô đỏ để trả
            lời cột dọc bí mật!
          </p>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại</span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="inline-block p-6 bg-white rounded-2xl shadow-xl">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              }}
            >
              {grid.map((row, rowIdx) =>
                row.map((cell, colIdx) => (
                  <div key={`${rowIdx}-${colIdx}`} className="relative">
                    {cell.idx === undefined ? (
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded"></div>
                    ) : (
                      <>
                        <div
                          className={`rounded border-2 flex items-center justify-center font-bold text-lg w-10 h-10 md:w-12 md:h-12 transition-all duration-200
                            ${
                              cell.cross
                                ? "border-red-400 bg-red-50"
                                : "border-gray-300 bg-white"
                            }
                            ${
                              answered[cell.idx] && correct[cell.idx]
                                ? "bg-green-100 border-green-500 text-green-800"
                                : ""
                            }
                            ${
                              answered[cell.idx] && !correct[cell.idx]
                                ? "bg-red-400 border-red-500 text-red-800"
                                : ""
                            }
                            ${cell.wrong ? "animate-pulse bg-red-300" : ""}
                          `}
                        >
                          {/* Hiển thị chữ hàng ngang */}
                          {cell.letter}
                          {/* Hiển thị chữ cột dọc nếu có */}
                          {cell.cross && cell.verticalLetter && (
                            <span className="absolute inset-0 flex items-center justify-center text-red-600 font-extrabold">
                              {cell.verticalLetter}
                            </span>
                          )}
                        </div>
                        {/* Nút số cho hàng ngang */}
                        {cell.position === 0 && !answered[cell.idx] && (
                          <button
                            className="absolute -top-1 -left-1 w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow hover:bg-teal-700 transition"
                            onClick={() => handleCellNumberClick(cell.idx)}
                          >
                            {cell.idx + 1}
                          </button>
                        )}
                        {/* Nút cho cột dọc */}
                        {cell.cross && rowIdx === 0 && !verticalAnswered && (
                          <button
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow hover:bg-red-700 transition"
                            onClick={handleVerticalClick}
                          >
                            ↓
                          </button>
                        )}
                        {/* Dấu chấm đỏ cho ô giao nhau */}
                        {cell.cross && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* Chỉ hiển thị từ khóa khi đã trả lời đúng cột dọc */}
            {verticalCorrect && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Từ khóa bí mật:</p>
                <div className="text-2xl font-bold text-red-600 tracking-widest">
                  {SECRET_WORD}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Popup câu hỏi hàng ngang */}
        <AnimatePresence>
          {showPopup !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
              onClick={() => setShowPopup(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
              >
                <h3 className="text-xl font-bold mb-4 text-teal-700">
                  Câu hỏi số {showPopup + 1} (Hàng ngang)
                </h3>
                <p className="mb-4 text-gray-700">
                  {crosswordData[showPopup].clue}
                </p>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 font-mono text-lg"
                  placeholder={`Nhập đáp án (${crosswordData[showPopup].answer.length} ký tự)`}
                  maxLength={crosswordData[showPopup].answer.length}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
                <div className="flex space-x-3">
                  <button
                    className="flex-1 px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition"
                    onClick={handleSubmit}
                  >
                    Trả lời
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                    onClick={() => setShowPopup(null)}
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup câu hỏi cột dọc */}
        <AnimatePresence>
          {showVerticalPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
              onClick={() => setShowVerticalPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
              >
                <h3 className="text-xl font-bold mb-4 text-red-700">
                  Câu hỏi cột dọc bí mật
                </h3>
                <p className="mb-4 text-gray-700">{verticalQuestion.clue}</p>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 font-mono text-lg"
                  placeholder={`Nhập đáp án (${verticalQuestion.answer.length} ký tự)`}
                  maxLength={verticalQuestion.answer.length}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleVerticalSubmit()
                  }
                />
                <div className="flex space-x-3">
                  <button
                    className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
                    onClick={handleVerticalSubmit}
                  >
                    Trả lời
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                    onClick={() => setShowVerticalPopup(false)}
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup kết quả */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
              onClick={() => setShowResult(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    showResult.correct ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {showResult.correct ? "✅ Chính xác!" : "❌ Sai rồi!"}
                </h3>
                <p className="mb-6 text-gray-700">{showResult.message}</p>

                <button
                  className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                  onClick={() => setShowResult(null)}
                >
                  Đóng
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal hoàn thành */}
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
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  🎉 Chúc mừng!
                </h3>
                <p className="text-gray-700 mb-4">
                  Bạn đã hoàn thành tất cả câu hỏi đúng!
                </p>
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg mb-6">
                  <p className="text-red-800 font-bold text-lg">
                    Từ khóa bí mật:{" "}
                    <span className="text-2xl">{SECRET_WORD}</span>
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowCongrats(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Chơi lại
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrosswordPage;
