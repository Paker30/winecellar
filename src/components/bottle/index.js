import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import Styled from 'styled-components';
import { Rate, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Trans, withTranslation } from 'react-i18next';
import selectCup from '../../miscellanea';

// eslint-disable-next-line no-confusing-arrow
const displayBorder = (border) => border ? '' : 'none';

const Detail = Styled.div`
    display: flex;
    flex-direction: column;
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
    column-gap: 9px;
    grid-template-areas:
        "title title"
        "description value"
`;

const TitleArea = Styled.div`
    grid-area: title;
    font-family: Champagne and Limousines;
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

const Delete = Styled.div`
    margin-top: auto;
    align-self: center;
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

const MainSection = ({ title, description, value, border = true }) => (
    <DetailContainer style={{ border: displayBorder(border) }}>
        <TitleArea style={{ display: 'flex' }}>
            {title}
            <div style={{ marginLeft: 'auto' }}>
                {value}
            </div>
        </TitleArea>
        <DescriptionArea>
            {description}
        </DescriptionArea>
    </DetailContainer>
);

function Bottle({ find, deleteBootle, history, t }) {
    const query = new URLSearchParams(useLocation().search);
    const bottle = find(query.get('id'));
    const { name, color, type, year, appellationOfOrigin, price, rate, region, notes } = bottle;

    return (
        <Detail>
            <MainSection title={name} description={appellationOfOrigin} value={selectCup({ color, type })} border={false} />
            <Section title={<Trans i18nKey={`bottle.color.${color}`} />} description={<Trans i18nKey={`bottle.type.${type}`} />} value={`${price} ${t('currency')}`} />
            <Section title={region} description={year} value={<Rate allowHalf disabled="true" value={rate} />} />
            <Notes>
                <DescriptionArea style={{ borderBottom: '1px solid #C4C4C4' }}><Trans i18nKey="notes" /></DescriptionArea>
                <ValueArea style={{ justifySelf: 'start' }}>
                    {notes}
                </ValueArea>
            </Notes>
            <Delete>
                <Button
                    icon={<DeleteOutlined />}
                    shape="round"
                    style={{
                        background: '#E1BBCA',
                        color: '#FFFFFF',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)'
                    }}
                    onClick={() => {
                        deleteBootle(bottle);
                        history.push('/');
                    }}
                />
            </Delete>
        </Detail>
    );
}

export default withTranslation()(withRouter(Bottle));
