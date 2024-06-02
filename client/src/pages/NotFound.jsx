import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="flex items-center flex-col h-screen justify-center bg-slate-400">
        <h1 className="text-4xl">
          404 <br /> Page Not Found
        </h1>
        <Link
          to="/"
          className="bg-slate-500 hover:bg-slate-800 px-2 rounded-md text-2xl mt-6 cursor-pointer text-white"
        >
          HOME
        </Link>
      </div>
    </>
  );
}

export default NotFound;
