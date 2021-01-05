import { shallow } from "enzyme";

import Loading from "../../components/loading/Loading";

describe("Testing Loading component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  test("Should render the component successfully", () => {
    expect(wrapper).toHaveLength(1);
  });

  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
