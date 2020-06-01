import React, { Component } from 'react';
import { List } from 'antd';
import Styled from 'styled-components';
import Media from 'styled-media-query';
import { Trans } from 'react-i18next';
import selectCup from '../../miscellanea';

const DrinkColor = Styled.span`
    font-family: Champagne and Limousines;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 23px;
    color: #000000;
    margin-right: 5px;
`;

const drinkIcon = (color) => (icon) => (
    <div>
        <DrinkColor>
            {color}
        </DrinkColor>
        {icon}
    </div>
);

const WineDescription = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        "type ."
        "appellationOfOrigin price";
`;

const TypeArea = Styled.div`
    grid-area: type;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #625656;
`;
const AppellationOfOriginArea = Styled.div`
    grid-area: appellationOfOrigin;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #625656;
`;
const Price = Styled.div`
    grid-area: price;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    color: #625656;
`;

const CellarWrapper = Styled.div`
    border-radius: 15px;
    box-shadow: inset -1px -1px 4px rgba(0, 0, 0, 0.25);
    padding-left: 20px;
    padding-right: 23px;
    margin-top: 5px;
    .ant-list-item {
        display: flex
    }
    .ant-list-item > .ant-list-item-main {
        min-width: 150px;
    }
    .ant-list-item > .ant-list-item-extra {
        display: inline-block;
        align-self: flex-end;
        ${Media.lessThan('medium')`
            margin-bottom: 0px;
        `}
    }
`;

export default class Cellar extends Component {
    render() {
        const { bottles } = this.props;
        return (
            <List
                itemLayout="vertical"
                dataSource={bottles}
                renderItem={({ bottle, title }) => (
                    <CellarWrapper>
                        <List.Item
                            extra={drinkIcon(<Trans i18nKey={`bottle.color.${bottle.color}`} />)(selectCup(bottle))}
                        >
                            <List.Item.Meta title={title} style={{ fontFamily: 'Champagne and Limousines' }} />
                            <WineDescription>
                                <TypeArea><Trans i18nKey={`bottle.type.${bottle.type}`} /></TypeArea>
                                <AppellationOfOriginArea>{bottle.appellationOfOrigin}</AppellationOfOriginArea>
                                <Price>
                                    {bottle.price}
                                    &nbsp;
                                    <Trans i18nKey="currency" />
                                </Price>
                            </WineDescription>
                        </List.Item>
                    </CellarWrapper>
                )}
            />
        );
    }
}
