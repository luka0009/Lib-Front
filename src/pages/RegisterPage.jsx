import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/authApi";
import { setLogin, setName } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loginState, setLoginState] = useState(false);
  const [registerUser, registerResults] = useRegisterUserMutation();
  const { isError, isSuccess, error, originalArgs } = registerResults;
  const submitHandler = async (data) => {
    setLoginState(true);
    await registerUser(data);
    if (!isError) {
      dispatch(setLogin(true));
      // localStorage.setItem("user", JSON.stringify(data));
    }
  };
  useEffect(() => {
    console.log(registerResults);
    if (registerResults.isSuccess) {
      console.log("success");
      setLoginState(false);
      // localStorage.setItem("user", JSON.stringify(registerResults.originalArgs));
      navigate("/login");
    } 
  }, [registerResults]);
  const password = watch("password");
  return (
    // <MainLayout>
    <section className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter name"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>
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
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="confirmPassword"
              className="text-[#5a7184] font-semibold block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm password is required",
                },
                validate: (value) => {
                  if (value !== password) {
                    return "Passwords do not match";
                  }
                },
              })}
              placeholder="Enter confirm password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          {isError && (
            <p className="text-red-500 text-xl">Error: {error.data.message}</p>
          )}{" "}
          {!isError && loginState && (
            <p className="text-orange-800 text-xl">
              Loading... <br /> Please wait. it might take a while
            </p>
          )}
          <button
            type="submit"
            disabled={!isValid}
            className="bg-primary text-white font-bold text-lg py-2 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Register
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            You have an account?{" "}
            <Link to="/login" className="text-primary">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </section>
    // </MainLayout>
  );
};

export default RegisterPage;
