import { Button, Form, Input, Card, message, Typography, Spin, Layout } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./SignIn.module.css";
import { loginFirebase, googleLogin } from "../../utils/utilis";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";
import PassAction from "./PassAction";
const { Footer } = Layout;
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
    <>
      <Card
        title={<Title style={{ textAlign: "center" }}>Login</Title>}
        style={{
          borderRadius: "30px 30px 30px",
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
              label={<h2 style={{ fontWeight: 400 }}>Email</h2>}
              name="email"
              requiredMark="hidden"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input placeholder="Enter your email" style={{ borderRadius: "10px 10px 10px" }} />
            </Form.Item>

            <Form.Item
              label={<h2 style={{ fontWeight: 400 }}>Password</h2>}
              name="password"
              requiredMark="hidden"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                style={{ borderRadius: "10px 10px 10px" }}
              />
            </Form.Item>
            <div style={{ display: "flex", marginTop: 50, justifyContent: "space-between" }}>
              <Form.Item>
                <Button
                  className={styles.google_button}
                  shape="round"
                  type="error"
                  onClick={googleLogin}
                >
                  <GoogleOutlined className={styles.googleOutlined} style={{ color: "orange" }} />
                  <span className={styles.hidden}> Sign-in with Google</span>
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  shape="round"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  type="primary"
                  htmlType="submit"
                >
                  Sign-In
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
        <Footer style={{ backgroundColor: "white" }}>
          <PassAction />
        </Footer>
      </Card>
    </>
  );
};

export default SignIn;
