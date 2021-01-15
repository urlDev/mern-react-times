import React, { useRef } from "react";
import { shallow } from "enzyme";
import * as d3 from "d3";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import Chart from "components/chart/Chart";
import { chartData, homeChartData } from "tests/fixtures/chart";
import drawChart from "utils/draw-chart";
import { width } from "tests/fixtures/news";

describe("Testing Chart component", () => {
  let wrapper;
  let store;
  let mRef;

  beforeEach(() => {
    store = mockStore({
      chartData,
    });

    const props = {
      d3,
      reDraw: true,
    };

    // jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    // jest.mock("react", () => {
    //   const originReact = jest.requireActual("react");
    //   const mUseRef = jest.fn();
    //   return {
    //     ...originReact,
    //     useRef: mUseRef,
    //   };
    // });

    // mRef = { current: {} };

    wrapper = shallow(<Chart store={store} {...props} />);
    // wrapper.update();
  });

  test("Should render the component", () => {
    // drawChart({
    //   reDraw: true,
    //   chartData,
    //   svg: d3.select(useRef.current),
    //   d3,
    //   width,
    // });
    // useRef.mockReturnValue(mRef);
    // expect(wrapper).toHaveLength(1);
    // console.log(wrapper.debug());
    // const html = wrapper.find("svg").html();
    // console.log(html);
  });
});
