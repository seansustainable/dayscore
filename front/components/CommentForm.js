import React, {useCallback, useState} from 'react';
import { Form, Button, Input } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -35px;
`;

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('');

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        console.log(commentText);
    }, [commentText]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{ marginTop: 5 }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <ButtonWrapper type="primary" htmlType="submit">작성하기</ButtonWrapper>
            </Form.Item>
        </Form>
    )
}

export default CommentForm;