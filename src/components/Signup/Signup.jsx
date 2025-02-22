import axios from "axios";
import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import regStyle from "./Signup.module.css";
import joi from "joi";
import { generalFeilds } from "../../utils/general.js";

export default function Signup() {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // Send data to API
  const sendSignupDataToApi = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "https://edgprotask.vercel.app/auth/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        data.message ===
        "User added successfully. Please check your email for activation."
      ) {
        alert("Signup successful! Check your email.");
        setError("");
        setIsLoading(false);
        navigate("/login");
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
      sendSignupDataToApi();
    }
  };

  // Form Validation
  function validateRegisterForm() {
    const schema = joi.object({
      firstName: generalFeilds.firstName.required(),
      lastName: generalFeilds.lastName.required(),
      email: generalFeilds.email.required(),
      password: generalFeilds.password.required(),
      cPassword: generalFeilds.cPassword.valid(joi.ref("password")).required(),
      phone: generalFeilds.phone.required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div className="py-5">
      {/* API Error */}
      {error && (
        <div className={`alert alert-danger my-2 ${regStyle.errordiv}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2 className="my-2">SignUp Form</h2>

        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control my-input my-2"
          name="firstName"
          id="firstName"
          value={user.firstName}
          required
        />
        {errorList?.filter((err) => err.context.label == "firstName")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "firstName")[0]
                  ?.message
              }
            </p>
          </div>
        ) : (
          ""
        )}
        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control my-input my-2"
          name="lastName"
          id="lastName"
          value={user.lastName}
          required
        />
        {errorList?.filter((err) => err.context.label == "lastName")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "lastName")[0]
                  ?.message
              }
            </p>
          </div>
        ) : (
          ""
        )}
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
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
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
        <label htmlFor="phone">Phone:</label>
        <input
          onChange={handleChange}
          type="number"
          className="form-control my-input my-2"
          name="phone"
          id="phone"
          value={user.phone}
          required
        />
        {errorList?.filter((err) => err.context.label == "phone")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "phone")[0]
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
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
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
        <label htmlFor="cPassword">Confirm Password:</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control my-input my-2"
          name="cPassword"
          id="cPassword"
          value={user.cPassword}
          required
        />
        {errorList?.filter((err) => err.context.label == "cPassword")[0]
          ?.message ? (
          <div className={`alert alert-info my-2 ${regStyle.errordiv}`}>
            <p>
              {
                errorList?.filter((err) => err.context.label == "cPassword")[0]
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
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "SignUp"}
        </button>

        <h6 className="pt-3 text-center">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </h6>
      </form>
    </div>
  );
}
