import React, { useState } from "react";
import { Button, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../../graphql/Queries";
import { useSelector } from "react-redux";

function FormComp({ setDataSource }) {
  const initialState = {
    description: "",
    status: false,
  };
  const [todo, setTodo] = useState(initialState);
  const id = useSelector((state) => state.id);

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
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: (e) => {
      setDataSource((prev) => [...prev, e.createTodo]);
    },
  });

  const submitHandler = () => {
    if (description.length === 0) return;
    console.log(id);
    createTodo({
      variables: { description, userId: id },
    });
    setTodo(initialState);
  };

  return (
    <Input.Group
      style={{ display: "flex", width: "100%", marginTop: 50, marginBottom: 50 }}
      compact
      className="App"
    >
      <Input
        style={{ width: "100%" }}
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
