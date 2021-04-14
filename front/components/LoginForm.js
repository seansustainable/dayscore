import React, {useCallback, useMemo} from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const FormWrapper = styled(Form)`
  margin-top: 20px;
`;

const LoginForm = ({ setIsLoggedIn }) => {

    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 7,
            span: 14,
        },
    };

    const buttonStyle = useMemo(() => ({ marginRight: 15 }), [])

    const onFinish = useCallback((values) => {
        console.log('Success:', values);
        setIsLoggedIn(true);
    }, []);

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, []);

    return (
        <FormWrapper
            {...layout}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="이메일"
                name="email"
                rules={[
                    {
                        required: true,
                        message: '이메일을 입력해주세요!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={false} style={buttonStyle}>
                    로그인
                </Button>
                <Link href="/signup"><a>회원가입</a></Link>
            </Form.Item>
        </FormWrapper>
    );
}

export default LoginForm;