import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const imageInput = useRef();
    const { imagePaths, addPostLoading, addPostDone } = useSelector(state => state.post);

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone]);

    const styleForm = useMemo(() => ({ margin: 20 }), []);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onSubmit = useCallback(() => {
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                text,
            },
        });
    }, []);

    return (
        <Form style={styleForm} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 일이 있었나요?" />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload} style={{ marginTop: 3 }}>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right', marginTop: 3 }} htmlType="submit" loading={addPostLoading}>작성하기</Button>
            </div>
            <div>
                {imagePaths.map((v) => {
                    return (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button>삭제</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Form>
    );
}

export default PostForm;