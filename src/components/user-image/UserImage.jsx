import { useSelector } from "utils/react-redux-hooks";

import { UserPicture } from "./UserImage.styles";

const UserImage = ({ width, border, margin }) => {
  const { user } = useSelector((user) => user.user);
  return (
    // I am using srcSet and picture here because once user uploads new avatar,
    // it will be both in webp and png so I can show it in browsers that doesn't
    // support webp.
    <>
      {user.name ? (
        <UserPicture width={width} border={border} margin={margin}>
          {user.avatar.webp ? (
            <source
              srcSet={`data:image/webp;base64,${user.avatar.webp}`}
              type="image/webp"
            />
          ) : null}
          {user.avatar.png ? (
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
          ) : null}
        </UserPicture>
      ) : null}
    </> //
  );
};

export default UserImage;
