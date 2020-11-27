import BgSrc from '../../assets/bg.jpg';
import Nav from '../nav/Nav';

import LogoWhiteSrc from '../../assets/logoWhite.svg';

import { LoginRegisterContainer, Background } from './LoginRegister.styles';

const LoginRegister = () => {
  return (
    <LoginRegisterContainer>
      <Background src={BgSrc} alt="" />
      <Nav logo={LogoWhiteSrc} icon={false} color={true} />
    </LoginRegisterContainer>
  );
};

export default LoginRegister;
