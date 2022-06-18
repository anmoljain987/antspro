import { Typography } from "antd";
import React, { useState } from "react";
import styles from "./PassAction.module.css";
import PasswordReset from "./PasswordReset/PasswordReset";
const { Title } = Typography;
function PassAction() {
  const [reseting, isReseting] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={5}>Need help in signing in ?</Title>
      <button
        className={styles.button}
        onClick={() => {
          isReseting(true);
        }}
      >
        reset your password
      </button>
      <PasswordReset reseting={reseting} isReseting={isReseting} />
    </div>
  );
}

export default PassAction;
