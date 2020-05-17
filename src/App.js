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
import AddCup from '../assets/add_cup.svg';

const { Footer } = Layout;
const pickBottle = (bottles) => (bottleId) => bottles.find(({ id }) => id === bottleId);

const HeaderArea = Styled.div`
    grid-area: header;
`;
const FooterArea = Styled.div`
    grid-area: footer;
`;
const MainArea = Styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    column-gap: 10px;
    margin-left: 26px;
    margin-right: 38px;
    padding-top: 10px;
`;
const ListArea = Styled.div`
    width: 100%;
`;
const DetailArea = Styled.div`
    width: 100%;
`;

const Area = Styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    grid-template-areas:
        "header"
        "main"
        "footer"
`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottles: [],
            db: new PouchDB('cellar_db')
        };
        this.addBottle = this.addBottle.bind(this);
        this.deleteBootle = this.deleteBootle.bind(this);
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
            .then(({ rev }) => {
                this.setState({ bottles: [...bottles, { id: bottleId, _id: id, ...bottle, _rev: rev }] });
            })
            .catch((error) => console.log('Something went wrong adding the bottle', error));
    }

    deleteBootle(bottle) {
        const { bottles, db } = this.state;
        const bottleRemove = bottles.find(({ id }) => id === bottle.id);
        db.remove(bottleRemove)
            .then(() => this.setState({ bottles: [...bottles.filter(({ id }) => id !== bottle.id)] }))
            .catch((error) => console.log('Something went wrong removing the bottle', error));
    }

    render() {
        const { bottles } = this.state;
        return (
            <Area>
                <Router>
                    <HeaderArea>
                        <Title />
                        <div
                            style={{
                                marginTop: '52px',
                                marginLeft: '20px',
                                marginRight: '10px',
                                borderBottom: '1px solid #E1BBCA',
                                display: 'flex',
                                alignItems: 'flex-end',
                                flexWrap: 'wrap',
                                padding: '4px'
                            }}
                        >
                            <Link
                                style={{
                                    'font-family': 'aliens and cows',
                                    'font-style': 'normal',
                                    'font-weight': 'normal',
                                    'font-size': '33px',
                                    'line-height': '27px',
                                    color: '#880C2D'
                                }}
                                to="/cellar"
                            >
                                Cellar
                            </Link>
                            <Link
                                to="/cellar/add"
                                style={{
                                    marginLeft: 'auto',
                                    paddingRight: '30px'
                                }}
                            >
                                <AddCup />
                            </Link>
                        </div>
                    </HeaderArea>
                    <MainArea>
                        <ListArea>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/cellar" />
                                </Route>
                                <Route path="/cellar">
                                    <Cellar
                                        bottles={bottles.map((bottle) => ({ bottle, title: <Link to={`/cellar/bottle?id=${bottle.id}`}>{bottle.name}</Link> }))}
                                        deleteBootle={this.deleteBootle}
                                    />
                                </Route>
                            </Switch>
                        </ListArea>
                        <DetailArea>
                            <Switch>
                                <Route path="/cellar/bottle">
                                    <Bottle find={pickBottle(bottles)} />
                                </Route>
                                <Route path="/cellar/add">
                                    <OtherBottle add={this.addBottle} />
                                </Route>
                            </Switch>
                        </DetailArea>
                    </MainArea>
                    <FooterArea>
                        <Footer style={{ display: 'flex' }}>
                            <span>
                                Icons and design by &nbsp;
                                <a
                                    href="https://www.instagram.com/melapbq/?hl=es"
                                    style={{ color: 'inherit' }}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Mel
                                </a>
                            </span>
                            <span style={{ marginLeft: 'auto' }}>{`v ${version}`}</span>
                        </Footer>
                    </FooterArea>
                </Router>
            </Area>
        );
    }
}
