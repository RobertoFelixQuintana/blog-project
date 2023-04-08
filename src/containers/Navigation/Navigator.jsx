import React from 'react';
import { Col, Menu, message, Row, Typography } from 'antd';
import {
  HomeOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  ToolOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/Features/auth';
import secureLocalStorage from 'react-secure-storage';
import { persistor } from '../../store/store';

const Navigator = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userName } = useSelector((state) => state.auth);

  const handleLogout = () => {
    secureLocalStorage.removeItem('@@session');
    dispatch(logout());
    persistor.purge();
    message.success('Sesión cerrada correctamente');
  };

  const items = [
    {
      key: 'app',
      icon: (
        <>
          <HomeOutlined />{' '}
          <NavLink to="/" state={{ from: location }}>
            Home
          </NavLink>
        </>
      ),
    },
    {
      key: 'posts',
      icon: (
        <>
          <UnorderedListOutlined />{' '}
          <NavLink to="/posts" state={{ from: location }}>
            Publicaciones
          </NavLink>
        </>
      ),
    },
    {
      key: 'my-posts',
      icon: (
        <>
          <UnorderedListOutlined />{' '}
          <NavLink to="/my-posts" state={{ from: location }}>
            Mis Publicaciones
          </NavLink>
        </>
      ),
    },
    {
      key: 'create-post',
      icon: (
        <>
          <AppstoreAddOutlined />{' '}
          <NavLink to="/create-post" state={{ from: location }}>
            Crear Post
          </NavLink>
        </>
      ),
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
                    <NavLink to="/edit-account" end>
                      Configurar cuenta
                    </NavLink>
                  ),
                  key: 'delete',
                  icon: <ToolOutlined />,
                },
                {
                  label: (
                    <NavLink onClick={() => handleLogout()} to="/login" end>
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
