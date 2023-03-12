import { Card, List, Typography } from 'antd';

const { Title, Text } = Typography;

const ProblemList = ({ problems }) => {
  return (
    <Card>
      <List
        header={<Title level={2}>Problems List</Title>}
        dataSource={problems}
        renderItem={(problem) => (
          <List.Item>
            <List.Item.Meta
              title={problem.title}
              description={<Text type="secondary">{problem.createdBy}</Text>}
            />
            {problem.description}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProblemList;
