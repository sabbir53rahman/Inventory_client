"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Pagination } from "antd";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { fetchProducts } from "@/redux/features/productSlice/productSlice";
import axios from "axios";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(1);
  const totalItems = products.length;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products?page=${currentPage}&size=${itemPerPage}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res?.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [currentPage, itemPerPage, BASE_URL]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page - 1); 
    setItemPerPage(pageSize);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (imageUrl) => (
        <Image width={50} height={50} src={imageUrl} alt="Product" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => {
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? "N/A" : `$${numPrice.toFixed(2)}`;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const handleUpdate = (product) => {
    console.log("Updating product", product);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl dark:text-white font-bold mb-4 text-center">
        Products
      </h1>

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
          pagination={{
            current: currentPage + 1, 
            pageSize: itemPerPage,
            total: totalItems,
            onChange: handlePageChange,
          }}
          className="dark:text-white"
        />
      </div>
    </div>
  );
};

export default ProductsPage;
