import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Details from "./components/Details";
import Edit from "./components/Edit";

const App = () => {
  const { search, pathname } = useLocation();
  return (
    <div className="h-screen w-screen flex">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to={"/"}
          className="text-red-300 text-[2vw] absolute left-[18.5%] top-[4%]">
          Home
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
