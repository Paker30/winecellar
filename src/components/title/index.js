import React, { Component } from 'react';
import Styled from 'styled-components';
import Media from 'styled-media-query';
import { Trans } from 'react-i18next';

const Header = Styled.div`
    background: rgb(185, 79, 114);
    font-family: "Amalfi Coast";
    font-style: normal;
    font-weight: normal;
    text-align: center;
    line-height: 82px;
    font-size: 26px;
    color: rgb(255, 255, 255);
    text-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
    ${Media.lessThan('medium')`
        font-size: 20px;
    `}
`;

export default class Title extends Component {
    render() {
        const { userName: { name } } = this.props;

        return (
            <Header>
                <div className="logo" />
                <Trans i18nKey="title" />
                {name}
            </Header>
        );
    }
}
