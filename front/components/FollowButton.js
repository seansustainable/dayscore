import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (!me) {
      alert('로그인을 먼저 해주세요.');
      return null;
    }

    if (post.User?.id === me?.id) {
      alert('본인을 팔로우할 수 없습니다.');
      return null;
    }

    if (isFollowing) {
      return dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    }
    return dispatch({
      type: FOLLOW_REQUEST,
      data: post.User.id,
    });
  }, [me, isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
