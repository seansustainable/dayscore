import React, {useCallback, useEffect} from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import { Form, Input, Select, Checkbox, Button, PageHeader } from 'antd';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import { SIGN_UP_REQUEST } from '../reducers/user';

const FormWrapper = styled(Form)`
  margin-top: 20px;
`;

const HeaderWrapper = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  margin: 10px;
`;

const Signup = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { signUpLoading, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (me) {
            alert('로그인 상태입니다. 메인 페이지로 이동합니다.')
            Router.push('/');
        }
    }, [me && me.id]);

    const onFinish = useCallback((values) => {
        console.log('Received values of form: ', values);
        const email = values.email;
        const password = values.password;
        const nickname = values.nickname;
        return dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                email,
                password,
                nickname,
            },
        });
    }, []);

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 12,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 12,
            },
            sm: {
                span: 8,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 12,
                offset: 0,
            },
            sm: {
                span: 8,
                offset: 4,
            },
        },
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Select.Option value="010">010</Select.Option>
                <Select.Option value="011">011</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>회원가입</title>
            </Head>
            <AppLayout>
                <HeaderWrapper
                    title="회원가입"
                    subTitle="내 인생의 점수를 올려보세요. 😆"
                />
                <FormWrapper
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="이메일"
                        rules={[
                            {
                                type: 'email',
                                message: '유효한 이메일이 아닙니다!',
                            },
                            {
                                required: true,
                                message: '이메일을 입력해주세요!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="비밀번호"
                        rules={[
                            {
                                required: true,
                                message: '비밀번호를 입력해주세요!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="비밀번호 확인"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '비밀번호를 확인해주세요!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('비밀번호가 서로 일치하지 않습니다!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label="닉네임"
                        tooltip="다른 사용자가 어떻게 불러주길 원하나요?"
                        rules={[
                            {
                                required: true,
                                message: '닉네임을 입력해주세요!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="연락처"
                        rules={[
                            {
                                required: true,
                                message: '연락처를 입력해주세요!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('약관에 동의해주세요!')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            해당 <a href="">약관</a>을 읽었으며 이에 동의합니다.
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>
                            가입하기
                        </Button>
                    </Form.Item>
                </FormWrapper>
            </AppLayout>
        </>
    );
}

export default Signup;