import React, { useContext, useEffect, useState } from "react";
// import axios from "../utils/Axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getSingleProduct();
    // console.log(products)
   if(!product){
    setProduct(products.filter((p)=>p.id==id)[0]);
   }
}, []);

const productDeleteHandler = () =>{
  const filterdProduct = products.filter((p)=>p.id !== id)
  setProducts(filterdProduct);
  localStorage.setItem("products",JSON.stringify(filterdProduct))
  toast.success("Product deleted successfully");
  navigate("/")
}

return product ? (
    <div className="flex justify-between items-center w-[75%] h-full m-auto p-[8%]">
      <img
        className="w-[40%] h-[80%] object-contain "
        src={product.image}
        alt=""
      />
      <div className="content w-[55%]">
        <h1 className="text-3xl">{product.title}</h1>
        <h3 className="text-zinc-500 my-2">{product.category}</h3>
        <h2 className="text-red-300 mb-1">$ {product.price}</h2>
        <p className="text-md mb-3">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="mr-3 py-1 px-4 border rounded border-blue-200 text-blue-400 ">
          Edit
        </Link>
        <button onClick={()=>productDeleteHandler(product.id)} className="py-1 px-4 border rounded border-red-200 text-red-400 ">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
