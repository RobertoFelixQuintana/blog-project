import React from 'react';
import { Button, Card, Checkbox, Form, Input, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { deafultColors } from '../../constants/colors';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { usePostDataMutation } from '../../store/api/usersApi';
import { login } from '../../store/Features/auth';
import { useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [registerUser, { isLoading: isLoadingRegister }] =
    usePostDataMutation();
  const [loginUser, { isLoading: isLoadingLogin }] = usePostDataMutation();

  const [form] = Form.useForm();

  const isRegister = pathname === '/register';
  const isLoading = isLoadingRegister || isLoadingLogin;

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!isRegister) {
      loginUser({
        params: 'login',
        body: values,
      }).then(({ data }) => {
        if (data && !data.error) {
          const { token, ...restResponse } = data.data;
          dispatch(login(restResponse));
          secureLocalStorage.setItem('@@session', data?.data);
          navigate('/');
        }
      });
    }

    if (isRegister) {
      registerUser({
        params: 'register',
        body: values,
      }).then(({ data }) => {
        if (data && !data.error) {
          navigate('/login');
        }
      });
    }
  };

  return (
    <Layout
      style={{ minHeight: '100vh', backgroundColor: deafultColors.primary }}
    >
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{ width: '40rem' }}
          title={isRegister ? 'Registrar usuario' : 'Iniciar sesión'}
        >
          <Form
            name={isRegister ? 'register' : 'login'}
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
            form={form}
          >
            {isRegister && (
              <Form.Item
                label="Nombre de usuario"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Por favor inserta tu nombre de usuario!',
                  },
                ]}
              >
                <Input placeholder="Nombre de usuario" />
              </Form.Item>
            )}

            <Form.Item
              label="Correo"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta tu correo!',
                },
                {
                  type: 'email',
                  message: 'Ingresa un correo electronico valido!',
                },
              ]}
            >
              <Input placeholder="usuario@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu contraseña!',
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Row justify="space-around" style={{ padding: '1rem 0 1rem 0' }}>
              <Checkbox>Recordar cuenta</Checkbox>
              <NavLink
                to={isRegister ? '/login' : '/register'}
                style={{ float: 'right' }}
              >
                {isRegister
                  ? '¿Ya tienes una cuenta? Inicia sesion'
                  : '¿No tienes una cuenta? Registrate'}
              </NavLink>
            </Row>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 16,
              }}
            >
              <Button
                type="primary"
                onClick={() => handleSubmit()}
                loading={isLoading}
              >
                {isRegister ? 'Crear cuenta' : 'Inicio de sesión'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
