import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default class Title extends Component {
    render() {
        return (
            <Header
                style={{
                    background: '#B94F72',
                    'font-family': 'Amalfi Coast',
                    'font-style': 'normal',
                    'font-weight': 'normal',
                    'text-align': 'center',
                    'font-size': '26px',
                    'line-height': '82px',
                    color: '#FFFFFF',
                    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div className="logo" />
                Los Vinos de Paco
            </Header>
        );
    }
}
