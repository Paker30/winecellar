import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default class Title extends Component {
    render() {
        const { items, adjustMainAreaWide } = this.props;
        return (
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                    {// eslint-disable-next-line react/no-array-index-key
                        items.map(({ link, mainAreaWide }, index) => (<Menu.Item onClick={() => adjustMainAreaWide(mainAreaWide)} key={index}>{link}</Menu.Item>))
                    }
                </Menu>
            </Header>
        );
    }
}
