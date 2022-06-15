import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { loginFirebase } from "../../utils/utilis";
import { authActions } from "../../Store";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { email, password } = values;
    setSubmitting(true);
    loginFirebase(email, password)
      .then((res) => {
        console.log(res);
        setDataSource(res._tokenResponse);
      })

      .catch((err) => message.error(err.message))
      .finally((el) => {
        form.resetFields();
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("error on signin", errorInfo.message);
  };
  useEffect(() => {
    if (dataSource?.email) {
      dispatch(authActions.login({ email: dataSource?.email }));
      navigate(`/todolist/${dataSource.email}`);
    }
    return () => {
      setDataSource(null);
    };
  }, [dataSource, dispatch, navigate]);
  return (
    <Card
      title="Sign In"
      style={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 40,
      }}
    >
      <Form
        style={{ width: "" }}
        layout="vertical"
        form={form}
        name="signup"
        initialValues={{
          remember: true,
          size: "componentSize",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
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
        <div style={{ textAlign: "right" }}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={isSubmitting}
              style={{}}
              loading={isSubmitting}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default SignIn;
