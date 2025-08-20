import axios from 'axios';

interface NtfyMessage {
  topic: string;
  message: string;
  title?: string;
  priority?: number;
  tags?: string[];
}

export class NtfyClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://ntfy.sh') {
    this.baseUrl = baseUrl;
  }

  async sendMessage(message: NtfyMessage): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/${message.topic}`, {
        message: message.message,
        title: message.title,
        priority: message.priority,
        tags: message.tags
      });
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}