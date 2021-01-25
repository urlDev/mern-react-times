import { useDispatch, useSelector } from "utils/react-redux-hooks";

import {
  fetchLogoutUser,
  userModalOpen,
  userModalClose,
} from "redux/actions/user";

import { cleanFavoriteState } from "redux/actions/favorite";

import UserModal from "components/user-modal/UserModal";
import UserImage from "components/user-image/UserImage";

import { Button } from "components/nav/Nav.styles";
import { UserImageButton, UserImageContainer } from "./NavUserImage.styles.js";
import { closeSearchModal } from "redux/actions/chart.js";

const NavUserImage = () => {
  const { userModal } = useSelector((state) => state.user);
  const { width } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLogoutUser());
    dispatch(closeSearchModal());
    dispatch(cleanFavoriteState());
    localStorage.clear();
  };

  return (
    // In smaller screens (smaller than iPad),
    // logout button will be shown in user modal
    // For devices smaller than iPad Pro, I will use modal
    // with onClick instead of mouseEnter
    <>
      <UserImageContainer>
        {width > 768 ? (
          <Button type="button" onClick={handleClick}>
            Logout
          </Button>
        ) : null}
        {width < 1024 ? (
          <UserImageButton onClick={() => dispatch(userModalOpen())}>
            <UserImage border="29px" margin="10px" />
          </UserImageButton>
        ) : (
          <UserImageButton
            onMouseEnter={() => dispatch(userModalOpen())}
            onMouseLeave={() => dispatch(userModalClose())}
          >
            <UserImage border="29px" margin="10px" />
          </UserImageButton>
        )}
      </UserImageContainer>
      {userModal ? <UserModal /> : null}
    </> //
  );
};

export default NavUserImage;
