import { useDispatch } from 'react-redux';

import { deleteModalClose } from '../../redux/actions/user';
import {
  DeleteModalContainer,
  ModalContainerAllPage,
} from './DeleteModal.styles';

const DeleteModal = () => {
  const dispatch = useDispatch();
  return (
    <ModalContainerAllPage onClick={() => dispatch(deleteModalClose())}>
      <DeleteModalContainer>
        <div>
          <h1>Sure about this?</h1>
          <button onClick={() => dispatch(deleteModalClose())}>
            No, I changed my mind!
          </button>
          <button onClick={() => dispatch(deleteModalClose())}>
            Yes, Bye bye!
          </button>
        </div>
      </DeleteModalContainer>
    </ModalContainerAllPage>
  );
};

export default DeleteModal;
