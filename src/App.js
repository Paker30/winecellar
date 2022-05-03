import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Uniqid from 'uniqid';
import PouchDB from 'pouchdb-browser';
import Styled from 'styled-components';
import Media from 'styled-media-query';
import { Trans } from 'react-i18next';
import Title from './components/title';
import ToolBar from './components/toolBar';
import Loading from './components/loading';
import Login from './components/login';
import Search from './components/search';
import { version } from '../package.json';
import AddCup from '../assets/add_cup.svg';

const Bottle = React.lazy(() => import('./components/bottle'));
const OtherBottle = React.lazy(() => import('./components/new'));
const Cellar = React.lazy(() => import('./components/cellar'));

const { Footer } = Layout;

const pickBottle = (bottles) => (bottleId) => bottles.find(({ id }) => id === bottleId);
const retrieveAll = (db) => db.allDocs({ include_docs: true, descending: true })
    .then(({ rows }) => rows.reduce((acc, row) => {
        // eslint-disable-next-line no-unused-expressions
        row.id.match(/user-/)
            ? acc.user = { ...row.doc }
            : acc.bottles = [...acc.bottles, row.doc];
        return acc;
    }, { bottles: [], user: { name: '' } }));
const sameName = (nameA) => (nameB) => nameA.toLowerCase().includes(nameB.toLowerCase());

const HeaderArea = Styled.div`
    grid-area: header;
    position: sticky;
    top: 0;
    z-index:1000;
`;
const FooterArea = Styled.div`
    grid-area: footer;
    position: sticky;
    bottom: 0;
`;

const DetailArea = Styled.div`
    width: 100%;
    ${Media.lessThan('medium')`
        margin-bottom: 10px;
        margin-top: 10px;
        padding-bottom: 100px;
    `}
`;

const MainArea = Styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    column-gap: 10px;
    margin-left: 26px;
    margin-right: 38px;
    margin-bottom: 5px;
    padding-top: 10px;
`;

const ListArea = Styled.div`
    width: 100%;
`;

const Area = Styled.div`
    display: grid;
    height: inherit;
    grid-template-columns: 1fr;
    grid-template-rows: 172px 4fr;
    grid-template-areas:
        "header"
        "main"
        "footer"
`;

const homeLink = (
    <Link
        to="/"
        style={{
            fontFamily: 'aliens and cows',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '33px',
            lineHeight: '27px',
            color: '#880C2D'
        }}
    >
        <Trans i18nKey="cellar" />
    </Link>
);

const addLink = (
    <Link to="/add">
        <AddCup width="50" height="50" viewBox="0 0 150 150" />
    </Link>
);

function PrivateRoute({ userLogged, children, ...rest }) {
    return (
        <Route
            {...rest}
            // eslint-disable-next-line arrow-body-style
            render={() => {
                return userLogged
                    ? (children)
                    : (
                        <Redirect
                            to={{
                                pathname: '/login'
                            }}
                        />
                    );
            }}
        />
    );
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottles: [],
            searchByName: '',
            user: { name: '' },
            db: new PouchDB('cellar_db')
        };
        this.addBottle = this.addBottle.bind(this);
        this.deleteBootle = this.deleteBootle.bind(this);
        this.updateBottle = this.updateBottle.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const { db } = this.state;
        retrieveAll(db)
            .then(({ bottles, user }) => {
                this.setState({ bottles });
                this.setState({ user });
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
        db.put({ ...bottle, _id: id, id: bottleId })
            .then(({ rev }) => {
                this.setState({ bottles: [...bottles, { id: bottleId, _id: id, ...bottle, _rev: rev }] });
            })
            .catch((error) => console.error('Something went wrong adding the bottle', error));
    }

    updateBottle(bottle) {
        const { bottles, db } = this.state;
        db.put(bottle)
            .then(({ rev }) => {
                this.setState({ bottles: [...bottles.filter(({ id }) => id !== bottle.id), { ...bottle, _rev: rev }] });
            })
            .catch((error) => console.error('Something went wrong updating the bottle', error));
    }

    deleteBootle(bottle) {
        const { bottles, db } = this.state;
        const bottleRemove = bottles.find(({ id }) => id === bottle.id);
        db.remove(bottleRemove)
            .then(() => this.setState({ bottles: [...bottles.filter(({ id }) => id !== bottle.id)] }))
            .catch((error) => console.error('Something went wrong removing the bottle', error));
    }

    saveUser(user) {
        const { db } = this.state;
        db.put({ _id: Uniqid('user-'), id: Uniqid(), name: user })
            .then(() => this.setState({ user: { name: user } }))
            .catch((error) => console.error('Something went wrong saving your name', error));
    }

    search(value) {
        const { bottles } = this.state;

        const filteredBottles = bottles.filter(({ name }) => sameName(name)(value));

        if (filteredBottles.length) {
            return filteredBottles;
        }

        return bottles;
    }

    render() {
        const { bottles, user, searchByName } = this.state;

        const mainContent = user.name
            ? (
                <Cellar
                    bottles={this.search(searchByName).map((bottle) => ({ bottle, title: <Link to={`/bottle?id=${bottle.id}`}>{bottle.name}</Link> }))}
                />
            )
            : (
                <Login saveUser={this.saveUser} />
            );
        return (
            <Area>
                <Router>
                    <HeaderArea>
                        <Title userName={user} />
                        <ToolBar
                            home={homeLink}
                            add={addLink}
                            search={<Search onSearch={(value) => this.setState({ searchByName: value })} />}
                        />
                    </HeaderArea>
                    <MainArea>
                        <ListArea>
                            <Switch>
                                <Route path="/">
                                    <Suspense fallback={<div><Trans i18nKey="loading" /></div>}>
                                        {mainContent}
                                    </Suspense>
                                </Route>
                            </Switch>
                        </ListArea>
                        <DetailArea>
                            <Switch>
                                <Route path="/bottle">
                                    <Suspense fallback={<Loading />}>
                                        <Bottle find={pickBottle(bottles)} deleteBootle={this.deleteBootle} />
                                    </Suspense>
                                </Route>
                                <PrivateRoute userLogged={user.name} path="/add">
                                    <Suspense fallback={<Loading />}>
                                        <OtherBottle add={this.addBottle} find={pickBottle(bottles)} />
                                    </Suspense>
                                </PrivateRoute>
                                <Route path="/edit">
                                    <Suspense fallback={<Loading />}>
                                        <OtherBottle add={this.updateBottle} find={pickBottle(bottles)} />
                                    </Suspense>
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
