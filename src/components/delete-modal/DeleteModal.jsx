import React from "react";
import { useDispatch } from "utils/react-redux-hooks";

import { deleteModalClose, fetchDeleteUser } from "redux/actions/user";
import {
  DeleteButtonContainer,
  DeleteModalContainer,
  DeleteTextAndButtons,
  ModalContainerAllPage,
} from "./DeleteModal.styles";

const DeleteModal = () => {
  const [scroll, setScroll] = React.useState(window.scrollY);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchDeleteUser());
    dispatch(deleteModalClose());
  };

  const updateScroll = () => {
    setScroll(window.scrollY);
  };

  // When user views the delete modal in small screens,
  // there was a bug related to where the user views it.
  // Because the top value was 0, it always put the modal to top.
  // And even though bottom was 0 too, modal opened regarding to viewport height.
  // So, by adding scroll, I could make the modal open where the user is.
  // This is the js solution.
  // In CSS, I can make it happen with only position:fixed
  // and voila!
  React.useEffect(() => {
    document.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => {
      document.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <ModalContainerAllPage onClick={() => dispatch(deleteModalClose())}>
      <DeleteModalContainer>
        <DeleteTextAndButtons>
          <h1>Sure about this?</h1>
          <DeleteButtonContainer>
            <button onClick={() => dispatch(deleteModalClose())}>Cancel</button>
            <button onClick={() => handleClick()}>Delete</button>
          </DeleteButtonContainer>
        </DeleteTextAndButtons>
      </DeleteModalContainer>
    </ModalContainerAllPage>
  );
};

export default DeleteModal;
