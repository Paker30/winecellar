import React, { Component } from 'react';
import { List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default class Cellar extends Component {
    render() {
        const { bottles, adjustMainAreaWide, deleteBootle } = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={bottles}
                renderItem={({ bottle, title }) => (
                    <List.Item
                        actions={[<Button icon={<DeleteOutlined />} onClick={() => deleteBootle(bottle)} />]}
                    >
                        <List.Item.Meta
                            title={title}
                            description={bottle.year}
                            onClick={() => adjustMainAreaWide('4')}
                        />
                    </List.Item>
                )}
            />
        );
    }
}
