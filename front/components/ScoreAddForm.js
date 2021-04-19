import React, { useState } from 'react';
import { Modal, Button, List, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_SCORES_TO_ME } from '../reducers/user';

const ScoreAddForm = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState([]);
  const { mainActions } = useSelector((state) => state.actionReducer);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    console.log(values);
    try {
      dispatch({
        type: ADD_SCORES_TO_ME,
        data: values,
      });
      setVisible(false);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleCancel = () => {
    setValues([]);
    setVisible(false);
  };

  const onChangeCheck = (e) => {
    if (e.target.checked) {
      setValues([...values, e.target.value]);
    } else {
      setValues([...values].filter((v) => v !== e.target.value));
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ width: '94%', margin: '0 auto', marginLeft: 10, marginRight: 10 }}>
        오늘의 활동 액션
      </Button>
      <Modal
        title="오늘의 활동 액션 등록하기"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="등록"
        cancelText="취소"
      >
        <Checkbox.Group style={{ width: '100%' }}>
          <List
            size="small"
            dataSource={mainActions}
            renderItem={(item) => (
              <>
                <Checkbox value={item.id} onChange={onChangeCheck}>Checkbox</Checkbox>
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div>{item.score}</div>
                </List.Item>
              </>
            )}
          />
        </Checkbox.Group>
      </Modal>
    </>
  );
};

export default ScoreAddForm;
