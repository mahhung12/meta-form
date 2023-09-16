import ApiService from 'services/apiService';

class AuthService extends ApiService {
  constructor() {
    super();
  }

  login(data: { address?: string; signature?: string }) {
    return this.post('/auth/login', data);
  }
}

export const authService = new AuthService();
