import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'antd';

function Bottle({ find }) {
    const query = new URLSearchParams(useLocation().search);
    const { name, color, type, year } = find(query.get('id'));

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={name} bordered={false} style={{ width: 300 }}>
                <p>{color}</p>
                <p>{type}</p>
                <p>{year}</p>
            </Card>
        </div>
    );
}

export default Bottle;
