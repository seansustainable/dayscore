import React, { useEffect } from 'react';
import Head from 'next/head';
import { List, PageHeader, Card, Divider } from 'antd';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { LOAD_ACTIONS_REQUEST } from '../reducers/action';
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
  }, [me.Actions]);

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
        <Card style={{ margin: 10 }}>
          <Divider orientation="left">등록된 액션 목록</Divider>
          <ListWrapper
            className="action-list"
            itemLayout="horizontal"
            dataSource={me.Actions}
            renderItem={(item) => (
              <ActionCard key={item.id} action={item} />
            )}
          />
        </Card>
      </AppLayout>
    </>
  );
};

export default Action;
