import React, { Component } from 'react';
import { List, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Styled from 'styled-components';
import PinkCup from '../../../assets/pink_cup.svg';
import RedCup from '../../../assets/red_cup.svg';
import WhiteCup from '../../../assets/white_cup.svg';

const IconText = ({ icon, text, onClick }) => (
    <Space onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const selectCup = (color) => {
    switch (color) {
    case 'Red':
        return <RedCup />;
    case 'White':
        return <WhiteCup />;
    default:
        return <PinkCup />;
    }
};

const WineColor = Styled.span`
    font-family: aliens and cows;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 23px;
    color: #000000;
`;

const wineIcon = (color) => (icon) => (
    <div>
        <WineColor>
            {color}
        </WineColor>
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

export default class Cellar extends Component {
    render() {
        const { bottles, adjustMainAreaWide, deleteBootle } = this.props;
        return (
            <List
                itemLayout="vertical"
                dataSource={bottles}
                renderItem={({ bottle, title }) => (
                    <List.Item
                        actions={[<IconText icon={DeleteOutlined} onClick={() => deleteBootle(bottle)} />]}
                        extra={wineIcon(bottle.color)(selectCup(bottle.color))}
                    >
                        <List.Item.Meta
                            title={title}
                            onClick={() => adjustMainAreaWide('4')}
                        />
                        <WineDescription>
                            <TypeArea>{bottle.type}</TypeArea>
                            <AppellationOfOriginArea>{bottle.appellationOfOrigin}</AppellationOfOriginArea>
                            <Price>{bottle.price}</Price>
                        </WineDescription>
                    </List.Item>
                )}
            />
        );
    }
}
