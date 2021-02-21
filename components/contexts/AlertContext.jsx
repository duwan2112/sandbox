import React, {createContext, useReducer} from "react";

const AlertContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "confirmation":
      return {
        ...state,
        confirmation: state.confirmation.map((values) =>
          values.id === action.payload.id ? action.payload : values
        ),
      };

    case "active":
      return {
        ...state,
        active: action.payload,
      };

    case "activeLanding":
      return {
        ...state,
        activeLanding: action.payload,
      };
    case "set":
      return {
        ...action.data,
        open: true,
      };

    case "clear":
      return {
        open: false,
        msg: "",
        id: null,
        type: "",
      };

    case "close":
      return {
        ...state,
        open: false,
      };
    default:
      throw new Error();
  }
};

const AlertContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    msg: "",
    type: "",
    id: null,
    active: false,
    activeLanding: false,
    confirmation: [
      {id: 1, value: null},
      {id: 2, value: null},
      {id: 3, value: null},
      {id: 4, value: null},
      {id: 5, value: null},
      {id: 6, value: null},
    ],
  });

  /**
   *
   * @param {string} msg
   * @param {string} type - succsess || null
   * @param {number} time
   */

  const setToast = async (msg, type, time) => {
    dispatch({type: "clear"});

    const id = setTimeout(
      () => {
        clearToast();
      },
      time ? time : 4000
    );

    dispatch({type: "set", data: {msg, type, id}});
  };

  const clearToast = () => {
    if (state.id) {
      clearTimeout(state.id);
    }

    dispatch({type: "close"});
  };

  const active = (mode) => {
    dispatch({type: "active", payload: mode});
  };
  const activeLanding = (mode) => {
    dispatch({type: "activeLanding", payload: mode});
  };

  const confirmationActive = (value) => {
    dispatch({type: "confirmation", payload: value});
  };

  return (
    <AlertContext.Provider
      value={{
        state,
        confirmationActive,
        active,
        activeLanding,
        setToast,
        clearToast,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

const AlertContextConsumer = AlertContext.Consumer;

export {AlertContext, AlertContextProvider, AlertContextConsumer};
