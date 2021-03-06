import convertNumber from "utils/convert-number";
import { useSelector } from "utils/react-redux-hooks";

import { DetailsTableContainer } from "./DetailsTable.styles";

const DetailsTable = () => {
  const { marketDetail, rating } = useSelector((state) => state.chart);

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

  return (
    <DetailsTableContainer>
      {marketDetail.symbol ? (
        <table>
          <tbody>
            <tr>
              <td>Symbol</td>
              <td>{symbol.split("^").join("")}</td>
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
              <td>$ {convertNumber(marketCap)}</td>
            </tr>
            <tr>
              <td>Year High</td>
              <td>$ {yearHigh}</td>
            </tr>
            <tr>
              <td>Year Low</td>
              <td>$ {yearLow}</td>
            </tr>
            <tr>
              <td>Volume</td>
              <td>{convertNumber(volume)}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
      {rating.length > 0 && (
        <table>
          <tbody>
            <tr>
              <td>Rating</td>
              <td>{rating[0].ratingRecommendation}</td>
            </tr>
            <tr>
              <td>DCF Recommendation</td>
              <td>{rating[0].ratingDetailsDCFRecommendation}</td>
            </tr>
            <tr>
              <td>DE Recommendation</td>
              <td>{rating[0].ratingDetailsDERecommendation}</td>
            </tr>
            <tr>
              <td>PB Recommendation</td>
              <td>{rating[0].ratingDetailsPBRecommendation}</td>
            </tr>
            <tr>
              <td>PE Recommendation</td>
              <td>{rating[0].ratingDetailsPERecommendation}</td>
            </tr>
            <tr>
              <td>ROA Recommendation</td>
              <td>{rating[0].ratingDetailsROARecommendation}</td>
            </tr>
            <tr>
              <td>ROE Recommendation</td>
              <td>{rating[0].ratingDetailsROERecommendation}</td>
            </tr>
          </tbody>
        </table>
      )}
    </DetailsTableContainer>
  );
};

export default DetailsTable;
