import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Styled from 'styled-components';
import { Trans } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';

const capitalized = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const toCapitalized = (str) => str.split(' ').map(capitalized).join(' ');
const LoginForm = Styled.div`
    display: flex;
    align-self: center;
    justify-self: center;
    font-family: Champagne and Limousines;
    flex-direction: column;
    label {
        color: #880C2D;
        padding-left: 15px;
    }
    button {
        margin-left: 45px;
    }
    #loginForm > .ant-row {
        padding-left: 40px;
    }
`;

function Login({ history, saveUser }) {
    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const onFinish = ({ user }) => {
        saveUser(user);
        history.push('/');
    };

    return (
        <LoginForm>
            <Form
                name="loginForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label={<Trans i18nKey="forms.login.user" />}
                    name="user"
                    normalize={toCapitalized}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" style={{ backgroundColor: '#E1BBCA', borderRadius: '12px', color: '#FFFFFF' }} icon={<CaretRightOutlined />} />
                </Form.Item>
            </Form>
        </LoginForm>
    );
}

export default withRouter(Login);
