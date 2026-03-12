import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-600">맛있는 일기를 기록하세요!</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        오늘 먹은 맛있는 음식을 기록하고 공유해보세요.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
        일기 쓰기
      </button>
    </div>
  );
};

export default Home;
