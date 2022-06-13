import { Button, Checkbox, Form, Input, Card, message } from "antd";
import React, { useEffect, useState } from "react";

const SignIn = () => {
  const [dataSource, setDataSource] = useState(null);
  const warning = (mess) => {
    message.warning(mess);
  };
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("user"));
    setDataSource(temp);
  }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (values?.email.length === 0 || !values.email.includes("@")) {
      warning("Email is Invalid");
      return;
    }
    if (values?.password.length < 6) {
      warning("Password is Invalid");
      return;
    }
    if (values.remember === true) {
      console.log("yes");
      localStorage.setItem("user", JSON.stringify(dataSource));
    } else {
      localStorage.removeItem("user");
    }
    setDataSource(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Card
      title="Sign In"
      style={{
        width: 700,
        margin: "auto",
        marginTop: 40,
      }}
    >
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
            {
              type: "email",
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
            { min: 6 },
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
