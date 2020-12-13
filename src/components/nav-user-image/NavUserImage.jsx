import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchLogoutUser,
  userModalOpen,
  userModalClose,
} from '../../redux/actions/user';

import UserModal from '../user-modal/UserModal';
import UserImage from '../user-image/UserImage';
import { UserImageContainer } from './NavUserImage.styles.js';

const NavUserImage = () => {
  const { userModal } = useSelector((user) => user.user);
  const dispatch = useDispatch();
  return (
    // I am using srcSet and picture here because once user uploads new avatar,
    // it will be both in webp and png so I can show it in browsers that doesn't
    // support webp.
    <div style={{ position: 'relative' }}>
      <UserImageContainer>
        <button onClick={() => dispatch(fetchLogoutUser())}>Logout</button>
        <Link
          to="/profile"
          onMouseEnter={() => dispatch(userModalOpen())}
          onMouseLeave={() => dispatch(userModalClose())}
        >
          <UserImage border="29px" margin="10px" />
        </Link>
      </UserImageContainer>
      {userModal ? <UserModal /> : null}
    </div>
  );
};

export default NavUserImage;
