# claude-ntfy

[![npm version](https://img.shields.io/npm/v/claude-ntfy)](https://www.npmjs.com/package/claude-ntfy)

TUI application for sending notifications to [ntfy.sh](https://ntfy.sh) about project progress.

## Features

- Send notifications about PR status (open/merged)
- Send "stuck" notifications with appropriate emojis
- Terminal-based user interface
- Command-line interface for automation
- Automatic process exit after command completion
- Clean shutdown for both CLI and TUI interfaces
- Working message sending to ntfy.sh servers

## Installation

```bash
npm install -g claude-ntfy
```

## Usage

### Command Line Interface (CLI)

```bash
# Send a notification
claude-ntfy send "Your message" "Optional title" tag1 tag2

# Example: Send a notification about a feature
claude-ntfy send "Working on feature #1247" "Project 2 update" work progress

# View current settings
claude-ntfy settings

# Update settings
claude-ntfy settings set https://ntfy.cloud.out.ba claude
```

### Terminal User Interface (TUI)

```bash
# Start the TUI application
claude-ntfy-tui
```

In the TUI:
- Use ↑/↓ arrow keys to navigate the menu
- Press Enter to select an option
- Press ESC or Q to exit

## Development

To install dependencies:
```bash
bun install
```

To run in development mode:
```bash
# CLI mode
bun run dev

# TUI mode
bun run dev:tui
```

To build:
```bash
bun run build
```

To run tests:
```bash
bun test
```

## Configuration

The application uses a settings file located at `~/.claude-ntfy/settings.json` with the following structure:

```json
{
  "server": "https://ntfy.cloud.out.ba",
  "topic": "claude"
}
```

You can modify these settings using the CLI command:
```bash
claude-ntfy settings set <server-url> <topic-name>
```

## GitHub Actions

This repository uses GitHub Actions for continuous integration and deployment:

- Tests are automatically run on every push and pull request
- When code is pushed to the main branch and tests pass, a new version is automatically published to npm

To publish a new version:
1. Update the version in `package.json`
2. Run `npm run release` to create a new release
3. Push the changes and tag to GitHub
4. GitHub Actions will automatically publish to npm

## Published Versions

- v0.2.0 - Initial public release