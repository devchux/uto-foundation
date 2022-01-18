import actionTypes from "../actions/types";

const {
  ERROR,
  LOADING,
  ADD_SINGLE,
  FETCH_BULK,
  FETCH_SINGLE,
  DELETE_SINGLE,
  DELETE_BULK,
  UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  books: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  book: {},
  loading: false,
  deleted: false,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        books: {
          ...state.books,
          data: [{ ...action.payload.book }, ...state.books.data],
        },
      };
    case FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        book: action.payload.book,
        deleted: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        books: {
          ...state.books,
          total: state.books.total - 1,
          data: state.books.data.filter(
            (post) => action.payload.id !== post.id
          ),
        },
        book: action.payload.id === state.book.id ? {} : state.book,
      };
    case DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        books: {
          ...state.books,
          total: state.books.total - action.payload.ids.length,
          data: state.books.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        book: action.payload.ids.includes(state.book.id) ? {} : state.book,
      };
    case UPDATE:
      const data = state.books.data.map((item) => {
        if (item.id === action.payload.book.id)
          return { ...action.payload.book };
        return item;
      });
      return {
        ...state,
        loading: false,
        books: {
          ...state.books,
          data,
        },
        book: action.payload.book,
      };
    default:
      return initialState;
  }
};
