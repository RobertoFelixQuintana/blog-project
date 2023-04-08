import React from 'react';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import Container from '../../components/Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectId } from '../../store/Features/auth';
import { useDeleteDataMutation } from '../../store/api/usersApi';
import secureLocalStorage from 'react-secure-storage';

function ControlPanel() {
  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const [form] = Form.useForm();

  const [deleteUser] = useDeleteDataMutation();

  const handleSubmit = async () => {
    const values = await form.validateFields();
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
        <Form form={form} layout="vertical">
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
              <Form.Item label="Contraseña" name="password">
                <Input.Password placeholder="Contraseña" />
              </Form.Item>
            </Col>
            <Col flex="50%">
              <Form.Item label="Confirmar contraseña" name="confirmPassword">
                <Input.Password placeholder="Confirmar contraseña" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} justify="center">
            <Space size="large">
              <Form.Item>
                <Button danger onClick={handleDelete}>
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
