import React, { useEffect, useState } from "react";
import { Switch, Input, Modal, Table, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKED_TODO, DELETE_TODO, GET_ALL_TODOS, UPDATE_TODO } from "../../graphql/Queries";

function TableComp({ setDataSource, dataSource }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const { loading, data } = useQuery(GET_ALL_TODOS);
  const [deleteTodo, { loading: deleteLoad, data: deleteData }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  const [checkedTodo] = useMutation(CHECKED_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  useEffect(() => {
    if (!loading) setDataSource(data.todos);
  }, [loading, data, setDataSource]);

  function switchHandler(e, id, status) {
    checkedTodo({
      variables: {
        id,
        status: !status,
      },
    });
  }
  const columns = [
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
    console.log(record);
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
        setDataSource((prev) => prev.filter((el) => el.id !== record.id));
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
    setDataSource((prev) =>
      prev.map((el) => (el.id === editingTodo?.id ? { ...el, ...editingTodo } : el))
    );
    setEditingTodo(null);
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
