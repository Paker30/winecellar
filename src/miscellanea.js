import React from 'react';
import PinkCup from '../assets/pink_cup.svg';
import RedCup from '../assets/red_cup.svg';
import WhiteCup from '../assets/white_cup.svg';
import WhiteChampagne from '../assets/white_champagne.svg';
import PinkChampagne from '../assets/pink_champagne.svg';
import WhiteVermout from '../assets/white_vermout.svg';
import PinkVermout from '../assets/pink_vermout.svg';

const wineCup = (color) => {
    switch (color) {
    case 'Red':
        return <RedCup />;
    case 'White':
        return <WhiteCup />;
    default:
        return <PinkCup />;
    }
};

const champagneCup = (color) => {
    switch (color) {
    case 'White':
        return <WhiteChampagne />;
    default:
        return <PinkChampagne />;
    }
};

const vermoutCup = (color) => {
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

export default selectCup;
