"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, Modal, Form, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  fetchAllOrders,
} from "@/redux/features/orderSlice/orderSlice";
import Image from "next/image";
import Swal from "sweetalert2";

const { Option } = Select;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const OrderTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    dispatch(fetchAllOrders({ search }));
  }, [dispatch, search]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleCreateOrder = async (values) => {
    if (!selectedProduct) {
      console.error("No product selected");
      return;
    }

    const orderData = {
      ...values,
      productName: selectedProduct.name,
      productId: selectedProduct._id,
      productImage: selectedProduct.image,
    };

    dispatch(createOrder(orderData)).then(() => {
      setIsModalVisible(false);
      form.resetFields();
      dispatch(fetchAllOrders({ search }));

      Swal.fire({
        icon: "success",
        title: "Order Created!",
        text: "Your order has been successfully created.",
        confirmButtonColor: "#48BEF7",
      });
    });
  };

  const handleProductChange = (value) => {
    const product = products.find((product) => product._id === value);
    setSelectedProduct(product);
    setTotalPrice(product.price * quantity);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * value);
    }
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, order) => (
        <div>
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            {order.customerName}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {order.customerEmail}
          </div>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, order) => (
        <div className="flex items-center">
          <Image
            src={order.productImage}
            alt={order.productName}
            width={40}
            height={40}
            className="object-cover mr-2"
          />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {order.productName}
          </span>
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "singleProductTotalPrice",
      key: "singleProductTotalPrice",
      render: (text) => <span className="dark:text-gray-200">${text}</span>,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Order Management
        </h2>
        <Input.Search
          placeholder="Search Orders"
          onSearch={(value) => setSearch(value)}
          enterButton
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add New Order
        </Button>
      </div>

      {isLoading ? (
        <div className="dark:text-gray-200">Loading...</div>
      ) : error ? (
        <div className="bg-red-400 text-white p-4 text-center text-[20px] rounded-md shadow-md">
          <strong>{error}</strong>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto dark:text-gray-200"
        />
      )}

      <Modal
        title="Create New Order"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrder}>
          <Form.Item
            name="customerName"
            label="Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            name="customerEmail"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select placeholder="Choose a product" onChange={handleProductChange}>
              {products.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
          >
            <InputNumber min={1} onChange={handleQuantityChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderTable;
