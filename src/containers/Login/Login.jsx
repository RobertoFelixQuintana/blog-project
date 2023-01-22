import React from "react";
import { Button, Card, Checkbox, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { deafultColors } from "../../constants/Colors";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: deafultColors.primary }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "40rem" }} title="Inicio de sesion">
          <Form
            name="login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor inserta tu usuario!",
                },
                {
                  pattern: new RegExp("/S+@S+.S+/"),
                  message: "Ingresa un correo electronico valido!",
                },
              ]}
            >
              <Input placeholder="usuario@xxxx.com" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu contraseña!",
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Iniciar Sesion
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};
export default Login;
