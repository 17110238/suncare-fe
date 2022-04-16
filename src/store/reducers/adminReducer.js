import actionTypes from '../actions/actionTypes'

const initialState = {
    isLoadingGenders: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    getInfoDoctor: [],
    scheduleTimeDoctor: [],
    listPrices: [],
    listPayments: [],
    listProvinces: [],
    listSpecialties: [],
    createNewUserInfo: {},
    isLoading: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Create user
        case actionTypes.CREATE_USER_REQUEST:
            state.isLoading = true;
            return {
                ...state,
            }

        case actionTypes.CREATE_USER_SUCCESS:
            state.isLoading = false;
            state.createNewUserInfo = action.data
            return {
                ...state,
            }

        case actionTypes.CREATE_USER_FAILED:
            state.isLoading = false;
            state.createNewUserInfo = action.data
            return {
                ...state,
            }

        // Gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGenders = true
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGenders = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            state.isLoadingGenders = false
            return {
                ...state,
            }

        // Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        // Role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }

        // get All Users
        case actionTypes.FETCH_ALL_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_FAILED:
            state.users = []
            return {
                ...state,
            }

        // get top doctors
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }

        // get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.allDoctor
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }

        // get info doctor
        case actionTypes.GET_INFO_DOCTOR_SUCCESS:
            state.getInfoDoctor = action.getInfoDoctor
            return {
                ...state,
            }

        case actionTypes.GET_INFO_DOCTOR_FAILED:
            state.getInfoDoctor = []
            return {
                ...state,
            }

        // get schedule time doctor
        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.scheduleTimeDoctor = action.scheduleTimeDoctor
            return {
                ...state,
            }

        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAILED:
            state.scheduleTimeDoctor = []
            return {
                ...state,
            }

        // get list prices
        case actionTypes.GET_PRICES_SUCCESS:
            state.listPrices = action.prices
            return {
                ...state,
            }

        case actionTypes.GET_PRICES_FAILED:
            state.listPrices = []
            return {
                ...state,
            }

        // get list payments
        case actionTypes.GET_PAYMENTS_SUCCESS:
            state.listPayments = action.payments
            return {
                ...state,
            }

        case actionTypes.GET_PAYMENTS_FAILED:
            state.listPayments = []
            return {
                ...state,
            }

        // get list provinces
        case actionTypes.GET_PROVINCES_SUCCESS:
            state.listProvinces = action.provinces
            return {
                ...state,
            }

        case actionTypes.GET_PROVINCES_FAILED:
            state.listProvinces = []
            return {
                ...state,
            }

        // get list specialty
        case actionTypes.GET_SPECIALTY_SUCCESS:
            state.listSpecialties = action.specialty
            return {
                ...state,
            }

        case actionTypes.GET_SPECIALTY_FAILED:
            state.listSpecialties = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;