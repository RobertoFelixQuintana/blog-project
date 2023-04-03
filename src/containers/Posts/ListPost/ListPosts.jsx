import { Divider, List, Typography } from 'antd';
import React from 'react';
import Container from '../../../components/Container/Container';
import initDayjs from '../../../helpers/configDayjs';
import dayjs from 'dayjs';
import { formatDates } from '../../../constants/dates';
import { LikeOutlined, MessageOutlined, LikeFilled } from '@ant-design/icons';
import {
  useGetDataQuery,
  usePutDataMutation,
} from '../../../store/api/usersApi';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';
import { useNavigate } from 'react-router-dom';
import IconText from '../../../components/Container/IconText';

const { Title, Text } = Typography;

const styleItem = {
  padding: '2rem',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  margin: '2rem 1rem 2rem 1rem',
};

const styleCursor = {
  cursor: 'pointer',
};

const ListPosts = () => {
  const navigate = useNavigate();
  const id = useSelector(selectId);

  const {
    data,
    refetch,
    isLoading: postsLoading,
  } = useGetDataQuery({
    params: 'get-posts',
  });
  const [setLike, { isLoading: likeLoading }] = usePutDataMutation();

  const [issuesData, setIssuesData] = React.useState([]);
  const [showCommentByPost, setShowCommentByPost] = React.useState(null);

  const loading = postsLoading || likeLoading;

  React.useEffect(() => {
    initDayjs();
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    if (data?.data.length) {
      setIssuesData(data?.data);
    }
  }, [data]);

  return (
    <Container>
      <List
        header={<Title level={2}>Publicaciones</Title>}
        dataSource={issuesData}
        size="large"
        bordered={false}
        loading={loading}
        renderItem={(problem) => (
          <List.Item
            style={styleItem}
            actions={[
              <IconText
                icon={problem?.likes.includes(id) ? LikeFilled : LikeOutlined}
                text={problem?.likes?.length}
                key="list-vertical-like-o"
                onClick={async () => {
                  const response = await setLike({
                    params: 'set-like',
                    body: {
                      id: problem?._id,
                      userId: id,
                    },
                  });

                  if ('data' in response && !response?.data?.error) {
                    refetch();
                  }
                }}
              />,
              <IconText
                icon={MessageOutlined}
                text={problem?.comments?.length}
                key="list-vertical-message"
                onClick={() => {
                  if (showCommentByPost !== problem?._id)
                    setShowCommentByPost(problem?._id);
                  else setShowCommentByPost(null);
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <Text
                  type="primary"
                  style={styleCursor}
                  onClick={() => {
                    navigate(`/view-post/${problem?._id}`);
                  }}
                >
                  {`${problem?.title} - Fecha de creación: ${dayjs(
                    problem?.createdAt
                  ).format(formatDates)}`}
                </Text>
              }
              avatar={<Text type="secondary">@{problem?.author}</Text>}
            />
            <b>Descripción:</b> {problem?.description}
            {showCommentByPost === problem?._id && (
              <>
                <Divider orientation="left">Comentarios</Divider>
                {problem?.comments?.length ? (
                  <ul style={{ listStyleType: 'none' }}>
                    {problem?.comments?.map((comment) => (
                      <li key={comment.id}>
                        @{comment.author}: {comment.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text type="secondary">No hay comentarios</Text>
                )}
              </>
            )}
          </List.Item>
        )}
      />
    </Container>
  );
};

export default ListPosts;
