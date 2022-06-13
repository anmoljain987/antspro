import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";

const SignUp = () => {
  const [dataSource, setDataSource] = useState({});

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setDataSource(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Form
      form={form}
      name="signup"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      layout="horizontal"
      initialValues={{
        remember: true,
        size: "componentSize",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size={"large"}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirnm Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your password again!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
