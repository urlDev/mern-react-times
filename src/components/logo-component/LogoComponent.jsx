import { useDispatch } from "react-redux";

import { changeHeader } from "../../redux/actions/news";

import { Logo } from "./LogoComponent.styles";

const LogoComponent = ({ logo }) => {
  const dispatch = useDispatch();

  return (
    <Logo to="/home">
      <img
        style={{ height: "16px" }}
        src={logo}
        alt="react times logo"
        onClick={() => dispatch(changeHeader("home"))}
      />
    </Logo>
  );
};

export default LogoComponent;
