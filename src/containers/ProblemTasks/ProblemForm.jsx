import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, FormOutlined } from '@ant-design/icons';

const ProblemForm = ({ onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onAdd(values);
    form.resetFields();
  };

  return (
    <Card>
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
          name="createdBy"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" prefix={<UserOutlined />} />
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Problem
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProblemForm;
