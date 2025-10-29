export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image_url: string;
  base_price: number;
  duration: string;
  rating: number;
  reviews_count: number;
  total_slots?: number;
  min_price?: number;
  slots?: Slot[];
  created_at?: string;
}

export interface Slot {
  id: string;
  experience_id: string;
  date: string;
  time_slot: string;
  available_spots: number;
  total_spots: number;
  price: number;
}

export interface BookingRequest {
  experience_id: string;
  slot_id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  number_of_people: number;
  promo_code?: string;
}

export interface Booking {
  id: string;
  experience_id: string;
  slot_id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  number_of_people: number;
  promo_code?: string;
  discount_amount: number;
  base_amount: number;
  final_amount: number;
  status: string;
  booking_reference: string;
  experience_title?: string;
  experience_location?: string;
  experience_image?: string;
  slot_date?: string;
  time_slot?: string;
  created_at: string;
}

export interface PromoCode {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  discount_amount: number;
  final_amount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}
