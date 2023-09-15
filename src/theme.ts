// theme.js or theme.ts

import { extendTheme } from '@chakra-ui/react';

import './fonts.css'; // Import the custom font CSS

const theme = extendTheme({
  // Your Chakra UI theme configuration here
  fonts: {
    body: "'Ubuntu', sans-serif", // Apply Ubuntu font to the body component
    heading: "'Ubuntu', sans-serif", // Apply Ubuntu font to headings
  },
});

export default theme;
