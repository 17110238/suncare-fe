import actionTypes from './actionTypes'
import {
    getAllCodeService, createNewUserService, getAllUsers, deleteUserService, getAllcodeScheduleTimeDoctorService,
    editUserService, getTopDoctorHomeService, getAllDoctorService, saveDoctorDetailService, getDetailInfoDoctorService,
    getListPriceService, getListPaymentService, getListProvinceService, getAllSpecialtyService
} from '../../services/userService'
import { toast } from 'react-toastify'

export const fetchALLUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All')

            if (res && res.errCode === 0) {
                let sortUser = res.users.reverse()
                dispatch(fetchAllUserSuccess(sortUser))

            } else {
                toast.error('Fetch all users error!')
                dispatch(fetchAllUserFail())
            }
        }
        catch (err) {
            toast.error('Fetch all users error!')
            dispatch(fetchAllUserFail())
            console.error(err)
        }
    }
}

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_FAILED,
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SUCCESS,
    users: data
})

//  Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail())
            }
        }
        catch (err) {
            dispatch(fetchGenderFail())
            console.error(err)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


// Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail())
            }
        }
        catch (err) {
            dispatch(fetchPositionFail())
            console.error(err)
        }
    }
}

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {

            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail())
            }
        }
        catch (err) {
            dispatch(fetchRoleFail())
            console.error(err)
        }
    }
}

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) => {
    console.log("aaaa", data)
    return async (dispatch, getState) => {
        try {
            dispatch(saveUserRequest())
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess(res))
                dispatch(fetchALLUserStart())
            } else {
                dispatch(saveUserFail(res))
            }
        }
        catch (err) {
            toast.error('Create user not success!')
            console.error(err)
        }
    }
}

export const saveUserRequest = () => ({
    type: actionTypes.CREATE_USER_REQUEST,
})

export const saveUserSuccess = (userInfo) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userInfo
})

export const saveUserFail = (userInfo) => ({
    type: actionTypes.CREATE_USER_FAILED,
    data: userInfo
})

export const DeleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data)
            if (res && res.errCode === 0) {
                toast.success('Delete user success!')
                dispatch(deleteUserSuccess())
                dispatch(fetchALLUserStart())
            } else {
                toast.error('Delete user not success!')
                dispatch(deleteUserFail())
            }
        }
        catch (err) {
            toast.error('Delete user not success!')
            console.error(err)
        }
    }
}


export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const editUser = (data) => {
    console.log("dataaaa", data)
    return async (dispatch, getState) => {
        try {
            dispatch(editUserRequest())
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess(res))
                dispatch(fetchALLUserStart())
            } else {
                dispatch(editUserFail(res))
            }
        }
        catch (err) {
            toast.error('Update user not success!')
            console.error(err)
        }
    }
}

export const editUserRequest = () => ({
    type: actionTypes.EDIT_USER_REQUEST,
})

export const editUserFail = (userInfo) => ({
    type: actionTypes.EDIT_USER_FAILED,
    data: userInfo
})

export const editUserSuccess = (userInfo) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: userInfo
})

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorHomeService('')
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        }
        catch (err) {
            console.error('FETCH_TOP_DOCTOR_FAILED', err)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    allDoctor: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        }
        catch (err) {
            console.error('FETCH_ALL_DOCTOR_FAILED', err)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDoctorDetailService(data)
            if (response && response.errCode === 0) {
                toast.success('Save info Detail Doctor success!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    allDoctor: response.data
                })
            }
            else {
                toast.error('Save info Detail Doctor error!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        }
        catch (err) {
            toast.error('Save info Detail Doctor success!')

            console.error('SAVE_DETAIL_DOCTOR_FAILED', err)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}


export const getDetailInfoDoctors = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getDetailInfoDoctorService(id)
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
                    getInfoDoctor: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_INFO_DOCTOR_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_INFO_DOCTOR_FAILED', err)
            dispatch({
                type: actionTypes.GET_INFO_DOCTOR_FAILED
            })
        }
    }
}

export const getAllcodeScheduleTimeDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllcodeScheduleTimeDoctorService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    scheduleTimeDoctor: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_ALLCODE_SCHEDULE_TIME_FAILED', err)
            dispatch({
                type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getListPrices = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getListPriceService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRICES_SUCCESS,
                    prices: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRICES_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_PRICES_FAILED', err)
            dispatch({
                type: actionTypes.GET_PRICES_FAILED
            })
        }
    }
}

export const getListPayments = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getListPaymentService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PAYMENTS_SUCCESS,
                    payments: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PAYMENTS_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_PAYMENTS_FAILED', err)
            dispatch({
                type: actionTypes.GET_PAYMENTS_FAILED
            })
        }
    }
}


export const getListProvinces = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getListProvinceService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PROVINCES_SUCCESS,
                    provinces: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PROVINCES_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_PROVINCES_FAILED', err)
            dispatch({
                type: actionTypes.GET_PROVINCES_FAILED
            })
        }
    }
}

export const getAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllSpecialtyService()
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_SPECIALTY_SUCCESS,
                    specialty: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_SPECIALTY_FAILED
                })
            }
        }
        catch (err) {
            console.error('GET_SPECIALTY_FAILED', err)
            dispatch({
                type: actionTypes.GET_SPECIALTY_FAILED
            })
        }
    }
}
