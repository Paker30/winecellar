import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select, Rate, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Styled from 'styled-components';

const { YearPicker } = DatePicker;
const { Option } = Select;

const NewBottle = Styled.div`
    border: 1px solid #f0f0f0;
    padding: 24px;
`;

const cleanObject = (obj) => JSON.parse(JSON.stringify(obj));
const B = (f) => (g) => (x) => f(g(x));
const capitalized = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const toCapitalized = (str) => str.split(' ').map(capitalized).join(' ');

function OtherBottle({ add, history }) {
    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const onFinish = (form) => {
        B(add)(cleanObject)({ ...form, year: form.year.year() });
        history.push('/');
    };

    return (
        <NewBottle
            style={{
                fontFamily: 'aliens and cows',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '28px',
                lineHeight: '23px',
                color: '#880C2D'
            }}
        >
            <Form
                name="newBottle"
                layout="vertical"
                initialValues={{
                    remember: true,
                    rate: 2.5,
                    price: 1
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="name"
                    name="name"
                    normalize={toCapitalized}
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
                        <Option value="Red">Red</Option>
                        <Option value="White">White</Option>
                        <Option value="Pink">Pink</Option>
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
                        <Option value="Wine">Wine</Option>
                        <Option value="Vermout">Vermout</Option>
                        <Option value="Champagne">Champagne</Option>
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
                    <YearPicker />
                </Form.Item>
                <Form.Item
                    label="rate"
                    name="rate"
                    rules={[
                        {
                            required: true,
                            message: 'rate',
                        },
                    ]}
                >
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    label="price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'price',
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="appellation of origin"
                    name="appellationOfOrigin"
                    normalize={toCapitalized}
                    rules={[
                        {
                            required: false,
                            message: 'Appellation of origin',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="region"
                    name="region"
                    normalize={toCapitalized}
                    rules={[
                        {
                            required: false,
                            message: 'region',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="notes"
                    name="notes"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" style={{ backgroundColor: '#E1BBCA', color: '#FFFFFF' }} icon={<PlusOutlined />} />
                </Form.Item>
            </Form>
        </NewBottle>
    );
}

export default withRouter(OtherBottle);
