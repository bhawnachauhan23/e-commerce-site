import React, { useState, useContext } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
 const navigate= useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 characters");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product added successfully")
    navigate("/")
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen">
      <h1 className="w-1/2 mb-5 text-3xl font-semibold">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between ">
        <input
          type="text"
          placeholder="category"
          className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-[48.5%]"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-[48.5%]"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        rows={8}
        placeholder="enter product description here"
        onChange={(e) => setDescription(e.target.value)}
        value={description}></textarea>

      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-200 text-blue-400 ">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
