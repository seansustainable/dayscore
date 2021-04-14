import React from 'react';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import { Row, Col } from 'antd';

const Profile = () => {
    const followingList = [{ nickname: 'a' }, { nickname: 'a' }, { nickname: 'a' }];
    const followerList = [{ nickname: 'b' }, { nickname: 'b' }, { nickname: 'b' }];

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
                        followInfo={followingList}
                    />
                </Col>
                <Col xs={12} md={12}>
                    <FollowList
                        header="팔로워"
                        followInfo={followerList}
                    />
                </Col>
            </Row>
        </AppLayout>
    );
};

export default Profile;