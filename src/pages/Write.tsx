import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db/diaryDB';
import { FoodEntry } from '../types/entry';

const Write: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [restaurantName, setRestaurantName] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState<string | undefined>();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // 사진 업로드 처리 (Base64 변환)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 현재 위치 가져오기
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('위치 정보를 가져오는 데 실패했습니다.');
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!restaurantName || !note) {
      alert('식당 이름과 한 줄 일기를 입력해주세요!');
      return;
    }

    const newEntry: FoodEntry = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      restaurantName,
      note,
      rating,
      photo,
      latitude: location?.lat,
      longitude: location?.lng,
      visitDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      createdAt: new Date().toISOString(),
    };

    try {
      await db.addEntry(newEntry);
      alert('맛있는 추억이 저장되었습니다! 😋');
      navigate('/');
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-full pb-24">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-2xl">←</button>
        <h1 className="text-xl font-bold">새로운 맛집 일기</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 사진 업로드 영역 */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden cursor-pointer"
        >
          {photo ? (
            <img src={photo} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <span className="text-4xl mb-2">📸</span>
              <span className="text-sm text-gray-500">사진을 추가해보세요</span>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* 식당 이름 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">식당 이름</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition"
            placeholder="어디서 드셨나요?"
            required
          />
        </div>

        {/* 평점 선택 (별점 대신 간단한 버튼 스타일) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">오늘의 맛은?</label>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`flex-1 py-3 rounded-xl font-bold transition ${
                  rating >= num 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-none' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}
              >
                {num}점
              </button>
            ))}
          </div>
        </div>

        {/* 한 줄 일기 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">한 줄 일기</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition h-24"
            placeholder="맛의 감동을 한 줄로 남겨보세요!"
            required
          />
        </div>

        {/* 위치 정보 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">위치 정보</label>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={isLocating}
            className="w-full py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition flex items-center justify-center gap-2"
          >
            {isLocating ? (
              '위치 파악 중...'
            ) : location ? (
              <>📍 위치 등록 완료 ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})</>
            ) : (
              '📍 현재 위치 등록하기'
            )}
          </button>
        </div>

        {/* 저장 버튼 */}
        <button
          type="submit"
          className="w-full py-4 bg-orange-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-200 dark:shadow-none hover:bg-orange-600 transition transform active:scale-95"
        >
          기억하기 ✨
        </button>
      </form>
    </div>
  );
};

export default Write;
