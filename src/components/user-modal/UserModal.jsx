import { useDispatch, useSelector } from "utils/react-redux-hooks";

import {
  userModalOpen,
  userModalClose,
  fetchLogoutUser,
} from "redux/actions/user";
import { cleanFavoriteState } from "redux/actions/favorite";

import {
  UserModalAllPage,
  UserModalContainer,
  UserModalLogout,
  UserModalMenu,
} from "./UserModal.styles";
import { closeSearchModal } from "redux/actions/chart";

const UserModal = () => {
  const { width } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLogoutUser());
    dispatch(cleanFavoriteState());
    localStorage.clear();
  };

  return (
    // This might look repetitive
    // But I choose it over having to use all the synthetic events I'd have to use
    // in same component and using ternary inside each.
    <>
      {width < 1024 ? (
        <UserModalAllPage onClick={() => dispatch(userModalClose())}>
          <UserModalContainer>
            <UserModalMenu to="/profile">Profile Details</UserModalMenu>
            <UserModalMenu to="/profile/favorites">Favorites</UserModalMenu>
            {width < 768 ? (
              <UserModalLogout>
                <span onClick={handleClick}>Logout</span>
              </UserModalLogout>
            ) : null}
          </UserModalContainer>
        </UserModalAllPage>
      ) : (
        <UserModalContainer
          onMouseEnter={() => dispatch(userModalOpen())}
          onMouseLeave={() => dispatch(userModalClose())}
        >
          <UserModalMenu
            to="/profile"
            onClick={() => {
              dispatch(closeSearchModal());
              dispatch(userModalClose());
            }}
          >
            Profile Details
          </UserModalMenu>
          <UserModalMenu
            to="/profile/favorites"
            onClick={() => {
              dispatch(closeSearchModal());
              dispatch(userModalClose());
            }}
          >
            Favorites
          </UserModalMenu>
        </UserModalContainer>
      )}
    </> //
  );
};

export default UserModal;
