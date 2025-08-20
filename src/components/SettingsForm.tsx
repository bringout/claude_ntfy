import React from 'react';
import { Box, Text, TextInput } from 'ink';

interface SettingsFormProps {
  server: string;
  topic: string;
  onServerChange: (value: string) => void;
  onTopicChange: (value: string) => void;
}

export const SettingsForm = ({ server, topic, onServerChange, onTopicChange }: SettingsFormProps) => {
  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, "ntfy server: "),
      React.createElement(TextInput, {
        value: server,
        onChange: onServerChange
      })
    ),
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, "      topic: "),
      React.createElement(TextInput, {
        value: topic,
        onChange: onTopicChange
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