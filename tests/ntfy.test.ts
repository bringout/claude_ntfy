import { expect, test, describe, mock } from 'bun:test';
import { NtfyClient } from '../src/utils/ntfy';
import * as settings from '../src/utils/settings';

// Mock axios for testing
const mockPost = mock(() => Promise.resolve({ data: {} }));

describe('NtfyClient', () => {
  test('should be able to create an instance', () => {
    const client = new NtfyClient();
    expect(client).toBeInstanceOf(NtfyClient);
  });

  test('should send message with correct parameters', async () => {
    // Mock settings
    const mockLoadSettings = mock(() => Promise.resolve({
      server: 'https://test.example.com',
      topic: 'test-topic'
    }));

    // Mock the settings module
    mock.module('../src/utils/settings', () => ({
      loadSettings: mockLoadSettings
    }));
    
    // Mock axios
    mock.module('axios', () => ({
      default: { post: mockPost },
      post: mockPost
    }));

    const client = new NtfyClient();
    const message = 'Test message';
    const title = 'Test title';
    const tags = ['tag1', 'tag2'];
    
    await client.sendMessage(message, title, tags);
    
    // Verify axios.post was called with correct URL and data
    expect(mockPost).toHaveBeenCalledWith(
      'https://test.example.com/test-topic?title=Test%20title&tags=tag1%2Ctag2',
      message,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    );
  });
});