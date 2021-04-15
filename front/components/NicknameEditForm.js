import React, {useCallback} from 'react';
import {Button, Input, Divider, Form} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import {useDispatch, useSelector} from "react-redux";
import useInput from "../hooks/useInput";

const Wrapper = styled(Form)`
  margin: 10px;
`;


const NicknameEditForm = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');
    const [description, onChangeDescription] = useInput(me?.description || '');

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: { nickname, description },
        });
    }, [nickname, description]);

    return (
        <Wrapper>
            <Divider orientation="left">프로필</Divider>
            <Input
                placeholder="Add a nickname"
                value={nickname}
                onChange={onChangeNickname}
                prefix={<UserOutlined className="site-form-item-icon" />}
            />
            <br /><br />
            <Input.TextArea
                placeholder="Add a bio"
                value={description}
                onChange={onChangeDescription}
            />
            <br /><br />
            <Button type="primary" block onClick={onSubmit}>
                수정하기
            </Button>
        </Wrapper>
    )
}

export default NicknameEditForm;