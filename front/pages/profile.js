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
            <Row>
                <NicknameEditForm />
            </Row>
            <Row>
                <Col xs={24} md={12}>
                    <FollowList
                        header="팔로잉"
                        followInfo={followingList}
                    />
                </Col>
                <Col xs={24} md={12}>
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