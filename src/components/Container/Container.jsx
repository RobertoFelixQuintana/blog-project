import { Breadcrumb, Card, Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Navigator from '../../containers/Navigation/Navigator';
import { logout } from '../../store/Features/auth';

const { Header, Content, Footer } = Layout;

function getTitleFromPathname(pathname) {
  const path = pathname.split('/')[1];
  const text = path.replace(/-/g, ' ');
  return text?.substring(0, 1).toUpperCase() + text?.substring(1);
}

const Container = ({ children, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sentence = getTitleFromPathname(location.pathname);

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
          <Breadcrumb.Item>{sentence}</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          style={{
            minHeight: '80.4vh',
            padding: '1.5rem',
          }}
          loading={loading}
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
