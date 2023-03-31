import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Content } from './components/Content';
import { GlobalStyle } from './styles/GlobalStyle';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
    <>
        <Content />
        <GlobalStyle />
    </>
)