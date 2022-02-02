import { SET_START_DATE, SET_END_DATE } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload.startDate,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
};

export default reducer;
