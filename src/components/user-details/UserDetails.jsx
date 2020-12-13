import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteModalOpen, fetchUpdateUser } from '../../redux/actions/user';

import ErrorFallback from '../error-fallback/ErrorFallback';
import MarketComponents from '../market-components/MarketComponents';
import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import UserImage from '../user-image/UserImage';
import DeleteModal from '../delete-modal/DeleteModal';
import LogoDarkSrc from '../../assets/logo.svg';

import { StoryTopicContainer } from '../story-topic/StoryTopic.styles.js';
import {
  UserDetailContainer,
  ImageAndButton,
  UserDetailsForm,
  DeleteAccount,
} from './UserDetails.styles';

const UserDetails = () => {
  const [input, setInput] = React.useState({});
  const { errorChart } = useSelector((chart) => chart.chart);
  const { user, deleteModal } = useSelector((user) => user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) =>
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchUpdateUser(input));
    // history.push('/');
  };

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
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name / Username</label>
                <input
                  type="text"
                  name="name"
                  value={input.name || user.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={input.email || user.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button aria-label="save user details" type="submit">
                  Update
                </button>
              </div>
            </form>
          </UserDetailsForm>
          <DeleteAccount>
            <h1 style={{ marginBottom: '20px' }}>
              I hereby announce that I did not enjoy the time I have spent in
              this website, therefore...
            </h1>

            <div>
              <h1>I want to delete my account!</h1>
              <button onClick={() => dispatch(deleteModalOpen())}>
                Delete
              </button>
            </div>
          </DeleteAccount>
        </UserDetailContainer>
        {deleteModal ? <DeleteModal /> : null}
      </div>
      {errorChart ? <ErrorFallback /> : <MarketComponents />}
    </> //
  );
};

export default UserDetails;
