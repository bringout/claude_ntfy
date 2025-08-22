import axios from 'axios';
import { loadSettings } from './settings';

export class NtfyClient {
  async sendMessage(message: string, title?: string, tags?: string[]): Promise<void> {
    try {
      const settings = await loadSettings();
      
      // Build URL with query parameters for title and tags
      const server = settings.server.endsWith('/') ? settings.server.slice(0, -1) : settings.server;
      let url = `${server}/${settings.topic}`;
      const queryParams = [];
      
      if (title) {
        queryParams.push(`title=${encodeURIComponent(title)}`);
      }
      
      if (tags && tags.length > 0) {
        queryParams.push(`tags=${encodeURIComponent(tags.join(','))}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      
      // Send simple text message
      await axios.post(url, message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}