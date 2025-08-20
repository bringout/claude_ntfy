#!/usr/bin/env bun

import React from 'react';
import { render } from 'ink';
import { Menu } from './components/Menu';
import { NtfyClient } from './utils/ntfy';

const App = () => {
  const menuItems = [
    'Send PR Open Notification',
    'Send PR Merged Notification',
    'Send Stuck Notification',
    'Exit'
  ];
  
  return React.createElement(Menu, { items: menuItems, selectedIndex: 0 });
};

render(React.createElement(App));