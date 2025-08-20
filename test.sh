#!/bin/bash
# Script to run all tests properly

# Remove any existing test settings file
rm -f ~/.claude-ntfy/settings.json

# Run tests that don't use module mocking
bun test tests/example.test.ts tests/settings-form.test.ts tests/settings.test.ts tests/cli.test.ts

# Run tests that use module mocking separately
bun test tests/ntfy.test.ts