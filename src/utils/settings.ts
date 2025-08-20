import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

export interface Settings {
  server: string;
  topic: string;
}

const DEFAULT_SETTINGS: Settings = {
  server: 'https://ntfy.cloud.out.ba',
  topic: 'claude'
};

const SETTINGS_FILE = join(homedir(), '.claude-ntfy', 'settings.json');

export async function loadSettings(): Promise<Settings> {
  try {
    const data = await readFile(SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    // If file doesn't exist or is invalid, return defaults
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    // Ensure directory exists
    await mkdir(join(homedir(), '.claude-ntfy'), { recursive: true });
    // Write settings to file
    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}