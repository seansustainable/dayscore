import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ACTION_REQUEST } from '../reducers/action';
import useInput from '../hooks/useInput';

const ActionForm = () => {
  const [title, onChangeTitle, setTitle] = useInput('');
  const [description, onChangeDescription, setDescription] = useInput('');
  const [score, onChangeScore, setScore] = useInput(0);
  const dispatch = useDispatch();
  const { addActionLoading, addActionDone } = useSelector((state) => state.actionReducer);

  useEffect(() => {
    if (addActionDone) {
      setTitle('');
      setDescription('');
      setScore(0);
    }
  }, [addActionDone]);

  const styleForm = useMemo(() => ({ margin: 20 }), []);

  const onSubmit = useCallback(() => {
    if (!title || !title.trim()) {
      return alert('액션명을 입력하세요.');
    }

    if (!description || !description.trim()) {
      return alert('설명을 입력하세요.');
    }

    if (!score) {
      return alert('점수를 입력하세요.');
    }

    dispatch({
      type: ADD_ACTION_REQUEST,
      data: { title, description, score },
    });
  }, [title, description, score]);

  return (
    <Form style={styleForm} onFinish={onSubmit}>
      <Input value={title} onChange={onChangeTitle} maxLength={20} placeholder="액션명을 입력해주세요." />
      <Input value={description} onChange={onChangeDescription} maxLength={40} placeholder="설명을 입력해주세요." />
      <Select
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        placeholder="점수를 입력해주세요."
        onChange={onChangeScore}
        filterOption={(input, option) => setScore(option.children.parseInt())}
      >
        <Select.Option value="0">0</Select.Option>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">2</Select.Option>
        <Select.Option value="3">3</Select.Option>
        <Select.Option value="4">4</Select.Option>
      </Select>
      <div>
        <Button type="primary" style={{ float: 'right', marginTop: 3 }} htmlType="submit" loading={addActionLoading}>작성하기</Button>
      </div>
    </Form>
  );
};

export default ActionForm;
