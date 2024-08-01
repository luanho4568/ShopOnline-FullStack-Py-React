import axios from "../axios";

// API LOGIN
const handleLoginAPI = (username, password) => {
    return axios.post("/api/login", { username, password });
};
// API REGISTER
const registerUserService = (data) => {
    return axios.post("/api/register", data);
};

// API CREATE USER
const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};
// API DELETE USER
const deleteUserService = (id) => {
    return axios.delete("/api/delete-user", { data: { id } });
};

// API EDIT USER
const editUserService = (data) => {
    return axios.put(`/api/edit-user`, data);
};

// API GET ALL USERS BY ROLE
const getAllUserByRole = (role_key) => {
    return axios.get(`/api/users-by-role?role_id=${role_key}`);
};

const getAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

// API GET ALL PRODUCT BY CATEGORY
const getAllProductByCategory = (category_key) => {
    return axios.get(`/api/products-by-category?category_id=${category_key}`);
};
// API GET DETAIL PRODUCT BY ID
const getDetailProduct = (id) => {
    return axios.get(`/api/product-details?id=${id}`);
};
//  API GET DETAIL USER BY ID

const getDetailUser = (id) => {
    return axios.get(`/api/user-details?id=${id}`);
};
// API Create New Product
const createNewProductService = (data) => {
    return axios.post("/api/create-new-product", data);
};
//  API get Brand
const getBrand = (data) => {
    return axios.get(`/api/get-brands`, data);
};
// API DELETE PRODUCT
const deleteProductService = (id) => {
    return axios.delete("/api/product-delete", { data: { id } });
};
// API EDIT PRODUCT
const editProductService = (data) => {
    return axios.put(`/api/product-edit`, data);
};
// API GET ADDRESS USER
const getUserAddress = (id) => {
    return axios.get(`/api/address-user?user_id=${id}`);
};
// API EDIT ADDRESS USER
const editAddressService = (data) => {
    return axios.put(`/api/address-edit`, data);
};
// API CREATE ADDRESS USER
const createAddressService = (data) => {
    return axios.post(`/api/create-new-address`, data);
};
// API DELETE ADDRESS USER
const deleteAddressService = (id) => {
    return axios.delete("/api/delete-address", { data: { id } });
};
// API UPDATE PASSWORD
const updatePasswordService = (data) => {
    return axios.put(`/api/update-password`, data);
};
// API SEARCH PRODUCT TITLE
const searchProductService = (title) => {
    return axios.get(`/api/search-product?search=${title}`);
};
// API GET LIST CART
const getListCartService = (user_id) => {
    return axios.get(`/api/list-orderItem?user_id=${user_id}`);
};
// API ADD ITEM CART
const addItemToCardService = (data) => {
    return axios.post("/api/add-order-item", data);
};
// API REMOVE ITEM CART
const removeItemToCardService = (data) => {
    return axios.post("/api/remove-order-item", data);
};
// API ORDER
const orderService = (data) => {
    return axios.post("/api/create_order", data);
};
// API GET ORDER
const getListOrderService = (user_id, status_key) => {
    return axios.get(`/api/list-order?user_id=${user_id}&status_key=${status_key}`);
};
// API CANCELED ORDER
const cancelOrderService = (order_id) => {
    return axios.post(`/api/cancel-order?order_id=${order_id}`);
};
// API GET DETAIL ORDER BY ID
const getDetailOrderService = (id) => {
    return axios.get(`/api/detail-order?id=${id}`);
};

export {
    handleLoginAPI,
    orderService,
    getDetailOrderService,
    createNewUserService,
    addItemToCardService,
    deleteUserService,
    getListOrderService,
    updatePasswordService,
    getUserAddress,
    editAddressService,
    cancelOrderService,
    getListCartService,
    removeItemToCardService,
    searchProductService,
    createAddressService,
    deleteProductService,
    editUserService,
    getAllUserByRole,
    getAllCode,
    editProductService,
    getAllProductByCategory,
    createNewProductService,
    registerUserService,
    getBrand,
    getDetailProduct,
    deleteAddressService,
    getDetailUser,
};
