import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { user, userInputLogin } from "tests/fixtures/user";
import { fetchUploadAvatar, UPLOAD_AVATAR } from "redux/actions/user";

import UserAvatar from "components/user-avatar/UserAvatar";

describe("Testing UserAvatar component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<UserAvatar store={store} />);

    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("label").text()).toEqual("Change Avatar*");
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should dispatch the upload avatar action on change", async () => {
    // target here has an input on file upload so I'm simulating that
    wrapper
      .find("input")
      .simulate("change", { target: { files: userInputLogin } });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: user,
      });
    });

    await store.dispatch(fetchUploadAvatar(userInputLogin));

    const actions = store.getActions();
    // fetchUploadAvatar action takes input and returns user with avatar
    expect(actions).toEqual([
      {
        type: UPLOAD_AVATAR,
        payload: user,
      },
    ]);
  });
});
