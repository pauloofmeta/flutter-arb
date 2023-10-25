import React from 'react';
import { createRoot } from 'react-dom/client';
import { Content } from './components/Content';
import { GlobalStyle } from './styles/GlobalStyle';

const root = createRoot(document.getElementById('root')!);

root.render(
  <>
    <Content />
    <GlobalStyle />
  </>
);
