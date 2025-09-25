/**
 * Centralized API service for SWAPI communication
 * Provides type-safe methods for all SWAPI endpoints with error handling.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Character,
  ApiResponse,
  ApiError,
} from '../types';

// Configuration constants
const SWAPI_BASE_URL = 'https://swapi.py4e.com/api';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Main API service class for SWAPI communication
 */
export class SwapiService {
  private client: AxiosInstance;
  
  constructor() {
    // Create axios instance with base configuration
    this.client = axios.create({
      baseURL: SWAPI_BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
  
  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(this.createApiError('Request failed', error));
      }
    );
    
    // Response interceptor for logging and error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`❌ API Error: ${error.response?.status || 'Network'} ${error.config?.url}`);
        return Promise.reject(this.handleApiError(error));
      }
    );
  }
  
  /**
   * Create a standardized API error object
   */
  private createApiError(message: string, originalError?: unknown): ApiError {
    const error: ApiError = { message };
    
    if (originalError instanceof AxiosError) {
      error.status = originalError.response?.status;
      error.details = originalError.response?.data;
    } else if (originalError instanceof Error) {
      error.details = { message: originalError.message };
    } else if (originalError) {
      error.details = { error: String(originalError) };
    }
    
    return error;
  }
  
  /**
   * Handle and transform axios errors into standardized API errors
   */
  private handleApiError(error: AxiosError): ApiError {
    if (error.code === 'ECONNABORTED') {
      return this.createApiError('Request timeout. Please check your internet connection.', error);
    }
    
    if (!error.response) {
      return this.createApiError('Network error. Please check your internet connection.', error);
    }
    
    const message = `An unexpected error occurred: ${error.response.statusText}`;
    return this.createApiError(message, error);
  }
  
  /**
   * Generic request method
   */
  private async request<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }
  
  // Character API methods
  
  /**
   * Get paginated list of characters
   */
  async getCharacters(page: number = 1): Promise<ApiResponse<Character>> {
    return this.request<ApiResponse<Character>>(`/people/?page=${page}`);
  }
  
  /**
   * Search characters by name
   */
  async searchCharacters(query: string): Promise<ApiResponse<Character>> {
    if (!query.trim()) {
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    }
    
    return this.request<ApiResponse<Character>>(
      `/people/?search=${encodeURIComponent(query.trim())}`
    );
  }
  
  /**
   * Get a specific character by ID
   */
  async getCharacter(id: string | number): Promise<Character> {
    return this.request<Character>(`/people/${id}/`);
  }
  
  /**
   * Extract ID from SWAPI URL
   */
  extractIdFromUrl(url: string): string {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  }
}

// Export singleton instance
export const swapiService = new SwapiService();

// Export for dependency injection or testing
export default swapiService;