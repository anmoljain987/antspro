import { Button, Form, Input, Card, message } from "antd";
import React, { useState } from "react";
import { registerFirebase } from "../../utils/utilis";

import { useDispatch } from "react-redux";
import { authActions } from "Store";

const SignUp = () => {
  const [form] = Form.useForm();

  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { email, password } = values;
    setSubmitting(true);
    registerFirebase(email, password)
      .then((res) => {
        dispatch(authActions.login());
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
        maxWidth: 500,
        margin: "auto",
        marginTop: 40,
      }}
    >
      <Form
        form={form}
        name="signup"
        layout="vertical"
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

        <Form.Item>
          <Button disabled={isSubmitting} loading={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUp;
