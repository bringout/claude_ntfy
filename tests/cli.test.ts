import { expect, test, describe } from 'bun:test';
import { spawn } from 'bun';

describe('CLI', () => {
  test('should show help when run without arguments', async () => {
    const proc = spawn(['bun', 'run', 'src/index.ts']);
    const text = await new Response(proc.stdout).text();
    proc.kill();
    
    expect(text).toContain('Usage:');
    expect(text).toContain('claude-ntfy send');
    expect(text).toContain('claude-ntfy settings');
  });

  test('should show current settings', async () => {
    const proc = spawn(['bun', 'run', 'src/index.ts', 'settings']);
    const text = await new Response(proc.stdout).text();
    proc.kill();
    
    expect(text).toContain('Current settings:');
    expect(text).toContain('Server:');
    expect(text).toContain('Topic:');
  });
});