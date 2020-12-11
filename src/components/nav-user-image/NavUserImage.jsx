import { useSelector, useDispatch } from 'react-redux';

import { fetchLogoutUser } from '../../redux/actions/user';

import { UserImage, UserImageContainer } from './NavUserImage.styles.js';

const NavUserImage = () => {
  const { user } = useSelector((user) => user.user);
  const dispatch = useDispatch();
  return (
    // I am using srcSet and picture here because once user uploads new avatar,
    // it will be both in webp and png so I can show it in browsers that doesn't
    // support webp.

    <UserImageContainer>
      <button onClick={() => dispatch(fetchLogoutUser())}>Logout</button>
      <UserImage>
        {user.avatar.webp && (
          <source
            srcSet={`data:image/webp;base64,${user.avatar.webp}`}
            type="image/webp"
          />
        )}
        {user.avatar.png && (
          <>
            <source
              srcSet={`data:image/png;base64,${user.avatar.png}`}
              type="image/png"
            />
            <img
              src={`data:image/png;base64,${user.avatar.png}`}
              alt="avatar"
            />
          </> //
        )}
      </UserImage>
    </UserImageContainer>
  );
};

export default NavUserImage;
