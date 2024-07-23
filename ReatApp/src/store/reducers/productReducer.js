import actionTypes from "../actions/actionTypes";

const initialState = {
    categorys: [],
    products: [],
    brands: [],
    productsPhone: [],
    productsLaptop: [],
    productsTablet: [],
    productDetail: null,
    searchProduct: [],
    cartItems: [],
    orderItems: [],
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
        case actionTypes.FETCH_DETAIL_PRODUCT_SUCCESS:
            state.productDetail = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_DETAIL_PRODUCT_FAILED:
            state.productDetail = null;
            return {
                ...state,
            };
        case actionTypes.FETCH_SEARCH_PRODUCT_SUCCESS:
            state.searchProduct = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_SEARCH_PRODUCT_FAILED:
            state.searchProduct = null;
            return {
                ...state,
            };
        case actionTypes.FETCH_LIST_CART_SUCCESS:
            state.cartItems = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_LIST_CART_FAILED:
            state.cartItems = [];
            return {
                ...state,
            };
        case actionTypes.CREATE_ORDER_SUCCESS:
            state.orderItems = [...state.orderItems, action.data];
            return {
                ...state,
            };
        case actionTypes.CREATE_ORDER_FAILED:
            state.orderItems = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_LIST_ORDER_SUCCESS:
            state.orderItems = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_LIST_ORDER_FAILED:
            state.orderItems = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ADD_ITEM_TO_CART_SUCCESS:
            state.cartItems = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REMOVE_ITEM_TO_CART_SUCCESS:
            state.cartItems = action.data;
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default productReducer;
