import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Loading from "components/loading/Loading";
import { LoadingContainer } from "components/loading/Loading.styles";

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
  test("Should apply styles according to default props", () => {
    wrapper = renderer.create(<LoadingContainer />).toJSON();
    expect(wrapper).toHaveStyleRule("height", "85px");
  });
  test("Should apply styles according to height prop", () => {
    wrapper = renderer.create(<LoadingContainer height="420px" />).toJSON();
    expect(wrapper).toHaveStyleRule("height", "420px");
  });
  test("Should apply styles according to login prop", () => {
    wrapper = renderer.create(<LoadingContainer login />).toJSON();
    expect(wrapper).toHaveStyleRule("background", "#0000008e");
  });
});
