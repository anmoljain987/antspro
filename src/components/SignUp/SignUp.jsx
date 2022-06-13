import { Button, Checkbox, Form, Input, Card } from "antd";
import React, { useEffect, useState } from "react";

const SignIn = () => {
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("user"));
    setDataSource(temp);
  }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
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
        maxWidth: 700,
        margin: "auto",
        marginTop: 40,
      }}
    >
      <Form
        form={form}
        name="signup"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
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
            { type: "email", message: "Please enter valid email!" },
          ]}
          hasFeedback
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
            { whitespace: true, message: "Remove Spaces!" },
            {
              min: 6,
              message: "Password length is short!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your password again",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Password does'nt matches");
              },
            }),
          ]}
          hasFeedback
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
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignIn;
