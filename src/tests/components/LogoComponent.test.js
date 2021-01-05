import { shallow } from "enzyme";

import * as ReactReduxHooks from "../../utils/react-redux-hooks";
import { mockStore } from "../store";
import { CHANGE_HEADER } from "../../redux/actions/news";

import LogoComponent from "../../components/logo-component/LogoComponent";

describe("Testing LogoComponent", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<LogoComponent store={store} />);
  });

  test("Should render the component successfully", () => {
    expect(wrapper).toHaveLength(1);
  });

  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should dispatch changeHeader action on click", () => {
    wrapper.find("img").simulate("click");
    const actions = store.getActions();

    expect(actions).toEqual([{ type: CHANGE_HEADER, payload: "home" }]);
  });
});
