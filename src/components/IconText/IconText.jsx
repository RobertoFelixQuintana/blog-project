import { Space } from 'antd';
import React from 'react';

const styleCursor = {
  cursor: 'pointer',
};

const IconText = ({ icon, text, onClick, color }) => (
  <Space
    onClick={onClick}
    style={{
      ...styleCursor,
      color,
    }}
  >
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
