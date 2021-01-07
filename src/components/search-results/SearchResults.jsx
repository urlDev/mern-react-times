import { useSelector, useDispatch } from "utils/react-redux-hooks";

import {
  fetchRating,
  fetchForex,
  clearSearchResults,
  closeSearchModal,
} from "redux/actions/chart";

import { StoryTopicContainer } from "components/story-topic/StoryTopic.styles.js";
import {
  UserFavoriteContainer,
  FavoriteCards,
} from "components/user-favorites/UserFavorites.styles";

const SearchResults = () => {
  const { searchResults } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <>
      <section
        style={{
          margin: "0 15px",
          position: "relative",
          minHeight: "calc(100vh - 153px - 87px)",
        }}
      >
        <StoryTopicContainer>
          <h1 style={{ marginTop: "25px" }}>Search Results</h1>
        </StoryTopicContainer>
        <UserFavoriteContainer>
          {searchResults.length ? (
            searchResults.map((stock) => {
              return (
                <div
                  style={{
                    display: "flex",
                    border: "1px solid black",
                    padding: "10px 15px",
                  }}
                  key={stock.symbol}
                >
                  <FavoriteCards
                    to={`/details/${stock.symbol.toLowerCase()}`}
                    onClick={() => {
                      dispatch(fetchForex(stock.symbol));
                      dispatch(fetchRating(stock.symbol));
                      dispatch(clearSearchResults());
                      dispatch(closeSearchModal());
                    }}
                  >
                    <h1>{stock.symbol.split("^").join("")}</h1>

                    <h1
                      style={{
                        fontWeight: "normal",
                        fontSize: "var(--size-sub-menu)",
                      }}
                    >
                      {stock.exchangeShortName}
                    </h1>
                  </FavoriteCards>
                </div>
              );
            })
          ) : (
            <h1>No results found</h1>
          )}
        </UserFavoriteContainer>
      </section>
    </> //
  );
};

export default SearchResults;
