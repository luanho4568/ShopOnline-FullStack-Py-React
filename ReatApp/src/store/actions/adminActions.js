import actionTypes from "./actionTypes";
import {
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCode,
    getAllUserByRole,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            const res = await getAllCode("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    };
};
export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            const res = await getAllCode("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data,role_key) => {
    return async (dispatch) => {
        try {
            const res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllUserStart(role_key));
            } else {
                toast.error(res.errMessage);
                dispatch(createUserFailed());
            }
        } catch (error) {
            toast.error("Create a new user failed!");
            dispatch(createUserFailed());
            console.log("createUserFailed", error);
        }
    };
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = (role_key) => {
    return async (dispatch) => {
        try {
            const res = await getAllUserByRole(role_key);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.data));
            } else {
                toast.error(res.errMessage);
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            toast.error("Fetch all user failed!");
            dispatch(fetchAllUserFailed());
            console.log("fetchAllUserFailed", error);
        }
    };
};

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    user: data,
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteOneUser = (data,role_key) => {
    return async (dispatch) => {
        try {
            const res = await deleteUserService(data.id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllUserStart(role_key));
            } else {
                toast.error(res.errMessage);
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("Delete a user failed!");
            dispatch(deleteUserFailed());
            console.log("DeleteUserFailed", error);
        }
    };
};

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    user: data,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editOneUser = (data,role_key) => {
    return async (dispatch) => {
        try {
            const res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success(res.errMessage);
                dispatch(fetchAllUserStart(role_key));
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

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});
