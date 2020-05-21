import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';

ReactDOM.render(
    <App />,
    document.getElementById('app'), //  eslint-disable-line no-undef
);

module.hot.accept();
