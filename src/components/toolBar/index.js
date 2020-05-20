import React from 'react';
import Styled from 'styled-components';

const ToolBarContainer = Styled.div`
    margin-top: 52px;
    margin-left: 20px;
    margin-right: 10px;
    border-bottom: 1px solid #E1BBCA;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 4px;
`;

const AddWrapper = Styled.div`
    margin-left: auto;
    padding-right: 30px;
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
