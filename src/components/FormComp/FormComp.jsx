import { useState } from "react";
import { Button, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../../graphql/Queries";

function FormComp({ setDataSource }) {
  const initialState = {
    description: "",
    status: false,
    uid: "",
  };
  const [todo, setTodo] = useState(initialState);
  const { description } = todo;

  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    onCompleted: (e) => {
      setDataSource((prev) => [...prev, e.createTodo]);

      setTodo(initialState);
    },
    onError(e) {
      message.error(e.message);
    },
  });

  const textHandler = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = () => {
    if (description.length === 0) return;
    createTodo({
      variables: { description },
    });
  };

  return (
    <Input.Group
      style={{
        display: "flex",
        maxWidth: "700px",
        margin: "auto",
        marginTop: 50,
        marginBottom: 50,
      }}
      compact
      className="App"
    >
      <Input
        disabled={loading}
        showCount
        maxLength={100}
        placeholder="Add to List"
        value={description}
        name="description"
        onChange={textHandler}
      />
      <Button disabled={loading} loading={loading} type="primary" onClick={submitHandler}>
        Add Task 📤
      </Button>
    </Input.Group>
  );
}

export default FormComp;
