import axios from 'axios';

interface CheckUserStatusResponse {
    isActive: boolean;
    currentIp: string;
}

export const checkUserStatus = async (): Promise<boolean> => {
    try {
        const response = await axios.get<CheckUserStatusResponse>('/api/user/status');
        return response.data.isActive;
    } catch (error) {
        console.error('Error checking user status:', error);
        return false;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await axios.post('/api/auth/logout');
        window.location.href = '/login';
    } catch (error) {
        console.error('Error logging out:', error);
    }
}; 