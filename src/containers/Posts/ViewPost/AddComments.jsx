import { Button, Checkbox, Form, Input, Row, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import {
  usePostDataMutation,
  usePutDataMutation,
} from '../../../store/api/usersApi';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';
import { useNavigate, useParams } from 'react-router-dom';

const initialValues = {
  comment: '',
  anonymous: false,
};
function AddComments({ refetch, sameUser, issue }) {
  const { id } = useParams();
  const userId = useSelector(selectId);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [addComment, { isLoading: loadingComment }] = usePostDataMutation();
  const [setActivePost, { isLoading: loadingActivePost }] =
    usePutDataMutation();

  const loading = loadingComment || loadingActivePost;

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (!id || !userId) return;

    values.userId = userId;
    values.issuesId = id;

    const response = await addComment({
      params: 'new-comment',
      body: values,
    });

    if ('data' in response && !response?.data?.error) {
      form.resetFields();
      refetch();
    }
  };

  const handleActivePost = async () => {
    const values = { ...issue };
    values.id = id;
    values.active = !values.active;

    const response = await setActivePost({
      params: `edit-post`,
      body: values,
    });

    if ('data' in response && !response?.data?.error) {
      refetch();
      navigate(-1);
    }
  };

  return (
    <Form
      layout="horizontal"
      style={{ width: '100%' }}
      initialValues={initialValues}
      form={form}
    >
      <Row
        justify="space-between"
        style={{ padding: '.5rem 0 .5rem 0' }}
        align="middle"
      >
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
              loading={loading}
            >
              Agregar comentario
            </Button>
          </Form.Item>
          {sameUser && (
            <Form.Item noStyle>
              <Button
                type="primary"
                onClick={() => handleActivePost()}
                loading={loading}
              >
                {issue?.active ? 'Marcar post resuelto' : 'Marcar post activo'}
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
