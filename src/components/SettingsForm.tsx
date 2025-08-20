import React from 'react';
import { Box, Text } from 'ink';

interface SettingsFormProps {
  server: string;
  topic: string;
  onServerChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  focusedInput: 'server' | 'topic';
}

export const SettingsForm = ({ server, topic, onServerChange, onTopicChange, focusedInput }: SettingsFormProps) => {
  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, "ntfy server: "),
      React.createElement(Text, { color: focusedInput === 'server' ? 'green' : undefined }, server || '(empty)')
    ),
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, "      topic: "),
      React.createElement(Text, { color: focusedInput === 'topic' ? 'green' : undefined }, topic || '(empty)')
    ),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { color: "green" }, "         [OK]"),
      React.createElement(Text, { color: "red" }, "  [Cancel]")
    )
  );
};