import actionTypes from "./actionTypes";
import {
    createNewProductService,
    deleteProductService,
    editProductService,
    getBrand,
    getAllCode,
    getAllProductByCategory,
    getDetailProduct,
    searchProductService,
    getListCartService,
    addItemToCardService,
    removeItemToCardService,
    orderService,
    getListOrderService,
    cancelOrderService,
    getDetailOrderService,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchCategoryStart = () => {
    return async (dispatch) => {
        try {
            const res = await getAllCode("CATEGORY");
            if (res && res.errCode === 0) {
                dispatch(fetchCategorySuccess(res.data));
            } else {
                dispatch(fetchCategoryFailed());
            }
        } catch (error) {
            dispatch(fetchCategoryFailed());
        }
    };
};
export const fetchCategorySuccess = (CategoryData) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    data: CategoryData,
});

export const fetchCategoryFailed = () => ({
    type: actionTypes.FETCH_CATEGORY_FAILED,
});

export const fetchBrandStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await getBrand(data);
            if (res && res.errCode === 0) {
                dispatch(fetchBrandSuccess(res.data));
            } else {
                dispatch(fetchBrandFailed());
            }
        } catch (error) {
            dispatch(fetchBrandFailed());
        }
    };
};
export const fetchBrandSuccess = (BrandData) => ({
    type: actionTypes.FETCH_BRAND_SUCCESS,
    data: BrandData,
});

export const fetchBrandFailed = () => ({
    type: actionTypes.FETCH_BRAND_FAILED,
});

export const createNewProduct = (data, category_key) => {
    return async (dispatch) => {
        try {
            const res = await createNewProductService(data);
            if (res && res.errCode === 0) {
                dispatch(createProductSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllProductStart(category_key));
            } else {
                toast.error(res.errMessage);
                dispatch(createProductFailed());
            }
        } catch (error) {
            toast.error("Create a new product failed!");
            dispatch(createProductFailed());
            console.log("createProductFailed", error);
        }
    };
};

export const createProductSuccess = () => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
});

export const createProductFailed = () => ({
    type: actionTypes.CREATE_PRODUCT_FAILED,
});

export const fetchAllProductStart = (category_key) => {
    return async (dispatch) => {
        try {
            const res = await getAllProductByCategory(category_key);
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductSuccess(res.data));
            } else {
                dispatch(fetchAllProductFailed());
            }
        } catch (error) {
            toast.error("Fetch all Product failed!");
            dispatch(fetchAllProductFailed());
            console.log("fetchAllProductFailed", error);
        }
    };
};

export const fetchAllProductSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
    data,
});
export const fetchAllProductFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCT_FAILED,
});
export const fetchDetailProductStart = (id) => {
    return async (dispatch) => {
        try {
            const res = await getDetailProduct(id);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailProductSuccess(res.data));
            } else {
                toast.error(res.errMessage);
                dispatch(fetchDetailProductFailed());
            }
        } catch (error) {
            toast.error("Fetch all Product failed!");
            dispatch(fetchDetailProductFailed());
            console.log("fetchAllProductFailed", error);
        }
    };
};

export const fetchDetailProductSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_PRODUCT_SUCCESS,
    data,
});
export const fetchDetailProductFailed = () => ({
    type: actionTypes.FETCH_DETAIL_PRODUCT_FAILED,
});
export const fetchAllProductPhoneStart = (category_key) => {
    return async (dispatch) => {
        try {
            const res = await getAllProductByCategory(category_key);
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductPhoneSuccess(res.data));
            } else {
                dispatch(fetchAllProductPhoneFailed());
            }
        } catch (error) {
            dispatch(fetchAllProductPhoneFailed());
            console.log("fetchAllProductFailed", error);
        }
    };
};
export const fetchAllProductPhoneSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_PHONE_SUCCESS,
    data,
});

export const fetchAllProductPhoneFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_PHONE_FAILED,
});
export const fetchAllProductLaptopStart = (category_key) => {
    return async (dispatch) => {
        try {
            const res = await getAllProductByCategory(category_key);
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductLaptopSuccess(res.data));
            } else {
                dispatch(fetchAllProductLaptopFailed());
            }
        } catch (error) {
            dispatch(fetchAllProductLaptopFailed());
            console.log("fetchAllProductFailed", error);
        }
    };
};
export const fetchAllProductLaptopSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_LAPTOP_SUCCESS,
    data,
});

export const fetchAllProductLaptopFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_LAPTOP_FAILED,
});

export const fetchAllProductTabletStart = (category_key) => {
    return async (dispatch) => {
        try {
            const res = await getAllProductByCategory(category_key);
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductTabletSuccess(res.data));
            } else {
                dispatch(fetchAllProductTabletFailed());
            }
        } catch (error) {
            dispatch(fetchAllProductTabletFailed());
            console.log("fetchAllProductFailed", error);
        }
    };
};
export const fetchAllProductTabletSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_TABLET_SUCCESS,
    data,
});

export const fetchAllProductTabletFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_TABLET_FAILED,
});
export const deleteOneProduct = (data, category_key) => {
    return async (dispatch) => {
        try {
            const res = await deleteProductService(data);
            if (res && res.errCode === 0) {
                dispatch(deleteProductSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllProductStart(category_key));
            } else {
                toast.error(res.errMessage);
                dispatch(deleteProductFailed());
            }
        } catch (error) {
            dispatch(deleteProductFailed());
            console.log("DeleteProductFailed", error);
        }
    };
};

export const deleteProductSuccess = (data) => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
    data,
});

export const deleteProductFailed = () => ({
    type: actionTypes.DELETE_PRODUCT_FAILED,
});

export const editOneProduct = (data, category_key) => {
    return async (dispatch) => {
        try {
            const res = await editProductService(data);
            if (res && res.errCode === 0) {
                dispatch(editProductSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllProductStart(category_key));
            } else {
                toast.error(res.errMessage);
                dispatch(editProductFailed());
            }
        } catch (error) {
            dispatch(editProductFailed());
            console.log("UpdateProductFailed", error);
        }
    };
};

export const editProductSuccess = () => ({
    type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductFailed = () => ({
    type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const searchProductStart = (title) => {
    return async (dispatch) => {
        try {
            const res = await searchProductService(title);
            if (res) {
                dispatch(searchProductSuccess(res));
            } else {
                dispatch(searchProductFailed("No products found"));
            }
        } catch (error) {
            dispatch(searchProductFailed(error.message));
        }
    };
};

export const searchProductSuccess = (data) => ({
    type: actionTypes.FETCH_SEARCH_PRODUCT_SUCCESS,
    data,
});

export const searchProductFailed = (error) => ({
    type: actionTypes.FETCH_SEARCH_PRODUCT_FAILED,
    error,
});

export const fetchListCartStart = (user_id) => {
    return async (dispatch) => {
        try {
            const res = await getListCartService(user_id);
            if (res && res.errCode === 0) {
                dispatch(fetchListCartSuccess(res.data));
            } else {
                dispatch(fetchListCartFailed(res.data));
            }
        } catch (error) {
            toast.error("Fetch list cart failed! : ", error);
        }
    };
};

export const fetchListCartSuccess = (data) => ({
    type: actionTypes.FETCH_LIST_CART_SUCCESS,
    data,
});

export const fetchListCartFailed = (data) => ({
    type: actionTypes.FETCH_LIST_CART_FAILED,
    data,
});

export const fetchAddItemToCartStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await addItemToCardService(data);
            if (res && res.errCode === 0) {
                dispatch(fetchAddItemToCartSuccess(res.data));
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(fetchAddItemToCartFailed());
            }
        } catch (error) {
            toast.error("Fetch add item to cart failed! : ", error);
        }
    };
};

export const fetchAddItemToCartSuccess = (data) => ({
    type: actionTypes.FETCH_ADD_ITEM_TO_CART_SUCCESS,
    data,
});

export const fetchAddItemToCartFailed = () => ({
    type: actionTypes.FETCH_ADD_ITEM_TO_CART_FAILED,
});

export const fetchRemoveItemToCartStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await removeItemToCardService(data);
            if (res && res.errCode === 0) {
                dispatch(fetchRemoveItemToCartSuccess(res.data));
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(fetchRemoveItemToCartFailed());
            }
        } catch (error) {
            toast.error("Fetch Remove item to cart failed! : ", error);
        }
    };
};

export const fetchRemoveItemToCartSuccess = (data) => ({
    type: actionTypes.FETCH_REMOVE_ITEM_TO_CART_SUCCESS,
    data,
});

export const fetchRemoveItemToCartFailed = () => ({
    type: actionTypes.FETCH_REMOVE_ITEM_TO_CART_FAILED,
});

export const fetchCreateOrderStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await orderService(data);
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch(fetchCreateOrderSuccess(res.data));
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(fetchCreateOrderFailed());
            }
        } catch (error) {
            toast.error("Fetch create order failed! : ", error);
        }
    };
};

export const fetchCreateOrderSuccess = (data) => ({
    type: actionTypes.CREATE_ORDER_SUCCESS,
    data,
});

export const fetchCreateOrderFailed = () => ({
    type: actionTypes.CREATE_ORDER_FAILED,
});

export const fetchListOrderStart = (userId, status_key) => {
    return async (dispatch) => {
        try {
            const res = await getListOrderService(userId, status_key);
            if (res && res.errCode === 0) {
                dispatch(fetchListOrderSuccess(res.data));
            } else {
                dispatch(fetchListOrderFailed());
            }
        } catch (error) {
            toast.error("Fetch order failed!");
            dispatch(fetchListOrderFailed());
        }
    };
};

export const fetchListOrderSuccess = (data) => ({
    type: actionTypes.FETCH_LIST_ORDER_SUCCESS,
    data,
});

export const fetchListOrderFailed = () => ({
    type: actionTypes.FETCH_LIST_ORDER_FAILED,
});


export const fetchCancelOrderStart = (order_id) => {
    return async (dispatch) => {
        try {
            const res = await cancelOrderService(order_id);
            if (res && res.errCode === 0) {
                dispatch(fetchCancelOrderSuccess());
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(fetchCancelOrderFailed());
            }
        } catch (error) {
            toast.error("Fetch cancel order failed!");
            dispatch(fetchCancelOrderFailed());
        }
    };
};

export const fetchCancelOrderSuccess = () => ({
    type: actionTypes.FETCH_CANCEL_ORDER_SUCCESS,
});

export const fetchCancelOrderFailed = () => ({
    type: actionTypes.FETCH_CANCEL_ORDER_FAILED,
});

export const fetchDetailOrderStart = (order_id) => {
    return async (dispatch) => {
        try {
            const res = await getDetailOrderService(order_id);
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailOrderSuccess(res.data));
            } else {
                dispatch(fetchDetailOrderFailed());
            }
        } catch (error) {
            toast.error(error);
            dispatch(fetchDetailOrderFailed());
        }
    };
};

export const fetchDetailOrderSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_ORDER_SUCCESS,
    data,
});

export const fetchDetailOrderFailed = () => ({
    type: actionTypes.FETCH_DETAIL_ORDER_FAILED,
});