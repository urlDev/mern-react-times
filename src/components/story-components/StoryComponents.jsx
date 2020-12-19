import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../error-fallback/ErrorFallback";
import TopStories from "../top-stories/TopStories";
import MostPopular from "../most-popular/MostPopular";

import { StoryComponentsContainer } from "./StoryComponents.styles";

const Home = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <StoryComponentsContainer>
        <TopStories />
        <MostPopular />
      </StoryComponentsContainer>
    </ErrorBoundary>
  );
};

export default Home;
