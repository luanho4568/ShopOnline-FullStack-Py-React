import axios from "../axios";

// API LOGIN
const handleLoginAPI = (username, password) => {
    return axios.post("/api/login", { username, password });
};

// API GET ALL USERS
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
export {
    handleLoginAPI,
    createNewUserService,
    deleteUserService,
    deleteProductService,
    editUserService,
    getAllUserByRole,
    getAllCode,
    editProductService,
    getAllProductByCategory,
    createNewProductService,
    getBrand,
};
