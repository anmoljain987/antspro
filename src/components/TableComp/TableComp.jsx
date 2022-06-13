import React, { useState } from "react";
import { Switch, Input, Modal, Table, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKED_TODO, DELETE_TODO, GET_ALL_TODOS, UPDATE_TODO } from "../../graphql/Queries";

function TableComp({ setDataSource, dataSource }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleting, setDelete] = useState("");
  const { loading } = useQuery(GET_ALL_TODOS, {
    onCompleted: (e) => {
      console.log(e.todos);
      setDataSource(e.todos);
    },
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: (e) => {
      setDataSource((prev) => prev.filter((el) => el.id !== deleting));
    },
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: (e) => {
      console.log(e);

      const temp = JSON.parse(JSON.stringify(dataSource));

      const editIndex = temp.findIndex((el) => {
        return el.id === e.updateTodo?.id;
      });

      if (editIndex) {
        temp[editIndex] = e.updateTodo;
        setDataSource(temp);
      }
      setEditingTodo(null);
    },
  });
  const [checkedTodo] = useMutation(CHECKED_TODO);

  function switchHandler(e, id, status) {
    checkedTodo({
      variables: {
        id,
        status: !status,
      },
    });
  }
  const columns = [
    { key: "0", title: "id", dataIndex: "id" },
    {
      key: "1",
      title: "Description",
      dataIndex: "description",
    },

    {
      key: "2",
      title: "Status",
      render: (record) => {
        return (
          <Switch
            onChange={(e) => switchHandler(e, record.id, record.status)}
            checkedChildren="Completed"
            unCheckedChildren="Not Completed"
            style={{ width: 200 }}
            defaultChecked={record.status}
          />
        );
      },
    },
    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => editHandler(record)} />
            <DeleteOutlined
              onClick={() => deleteHandler(record)}
              style={{ color: "red", marginLeft: 16 }}
            />
          </>
        );
      },
    },
  ];
  function editHandler(record) {
    setIsEditing(true);
    setEditingTodo({ ...record });
    // console.log(record);
  }
  function deleteHandler(record) {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        deleteTodo({
          variables: {
            id: record.id,
          },
        });
        setDelete(record.id);
      },
    });
  }
  function editInputHandler(e) {
    const { name, value } = e.target;
    setEditingTodo((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function submitHandler() {
    updateTodo({
      variables: {
        id: editingTodo.id,
        description: editingTodo.description,
      },
    });
  }

  return (
    <>
      <Spin spinning={loading} tip="Loading">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }}
        />
      </Spin>

      <Modal
        title="Edit Task"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        okText="Save"
        okType="primary"
        onOk={() => {
          submitHandler();
          setIsEditing(false);
        }}
      >
        <Input name="description" onChange={editInputHandler} value={editingTodo?.description} />
      </Modal>
    </>
  );
}

export default TableComp;
