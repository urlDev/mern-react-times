import DarkLoadingSrc from "../../assets/loadingLogo.svg";

import { LoadingContainer } from "./Loading.styles";

const Loading = ({ height, logoSrc, login }) => {
  return (
    <LoadingContainer height={height} login={login}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={logoSrc || DarkLoadingSrc} alt="loading logo" />
      </div>
    </LoadingContainer>
  );
};

export default Loading;
