const initialState = {
  userName: localStorage.getItem("userName") || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userName: action.payload,
      };
    case "CLEAR_USER":
      return {
        ...state,
        userName: null,
      };
    default:
      return state;
  }
};

export default userReducer;
