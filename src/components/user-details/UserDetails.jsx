import React from 'react';
import { useSelector } from 'react-redux';

import ErrorFallback from '../error-fallback/ErrorFallback';
import MarketComponents from '../market-components/MarketComponents';
import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import LogoDarkSrc from '../../assets/logo.svg';
import UserImage from '../user-image/UserImage';
import { StoryTopicContainer } from '../story-topic/StoryTopic.styles.js';
import {
  UserDetailContainer,
  ImageAndButton,
  UserDetailsForm,
} from './UserDetails.styles';

const UserDetails = () => {
  const [{ name, email, password }, setInput] = React.useState({});
  const { errorChart } = useSelector((chart) => chart.chart);
  const { user } = useSelector((user) => user.user);
  return (
    <>
      <Nav logo={LogoDarkSrc} borderBottom="1px solid lightgray" icon="1" />
      <StoryTopicHeaders />
      <div style={{ margin: '0 30px' }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: '25px' }}>Profile</h1>
        </StoryTopicContainer>

        <UserDetailContainer>
          <ImageAndButton>
            <UserImage width="100%" />
            <h2>
              *Should be smaller than <span>2MB</span>
            </h2>
            <button>Change avatar</button>
          </ImageAndButton>
          <UserDetailsForm>
            <form action="">
              <div>
                <label htmlFor="name">Name / Username</label>
                <input
                  type="text"
                  name="name"
                  value={name || user.name}
                  // onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email || user.email}
                  // onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  // onChange={handleChange}
                  required
                />
              </div>
              <button aria-label="save user details">Save</button>
            </form>
          </UserDetailsForm>
        </UserDetailContainer>
      </div>
      {errorChart ? <ErrorFallback /> : <MarketComponents />}
    </> //
  );
};

export default UserDetails;
