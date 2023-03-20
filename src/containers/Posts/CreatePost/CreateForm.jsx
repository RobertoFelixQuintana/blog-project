import { Form, Input, Button, Checkbox } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import Container from '../../../components/Container/Container';
import Title from 'antd/es/typography/Title';

const PostForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    form.resetFields();
  };

  return (
    <Container>
      <Title level={3}>Crear nueva publicación</Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Please input the problem title!' },
          ]}
        >
          <Input placeholder="Title" prefix={<FormOutlined />} />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input the problem description!',
            },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item name="anonymous" valuePropName="checked">
          <Checkbox>Publicar de forma anónima</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar publicación
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default PostForm;
