const chartSort = (prevState, newState) => {
    const tempState = [...prevState, [...newState]];

    let sortedState = [...tempState];

    sortedState = sortedState
        .sort((a, b) => a[1] - b[1])
        .map((stock) => stock.slice(0, 1));

    return sortedState;
};

export default chartSort;