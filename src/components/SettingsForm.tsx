import React from 'react';
import { Box, Text, TextInput } from 'ink';

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
      React.createElement(TextInput, {
        value: server,
        onChange: onServerChange,
        focus: focusedInput === 'server'
      })
    ),
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, "      topic: "),
      React.createElement(TextInput, {
        value: topic,
        onChange: onTopicChange,
        focus: focusedInput === 'topic'
      })
    ),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { color: "green" }, "         [OK]"),
      React.createElement(Text, { color: "red", marginLeft: 2 }, "  [Cancel]")
    )
  );
};