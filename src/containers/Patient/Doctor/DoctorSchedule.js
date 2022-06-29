import React, { Component } from 'react'
import { connect } from "react-redux"
import HomeHeader from '../../Homepage/HomeHeader'
import * as actions from '../../../store/actions'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils/constant'
import moment from 'moment'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FaCalendarAlt, FaHandPointUp, FaVideo } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal'


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailabelTime: [],
            isOpenShowModal: false,
            dataScheduleTimeModal: {},
            formality: ''
        }
    }

    async componentDidMount() {
        let { language, formality } = this.props
        let allDays = this.fetchAllDay(language)
        if (allDays?.length > 0) {
            this.setState({
                allDays: allDays,
                formality
            })
        }
        let allDayss = this.fetchAllDay(this.props.language)
        let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDayss[0].value, this.props.formality)
        this.setState({
            allAvailabelTime: res.data ? res.data : [],
        })
    }

    fetchAllDay = (language) => {
        let allDate = []

        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {

                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                if (i == 0) {
                    let today = moment(new Date()).add(i, 'days').format('DD/MM')
                    object.label = `Hôm nay - ${today}`
                }
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                if (i == 0) {
                    let today = moment(new Date()).add(i, 'days').format('DD/MM')
                    object.label = `Today - ${today}`
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDate.push(object)
        }
        return allDate
    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.fetchAllDay(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent || this.props.formality !== prevProps.formality) {
            let allDays = this.fetchAllDay(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value, this.state.formality)
            this.setState({
                allAvailabelTime: res.data ? res.data : []
            })
        }
    }

    handleChangeAllDay = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent != -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date, this.state.formality)
            if (res?.errCode === 0) {
                this.setState({
                    allAvailabelTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenShowModal: true,
            dataScheduleTimeModal: time,
        })
    }

    handleCloseModal = () => {
        this.setState({
            isOpenShowModal: false,
        })
    }

    render() {
        let { allDays, allAvailabelTime, isOpenShowModal, dataScheduleTimeModal, formality } = this.state
        let { language } = this.props

        return (
            <>
                <BookingModal
                    isOpen={isOpenShowModal}
                    handleCloseModal={this.handleCloseModal}
                    dataTime={dataScheduleTimeModal}
                    formality={formality}
                />
                <div>
                    <div className="cursor-pointer">
                        <select className="w-48 cursor-pointer  border-b-2 text-blue-600 font-semibold text-xl mb-3 outline-none" onChange={(e) => this.handleChangeAllDay(e)}>
                            {allDays?.length > 0 && allDays.map((item, index) =>
                                <option value={item.value} key={index} >
                                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                                </option>)}
                        </select>
                    </div>
                    <div>
                        <div className="flex items-center mb-3">
                            <span><FaCalendarAlt /></span>
                            <span className="ml-2 font-bold uppercase"> <FormattedMessage id="patient.detail-doctor.schedule" /> </span>
                        </div>
                        <div className="grid grid-cols-4 gap-y-4 gap-x-1 text-center cursor-pointer">
                            {allAvailabelTime?.length > 0 ? allAvailabelTime.map(item => {
                                return item.isActive && (
                                    <div key={item.id} className=" bg-yellow-200 font-bold w-36 rounded-md flex items-center justify-center h-12 hover:bg-blue-400"
                                        onClick={() => this.handleClickScheduleTime(item)}>
                                        {this.props.formality === 'online' && <FaVideo className='mr-2 text-green-700' />}   {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                    </div>
                                )
                            }
                            ) :
                                <div className="w-96 italic">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                        <div className="my-3">
                            {allAvailabelTime?.length > 0 ?
                                <div className="flex items-center"><FormattedMessage id="patient.detail-doctor.choose" />
                                    <FaHandPointUp className="mx-1 " />  <FormattedMessage id="patient.detail-doctor.book-free" />
                                </div> : ''}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        getInfoDoctor: state.admin.getInfoDoctor,
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
