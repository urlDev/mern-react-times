import { useDispatch, useSelector } from "react-redux";

import {
  userModalOpen,
  userModalClose,
  fetchLogoutUser,
} from "../../redux/actions/user";
import { cleanFavoriteState } from "../../redux/actions/favorite";

import { UserModalContainer, UserModalMenu } from "./UserModal.styles";

const UserModal = () => {
  const { width } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLogoutUser());
    dispatch(cleanFavoriteState());
    localStorage.clear();
  };

  return (
    <UserModalContainer
    // onMouseEnter={() => dispatch(userModalOpen())}
    // onMouseLeave={() => dispatch(userModalClose())}
    >
      <UserModalMenu to="/profile">Profile Details</UserModalMenu>
      <UserModalMenu to="/profile/favorites">Favorites</UserModalMenu>
      {width < 768 ? (
        <UserModalMenu onClick={handleClick}>Logout</UserModalMenu>
      ) : null}
    </UserModalContainer>
  );
};

export default UserModal;
