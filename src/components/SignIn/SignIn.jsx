import { Button, Checkbox, Form, Input, Card, message } from "antd";

import React, { useEffect, useState } from "react";
import { loginFirebase } from "../../utils/utilis";
const SignIn = () => {
  const [dataSource, setDataSource] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   let temp = JSON.parse(localStorage.getItem("user"));
  //   setDataSource(temp);
  // }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { email, password } = values;

    // if (values.remember === true) {
    //   console.log("yes");
    //   localStorage.setItem("user", JSON.stringify(values));
    // } else {
    //   localStorage.removeItem("user");
    // }
    loginFirebase(email, password)
      .then((res) => {
        console.log(res);
        // form.resetFields();
      })
      .catch((err) => message.error(err.message))
      .finally((el) => {
        form.resetFields();
      });
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
          <Button loading={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignIn;
