"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Accessories");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const token = await getToken();

      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Select ");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-40">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Jewelry">Jewelry</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Ceramics">Ceramics</option>
              <option value="Textiles">Textiles</option>
              <option value="Leather Goods">Leather Goods</option>
              <option value="Bags & Purses">Bags & Purses</option>
              <option value="Candles">Candles</option>
              <option value="Bath & Beauty">Bath & Beauty</option>
              <option value="Toys & Dolls">Toys & Dolls</option>
              <option value="Pet Accessories">Pet Accessories</option>
              <option value="Art & Paintings">Art & Paintings</option>
              <option value="Stationery">Stationery</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Knitted & Crocheted Items">
                Knitted & Crocheted Items
              </option>
              <option value="Glassware">Glassware</option>
              <option value="Upcycled Products">Upcycled Products</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Metal Crafts">Metal Crafts</option>
              <option value="Paper Crafts">Paper Crafts</option>
              <option value="Holiday Decorations">Holiday Decorations</option>
              <option value="Woven Baskets">Woven Baskets</option>
              <option value="Planters & Pots">Planters & Pots</option>
              <option value="Digital Art Prints">Digital Art Prints</option>
              <option value="Macramé">Macramé</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 bg-teal-600 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;
