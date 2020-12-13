import { useDispatch } from 'react-redux';

import { userModalOpen, userModalClose } from '../../redux/actions/user';

import { UserModalContainer, UserModalMenu } from './UserModal.styles';

const UserModal = () => {
  const dispatch = useDispatch();
  return (
    <UserModalContainer
      onMouseEnter={() => dispatch(userModalOpen())}
      onMouseLeave={() => dispatch(userModalClose())}
    >
      <UserModalMenu to="/profile">Profile Details</UserModalMenu>
      <UserModalMenu to="/profile/favorites">Favorites</UserModalMenu>
    </UserModalContainer>
  );
};

export default UserModal;
