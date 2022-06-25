import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedDate, FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as actions from "../../../store/actions"
import { LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment'
import { toast, ToastType } from 'react-toastify'
import _ from 'lodash'
import { saveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: null,
            currentDate: null,
            arrSchuduleTime: [],
            isActive: false,
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData?.length > 0) {
            inputData.map(item => {
                let object = {}
                let valueEN = `${item.lastName} ${item.firstName}`
                let valueVI = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? valueVI : valueEN
                object.value = item.id

                result.push(object)
            })
        }
        return result
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getAllcodeScheduleTimeDoctor()
    }

    componentDidUpdate(prevProps) {
        if (this.props.AllDoctorRedux !== prevProps.AllDoctorRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorRedux)
            const { user } = this.props
            if (user.roleId === 'R2') {
                dataSelect = dataSelect.filter(item => {
                    if (user.id === item.value) {
                        return item
                    }
                })
            }

            this.setState({
                listDoctors: dataSelect,
                selectedDoctor: dataSelect[0]
            })
        }

        if (this.props.language !== prevProps.language) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorRedux)
            this.setState({ listDoctors: dataSelect })
        }

        if (this.props.scheduleTimeDoctor !== prevProps.scheduleTimeDoctor) {
            let data = this.props.scheduleTimeDoctor
            if (data?.length > 0) {
                data.map(item => item.isSelected = false)
            }
            this.setState({ arrSchuduleTime: data })
        }
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleChooseSheduleTime = (shedule) => {
        let newArraySchuduleTime = this.state.arrSchuduleTime
        let notActive = this.state.isActive
        newArraySchuduleTime.map(item => {
            if (item.id === shedule.id) {
                item.isSelected = !notActive
            }
        })

        this.setState({
            arrSchuduleTime: newArraySchuduleTime,
            isActive: !notActive
        })
    }

    handleClickSaveSchedule = async () => {
        let { arrSchuduleTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!selectedDoctor) {
            return toast.error('Invalid Doctor!')
        }
        if (currentDate && _.isEmpty(selectedDoctor)) {
            return toast.error('Invalid date!')
        }

        let formatedDate = new Date(currentDate).getTime().toString()
        if (arrSchuduleTime?.length > 0) {
            let selectedTime = arrSchuduleTime.filter(item => item.isSelected === true)
            selectedTime.map(item => {
                let object = {}
                object.timeType = item.keyMap
                object.date = formatedDate
                object.doctorId = selectedDoctor.value
                object.isActive = true
                result.push(object)
            })
        }

        else {
            ToastType.error('Invalid selected time!')
            return
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate,
        })
        if (res) {
            return toast.success('Create Schedule Time Success!')
        }
    }

    render() {
        const { listDoctors, selectedDoctor, currentDate, arrSchuduleTime } = this.state
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

        let datee = new Date();
        let formatedDate = `${datee.getMonth() + 1}-${datee.getDate()}-${datee.getFullYear()}`
        let language = this.props.language
        return (
            <div className="container">
                <div className="text-2xl font-bold w-full text-center my-4">
                    <FormattedMessage id="manage-schudule.title" />
                </div>
                <div className="grid grid-cols-4 gap-8 mb-16">
                    <div className="grid grid-cols-1">
                        <label className="font-bold"> <FormattedMessage id="manage-schudule.choose-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={listDoctors}
                            className="w-full pr-4 mt-2"
                        />
                    </div>

                    <div className="grid grid-cols-1">
                        <label className="font-bold"> <FormattedMessage id="manage-schudule.choose-date" /></label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={currentDate}
                            selected={currentDate}
                            minDate={yesterday}
                        />
                    </div>
                </div>

                <div>
                    <div className="font-bold text-xl text-left">
                        <FormattedMessage id="manage-schudule.morning" />
                    </div>
                    <div className="grid grid-cols-4 gap-8 my-4 h-16  text-center cursor-pointer">

                        {arrSchuduleTime && arrSchuduleTime.length > 0 && arrSchuduleTime.map((item, index) => {
                            if (index < 4) {
                                return (
                                    <div key={item.id}
                                        onClick={() => this.handleChooseSheduleTime(item)}>
                                        <div className={item.isSelected ? " bg-indigo-500 text-white font-bold py-2 rounded" : " bg-gray-200 font-bold py-2 rounded"}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </div>
                                    </div>
                                )
                            }
                        }
                        )}

                    </div>
                    <div className="font-bold text-xl text-left">
                        <FormattedMessage id="manage-schudule.afternoon" />

                    </div>
                    <div className="grid grid-cols-4 gap-8 my-4 h-16  text-center cursor-pointer">

                        {arrSchuduleTime && arrSchuduleTime.length > 0 && arrSchuduleTime.map((item, index) => {
                            if (index >= 4) {
                                return (

                                    <div key={item.id}
                                        onClick={() => this.handleChooseSheduleTime(item)}>
                                        <div className={item.isSelected ? " bg-indigo-500 text-white font-bold py-2 rounded" : " bg-gray-200 font-bold py-2 rounded"}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </div>

                                    </div>
                                )
                            }
                        }
                        )}
                    </div>
                </div>

                <div>
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => this.handleClickSaveSchedule()}>
                        {language === LANGUAGES.VI ? 'Lưu thông tin' : 'Save'}
                    </button>
                </div>

            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        scheduleTimeDoctor: state.admin.scheduleTimeDoctor,
        language: state.app.language,
        AllDoctorRedux: state.admin.allDoctors,
        user: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeScheduleTimeDoctor: () => dispatch(actions.getAllcodeScheduleTimeDoctor()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)
