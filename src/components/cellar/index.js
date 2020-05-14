import React, { Component } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

export default class Cellar extends Component {
    render() {
        const { bottles, adjustMainAreaWide, to } = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={bottles}
                renderItem={(bottle) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Link to={`${to}${bottle.id}`}>{bottle.name}</Link>}
                            description={bottle.year}
                            onClick={() => adjustMainAreaWide('4')}
                        />
                    </List.Item>
                )}
            />
        );
    }
}
