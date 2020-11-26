import axios from 'axios';

export const FETCH_POPULAR_SUCCESS = 'FETCH_POPULAR_SUCCESS';
export const FETCH_STORY_SUCCESS = 'FETCH_STORY_SUCCESS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';
export const CHANGE_HEADER = 'CHANGE_HEADER';

export const fetchPopularSuccess = (news) => ({
    type: FETCH_POPULAR_SUCCESS,
    payload: news,
});

export const fetchStorySuccess = (news) => ({
    type: FETCH_STORY_SUCCESS,
    payload: news,
});

export const changeHeader = (header) => ({
    type: CHANGE_HEADER,
    payload: header,
});

export const fetchNewsError = (error) => ({
    type: FETCH_NEWS_ERROR,
    payload: error,
});

export const fetchTopStories = (topStories) => async(dispatch) => {
    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/topstories/v2/${topStories}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`,
        );
        const data = await response.data;
        return dispatch(fetchStorySuccess(data));
    } catch (error) {
        return dispatch(fetchNewsError(error));
    }
};

export const fetchMostPopular = () => async(dispatch) => {
    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`,
        );
        const data = await response.data;
        return dispatch(fetchPopularSuccess(data));
    } catch (error) {
        return dispatch(fetchNewsError(error));
    }
};