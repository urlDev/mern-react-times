import { useDispatch } from "react-redux";

import { deleteModalClose, fetchDeleteUser } from "../../redux/actions/user";
import {
  DeleteModalContainer,
  ModalContainerAllPage,
} from "./DeleteModal.styles";

const DeleteModal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchDeleteUser());
    dispatch(deleteModalClose());
  };

  return (
    <ModalContainerAllPage onClick={() => dispatch(deleteModalClose())}>
      <DeleteModalContainer>
        <div>
          <h1>Sure about this?</h1>
          <button onClick={() => dispatch(deleteModalClose())}>
            No, I changed my mind!
          </button>
          <button onClick={() => handleClick()}>Yes, Bye bye!</button>
        </div>
      </DeleteModalContainer>
    </ModalContainerAllPage>
  );
};

export default DeleteModal;
