import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchRegisterUser } from '../../redux/actions/user';

import { LoginContainer } from '../login/Login.styles';

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };
  // destructuring properties off of input
  const [{ name, email, password }, setInput] = React.useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    // spread prevState and add new values with name, dynamically
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(fetchRegisterUser({ name, email, password }));
    // set state back to initial
    setInput({ ...initialState });
    history.push('/');
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
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
        Do you have an account?{' '}
        <Link to="/profile/login" style={{ color: 'lightgray' }}>
          Login
        </Link>
      </h1>
    </LoginContainer>
  );
};

export default Register;
