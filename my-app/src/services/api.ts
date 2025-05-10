import axios from 'axios';
import type { EnhanceRequest, EnhanceResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const enhanceStandard = async (request: EnhanceRequest): Promise<EnhanceResponse> => {
  try {
    const response = await api.post<EnhanceResponse>('/enhance-standard', request);
    return response.data;
  } catch (error) {
    console.error('Error enhancing standard:', error);
    throw error;
  }
};