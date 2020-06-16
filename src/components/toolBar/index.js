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

const SearchWrapper = Styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    padding-left: 10px;
    padding-right: 10px;
`;

export default function ToolBar({ home, add, search }) {
    return (
        <ToolBarContainer>
            <div>
                {home}
            </div>
            <SearchWrapper>
                {search}
            </SearchWrapper>
            <AddWrapper>
                {add}
            </AddWrapper>
        </ToolBarContainer>
    );
}
