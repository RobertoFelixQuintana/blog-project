import React from 'react';
import Container from '../../../components/Container/Container';
import { Badge, Card, Divider, Row, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import {
  useDeleteDataMutation,
  useGetDataQuery,
  usePutDataMutation,
} from '../../../store/api/usersApi';
import IconText from '../../../components/Container/IconText';
import {
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';
import AddComments from './AddComments';

const { Text } = Typography;

function ViewPost() {
  const { id } = useParams();
  const userId = useSelector(selectId);
  const {
    data,
    isLoading: postLoading,
    refetch,
  } = useGetDataQuery({
    params: `get-posts/${id}`,
  });

  const [setLike, { isLoading: likeLoading }] = usePutDataMutation();
  const [deleteComment] = useDeleteDataMutation();

  const issue = data?.data;
  const loading = postLoading || likeLoading;
  const sameUser = userId === issue?.user;

  return (
    <Container>
      <Badge.Ribbon
        text={issue?.active ? 'Post activo' : 'Resuelta'}
        color={issue?.active ? 'blue' : 'green'}
      >
        <Card title={issue?.title} loading={loading}>
          {issue && (
            <>
              <p>
                <strong>Author:</strong> {issue.author}
              </p>
              <p>
                <strong>Description:</strong> {issue.description}
              </p>
              <Divider orientation="left">Comentarios</Divider>
              {issue?.comments?.length ? (
                <ul style={{ listStyleType: 'none' }}>
                  {issue?.comments?.map((comment) => (
                    <li key={comment._id}>
                      <Space size="large">
                        <Text>
                          @{comment.author}: {comment.comment}
                        </Text>
                        {sameUser && (
                          <DeleteOutlined
                            style={{ color: 'red' }}
                            onClick={async () => {
                              const response = await deleteComment({
                                params: `delete-comment/${comment?._id}`,
                              });
                              if (
                                'data' in response &&
                                !response?.data?.error
                              ) {
                                refetch();
                              }
                            }}
                          />
                        )}
                      </Space>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text type="secondary">No hay comentarios</Text>
              )}
              <Row justify="end">
                <Space size="middle">
                  <IconText
                    icon={
                      issue?.likes.includes(userId) ? LikeFilled : LikeOutlined
                    }
                    text={issue?.likes?.length}
                    key="list-vertical-like-o"
                    onClick={async () => {
                      const response = await setLike({
                        params: 'set-like',
                        body: {
                          id: issue?._id,
                          userId,
                        },
                      });

                      if ('data' in response && !response?.data?.error) {
                        refetch();
                      }
                    }}
                  />
                  <IconText
                    icon={MessageOutlined}
                    text={issue?.comments?.length}
                    key="list-vertical-message"
                    onClick={() => {
                      console.log('comentar');
                    }}
                  />
                </Space>
              </Row>
              <Row style={{ width: '100%', marginTop: '1.5rem' }} wrap={false}>
                <AddComments refetch={refetch} sameUser={sameUser} />
              </Row>
            </>
          )}
        </Card>
      </Badge.Ribbon>
    </Container>
  );
}

export default ViewPost;
