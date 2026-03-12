import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Write: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    restaurantName: '',
    rating: 5,
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Diary Entry:', formData);
    // TODO: DB에 저장 로직 추가
    alert('일기가 저장되었습니다!');
    navigate('/');
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 h-full">
      <h1 className="text-xl font-bold mb-4">맛있는 기록 남기기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">식당 이름</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="어디서 드셨나요?"
            value={formData.restaurantName}
            onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">한 줄 평 (제목)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="오늘의 맛을 한 마디로 표현한다면?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">별점</label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num}점</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">상세 내용</label>
          <textarea
            className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="어떤 점이 맛있었나요?"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default Write;
