import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ErrorNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Page cannot be found"
    extra={
      <Button type="primary">
        <Link to={"/"}>Back Home</Link>
      </Button>
    }
  />
);

export default ErrorNotFound;
