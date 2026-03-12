import Dexie, { Table } from 'dexie';
import { FoodEntry } from '../types/entry';

export class FoodDiaryDB extends Dexie {
  // 'entries' 테이블 정의
  entries!: Table<FoodEntry>;

  constructor() {
    super('FoodDiaryDB');
    
    // DB 스키마 정의 (id는 기본 키, restaurantName과 visitDate에 인덱스 추가)
    this.version(1).stores({
      entries: 'id, restaurantName, rating, visitDate, createdAt'
    });
  }

  // 일기 저장 (Create)
  async addEntry(entry: FoodEntry) {
    return await this.entries.add(entry);
  }

  // 일기 목록 조회 (Read - 최신 방문 순)
  async getAllEntries() {
    return await this.entries.orderBy('visitDate').reverse().toArray();
  }

  // 단일 일기 조회
  async getEntryById(id: string) {
    return await this.entries.get(id);
  }

  // 일기 수정 (Update)
  async updateEntry(id: string, updates: Partial<FoodEntry>) {
    return await this.entries.update(id, updates);
  }

  // 일기 삭제 (Delete)
  async deleteEntry(id: string) {
    return await this.entries.delete(id);
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
export const db = new FoodDiaryDB();
