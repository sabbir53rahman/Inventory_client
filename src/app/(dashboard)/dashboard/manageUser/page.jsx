"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, message, Spin } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchAllUsers } from "@/redux/features/userSlice/userSlice";

const ManageUsers = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const dispatch = useDispatch();
  const { allUsers, isLoading, error, user } = useSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleMakeAdmin = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to promote this user to Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${BASE_URL}/users/admin/${userId}`);
          message.success("User promoted to admin successfully!");
          dispatch(fetchAllUsers());
        } catch (error) {
          message.error("Failed to promote user");
        }
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <span style={{ fontWeight: "bold" }}>{role}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, singleUser) =>
        user?.role === "superadmin" && singleUser.role !== "admin" ? (
          <Button type="primary" onClick={() => handleMakeAdmin(singleUser._id)}>
            Make Admin
          </Button>
        ) : (
          <span>-</span>
        ),
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Manage Users</h1>
      <Table dataSource={allUsers} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ManageUsers;
