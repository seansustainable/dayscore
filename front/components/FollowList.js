import React from 'react';
import {List, Divider, Avatar} from 'antd';
import styled from 'styled-components';
import {UserOutlined} from "@ant-design/icons";

const Wrapper = styled.div`
  width: 70%;
  margin: 10px;
`;

const FollowList = ({ header, followInfo }) => {
    console.log(followInfo);
    return (
        <Wrapper>
            <Divider orientation="left">{header}</Divider>
            <List
                style={{ marginBottom: '20px' }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                bordered
                dataSource={followInfo}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: '20px' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={item.nickname}
                            description={item.description}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            />
        </Wrapper>
    )
}

export default FollowList;