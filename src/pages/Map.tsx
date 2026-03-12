import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">내 맛집 지도</h1>
        <p className="text-sm text-gray-500">지도를 보며 맛집의 추억을 떠올려보세요!</p>
      </div>
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        {/* TODO: Google Maps or Kakao Maps API 연동 */}
        <div className="text-center p-8 bg-white shadow-sm rounded-2xl">
          <p className="text-3xl mb-4">📍</p>
          <p className="text-gray-600">지도 서비스가 곧 제공될 예정입니다.</p>
          <p className="text-xs text-gray-400 mt-2">(API 키 설정이 필요합니다)</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
