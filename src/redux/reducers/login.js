import actionTypes from "../actions/types";

const { LOGIN, ERROR, LOADING } = actionTypes;

const initialState = {
  member: {},
  status: "",
  message: "",
  loading: false,
  isLoggedIn: false,
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        member: {},
        status: "",
        message: "",
        loading: true,
        isLoggedIn: false,
      }
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isLoggedIn: true,
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        member: {},
        ...action.payload,
        isLoggedIn: false,
      }

    default:
      return {
        ...state,
        member: {},
        status: "",
        message: "",
        loading: false,
        isLoggedIn: false,
      }
  }
};
