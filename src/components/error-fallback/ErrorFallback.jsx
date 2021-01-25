import { useSelector } from "utils/react-redux-hooks";

import { ErrorContainer } from "./ErrorFallback.styles";

const ErrorFallback = ({ height, error }) => {
  const { errorChart } = useSelector((state) => state.chart);
  return (
    <ErrorContainer height={height}>
      <h1>Something went wrong.</h1>
      <p>{error ? error.message : null || errorChart["Error Message"]}</p>
      <p>
        If it's limit reach, do come back some other time. Otherwise, please
        refresh!
      </p>
    </ErrorContainer>
  );
};

export default ErrorFallback;
