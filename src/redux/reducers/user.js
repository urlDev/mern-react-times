import * as UserActions from "redux/actions/user";

const initialState = {
  loadingUser: false,
  errorUser: null,
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: JSON.parse(localStorage.getItem("token")) || {},
  userModal: false,
  deleteModal: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActions.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActions.LOGOUT_USER:
      return {
        ...state,
        user: {},
        token: {},
      };
    case UserActions.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActions.DELETE_USER:
      return {
        ...state,
        user: {},
        token: {},
      };
    case UserActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case UserActions.USER_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UserActions.USER_LOADING:
      return {
        ...state,
        loadingUser: true,
      };
    case UserActions.USER_LOADING_END:
      return {
        ...state,
        loadingUser: false,
      };
    case UserActions.USER_MODAL_OPEN:
      return {
        ...state,
        userModal: true,
      };
    case UserActions.USER_MODAL_CLOSE:
      return {
        ...state,
        userModal: false,
      };
    case UserActions.DELETE_MODAL_OPEN:
      return {
        ...state,
        deleteModal: true,
      };
    case UserActions.DELETE_MODAL_CLOSE:
      return {
        ...state,
        deleteModal: false,
      };
    case UserActions.UPLOAD_AVATAR:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
