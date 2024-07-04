import actionTypes from "../actions/actionTypes";

const initialState = {
    categorys: [],
    products: [],
    brands: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            state.categorys = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_CATEGORY_FAILED:
            state.categorys = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_BRAND_SUCCESS:
            state.brands = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_BRAND_FAILED:
            state.brands = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
            state.products = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PRODUCT_FAILED:
            state.products = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default productReducer;
