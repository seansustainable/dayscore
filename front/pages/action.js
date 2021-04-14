import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import {List, Avatar, Button, Skeleton, PageHeader} from 'antd';
import styled from 'styled-components';

const ListWrapper = styled(List)`
  margin: 30px;
`;

const HeaderWrapper = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  margin: 10px;
`;

import reqwest from 'reqwest';

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const Action = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        getData(res => {
            setInitLoading(false);
            setData(res.results);
            setList(res.results);
        })
    }, []);

    const getData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    const onLoadMore = () => {
        setLoading(true);
        setList([...data, [...new Array(count)].map(() => ({ loading: true, name: {} }))]);
        getData(res => {
            setData([...data, res.results]);
            setList([...data, res.results]);
            setLoading(false);
            window.dispatchEvent(new Event('resize'));
        });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>더 보기</Button>
            </div>
        ) : null;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>액션</title>
            </Head>
            <AppLayout>
                <HeaderWrapper
                    title="액션"
                    subTitle="내가 하는 모든 행동에 점수를 부여해보세요. 💯"
                />
                <ListWrapper
                    className="action-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            actions={[<a key="edit">수정</a>, <a key="delete">삭제</a>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <div>중요</div>
                                    }
                                    title={<div>액션명</div>}
                                    description="액션상세"
                                />
                                <div>0</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </AppLayout>
        </>
    );
}

export default Action;