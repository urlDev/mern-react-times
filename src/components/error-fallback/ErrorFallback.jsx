import { useSelector } from 'react-redux';

import { ErrorContainer } from './ErrorFallback.styles';

const ErrorFallback = () => {
  const { error } = useSelector((chart) => chart.chart);
  return (
    <ErrorContainer>
      <h1>Something went wrong.</h1>
      <p>{error['Error Message']}</p>
      <p>
        If it's limit reach, do come back some other time. Otherwise, please
        refresh!
      </p>
    </ErrorContainer>
  );
};

export default ErrorFallback;
