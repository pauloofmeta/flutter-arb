import React from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyle';
import { MainPage } from './pages/MainPage';
import { CommandsProvider } from './contexts/CommandsContext';

const root = createRoot(document.getElementById('root')!);

root.render(
  <CommandsProvider>
    <MainPage />
    <GlobalStyle />
  </CommandsProvider>
);
