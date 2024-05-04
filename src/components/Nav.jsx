import React from "react";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  
  let distict_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distict_category = [...new Set(distict_category)];

  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }


  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-200 text-blue-400 "
        href="/create">
        Add New Product
      </a>
      <hr className="w-[80%] my-3 " />
      <h1 className="text-xl mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]">
        {distict_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="mb-3 flex items-center gap-2">
            <span style={{backgroundColor:color()}} className="w-[12px] h-[12px] rounded-full "></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
