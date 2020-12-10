import { useSelector } from 'react-redux';

import { ErrorContainer } from './ErrorFallback.styles';

const ErrorFallback = ({ height }) => {
  const { errorChart } = useSelector((chart) => chart.chart);
  const { errorNews } = useSelector((news) => news.news);
  return (
    <ErrorContainer height={height}>
      <h1>Something went wrong.</h1>
      <p>
        If it's limit reach, do come back some other time. Otherwise, please
        refresh!
      </p>
    </ErrorContainer>
  );
};

export default ErrorFallback;
