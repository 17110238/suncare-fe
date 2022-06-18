import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get('/api/get-all-users', {
        params: {
            id
        }
    })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (data) => {
    return axios.post('/api/delete-user', data)
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (type) => {
    return axios.get('/api/get-allcode', {
        params: {
            type
        }
    })
}

const getTopDoctorHomeService = (limit) => {
    return axios.get('/api/top-doctor-home', {
        params: {
            limit
        }
    })
}

const getAllDoctorService = () => {
    return axios.get('/api/top-all-doctors')
}

const saveDoctorDetailService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailInfoDoctorService = (id) => {
    return axios.get('/api/get-detail-doctor-by-id', {
        params: {
            id
        }
    })
}

const getAllcodeScheduleTimeDoctorService = (id) => {
    return axios.get('/api/get-schedule-time')
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get('/api/get-schedule-doctor-by-date', {
        params: {
            doctorId, date
        }
    })
}

const getListPriceService = () => {
    return axios.get('/api/get-list-price')
}

const getListPaymentService = () => {
    return axios.get('/api/get-list-payment')
}

const getListProvinceService = () => {
    return axios.get('/api/get-province')
}

const getProfileDoctorByIdService = (id) => {
    return axios.get('/api/get-profile-doctor-by-id', {
        params: {
            id
        }
    })
}

const postPatientAppointment = (data) => {
    return axios.post('/api/patient-book-appoinment', data)
}

const postVerifyBookAppoinment = (data) => {
    return axios.post('/api/verify-book-appoinment', data)
}

const saveNewSpecialtyService = (data) => {
    return axios.post('/api/save-new-specialty', data)
}

const getAllSpecialtyService = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialtyService = (id) => {
    return axios.get('/api/get-detail-specialty', {
        params: {
            id
        }
    })
}

const handleConfirmDoctorService = (data) => {
    return axios.post('/api/confirmDoctor', data)
}

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const handleConfirmAndPaymentPatient = (data) => {
    return axios.post(`/api/handle-confirm-patient`, data)
}

export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService
    , getAllDoctorService, saveDoctorDetailService, getDetailInfoDoctorService, getAllcodeScheduleTimeDoctorService, saveBulkScheduleDoctor,
    getScheduleDoctorByDate, getListPriceService, getListPaymentService, getListProvinceService, getProfileDoctorByIdService, postPatientAppointment,
    postVerifyBookAppoinment, saveNewSpecialtyService, getAllSpecialtyService, getDetailSpecialtyService, handleConfirmDoctorService,
    getDetailSpecialtyByIdService, getAllPatientForDoctor, handleConfirmAndPaymentPatient
}
