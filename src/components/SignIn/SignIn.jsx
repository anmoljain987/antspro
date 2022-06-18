import { Button, Form, Input, Card, message, Typography, Spin } from "antd";
import React, { useEffect, useState } from "react";

import { loginFirebase } from "../../utils/utilis";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";

const { Title } = Typography;
const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const isAuth = useSelector((state) => state.isAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isAuth) {
      navigate("todolist");
    }
  }, [isAuth, navigate]);
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
    loginFirebase(email, password)
      .then((res) => {
        dispatch(authActions.login());
      })

      .catch((err) => message.error(err.message))
      .finally((el) => {
        form.resetFields();
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.message);
  };
  return (
    <Card
      title={<Title style={{ textAlign: "center" }}>Sign in</Title>}
      style={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 40,
      }}
    >
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          form={form}
          name="signin"
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

          <Form.Item style={{ textAlign: "right", marginTop: 50 }}>
            <Button disabled={isSubmitting} loading={isSubmitting} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default SignIn;
