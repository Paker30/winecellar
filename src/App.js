import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Uniqid from 'uniqid';
import PouchDB from 'pouchdb-browser';
import Styled from 'styled-components';
import Title from './components/title';
import Cellar from './components/cellar';
import Bottle from './components/bottle';
import OtherBottle from './components/new';
import { version } from '../package.json';

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
const MainArea = Styled.div.attrs(({ columnEnd }) => ({ columnEnd: columnEnd || '5' }))`
    grid-area: main;
    justify-items: center;
    grid-column-start: 1;
    grid-column-end: ${(props) => props.columnEnd};
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
            bottles: [],
            mainAreaWide: '5',
            db: new PouchDB('cellar_db')
        };
        this.addBottle = this.addBottle.bind(this);
        this.adjustMainAreaWide = this.adjustMainAreaWide.bind(this);
    }

    componentDidMount() {
        const { db } = this.state;
        db.allDocs({ include_docs: true, descending: true })
            .then(({ rows }) => {
                this.setState({ bottles: rows.map(({ doc }) => doc) });
            })
            .catch((error) => {
                console.error('Something went wrong fetching the bottles', error);
                this.setState({ bottles: [] });
            });
    }

    addBottle(bottle) {
        const { bottles, db } = this.state;
        const bottleId = Uniqid('bottle-');
        const id = Uniqid();
        db.put({ _id: id, id: bottleId, ...bottle })
            .then(() => this.setState({ bottles: [...bottles, { id: bottleId, _id: id, ...bottle }] }))
            .catch((error) => console.log('Something went wrong adding the bottle', error));
    }

    adjustMainAreaWide(columnEnd = '5') {
        this.setState({ mainAreaWide: columnEnd });
    }

    render() {
        const { columns, bottles, mainAreaWide } = this.state;
        return (
            <Router>
                <Container>
                    <HeaderArea>
                        <Title
                            title="Mi Bodega"
                            adjustMainAreaWide={this.adjustMainAreaWide}
                            items={[{ link: <Link to="/cellar">Cellar</Link>, mainAreaWide: '5' }, { link: <Link to="/cellar/add">Add</Link>, mainAreaWide: '4' }]}
                        />
                    </HeaderArea>
                    <MainArea columnEnd={mainAreaWide}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/cellar" />
                            </Route>
                            <Route path="/cellar">
                                <Cellar
                                    columns={columns}
                                    bottles={bottles.map((bottle) => ({ ...bottle, title: <Link to={`/cellar/bottle?id=${bottle.id}`}>{bottle.name}</Link> }))}
                                    adjustMainAreaWide={this.adjustMainAreaWide}
                                />
                            </Route>
                        </Switch>
                    </MainArea>
                    <DetailArea>
                        <Switch>
                            <Route path="/cellar/bottle">
                                <Bottle find={pickBottle(bottles)} />
                            </Route>
                            <Route path="/cellar/add">
                                <OtherBottle add={this.addBottle} adjustMainAreaWide={this.adjustMainAreaWide} />
                            </Route>
                        </Switch>
                    </DetailArea>
                    <FooterArea>
                        <Footer style={{ textAlign: 'center' }}>
                            {`Created by Paker30 version ${version}`}
                        </Footer>
                    </FooterArea>
                </Container>
            </Router>
        );
    }
}
