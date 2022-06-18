import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { resetPassword } from "utils/utilis";

function PasswordReset({ reseting, isReseting }) {
  const [form] = Form.useForm();
  const [text, setText] = useState("");
  const submitHandler = () => {
    console.log(text);
    resetPassword(text);

    form.resetFields();
  };

  return (
    <Modal
      title="Reset your password"
      visible={reseting}
      onCancel={() => {
        isReseting(false);
      }}
      okText="Reset"
      okType="primary"
      onOk={() => {
        submitHandler();
        isReseting(false);
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="signin"
        initialValues={{
          remember: true,
          size: "componentSize",
        }}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          label={<h2 style={{ fontWeight: 500 }}>Email</h2>}
          name="resetemail"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
            style={{ borderRadius: "10px 10px 10px" }}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PasswordReset;
