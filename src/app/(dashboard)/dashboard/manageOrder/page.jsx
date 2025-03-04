"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Tag, Modal, Form, Input, Select, InputNumber } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const OrderTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data.products);
        console.log(response)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleCreateOrder = (values) => {
    console.log("Order Created:", values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id", render: (id) => `#${id}` },
    { title: "Customer", dataIndex: "customer", key: "customer", render: (_, order) => (
        <div>
          <div className="font-semibold">{order.customerName}</div>
          <div className="text-gray-500 text-sm">{order.customerEmail}</div>
        </div>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status", render: (status) => (
        <Tag icon={status === "completed" ? <CheckCircleOutlined /> : status === "pending" ? <ClockCircleOutlined /> : <CloseCircleOutlined />} color={status === "completed" ? "green" : status === "pending" ? "gold" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add New Order</Button>
      </div>
      <Table columns={columns} dataSource={[]} rowKey="id" pagination={{ pageSize: 5 }} className="overflow-x-auto" />
      
      {/* Modal for Creating Order */}
      <Modal title="Create New Order" open={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleCreateOrder}>
          <Form.Item name="customerName" label="Name" rules={[{ required: true, message: "Please enter customer name" }]}>
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item name="customerEmail" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="productId" label="Select Product" rules={[{ required: true, message: "Please select a product" }]}>
            <Select placeholder="Choose a product">
              {products.map((product) => (
                <Option key={product.id} value={product.id}>{product.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Enter quantity" }]}>
            <InputNumber min={1} placeholder="Enter quantity" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderTable;
