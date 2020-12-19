import DarkLoadingSrc from "../../assets/loadingLogo.svg";

import { LoadingContainer } from "./Loading.styles";

const Loading = ({ height, logoSrc, show }) => {
  return (
    <LoadingContainer height={height}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={logoSrc || DarkLoadingSrc} alt="loading logo" />
        {show ? <h1>Almost there.</h1> : null}
      </div>
    </LoadingContainer>
  );
};

export default Loading;
