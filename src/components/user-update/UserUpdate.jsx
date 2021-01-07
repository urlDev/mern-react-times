import React from "react";
import { useDispatch, useSelector } from "utils/react-redux-hooks";

import { fetchUpdateUser } from "redux/actions/user";

import { UserDetailsForm } from "./UserUpdate.styles";

const UserUpdate = () => {
  const [{ name, email, password }, setInput] = React.useState({});
  const { user } = useSelector((user) => user.user);

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchUpdateUser({ name, email, password }));
  };

  return (
    <UserDetailsForm>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name / Username</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button aria-label="save user details" type="submit">
            Update
          </button>
        </div>
      </form>
    </UserDetailsForm>
  );
};

export default UserUpdate;
