import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que busca no existe."
      style={{
        minHeight: "100vh",
        paddingTop: "23vh",
      }}
      extra={[
        <Button
          onClick={() => {
            navigate("/");
          }}
          key="backHome"
          type="default"
        >
          Ir al inicio
        </Button>,
        <Button
          onClick={() => {
            navigate(-1);
          }}
          key="back"
          type="primary"
        >
          Regresar
        </Button>,
      ]}
    />
  );
};

export default NotFound;
