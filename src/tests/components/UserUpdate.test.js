import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { user } from "tests/fixtures/user";
import UserUpdate from "components/user-update/UserUpdate";
import { fetchUpdateUser, UPDATE_USER } from "redux/actions/user";

describe("Testing UserUpdate component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      user,
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<UserUpdate store={store} />);

    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    // Inputs are showing users details
    expect(wrapper.find("input").first().prop("value")).toEqual(user.name);
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should get the values on input value change", () => {
    const value = "Elon";

    wrapper
      .find("input")
      .first()
      // Should put targets name here because of how I use setState
      .simulate("change", { target: { value, name: "name" } });

    expect(wrapper.find("input").first().prop("value")).toEqual(value);
  });
  test("Should submit the form", async () => {
    const name = "Elon";
    const password = "abc1234";

    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: user,
      });
    });

    await store.dispatch(fetchUpdateUser({ name, password }));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: UPDATE_USER,
        payload: user,
      },
      {
        type: "@@router/CALL_HISTORY_METHOD",
        payload: { method: "push", args: ["/"] },
      },
    ]);
  });
});
