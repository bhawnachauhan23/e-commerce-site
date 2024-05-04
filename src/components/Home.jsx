import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  

  const [filterproducts, setFilterProducts] = useState(null);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilterProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterproducts || category == 'undefined') setFilterProducts(products);
    if (category != "undefined") {
      // getProductCategory();
      setFilterProducts(products.filter(p=>p.category==category))
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto ">
        {filterproducts &&
          filterproducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="m-3 card p-5 border shadow rounded w-[20%] h-[32vh] flex flex-col justify-center items-center ">
              <div
                className="hover:scale-105 mb-3 w-full h-[82%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}></div>
              <h1 className="hover:text-blue-400 text-xs">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
