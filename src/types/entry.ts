export interface FoodEntry {
  /** 유니크 ID (UUID 또는 Timestamp) */
  id: string;
  
  /** 맛집(식당) 이름 */
  restaurantName: string;
  
  /** 한 줄 일기 (노트) */
  note: string;
  
  /** 별점 (1~5) */
  rating: number;
  
  /** 사진 (URL 또는 Base64 문자열) */
  photo?: string;
  
  /** 위도 */
  latitude?: number;
  
  /** 경도 */
  longitude?: number;
  
  /** 방문 날짜 (ISO 8601 형식: YYYY-MM-DD) */
  visitDate: string;
  
  /** 데이터 생성 일시 (ISO 8601 형식) */
  createdAt: string;
}
