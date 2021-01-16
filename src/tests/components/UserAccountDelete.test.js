import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { DELETE_MODAL_OPEN } from "redux/actions/user";

import UserAccountDelete from "components/user-account-delete/UserAccountDelete";

describe("Testing UserAccountDelete component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<UserAccountDelete store={store} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("h1").text()).toEqual("I want to delete my account!");
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should open the modal on button click", () => {
    wrapper.find("button").simulate("click");

    const actions = store.getActions();
    expect(actions).toEqual([{ type: DELETE_MODAL_OPEN }]);
  });
});
