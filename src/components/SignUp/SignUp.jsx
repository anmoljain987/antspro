import { Button, Form, Input, Card, message } from "antd";
import React, { useState } from "react";
import { registerFirebase } from "../../utils/utilis";
const SignIn = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setSubmitting] = useState(false);
  const onFinish = (values) => {
    const { email, password } = values;
    setSubmitting(true);
    registerFirebase(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        form.resetFields();
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Card
      title="Sign Up"
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
          wrapperCol={{
            offset: 17,
            span: 0,
          }}
        >
          <Button disabled={isSubmitting} loading={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignIn;
