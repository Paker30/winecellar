import React, { Component } from 'react';
import { List } from 'antd';
import Styled from 'styled-components';
import PinkCup from '../../../assets/pink_cup.svg';
import RedCup from '../../../assets/red_cup.svg';
import WhiteCup from '../../../assets/white_cup.svg';
import WhiteChampagne from '../../../assets/pink_champagne.svg';
import PinkChampagne from '../../../assets/white_champagne.svg';
import WhiteVermout from '../../../assets/pink_vermout.svg';
import PinkVermout from '../../../assets/white_vermout.svg';

const wineCup = ({ color }) => {
    switch (color) {
    case 'Red':
        return <RedCup viewBox="0 0 100 100" />;
    case 'White':
        return <WhiteCup viewBox="0 0 100 100" />;
    default:
        return <PinkCup viewBox="0 0 100 100" />;
    }
};

const champagneCup = ({ color }) => {
    switch (color) {
    case 'White':
        return <WhiteChampagne />;
    default:
        return <PinkChampagne />;
    }
};

const vermoutCup = ({ color }) => {
    switch (color) {
    case 'White':
        return <WhiteVermout />;
    default:
        return <PinkVermout />;
    }
};

const selectCup = ({ type, color }) => {
    switch (type) {
    case 'Champagne':
        return champagneCup(color);
    case 'Vermout':
        return vermoutCup(color);
    default:
        return wineCup(color);
    }
};

const DrinkColor = Styled.span`
    font-family: aliens and cows;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 23px;
    color: #000000;
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
    margin-top: 5px;
`;

export default class Cellar extends Component {
    render() {
        const { bottles } = this.props;
        return (
            <List
                itemLayout="vertical"
                dataSource={bottles}
                gutter="4"
                renderItem={({ bottle, title }) => (
                    <CellarWrapper>
                        <List.Item
                            extra={drinkIcon(bottle.color)(selectCup(bottle))}
                        >
                            <List.Item.Meta title={title} />
                            <WineDescription>
                                <TypeArea>{bottle.type}</TypeArea>
                                <AppellationOfOriginArea>{bottle.appellationOfOrigin}</AppellationOfOriginArea>
                                <Price>{bottle.price}</Price>
                            </WineDescription>
                        </List.Item>
                    </CellarWrapper>
                )}
            />
        );
    }
}
