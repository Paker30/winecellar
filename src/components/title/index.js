import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export default class Title extends Component {
    render() {
        return (
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">Cellar</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="add">Add</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}
