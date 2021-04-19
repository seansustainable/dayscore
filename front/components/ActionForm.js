import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Input, Button, Select, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ACTION_REQUEST } from '../reducers/action';
import useInput from '../hooks/useInput';

const ActionForm = () => {
  const [title, onChangeTitle, setTitle] = useInput('');
  const [description, onChangeDescription, setDescription] = useInput('');
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const { addActionLoading, addActionDone } = useSelector((state) => state.actionReducer);

  const onChangeScore = useCallback((e) => {
    // eslint-disable-next-line radix
    setScore(parseInt(e));
  }, []);

  useEffect(() => {
    if (addActionDone) {
      setTitle('');
      setDescription('');
      setScore(0);
    }
  }, [addActionDone]);

  const styleForm = useMemo(() => ({
    margin: 20,
    display: 'flex',
  }), []);

  const onSubmit = useCallback(() => {
    if (!title || !title.trim()) {
      return alert('액션명을 입력하세요.');
    }

    if (!description || !description.trim()) {
      return alert('설명을 입력하세요.');
    }

    dispatch({
      type: ADD_ACTION_REQUEST,
      data: { title, description, score },
    });
  }, [title, description, score]);

  return (
    <>
      <Divider orientation="left">액션 등록하기</Divider>
      <Form style={styleForm} onFinish={onSubmit} layout="inline">
        <Form.Item label="액션명">
          <Input value={title} onChange={onChangeTitle} maxLength={20} placeholder="액션명을 입력해주세요." />
        </Form.Item>
        <Form.Item label="설명" style={{ flex: 'auto' }}>
          <Input value={description} onChange={onChangeDescription} maxLength={40} placeholder="설명을 입력해주세요." />
        </Form.Item>
        <Form.Item label="점수">
          <Select
            placeholder="점수를 입력해주세요."
            onChange={onChangeScore}
            defaultValue="0"
          >
            <Select.Option value="0">0</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item size="small">
          <Button type="primary" htmlType="submit" loading={addActionLoading}>작성하기</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ActionForm;
