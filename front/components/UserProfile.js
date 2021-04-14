import React, {useCallback, useMemo} from 'react';
import {Card, Avatar, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';


const UserProfile = ({ setIsLoggedIn }) => {

    const buttonStyle = useMemo(() => ({ marginTop: 20 }), []);

    const onLogOut = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    return (
        <Card
            style={{ margin: 10 }}
            actions={[
                <div key="score">점수<br/>0</div>,
                <div key="follow">팔로잉<br/>0</div>,
                <div key="follow">팔로워<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title="Sean"
                description="Win or Learn"
            />
            <Button onClick={onLogOut} style={buttonStyle}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;