#!/usr/bin/env bun

import React, { useState, useEffect } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { loadSettings, Settings } from './utils/settings';
import { NtfyClient } from './utils/ntfy';

const App = () => {
  const [menuIndex, setMenuIndex] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [message, setMessage] = useState('');
  const [exit, setExit] = useState(false);

  // Load settings when component mounts
  useEffect(() => {
    const load = async () => {
      const loadedSettings = await loadSettings();
      setSettings(loadedSettings);
    };
    load();
  }, []);

  useInput((input, key) => {
    if (key.escape || (input === 'q' || input === 'Q')) {
      setExit(true);
      return;
    }

    if (key.upArrow) {
      setMenuIndex(prev => (prev > 0 ? prev - 1 : 4));
    } else if (key.downArrow) {
      setMenuIndex(prev => (prev < 4 ? prev + 1 : 0));
    } else if (key.return) {
      handleMenuSelection();
    }
  });

  const handleMenuSelection = async () => {
    if (menuIndex === 0) {
      // Send PR Open Notification
      await sendNotification('PR Open', 'New pull request opened', ['git', 'pull-request']);
    } else if (menuIndex === 1) {
      // Send PR Merged Notification
      await sendNotification('PR Merged', 'Pull request merged successfully', ['git', 'merged']);
    } else if (menuIndex === 2) {
      // Send Stuck Notification
      await sendNotification('Stuck', 'I am stuck with this feature', ['stuck', 'help']);
    } else if (menuIndex === 3) {
      // View Settings
      setMessage('Viewing settings...');
    } else if (menuIndex === 4) {
      // Exit
      setExit(true);
    }
  };

  const sendNotification = async (title: string, msg: string, tags: string[]) => {
    try {
      const client = new NtfyClient();
      await client.sendMessage(msg, title, tags);
      setMessage('Message sent successfully!');
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`Failed to send message: ${error}`);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Exit the application if requested
  if (exit) {
    return React.createElement(Text, null, "Goodbye!");
  }

  const menuItems = [
    'Send PR Open Notification',
    'Send PR Merged Notification',
    'Send Stuck Notification',
    'View Settings',
    'Exit'
  ];

  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Text,
      { color: "blue" },
      "Claude Ntfy - Notification Sender"
    ),
    React.createElement(Text, null, ""),
    ...menuItems.map((item, index) => 
      React.createElement(
        Text,
        { 
          key: index,
          color: index === menuIndex ? 'green' : undefined
        },
        `${index === menuIndex ? '> ' : '  '}${item}`
      )
    ),
    React.createElement(Text, null, ""),
    message && React.createElement(Text, { color: "yellow" }, message),
    settings && React.createElement(
      Box,
      { flexDirection: "column", marginTop: 1 },
      React.createElement(Text, { color: "gray" }, `Server: ${settings.server}`),
      React.createElement(Text, { color: "gray" }, `Topic: ${settings.topic}`)
    )
  );
};

render(React.createElement(App));