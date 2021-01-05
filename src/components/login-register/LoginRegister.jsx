import { Route, Switch } from "react-router-dom";
import { useSelector } from "../../utils/react-redux-hooks";

import BgSrc from "../../assets/bg.jpg";
import BgWebP from "../../assets/bgWebP.webp";
import WhiteLogoSrc from "../../assets/loadingWhite.svg";
import LogoWhiteSrc from "../../assets/logoWhite.png";

import Nav from "../nav/Nav";
import Loading from "../loading/Loading";
import UserDetails from "../user-details/UserDetails";
import UserFavorites from "../user-favorites/UserFavorites";
import Register from "../register/Register";
import Login from "../login/Login";

import { LoginRegisterContainer, Background } from "./LoginRegister.styles";

const LoginRegister = () => {
  const { loadingUser } = useSelector((user) => user.user);

  return (
    <div>
      <Switch>
        <Route exact path="/profile" component={UserDetails} />
        <Route exact path="/profile/favorites" component={UserFavorites} />
        <div>
          <Background>
            <source srcSet={BgWebP} type="image/webp" />
            <img
              src={BgSrc}
              type="image/jpg"
              alt="background for login/register pages"
            />
          </Background>

          {loadingUser ? (
            <Loading height="99vh" logoSrc={WhiteLogoSrc} login={true} />
          ) : (
            <>
              <Nav
                logo={LogoWhiteSrc}
                color="white"
                border="1px solid white"
                background="white"
                hoverColor="black"
              />
              <LoginRegisterContainer>
                <Route path="/profile/login" component={Login} />
                <Route path="/profile/register" component={Register} />
              </LoginRegisterContainer>
            </> //
          )}
        </div>
      </Switch>
    </div>
  );
};

export default LoginRegister;
