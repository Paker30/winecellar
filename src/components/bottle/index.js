import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Descriptions } from 'antd';

const { Meta } = Card;

function Bottle({ find }) {
    const query = new URLSearchParams(useLocation().search);
    const { name, color, type, year } = find(query.get('id'));

    return (
        <div className="site-card-border-less-wrapper">
            <Card style={{ width: 300 }}>
                <Meta
                    title={name}
                    description={year}
                />
                <br />
                <Descriptions title="Details">
                    <Descriptions.Item label="color">{color}</Descriptions.Item>
                    <Descriptions.Item label="type">{type}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
}

export default Bottle;
