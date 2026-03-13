import React, { useState } from 'react';
import { Map as KakaoMap, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/diaryDB';
import type { FoodEntry } from '../types/entry';

const Map: React.FC = () => {
  const entries = useLiveQuery(() => db.entries.toArray());
  const [selectedEntry, setSelectedEntry] = useState<FoodEntry | null>(null);

  // 위치 정보가 있는 일기들만 필터링
  const validEntries = entries?.filter(entry => entry.latitude && entry.longitude) || [];

  return (
    <div className="relative w-full h-full flex flex-col pb-20">
      <header className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b z-10 flex justify-between items-center">
        <h1 className="text-xl font-black italic tracking-tighter text-orange-500 underline underline-offset-4 decoration-2 decoration-orange-300">
          MY FOOD MAP
        </h1>
        <div className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-full uppercase">
          {validEntries.length} SPOTS
        </div>
      </header>

      <div className="flex-1 w-full relative">
        <KakaoMap
          center={{ lat: 37.5665, lng: 126.9780 }} // 기본 서울 중심
          style={{ width: '100%', height: '100%' }}
          level={7}
        >
          {validEntries.map((entry) => (
            <React.Fragment key={entry.id}>
              <MapMarker
                position={{ lat: entry.latitude!, lng: entry.longitude! }}
                onClick={() => setSelectedEntry(entry)}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                  size: { width: 24, height: 35 },
                }}
              />
              
              {selectedEntry?.id === entry.id && (
                <CustomOverlayMap
                  position={{ lat: entry.latitude!, lng: entry.longitude! }}
                  yAnchor={1.3}
                >
                  <div className="relative bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-2xl border border-orange-100 dark:border-gray-700 min-w-[200px] animate-in fade-in zoom-in duration-200">
                    <button 
                      onClick={() => setSelectedEntry(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full text-xs shadow-lg"
                    >
                      ✕
                    </button>
                    
                    <div className="flex gap-3 items-center">
                      {entry.photo ? (
                        <img src={entry.photo} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">🍽️</div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">{entry.restaurantName}</h3>
                        <div className="flex text-orange-400 text-[10px] gap-0.5">
                          {Array.from({ length: entry.rating }).map((_, i) => <span key={i}>★</span>)}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 font-medium line-clamp-1 italic">
                      "{entry.note}"
                    </p>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </KakaoMap>

        {/* 안내 메시지 (API 키 설정 필요시) */}
        <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none">
          <div className="bg-blue-600/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg inline-block backdrop-blur-sm">
            💡 카카오 맵을 사용하려면 index.html에 API Key를 설정해야 합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
