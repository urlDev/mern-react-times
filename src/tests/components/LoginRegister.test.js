import { shallow } from "enzyme";

import * as ReactReduxHooks from "../../utils/react-redux-hooks";
import { mockStore } from "../store";

import LoginRegister from "../../components/login-register/LoginRegister";

describe("Testing LoginRegister component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());
  });

  describe("Testing components with no extra state", () => {
    beforeEach(() => {
      store = mockStore({});
      wrapper = shallow(<LoginRegister store={store} />);
    });

    test("Should render the component successfully", () => {
      expect(wrapper).toHaveLength(1);
    });

    test("Should match the snapshot without loading component and state", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Testing the component with a given state to see the change", () => {
    beforeEach(() => {
      store = mockStore({
        loadingUser: true,
      });

      wrapper = shallow(<LoginRegister store={store} />);
    });

    test("Should have a state of loading user", () => {
      const state = store.getState();

      expect(state).toEqual({ loadingUser: true });
    });

    test("Should render the component with loading component", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
