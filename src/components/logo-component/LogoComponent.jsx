import { useDispatch } from "utils/react-redux-hooks";

import { changeHeader } from "redux/actions/news";
import { closeSearchModal } from "redux/actions/chart";

import { Logo } from "./LogoComponent.styles";

const LogoComponent = ({ logo }) => {
  const dispatch = useDispatch();

  return (
    <Logo to="/home">
      <img
        style={{ height: "16px" }}
        src={logo}
        alt="react times logo"
        onClick={() => {
          dispatch(closeSearchModal());
          dispatch(changeHeader("home"));
        }}
      />
    </Logo>
  );
};

export default LogoComponent;
