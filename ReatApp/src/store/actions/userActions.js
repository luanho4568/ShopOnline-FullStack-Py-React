import actionTypes from "./actionTypes";
import {
    getDetailUser,
    editUserService,
    getUserAddress,
    editAddressService,
    updatePasswordService,
    createAddressService,
    deleteAddressService,
    registerUserService,
} from "../../services/userService";
import { toast } from "react-toastify";
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});

export const fetchDetailUserStart = (id) => {
    return async (dispatch) => {
        try {
            const res = await getDetailUser(id);

            if (res && res.errCode === 0) {
                dispatch(fetchDetailUserSuccess(res.data));
            } else {
                toast.error(res.errMessage);
                dispatch(fetchDetailUserFailed());
            }
        } catch (error) {
            toast.error("Fetch Detail User failed!");
            dispatch(fetchDetailUserFailed());
            console.log("fetchDetailUserFailed", error);
        }
    };
};

export const fetchDetailUserSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_USER_SUCCESS,
    data,
});
export const fetchDetailUserFailed = () => ({
    type: actionTypes.FETCH_DETAIL_USER_FAILED,
});
export const editUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess(res.data));
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update a user failed!");
            dispatch(editUserFailed());
            console.log("UpdateUserFailed", error);
        }
    };
};
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchGetAddressUser = (user_id) => {
    return async (dispatch) => {
        try {
            const res = await getUserAddress(user_id);

            if (res && res.errCode === 0) {
                dispatch(getAddressUserSuccess(res.data));
            } else {
                dispatch(getAddressUserFailed());
            }
        } catch (error) {
            toast.error("Get address a user failed!");
            dispatch(getAddressUserFailed());
            console.log("Get address a user failed!", error);
        }
    };
};
export const getAddressUserSuccess = (data) => ({
    type: actionTypes.FETCH_GET_ADDRESS_SUCCESS,
    data,
});

export const getAddressUserFailed = () => ({
    type: actionTypes.FETCH_GET_ADDRESS_FAILED,
});

export const editAddressStart = (data, user_id) => {
    return async (dispatch) => {
        try {
            const res = await editAddressService(data);

            if (res && res.errCode === 0) {
                dispatch(editAddressSuccess(res.data));
                toast.success(res.errMessage);
                dispatch(fetchGetAddressUser(user_id));
            } else {
                toast.error(res.errMessage);
                dispatch(editAddressFailed());
            }
        } catch (error) {
            toast.error("Update a Address failed!");
            dispatch(editAddressFailed());
            console.log("UpdateAddressFailed", error);
        }
    };
};
export const editAddressSuccess = (data) => ({
    type: actionTypes.EDIT_ADDRESS_SUCCESS,
    data,
});

export const editAddressFailed = () => ({
    type: actionTypes.EDIT_ADDRESS_FAILED,
});

export const updatePasswordStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await updatePasswordService(data);

            if (res && res.errCode === 0) {
                dispatch(updatePasswordSuccess(res.data));
                toast.success(res.errMessage);
            } else {
                toast.error(res.errMessage);
                dispatch(updatePasswordFailed());
            }
        } catch (error) {
            toast.error("Update a user failed!");
            dispatch(updatePasswordFailed());
            console.log("UpdateUserFailed", error);
        }
    };
};
export const updatePasswordSuccess = (data) => ({
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    data,
});

export const updatePasswordFailed = () => ({
    type: actionTypes.UPDATE_PASSWORD_FAILED,
});

export const createAddressStart = (data, user_id) => {
    return async (dispatch) => {
        try {
            const res = await createAddressService(data);

            if (res && res.errCode === 0) {
                dispatch(createAddressSuccess(res.data));
                toast.success(res.errMessage);
                dispatch(fetchGetAddressUser(user_id));
            } else {
                toast.error(res.errMessage);
                dispatch(createAddressFailed());
            }
        } catch (error) {
            toast.error("Create a Address failed!");
            dispatch(createAddressFailed());
            console.log("CreateAddressFailed", error);
        }
    };
};
export const createAddressSuccess = (data) => ({
    type: actionTypes.CREATE_ADDRESS_SUCCESS,
    data,
});

export const createAddressFailed = () => ({
    type: actionTypes.CREATE_ADDRESS_FAILED,
});

export const deleteAddressStart = (data, user_id) => {
    return async (dispatch) => {
        try {
            const res = await deleteAddressService(data);

            if (res && res.errCode === 0) {
                dispatch(deleteAddressSuccess(res.data));
                toast.success(res.errMessage);
                dispatch(fetchGetAddressUser(user_id));
            } else {
                toast.error(res.errMessage);
                dispatch(deleteAddressFailed());
            }
        } catch (error) {
            toast.error("Delete a Address failed!");
            dispatch(deleteAddressFailed());
            console.log("DeleteAddressFailed", error);
        }
    };
};
export const deleteAddressSuccess = (data) => ({
    type: actionTypes.DELETE_ADDRESS_SUCCESS,
    data,
});

export const deleteAddressFailed = () => ({
    type: actionTypes.DELETE_ADDRESS_FAILED,
});

export const registerUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await registerUserService(data);
            if (res && res.errCode === 0) {
                dispatch(registerUserSuccess());
            } else {
                dispatch(registerUserFailed());
            }
        } catch (error) {
            console.log("Register User Failed", error);
        }
    };
};

export const registerUserSuccess = () => ({
    type: actionTypes.REGISTER_USER_SUCCESS,
});

export const registerUserFailed = () => ({
    type: actionTypes.REGISTER_USER_FAILED,
});
