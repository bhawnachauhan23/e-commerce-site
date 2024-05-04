import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const changeHandler = (e) => {
    console.log(e.target.name, e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 characters");
      return;
    }
    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen">
      <h1 className="w-1/2 mb-5 text-3xl font-semibold">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between ">
        <input
          type="text"
          placeholder="category"
          className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-[48.5%]"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="price"
          className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-[48.5%]"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        className="mb-3 text-1xl bg-zinc-200 rounded p-2 w-1/2"
        rows={8}
        placeholder="enter product description here"
        name="description"
        onChange={changeHandler}
        value={product && product.description}></textarea>

      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-200 text-blue-400 ">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Edit;
