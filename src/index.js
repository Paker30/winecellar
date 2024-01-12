import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import i18n from './i18n';

i18n
    .init({
        lng: 'es',
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        initImmediate: false
    })
    .then(() => {
        createRoot(document.getElementById('app')).render(<App />);

        module.hot.accept();
    });
