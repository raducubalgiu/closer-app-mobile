import { useReducer } from "react";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, open: true, add: true };
    case "VIEW":
      return { ...state, open: true, view: true };
    case "EDIT":
      return { ...state, open: true, edit: true };
    case "CLOSE_MODAL":
      return {
        open: false,
        add: false,
        view: false,
        edit: false,
      };
    default:
      return state;
  }
};

export const useModal = () => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    add: false,
    view: false,
    edit: false,
  });

  return {
    state,
    dispatch,
  };
};
