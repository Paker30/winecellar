import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Title from '../../src/components/title/index';

configure({ adapter: new Adapter() });

describe('Cellar title', () => {
    test('Title properties', () => {
        const MockAdjustArea = jest.fn();
        const title = shallow(<Title items={[{ link: <div id="menuOption" type="button">This is a mock</div>, mainAreaWide: 5 }]} adjustMainAreaWide={new MockAdjustArea()} />);
        expect(title.find('Header')).toHaveLength(1);
        expect(title.find('Header').find('Menu')).toHaveLength(1);
        title.find('#menuOption').simulate('click');
        expect(MockAdjustArea.mock.calls).toHaveLength(1);
    });
});
