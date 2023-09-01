import { createContext, useReducer } from "react";
import Chat from "../components/Chat";

export default function PeerContext() {
  return (
    <Provider>
      <Chat />
    </Provider>
  );
}

const Provider = ({ children }) => {
  const initialState = {
    peer: null,
  };

  const actions = {
    SET_PEER: "SET_PEER",
    RESET: "RESET",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actions.SET_PEER:
        return { ...state, peer: action.value };
      case actions.RESET:
        return { ...state, ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const Context = createContext();

  const value = {
    peer: state.peer,
    setPeer: (value) => {
      dispatch({ type: actions.SET_PEER, value });
    },
    reset: () => {
      dispatch({ type: actions.RESET });
    },
  };

  console.log("value", value);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
