import React, { useEffect } from 'react';
import Container from '../../../components/Container/Container';
import { Badge, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import {
  useDeleteDataMutation,
  useGetDataQuery,
  usePutDataMutation,
} from '../../../store/api/usersApi';
import IconText from '../../../components/IconText/IconText';
import {
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';
import AddComments from './AddComments';
import dayjs from 'dayjs';
import './ViewPost.css';

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

  const actualDate = dayjs(); // Obtener la fecha actual

  const getDaysByHours = (hours) => {
    const days = Math.floor(hours / 24);
    const hoursLeft = hours % 24;
    if (days === 0) {
      return `${hoursLeft}hrs`;
    }
    return `${days}d ${hoursLeft}hrs`;
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
                    <li key={comment._id} className="comment-issue">
                      <Row>
                        <Col flex="90%">
                          <Text>
                            <b>
                              @{comment.author}: {comment.comment}
                            </b>{' '}
                            Comentado hace:{' '}
                            {getDaysByHours(
                              actualDate.diff(comment.created, 'hour')
                            )}
                          </Text>
                        </Col>
                        <Col
                          flex="10%"
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {userId === comment?.user && (
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
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text type="secondary">No hay comentarios</Text>
              )}
              <Row justify="end" style={{ padding: '.5rem 0 .5rem 0' }}>
                <Space size="middle">
                  <IconText
                    color={issue?.likes.includes(userId) ? 'blue' : 'black'}
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
                <AddComments
                  refetch={refetch}
                  sameUser={sameUser}
                  issue={issue}
                />
              </Row>
            </>
          )}
        </Card>
      </Badge.Ribbon>
    </Container>
  );
}

export default ViewPost;
