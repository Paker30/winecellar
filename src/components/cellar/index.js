import React, { Component } from 'react';
import { Table } from 'antd';

export default class Cellar extends Component {
    render() {
        const { bottles, columns } = this.props;
        return (
            <Table columns={columns} dataSource={bottles} />
        );
    }
}
