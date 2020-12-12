import { useSelector } from 'react-redux';

import { UserPicture } from './UserImage.styles';

const UserImage = ({ width, border, margin }) => {
  const { user } = useSelector((user) => user.user);
  return (
    <UserPicture width={width} border={border} margin={margin}>
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
          <img src={`data:image/png;base64,${user.avatar.png}`} alt="avatar" />
        </> //
      )}
    </UserPicture>
  );
};

export default UserImage;
