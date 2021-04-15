import React, { useCallback } from 'react';
import { Card, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTION_REQUEST } from '../reducers/action';

const CardWrapper = styled.div`
  margin: 20px;
`;

// eslint-disable-next-line react/prop-types
const ActionCard = ({ action }) => {
  const id = useSelector((state) => state.user.me && state.user.me.id);
  const dispatch = useDispatch();
  const { removeActionLoading } = useSelector((state) => state.actionReducer);

  const onRemoveAction = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_ACTION_REQUEST,
      // eslint-disable-next-line react/prop-types
      data: action.id,
    });
  }, [id]);

  return (
  // eslint-disable-next-line react/prop-types
    <CardWrapper key={action.id}>
      <Card
        actions={[
          <Button>수정</Button>,
          <Button type="danger" loading={removeActionLoading} onClick={onRemoveAction}>삭제</Button>,
        ]}
      >
        <div>{action.score}</div>
        <Card.Meta
          title={action.title}
          description={action.description}
        />
      </Card>
    </CardWrapper>
  );
};

export default ActionCard;
