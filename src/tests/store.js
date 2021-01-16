import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import createMockStore from "redux-mock-store";

const middlewares = [thunk];

export const mockStore = configureMockStore(middlewares);

export let store = mockStore({});

export const resetStore = () => (store = createMockStore(""));
