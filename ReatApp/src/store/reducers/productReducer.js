import actionTypes from "../actions/actionTypes";

const initialState = {
    categorys: [],
    products: [],
    brands: [],
    productsPhone: [],
    productsLaptop: [],
    productsTablet: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_PHONE_SUCCESS:
            return {
                ...state,
                productsPhone: action.data,
            };
        case actionTypes.FETCH_PRODUCTS_PHONE_FAILED:
            return {
                ...state,
                productsPhone: [],
            };
        case actionTypes.FETCH_PRODUCTS_LAPTOP_SUCCESS:
            return {
                ...state,
                productsLaptop: action.data,
            };
        case actionTypes.FETCH_PRODUCTS_LAPTOP_FAILED:
            return {
                ...state,
                productsLaptop: [],
            };
        case actionTypes.FETCH_PRODUCTS_TABLET_SUCCESS:
            return {
                ...state,
                productsTablet: action.data,
            };
        case actionTypes.FETCH_PRODUCTS_TABLET_FAILED:
            return {
                ...state,
                productsTablet: [],
            };
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
