import React from 'react';
import { Link } from 'react-router-dom';
import { FoodEntry } from '../types/entry';

const mockEntries: FoodEntry[] = [
  {
    id: '1',
    restaurantName: '맛나식당',
    title: '정말 끝내주는 된장찌개!',
    rating: 5,
    content: '된장찌개가 정말 진하고 맛있었어요. 반찬도 정갈합니다.',
    date: '2026-03-10',
  },
  {
    id: '2',
    restaurantName: '카페 달콤',
    title: '분위기 좋은 디저트 카페',
    rating: 4,
    content: '티라미수가 일품이네요. 커피 향도 좋습니다.',
    date: '2026-03-12',
  },
];

const Home: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내 맛집 일기</h1>
        <Link 
          to="/write" 
          className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-orange-600 transition"
        >
          + 쓰기
        </Link>
      </div>

      <div className="space-y-4">
        {mockEntries.map((entry) => (
          <div key={entry.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold">{entry.restaurantName}</h2>
              <span className="text-orange-500 font-bold">★ {entry.rating}</span>
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{entry.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{entry.content}</p>
            <p className="text-xs text-gray-400 mt-3">{entry.date}</p>
          </div>
        ))}
      </div>
      
      {mockEntries.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          첫 번째 맛집 일기를 남겨보세요!
        </div>
      )}
    </div>
  );
};

export default Home;
