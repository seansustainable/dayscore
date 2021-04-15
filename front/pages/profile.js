import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const followingList = [{ nickname: 'a' }, { nickname: 'a' }, { nickname: 'a' }];
  // const followerList = [{ nickname: 'b' }, { nickname: 'b' }, { nickname: 'b' }];

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Row start="md" center="xs">
        <Col xs={24} md={8}>
          <NicknameEditForm />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col xs={12} md={12}>
          <FollowList
            header="팔로잉"
            followInfo={me.Followings}
          />
        </Col>
        <Col xs={12} md={12}>
          <FollowList
            header="팔로워"
            followInfo={me.Followers}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
