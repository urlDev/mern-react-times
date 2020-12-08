import { LoadingContainer } from './Loading.styles';

import LoadingLogoSrc from '../../assets/loadingLogo.svg';

const Loading = ({ height }) => {
  return (
    <LoadingContainer height={height}>
      <img src={LoadingLogoSrc} alt="dark version of logo for loading" />
    </LoadingContainer>
  );
};

export default Loading;
