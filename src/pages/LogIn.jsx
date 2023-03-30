import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useLogInUserMutation,
  useRegisterUserMutation,
} from "../store/authApi";
import { setLogin, setName } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import MainLayout from "../../components/MainLayout";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loginUser, { data: loginData, isError, error }] =
    useLogInUserMutation();
  const submitHandler = async (data) => {
    await loginUser(data);
    if (!isError) {
      dispatch(setLogin(true));
      // await console.log(loginData);
      // if(loginData !== undefined) {
      //   navigate('/books');
      // }
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Add this line to wait for loginData
      // if (loginData && loginData.hasOwnProperty("token")) {
      //   console.log("loginSuccesful");
      //   // navigate('/books');
      // } else {
      //   throw new Error("Failed login attempt");
      // }
    }
    console.log(data);
    // console.log(loginData);
    reset();
    // navigate('/books');
  };
  useEffect(() => {
    // console.log(isLoggedIn);
    console.log("loginData------------", loginData);
    if (loginData){
       localStorage.setItem("user", JSON.stringify(loginData));
       navigate('/books');
    }
  }, [loginData]);
  const password = watch("password");
  return (
    // <MainLayout>
    <section className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          Log In
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password length must be at least 6 characters",
                },
              })}
              placeholder="Enter password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          {isError && (
            <p className="text-red-500 text-xl">Error: {error.data.message}</p>
          )}
          <button
            type="submit"
            disabled={!isValid}
            className="bg-primary text-white font-bold text-lg py-2 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Log In
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
    // </MainLayout>
  );
};

export default LogIn;
