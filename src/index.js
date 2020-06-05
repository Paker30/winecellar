import React from 'react';
import ReactDOM from 'react-dom';
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
        ReactDOM.render(
            <App />,
            document.getElementById('app'), //  eslint-disable-line no-undef
        );

        module.hot.accept();
    });
