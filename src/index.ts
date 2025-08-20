#!/usr/bin/env bun

import { readFileSync } from 'fs';
import { loadSettings, saveSettings } from './utils/settings';
import type { Settings } from './utils/settings';
import { NtfyClient } from './utils/ntfy';

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0 && (args[0] === '--version' || args[0] === '-v')) {
    const packageJsonPath = `${import.meta.dir}/../package.json`;
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    console.log(packageJson.version);
    process.exit(0);
    return;
  }
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  claude-ntfy send <message> [title] [tags...]');
    console.log('  claude-ntfy settings');
    console.log('  claude-ntfy settings set <server> <topic>');
    process.exit(0);
    return;
  }
  
  const command = args[0];
  
  if (command === 'send') {
    const message = args[1];
    const title = args[2];
    const tags = args.slice(3);
    
    if (!message) {
      console.error('Error: Message is required');
      process.exit(1);
      return;
    }
    
    try {
      const client = new NtfyClient();
      await client.sendMessage(message, title, tags);
      console.log('Message sent successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Failed to send message:', error);
      process.exit(1);
    }
  } else if (command === 'settings') {
    if (args[1] === 'set') {
      const server = args[2];
      const topic = args[3];
      
      if (!server || !topic) {
        console.error('Error: Both server and topic are required');
        process.exit(1);
        return;
      }
      
      try {
        await saveSettings({ server, topic });
        console.log('Settings saved successfully!');
        process.exit(0);
      } catch (error) {
        console.error('Failed to save settings:', error);
        process.exit(1);
      }
    } else {
      try {
        const settings = await loadSettings();
        console.log('Current settings:');
        console.log(`  Server: ${settings.server}`);
        console.log(`  Topic: ${settings.topic}`);
        process.exit(0);
      } catch (error) {
        console.error('Failed to load settings:', error);
        process.exit(1);
      }
    }
  } else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }
}

main();