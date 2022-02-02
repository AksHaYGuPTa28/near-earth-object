import React, { useContext, useReducer, createContext, useMemo } from "react";
import reducer from "./reducer";
import { setStartDate, setEndDate } from "./actions";

export const initialState = {
  startDate: "2022-02-01",
  endDate: "2022-02-06",
};

const Context = createContext({
  state: initialState,
  dispatch: (_) => {},
});

export const Provider = (props) => {
  const [state, dispatch] = useReducer(
    reducer,
    props.initialState || initialState
  );
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export function useGlobalState() {
  const { state, dispatch } = useContext(Context);
  const actions = useMemo(() => {
    return {
      setStartDate: setStartDate(dispatch),
      setEndDate: setEndDate(dispatch),
    };
  }, [dispatch]);
  const globalState = useMemo(() => {
    return {
      state,
      ...actions,
    };
  }, [state, actions]);

  return globalState;
}
