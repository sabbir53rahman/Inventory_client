"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchProducts } from "@/redux/features/productSlice/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  

  const { products, status, pagination = {} } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (pagination?.currentPage !== undefined && pagination?.pageSize !== undefined) {
      dispatch(fetchProducts({ page: pagination.currentPage, size: pagination.pageSize }));
    }
  }, [dispatch, pagination?.currentPage, pagination?.pageSize]);

  const handlePageChange = (page, pageSize) => {
    dispatch(fetchProducts({ page, size: pageSize }));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (imageUrl) => (
        <Image width={50} height={50} src={imageUrl} alt="Product" />
      ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Quantity", dataIndex: "quantity" },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${parseFloat(price).toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
        </Space>
      ),
    },
  ];

  const handleUpdate = (product) => {
    console.log("Updating product", product);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl dark:text-white font-bold mb-4 text-center">Products</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <Input
          placeholder="Search products..."
          className="w-full max-w-md p-2 rounded-md border dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <Table
          rowKey="_id"
          dataSource={products}
          columns={columns}
          pagination={false} 
          loading={status === "loading"}
          className="dark:text-white"
        />

        {/* Custom Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            current={pagination?.currentPage || 1}
            pageSize={pagination?.pageSize || 10}
            total={pagination?.totalItems || 0}
            onChange={handlePageChange}
            showSizeChanger
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
