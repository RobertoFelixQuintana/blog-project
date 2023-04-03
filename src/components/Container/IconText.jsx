import { Space } from 'antd';
import React from 'react';

const styleCursor = {
  cursor: 'pointer',
};

const IconText = ({ icon, text, onClick }) => (
  <Space onClick={onClick} style={styleCursor}>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
