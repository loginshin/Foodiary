export interface FoodEntry {
  id: string;
  title: string;
  restaurantName: string;
  rating: number;
  content: string;
  date: string;
  imageUrl?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}
