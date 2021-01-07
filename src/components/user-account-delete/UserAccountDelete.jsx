import { useDispatch } from "utils/react-redux-hooks";

import { deleteModalOpen } from "redux/actions/user";

import { DeleteAccount } from "./UserAccountDelete.styles";

const UserAccountDelete = () => {
  const dispatch = useDispatch();

  return (
    <DeleteAccount>
      <div>
        <h1>I want to delete my account!</h1>
        <button onClick={() => dispatch(deleteModalOpen())}>Delete</button>
      </div>
    </DeleteAccount>
  );
};

export default UserAccountDelete;
