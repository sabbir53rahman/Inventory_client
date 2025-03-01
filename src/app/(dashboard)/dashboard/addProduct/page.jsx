"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaBox, FaClipboardList, FaDollarSign, FaSortNumericUp, FaImage } from "react-icons/fa";
import { addProduct } from "@/redux/features/productSlice/productSlice";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { addProductStatus, addProductError } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Product name and price are required.");
      return;
    }

    if (formData.image) {

      const imageData = new FormData();
      imageData.append("image", formData.image);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: imageData,
        });

        const data = await response.json();

        if (data.success) {
          const imageUrl = data.data.url;
          
          const productData = {
            ...formData,
            image: imageUrl,
          };
          console.log(productData)

          await dispatch(addProduct(productData));

          if (addProductStatus === "succeeded") {
            router.push("/dashboard/products"); 
          }
        } else {
          alert("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    } else {
      await dispatch(addProduct(formData));

      if (addProductStatus === "succeeded") {
        router.push("/dashboard/allProducts"); 
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="relative bg-white/30 dark:bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl dark:shadow-md max-w-md w-full border border-gray-300 dark:border-white/20">
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-lg pointer-events-none"></div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">Add Product</h2>

        {addProductStatus === "loading" && <p className="text-yellow-500 text-center">Adding product...</p>}
        {addProductStatus === "failed" && <p className="text-red-500 text-center">{addProductError}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaBox className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaSortNumericUp className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex  bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaClipboardList className="text-gray-600 dark:text-gray-300 mt-[5px] mr-3" />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaDollarSign className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-white/70 dark:bg-white/20 p-3 rounded-xl shadow-sm dark:shadow-lg transition-all duration-300">
            <FaImage className="text-gray-600 dark:text-gray-300 mr-3" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-transparent text-gray-800 dark:text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            disabled={addProductStatus === "loading"}
          >
            {addProductStatus === "loading" ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
