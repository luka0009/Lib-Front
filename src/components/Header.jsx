import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogOutUserQuery } from "../store/authApi";

export default function Header() {
  //   const { data, isLoading, isError, error } = useLogOutUserQuery();
  // console.log(data);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    fetch("http://localhost:5000/api/auth/logout");
    localStorage.setItem("user", null);
    navigate("/login");
  };

  const user = localStorage.getItem("user");
  const isLoggedIn = user !== null && user !== "null" && user !== "undefined";

  return (
    <div className="h-[80px] flex justify-between items-center bg-gradient-to-tl from-slate-800 to-blue-900 text-white">
      <div className="ml-8"><Link to='/' className="text-2xl text-white"><button>Home</button></Link></div>
      <div className="flex justify-center items-center mr-8 gap-4">
        {!isLoggedIn && (
          <Link to="register">
            <button className="text-lg text-white">Sign up</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="login">
            <button className="text-lg text-white">Log in</button>
          </Link>
        )}
        {isLoggedIn && (
          <button className="text-lg" onClick={handleLogOut}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
