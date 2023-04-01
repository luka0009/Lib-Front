import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../store/authSlice";
import axios from "axios";

export default function useRedirect(path) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));      
      const isLoggedIn = user !== null && user !== "null" && user !== "undefined" && user.hasOwnProperty('token');
      
      console.log("isLoggedIn:", isLoggedIn);
      dispatch(setLogin(isLoggedIn));

      if (!isLoggedIn) {
        alert("PLease Log in to continiue");
        navigate(path);
        return;
      }
    };
    redirectUser();
  }, [navigate, path, dispatch]);
}
