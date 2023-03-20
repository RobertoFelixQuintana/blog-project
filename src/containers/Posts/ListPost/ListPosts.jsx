import { Divider, List, Space, Typography } from 'antd';
import React from 'react';
import Container from '../../../components/Container/Container';
import initDayjs from '../../../helpers/configDayjs';
import dayjs from 'dayjs';
import { formatDates } from '../../../constants/dates';
import {
  LikeOutlined,
  StarOutlined,
  MessageOutlined,
  LikeFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const styleItem = {
  padding: '2rem',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  margin: '2rem 1rem 2rem 1rem',
  cursor: 'pointer',
};

const ListPosts = () => {
  const [problems, setProblems] = React.useState([
    {
      id: 1,
      title: 'Error en la consola al ejecutar npm start',
      description:
        "Cuando ejecuto `npm start` en mi proyecto, me aparece un error en la consola que dice `Error: Cannot find module 'react-scripts/scripts/start'`. ¿Alguien sabe cómo solucionarlo?",
      author: 'Juan Pérez',
      createdAt: '2022-03-14T09:41:30.000Z',
      likes: [],
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
      likes: [78, 21, 32],
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
      likes: [78, 21, 32],
      createdAt: '2022-03-16T17:30:20.000Z',
      comments: [],
    },
  ]);

  React.useEffect(() => {
    initDayjs();
  }, []);

  return (
    <Container>
      <List
        header={<Title level={2}>Publicaciones</Title>}
        dataSource={problems}
        size="large"
        bordered
        renderItem={(problem) => (
          <List.Item
            style={styleItem}
            onClick={() => {
              console.log(problem);
            }}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={problem.likes.includes(78) ? LikeFilled : LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={problem.comments.length}
                key="list-vertical-message"
              />,
            ]}
          >
            <List.Item.Meta
              title={`${problem.title} - Fecha de creación: ${dayjs(
                problem.createdAt
              ).format(formatDates)}`}
              avatar={<Text type="secondary">@{problem.author}</Text>}
            />
            <b>Descripción:</b> {problem.description}
            <Divider orientation="left">Comentarios</Divider>
            {problem.comments.length ? (
              <ul style={{ listStyleType: 'none' }}>
                {problem.comments.map((comment) => (
                  <li key={comment.id}>
                    @{comment.author}: {comment.content}
                  </li>
                ))}
              </ul>
            ) : (
              <Text type="secondary">No hay comentarios</Text>
            )}
          </List.Item>
        )}
      />
    </Container>
  );
};

export default ListPosts;
