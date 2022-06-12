import React, { useState } from "react";
import { Button, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_TODO, GET_ALL_TODOS } from "../../graphql/Queries";
function FormComp({ setDataSource }) {
  const initialState = {
    description: "",
    status: false,
  };
  const [todo, setTodo] = useState(initialState);

  const textHandler = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const { description } = todo;
  const [createTodo, { loading, data }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }, "Todos"],
  });

  const submitHandler = () => {
    if (description.length === 0) return;

    setDataSource((prev) => [...prev, todo]);

    createTodo({
      variables: { description },
    });
    setTodo(initialState);
  };

  return (
    <Input.Group compact className="App" style={{ marginTop: 50, marginBottom: 50 }}>
      <Input
        style={{ width: "calc(100% - 400px)" }}
        showCount
        maxLength={100}
        placeholder="Add to List"
        value={description}
        name="description"
        onChange={textHandler}
      />
      <Button type="primary" onClick={submitHandler}>
        Add Task 📤
      </Button>
    </Input.Group>
  );
}

export default FormComp;