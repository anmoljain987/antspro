import { Button, Form, Input, Card, message, Typography, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { registerFirebase } from "../../utils/utilis";

import { useDispatch } from "react-redux";
import { authActions } from "Store";
const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, []);
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
      title={<Title style={{ textAlign: "center" }}>Sign Up</Title>}
      style={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 40,
      }}
    >
      <Spin spinning={loading}>
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
            label={<h2 style={{ fontWeight: 400 }}>Email</h2>}
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
            <Input placeholder="Enter your email" style={{ borderRadius: "10px 10px 10px" }} />
          </Form.Item>

          <Form.Item
            label={<h2 style={{ fontWeight: 400 }}>Password</h2>}
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
            <Input.Password style={{ borderRadius: "10px 10px 10px" }} />
          </Form.Item>
          <Form.Item
            label={<h2 style={{ fontWeight: 400 }}>Confirm Password</h2>}
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
            <Input.Password
              placeholder="Re-enter your password"
              style={{ borderRadius: "10px 10px 10px" }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right", marginTop: 50 }}>
            <Button
              type="primary"
              shape="round"
              loading={isSubmitting}
              disabled={isSubmitting}
              htmlType="submit"
            >
              Sign-Up
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default SignUp;
