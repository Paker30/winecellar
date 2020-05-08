import React, { Component } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

export default class Cellar extends Component {
    render() {
        const { bottles } = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={bottles}
                renderItem={(bottle) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Link to={`/bottle?id=${bottle.id}`}>{bottle.name}</Link>}
                            description={bottle.year}
                        />
                    </List.Item>
                )}
            />
        );
    }
}
