import React from 'react';
import { Link } from 'react-router-dom';

import { LoginContainer } from './Login.styles';

const Login = ({ register }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setName('');
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}
        <input
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          aria-label="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
