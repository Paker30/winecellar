import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select, Rate, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Trans } from 'react-i18next';
import Styled from 'styled-components';

const { YearPicker } = DatePicker;
const { Option } = Select;

const NewBottle = Styled.div`
    display: flex;
    flex-direction: column;
    width: minmax(300px, 541px);
    height: 870px;
    top: 250px;
    padding: 25px 70px 36px 77px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
        <NewBottle>
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
                    label={<Trans i18nKey="forms.new.name" />}
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
                    label={<Trans i18nKey="forms.new.color" />}
                    name="color"
                    rules={[
                        {
                            required: true,
                            message: 'Wine color',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        <Option value="Red"><Trans i18nKey="bottle.color.Red" /></Option>
                        <Option value="White"><Trans i18nKey="bottle.color.White" /></Option>
                        <Option value="Pink"><Trans i18nKey="bottle.color.Pink" /></Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<Trans i18nKey="forms.new.type" />}
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Kind of wine',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        <Option value="Wine"><Trans i18nKey="bottle.type.Wine" /></Option>
                        <Option value="Vermout"><Trans i18nKey="bottle.type.Vermout" /></Option>
                        <Option value="Champagne"><Trans i18nKey="bottle.type.Champagne" /></Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<Trans i18nKey="forms.new.year" />}
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
                    label={<Trans i18nKey="forms.new.rate" />}
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
                    label={<Trans i18nKey="forms.new.price" />}
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
                    label={<Trans i18nKey="forms.new.appellationOfOrigin" />}
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
                    label={<Trans i18nKey="forms.new.region" />}
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
                    label={<Trans i18nKey="forms.new.notes" />}
                    name="notes"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" style={{ backgroundColor: '#E1BBCA', borderRadius: '12px', color: '#FFFFFF' }} icon={<PlusOutlined />} />
                </Form.Item>
            </Form>
        </NewBottle>
    );
}

export default withRouter(OtherBottle);
