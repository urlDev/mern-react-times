import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLogoutUser } from '../../redux/actions/user';

import UserImage from '../user-image/UserImage';
import { UserImageContainer } from './NavUserImage.styles.js';

const NavUserImage = () => {
  const dispatch = useDispatch();
  return (
    // I am using srcSet and picture here because once user uploads new avatar,
    // it will be both in webp and png so I can show it in browsers that doesn't
    // support webp.

    <UserImageContainer>
      <button onClick={() => dispatch(fetchLogoutUser())}>Logout</button>
      <Link to="/profile">
        <UserImage border="29px" margin="10px" />
      </Link>
    </UserImageContainer>
  );
};

export default NavUserImage;
