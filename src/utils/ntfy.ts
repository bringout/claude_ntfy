import axios from 'axios';
import { loadSettings } from './settings';

interface NtfyMessage {
  topic: string;
  message: string;
  title?: string;
  priority?: number;
  tags?: string[];
}

export class NtfyClient {
  async sendMessage(message: string, title?: string, tags?: string[]): Promise<void> {
    try {
      const settings = await loadSettings();
      
      await axios.post(`${settings.server}/${settings.topic}`, {
        message: message,
        title: title,
        tags: tags
      });
      
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}