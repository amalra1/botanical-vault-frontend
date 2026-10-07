import { api } from '@/lib/api';
import { API_PATHS } from '@/constants/apiPaths';
import type { LoginPayload, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(API_PATHS.login, payload);
    return data;
  },
};
