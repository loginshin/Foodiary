import React from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/diaryDB';

const Home: React.FC = () => {
  // DB에서 실시간으로 목록 가져오기 (방문 날짜 역순)
  const entries = useLiveQuery(() => 
    db.entries.orderBy('visitDate').reverse().toArray()
  );

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이동 방지
    if (window.confirm('이 맛있는 기억을 정말 삭제할까요?')) {
      await db.deleteEntry(id);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-full pb-24">
      <div className="flex justify-between items-end mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">나의 맛집 일기</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">총 {entries?.length || 0}개의 기록</p>
        </div>
        <Link 
          to="/write" 
          className="bg-orange-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-600 transition transform hover:scale-105 active:scale-95"
        >
          +
        </Link>
      </div>

      <div className="grid gap-6">
        {entries?.map((entry) => (
          <div 
            key={entry.id} 
            className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* 카드 상단 이미지 영역 */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-gray-700">
              {entry.photo ? (
                <img 
                  src={entry.photo} 
                  alt={entry.restaurantName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🍽️
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button 
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <span className="text-xs">✕</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="flex items-center gap-1 text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < entry.rating ? 'opacity-100' : 'opacity-30'}>★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 카드 하단 정보 영역 */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {entry.restaurantName}
                </h2>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                  {entry.visitDate}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                "{entry.note}"
              </p>
              
              {entry.latitude && (
                <div className="mt-4 flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <span className="text-orange-500 text-xs">📍</span> NEARBY LOCATION
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 데이터가 없을 때 표시할 화면 */}
        {entries && entries.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-6">🏜️</div>
            <p className="text-gray-400 font-bold mb-6 italic">아직 기록된 맛집이 없어요.</p>
            <Link 
              to="/write" 
              className="inline-block px-8 py-4 bg-orange-100 dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-black rounded-2xl hover:bg-orange-200 transition"
            >
              첫 일기 쓰러 가기 ➔
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
