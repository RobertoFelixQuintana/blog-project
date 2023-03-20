import { Breadcrumb, Card, Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Navigator from '../../containers/Navigation/Navigator';
import { logout } from '../../store/Features/auth';

const { Header, Content, Footer } = Layout;

const Container = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const session = secureLocalStorage.getItem('@@session');

  useEffect(() => {
    if (!session) {
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, session, navigate]);

  return (
    <Layout className="layout">
      <Header>
        <Navigator />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          {location.pathname === '/' ? (
            <Breadcrumb.Item>List</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Create post</Breadcrumb.Item>
          )}
        </Breadcrumb>
        <Card
          style={{
            minHeight: '80.4vh',
            padding: '1.5rem',
          }}
        >
          {children}
        </Card>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Forum ©2023 Created by Roberto Felix Jr.
      </Footer>
    </Layout>
  );
};
export default Container;
