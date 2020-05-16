import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Descriptions, Rate } from 'antd';

const { Meta } = Card;

function Bottle({ find }) {
    const query = new URLSearchParams(useLocation().search);
    const { name, color, type, year, appellationOfOrigin, price, rate, region, notes } = find(query.get('id'));

    return (
        <div className="site-card-border-less-wrapper">
            <Card>
                <Meta
                    title={name}
                    description={`${color} ${type} from ${year}`}
                />
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title={`${type} details`}
                >
                    <Descriptions title="Geography">
                        <Descriptions.Item label="App. Of Origin">
                            {appellationOfOrigin}
                        </Descriptions.Item>
                        <Descriptions.Item label="Region">
                            {region}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Appreciations">
                        <Descriptions.Item label="Rate">
                            <Rate
                                disabled="true"
                                value={rate}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Price">{price}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Notes">
                        <Descriptions.Item>{notes}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Card>
        </div>
    );
}

export default Bottle;
