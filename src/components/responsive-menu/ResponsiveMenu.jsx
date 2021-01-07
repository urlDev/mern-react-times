import { useDispatch, useSelector } from "utils/react-redux-hooks";

import { openResponsiveMenu } from "redux/actions/news";

import HamburgerSrc from "assets/hamburger.svg";
import HamburgerCloseSrc from "assets/hamburgerClose.svg";

import { HamburgerMenu } from "./ResponsiveMenu.styles";

const ResponsiveMenu = ({ icon }) => {
  const { responsiveMenu } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  return (
    <HamburgerMenu
      icon={icon}
      alt="hamburger menu"
      onClick={() => dispatch(openResponsiveMenu())}
    >
      <img
        src={responsiveMenu ? HamburgerCloseSrc : HamburgerSrc}
        alt="hamburger icon"
      />
    </HamburgerMenu>
  );
};

export default ResponsiveMenu;
