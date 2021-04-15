import React, {useCallback, useEffect, useState} from 'react';
import { Form, Button, Input } from 'antd';
import styled from 'styled-components';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import {useDispatch, useSelector} from "react-redux";

const ButtonWrapper = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -35px;
`;

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, userId: id, postId: post.id },
        });
    }, [id, commentText]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{ marginTop: 5 }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <ButtonWrapper type="primary" htmlType="submit" loading={addCommentLoading}>작성하기</ButtonWrapper>
            </Form.Item>
        </Form>
    )
}

export default CommentForm;