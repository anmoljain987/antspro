import React, { useState } from "react";
import { Button, Input } from "antd";
import { v4 as uuid } from "uuid";

function FormComp({ setDataSource }) {
  const initialState = {
    description: "",
    status: false,
    id: uuid(),
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
  const submitHandler = () => {
    if (description.length === 0) return;
    setTodo((prev) => {
      return { ...prev, id: uuid() };
    });
    setDataSource((prev) => [...prev, todo]);
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
