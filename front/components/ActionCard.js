import React, { useCallback } from 'react';
import { Card, Button, Divider, List } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { REMOVE_ACTION_REQUEST } from '../reducers/action';

const CardWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

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
    <CardWrapper>
      <List.Item
        actions={[<a key="edit">수정</a>, <a key="delete" loading={removeActionLoading} onClick={onRemoveAction}>삭제</a>]}
      >
        <List.Item.Meta
          avatar={<div>i</div>}
          title={<div>{action.title}</div>}
          description={action.description}
        />
        <div>{action.score}</div>
      </List.Item>
    </CardWrapper>
  );
};

ActionCard.propTypes = {
  action: PropTypes.object.isRequired,
};

export default ActionCard;
