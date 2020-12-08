import { useSelector } from 'react-redux';

const ErrorFallback = () => {
  const { error } = useSelector((chart) => chart.chart);
  return (
    <div>
      <h3>Something went wrong.</h3>
      <p>{error}</p>
      <p>Please refresh your page and try again.</p>
    </div>
  );
};

export default ErrorFallback;
