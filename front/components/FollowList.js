import React from 'react';
import { List, Divider, Avatar } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

const Wrapper = styled.div`
  width: 70%;
  margin: 10px;
`;

const FollowList = ({ header, followInfo }) => {
  console.log(followInfo);
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <Wrapper>
      <Divider orientation="left">{header}</Divider>
      <List
        style={{ marginBottom: '20px' }}
        size="small"
        dataSource={followInfo}
        renderItem={(item) => (
          <List.Item style={{ marginTop: '20px' }}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.nickname}
              description={item.description}
            />
            <div onClick={onCancel(item.id)}><a>언팔로우</a></div>
          </List.Item>
        )}
      />
    </Wrapper>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  followInfo: PropTypes.array.isRequired,
};

export default FollowList;
