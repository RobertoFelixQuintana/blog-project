import { Form, Input, Button, Checkbox, Space, Row } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import Container from '../../../components/Container/Container';
import Title from 'antd/es/typography/Title';
import {
  useLazyGetDataQuery,
  usePostDataMutation,
  usePutDataMutation,
} from '../../../store/api/usersApi';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../store/Features/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userEmail = useSelector(selectEmail);
  const [form] = Form.useForm();

  const [getIssue, { isLoading: loadingGet }] = useLazyGetDataQuery();
  const [post, { isLoading: loadingPost }] = usePostDataMutation();
  const [put, { isLoading: loadingPut }] = usePutDataMutation();

  const isLoading = loadingPost || loadingPut || loadingGet;

  const handleSubmit = async () => {
    const values = await form.validateFields();
    values.email = userEmail;

    let action;
    let urlAction;

    if (id) {
      action = put;
      urlAction = 'edit-post';
      values.id = id;
    } else {
      action = post;
      urlAction = 'save-posts';
    }

    const response = await action({
      params: urlAction,
      body: values,
    });

    if ('data' in response && !response?.data?.error) {
      form.resetFields();
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (id) {
      getIssue({
        params: `get-posts/${id}`,
      }).then((response) => {
        if ('data' in response && !response?.data?.error) {
          form.setFieldsValue({
            title: response?.data?.data?.title,
            description: response?.data?.data?.description,
            anonymous: response?.data?.data?.anonymous,
          });
        }
      });
    }
  }, [id, getIssue, form]);

  return (
    <Container>
      <Title level={3}>{id ? 'Editar' : 'Crear'} nueva publicación</Title>
      <Form
        form={form}
        initialValues={{
          anonymous: false,
        }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Por favor agrega un titulo!' }]}
        >
          <Input placeholder="Titulo" prefix={<FormOutlined />} />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Por favor agrega una descripción!',
            },
          ]}
        >
          <Input.TextArea placeholder="Descripción" />
        </Form.Item>
        <Form.Item name="anonymous" valuePropName="checked">
          <Checkbox>Publicar de forma anónima</Checkbox>
        </Form.Item>
        <Row justify="end">
          <Space size="middle">
            <Button type="default" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={isLoading}>
              {id ? 'Editar' : 'Crear'} post
            </Button>
          </Space>
        </Row>
      </Form>
    </Container>
  );
};

export default PostForm;
