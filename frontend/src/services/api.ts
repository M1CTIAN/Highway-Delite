import axios from 'axios';
import type { Experience, BookingRequest, Booking, PromoCode, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const experienceService = {
  getAllExperiences: async (): Promise<Experience[]> => {
    const response = await api.get<ApiResponse<Experience[]>>('/experiences');
    return response.data.data || [];
  },

  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await api.get<ApiResponse<Experience>>(`/experiences/${id}`);
    if (!response.data.data) {
      throw new Error('Experience not found');
    }
    return response.data.data;
  },
};

export const bookingService = {
  createBooking: async (bookingData: BookingRequest): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
    if (!response.data.data) {
      throw new Error('Failed to create booking');
    }
    return response.data.data;
  },

  getBookingByReference: async (reference: string): Promise<Booking> => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${reference}`);
    if (!response.data.data) {
      throw new Error('Booking not found');
    }
    return response.data.data;
  },
};

export const promoService = {
  validatePromoCode: async (code: string, amount: number): Promise<PromoCode> => {
    const response = await api.post<ApiResponse<PromoCode>>('/promo/validate', {
      code,
      amount,
    });
    if (!response.data.data) {
      throw new Error('Invalid promo code');
    }
    return response.data.data;
  },
};

export default api;
