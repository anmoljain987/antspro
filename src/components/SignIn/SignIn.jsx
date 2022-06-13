import { Button, Checkbox, Form, Input, Card } from "antd";
import React, { useState } from "react";

const SignIn = () => {
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
    <Card
      title="Sign Up"
      style={{
        width: 700,
        margin: "auto",
        marginTop: 40,
      }}
    >
      {" "}
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
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 8,
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
    </Card>
  );
};

export default SignIn;
