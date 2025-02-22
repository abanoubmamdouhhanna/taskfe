import axios from "axios";
import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logStyle from "./Login.module.css";
import joi from "joi";
import { generalFeilds } from "../../utils/general.js";
import { jwtDecode } from "jwt-decode";

export default function Login({saveUserData}) {
  
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // Send data to API
  const sendLoginDataToApi = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "https://edgprotask.vercel.app/auth/login",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", data);

      if (data.message == "welcome user! Logged in successfully.") {
        alert("welcome user! Logged in successfully.");
        setIsLoading(false);
        localStorage.setItem('userToken' , data.authorization.token);        
        saveUserData();
        navigate("/map");
        setError("");
      } else {
        setError(data.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Axios Error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }
  }, [user, navigate]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateRegisterForm();
    if (validation.error) {
      setErrorList(validation.error.details);
      setIsLoading(false);
    } else {
      setError("");
      setErrorList([]);
      sendLoginDataToApi();
    }
  };

  // Form Validation
  function validateRegisterForm() {
    const schema = joi.object({
      email: generalFeilds.email.required(),
      password: generalFeilds.password.required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div className="py-5">
      {/* Validation Errors */}
      {/* {errorList.map((err, index) => (
        <div
          key={index}
          className={`alert alert-info my-2 ${logStyle.errordiv}`}
        >
          {err.message}
        </div>
      ))} */}

      {/* API Error */}
      {error && (
        <div className={`alert alert-danger my-2 ${logStyle.errordiv}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2 className="my-2">Login Form</h2>

        <label htmlFor="email">Email:</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control my-input my-2"
          name="email"
          id="email"
          value={user.email}
          required
        />
        {errorList?.filter((err) => err.context.label == "email")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${logStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "email")[0]
                  ?.message
              }
            </p>
          </div>
        ) : (
          ""
        )}

        <label htmlFor="password">Password:</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control my-input my-2"
          name="password"
          id="password"
          value={user.password}
          required
        />
        {errorList?.filter((err) => err.context.label == "password")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${logStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "password")[0]
                  ?.message
              }
            </p>
          </div>
        ) : (
          ""
        )}
        <button
          className="btn btn-info mt-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>

        <h6 className="pt-3 text-center">
          Don't have an account ?<NavLink to="/signup"> Signup</NavLink>
        </h6>
        <h6 className="pt-3 text-center">
         Don't confirm your account?<NavLink to="/reconfirm"> Reconfirm</NavLink>
        </h6>
      </form>
    </div>
  );
}
