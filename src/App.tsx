import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Pin as Yin,
  BookOpen,
  Ambulance as Balance,
  History,
  Brain,
  Target,
  Compass,
  Heart,
  Lightbulb,
  CheckCircle,
  Infinity,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Card from "./components/Card";
import Quiz from "./components/Quiz";
import ConceptPopup from "./components/ConceptPopup";
import CrosswordPage from "./pages/CrosswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/tro-choi"
          element={
            <>
              <Navbar />
              <CrosswordPage />
            </>
          }
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Navbar />

      {/* Hero Section */}
      <Section
        id="home"
        title="Triết học Lão Tử"
        subtitle="Dưới góc nhìn Biện chứng Mác – Lê-nin"
        icon={Yin}
        className="bg-gradient-to-br from-teal-50 to-yellow-50"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Lão Tử (571-471 TCN)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lão Tử, triết gia vĩ đại của Trung Quốc cổ đại, người sáng lập
                học phái Đạo gia. Ông đã để lại di sản tư tưởng phong phú qua
                tác phẩm "Đạo Đức Kinh", một trong những kinh điển triết học
                quan trọng nhất của nhân loại.
              </p>
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-teal-800 font-medium">
                  "Đạo khả đạo, phi thường đạo" - Con đường có thể nói ra không
                  phải là con đường vĩnh hằng
                </p>
              </div>
            </Card>

            <Card delay={0.2}>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Tư tưởng cốt lõi
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    <ConceptPopup
                      concept="Đạo"
                      explanation="Đạo là nguyên lý tối cao của vũ trụ, là nguồn gốc và quy luật chi phối vạn vật. Đạo vô hình, vô danh nhưng là cơ sở của mọi sự tồn tại và biến hóa."
                    >
                      <strong>Đạo</strong> - Nguyên lý tối cao của vũ trụ
                    </ConceptPopup>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    <ConceptPopup
                      concept="Âm - Dương"
                      explanation="Âm và Dương là hai nguyên lý đối lập thống nhất, biểu hiện sự biện chứng trong tự nhiên và xã hội. Chúng vừa đối lập vừa phụ thuộc, chuyển hóa lẫn nhau."
                    >
                      <strong>Âm - Dương</strong> - Hai mặt đối lập thống nhất
                    </ConceptPopup>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    <ConceptPopup
                      concept="Vô vi"
                      explanation="Vô vi không phải là thụ động mà là hành động theo quy luật tự nhiên, không cưỡng ép, không đi ngược lại dòng chảy của Đạo."
                    >
                      <strong>Vô vi</strong> - Hành động theo quy luật tự nhiên
                    </ConceptPopup>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-teal-200 to-yellow-200 rounded-full flex items-center justify-center shadow-xl">
                <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="w-48 h-48 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent rounded-full"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full"></div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-900 rounded-full"></div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: "linear" }}
                className="absolute inset-0 border-4 border-teal-300 rounded-full opacity-30"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Section 1 */}
      <Section
        id="section1"
        title="Biện chứng khách quan & chủ quan"
        subtitle="Tính biện chứng trong tư tưởng Lão Tử thể hiện qua mối quan hệ Âm-Dương"
        icon={Balance}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-gray-900 rounded-full mr-3"></div>
              Biện chứng khách quan
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>
                  Quy luật chuyển hóa của các mặt đối lập (Âm-Dương) tồn tại
                  khách quan trong tự nhiên
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>
                  Sự biến đổi không ngừng của vạn vật theo quy luật "phản giả
                  chi động"
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>
                  Tính thống nhất của các cặp phạm trù đối lập: có-không,
                  mạnh-yếu, trước-sau
                </span>
              </li>
            </ul>
          </Card>

          <Card delay={0.2}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-white border-2 border-gray-900 rounded-full mr-3"></div>
              Biện chứng chủ quan
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>
                  Phương pháp tư duy biện chứng trong việc nhận thức thế giới
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>
                  Khả năng nhìn nhận mặt tích cực trong tiêu cực và ngược lại
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Tư duy linh hoạt, không cứng nhắc, máy móc</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="mt-8" delay={0.4}>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
            Ví dụ thực tiễn: Khủng hoảng và Cơ hội
          </h3>
          <div className="bg-gradient-to-r from-teal-50 to-yellow-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              Trong bối cảnh đại dịch COVID-19, tư tưởng biện chứng của Lão Tử
              giúp chúng ta nhận thức:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Khủng hoảng (Âm)
                </h4>
                <p className="text-gray-600">
                  Kinh tế suy thoái, thất nghiệp, cách ly xã hội
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Cơ hội (Dương)</h4>
                <p className="text-gray-600">
                  Chuyển đổi số, làm việc từ xa, y tế phát triển
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 2 */}
      <Section
        id="section2"
        title="Giá trị lịch sử & hạn chế"
        subtitle="Đánh giá khách quan di sản tư tưởng Lão Tử trong bối cảnh lịch sử"
        icon={History}
        className="bg-yellow-50"
      >
        <div className="grid lg:grid-cols-3 gap-8">
          <Card>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Giá trị tích cực
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Nhận thức sâu sắc về tính biện chứng của tự nhiên</li>
              <li>• Tư duy hệ thống, toàn diện về vũ trụ</li>
              <li>• Tinh thần nhân đạo, hòa bình</li>
              <li>• Phương pháp luận giản dị nhưng hiệu quả</li>
            </ul>
          </Card>

          <Card delay={0.2}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 border-2 border-red-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Hạn chế lịch sử
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Tính thụ động, tiêu cực trong hành động</li>
              <li>• Thiếu tính khoa học về mặt nhận thức luận</li>
              <li>• Lý tưởng hóa xã hội nguyên thủy</li>
              <li>• Chưa có quan niệm về đấu tranh giai cấp</li>
            </ul>
          </Card>

          <Card delay={0.4}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Infinity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Ý nghĩa hiện đại
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Tư duy sinh thái, phát triển bền vững</li>
              <li>• Quản lý xung đột, hòa giải</li>
              <li>• Lãnh đạo khôn ngoan, linh hoạt</li>
              <li>• Cân bằng trong cuộc sống hiện đại</li>
            </ul>
          </Card>
        </div>

        <Card className="mt-8" delay={0.6}>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
            So sánh với Phép biện chứng Mác-Lê-nin
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Khía cạnh
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Lão Tử
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Mác-Lê-nin
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Cơ sở triết học</td>
                  <td className="py-3 px-4">
                    Triết học tự nhiên, duy tâm khách quan
                  </td>
                  <td className="py-3 px-4">Chủ nghĩa duy vật biện chứng</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Động lực phát triển</td>
                  <td className="py-3 px-4">Mâu thuẫn nội tại của sự vật</td>
                  <td className="py-3 px-4">Mâu thuẫn + thực tiễn xã hội</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Ứng dụng</td>
                  <td className="py-3 px-4">Đạo đức, tu thân, trị nước</td>
                  <td className="py-3 px-4">Cách mạng xã hội, xây dựng CNXH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* Section 3 */}
      <Section
        id="section3"
        title="Phát triển tư duy triết học"
        subtitle="Tư tưởng Lão Tử góp phần hình thành tư duy triết học biện chứng"
        icon={Brain}
      >
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Tư duy hệ thống
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nhìn nhận thế giới như một tổng thể thống nhất, mọi sự vật đều
                có mối liên hệ với nhau
              </p>
            </Card>

            <Card delay={0.1}>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Balance className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Tư duy đối lập
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Khả năng nhận thức các mặt đối lập trong sự vật, hiện tượng và
                mối quan hệ chuyển hóa
              </p>
            </Card>

            <Card delay={0.2}>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Tư duy sáng tạo
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Vượt qua tư duy máy móc, cứng nhắc, tìm ra những giải pháp linh
                hoạt, sáng tạo
              </p>
            </Card>
          </div>

          <Quiz />

          <Card delay={0.4}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Ứng dụng trong giáo dục hiện đại
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">
                  Phương pháp giảng dạy:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Khuyến khích tư duy phản biện</li>
                  <li>• Giáo dục toàn diện: trí-đức-thể-mỹ</li>
                  <li>• Phương pháp "vô vi": để học sinh tự khám phá</li>
                  <li>• Cân bằng giữa lý thuyết và thực hành</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">
                  Kỹ năng phát triển:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tư duy hệ thống, nhìn tổng thể</li>
                  <li>• Khả năng thích ứng, linh hoạt</li>
                  <li>• Kỹ năng giải quyết xung đột</li>
                  <li>• Trí tuệ cảm xúc và tự nhận thức</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 4 */}
      <Section
        id="section4"
        title="Vận dụng để giải thích hiện thực"
        subtitle="Ứng dụng tư tưởng biện chứng Lão Tử trong việc hiểu và giải quyết các vấn đề xã hội"
        icon={Target}
        className="bg-teal-50"
      >
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Kinh tế thị trường
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Cạnh tranh ↔ Hợp tác
                    </h4>
                    <p className="text-sm text-gray-600">
                      Các doanh nghiệp vừa cạnh tranh vừa phải hợp tác để phát
                      triển bền vững
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Tăng trưởng ↔ Bền vững
                    </h4>
                    <p className="text-sm text-gray-600">
                      Cân bằng giữa tăng trưởng kinh tế và bảo vệ môi trường
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card delay={0.2}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Quan hệ quốc tế
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Xung đột ↔ Hòa bình
                    </h4>
                    <p className="text-sm text-gray-600">
                      Chủ động hòa giải, tìm tiếng nói chung thay vì đối đầu
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Dân tộc ↔ Toàn cầu
                    </h4>
                    <p className="text-sm text-gray-600">
                      Giữ gìn bản sắc dân tộc trong quá trình hội nhập quốc tế
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card delay={0.4}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Case Study: Quản lý đại dịch COVID-19
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Thử thách (Âm)
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Virus lây lan</li>
                    <li>Kinh tế suy thoái</li>
                    <li>Cách ly xã hội</li>
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-1 h-20 bg-gradient-to-b from-red-300 to-green-300 rounded-full md:w-20 md:h-1 md:bg-gradient-to-r"></div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Cơ hội (Dương)
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Chuyển đổi số</li>
                    <li>Y tế phát triển</li>
                    <li>Đoàn kết toàn cầu</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <h5 className="font-bold text-gray-900 mb-2">
                  Bài học biện chứng:
                </h5>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Việt Nam đã áp dụng tư duy biện chứng trong việc cân bằng giữa
                  "chống dịch" và "phát triển kinh tế", vừa kiểm soát nghiêm
                  ngặt vừa linh hoạt thích ứng, tạo nên "thành công kép" được
                  quốc tế ghi nhận.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 5 */}
      <Section
        id="section5"
        title="Vai trò phương pháp luận"
        subtitle="Tư tưởng Lão Tử là công cụ phương pháp luận quan trọng trong nhận thức và thực tiễn"
        icon={Compass}
      >
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Trong nhận thức
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-gray-800">
                    Nhìn nhận toàn diện
                  </h4>
                  <p className="text-sm text-gray-600">
                    Không chỉ thấy một mặt mà phải thấy cả mặt đối lập, tìm hiểu
                    mối liên hệ
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-bold text-gray-800">Tư duy động</h4>
                  <p className="text-sm text-gray-600">
                    Mọi sự vật đều vận động, biến đổi, không có gì tuyệt đối bất
                    biến
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-800">Phản tư sâu sắc</h4>
                  <p className="text-sm text-gray-600">
                    Đặt câu hỏi về bản chất, không chỉ dừng lại ở hiện tượng bề
                    ngoài
                  </p>
                </div>
              </div>
            </Card>

            <Card delay={0.2}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Trong thực tiễn
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">
                    Hành động linh hoạt
                  </h4>
                  <p className="text-sm text-gray-600">
                    Thích ứng với hoàn cảnh, không cứng nhắc trong cách làm việc
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-gray-800">
                    Cân bằng các yếu tố
                  </h4>
                  <p className="text-sm text-gray-600">
                    Tìm điểm cân bằng tối ưu giữa các mục tiêu, lợi ích khác
                    nhau
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-bold text-gray-800">
                    Kiên nhẫn chiến lược
                  </h4>
                  <p className="text-sm text-gray-600">
                    Hiểu rằng mọi thay đổi cần thời gian, không vội vàng cưỡng
                    ép
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card delay={0.4}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Ứng dụng trong lãnh đạo hiện đại
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Lãnh đạo phục vụ
                </h4>
                <p className="text-sm text-gray-600">
                  "Thánh nhân thường vô tâm, dĩ bá tánh tâm vi tâm" - Lãnh đạo
                  phải lấy lòng dân làm lòng mình
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Balance className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Quản lý cân bằng
                </h4>
                <p className="text-sm text-gray-600">
                  Cân bằng giữa quyền lực và trách nhiệm, giữa cứng rắn và mềm
                  mỏng trong quản lý
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Tầm nhìn dài hạn
                </h4>
                <p className="text-sm text-gray-600">
                  Nhìn xa trông rộng, hiểu rằng thành công bền vững cần sự kiên
                  trì và thời gian
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 6 */}
      <Section
        id="section6"
        title="Giá trị đạo đức – xã hội"
        subtitle="Đóng góp của tư tưởng Lão Tử vào việc xây dựng đạo đức và quan hệ xã hội hài hòa"
        icon={Heart}
        className="bg-yellow-50"
      >
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Nhân ái</h3>
              </div>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                "Thượng thiện như thủy" - Đạo đức cao nhất như nước, nuôi dưỡng
                vạn vật mà không tranh giành
              </p>
            </Card>

            <Card delay={0.1}>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Balance className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Khiêm tốn</h3>
              </div>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                "Giang hải sở dĩ năng vi bách cốc vương giả" - Biển cả có thể
                làm vua của trăm sông vì biết ở thấp
              </p>
            </Card>

            <Card delay={0.2}>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Compass className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Điều hòa</h3>
              </div>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Tránh cực đoan, tìm sự cân bằng trong mọi hành động và quyết
                định của đời sống
              </p>
            </Card>
          </div>

          <Card delay={0.4}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Ứng dụng trong xây dựng xã hội hiện đại
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-800 mb-4">
                  Trong gia đình:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Tôn trọng lẫn nhau, lắng nghe và chia sẻ
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Giáo dục con em bằng gương sáng, không cưỡng ép
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Cân bằng giữa nghiêm khắc và nhân ái
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-4">
                  Trong cộng đồng:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Xây dựng mối quan hệ hài hòa, tương trợ
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Bảo vệ môi trường, sống hòa hợp với thiên nhiên
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Giải quyết xung đột bằng đối thoại, hòa giải
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card delay={0.6}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Bài học từ "Nước" trong triết học Lão Tử
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 opacity-80"></div>
                  <h4 className="font-bold text-gray-800 mb-2">Mềm mỏng</h4>
                  <p className="text-sm text-gray-600">
                    Không cứng nhắc, biết thích ứng
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 opacity-60"></div>
                  <h4 className="font-bold text-gray-800 mb-2">Khiêm tốn</h4>
                  <p className="text-sm text-gray-600">
                    Luôn chảy xuống, không kiêu ngạo
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 opacity-40"></div>
                  <h4 className="font-bold text-gray-800 mb-2">Nuôi dưỡng</h4>
                  <p className="text-sm text-gray-600">
                    Cho đi không đòi hỏi lại
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 opacity-20"></div>
                  <h4 className="font-bold text-gray-800 mb-2">Bền bỉ</h4>
                  <p className="text-sm text-gray-600">
                    Nhỏ giọt chảy dai, xuyên thủng đá
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 7 */}
      <Section
        id="section7"
        title="Kỹ năng & tư duy phản biện"
        subtitle="Phát triển khả năng tư duy độc lập và kỹ năng phản biện thông qua triết học Lão Tử"
        icon={Lightbulb}
      >
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Tư duy phản biện là gì?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Khả năng đặt câu hỏi và kiểm tra thông tin
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Phân tích đa góc độ, không thiên vị
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Tìm hiểu nguyên nhân, hệ quả của vấn đề
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Sẵn sàng thay đổi quan điểm khi có bằng chứng mới
                  </p>
                </div>
              </div>
            </Card>

            <Card delay={0.2}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Lão Tử và tư duy phản biện
              </h3>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700">
                  "Tri giả bất ngôn, ngôn giả bất tri" - Người hiểu biết không
                  khoe khoang, người khoe khoang không hiểu biết thật sự
                </blockquote>
                <p className="text-gray-600 text-sm">
                  Lão Tử dạy chúng ta phải khiêm tốn học hỏi, không tự mãn với
                  kiến thức hiện có, luôn đặt câu hỏi và suy ngẫm sâu sắc.
                </p>
              </div>
            </Card>
          </div>

          <Card delay={0.4}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Bài tập thực hành: Phân tích tình huống
            </h3>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-4">
                Tình huống: Công nghệ AI và việc làm
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-700 mb-3">
                    Quan điểm tiêu cực:
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      • AI sẽ thay thế con người, gây thất nghiệp hàng loạt
                    </li>
                    <li>• Tăng bất bình đẳng xã hội</li>
                    <li>• Con người mất đi ý nghĩa lao động</li>
                    <li>• Phụ thuộc vào công nghệ</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-700 mb-3">
                    Quan điểm tích cực:
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AI tạo ra những công việc mới, cao cấp hơn</li>
                    <li>• Giải phóng con người khỏi lao động nặng nhọc</li>
                    <li>• Nâng cao năng suất, chất lượng cuộc sống</li>
                    <li>• Thúc đẩy sáng tạo và đổi mới</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h5 className="font-bold text-teal-700 mb-2">
                  Tư duy biện chứng Lão Tử:
                </h5>
                <p className="text-gray-700 text-sm leading-relaxed">
                  AI vừa là thách thức vừa là cơ hội. Thay vì lo lắng hay quá
                  lạc quan, chúng ta cần: (1) Chuẩn bị kỹ năng mới; (2) Xây dựng
                  chính sách phù hợp; (3) Tận dụng ưu điểm của AI đồng thời hạn
                  chế tác động tiêu cực. Quan trọng là tìm sự cân bằng và thích
                  ứng linh hoạt.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card delay={0.6}>
              <div className="text-center mb-4">
                <Brain className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">Tư duy mở</h3>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Sẵn sàng tiếp nhận các quan điểm khác nhau, không cố chấp với ý
                kiến riêng
              </p>
            </Card>

            <Card delay={0.7}>
              <div className="text-center mb-4">
                <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">
                  Phân tích sâu
                </h3>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Không chỉ nhìn bề ngoài mà tìm hiểu nguyên nhân sâu xa của vấn
                đề
              </p>
            </Card>

            <Card delay={0.8}>
              <div className="text-center mb-4">
                <Balance className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">Cân bằng</h3>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Tìm điểm cân bằng giữa các quan điểm đối lập, tránh cực đoan
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Crossword Game */}

      {/* Conclusion */}
      <Section
        id="conclusion"
        title="Kết luận"
        subtitle="Tổng hợp giá trị triết học Lão Tử và ý nghĩa đối với xã hội hiện đại"
        icon={CheckCircle}
        className="bg-gradient-to-br from-teal-50 to-yellow-50"
      >
        <div className="space-y-8">
          <Card>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              Những giá trị vĩnh hằng
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Yin className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Tư duy biện chứng
                </h4>
                <p className="text-sm text-gray-600">
                  Nhìn nhận mối liên hệ đối lập thống nhất
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Balance className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Sự cân bằng</h4>
                <p className="text-sm text-gray-600">
                  Hài hòa giữa con người và tự nhiên
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Nhân ái</h4>
                <p className="text-sm text-gray-600">Lòng từ bi và khiêm tốn</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Trí tuệ</h4>
                <p className="text-sm text-gray-600">
                  Hiểu biết sâu sắc và hành động khôn ngoan
                </p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card delay={0.2}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Liên hệ với Mác-Lê-nin
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Điểm chung:</h4>
                    <p className="text-sm text-gray-600">
                      Cả hai đều nhấn mạnh tính biện chứng, mâu thuẫn và sự
                      chuyển hóa của sự vật
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Khác biệt:</h4>
                    <p className="text-sm text-gray-600">
                      Lão Tử thiên về triết học tự nhiên, Mác-Lê-nin tập trung
                      vào biện chứng xã hội
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card delay={0.4}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Ứng dụng hiện đại
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    Phát triển bền vững
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    Quản lý xung đột quốc tế
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    Lãnh đạo doanh nghiệp
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    Giáo dục toàn diện
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    Cân bằng công việc-cuộc sống
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Card delay={0.6}>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
              Thông điệp cuối cùng
            </h3>
            <div className="bg-gradient-to-r from-teal-50 via-yellow-50 to-teal-50 p-8 rounded-xl text-center">
              <blockquote className="text-xl font-serif text-gray-800 italic mb-4">
                "Đạo pháp tự nhiên"
              </blockquote>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Triết học Lão Tử dạy chúng ta rằng, trong thế giới đầy biến động
                này, chúng ta cần học cách thích ứng linh hoạt như nước, giữ
                vững nguyên tắc như núi, và luôn tìm kiếm sự cân bằng hài hòa.
                Khi kết hợp với tư duy biện chứng Mác-Lê-nin, chúng ta có được
                công cụ mạnh mẽ để hiểu và thay đổi thế giới theo hướng tích
                cực.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Yin className="w-6 h-6 text-teal-400" />
            <span className="text-xl font-serif font-bold">
              Triết học Lão Tử
            </span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Khám phá trí tuệ cổ xưa cho thế giới hiện đại
          </p>
          <div className="text-sm text-gray-400">
            <p>Website học thuật • Dành cho mục đích giáo dục</p>
            <p className="mt-2">
              © 2024 - Được tạo với React, Tailwind CSS và Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
