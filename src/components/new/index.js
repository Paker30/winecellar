import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import Styled from 'styled-components';

const { Option } = Select;

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    }
};

const NewBottle = Styled.div`
    border: 1px solid #f0f0f0;
    padding: 24px;
`;

function OtherBottle({ add, history, adjustMainAreaWide }) {
    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const onFinish = (form) => {
        add(form);
        adjustMainAreaWide('5');
        history.push('/');
    };

    return (
        <NewBottle>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input wine name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="color"
                    name="color"
                    rules={[
                        {
                            required: true,
                            message: 'Wine color',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        <Option value="red">Red</Option>
                        <Option value="white">White</Option>
                        <Option value="pink">Pink</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Kind of wine',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        <Option value="wine">Wine</Option>
                        <Option value="vermout">Vermout</Option>
                        <Option value="champagne">Champagne</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Harvest year',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </NewBottle>
    );
}

export default withRouter(OtherBottle);
