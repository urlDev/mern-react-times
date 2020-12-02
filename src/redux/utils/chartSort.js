const chartSort = (prevState, newState) => {
    let tempState = [...prevState, [...newState]];

    let sortedState = [...tempState];
    sortedState = sortedState
        .sort((a, b) => a[1] - b[1])
        .map((stock) => stock.slice(0, 1))
        .flat(1);

    return sortedState;
};

export default chartSort;