import { RequestInterceptor, ResponseInterceptor } from './index';
import { RequestConfig, APIResponse, APIError } from '../types';

export class AuthInterceptor implements RequestInterceptor, ResponseInterceptor {
  private static instance: AuthInterceptor;
  private authToken: string | null = null;

  private constructor() {}

  static getInstance(): AuthInterceptor {
    if (!AuthInterceptor.instance) {
      AuthInterceptor.instance = new AuthInterceptor();
    }
    return AuthInterceptor.instance;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    // Optionally store in secure storage
    localStorage.setItem('auth_token', token);
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('auth_token');
  }

  getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('auth_token');
    }
    return this.authToken;
  }

  async onRequest(config: RequestConfig): Promise<RequestConfig> {
    const token = this.getAuthToken();
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return config;
  }

  async onResponse<T>(response: APIResponse<T>): Promise<APIResponse<T>> {
    // Handle token refresh if needed
    const newToken = response.headers.get('X-New-Token');
    if (newToken) {
      this.setAuthToken(newToken);
    }
    return response;
  }

  async onResponseError(error: Error): Promise<Error> {
    if ((error as APIError).status === 401) {
      // Handle unauthorized error
      this.clearAuthToken();
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return error;
  }
}
