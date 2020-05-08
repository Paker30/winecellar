import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Uniqid from 'uniqid';
import Styled from 'styled-components';
import Title from './components/title';
import Cellar from './components/cellar';
import Bottle from './components/bottle';
import OtherBottle from './components/new';

const { Footer } = Layout;
const pickBottle = (bottles) => (bottleId) => bottles.find(({ id }) => id === bottleId);
const Container = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
    gap: 15px 10px;
    height: 100%;
    grid-template-areas: 
        "header header header header"
        "main main main detail"
        "footer footer footer footer";
`;
const HeaderArea = Styled.div`
    grid-area: header;
`;
const FooterArea = Styled.div`
    grid-area: footer;
    align-self: end;
    
`;
const MainArea = Styled.div`
    grid-area: main;
    justify-items: center;
    grid-column-start: 1;
    grid-column-end: 5;
    margin-left: 10px;
    margin-right: 10px;
`;
const DetailArea = Styled.div`
    grid-area: detail;
    grid-column-start: 4;
    grid-column-end: 5;
    margin-left: 10px;
    margin-right: 10px;
`;

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
                <Container>
                    <HeaderArea>
                        <Title title="Mi Bodega" items={[<Link to="/">Cellar</Link>, <Link to="add">Add</Link>]} />
                    </HeaderArea>
                    <MainArea>
                        <Switch>
                            <Route exact path="/">
                                <Cellar columns={columns} bottles={bottles} />
                            </Route>
                        </Switch>
                    </MainArea>
                    <DetailArea>
                        <Switch>
                            <Route path="/bottle">
                                <Bottle find={pickBottle(bottles)} />
                            </Route>
                            <Route path="/add">
                                <OtherBottle add={this.addBottle} />
                            </Route>
                        </Switch>
                    </DetailArea>
                    <FooterArea>
                        <Footer style={{ textAlign: 'center' }}>
                            Created by Paker30
                        </Footer>
                    </FooterArea>
                </Container>
            </Router>
        );
    }
}
