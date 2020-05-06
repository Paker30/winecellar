import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Uniqid from 'uniqid';
import Title from './components/title';
import Cellar from './components/cellar';
import Bottle from './components/bottle';
import OtherBottle from './components/new';

const { Content, Footer } = Layout;
const pickBottle = (bottles) => (bottleId) => bottles.find(({ id }) => id === bottleId);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (name, record) => <Link to={`/bottle?id=${record.id}`}>{name}</Link>
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
                    id: Uniqid('bottle-'),
                    name: 'prado marina',
                    color: 'red',
                    type: 'wine',
                    year: 2018
                },
                {
                    key: '2',
                    id: Uniqid('bottle-'),
                    name: 'figueroa',
                    color: 'red',
                    type: 'wine',
                    year: 2018
                }
            ]
        };
        this.addBottle = this.addBottle.bind(this);
    }

    addBottle(bottle) {
        const { bottles } = this.state;
        this.setState({ bottles: [...bottles, { id: Uniqid('bottle-'), key: bottles.length.toString(), ...bottle }] });
    }

    render() {
        const { columns, bottles } = this.state;
        return (
            <Router>
                <Layout className="layout">
                    <Title title="Mi Bodega" />
                    <Content>
                        <div>
                            <Switch>
                                <Route exact path="/">
                                    <Cellar columns={columns} bottles={bottles} />
                                </Route>
                                <Route path="/bottle">
                                    <Bottle find={pickBottle(bottles)} />
                                </Route>
                                <Route path="/add">
                                    <OtherBottle add={this.addBottle} />
                                </Route>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Created by Paker30</Footer>
                </Layout>
            </Router>
        );
    }
}
