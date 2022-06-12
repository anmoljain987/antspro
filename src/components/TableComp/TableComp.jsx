import React, { useState } from "react";
import { Switch, Input, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TableComp({ setDataSource, dataSource }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
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
            checkedChildren="Completed"
            unCheckedChildren="Not Completed"
            style={{ width: 200 }}
            defaultUnchecked
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
  }
  function deleteHandler(record) {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
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
  function submitHandler(record) {
    setDataSource((prev) =>
      prev.map((el) => (el.id === editingTodo?.id ? { ...el, ...editingTodo } : el))
    );
    setEditingTodo(null);
  }
  return (
    <>
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
