import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { join } from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { homedir } from 'os';
import { loadSettings, saveSettings, Settings } from '../src/utils/settings';

describe('Settings', () => {
  const testSettingsDir = join(homedir(), '.claude-ntfy-test');
  let originalHome: string | undefined;
  
  beforeEach(() => {
    // Save original HOME
    originalHome = process.env.HOME;
    // Set test directory
    process.env.HOME = testSettingsDir;
  });
  
  afterEach(async () => {
    // Restore original HOME
    process.env.HOME = originalHome;
    // Clean up test directory
    try {
      await rm(testSettingsDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  test('should load default settings when no file exists', async () => {
    const settings = await loadSettings();
    expect(settings.server).toBe('https://ntfy.cloud.out.ba');
    expect(settings.topic).toBe('claude');
  });

  test('should load saved settings', async () => {
    const testSettings: Settings = {
      server: 'https://test.example.com',
      topic: 'test-topic'
    };
    
    await saveSettings(testSettings);
    const loadedSettings = await loadSettings();
    
    expect(loadedSettings.server).toBe(testSettings.server);
    expect(loadedSettings.topic).toBe(testSettings.topic);
  });

  test('should save settings to file', async () => {
    const testSettings: Settings = {
      server: 'https://save-test.example.com',
      topic: 'save-test-topic'
    };
    
    await saveSettings(testSettings);
    const loadedSettings = await loadSettings();
    
    expect(loadedSettings.server).toBe(testSettings.server);
    expect(loadedSettings.topic).toBe(testSettings.topic);
  });
});