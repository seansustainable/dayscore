import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import {useSelector} from "react-redux";

const AppLayout = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const onSearch = useCallback(() => {
        console.log('onSearch');
    }, [])

    return (
        <>
            <Menu mode="horizontal" style={{ display: 'flex' }}>
                <Menu.Item>
                    <Link href="/"><a>💯 dayscore</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>내정보</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/action"><a>액션</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search placeholder="검색어를 입력하세요." onSearch={onSearch} enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
                <Menu.Item style={{ marginLeft: 'auto' }}>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={18}>
                    {children}
                </Col>
            </Row>
            <Row style={{ position: 'fixed', bottom: 0 }}>
                <a href="https://github.com/seansustainable" target="_blank" rel="noreferrer noopener">@seansustainable</a>
            </Row>
        </>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;