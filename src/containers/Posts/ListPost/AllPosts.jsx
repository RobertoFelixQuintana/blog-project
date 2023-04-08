import React from 'react';
import Container from '../../../components/Container/Container';
import { useGetDataQuery } from '../../../store/api/usersApi';
import ListPost from '../../../components/Container/ListPost';

const AllPosts = () => {
  const {
    data,
    refetch,
    isLoading: postsLoading,
  } = useGetDataQuery({
    params: 'get-posts',
  });

  const [issuesData, setIssuesData] = React.useState([]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    if (data?.data.length) {
      setIssuesData(data?.data);
    }
  }, [data]);

  return (
    <Container>
      <ListPost
        title="Publicaciones"
        issuesData={issuesData}
        postsLoading={postsLoading}
        refetch={refetch}
      />
    </Container>
  );
};

export default AllPosts;
