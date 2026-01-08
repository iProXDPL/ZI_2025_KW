import { useReducer } from "react";

type ModalState = "none" | "login" | "register";

interface AppState {
  isSidebarCollapsed: boolean;
  activeMenuItem: string;
  activeModal: ModalState;
}

type AppAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_MENU_ITEM"; payload: string }
  | { type: "OPEN_LOGIN" }
  | { type: "OPEN_REGISTER" }
  | { type: "CLOSE_MODAL" };

const initialState: AppState = {
  isSidebarCollapsed: false,
  activeMenuItem: "Sale",
  activeModal: "none",
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarCollapsed: !state.isSidebarCollapsed };
    case "SET_MENU_ITEM":
      return { ...state, activeMenuItem: action.payload };
    case "OPEN_LOGIN":
      return { ...state, activeModal: "login" };
    case "OPEN_REGISTER":
      return { ...state, activeModal: "register" };
    case "CLOSE_MODAL":
      return { ...state, activeModal: "none" };
    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return {
    state,
    toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    setMenuItem: (item: string) => dispatch({ type: "SET_MENU_ITEM", payload: item }),
    openLogin: () => dispatch({ type: "OPEN_LOGIN" }),
    openRegister: () => dispatch({ type: "OPEN_REGISTER" }),
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
  };
}
