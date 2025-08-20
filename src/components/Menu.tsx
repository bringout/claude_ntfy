import React from 'react';
import { Box, Text } from 'ink';

interface MenuProps {
  items: string[];
  selectedIndex: number;
}

export const Menu = ({ items, selectedIndex }: MenuProps) => {
  return React.createElement(
    Box,
    { flexDirection: "column" },
    items.map((item, index) => 
      React.createElement(
        Text,
        { 
          key: index, 
          color: index === selectedIndex ? 'green' : undefined 
        },
        `${index === selectedIndex ? '> ' : '  '}${item}`
      )
    )
  );
};