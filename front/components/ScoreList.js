import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';
import { REMOVE_SCORES_OF_ME } from '../reducers/user';

const ScoreList = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onDelete = useCallback((id) => {
    console.log('del', id);
    // dispatch({
    //   type: REMOVE_SCORES_OF_ME,
    //   data: id,
    // });
  }, []);

  return (
    <>
      <List
        style={{ width: '94%', margin: '0 auto', marginLeft: 10, marginRight: 10 }}
        dataSource={me.Scores}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.title}
            />
            <div style={{ marginRight: 20 }}>{item.score}</div>
            <div><a>삭제</a></div>
          </List.Item>
        )}
      />
    </>
  );
};

export default ScoreList;
