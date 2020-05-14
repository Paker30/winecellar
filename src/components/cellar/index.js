import React, { Component } from 'react';
import { List } from 'antd';

export default class Cellar extends Component {
    render() {
        const { bottles, adjustMainAreaWide } = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={bottles}
                renderItem={(bottle) => (
                    <List.Item>
                        <List.Item.Meta
                            title={bottle.title}
                            description={bottle.year}
                            onClick={() => adjustMainAreaWide('4')}
                        />
                    </List.Item>
                )}
            />
        );
    }
}
