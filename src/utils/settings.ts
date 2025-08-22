import { mkdir, writeFile, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { homedir } from 'os';

export interface Settings {
  server: string;
  topic: string;
}

const DEFAULT_SETTINGS: Settings = {
  server: 'https://ntfy.cloud.out.ba',
  topic: 'claude'
};

export function getSettingsFile(): string {
  const home = process.env.HOME || homedir();
  return join(home, '.claude-ntfy', 'settings.json');
}

export async function loadSettings(): Promise<Settings> {
  try {
    const data = await readFile(getSettingsFile(), 'utf-8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    // If file doesn't exist or is invalid, return defaults
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    const file = getSettingsFile();
    // Ensure directory exists
    await mkdir(dirname(file), { recursive: true });
    // Write settings to file
    await writeFile(file, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}
