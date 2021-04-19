import React, { useCallback, useState } from 'react';
import { Modal, Button, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_SCORES_TO_ME } from '../reducers/user';

const ScoreAddForm = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { me } = useSelector((state) => state.user);

  const showModal = () => {
    setVisible(true);
  };

  const onAdd = useCallback((id) => {
    console.log(id);
    // dispatch({
    //   type: ADD_SCORES_TO_ME,
    //   data: item,
    // });
    // setVisible(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ width: '94%', margin: '0 auto', marginLeft: 10, marginRight: 10 }}>
        오늘의 활동 액션
      </Button>
      <Modal
        title="오늘의 활동 액션 등록하기"
        visible={visible}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        okText="등록"
        cancelText="취소"
      >
        <List
          style={{ width: '100%' }}
          size="small"
          dataSource={me.Actions}
          renderItem={(item) => (
            <>
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <div>{item.score}</div>
                <div onClick={onAdd(item.id)}><a>추가</a></div>
              </List.Item>
            </>
          )}
        />
      </Modal>
    </>
  );
};

export default ScoreAddForm;
