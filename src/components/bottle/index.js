import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import Styled from 'styled-components';
import { Rate, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PinkCup from '../../../assets/pink_cup.svg';
import RedCup from '../../../assets/red_cup.svg';
import WhiteCup from '../../../assets/white_cup.svg';

// eslint-disable-next-line no-confusing-arrow
const displayBorder = (border) => border ? '' : 'none';

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

const Detail = Styled.div`
    width: minmax(300px, 541px);
    height: 513px;
    left: 899px;
    top: 250px;
    padding: 25px 70px 36px 77px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DetailContainer = Styled.div`
    margin-bottom: 10px;
    border-bottom: 1px solid #C4C4C4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 9px;
    grid-template-areas:
        "title ."
        "description value"
`;

const TitleArea = Styled.div`
    grid-area: title;
    font-family: aliens and cows;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 23px;
    color: #000000;
`;

const DescriptionArea = Styled.div`
    grid-area: description;
    align-self: end;
`;

const DeleteArea = Styled.div`
    align-self: center;
`;

const ValueArea = Styled.div`
    grid-area: value;
    justify-self: end;
    align-self: end;
`;

const Notes = Styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    column-gap: 9px;
    grid-template-areas:
        "description"
        "value"
`;

const Section = ({ title, description, value, border = true }) => (
    <DetailContainer style={{ border: displayBorder(border) }}>
        <TitleArea>
            {title}
        </TitleArea>
        <DescriptionArea>
            {description}
        </DescriptionArea>
        <ValueArea>
            {value}
        </ValueArea>
    </DetailContainer>
);

function Bottle({ find, deleteBootle, history }) {
    const query = new URLSearchParams(useLocation().search);
    const bottle = find(query.get('id'));
    const { name, color, type, year, appellationOfOrigin, price, rate, region, notes } = bottle;

    return (
        <Detail>
            <Section title={name} description={appellationOfOrigin} value={selectCup(color)} border={false} />
            <Section title={color} description={type} value={price} />
            <Section title={region} description={year} value={<Rate allowHalf disabled="true" value={rate} />} />
            <Notes>
                <DescriptionArea style={{ borderBottom: '1px solid #C4C4C4' }}>Notes</DescriptionArea>
                <ValueArea style={{ justifySelf: 'start' }}>
                    {notes}
                </ValueArea>
            </Notes>
            <DeleteArea>
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        deleteBootle(bottle);
                        history.push('/');
                    }}
                />
            </DeleteArea>
        </Detail>
    );
}

export default withRouter(Bottle);
