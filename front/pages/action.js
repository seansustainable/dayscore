import React, { useEffect } from 'react';
import Head from 'next/head';
import { List, PageHeader } from 'antd';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import actionReducer, { LOAD_ACTIONS_REQUEST, REMOVE_ACTION_REQUEST } from '../reducers/action';
import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';

const ListWrapper = styled(List)`
  margin: 30px;
`;

const HeaderWrapper = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  margin: 10px;
`;

const Action = () => {
  const { me } = useSelector((state) => state.user);
  const { mainActions } = useSelector((state) => state.actionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  useEffect(() => {
    dispatch({
      type: LOAD_ACTIONS_REQUEST,
    });
  }, []);

  const onCancel = (id) => () => {
    dispatch({
      type: REMOVE_ACTION_REQUEST,
      data: id,
    });
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>액션</title>
      </Head>
      <AppLayout>
        <HeaderWrapper
          title="액션"
          subTitle="내가 하는 모든 행동에 점수를 부여해보세요. 💯"
        />
        {me && <ActionForm />}
        {mainActions.map((c) => (
          <ActionCard key={c.id} action={c} />
        ))}
        <ListWrapper
          className="action-list"
          itemLayout="horizontal"
          dataSource={me.Actions}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="edit">수정</a>, <a key="delete" onClick={onCancel(item.id)}>삭제</a>]}
            >
              <List.Item.Meta
                avatar={<div>중요</div>}
                title={<div>{item.title}</div>}
                description={item.description}
              />
              <div>{item.score}</div>
            </List.Item>
          )}
        />
      </AppLayout>
    </>
  );
};

export default Action;
