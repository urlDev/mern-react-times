import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "utils/react-redux-hooks";

import { fetchRegisterUser } from "redux/actions/user";

import { LoginContainer } from "components/login/Login.styles";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [{ name, email, password }, setInput] = React.useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchRegisterUser({ name, email, password }));
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          aria-label="name"
          placeholder="Name"
          onChange={handleChange}
          value={name}
        />

        <input
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          aria-label="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
        <button aria-label="login" type="submit">
          Register
        </button>
      </form>
      <h1 style={{ textAlign: "center", color: "white", marginBottom: "40px" }}>
        Do you have an account?{" "}
        <Link to="/profile/login" style={{ color: "lightgray" }}>
          Login
        </Link>
      </h1>
    </LoginContainer>
  );
};

export default Register;
