import React from 'react';
import { Chart, Interval, PieChart } from 'bizcharts';
import initDayjs from '../src/helpers/configDayjs';
import Container from './components/Container/Container';
import { useGetDataQuery } from './store/api/usersApi';
import { Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

const searchUsersByMonth = (data) => {
  const last8Months = [];
  for (let i = 0; i < 8; i++) {
    const month = dayjs().subtract(i, 'month');
    last8Months.push({
      month: month.format('MMMM YYYY'),
      users: 0,
    });
  }

  // Loop over the data and update the corresponding month in last8Months array
  data.forEach((item) => {
    const date = dayjs(item.date);
    const index = last8Months.findIndex(
      (month) => month.month === date.format('MMMM YYYY')
    );
    if (index !== -1) {
      last8Months[index].users = item.users;
    }
  });

  return last8Months;
};

function App() {
  const {
    data: dataIssues,
    isLoading: isLoadingIssues,
    refetch: refetchIssues,
  } = useGetDataQuery({
    params: `get-stats-by-issues`,
  });

  const {
    data: dataUser,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useGetDataQuery({
    params: `get-stats-by-users`,
  });

  const interactionsData = dataIssues?.data?.totalInteractions || [];
  const activeIssuesData = dataIssues?.data?.totalIssues || [];
  const createdUsers = searchUsersByMonth(dataUser?.data || []);
  const loading = isLoadingIssues || isLoadingUsers;

  React.useEffect(() => {
    initDayjs();
    refetchIssues();
    refetchUsers();
  }, [refetchIssues, refetchUsers]);

  return (
    <Container loading={loading}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Estadísticas de publicaciones
        </h1>
        <Space
          direction="horizontal"
          size="large"
          style={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <PieChart
            data={interactionsData}
            height={550}
            width={550}
            autoFit
            angleField="value"
            colorField="label"
            label={{
              type: 'inner',
              offset: '-50%',
              content: ({ percent }) => {
                return `${(percent * 100).toFixed(0)}%`;
              },
            }}
          />
          <PieChart
            data={activeIssuesData}
            height={550}
            width={550}
            angleField="value"
            colorField="label"
            autoFit
            label={{
              type: 'inner',
              offset: '-50%',
              content: ({ percent }) => {
                return `${(percent * 100).toFixed(0)}%`;
              },
            }}
          />
        </Space>

        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Usuarios registrados este año
        </h1>
        <Chart
          height={400}
          data={createdUsers}
          scale={{ users: { min: 0, tickInterval: 1 } }}
          autoFit
          padding={[20, 30, 50, 50]}
        >
          <Interval
            position="month*users"
            label={['users', { position: 'middle', offset: 10 }]}
          />
          <Tooltip />
        </Chart>
      </Space>
    </Container>
  );
}

export default App;
