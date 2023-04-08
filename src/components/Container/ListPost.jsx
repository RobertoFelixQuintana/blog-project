import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Divider, List, Typography } from 'antd';
import dayjs from 'dayjs';
import { LikeOutlined, MessageOutlined, LikeFilled } from '@ant-design/icons';
import { formatDates } from '../../../src/constants/dates';
import IconText from '../../components/Container/IconText';
import { selectId } from '../../store/Features/auth';
import { usePutDataMutation } from '../../store/api/usersApi';

const { Title, Text } = Typography;

const styleItem = {
  padding: '2rem',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  margin: '2rem 0 2rem 0',
};

const styleCursor = {
  cursor: 'pointer',
};

function ListPost({ title, issuesData, postsLoading, refetch }) {
  const navigate = useNavigate();
  const id = useSelector(selectId);

  const [showCommentByPost, setShowCommentByPost] = React.useState(null);
  const [setLike, { isLoading: likeLoading }] = usePutDataMutation();

  const loading = postsLoading || likeLoading;

  return (
    <List
      header={<Title level={2}>{title}</Title>}
      dataSource={issuesData}
      size="large"
      bordered={false}
      loading={loading}
      renderItem={(problem) => (
        <Badge.Ribbon
          text={problem?.active ? 'Post activo' : 'Resuelta'}
          color={problem?.active ? 'blue' : 'green'}
        >
          <List.Item
            style={styleItem}
            actions={[
              <IconText
                color={problem?.likes.includes(id) ? 'blue' : 'black'}
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
                color="black"
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
                    {problem?.comments?.map((comment, idx) => (
                      <li key={`${comment.id}${idx}`}>
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
        </Badge.Ribbon>
      )}
    />
  );
}

export default ListPost;
