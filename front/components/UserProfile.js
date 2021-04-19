import React, { useCallback, useMemo } from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = (/* { setIsLoggedIn } */) => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const buttonStyle = useMemo(() => ({ marginTop: 20 }), []);

  const onLogOut = useCallback(() => {
    // setIsLoggedIn(false);
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      style={{ margin: 10 }}
      actions={[
        <div key="score">점수<br />{me.score || 0}</div>,
        <div key="follow">팔로잉<br />{me.Followings.length}</div>,
        <div key="follow">팔로워<br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={me.nickname}
        description={me.description}
      />
      <Button onClick={onLogOut} style={buttonStyle} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
