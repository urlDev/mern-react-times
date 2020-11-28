import React from 'react';
import { Link } from 'react-router-dom';

import { LoginContainer } from './Login.styles';

const Login = ({ register }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };
  // destructuring properties off of input
  const [{ name, email, password }, setInput] = React.useState(initialState);

  const handleChange = (e) => {
    // spread prevState and add new values with name, dynamically
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // set state back to initial
    setInput({ ...initialState });
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        {register && (
          <input
            type="text"
            name="name"
            aria-label="name"
            placeholder="Name"
            onChange={handleChange}
            value={name}
          />
        )}
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
          {register ? 'Register' : 'Login'}
        </button>
      </form>
      {register ? (
        <h1
          style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}
        >
          Do you have an account?{' '}
          <Link to="/profile/login" style={{ color: 'lightgray' }}>
            Login
          </Link>
        </h1>
      ) : (
        <h1
          style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}
        >
          Don't have an account?{' '}
          <Link to="/profile/register" style={{ color: 'lightgray' }}>
            Register
          </Link>
        </h1>
      )}
    </LoginContainer>
  );
};

export default Login;
