import React from 'react';
import Container from '../../../components/Container/Container';
import { useGetDataQuery } from '../../../store/api/usersApi';
import ListPost from '../../../components/Container/ListPost';
import { useSelector } from 'react-redux';
import { selectId } from '../../../store/Features/auth';

const MyPosts = () => {
  const id = useSelector(selectId);
  const {
    data,
    refetch,
    isLoading: postsLoading,
  } = useGetDataQuery({
    params: `get-posts/${id}?byUser=true`,
  });

  const [issuesData, setIssuesData] = React.useState([]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    if (data?.data?.length) {
      setIssuesData(data?.data);
    }
  }, [data]);

  return (
    <Container>
      <ListPost
        title="Mis publicaciones"
        issuesData={issuesData}
        postsLoading={postsLoading}
        refetch={refetch}
      />
    </Container>
  );
};

export default MyPosts;
