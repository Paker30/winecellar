import React, { Component } from 'react';
import { Layout } from 'antd';
import Title from './components/title';
import Cellar from './components/cellar';

const { Content, Footer } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Color',
                    dataIndex: 'color',
                    key: 'color'
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    title: 'Year',
                    dataIndex: 'year',
                    key: 'year'
                },
            ],
            bottles: [
                {
                    key: '1',
                    name: 'prado marina',
                    color: 'red',
                    type: 'wine',
                    year: 2018
                },
                {
                    key: '2',
                    name: 'figueroa',
                    color: 'red',
                    type: 'wine',
                    year: 2018
                }
            ]
        };
    }

    render() {
        const { columns, bottles } = this.state;
        return (
            <Layout className="layout">
                <Title title="Mi Bodega" />
                <Content>
                    <div>
                        <Cellar columns={columns} bottles={bottles} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created by Paker30</Footer>
            </Layout>
        );
    }
}
