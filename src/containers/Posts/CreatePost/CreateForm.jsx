import { Form, Input, Button, Checkbox, Space, Row } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import Container from '../../../components/Container/Container';
import Title from 'antd/es/typography/Title';
import { usePostDataMutation } from '../../../store/api/usersApi';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../store/Features/auth';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const navigate = useNavigate();
  const userEmail = useSelector(selectEmail);
  const [form] = Form.useForm();

  const [post, { isLoading }] = usePostDataMutation();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    values.email = userEmail;

    const response = await post({
      params: 'save-posts',
      body: values,
    });

    if ('data' in response && !response?.data?.error) {
      form.resetFields();
      navigate('/', { replace: true });
    }
  };

  return (
    <Container>
      <Title level={3}>Crear nueva publicación</Title>
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
              Publicar post
            </Button>
          </Space>
        </Row>
      </Form>
    </Container>
  );
};

export default PostForm;
