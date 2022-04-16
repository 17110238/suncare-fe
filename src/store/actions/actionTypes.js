const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    FETCH_ALL_SUCCESS: 'FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED: 'FETCH_ALL_FAILED',

    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    GET_INFO_DOCTOR_SUCCESS: 'GET_INFO_DOCTOR_SUCCESS',
    GET_INFO_DOCTOR_FAILED: 'GET_INFO_DOCTOR_FAILED',

    GET_ALLCODE_SCHEDULE_TIME_SUCCESS: 'GET_ALLCODE_SCHEDULE_TIME_SUCCESS',
    GET_ALLCODE_SCHEDULE_TIME_FAILED: 'GET_ALLCODE_SCHEDULE_TIME_FAILED',

    GET_PRICES_SUCCESS: 'GET_PRICES_SUCCESS',
    GET_PRICES_FAILED: 'GET_PRICES_FAILED',

    GET_PAYMENTS_SUCCESS: 'GET_PAYMENTS_SUCCESS',
    GET_PAYMENTS_FAILED: 'GET_PAYMENTS_FAILED',

    GET_PROVINCES_SUCCESS: 'GET_PROVINCES_SUCCESS',
    GET_PROVINCES_FAILED: 'GET_PROVINCES_FAILED',

    GET_SPECIALTY_SUCCESS: 'GET_SPECIALTY_SUCCESS',
    GET_SPECIALTY_FAILED: 'GET_SPECIALTY_FAILED',

})

export default actionTypes;