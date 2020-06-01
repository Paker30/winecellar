import React from 'react';
import Styled from 'styled-components';

const ToolBarContainer = Styled.div`
    margin-left: 20px;
    margin-right: 10px;
    border-bottom: 1px solid #E1BBCA;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 4px;
    background: #FFFFFF;
`;

const AddWrapper = Styled.div`
    margin-left: auto;
    padding-top: 9px;
    padding-right: 25px;
    padding-left: 15px;
    border-radius: 50%;
    background: #E1BBCA;
    height: 50px;
    width: 50px;
`;

export default function ToolBar({ home, add }) {
    return (
        <ToolBarContainer>
            <div>
                {home}
            </div>
            <AddWrapper>
                {add}
            </AddWrapper>
        </ToolBarContainer>
    );
}
