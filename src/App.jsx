import { Breadcrumb, Layout, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Navigator from './containers/Navigation/Navigator';
import ProblemForm from './containers/ProblemTasks/ProblemForm';
import ProblemList from './containers/ProblemTasks/ProblemList';
import { logout } from './store/Features/auth';

const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const session = secureLocalStorage.getItem('@@session');

  useEffect(() => {
    if (!session) {
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, session, navigate]);

  const [problems, setProblems] = React.useState([
    {
      id: 1,
      title: 'Error en la consola al ejecutar npm start',
      description:
        "Cuando ejecuto `npm start` en mi proyecto, me aparece un error en la consola que dice `Error: Cannot find module 'react-scripts/scripts/start'`. ¿Alguien sabe cómo solucionarlo?",
      author: 'Juan Pérez',
      createdAt: '2022-03-14T09:41:30.000Z',
      comments: [
        {
          id: 1,
          content:
            'Me pasó lo mismo hace unos días. Lo solucioné eliminando la carpeta `node_modules` y ejecutando `npm install` de nuevo.',
          author: 'María González',
          createdAt: '2022-03-14T11:20:15.000Z',
        },
      ],
    },
    {
      id: 2,
      title: 'Problema al cargar una imagen en React',
      description:
        'Estoy intentando cargar una imagen en mi componente de React pero no se muestra en la pantalla. La ruta de la imagen es correcta y no me aparece ningún error en la consola. ¿Alguien sabe qué podría estar pasando?',
      author: 'Ana Gómez',
      createdAt: '2022-03-15T14:07:45.000Z',
      comments: [
        {
          id: 2,
          content:
            '¿Podrías compartir tu código para ver si podemos encontrar el error?',
          author: 'Juan Pérez',
          createdAt: '2022-03-15T14:25:10.000Z',
        },
      ],
    },
    {
      id: 3,
      title: 'Problema con el uso de React Hooks',
      description:
        'Estoy tratando de usar `useState` en mi componente de React pero me aparece un error que dice `Hooks can only be called inside the body of a function component`. No entiendo por qué me está dando este error. ¿Alguien puede ayudarme?',
      author: 'Pedro García',
      createdAt: '2022-03-16T17:30:20.000Z',
      comments: [],
    },
  ]);

  const addProblem = (problem) => {
    setProblems((preState) => [...preState, problem]);
  };

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
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            minHeight: '80.4vh',
            padding: '1.5rem',
          }}
        >
          <ProblemList problems={problems} />
          <ProblemForm onAdd={addProblem} />
        </div>
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
export default App;
