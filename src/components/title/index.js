import React, { Component } from 'react';
import { Layout } from 'antd';
import { Trans } from 'react-i18next';

const { Header } = Layout;

export default class Title extends Component {
    render() {
        return (
            <Header
                style={{
                    background: '#B94F72',
                    fontFamily: 'Amalfi Coast',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    textAlign: 'center',
                    fontSize: '26px',
                    lineHeight: '82px',
                    color: '#FFFFFF',
                    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div className="logo" />
                <Trans i18nKey="title" />
            </Header>
        );
    }
}
