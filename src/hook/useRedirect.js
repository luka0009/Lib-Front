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
      // let isLoggedIn = false;


      // fetch("http://localhost:5000/api/auth/loggedinstatus", {
      //   headers: {
      //     Authorization: `Bearer ${
      //       localStorage.getItem("user") &&
      //       JSON.parse(localStorage.getItem("user")).token
      //     }`,
      //   },
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     isLoggedIn = data;
      //   })
      //   .catch((error) => {
      //     console.error("There was a problem with the fetch request:", error);
      //   });

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
