import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/v1/auth';

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Axios instance'ını yapılandır
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CORS için önemli
});

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/login', data);
  console.log("Login response:", response.data);
  // Token'ı cookie'ye kaydet
  Cookies.set('token', response.data.token, {
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
  // Token cookie'sini sil
  Cookies.remove('token', { path: '/' });
};

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

export const checkUserStatus = async (): Promise<boolean> => {
  try {
    const token = Cookies.get('token');
    console.log("token: " + token);
    if (!token) return false;

    const { jwtDecode } = await import('jwt-decode');
    const decoded = jwtDecode<JwtPayload>(token);
    const username = decoded.sub;
    console.log(username);

    const response = await api.get<boolean>(`http://localhost:8080/v1/api/user/status/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error checking user status:', error);
    return false;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await logout();
    window.location.href = '/login';
  } catch (error) {
    console.error('Error logging out:', error);
  }
}; 