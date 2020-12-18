import { Route, Switch } from "react-router-dom";

import BgSrc from "../../assets/bg.jpg";
import Nav from "../nav/Nav";

import UserDetails from "../user-details/UserDetails";
import UserFavorites from "../user-favorites/UserFavorites";
import Register from "../register/Register";
import Login from "../login/Login";
import LogoWhiteSrc from "../../assets/logoWhite.svg";
import { LoginRegisterContainer, Background } from "./LoginRegister.styles";

const LoginRegister = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/profile" component={UserDetails} />
        <Route exact path="/profile/favorites" component={UserFavorites} />
        <div>
          <Background src={BgSrc} alt="" />
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
        </div>
      </Switch>
    </div>
  );
};

export default LoginRegister;
