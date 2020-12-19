import { ErrorContainer } from "./ErrorFallback.styles";

const ErrorFallback = ({ height, error }) => {
  return (
    <ErrorContainer height={height}>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <p>
        If it's limit reach, do come back some other time. Otherwise, please
        refresh!
      </p>
    </ErrorContainer>
  );
};

export default ErrorFallback;
