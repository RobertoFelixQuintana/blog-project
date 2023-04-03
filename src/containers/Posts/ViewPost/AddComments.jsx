import { Button, Checkbox, Form, Input, Row, Space } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { usePostDataMutation } from '../../../store/api/usersApi';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';
import { useNavigate, useParams } from 'react-router-dom';

const initialValues = {
  comment: '',
  anonymous: false,
};
function AddComments({ refetch, sameUser }) {
  const { id } = useParams();
  const userId = useSelector(selectId);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [addComent] = usePostDataMutation();

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (!id || !userId) return;

    values.userId = userId;
    values.issuesId = id;

    const response = await addComent({
      params: 'new-comment',
      body: values,
    });

    if ('data' in response && !response?.data?.error) {
      form.resetFields();
      refetch();
    }
  };

  return (
    <Form
      layout="horizontal"
      style={{ width: '100%' }}
      initialValues={initialValues}
      form={form}
    >
      <Row justify="space-between" style={{ padding: '.5rem 0 .5rem 0' }}>
        <Space size="middle" direction="horizontal">
          <Form.Item noStyle>
            <Button type="default" onClick={() => navigate(-1)}>
              Regresar
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Button
              type="primary"
              onClick={handleSubmit}
              icon={<PlusOutlined />}
              ghost
            >
              Agregar comentario
            </Button>
          </Form.Item>
          {sameUser && (
            <Form.Item noStyle>
              <Button
                danger
                onClick={() => console.log('resuelto')}
                icon={<CheckOutlined />}
              >
                Marcar como resuelto
              </Button>
            </Form.Item>
          )}
        </Space>

        <Form.Item name="anonymous" valuePropName="checked" noStyle>
          <Checkbox>Comentario anónimo</Checkbox>
        </Form.Item>
      </Row>

      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: 'El comentario no puede estar vacío',
          },
        ]}
        hasFeedback
      >
        <Input.TextArea rows={4} placeholder="Comentarios..." />
      </Form.Item>
    </Form>
  );
}

export default AddComments;
