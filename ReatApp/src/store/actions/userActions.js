import actionTypes from "./actionTypes";
import { getDetailUser, editUserService, getUserAddress, editAddressService, updatePasswordService } from "../../services/userService";
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
            console.log(res);
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

export const fetchGetAddressUser = (id) => {
    return async (dispatch) => {
        try {
            const res = await getUserAddress(id);
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch(getAddressUserSuccess(res.data));
            } else {
                toast.error(res.errMessage);
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

export const editAddressStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await editAddressService(data);
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch(editAddressSuccess(res.data));
                toast.success(res.errMessage);
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



export const updatePassword = (data) => {
    return async (dispatch) => {
        try {
            const res = await updatePasswordService(data);
            if (res && res.errCode === 0) {
                dispatch(updatePasswordSuccess());
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
});

export const updatePasswordFailed = () => ({
    type: actionTypes.UPDATE_PASSWORD_FAILED,
});