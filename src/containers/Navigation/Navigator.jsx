import React from 'react';
import { Col, Menu, message, Row, Typography } from 'antd';
import {
  AppstoreOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/Features/auth';
import secureLocalStorage from 'react-secure-storage';
import { useDeleteDataMutation } from '../../store/api/usersApi';
import { persistor } from '../../store/store';

const Navigator = () => {
  const { userName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteDataMutation();

  const handleLogout = () => {
    secureLocalStorage.removeItem('@@session');
    dispatch(logout());
    persistor.purge();
    message.success('Sesión cerrada correctamente');
  };

  const handleDelete = async () => {
    await deleteUser({
      params: 'delete',
      body: {
        email,
      },
    });
    dispatch(logout());
    secureLocalStorage.removeItem('@@session');
  };

  const items = [
    {
      label: 'Tasks',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
      key: 'alipay',
    },
  ];
  return (
    <Row justify={'end'}>
      <Col span={12}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Col>
      <Col
        span={3}
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <UserOutlined style={{ color: 'white', padding: '.5rem' }} />
        <Typography.Text style={{ color: 'white' }} level={4}>
          {userName}
        </Typography.Text>
      </Col>
      <Col span={3}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{
            lineHeight: '64px',
            paddingBottom: 0,
            paddingTop: 0,
            width: '100%',
          }}
          items={[
            {
              icon: <MenuOutlined />,
              key: 'Ajustes',
              children: [
                {
                  label: (
                    <NavLink onClick={() => handleDelete()} to="login" end>
                      Eliminar cuenta
                    </NavLink>
                  ),
                  key: 'delete',
                  icon: <DeleteOutlined />,
                },
                {
                  label: (
                    <NavLink onClick={() => handleLogout()} to="login" end>
                      Cerrar Sesión
                    </NavLink>
                  ),
                  key: 'logout',
                  icon: <LogoutOutlined />,
                },
              ],
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default Navigator;
