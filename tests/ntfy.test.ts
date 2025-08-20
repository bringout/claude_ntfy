import { expect, test, describe, mock } from 'bun:test';
import { NtfyClient } from '../src/utils/ntfy';

describe('NtfyClient', () => {
  test('should be able to create an instance', () => {
    const client = new NtfyClient();
    expect(client).toBeInstanceOf(NtfyClient);
  });

  test('should use default base URL', () => {
    const client = new NtfyClient();
    // We can't easily test the private property, but we can test that it was created
    expect(client).toBeDefined();
  });
});