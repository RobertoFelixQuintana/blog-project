import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Row,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { deafultColors } from '../../constants/colors';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../store/api/usersApi';
import { login } from '../../store/Features/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isRegister = pathname === '/register';
  const [registerUser, { isLoading: isLoadingRegister }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();
  const isLoading = isLoadingRegister || isLoadingLogin;

  const onFinish = (values) => {
    if (!isRegister) {
      loginUser(values).then(({ data }) => {
        if (data) {
          message.success(data.message);
          dispatch(login(data.data));
          navigate('/');
        }
      });
    }

    if (isRegister) {
      registerUser(values).then(({ data }) => {
        if (data) {
          message.success(data.message);
          navigate('/login');
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {isRegister ? 'Crear cuenta' : 'Iniciar Sesion'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
