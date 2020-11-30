import { useSelector } from 'react-redux';

import { DetailsTableContainer } from './DetailsTable.styles';

const DetailsTable = () => {
  const { marketDetail } = useSelector((chart) => chart.chart);

  const {
    symbol,
    price,
    marketCap,
    yearHigh,
    yearLow,
    volume,
    changesPercentage,
    priceAvg50,
    priceAvg200,
  } = marketDetail;

  const test = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue));
  };

  return (
    <DetailsTableContainer>
      <table>
        <tbody>
          <tr>
            <td>Symbol</td>
            <td>{symbol}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>$ {price}</td>
          </tr>
          <tr>
            <td>Percentage Change</td>
            <td>%{changesPercentage}</td>
          </tr>
          <tr>
            <td>Price Average 50</td>
            <td>$ {priceAvg50.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Price Average 200</td>
            <td>$ {priceAvg200.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{test(marketCap)}</td>
          </tr>
          <tr>
            <td>Year High</td>
            <td>{yearHigh}</td>
          </tr>
          <tr>
            <td>Year Low</td>
            <td>{yearLow}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{test(volume)}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Symbol</td>
            <td>{symbol}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>$ {price}</td>
          </tr>
          <tr>
            <td>Percentage Change</td>
            <td>%{changesPercentage}</td>
          </tr>
          <tr>
            <td>Price Average 50</td>
            <td>$ {priceAvg50.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Price Average 200</td>
            <td>$ {priceAvg200.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{test(marketCap)}</td>
          </tr>
          <tr>
            <td>Year High</td>
            <td>{yearHigh}</td>
          </tr>
          <tr>
            <td>Year Low</td>
            <td>{yearLow}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{test(volume)}</td>
          </tr>
        </tbody>
      </table>
    </DetailsTableContainer>
  );
};

export default DetailsTable;
