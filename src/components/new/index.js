import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Rate, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Trans } from 'react-i18next';
import Styled from 'styled-components';
import Media from 'styled-media-query';
import Moment from 'moment';
import Close from '../../../assets/close.svg';

const { YearPicker } = DatePicker;
const { Option } = Select;

const NewBottle = Styled.div`
    display: flex;
    font-family: Champagne and Limousines;
    flex-direction: column;
    width: minmax(300px, 541px);
    height: inherit;
    top: 250px;
    padding: 25px 20px 36px 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    label {
        color: #880C2D;
        content: ''
    }
    ${Media.greaterThan('medium')`
        max-height: 712px;
        overflow: auto;
        ::-webkit-scrollbar {
            display: none;
        }
    `}
`;

const CloseWrapper = Styled.div`
    margin-left: auto;
    button {
        border: none;
    }
`;

const cleanObject = (obj) => JSON.parse(JSON.stringify(obj));
const B = (f) => (g) => (x) => f(g(x));
const capitalized = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const toCapitalized = (str) => str.split(' ').map(capitalized).join(' ');

function OtherBottle({ add, history, find }) {
    const nameRef = useRef(null);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const bottle = find(query.get('id')) || {};

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const onFinish = (form) => {
        // eslint-disable-next-line no-underscore-dangle
        B(add)(cleanObject)({ ...form, year: form.year.year(), _id: bottle._id, _rev: bottle._rev, id: bottle.id });
        history.push('/');
    };

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    return (
        <NewBottle navigate={navigate}>
            <CloseWrapper><Button onClick={() => history.push('/')} icon={<Close />} /></CloseWrapper>
            <Form
                name="newBottle"
                layout="vertical"
                initialValues={{
                    remember: true,
                    rate: bottle.rate || 2.5,
                    price: bottle.price || 1,
                    year: bottle.year ? Moment(bottle.year.toString()) : Moment('2019'),
                    name: bottle.name || undefined,
                    color: bottle.color || undefined,
                    type: bottle.type || undefined,
                    notes: bottle.notes || undefined,
                    region: bottle.region || undefined,
                    appellationOfOrigin: bottle.appellationOfOrigin || undefined
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
                    <Input ref={nameRef} />
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

export default OtherBottle;
