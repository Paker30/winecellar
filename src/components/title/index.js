import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default class Title extends Component {
    render() {
        const { title } = this.props;
        return (
            <Header>
                <div className="logo">
                    {title}
                </div>
            </Header>
        );
    }
}
