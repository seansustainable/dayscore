import React from 'react';
import {Button, Input, Divider} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px;
`;


const NicknameEditForm = () => {
    return (
        <Wrapper>
            <Divider orientation="left">프로필</Divider>
            <Input
                placeholder="Add a nickname"
                prefix={<UserOutlined className="site-form-item-icon" />}
            />
            <br /><br />
            <Input.TextArea placeholder="Add a bio"/>
            <br /><br />
            <Button type="primary" block>
                수정하기
            </Button>
        </Wrapper>
    )
}

export default NicknameEditForm;