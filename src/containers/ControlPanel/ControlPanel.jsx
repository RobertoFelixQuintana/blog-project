import React from 'react';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import Container from '../../components/Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  selectEmail,
  selectId,
  selectUserName,
} from '../../store/Features/auth';
import {
  useDeleteDataMutation,
  usePutDataMutation,
} from '../../store/api/usersApi';
import secureLocalStorage from 'react-secure-storage';
import { DeleteOutlined } from '@ant-design/icons';

function ControlPanel() {
  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const name = useSelector(selectUserName);
  const email = useSelector(selectEmail);

  const [form] = Form.useForm();

  const [deleteUser] = useDeleteDataMutation();
  const [putData] = usePutDataMutation();

  const initialValues = {
    name,
    email,
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    values.id = id;

    const response = await putData({
      params: 'edit-user',
      body: values,
    });

    if ('data' in response && !response.data.error) {
      dispatch(login(response?.data?.data));
    }
  };

  const handleDelete = async () => {
    await deleteUser({
      params: 'delete',
      body: {
        id,
      },
    });
    dispatch(logout());
    secureLocalStorage.removeItem('@@session');
  };

  return (
    <Container>
      <Card title="Panel de control">
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Row gutter={12}>
            <Col flex="50%">
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese su nombre',
                  },
                ]}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
            </Col>
            <Col flex="50%">
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Por favor ingrese su correo',
                  },
                ]}
              >
                <Input type="email" placeholder="Correo" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col flex="50%">
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese su contraseña',
                  },
                ]}
              >
                <Input.Password placeholder="Contraseña" />
              </Form.Item>
            </Col>
            <Col flex="50%">
              <Form.Item
                label="Confirmar contraseña"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese su contraseña',
                  },
                  {
                    validator: (rule, value) => {
                      if (value !== form.getFieldValue('password')) {
                        return Promise.reject('Las contraseñas no coinciden');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password placeholder="Confirmar contraseña" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} justify="center">
            <Space size="large">
              <Form.Item>
                <Button danger onClick={handleDelete} icon={<DeleteOutlined />}>
                  Eliminar cuenta
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  Guardar cambios
                </Button>
              </Form.Item>
            </Space>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default ControlPanel;
