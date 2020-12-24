import { useDispatch, useSelector } from "react-redux";

import { openResponsiveMenu } from "../../redux/actions/news";

import HamburgerSrc from "../../assets/hamburger.svg";
import HamburgerCloseSrc from "../../assets/hamburgerClose.svg";

import { HamburgerMenu } from "./ResponsiveMenu.styles";

const ResponsiveMenu = () => {
  const { responsiveMenu } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  return (
    <HamburgerMenu
      src={responsiveMenu ? HamburgerCloseSrc : HamburgerSrc}
      alt="hamburger menu"
      onClick={() => dispatch(openResponsiveMenu())}
    />
  );
};

export default ResponsiveMenu;
