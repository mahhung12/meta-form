import ApiService from 'services/apiService';

class StandardService extends ApiService {
  constructor() {
    super();
  }

  sendMessage(url: string, data: { chat_id?: string; text?: string }) {
    return this.get(url, data);
  }
}

export const standardService = new StandardService();
