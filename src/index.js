import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={client}>
                        <App />
                    </QueryClientProvider>
                </ThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);
