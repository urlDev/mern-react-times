import React from "react";
import { useDispatch } from "react-redux";

import { fetchUploadAvatar } from "../../redux/actions/user";

import UserImage from "../user-image/UserImage";

import { ImageAndButton } from "./UserAvatar.styles";

const UserAvatar = () => {
  const [input, setInput] = React.useState({});
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const data = new FormData();

    // Naming it avatar because API expects that name
    data.append("avatar", e.target.files[0]);
    dispatch(fetchUploadAvatar(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <ImageAndButton>
      <UserImage width="100%" />{" "}
      <form>
        <label htmlFor="single">Change Avatar*</label>
        <input type="file" id="single" onClick={handleChange} />
      </form>
      <h2>
        *Should be smaller than <span>2MB</span>
      </h2>
    </ImageAndButton>
  );
};

export default UserAvatar;
