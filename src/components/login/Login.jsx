import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchLoginUser } from '../../redux/actions/user';

import { LoginContainer } from './Login.styles';

const Login = ({ register }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };
  // destructuring properties off of input
  const [{ email, password }, setInput] = React.useState(initialState);
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
    await dispatch(fetchLoginUser({ email, password }));
    setInput({ ...initialState });
    history.push('/');
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
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

      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
        Don't have an account?{' '}
        <Link to="/profile/register" style={{ color: 'lightgray' }}>
          Register
        </Link>
      </h1>
    </LoginContainer>
  );
};

export default Login;
