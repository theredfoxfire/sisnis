let initialState = {
  activeItem: "home",
};

let stateContainer = {state: initialState};

export const storeSetContainer = (setter) => {
  stateContainer = setter;
};

export const getAllState = () => stateContainer.state;

export const storageActions = {
  setActiveItem: async (activeItem) => {
    await stateContainer.setState({activeItem: activeItem});
  },
};
