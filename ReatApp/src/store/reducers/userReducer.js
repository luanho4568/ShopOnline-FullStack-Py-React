import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    addressData: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.FETCH_DETAIL_USER_SUCCESS:
            state.userInfo = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_DETAIL_USER_FAILED:
            state.userInfo = null;
            return {
                ...state,
            };
        case actionTypes.EDIT_USER_SUCCESS:
            state.userInfo = action.data;
            return {
                ...state,
            };
        case actionTypes.EDIT_USER_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ADDRESS_SUCCESS:
            state.addressData = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ADDRESS_FAILED:
            state.addressData = [];
            return {
                ...state,
            };
        
        default:
            return state;
    }
};

export default userReducer;
