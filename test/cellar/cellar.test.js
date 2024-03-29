import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cellar from '../../src/components/cellar/index';

configure({ adapter: new Adapter() });

describe('All the bottles', () => {
    test('The cellar is empty', () => {
        const cellar = shallow(<Cellar bottles={[]} />);
        expect(cellar.find('List').prop('dataSource')).toHaveLength(0);
    });
    // test('There are bottles', () => {
    //     const bottleExample = {
    //         color: 'Red',
    //         id: 'bottle-ka2pdxeb',
    //         name: 'prado marina',
    //         type: 'wine',
    //         year: '2018',
    //         _doc_id_rev: 'ka2pdxec::1-55d50aa0131852bb2113838c6b55d269'
    //     };
    //     const MockDeleteBottle = jest.fn();
    //     const cellar = shallow(<Cellar bottles={[{ bottle: bottleExample, title: 'prado marina' }]} deleteBootle={new MockDeleteBottle()} />);
    //     expect(cellar.find('List').prop('dataSource')).toHaveLength(1);
    //     const bottle = cellar.find('List').render().find('.ant-list-item-meta-content');
    //     expect(bottle).toHaveLength(1);
    // });
});
