import React, {useEffect, useState} from 'react';
import { List, message, Avatar, Spin, Divider } from 'antd';

import reqwest from 'reqwest';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import {UserOutlined} from "@ant-design/icons";
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70%;
  margin: 10px;
`;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


const FollowList = ({ header, followInfo }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadedRowsMap = {};

    useEffect(() => {
        fetchData(res => {
            setData(res.results);
        });
    }, []);

    const fetchData = callback => {
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

    const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        setLoading(true);
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            loadedRowsMap[i] = 1;
        }
        if (data.length > 19) {
            message.warning('Virtualized List loaded all');
            setLoading(false);
            return;
        }
        fetchData(res => {
            setData([...data, res.results]);
            setLoading(false);
        });
    };

    const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

    const renderItem = ({ index, key, style }) => {
        const item = data[index];
        return (
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title="a"
                    description="b"
                />
                {header === '팔로잉' ? <a href="#">언팔로우</a> : <div>팔로우</div>}
            </List.Item>
        );
    };

    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
        <VList
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            overscanRowCount={2}
            rowCount={data.length}
            rowHeight={73}
            rowRenderer={renderItem}
            onRowsRendered={onRowsRendered}
            scrollTop={scrollTop}
            width={width}
        />
    );

    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
        <AutoSizer disableHeight>
            {({ width }) =>
                vlist({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                    width,
                })
            }
        </AutoSizer>
    );

    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={handleInfiniteOnLoad}
            rowCount={data.length}
        >
            {({ onRowsRendered }) =>
                autoSize({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                })
            }
        </InfiniteLoader>
    );

    return (
        <Wrapper>
            <Divider orientation="left">{header}</Divider>
            <List>
                {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
                {loading && <Spin className="demo-loading" />}
            </List>
        </Wrapper>
    )
}

export default FollowList;